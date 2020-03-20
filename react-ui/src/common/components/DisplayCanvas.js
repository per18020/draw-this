import React, { useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';

function DisplayCanvas({ canvasData }) {
    const [canvasRef, setCanvasRef] = useState(null);

    // useEffect(() => {
    //     if (canvasRef && canvasData) {
    //         canvasRef.loadSaveData(canvasData);
    //     }
    // }, [canvasRef, canvasData])

    return (
        <CanvasDraw
            ref={canvasDraw => (setCanvasRef(canvasDraw))}
            loadTimeOffset={1}
            canvasWidth={64}
            canvasHeight={64}
            hideGrid
            hideInterface
            disabled
            saveData={canvasData}
        />
    );
}

export default DisplayCanvas;