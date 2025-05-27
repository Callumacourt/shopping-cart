import {createContext, useContext, useState} from "react"

export const DeliveryContext = createContext()

export const DeliveryProvider = ({children}) => {
    const [checkoutProgress, setCheckoutProgress] = useState('email')
    
    const [userDetails, setUserDetails] = useState({
        email: '',
        firstName: '',
        surname: '',
        phoneNumber: '',
        countryCode: '',
    });
    const [homeDelivery, setHomeDelivery] = useState(true);
    const [typingAddress, setTypingAddress] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState({});
    const [billingAddress, setBillingAddress] = useState({})
    const [pickupLocations, setPickupLocations] = useState([])
    const [loading, setIsLoading] = useState(false);

     return (
        <DeliveryContext.Provider
            value={{
                checkoutProgress,
                setCheckoutProgress,
                userDetails,
                setUserDetails,
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