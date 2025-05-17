import styles from './Checkout.module.css';
import { useContext } from 'react';
import { DeliveryContext} from '../../context/DeliveryContext';
import HomeDelivery from './HomeDelivery';
import PickupPoint from './PickupPoint'
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
countries.registerLocale(en);

const DeliveryForm = () => {
    const {
        homeDelivery, 
        setHomeDelivery
    } = useContext(DeliveryContext)

    const countryList = countries.getNames("en", { select: "official" });
    const countryArray = Object.entries(countryList).map(([code, name]) => ({ code, name }));
    
    return (
        <>
      <div className={`${styles.card} ${styles.email}`}>
                    <form className={styles.checkoutForm} id="emailForm" action="">
                        <label htmlFor="email">Please enter your email address</label>
                        <input name="email" id="email" type="email" />
                        <small className={`${styles.error} ${styles.emailError}`}></small>
                    </form>
                </div>
                <div className={`${styles.card} ${styles.shipping}`}>
                    <form className={styles.checkoutForm} id="shippingForm" action="">
                        <label htmlFor="country">Country / Region</label>
                        <select name="country" id="country">
                            {countryArray.map(({ code, name }) => (
                                <option key={name} value={code}>{name}</option>
                            ))}
                        </select>
                        <small className={styles.error}></small>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className={styles.firstName} id="firstName" />
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className={styles.lastName} id="lastName" />
                        <button type="button" onClick={() => setHomeDelivery(true)}>Delivery</button>
                        <button type="button" onClick={() => setHomeDelivery(false)}>Pick up point</button>
                        {homeDelivery ? (
                        <HomeDelivery /> 
                         ) : (
                        <PickupPoint />
                        )}
                    </form>
                </div>
                </>
    )
}

export default DeliveryForm