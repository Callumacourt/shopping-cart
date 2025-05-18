import fetchAddress from "./fetchAddress";
import { useContext } from "react";
import styles from './Checkout.module.css'
import Loader from '../Loader.jsx'
import { useState, useRef } from "react";
import { DeliveryContext } from "../../context/DeliveryContext";

const HomeDelivery = ({}) => {
    const 
    {
      loading, 
      setIsLoading, 
      typingAddress, 
      setTypingAddress, 
      deliveryLocation, 
      setDeliveryLocation
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
            const suggestions = await fetchAddress(value);
            setAddresses(suggestions)
            setIsLoading(false)
        }, 500)
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
            placeholder="Address Line 2"
            value={[deliveryLocation.address?.house_number || "  ", deliveryLocation.address?.road || ""]}
            onChange={(e) =>
              setDeliveryLocation({ ...deliveryLocation, address: e.target.value })
            }
          />
          <input 
          type="text" 
          placeholder="City / Town"
          value={deliveryLocation.address?.city ||deliveryLocation.address?.town || ""}
          onChange={(e) => ({...deliveryLocation, city: e.target.value})}  />
          <input 
          type="text" 
          placeholder="Post code"
          value={deliveryLocation.address?.postcode || ""}
          onChange={(e) => ({...deliveryLocation, postcode: e.target.value})}  />
          <input type="number" placeholder="phone number" />
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

export default HomeDelivery;