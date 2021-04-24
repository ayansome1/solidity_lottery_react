import React, { useState, useEffect } from 'react';

// import web3 from './web3';
import lottery from './lottery';
import web3 from './web3';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [ethAmountToEnterLottery, setEthAmountToEnterLottery] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async function () {
      const manager = await lottery.methods.manager().call();
      setManager(manager);

      const players = await lottery.methods.getPlayers().call();
      // console.log(players)
      setPlayers(players);
      // setPlayers(oldArray => [...oldArray, players])

      const balance = await web3.eth.getBalance(lottery.options.address);
      setBalance(balance);
    })();
  }, []);

  function handleInputChange(e) {
    setEthAmountToEnterLottery(e.target.value);
  }

  async function handleButtonClick() {
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setMessage('Entering...');
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(ethAmountToEnterLottery, 'ether'),
    });
    setMessage('Successfully entered lottery...');
  }

  async function pickWinner() {
    const accounts = await web3.eth.getAccounts();
    setMessage('picking winner...');

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage('picked winner...');
  }

  return (
    <div className='App'>
      <div>
        Manager: {manager} , Players: {players.length} , Prize:{' '}
        {web3.utils.fromWei(balance, 'ether')} ether
      </div>
      <div>
        Enter lottery: Amount of ether to enter:{' '}
        <input value={ethAmountToEnterLottery} onChange={handleInputChange} />{' '}
        <button onClick={handleButtonClick}>Enter</button>
      </div>
      <h1>{message}</h1>
      <div>
        <button onClick={pickWinner}>pick winner</button>
      </div>
    </div>
  );
}

export default App;
