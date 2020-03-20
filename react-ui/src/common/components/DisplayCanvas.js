import React, { useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';

function DisplayCanvas({ canvasData }) {
    const [canvasRef, setCanvasRef] = useState(null);

    useEffect(() => {
        console.log("zig")
        if (canvasRef && canvasData) {
            console.log("zag")
            canvasRef.loadSaveData(canvasData);
        }
    }, [canvasRef, canvasData])

    return (
        <>
            <CanvasDraw
                ref={canvasDraw => (setCanvasRef(canvasDraw))}
                loadTimeOffset={0.7}
                canvasWidth={64}
                canvasHeight={64}
                hideGrid
                hideInterface
                disabled
            />
        </>
    );
}

export default DisplayCanvas;