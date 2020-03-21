import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { connect } from 'react-redux';
import { setCurrentCanvasData } from '../../../redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faUndo, faTrash } from '@fortawesome/free-solid-svg-icons'

import './Canvas.scss';
import './ColorButton';
import ColorButton from './ColorButton';

function Canvas({ setCurrentCanvasData }) {
    const defaultColors = ["#444", "#7189bf", "#df7599", "#ffc785", "#72d6c9"];

    const [saveableCanvas, setSaveableCanvas] = useState(null);
    const [activeColor, setActiveColor] = useState(defaultColors[0]);

    const handleChange = () => {
        setCurrentCanvasData(saveableCanvas.getSaveData());
    }

    const handleUndo = () => {
        saveableCanvas.undo();
    }

    const handleClear = () => {
        saveableCanvas.clear();
    }

    const handleColor = color => {
        setActiveColor(color);
    }

    return (
        <div className="columns">
            <div className="column is-narrow">
                <div className="field">
                    <div className="button is-text is-active">
                        <span className="icon">
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>
                </div>
                <hr />
                {defaultColors.map(color => {
                    return <ColorButton key={color} onClick={handleColor} color={color} isActive={color === activeColor} />
                })}
                <hr />
                <div className="field">
                    <div onClick={handleUndo} className="button is-text">
                        <span className="icon">
                            <FontAwesomeIcon icon={faUndo} />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <div onClick={handleClear} className="button is-text">
                        <span className="icon">
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </div>
                </div>
            </div>
            <div className="column">
                <CanvasDraw
                    className="canvas"

                    onChange={handleChange}
                    ref={canvasDraw => (setSaveableCanvas(canvasDraw))}
                    brushRadius={4}
                    brushColor={activeColor}
                    lazyRadius={0}
                    canvasWidth={500}
                    canvasHeight={500}
                    hideGrid
                    hideInterface
                />
            </div>
        </div>
    );
}

export default connect(null, { setCurrentCanvasData })(Canvas);