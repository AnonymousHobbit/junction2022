import {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios';

const AddressForm = ({ selectedLibrary, handleSubmitAddress }) => {
    const [address, setAddress] = useState('')
    const [housenumber, setHousenumber] = useState('')
    const [postalcode, setPostalcode] = useState('')
    const [city, setCity] = useState('')
    const [newName, setNewName] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("GAGA")
        handleSubmitAddress(address, housenumber, postalcode, city, newName)
    }

    return (
      <div>
      <form className={styles.form} onSubmit={handleSubmit} selectedLibrary={selectedLibrary}>
          <h1 className={styles.h1}>Make order</h1>
          <label className={styles.label}> Address</label>
          <input className={styles.input} value={address} onChange={(e) => setAddress(e.target.value)} />
          <label className={styles.label}>House number</label>
          <input className={styles.input} value={housenumber} onChange={(e) => setHousenumber(e.target.value)} />
          <label className={styles.label}>City</label>
          <input className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} />
          <label className={styles.label}>Postal code</label>
          <input className={styles.input} value={postalcode} onChange={(e) => setPostalcode(e.target.value)} />
          <label className={styles.label}>Name</label>
          <input className={styles.input} value={newName} onChange={(e) => setNewName(e.target.value)} />  
          <input  value={"Submit order"} className={styles.button} type="submit"/>
        </form>
      </div>
      )
  }

export default AddressForm