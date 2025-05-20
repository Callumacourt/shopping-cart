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
  const debounceTimer = useRef()

  const handleInput = (e) => {
    console.log(deliveryLocation)
      const value = e.target.value;
      setTypingAddress(value)
      clearTimeout(debounceTimer.current)
      
      debounceTimer.current = setTimeout(async () => {
          setIsLoading(true)
          const suggestions = await fetchAddress(value, countryCode);
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

        <input
          type="text"
          placeholder="address"
          onChange={handleInput}
          value={typingAddress}
        />

        <div className={styles.detailsDropdown}>
          <input
            type="text"
            placeholder="House Number"
            value={`${deliveryLocation.address?.house_number || ""}`}
            onChange= {(e) => editInput(e, "house_number")}
          />

          <input
            type="text"
            placeholder="Road name" 
            value={`${deliveryLocation.address?.road || ""}`}
            onChange={(e) => editInput(e, "road")}
          />

          <input
            type="text"
            placeholder="City / Town"
            value={deliveryLocation.address?.city || deliveryLocation.address?.town || "" || deliveryLocation.address?.village || ""}
            onChange={e => editInput(e, "city")
            }
          />

          <input
            type="text"
            placeholder="Post code"
            value={deliveryLocation.address?.postcode || ""}
            onChange={e => editInput(e, "postcode")}
          />

        </div>

        <section className={styles.suggestionsSection}>
        <div className={styles.addressDropdown}>
          {addresses.length > 0 ? (
            addresses.map((suggestion, index) => (
              <li
                onClick={() => setDeliveryLocation(suggestion)}
                key={index}
              >
                {suggestion.label}
              </li>
            ))
          ) : (
            <li>No suggestions found</li>
          )}
        </div>
        </section>
      </>
    )}
  </>
);
}

export default AddressForm;