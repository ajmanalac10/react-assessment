export const fetchData = async () => {
    const apiUrl = `https://jsonplaceholder.typicode.com/posts`
    return await fetch(apiUrl,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => responseData)
        .catch((error) => new Error(error))
}