
import styles from '../styles/Home.module.css'


const OrderForm = ({handleDecreaseClick, handleIncreaseClick, counter, newName, setNewName, address}) => {
    return (
        <div>
        <form className={styles.form} >
            <h1 className={styles.h1}>Create Order</h1>
            <label className={styles.label}>Name</label>
            <input className={styles.input} value={newName} onChange={(e) => setNewName(e.target.value)} />
            <label>Address</label>
            <span>{address}</span>

            <label className={styles.label}>Choose amount of Books</label>
            <div>
                <button onClick={handleDecreaseClick}>-</button>
                <span>{counter}</span>
                <button onClick={handleIncreaseClick}>+</button>
            </div>
            <input  value={"Submit Order"} className={styles.button} type="submit"/>
          </form>
        </div>
    )
}

export default OrderForm;