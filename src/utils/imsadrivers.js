import { connect } from '@planetscale/database'
import { decryptSymmetric } from './encryption'

async function getAllDrivers(){ 


    const config = {
        host: import.meta.env.VITE_DATABASE_URL,
        username: import.meta.env.VITE_DATABASE_USER,
        password: decryptSymmetric(import.meta.env.VITE_DATABASE_PASSWORD)
      }
      const conn = connect(config)
      const results = await conn.execute('Select * from imsa_timing ORDER BY overall_position')
      return(results.rows)
 }

export default getAllDrivers