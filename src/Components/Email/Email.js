import React from "react"

export default function Email(props) {
    return (
        <div>
            <input placeholder="enter email" onChange={props.onChange}></input>
        </div>
    )
}