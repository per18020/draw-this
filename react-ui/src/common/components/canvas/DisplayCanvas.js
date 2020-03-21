import React from 'react';
import CanvasDraw from 'react-canvas-draw';

function DisplayCanvas({ canvasData }) {
    if (!canvasData) canvasData = "";
    return (
        <CanvasDraw
            saveData={canvasData}
            loadTimeOffset={1}
            canvasWidth={64}
            canvasHeight={64}
            hideGrid
            hideInterface
            disabled
        />
    );
}

export default DisplayCanvas;