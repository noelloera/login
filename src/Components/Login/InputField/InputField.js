import React from 'react'

const InputField = (props) =>{
    return <div>
        <input
            name={props.name}
            placeholder = {props.placeholder}
            type={props.type}
            onChange = {e=>props.onChange(e)}
        ></input>
    </div>
} 

export default InputField;