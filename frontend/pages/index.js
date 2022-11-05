import React, { useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import Map from '../components/Map';
import AddressForm from '../components/AddressForm';
import OrderForm from '../components/OrderForm';

const DEFAULT_CENTER = [60.19, 24.94]


export default function Home() {

  /// TODO
  /// kutsu tässä kohtaa apia joka hakee oikeat kohteet
  /// palauta koordinaatit ja nimet
  /// anna parametrina Map -komponentille
  // https://localhost/
  // https://localhost/test
  const [newName, setNewName] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [locations, setLocations] = useState({});
  const [counter, setCounter] = useState(0)
  const [address, setAddress] = useState('')

  async function getLocations() {
    const res = await axios.get('http://localhost:5000/find_places');
    setLocations(res.data);
  }

  useEffect(() => {
    getLocations();
  }, []);

  const handleIncreaseClick = (event) => {
    event.preventDefault();
    setCounter(counter+1)
  }

  const handleDecreaseClick = (event) => {
    event.preventDefault();
    if (counter > 0) {
      setCounter(counter-1);
    }
  }

  const handleSubmitAddress = async (event) => {
    event.preventDefault();
    setAddress(newAddress);
  }

  return (
    <main>
      <Head>
        <title>GetRidOfIt</title>
      </Head>
      <div>
        <div className={styles.container}>
          <div style={{ width: "50%"}}>
                <AddressForm newAddress={newAddress} setNewAddress={setNewAddress} handleSubmit={handleSubmitAddress} 
                />
                <OrderForm
                  handleDecreaseClick={handleDecreaseClick}
                  handleIncreaseClick={handleIncreaseClick}
                  counter={counter}
                  setNewName={setNewName}
                  newName={newName}
                  address={address}
                  handleSubmit={handleSubmitAddress} />
          </div>
          <Map coordinates={DEFAULT_CENTER} locations={locations} />
        </div>
      </div>
    </main>
  )
}
