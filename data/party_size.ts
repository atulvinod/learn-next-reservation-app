export function getPartySize() {
    return Array.from({ length: 10 }, (element, index) => ({
        value: index + 1,
        option: `${index + 1} ${index == 0 ? "person" : "people"}`,
    }));
}
