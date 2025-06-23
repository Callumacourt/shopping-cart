import fetchAddress from "../Js/fetchAddress.js";
import { useContext } from "react";
import styles from '../CSS/Checkout.module.css'
import Loader from '../../Loader.jsx'
import { useState, useRef } from "react";
import { DeliveryContext } from "../../../context/DeliveryContext.jsx";

const AddressForm = ({countryCode, deliveryLocation, setDeliveryLocation}) => {
  const 
  {
    loading, 
    setIsLoading, 
    typingAddress, 
    setTypingAddress, 
  } = useContext(DeliveryContext)

  const [addresses, setAddresses] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const debounceTimer = useRef()

  const handleInput = (e) => {
      const value = e.target.value;
      setTypingAddress(value)
      clearTimeout(debounceTimer.current)
      
      debounceTimer.current = setTimeout(async () => {
          setIsLoading(true)
          const suggestions = await fetchAddress(value, countryCode);
          setHasSearched(true)
          setAddresses(suggestions)
          setIsLoading(false)
      }, 500)
  }

  const editInput = (e, valueToEdit) => {
      setDeliveryLocation({
        ...deliveryLocation,
        address: {
          ...deliveryLocation.address,
          [valueToEdit]: e.target.value
        }
      })
  }

   return (
  <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <section className={styles.addressForm}>
          <label htmlFor="address-search" className={styles['sr-only']}>Search for your address</label>
          <input
            id="address-search"
            type="text"
            placeholder="Start typing your address"
            onChange={handleInput}
            value={typingAddress}
            aria-autocomplete="list"
            aria-controls="address-suggestions"
            aria-label="Search for your address"
          />

          {deliveryLocation.address?.postcode && (
            <div className={styles.detailsDropdown}>
              <label htmlFor="house-number" className={styles['sr-only']}>House Number</label>
              <input
                id="house-number"
                type="text"
                placeholder="House Number"
                value={deliveryLocation.address?.house_number || ""}
                onChange={(e) => editInput(e, "house_number")}
                aria-label="House Number"
              />

              <label htmlFor="road-name" className={styles['sr-only']}>Road name</label>
              <input
                id="road-name"
                type="text"
                placeholder="Road name"
                value={deliveryLocation.address?.road || ""}
                onChange={(e) => editInput(e, "road")}
                aria-label="Road name"
              />

              <label htmlFor="city-town" className={styles['sr-only']}>City or Town</label>
              <input
                id="city-town"
                type="text"
                placeholder="City / Town"
                value={
                  deliveryLocation.address?.city ||
                  deliveryLocation.address?.town ||
                  deliveryLocation.address?.village ||
                  ""
                }
                onChange={(e) => editInput(e, "city")}
                aria-label="City or Town"
              />

              <label htmlFor="postcode" className={styles['sr-only']}>Post code</label>
              <input
                id="postcode"
                type="text"
                placeholder="Post code"
                value={deliveryLocation.address?.postcode || ""}
                onChange={(e) => editInput(e, "postcode")}
                aria-label="Post code"
              />
            </div>
          )}

          <section className={styles.suggestionsSection}>
            <div
              className={styles.addressDropdown}
              id="address-suggestions"
              role="listbox"
              aria-label="Address suggestions"
              aria-live="polite"
            >
              {addresses.length > 0 ? (
                addresses.map((suggestion, index) => (
                  <li
                    onClick={() => setDeliveryLocation(suggestion)}
                    key={index}
                    role="option"
                    aria-selected="false"
                    tabIndex={0}
                  >
                    {suggestion.label}
                  </li>
                ))
              ) : (
                hasSearched && (
                  <li>No suggestions found</li>
                )
              )}
            </div>
          </section>
        </section>
      </>
    )}
  </>
);
}

AddressForm.propTypes = {
  countryCode: PropTypes.string.isRequired,
  deliveryLocation: PropTypes.shape({
    address: PropTypes.object,
  }).isRequired,
  setDeliveryLocation: PropTypes.func.isRequired,
};

export default AddressForm;