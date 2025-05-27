async function reverseGeocode(lat, lon) {
    try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    const res = await fetch (url, {
          headers: {
            'User-Agent': 'eCommerceApp/1.0 fakemailt@gmail.comm'
        }
    })
    const data = await res.json()
    console.log(data.address)
    return data.address;
    } catch {
        throw new Error('Failed to fetch address')
    }
}

export default async function fetchNearbyLockers(postcode) {
    try {
        const postcodeResponse = await fetch (`https://api.postcodes.io/postcodes/${postcode}`)
        const postcodeData = await postcodeResponse.json();

        if (!postcodeData.result) {
            throw new Error ('Invalid postcode')
        }

        const {latitude, longitude} = postcodeData.result
        
        const overpassQuery = `[out:json];
    node["amenity"~"parcel_locker|post_office|parcel_pickup"](around:2000,${latitude},${longitude});
    out;
    `;
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
        const overpassResponse = await fetch(overpassUrl);

        if (!overpassResponse.ok) {
            throw new Error ('Failed to fetch parcel lockers')
        }

        const overpassData = await overpassResponse.json();
        
        const pickupLocations = await Promise.all(
            overpassData.elements.map(async el => {
            let address = {};
            if (!el.tags?.["addr:street"] && !el.tags?.["addr.city"]) {
                try {
                    address = await reverseGeocode(el.lat, el.lon);
                } catch (e) {
                    throw new Error (`Failed to reverse geocode for ${el.id}`)
                }
            }

            return {
            id: el.id,
            lat: el.lat,
            lon: el.lon,
            name: el.tags?.name || "Locker",
            city: el.tags?.["addr:city"] || address.city || '',
            street: el.tags?.["addr:street"] || address.road || '',
            postcode: el.tags?.["addr:postcode"] || address.postcode || '',
            operator: el.tags?.operator || ''
            }
        })
    )
    return pickupLocations
    } catch (error) {
        console.log(error)
        throw error;
    }
}
