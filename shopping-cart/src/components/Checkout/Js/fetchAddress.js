export default async function fetchAddress(address, countryCode) {
    try {
        let url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;
        if (countryCode) {
            console.log(countryCode)
            url += `&countrycodes=${countryCode.toLowerCase()}`;
        }
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch address');
        }
        const data = await res.json();
        return data.map(result => ({
            label: result.display_name,
            lat: result.lat,
            lon: result.lon,
            address: result.address
        }));
    } catch (error) {
        console.log(error);
    }
}