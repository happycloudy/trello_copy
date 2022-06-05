export const toHex = (number: number) => `#${number.toString(16)}`
export const fromHex = (hex: string) => parseInt(hex.slice(1), 16)