
import styles from '../styles/Home.module.css'

const Form = ({newName, setNewName, newAddress, setNewAddress, counter, handleIncreaseClick, handleDecreaseClick}) => {
    return (
      <div>
      <form className={styles.form} >
          <h1 className={styles.h1}>New Pick up</h1>
          <label className={styles.label}>Name</label>
          <input className={styles.input} value={newName} onChange={(e) => setNewName(e.target.value)}/>
          <label className={styles.label}> Address</label>
          <input className={styles.input}value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
          <div>
          <button onClick={handleDecreaseClick}>-</button>
          <span>{counter}</span>
          <button onClick={handleIncreaseClick}>+</button>
          </div>
          <input className={styles.button} type="submit"/>
        </form>
      </div>
      )
  }

export default Form