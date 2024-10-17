// import { decryptSymmetric } from './encryption'
import axios from 'axios';

async function getSeasonSchedule() {
  try {
    // Define URLs based on the environment
    // const apiUrl = process.env.NODE_ENV === 'production'
    // ? 'https://indycardrivers.com'  // Use production URL
    // : 'http://localhost:3001' // Use localhost URL during development
    const response = await axios({
      method: 'get',
      url: `https://indycardrivers.com/api/schedule`})
    console.log("Schedule Data: ", response);
    return response;
  } catch (error) {
    console.error("Error fetching schedule:", error);
  }
}

export default getSeasonSchedule