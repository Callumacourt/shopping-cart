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
    const [hasSearched, setHasSearched] = useState(false)
    
    const handleInput = async () => {
        try {
        setIsLoading(true)
        const pickups = await fetchNearbyLockers(postcode)
        setIsLoading(false)
        setPickupLocations(pickups)
        setHasSearched(true)
        } catch {
            setPickupLocations('Empty')
        }
    }
    return (
        <>
            <span className={styles.pickupSearchWrapper}>
                <input 
                    type="text" 
                    placeholder="Postcode" 
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    id="postcode" 
                />
                <button
                    type="button"
                    onClick={handleInput}
                >
                    Search
                </button>
            </span>
            <div className={styles.pickUpContainer}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <h3>Choose a pickup location</h3>
                        {Array.isArray(pickupLocations) && pickupLocations.length > 0 ? (
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
                        ) : (
                            hasSearched && (
                            <p>No pickup locations found.</p>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default PickupPoint