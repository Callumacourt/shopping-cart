import styles from './Checkout.module.css';
import { useContext, useState } from 'react';
import { DeliveryContext } from '../../context/DeliveryContext';
import AddressForm from './AddressForm';
import PickupPoint from './PickupPoint';
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
countries.registerLocale(en);

const DeliveryForm = ({ checkoutProgress, setCheckoutProgress }) => {
    const {
        homeDelivery,
        setHomeDelivery,
        deliveryLocation,
        setDeliveryLocation,
    } = useContext(DeliveryContext);

    const [userEmail, setUserEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [countryCode, setCountryCode] = useState('');;
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        surname: '',
        phone_number: ''
    });

    const countryList = countries.getNames("en", { select: "official" });
    const countryArray = Object.entries(countryList).map(([code, name]) => ({ code, name }));
    const [shippingErrors, setShippingErrors] = useState({})

    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateShipping = () => {
        const errors = {};
        if (!userDetails.first_name.trim()) errors.first_name = "First name is required";
        if (!userDetails.surname.trim()) errors.surname = "Last name is required";
        if (!userDetails.phone_number.trim()) errors.phone_number = "Phone number is required";
        if (!countryCode) errors.country = "Country is required";
        const hasHomeAddress = deliveryLocation.address?.postcode;
        const hasPickUp = deliveryLocation.postcode
        if (! hasHomeAddress && !hasPickUp) {
            errors.deliveryLocation = 'Please choose a delivery location';
        }
    return errors;
    }

    const handleShippingContinue = () => {
        const errors = validateShipping()
        setShippingErrors(errors)
        if (Object.keys(errors).length === 0) {
            setCheckoutProgress('Payment')
        }
    }

    // Generic handler for userDetails fields
    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div className={`${styles.card} ${styles.email}`}>
                {checkoutProgress === 'email' ? (
                    <form className={styles.checkoutForm} id="emailForm" action="">
                        <label htmlFor="email"><h2>Please enter your email address</h2></label>
                        <input  
                            onChange={(e) => 
                                {setUserEmail(e.target.value)
                                 if (validateEmail(e.target.value) === true) {
                                    setEmailError('')
                                 }
                            }
                        }
                            name="email" 
                            id="email" 
                            type="email"
                            value={userEmail} 
                        />
                        <small id='emailError' className={`${styles.error} ${styles.emailError}`}>{emailError}</small>
                        <button
                            type='button'
                            onClick={() => {
                                if (userEmail.length <= 0 || userEmail === null) {
                                    setEmailError('This field is required')
                                } else {
                                const validEmail = validateEmail(userEmail);
                                if (!validEmail) {
                                    setEmailError('Invalid email')
                                } else {
                                    setEmailError('')
                                    setCheckoutProgress('shipping');
                                }
                            }}}
                        >
                            Continue to shipping
                        </button>
                    </form>
                ) : (
                    <span className={styles.userEmail}>
                        <h2>Welcome, guest</h2>
                        <h3>Email</h3>
                        <p>{userEmail}</p>
                        <button onClick={() => setCheckoutProgress('email')}>Edit</button>
                    </span>
                )}
            </div>

            <div className={`${styles.card} ${styles.shipping}`}>
                {checkoutProgress === 'shipping' ? (
                    <>
                        <h2>Where should we send it?</h2>
                        <form className={styles.checkoutForm} id="shippingForm" action="">
                            <label htmlFor="country">Country / Region</label>
                            <select
                                onChange={(e) => setCountryCode(e.target.value)}
                                name="country"
                                id="country"
                                value={countryCode}
                            >
                                <option value="">Select a country</option>
                                {countryArray.map(({ code, name }) => (
                                    <option key={code} value={code}>{name}</option>
                                ))}
                            </select>
                            <small className={styles.error}>{shippingErrors.country}</small>

                            <span className={styles.nameIn}>
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    onChange={handleUserDetailsChange}
                                    value={userDetails.first_name}
                                    type="text"
                                    className={styles.firstName}
                                    id="first_name"
                                    name="first_name"
                                    required
                                    autoComplete="given-name"
                                />
                                <small className={styles.error}>{shippingErrors.first_name}</small>

                                <label htmlFor="surname">Last Name</label>
                                <input
                                    onChange={handleUserDetailsChange}
                                    value={userDetails.surname}
                                    type="text"
                                    className={styles.lastName}
                                    id="surname"
                                    name="surname"
                                    required
                                    autoComplete="family-name"
                                />
                                <small className={styles.error}>{shippingErrors.surname}</small>

                                <label htmlFor="phone_number">Phone Number</label>
                                <input
                                    onChange={handleUserDetailsChange}
                                    value={userDetails.phone_number}
                                    type="tel"
                                    className={styles.phoneNumber}
                                    id="phone_number"
                                    name="phone_number"
                                    required
                                    autoComplete="tel"
                                />
                                <small className={styles.error}>{shippingErrors.phone_number}</small>
                            </span>

                            <span>
                                <button type="button" onClick={() => setHomeDelivery(true)}>Delivery</button>
                                <button type="button" onClick={() => setHomeDelivery(false)}>Pick up point</button>
                            </span>

                            {homeDelivery
                                ? <AddressForm countryCode={countryCode} deliveryLocation={deliveryLocation} setDeliveryLocation={setDeliveryLocation}/>
                                : <PickupPoint countryCode={countryCode} />
                            }

                            <small className={styles.error}>{shippingErrors.deliveryLocation}</small>

                            <button type='button' onClick={handleShippingContinue}>
                                Continue to billing address
                            </button>
                        </form>
                    </>
                ) : (
                    <section>
                        {deliveryLocation &&
                            (
                                // Check deliveryLocation is populated
                                (deliveryLocation.address?.postcode || deliveryLocation.postcode) && (
                                    <>
                                        <h2>Shipping</h2>
                                        <h4>Ship to</h4>
                                        <span className={styles.addressSummary}>
                                            {/* For home delivery */}
                                            {deliveryLocation.address && (
                                                <>
                                                    {deliveryLocation.address.house_number && <p>{deliveryLocation.address.house_number}</p>}
                                                    {deliveryLocation.address.road && <p>{deliveryLocation.address.road}</p>}
                                                    {deliveryLocation.address.city && <p>{deliveryLocation.address.city}</p>}
                                                    {deliveryLocation.address.postcode && <p>{deliveryLocation.address.postcode}</p>}
                                                </>
                                            )}
                                            {/* For pickup point */}
                                            {deliveryLocation.name && <p>{deliveryLocation.name}</p>}
                                            {deliveryLocation.street && <p>{deliveryLocation.street}</p>}
                                            {deliveryLocation.city && <p>{deliveryLocation.city}</p>}
                                            {deliveryLocation.postcode && <p>{deliveryLocation.postcode}</p>}
                                        </span>
                                        <button onClick={() => setCheckoutProgress('shipping')}>Edit</button>
                                    </>
                                )
                            )
                        }
                    </section>
                )}
            </div>
        </>
    );
};

export default DeliveryForm;