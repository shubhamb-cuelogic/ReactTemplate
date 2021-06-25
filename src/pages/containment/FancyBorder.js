import React from 'react'

export default function FancyBorder(props) {
    return (
        <div className={`FancyBorder-${props.color}`}>
            {props.children}
        </div>
    )
}
