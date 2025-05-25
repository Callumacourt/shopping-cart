import { useState, useContext } from "react";
import styles from '../CSS/Checkout.module.css'
import { DeliveryContext } from '../../../context/DeliveryContext';
import AddressForm from "./AddressForm";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
 const stripePromise = loadStripe('pk_test_51RQqrnAVqhnvOcyiV5MwkTVVVovO9HR4sgdjJby2ndRyC5GBeT5sIyRfYbvpb8xYLKxpIuk8P7Ob164b7QxWJp0B00MijvFJPP')

const BillingAddressSection = ({ paymentProgress, setPaymentProgress }) => {
    const {
        billingAddress,
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
            >
                <div className={`${styles.pickBase} ${activePick === 'different' ? styles.activePick : ''}`} />
                <p>Different Address</p>
            </span>
            {paymentProgress !== 'billingAdd' && (
                <button type="button" onClick={() => {
                    // Default option
                    if (!billingAddress.address?.postcode) {
                        setBillingAddress(deliveryLocation)
                    }
                    setPaymentProgress('pay')}}>Continue to payment</button>
            )}
        </>
    );
};

const PaymentDetails = ({setPaymentError, setCardSummary, setCheckoutProgress}) => {
    const stripe = useStripe()
    const elements = useElements()

    const handleReviewClick = async () => {
        setPaymentError(null)

        if (!stripe || !elements) {
            return
        }

        const cardElement = elements.getElement(CardElement)

        if (!cardElement) {
            setPaymentError('Card details not entered')
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });


        if (error) {
            setPaymentError(error.message)
        }

        else {
            setCardSummary(paymentMethod.card)
            setCheckoutProgress('review')
        }

    }
    return (
         <>
            <h2>Please enter your payment details</h2>
            <CardElement/>
            <button type="button" onClick={handleReviewClick}>Review order</button>
        </>
    )
}

const PaymentSummary = ({cardSummary, billingAddress}) => {
    return (
        <section>
        <h3>Billing Address</h3>
        {billingAddress?.address?.house_number && <p>{billingAddress.address.house_number}</p>}
        {billingAddress?.address?.road && <p>{billingAddress.address.road}</p>}
        {billingAddress?.address?.city && <p>{billingAddress.address.city}</p>}
        {billingAddress?.address?.postcode && <p>{billingAddress.address.postcode}</p>}
        <h3>Payment Method</h3>
        <p>{cardSummary.last4}</p>
        </section>
    )
}

const PaymentForm = ({ checkoutProgress, setCheckoutProgress }) => {
    const [paymentProgress, setPaymentProgress] = useState();
    const [paymentError, setPaymentError] = useState('')
    const [cardSummary, setCardSummary] = useState({})

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
                <Elements stripe = {stripePromise}>
                    <PaymentDetails 
                    setCheckoutProgress = {setCheckoutProgress} 
                    setPaymentError={setPaymentError}
                    setCardSummary={setCardSummary}
                    />
                    <small>{paymentError}</small>
               </Elements>
            )}

            {checkoutProgress === 'Payment' && paymentProgress === 'billingAdd' && (
                <>
                    <h3>Enter a different billing address</h3>
                    <AddressForm countryCode={'+44'} deliveryLocation={billingAddress} setDeliveryLocation={setBillingAddress}/>
                    <button type="button" onClick={() => setPaymentProgress('pay')}>Continue to payment</button>
                </>
            )}

            {checkoutProgress !== 'Payment' && cardSummary.last4 && (
                <>
                <PaymentSummary cardSummary = {cardSummary} billingAddress={billingAddress}/>
                <button onClick={() => setCheckoutProgress('Payment')}>Edit</button>
                </>
            )}
        </div>
    );
};

export default PaymentForm;