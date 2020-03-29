import React from 'react';
import CanvasDraw from 'react-canvas-draw';

function DisplayCanvas({ canvasData, width = 64, height = 64 }) {
    if (!canvasData) canvasData = "";
    return (
        <CanvasDraw
            saveData={canvasData}
            loadTimeOffset={1}
            canvasWidth={width}
            canvasHeight={height}
            hideGrid
            hideInterface
            disabled
        />
    );
}

export default DisplayCanvas;