import { connect } from '@planetscale/database'
import { decryptSymmetric } from './encryption'

async function getSeasonSchedule(){ 


    const config = {
        host: import.meta.env.VITE_DATABASE_URL,
        username: import.meta.env.VITE_DATABASE_USER,
        password: decryptSymmetric(import.meta.env.VITE_DATABASE_PASSWORD)
      }
      const conn = connect(config)
      const results = await conn.execute('Select * from season_schedule ORDER BY date, time')
      return(results.rows)
 }

export default getSeasonSchedule