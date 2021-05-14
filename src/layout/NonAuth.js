import React from 'react'
import { withRouter } from "react-router-dom";

function NonAuthLayout(props) {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}
export default (withRouter(NonAuthLayout));