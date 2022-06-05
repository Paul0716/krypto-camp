import { BlockchainContext } from '../context/BlockChainContext';
import { Fragment, useContext, useRef } from 'react';

export function Toolbar() {
    const inputEl = useRef(null);
    const { currentAccount, contract, count, greeting } = useContext(BlockchainContext);

    async function plus() {
        await contract.setIncrement({ from: currentAccount });
    }

    async function updateGreeting() {
        await contract.setGreetings(inputEl.current.value, { from: currentAccount });
    }


    return <Fragment>
        <p>Wallet Address: { currentAccount }</p>
        <p><button type="button" onClick={plus}>Count</button></p>
        <p>Current Count: {count}</p>
        <p>
            <input type="text" placeholder="Please enter your greetings" ref={inputEl}/>
            <button type="button" onClick={updateGreeting}>Submit</button>
        </p>
        <p>Current Greeting: {greeting}</p>
    </Fragment>
}