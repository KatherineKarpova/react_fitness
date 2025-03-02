import { useState } from 'react'
import SelectDate from '../components/SelectDate'
import './App.css'

function App() {

  const [dailyExerciseLog, setDailyExerciseLog] = useState({
    name: null, 
    reps: null,
    weight: null,
  })

  return (
    <div>
      <DateToday/>
    </div>
  )
}

export default App
