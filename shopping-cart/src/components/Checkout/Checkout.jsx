import styles from './Checkout.module.css';
import DeliveryForm from './DeliveryForm';
import PaymentForm from "./PaymentForm";
import { DeliveryProvider } from "../../context/DeliveryContext";
import { CartContext } from '../../context/CartContext';
import Header from '../Header/Header'
import { useContext, useState } from 'react';



const Checkout = () => {

    const cartItems = useContext(CartContext)
    const [checkoutProgress, setCheckoutProgress] = useState('email')
   
    return (
        <DeliveryProvider>
            <Header></Header>
            <div className={styles.orderSection}>
                <p>Order total
                    {cartItems.price}
                </p>
            </div>
            <div className="formSection">
                <DeliveryForm checkoutProgress={checkoutProgress} setCheckoutProgress={setCheckoutProgress}/>
            </div>
            <div className={styles.paymentSection}>
                <div className={`$${styles.email}`}>
                
                </div>
                <div className={`${styles.card} ${styles.payment}`}>
                    <PaymentForm checkoutProgress={checkoutProgress} setCheckoutProgress={setCheckoutProgress}/>
                </div>
            </div>
        </DeliveryProvider>
    );
};

export default Checkout;
