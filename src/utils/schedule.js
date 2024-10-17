import { decryptSymmetric } from './encryption'
import axios from 'axios';

async function getSeasonSchedule() {
  try {
    console.log("TRYGET")
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3001/api/schedule'})
    console.log("Schedule Data: ", response);
    return response;
  } catch (error) {
    console.error("Error fetching schedule:", error);
  }
}

export default getSeasonSchedule