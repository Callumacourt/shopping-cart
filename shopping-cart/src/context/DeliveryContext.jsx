import {createContext, useContext, useState} from "react"

export const DeliveryContext = createContext()

export const DeliveryProvider = ({children}) => {
    const [homeDelivery, setHomeDelivery] = useState(true);
    const [typingAddress, setTypingAddress] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState({});
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
                loading,
                setIsLoading,
            }}
        >
            {children}
        </DeliveryContext.Provider>
    );
};

export const useDelivery = () => useContext(DeliveryContext)