import { useState } from "react";
import { useCart } from "../../context/CartContext";
import fetchNearbyLockers from "./fetchPickups";

const Checkout = ({basketItems}) => {
    const {cartItems} = useCart();
    const [homeDelivery, setHomeDelivery] = useState(true)
    const [pickupLocations, setPickupLocations] = useState([])

    return (
    <>
    <div className="orderSection">
        <p>Order total 
            {cartItems
            .reduce((total, item) => total + item.price * item.qty, 0)
            .toFixed(2)}
        </p>
    </div>
    <div className="paymentSection">
        <div className="card email">
            <form className="checkoutForm" id="emailForm" action="">
                <label htmlFor="email">Please enter your email address</label>
                <input name="email" id="email" type="email" />
                <small className="error emailError"></small>
            </form>
        </div>
        <div className="card shipping">
            <form className="checkoutForm" id="shippingForm" action="">
                <label htmlFor="country">Country / Region</label>
                    <select name="country" id="country"></select>
                    <small className="error"></small>
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="firstName" id="firstName"/>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="lastName" id="lastName" />
                <button type="button" onClick={() => setHomeDelivery(true)}>Delivery</button>
                <button type="button" onClick={() => setHomeDelivery(false)}>Pick up point</button>
                {homeDelivery 
                ? 
                    <input type="text" placeholder="address"></input>
                 : 
                <>  
                  <input type="number" placeholder="phoneNumber"></input>
                  <input type="text" placeholder="post code" id="postcode"></input>
                  <button onClick= {async() => {
                    try {
                        const postcode = document.getElementById('postcode').value
                        const pickups = await fetchNearbyLockers(postcode);
                        setPickupLocations(pickups)
                    } catch (error) {
                        console.log(error)
                    }
                }}
                    type="button">Search</button>
                    <div className="pickUpContainer">
                        {
                        pickupLocations.slice(0, 5).map((pickup) => (
                            <div key={pickup.id}>
                                <p>{pickup.name}</p>
                                <p>{pickup.street}, {pickup.city}</p>
                                <p>{pickup.postcode}</p>
                            </div>
                        ))}
                    </div>
                </>
                 }

            </form>
        </div>
        <div className="card payment">
            <form className="checkoutForm" id="paymentForm" action="">
                    
            </form>
        </div>
    </div>
    </>
    )
}

export default Checkout;