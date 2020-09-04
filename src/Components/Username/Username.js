import React from "react"

export default function Username(props) {
    return (
        <div>
            <input placeholder="enter username" onChange={props.onChange}></input>
        </div>
    )
}