import {ACTIONS} from './App'

export default function DigitButton({dispatch,digit}){
    // console.log(dispatch,"dispatch")
    // console.log(digit,"digit")
    return <button
        onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit} })}
    >
        {digit}
    </button>
}