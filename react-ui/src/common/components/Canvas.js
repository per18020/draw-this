import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { connect } from 'react-redux';
import { setCurrentCanvasData } from '../../redux/actions';

import './Canvas.scss';

function Canvas({ setCurrentCanvasData }) {
    const [saveableCanvas, setSaveableCanvas] = useState(null);

    const handleChange = () => {
        setCurrentCanvasData(saveableCanvas.getSaveData());
    }

    return (
        <>
            <CanvasDraw
                onChange={handleChange}
                ref={canvasDraw => (setSaveableCanvas(canvasDraw))}
                brushRadius={4}
                lazyRadius={0}
                canvasWidth={500}
                canvasHeight={500}
                hideGrid
            />
        </>
    );
}

export default connect(null, { setCurrentCanvasData })(Canvas);