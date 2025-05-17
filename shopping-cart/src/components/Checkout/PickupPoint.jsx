import fetchNearbyLockers from "./fetchPickups";
import styles from './Checkout.module.css'
import { useContext, useState } from "react";
import { DeliveryContext } from "../../context/DeliveryContext";
import Loader from '../Loader.jsx'

const PickupPoint = () => {

    const  {
        loading,
        setIsLoading,
        setDeliveryLocation
    } = useContext(DeliveryContext)
    
    const [postcode, setPostcode] = useState('')
    const [pickupLocations, setPickupLocations] = useState([])
    
    const handleInput = async () => {
        try {
        setIsLoading(true)
        const pickups = await fetchNearbyLockers(postcode)
        setIsLoading(false)
        setPickupLocations(pickups)
        } catch {
            setPickupLocations('Empty')
        }
    }
    return (
        <>
        <input type="number" placeholder="phoneNumber" />
        <input 
        type="text" 
        placeholder="post code" 
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        id="postcode" />
        <button
            type="button"
            onClick={handleInput}
        >Search
        </button>
            <div className={styles.pickUpContainer}>
            {loading ? (<Loader />) 
            : (
                pickupLocations.slice(0, 5).map((pickup) => (
                    <div onClick={() => {
                        setDeliveryLocation(pickupLocations.find((location) => location.id === pickup.id))}}
                    key={pickup.id}>
                        <p>{pickup.name}</p>
                        <p>
                            {pickup.street}, {pickup.city}
                        </p>
                        <p>{pickup.postcode}</p>
                    </div>
                ))
            )}
            </div>
        </>
    )
}

export default PickupPoint