import React from "react"

export default function Button(props) {
    return (
        <button onClick={props.onSubmit}>{props.option}</button>
    )
}