import fetchNearbyLockers from "../Js/fetchPickups.js";
import styles from '../CSS/Checkout.module.css'
import { useContext, useState } from "react";
import { DeliveryContext } from "../../../context/DeliveryContext.jsx";
import Loader from '../../Loader.jsx'

const PickupPoint = () => {
    const  {
        loading,
        setIsLoading,
        setDeliveryLocation,
        pickupLocations,
        setPickupLocations,
    } = useContext(DeliveryContext)
    
    const [postcode, setPostcode] = useState('')
    const [activePick, setActivePick] = useState('')
    
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
                    <div
                    key={pickup.id}
                    className={styles.pickUpOption}
                    onClick={() => {
                        setDeliveryLocation(pickupLocations.find((location) => location.id === pickup.id))
                        setActivePick(pickup.id)
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={activePick === pickup.id}
                    style={{ cursor: 'pointer' }}
                >
                    <span
                        className={`${styles.pickBase} ${activePick === pickup.id ? styles.activePick : ''}`}
                        aria-hidden="true"
                    />
                    <h3>{pickup.name}</h3>
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