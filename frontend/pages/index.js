import { useState, useEffect } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import Map from '../components/Map';

const DEFAULT_CENTER = [60.19, 24.94]

const Form = ({name}) => {
  return (
  <form>
    <label>
      Name: 
      <textarea>
        {name}
      </textarea>
      <input type="text" name="name" />
    </label>
    <input type="submit" value="Submit" />
  </form>
  )

  // nimi
  // tuote (muovipussi)
  // osoite
  // valitaan kierrätyskeskuksen tyyppi aka. kierrätyskeskus // ukrainan lahjotukset // pullonpalautus --> nää lähetetään findplaces routelle
}

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
      <div>
        <div className={styles.container}>
          <div style={{ width: "50%" }}>

<<<<<<< HEAD
      <div className={styles.container}>
        <Map coordinates={DEFAULT_CENTER} locations={locations} />
        <Form/>
=======
          </div>
          <Map coordinates={DEFAULT_CENTER} locations={locations} />
        </div>
>>>>>>> 3f153a33c1a21d2a7ce5ae4ee8dacfb736a31bcf
      </div>
      
    </main>
  )
}
