import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';

import { contractAbi, contractAddress } from './utils/constants';

// using local node
const web3 = new Web3("ws://localhost:8545")
const greeterContract = new web3.eth.Contract(contractAbi, contractAddress);


function App() {
  const [newGreetings, setNewGreetings] = useState("");
  const [greetings, setGreetings] = useState("")

  useEffect(() => {
    const initialGreets = async () => {
      const greetMsg = await greetMe()
      setGreetings(greetMsg);
    };
    initialGreets();
  }, [])


  const greetMe = async () => {
    const greetMsg = await greeterContract.methods.greet().call();
    return greetMsg;
  }

  const updateGreets = async () => {
    const greetMsg = await greeterContract.methods.setGreeting(newGreetings).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' })
    setGreetings(await greetMe())
  }

  return (
    <div className="App">
      <input placeholder="New greetings" type="text" value={newGreetings}
        onChange={(e) => setNewGreetings(e.target.value)}
      />
      <button onClick={() => updateGreets()}>
        Update Greetings
      </button>
      <h2>
        Current Greetings:
        <span style={{ color: "blueviolet" }}>
          &nbsp; {greetings}
        </span>
      </h2>
    </div>
  );
}

export default App;
