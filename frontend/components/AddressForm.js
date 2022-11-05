
import styles from '../styles/Home.module.css'

const AddressForm = ({newAddress, setNewAddress}) => {
    return (
      <div>
      <form className={styles.form} >
          <h1 className={styles.h1}>Search for Libraries</h1>
          <label className={styles.label}> Address</label>
          <input className={styles.input}value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
          <input  value={"Search"} className={styles.button} type="submit"/>
        </form>
      </div>
      )
  }

export default AddressForm