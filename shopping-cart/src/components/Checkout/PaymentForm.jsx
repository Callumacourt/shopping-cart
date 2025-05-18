import { useState } from "react"
import styles from './Checkout'

const PaymentForm = ({ checkoutProgress, setCheckoutProgress }) => {
    const [paymentInfo, setPaymentInfo] = useState({})

    return (
    <div className={styles.card}>
        {checkoutProgress === 'Payment' ? (
            <>
            <h2>Please enter your payment details</h2>
            <form action>
                <label htmlFor="cardName">Cardholder Name</label>
                <input 
                name="cardName"
                type="text"
                value = {paymentInfo.cardName || ""}
                onChange={e => setPaymentInfo({ ...paymentInfo, cardName: e.target.value})} />

                <label htmlFor="cardNum"Card number></label>
                <input
                name="cardNum"
                type="text"
                value = {paymentInfo.cardNum || ""}
                onChange={e => setPaymentInfo({...paymentInfo, cardNum: e.target.value})}
                />

                <label htmlFor="Expiry date"></label>
                <input 
                type="text"
                name="expiryDate"
                value={paymentInfo.expiryDate || ""}
                onChange={e => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                />

                <label htmlFor="CVC"></label>
                <input
                type="text"
                name="CVC"
                value={paymentInfo.CVC || ""}
                onChange={e => setPaymentInfo({...paymentInfo, CVC: e.target.value})}
                 />
            </form>
            <button type="button" onClick={() => {setCheckoutProgress('review')}}>Review order</button>
            </>
        ) : (
            <section>
            {paymentInfo.cardNumber && (
                <>
                <h2>Payment</h2>
                <p>billing address</p>
                <p>final card digits</p>
                </>
            )}
            </section>
        )}
    </div>
    )
}

export default PaymentForm