import React from "react"

export default function Password(props) {
    return (
        <div>
            <input placeholder="enter password" onChange={props.onChange}></input>
        </div>
    )
}