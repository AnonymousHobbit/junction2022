import {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios';

const AddressForm = ({ setInfo }) => {

    const [address, setAddress] = useState('')
    const [housenumber, setHousenumber] = useState('')
    const [postalcode, setPostalcode] = useState('')
    const [city, setCity] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        setInfo({address, housenumber, postalcode, city})
    }

    
    return (
      <div>
      <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.h1}>Search for Libraries</h1>
          <label className={styles.label}> Address</label>
          <input className={styles.input} value={address} onChange={(e) => setAddress(e.target.value)} />
          <label className={styles.label}>House number</label>
          <input className={styles.input} value={housenumber} onChange={(e) => setHousenumber(e.target.value)} />
          <label className={styles.label}>Citt</label>
          <input className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} />
          <label className={styles.label}>Postal code</label>
          <input className={styles.input} value={postalcode} onChange={(e) => setPostalcode(e.target.value)} />
          <input  value={"Search"} className={styles.button} type="submit"/>
        </form>
      </div>
      )
  }

export default AddressForm