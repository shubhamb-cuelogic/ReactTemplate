import React from 'react';
import './Sandbox.css';

const Sandbox = () => {
    return (
        <div className="canvas">
            <svg className="svg-container" viewBox="0 0 300 300" width="300" height="300">
                <circle cx="150" cy="150" r="100" fill="hotpink" stroke="dodgerblue" />
                <circle cx="150" cy="150" r="50" fill="dodgerblue" stroke="blue" />
                <line x1="150" y1="50" x2="150" y2="250" stroke="black" />
                <line x1="50" y1="150" x2="250" y2="150" stroke="black" />
            </svg>
            <svg className="svg-container" viewBox="0 0 300 300" width="300" height="300">
                <g fill='olive'>
                    <polygon points="0,300 100,100 175,300"   />
                    <polygon points="100,300 200,140 300,300"  />
                </g>
                <circle cx="220" cy="100" r="30" fill="gold"/>
                <ellipse cx="100" cy="40" rx="65" ry="25" fill="whitesmoke" />
                <ellipse cx="120" cy="60" rx="35" ry="10" fill="whitesmoke" />
                <ellipse cx="100" cy="18" rx="35" ry="10" fill="whitesmoke" />
            </svg>
        </div>
    )
}

export default Sandbox;