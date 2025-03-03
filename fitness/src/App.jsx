import { useState, useEffect } from 'react'
import DateToday from '../components/DateToday'
import './App.css'

const App = () => {

    const [newWorkoutLog, setNewWorkoutLog] = useState({})
    const [exercises, setExercises] = useState([])
    const [muscles, setMuscles] = useState([])
    const [musclesWorked, setMusclesWorked] = useState([])
    const [logs, setLogs] = useState([])
    const [routineNames, setRoutineNames] = useState([])
    const [routineExercises, setRoutineExercises] = useState([])
  
    const fetchAllData = () => {
      fetch('http://localhost:3001/getAllData')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)  // Check the data returned from the backend
      })
      .catch((error) => {
        console.error('Error fetching data', error)
      })}
  
    // only fetch data once by depending on empty array []
    useEffect(() => {
      fetchAllData()
    }, [])

  return (
    <div>
      <DateToday/>
    </div>
  )
}
export default App