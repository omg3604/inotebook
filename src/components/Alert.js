import React from 'react'

export default function Alert(props) {

    const capitalize = (str) => {
        const lower = str.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{height: '50px'}}>
            {props.alert && <div>
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show pb-1`} role="alert">
                    <p><strong>{capitalize(props.alert.type)}! </strong>{props.alert.msg}</p>
                </div>
            </div>}
        </div>
    )
}
 