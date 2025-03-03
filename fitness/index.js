import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const app = express()

// Enable CORS middleware
app.use(cors())

// Open SQLite DB function
const openDb = async () => {
  const db = await open({
    filename: './db/fitness.db',
    driver: sqlite3.Database
  })
  return db
}

// Define your route
app.get('/getAllData', async (res) => {
  try {
    const db = await openDb()

    // Fetch data from the database
    const exercises = await db.all('SELECT * FROM exercises')
    const muscles = await db.all('SELECT * FROM muscles')
    const musclesWorked = await db.all('SELECT * FROM muscles_worked')
    const logs = await db.all('SELECT * FROM logs')
    const routineNames = await db.all('SELECT * FROM routineNames')
    const routineExercises = await db.all('SELECT * FROM routine_exercises')

    const allData = {
      exercises,
      muscles,
      musclesWorked,
      logs,
      routineNames,
      routineExercises
    }

    // Send the data as JSON
    res.json(allData)

    db.close()
  } catch (error) {
    res.status(500).send('Error fetching data from database')
    console.error(error)
  }
})

// Start the server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
