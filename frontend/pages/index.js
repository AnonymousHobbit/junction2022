import React, { useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import Map from '../components/Map';
import AddressForm from '../components/AddressForm';

const DEFAULT_CENTER = [60.19, 24.94]


export default function Home() {

  /// TODO
  /// kutsu tässä kohtaa apia joka hakee oikeat kohteet
  /// palauta koordinaatit ja nimet
  /// anna parametrina Map -komponentille
  // https://localhost/
  // https://localhost/test
  const [newName, setNewName] = useState('')
  const [locations, setLocations] = useState({});
  const [info, setInfo] = useState({})
  const [dropOff, setDropOff] = useState({})
  const [dropOffSelected, setDropOffSelected] = useState(false);
  const [trackUrl, setTrackUrl] = useState('');
  const [showTrackUrl, setShowTrackUrl] = useState(false);

  async function getLocations() {
    const res = await axios.get('http://localhost:5000/find_places');
    setLocations(res.data);
  }

  useEffect(() => {
    getLocations();
  }, []);

  const dropOffSelection = (dropoff) => {
    console.log("DROP OFF SELECTION FIRED")
    setDropOffSelected(true);
    setDropOff(dropoff);
  }

  const handleSubmitAddress = async (address, housenumber, postalcode, city, name) => {
    console.log(address, housenumber, postalcode, city, name)
    console.log("lib" + dropOff)
    console.log("GUGU")
    const res = await axios.post('http://localhost:5000/send_order', {
      address: address,
      housenumber: housenumber, 
      postcode: postalcode,
      city: city,   
      name: name,
      dropCoordinates: dropOff
    })
    setTrackUrl(res.data);
    setShowTrackUrl(true);
  }

  if(showTrackUrl) {
    return(
      <main>
      <Head>
        <title>GetRidOfIt</title>
      </Head>
      <div>
        <div className={styles.container}>
          <div style={{ width: "50%"}}>
            <div className={styles.form}>
              <h1 className={styles.h1}>Your order has been sent!</h1><br/>
              Track your order here: <a href={trackUrl}>{trackUrl}</a>
            </div>

          </div>

        </div>
      </div>
    </main>
    )
  }

  if(!dropOffSelected) {
    return(
    <main>
      <Head>
        <title>GetRidOfIt</title>
      </Head>
      <div>
        <div className={styles.container}>
          <div style={{ width: "50%"}}>
            <div className={styles.form}>
              Select drop of from the map.
            </div>

          </div>

          <Map coordinates={DEFAULT_CENTER} locations={locations} info={info} dropOffSelection={dropOffSelection}/>
        </div>
      </div>
    </main>
    )
  } else {
    return (
      <main>
        <Head>
          <title>GetRidOfIt</title>
        </Head>
        <div>
          <div className={styles.container}>
            <div style={{ width: "50%"}}>
                  <AddressForm 
                    setNewName={setNewName}
                    newName={newName}
                    handleSubmitAddress={handleSubmitAddress}
                    />
            </div>
  
            <Map coordinates={DEFAULT_CENTER} locations={locations} info={info} setDropOff={dropOffSelection}/>
          </div>
        </div>
      </main>
    )
  }

  
}
