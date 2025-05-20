import { useState, useContext } from "react";
import styles from '../CSS/Checkout.module.css'
import { DeliveryContext } from '../../../context/DeliveryContext';
import AddressForm from "./AddressForm";

const BillingAddressSection = ({ paymentProgress, setPaymentProgress }) => {
    const {
        setBillingAddress,
        deliveryLocation
    } = useContext(DeliveryContext);

    const [activePick, setActivePick] = useState('same');

    return (
        <>
            <h3>Billing Address</h3>
            <span
                onClick={() => {
                    setBillingAddress(deliveryLocation);
                    setPaymentProgress('pay');
                    setActivePick('same');
                }}
            >
                <div className={`${styles.pickBase} ${activePick === 'same' ? styles.activePick : ''}`} />
                <p>Same as Shipping</p>
            </span>
            <span
                onClick={() => {
                    setPaymentProgress('billingAdd');
                    setActivePick('different');
                }}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
                <div className={`${styles.pickBase} ${activePick === 'different' ? styles.activePick : ''}`} />
                <p>Different Address</p>
            </span>
            {paymentProgress !== 'billingAdd' && (
                <button type="button" onClick={() => setPaymentProgress('pay')}>Continue to payment</button>
            )}
        </>
    );
};

const PaymentDetails = ({paymentInfo, setPaymentInfo, setCheckoutProgress}) => {
    return (
         <>
            <h2>Please enter your payment details</h2>
            <form action="">
                <label htmlFor="cardName">Cardholder Name</label>
                <input
                    id="cardName"
                    name="cardName"
                    type="text"
                    value={paymentInfo.cardName || ""}
                    onChange={e => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                />

                <label htmlFor="cardNum">Card number</label>
                <input
                    id="cardNum"
                    name="cardNum"
                    type="text"
                    value={paymentInfo.cardNum || ""}
                    onChange={e => setPaymentInfo({ ...paymentInfo, cardNum: e.target.value })}
                />

                <label htmlFor="expiryDate">Expiry date</label>
                <input
                    id="expiryDate"
                    type="text"
                    name="expiryDate"
                    value={paymentInfo.expiryDate || ""}
                    onChange={e => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                />

                <label htmlFor="cvc">CVC</label>
                <input
                    id="cvc"
                    type="text"
                    name="cvc"
                    value={paymentInfo.cvc || ""}
                    onChange={e => setPaymentInfo({ ...paymentInfo, cvc: e.target.value })}
                />
            </form>
            <button type="button" onClick={() => setCheckoutProgress('review')}>Review order</button>
        </>
    )
}

const PaymentSummary = ({paymentInfo}) => {
    return (
        <section>
        {paymentInfo.cardNum && (
            <>
                <h2>Payment</h2>
                <p>billing address</p>
                <p>final card digits</p>
            </>
        )}
        </section>
    )
}

const PaymentForm = ({ checkoutProgress, setCheckoutProgress }) => {
    const [paymentInfo, setPaymentInfo] = useState({});
    const [paymentProgress, setPaymentProgress] = useState();

    const {
        billingAddress,
        setBillingAddress,
    } = useContext(DeliveryContext);

    return (
        <div className={styles.card}>
            {checkoutProgress === 'Payment' && !paymentProgress && (
                <BillingAddressSection 
                paymentProgress={paymentProgress} 
                setPaymentProgress={setPaymentProgress} />
            )}

            {checkoutProgress === 'Payment' && paymentProgress === 'pay' && (
               <PaymentDetails 
               paymentInfo={paymentInfo} 
               setPaymentInfo={setPaymentInfo}
               setCheckoutProgress = {setCheckoutProgress}
               />
            )}

            {checkoutProgress === 'Payment' && paymentProgress === 'billingAdd' && (
                <>
                    <h3>Enter a different billing address</h3>
                    <AddressForm countryCode={'+44'} deliveryLocation={billingAddress} setDeliveryLocation={setBillingAddress}/>
                    <button type="button" onClick={() => setPaymentProgress('pay')}>Continue to payment</button>
                </>
            )}

            {checkoutProgress !== 'Payment' && (
                <PaymentSummary paymentInfo={paymentInfo}/>
            )}
        </div>
    );
};

export default PaymentForm;