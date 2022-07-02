const env = process.env.NODE_ENV
const URL = env==='production'?'https://peps-examms.vercel.app':'http://localhost:4000'
export default URL