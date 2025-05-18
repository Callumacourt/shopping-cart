import styles from './Checkout.module.css';
import { useContext } from 'react';
import { DeliveryContext } from '../../context/DeliveryContext';
import HomeDelivery from './HomeDelivery';
import PickupPoint from './PickupPoint';
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
countries.registerLocale(en);

const DeliveryForm = ({ checkoutProgress, setCheckoutProgress }) => {
    const {
        homeDelivery,
        setHomeDelivery,
        deliveryLocation
    } = useContext(DeliveryContext);

    const countryList = countries.getNames("en", { select: "official" });
    const countryArray = Object.entries(countryList).map(([code, name]) => ({ code, name }));

    return (
        <>
            <div className={`${styles.card} ${styles.email}`}>
                {checkoutProgress === 'email' ? (
                    <form className={styles.checkoutForm} id="emailForm" action="">
                        <label htmlFor="email">Please enter your email address</label>
                        <input name="email" id="email" type="email" />
                        <small className={`${styles.error} ${styles.emailError}`}></small>
                        <button type='button' onClick={() => setCheckoutProgress('shipping')}>
                            Continue to shipping
                        </button>
                    </form>
                ) : (
                    <span className={styles.userEmail}>
                        <h2>Welcome, guest</h2>
                        <h3>Email</h3>
                        <p>Useremail</p>
                        <p>Edit</p>
                    </span>
                )}
            </div>

            <div className={`${styles.card} ${styles.shipping}`}>
                {checkoutProgress === 'shipping' ? (
                    <>
                        <h2>Where should we send it?</h2>
                        <form className={styles.checkoutForm} id="shippingForm" action="">
                            <label htmlFor="country">Country / Region</label>
                            <select name="country" id="country">
                                {countryArray.map(({ code, name }) => (
                                    <option key={code} value={code}>{name}</option>
                                ))}
                            </select>
                            <small className={styles.error}></small>

                            <span className={styles.nameIn}>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className={styles.firstName} id="firstName" />
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className={styles.lastName} id="lastName" />
                            </span>

                            <span>
                                <button type="button" onClick={() => setHomeDelivery(true)}>Delivery</button>
                                <button type="button" onClick={() => setHomeDelivery(false)}>Pick up point</button>
                            </span>

                            {homeDelivery ? <HomeDelivery /> : <PickupPoint />}

                            <button type='button' onClick={() => setCheckoutProgress('Payment')}>
                                Continue to billing address
                            </button>
                        </form>
                    </>
                ) : (
                    <section>
                        {deliveryLocation.address && (
                            <>
                                <h2>Shipping</h2>
                                <h4>Ship to</h4>
                                <span className={styles.addressSummary}>
                                {deliveryLocation.address.city && <p>{deliveryLocation.address.city}</p>}
                                {deliveryLocation.address.road && <p>{deliveryLocation.address.road}</p>}
                                {deliveryLocation.address.postcode && <p>{deliveryLocation.address.postcode}</p>}
                                </span>
                                <p>Edit</p>
                            </>
                        )}
                    </section>
                )}
            </div>
        </>
    );
};

export default DeliveryForm;
