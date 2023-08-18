import React from "react"
import "./Button.css"
const Button = ({ className, value, onclick})=> {
    return (
        <button className={className} onClick={onclick}>
            {value}
        </button>
    )

}

export default Button

