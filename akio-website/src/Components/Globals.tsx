export let apiUrl = process.env.NODE_ENV === 'development' ? "http://localhost:8080/" : '/'

// console.log(process.env.NODE_ENV)

export function priceIntToString(price: number) {
    return `£${price / 100}`
}

export function spaceToDash(input: string) {
    return input.replaceAll(" ", "-")
}

export function dashToSpace(input: string) {
    return input.replaceAll("-", " ")
}
