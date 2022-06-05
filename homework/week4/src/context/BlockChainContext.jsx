import { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";


export const BlockchainContext = createContext({
  currentAccount: null,
  contract: null,
  provider: null,
  count: null,
  greeting: '',
});
const contractAddress = "0xb8bb92D80eC0d15eCcE740D1DA016829EC513Ee4";
const contractABI = [{"inputs":[],"name":"counter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greetings","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_greetings","type":"string"}],"name":"setGreetings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setIncrement","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const BlockchainContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [count, setCount] = useState(null);
  const [greeting, setGreeting] = useState('');


  useEffect(() => {
    /*
     * 使用 window.ethereum 來透過 Matamask (狐狸錢包) 來取得錢包地址
     * 並且將錢包地址設定在上方事先寫好的 currentAccount state
     * 加分項目1: 使用 window.ethereum 偵測換錢包地址事件，並且切換 currentAccount 值
     *          備註: 由於 Codesandbox 無法偵測 Metamask 事件監聽，請使用 git clone 在 local 端開發此功能
     * 加分項目2: 使用 window.ethereum 偵測目前的鏈是否為 Rinkeby，如果不是，則透過 window.ethereum 跳出換鏈提示
     * 提示: Rinkeby chain ID 為 0x4
     * 參考資料: https://docs.metamask.io/guide/rpc-api.html
     */
    const resetState = function () {
      setCurrentAccount(null);
      setContract(null);
      setProvider(null);
    }
    const updateCurrentAccounts = accounts => {
      const [_account] = accounts;
      if (window.ethereum.networkVersion === '4') {
        setCurrentAccount(_account);
      }
    }
    const onChainChanged = async (chainId) => {
      if (chainId !== '0x4') {
        resetState();
      }
    }
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(updateCurrentAccounts);
    window.ethereum.on("accountsChanged", updateCurrentAccounts);
    window.ethereum.on("chainChanged", onChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', updateCurrentAccounts);
      window.ethereum.removeListener('chainChanged', onChainChanged);
    }
  }, []);

  useEffect(() => {
    /*
     * 使用 ethers.js
     * 透過 Web3Provider 將 window.ethereum 做為參數建立一個新的 web3 provider
     * 並將這個新的 web3 provider 設定成 provider 的 state
     */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setProvider(provider);

    provider.getBlock().then(block => {
      const _contract = new ethers.Contract(contractAddress, contractABI, provider, { 
        gasLimit: block.gasLimit
      });
      setContract(_contract.connect(signer));
      console.log(_contract);
      (async () => {
        const currentCount = (await _contract.counter()).toNumber();
        setCount(currentCount);

        const currentGreeting = await _contract.greetings();
        setGreeting(currentGreeting);
      })();
    });
    
  }, []);

  return (
    <BlockchainContext.Provider value={{ currentAccount, contract, provider, count, greeting }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainContextProvider;
