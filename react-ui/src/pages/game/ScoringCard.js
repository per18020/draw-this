import React, { useState, useEffect } from 'react'


import DisplayCanvas from '../../common/components/canvas/DisplayCanvas';

function ScoringCard({ canvasData, onVote, active, score }) {
    const [isVote, setIsVote] = useState(false); // Abstract this to redux, so more than one can't be pressed

    const handleVote = () => {
        setIsVote(!isVote);
        onVote();
    }

    return (
        <div className="box">
            <DisplayCanvas
                canvasData={canvasData}
                width={256}
                height={256}
            />

            <button onClick={handleVote} className={ isVote ? "button is-info" : "button"} disabled={!active}>Add Vote</button>
            <div className="subtitle">{score} pts.</div>
        </div>
    );
}

export default ScoringCard;