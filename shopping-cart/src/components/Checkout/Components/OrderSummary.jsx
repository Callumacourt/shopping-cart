import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import styles from '../CSS/Checkout.module.css'

const OrderSummary = () => {
    const {cartItems} = useContext(CartContext) 
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
    // temp
    const shipping = 0

    return (
        <section className={styles.orderSummary}>
            <span className={styles.orderSummaryTitle}>
                <h2>Order Summary</h2>
                <Link to='/cart'>Edit</Link>
            </span>

            {cartItems.map((item) => (
                <div className={styles.itemCard}>
                    <div className={styles.imgContainer}>
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div key={item.id} className={styles.summaryCard}>
                        <p className={styles.itemTitle}>{item.title}</p>
                        <p>Qty: {item.qty} @ £{item.price}</p>
                        <p><b>£{item.qty * item.price}</b></p>
                    </div>
                </div>
            ))}

            <p>Subtotal: £{subtotal}</p>
            <p>Estimated Shipping: {shipping === 0 ? 'Free' : '£' + shipping}</p>
            <p>Total: £{subtotal + shipping}  </p>
        </section>
    )
}

export default OrderSummary;