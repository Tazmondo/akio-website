export let apiUrl = "http://localhost:8080/"

export function priceIntToString(price: number) {
    return `£${price / 100}`
}

export function spaceToDash(input: string) {
    return input.replaceAll(" ", "-")
}

export function dashToSpace(input: string) {
    return input.replaceAll("-", " ")
}
