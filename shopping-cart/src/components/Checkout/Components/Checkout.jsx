import styles from '../CSS/Checkout.module.css'
import DeliveryForm from './DeliveryForm';
import PaymentForm from "./PaymentForm";
import { DeliveryContext} from "../../../context/DeliveryContext";
import OrderSummary from './OrderSummary';
import { useContext} from 'react';



const Checkout = () => {
    const {checkoutProgress, setCheckoutProgress} = useContext(DeliveryContext)
   
    return (
        <div className = {styles.checkoutWrapper}>
                <OrderSummary/>
                <main className={styles.checkout}>
                <section className="orderForm">
                    <div className="formSection">
                        <DeliveryForm/>
                    </div>
                    <div className={styles.paymentSection}>
                    <PaymentForm checkoutProgress={checkoutProgress} setCheckoutProgress={setCheckoutProgress}/>
                    </div>
                </section>
                </main>
        </div>
    );
};

export default Checkout;
