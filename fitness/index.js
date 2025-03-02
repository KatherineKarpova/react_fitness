import http from 'http'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// open sqlite db
const openDb = async () => {
  const db = await open({
    filename: './db/fitness.db', // path to SQLite database
    driver: sqlite3.Database
  })
  return db
}

// create HTTP server
const app = http.createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/getAllData') {
    try {
      const db = await openDb()

      // fetch data from all tables
      const exercises = await db.all('SELECT * FROM exercises')
      const muscles = await db.all('SELECT * FROM muscles')
      const musclesWorked = await db.all('SELECT * FROM muscles_worked')
      const logs = await db.all('SELECT * FROM logs')
      const routineNames = await db.all('SELECT * FROM routineNames')
      const routineExercises = await db.all('SELECT * FROM routine_exercises')

      // Combine all data into one object
      const allData = {
        exercises,
        muscles,
        musclesWorked,
        logs,
        routineNames,
        routineExercises
      }

      // Send all data as a JSON response
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(allData))

      db.close()
    } catch (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' })
      response.end('Error fetching data from database')
      console.error(error)
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('Route not found')
  }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)