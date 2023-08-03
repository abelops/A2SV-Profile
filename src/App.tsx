import { useState } from 'react'
import './App.css'
import Card from './components/Card'
function App() {
  return (
    <div className='flex justify-center'>
      <Card 
        name='Abel Getahun'
        phone='+251943891570'
        languages={["English", "Amharic"]}
        occupation='Developer'
        image='profile.jpg'
        tags={["Technology", "Development"]}/>
    </div>
  )
}

export default App
