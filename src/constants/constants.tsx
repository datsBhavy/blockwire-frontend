const devURL = 'http://localhost:3022'
const stagingURL = 'http://awsurlhere.com'
export const baseURL = window.location.hostname?.includes('localhost') ? devURL : stagingURL