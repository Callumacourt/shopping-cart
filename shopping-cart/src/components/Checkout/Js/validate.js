
export const validateEmail = (email) => { 
    if (!email || email.trim() === '') return 'This field is required'

    const atIndex = email.indexOf('@')
    if (atIndex === -1) return 'Email must contain an @ symbol'

    const local = email.slice(0, atIndex)
    const domain = email.slice(atIndex + 1)

    if(!local) return 'Email must have characters before @'
    if (!domain) return 'Email must have characters after @'

    const domainParts = domain.split('.')
    if (domainParts.length < 2) return 'Email must have a . e.g .com'
    return false
}

export const validateShipping = (userDetails, deliveryLocation) => {
    const errors = {};
    if (!userDetails.firstName.trim()) errors.firstName = "First name is required";
    if (!userDetails.surname.trim()) errors.surname = "Last name is required";
    if (!userDetails.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    if (!userDetails.countryCode) errors.country = "Country is required";
    
    const hasHomeAddress = deliveryLocation.address?.postcode;
    const hasPickUp = deliveryLocation.postcode
    if (! hasHomeAddress && !hasPickUp) {
        errors.deliveryLocation = 'Please choose a delivery location';
    }
    return errors;
}
