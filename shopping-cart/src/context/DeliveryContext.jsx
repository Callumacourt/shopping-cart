import {createContext, useContext, useState} from "react"

export const DeliveryContext = createContext()

export const DeliveryProvider = ({children}) => {
    const [homeDelivery, setHomeDelivery] = useState(true);
    const [typingAddress, setTypingAddress] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState({});
    const [billingAddress, setBillingAddress] = useState({})
    const [pickupLocations, setPickupLocations] = useState([])
    const [loading, setIsLoading] = useState(false);

     return (
        <DeliveryContext.Provider
            value={{
                homeDelivery,
                setHomeDelivery,
                typingAddress,
                setTypingAddress,
                deliveryLocation,
                setDeliveryLocation,
                billingAddress,
                setBillingAddress,
                loading,
                setIsLoading,
                pickupLocations, 
                setPickupLocations,
            }}
        >
            {children}
        </DeliveryContext.Provider>
    );
};

export const useDelivery = () => useContext(DeliveryContext)