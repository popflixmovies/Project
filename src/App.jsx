import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
const Card = ({number}) =>{
  let [count, setCount]= useState(0);
  let [hasBeenLiked, setHasBeenLiked] = useState(false)
  let [unliked, setUnliked] = useState(false)
  useEffect(()=>{
    console.log(`card number ${number} is liked ${hasBeenLiked}`)
  }, [hasBeenLiked])
  return(
    <div onClick={()=>{setCount(count + 1)}}>
    <h2>likes: {count} of card {number} 
        <br />
       
        <button onClick={()=>{
          hasBeenLiked ? setHasBeenLiked(false) : setHasBeenLiked(true);
        }}>{hasBeenLiked ? "❤️" : "🤍"}</button>
      </h2>
     
    </div>
    
  )
}
const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <Card number={1}/>
      <Card number={2}/>
      <Card number={3}/>
    </div>
  )
}
export default App
