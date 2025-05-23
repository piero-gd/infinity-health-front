import type { Diet } from "../types";



async function fetchDiet(): Promise<Diet> {
    const response = await fetch('https://infinityhealthapi.onrender.com/api/calcMacros/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ',
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log("fetchData", data);
    return data;
}

export default fetchDiet;