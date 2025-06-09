import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import styles from '../CSS/Checkout.module.css';
import expandIcn from '../../../assets/arrow-down.svg';

const OrderSummary = () => {
    const { cartItems } = useContext(CartContext);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
    const [expanded, setExpanded] = useState(false);
    // temp
    const shipping = 0;

    return (
        <div className= {styles.orderSumCont}>
            <button
                onClick={() => setExpanded((prev) => !prev)}
                className={styles.orderSummaryToggle}
                type="button"
            >
                <span>Order Summary</span>
                <div className={styles.wrapper}>
                    <span>£{subtotal}</span>
                    <span
                        className={`${styles.iconTransition} ${expanded ? styles.expanded : ''}`}
                    >
                        <img
                            src={expandIcn}
                            alt={expanded ? "Collapse order summary" : "Expand order summary"}
                        />
                    </span>
                </div>
            </button>
            {expanded && (
                <section className={styles.orderSummary}>
                    <span className={styles.orderSummaryTitle}>
                        <h2>Order Summary</h2>
                        <Link to='/cart'>Edit</Link>
                    </span>

                    {cartItems.map((item) => (
                        <div className={styles.itemCard} key={item.id}>
                            <div className={styles.imgContainer}>
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className={styles.summaryCard}>
                                <p className={styles.itemTitle}>{item.title}</p>
                                <p>Qty: {item.qty} @ £{item.price}</p>
                                <p><b>£{item.qty * item.price}</b></p>
                            </div>
                        </div>
                    ))}

                    <p>Subtotal: £{subtotal}</p>
                    <p>Estimated Shipping: {shipping === 0 ? 'Free' : '£' + shipping}</p>
                    <p>Total: £{subtotal + shipping}</p>
                </section>
            )}
        </div>
    );
};

export default OrderSummary;