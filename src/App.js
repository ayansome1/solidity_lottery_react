import React, { useState, useEffect } from 'react';

// import web3 from './web3';
import lottery from './lottery';

function App() {
  const [manager, setManager] = useState('');

  useEffect(() => {
    (async function () {
      const manager = await lottery.methods.manager().call();
      setManager(manager);
    })();
  }, []);

  return <div className='App'>{manager}</div>;
}

export default App;
