import { useState, useEffect } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import Map from '../components/Map';

const DEFAULT_CENTER = [60.19, 24.94]

export default function Home() {

  /// TODO
  /// kutsu tässä kohtaa apia joka hakee oikeat kohteet
  /// palauta koordinaatit ja nimet
  /// anna parametrina Map -komponentille
  // https://localhost/
  // https://localhost/test

  const [locations, setLocations] = useState({});
  async function getLocations() {
    const res = await axios.get('http://localhost:5000/test');
    setLocations(res.data);
  }

  useEffect(() => {
    getLocations();
  }, []);
  
  return (
    <main>
      <Head>
        <title>GetRidOfIt</title>
      </Head>

      <div className={styles.container}>
        <Map coordinates={DEFAULT_CENTER} locations={locations} />

        
      </div>
    </main>
  )
}