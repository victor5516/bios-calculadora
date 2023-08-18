import React, {useState} from 'react'
import './App.css'
import Button from './components/Button'
import Wrapper from './components/Wrapper'
import Screen from './components/Screen'
import ButtonBox from './components/ButtonBox'
import { evaluate } from 'mathjs'

const btnValues = [
  ["C","+-","%", "/"],
  [7,8,9,"*"],
  [4,5,6,"-"],
  [1,2,3,"+"],
  [0,".","="]
 ]

 //flatted array
//const btnValues = [ "C","+-","%", "/",7,8,9,"X",4,5,6,"-",1,2,3,"+",0,".","="]

const checkIfSing = (value) => {
  if(value === "+" || value === "-" || value === "*" || value === "/" || value === "%" || value === ".")
    return true
  else
    return false
}

function App() {
  const [calc, setCalc] = useState({

    num: 0,
    })

  const numClickHandler = (e) => {
    e.preventDefault()

    const value = e.target.innerHTML
      setCalc({
        ...calc,
         num:
          calc.num === 0 && value === "0"
            ? "0"
            : calc.num % 1 === 0 && !checkIfSing(value)
            ? Number(calc.num  + value)
            : calc.num + value


      })
      console.log(calc.num)

  }

  const singClickHandler = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML
    setCalc({
      ...calc,
      num: calc.num * -1
    })
  }

  const equalsClickHandler = (e) => {
    e.preventDefault()
    setCalc({
      ...calc,
      num: evaluate(calc.num)
    })
  }

  const resetClickHandler = (e) => {
    e.preventDefault()
    setCalc({
      ...calc,
      num: 0
    })
  }

  const buttonClickHandler = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML
    if(value === "C"){
      resetClickHandler(e)
    } else if(value === "="){
      equalsClickHandler(e)
    }
    else if(value === "+-"){
      singClickHandler(e)
    }
    else{
      numClickHandler(e)
    }

  }




  return (
    <Wrapper>
      <Screen value={ calc.num }/>
      <ButtonBox>
        {btnValues.flat().map((btn,i)=>{
          return (<Button key={i} className={btn==="=" ? "equals" : "" }
                          value={btn} onclick={(e)=> buttonClickHandler(e)}/>)
        })}
        </ButtonBox>
     </Wrapper>
  )
}

export default App
