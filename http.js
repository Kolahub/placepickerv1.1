export async function fetchDataReq () {
    const res = await fetch("http://localhost:3000/places");
    if (!res.ok) {
      throw new Error("Failed to fetch places.");
    }
    const data = await res.json();

    return data.places
}

export async function updateUserPlaces (places) {
   const res = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places: places}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    if(!res.ok) throw new Error('Failed to update user data.')
    
    return data.message
}

export async function fetchUserPlaces () {
    const res = await fetch("http://localhost:3000/user-places");
    if (!res.ok) {
      throw new Error("Failed to fetch user places.");
    }
    const data = await res.json();

    return data.places
}