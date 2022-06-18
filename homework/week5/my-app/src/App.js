import React, { useEffect } from 'react';
import './App.css';
import {
  useConnect,
  useAccount,
  useNetwork,
  useDisconnect,
  useContractRead,
  useContractWrite,
  chain} from 'wagmi'
import { contractABI, contractAddress } from "./contract";

function App() {
  const { connect, connectors, error, isConnecting, pendingConnector } = useConnect();
  const { data: account } = useAccount();
  const { activeChain, switchNetwork } = useNetwork({
    chainId: chain.localhost.id,
  });
  const { disconnect } = useDisconnect();
  const { data: balanceOfMine, isBalanceOfMineError, isBalanceOfMineLoading }  = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    'balanceOfMine',
    { watch: true },
  )

  const { data: totalSupply, isTotalSupplyError, isTotalSupplyLoading } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    'totalSupply',
    { watch: true },
  )

  const { data: mintData, isError: mintError, isLoading: isMintLoading, write: mint } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    'mint'
  )
  const mintNft = () => { mint() }

  useEffect(
    () => {
      if (activeChain && switchNetwork && activeChain.id !== chain.localhost.id) {
        switchNetwork(chain.localhost.id)
      }
    }, [activeChain, switchNetwork]
  )

  return (
    <div className="App">
      <header className="App-header">
        {
          account ?
            (
              <div>
                <div>錢包地址: {account.address}</div>
                {account.connector && <div>連結方式: {account.connector.name}</div>}
                <button onClick={disconnect}>取消連結錢包</button>
                <h1> NFT 數據 </h1>
                {totalSupply && <p> MaxNFT 總量: {totalSupply.toString()} </p>}
                {balanceOfMine && <p> 我的 NFT 數量: {balanceOfMine.toString()} </p> }
              </div>
            ) :
            (
              <div>
                {
                  connectors.map(
                    (connector) => (
                      <button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect(connector)}
                      >
                        {connector.name}
                        {!connector.ready && " (不支援)"}
                        {isConnecting && connector.id === pendingConnector?.id && " (連結中)"}
                      </button>
                    )
                  )
                }
              </div>
            )
        }
        {!isMintLoading && activeChain && <button onClick={mintNft}>mint</button>}
      </header>
    </div>
  );
}

export default App;