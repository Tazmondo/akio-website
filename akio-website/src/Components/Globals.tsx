let apiUrl = "http://localhost:8080/"

function priceIntToString(price: number) {
    return `£${price / 100}`
}

export {apiUrl, priceIntToString}
