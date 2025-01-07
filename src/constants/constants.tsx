const devURL = 'http://localhost:3022'
const stagingURL = 'https://api.block-wire.com'
export const baseURL = window.location.hostname?.includes('localhost') ? devURL : stagingURL
