import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

function ColorButton({ color, isActive, onClick }) {
    const handleClick = () => {
        onClick(color);
    }

    return (
        <div className="field">
            <div onClick={handleClick} className={isActive ? "button is-text is-active" : "button is-text"}>
                <span className="icon" style={{ color }}>
                    <FontAwesomeIcon icon={faCircle} />
                </span>
            </div>
        </div>
    );
}

export default ColorButton;