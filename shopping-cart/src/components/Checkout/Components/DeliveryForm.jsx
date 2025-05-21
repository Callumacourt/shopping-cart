import styles from '../CSS/Checkout.module.css'
import { useContext, useMemo, useState } from 'react';
import { validateEmail, validateShipping } from '../Js/validate';
import { DeliveryContext } from '../../../context/DeliveryContext';
import AddressForm from './AddressForm';
import PickupPoint from './PickupPoint';
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
countries.registerLocale(en);

const EmailStep = ({ userDetails, handleUserDetailsChange, setCheckoutProgress }) => {
    const [emailError, setEmailError] = useState('');
    const userEmail = userDetails.email;

    const handleEmailSubmission = () => {
        const emailError = validateEmail(userEmail);
        emailError === false ? setCheckoutProgress('shipping') : setEmailError(emailError);
    };

    return (
        <form className={styles.checkoutForm} id="emailForm" action="">
            <label htmlFor="email"><h2>Please enter your email address</h2></label>
            <input
                onChange={(e) => {
                    handleUserDetailsChange(e)
                    if (validateEmail(e.target.value)) {
                        setEmailError('')
                    }
                }}
                name="email"
                id="email"
                type="email"
                value={userEmail}
            />
            <small id='emailError' className={`${styles.error} ${styles.emailError}`}>{emailError}</small>
            <button
                type='button'
                onClick={handleEmailSubmission}
            >
                Continue to shipping
            </button>
        </form>
    )
}

const EmailSummary = ({ userDetails, setCheckoutProgress }) => (
    <span className={styles.userEmail}>
        <h2>Welcome, guest</h2>
        <h3>Email</h3>
        <p>{userDetails.email}</p>
        <button onClick={() => setCheckoutProgress('email')}>Edit</button>
    </span>
);

const ShippingStep = ({ userDetails, handleUserDetailsChange, setCheckoutProgress }) => {
    const {
        homeDelivery,
        setHomeDelivery,
        deliveryLocation,
        setDeliveryLocation,
    } = useContext(DeliveryContext);

    const [shippingErrors, setShippingErrors] = useState({});

    const handleShippingContinue = () => {
        const errors = validateShipping(userDetails, deliveryLocation);
        setShippingErrors(errors);
        if (Object.keys(errors).length === 0) {
            setCheckoutProgress('Payment');
        }
    };

    const countryList = useMemo(() => {
        const list = countries.getNames("en", { select: "official" });
        return Object.entries(list).map(([code, name]) => ({ code, name }));
    }, []);

    return (
        <>
            <h2>Where should we send it?</h2>
            <form className={styles.checkoutForm} id="shippingForm" action="">
                <label htmlFor="countryCode">Country / Region</label>
                <select
                    onChange={handleUserDetailsChange}
                    name="countryCode"
                    id="countryCode"
                    value={userDetails.countryCode}
                >
                    <option value="">Select a country</option>
                    {countryList.map(({ code, name }) => (
                        <option key={code} value={code}>{name}</option>
                    ))}
                </select>
                <small className={styles.error}>{shippingErrors.country}</small>

                <span className={styles.nameIn}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        onChange={handleUserDetailsChange}
                        value={userDetails.firstName}
                        type="text"
                        className={styles.firstName}
                        id="firstName"
                        name="firstName"
                        required
                        autoComplete="given-name"
                    />
                    <small className={styles.error}>{shippingErrors.first_name}</small>

                    <label htmlFor="surname">Surname</label>
                    <input
                        onChange={handleUserDetailsChange}
                        value={userDetails.surname}
                        type="text"
                        className={styles.surname}
                        id="surname"
                        name="surname"
                        required
                        autoComplete="family-name"
                    />
                    <small className={styles.error}>{shippingErrors.surname}</small>

                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        onChange={handleUserDetailsChange}
                        value={userDetails.phoneNumber}
                        type="tel"
                        className={styles.phoneNumber}
                        id="phoneNumber"
                        name="phoneNumber"
                        required
                        autoComplete="tel"
                    />
                    <small className={styles.error}>{shippingErrors.phoneNumber}</small>
                </span>

                <span>
                    <button type="button" onClick={() => setHomeDelivery(true)}>Delivery</button>
                    <button type="button" onClick={() => setHomeDelivery(false)}>Pick up point</button>
                </span>

                {homeDelivery
                    ? <AddressForm
                        countryCode={userDetails.countryCode}
                        deliveryLocation={deliveryLocation}
                        setDeliveryLocation={setDeliveryLocation} />
                    : <PickupPoint countryCode={userDetails.countryCode} />
                }

                <small className={styles.error}>{shippingErrors.deliveryLocation}</small>

                <button type='button' onClick={handleShippingContinue}>
                    Continue to billing address
                </button>
            </form>
        </>
    );
};

const ShippingSummary = ({ setCheckoutProgress }) => {
    const { deliveryLocation } = useContext(DeliveryContext);

    // Only render if a location is chosen
    if (!(deliveryLocation.address?.postcode || deliveryLocation.postcode)) return null;

    return (
        <section>
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
        </section>
    );
};

const DeliveryForm = () => {
    const {
        checkoutProgress,
        setCheckoutProgress,
        userDetails,
        setUserDetails
    } = useContext(DeliveryContext);

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
                    <EmailStep
                        userDetails={userDetails}
                        setCheckoutProgress={setCheckoutProgress}
                        handleUserDetailsChange={handleUserDetailsChange}
                    />
                ) : (
                    <EmailSummary
                        userDetails={userDetails}
                        setCheckoutProgress={setCheckoutProgress}
                    />
                )}
            </div>

            <div className={`${styles.card} ${styles.shipping}`}>
                {checkoutProgress === 'shipping' ? (
                    <ShippingStep
                        userDetails={userDetails}
                        handleUserDetailsChange={handleUserDetailsChange}
                        setCheckoutProgress={setCheckoutProgress}
                    />
                ) : (
                    <ShippingSummary setCheckoutProgress={setCheckoutProgress} />
                )}
            </div>
        </>
    );
};

export default DeliveryForm;