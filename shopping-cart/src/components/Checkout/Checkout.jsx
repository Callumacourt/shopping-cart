import styles from './Checkout.module.css';
import DeliveryForm from './DeliveryForm';
import PaymentForm from "./PaymentForm";
import { DeliveryProvider } from "../../context/DeliveryContext";
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';



const Checkout = () => {

    const cartItems = useContext(CartContext)
   
    return (
        <DeliveryProvider>
            <div className={styles.orderSection}>
                <p>Order total
                    {cartItems.price}
                </p>
            </div>
            <div className="formSection">
                <DeliveryForm/>
            </div>
            <div className={styles.paymentSection}>
                <div className={`${styles.card} ${styles.email}`}>
                
                </div>
                <div className={`${styles.card} ${styles.payment}`}>
                    <PaymentForm/>
                </div>
            </div>
        </DeliveryProvider>
    );
};

export default Checkout;
