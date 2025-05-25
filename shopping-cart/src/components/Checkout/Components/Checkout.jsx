import styles from '../CSS/Checkout.module.css'
import DeliveryForm from './DeliveryForm';
import PaymentForm from "./PaymentForm";
import { DeliveryContext, DeliveryProvider } from "../../../context/DeliveryContext";
import { CartContext } from '../../../context/CartContext';
import OrderSummary from './OrderSummary';
import { useContext} from 'react';



const Checkout = () => {

    const cartItems = useContext(CartContext)
    const {checkoutProgress, setCheckoutProgress} = useContext(DeliveryContext)
   
    return (
        <>
            <div className={styles.orderSection}>
                <p>Order total
                    {cartItems.price}
                </p>
            </div>
            <main className={styles.checkout}>
            <section className="orderForm">
                <div className="formSection">
                    <DeliveryForm/>
                </div>
                <div className={styles.paymentSection}>
                    <div className={`$${styles.email}`}>
                    
                    </div>
                    <div className={`${styles.card} ${styles.payment}`}>
                        <PaymentForm checkoutProgress={checkoutProgress} setCheckoutProgress={setCheckoutProgress}/>
                    </div>
                </div>
            </section>
                <OrderSummary/>
            </main>
        </>
    );
};

export default Checkout;
