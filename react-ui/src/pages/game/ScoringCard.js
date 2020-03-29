import React, { useState, useEffect } from 'react'


import DisplayCanvas from '../../common/components/canvas/DisplayCanvas';

function ScoringCard({ canvasData, playerID }) {
    const [isVote, setIsVote] = useState(false); // Abstract this to redux, so more than one can't be pressed

    const handleVote = () => {
        setIsVote(!isVote);
    }

    return (
        <div className="box">
            <DisplayCanvas
                canvasData={canvasData}
                width={256}
                height={256}
            />

            <button onClick={handleVote} className={ isVote ? "button is-info" : "button"}>Add Vote</button>
        </div>
    );
}

export default ScoringCard;