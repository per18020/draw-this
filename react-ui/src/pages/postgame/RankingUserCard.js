import React from 'react'
import { usePlayerInfo } from '../../common/effects'
import { decompressAndParse } from '../../common/util';

import DisplayCanvas from '../../common/components/canvas/DisplayCanvas';

function RankingUserCard({ playerID, score }) {
    const playerInfo = usePlayerInfo(playerID);

    return (
        <div className="media-content">
            <div className="columns is-vcentered">
                {/* <div className="column is-narrow">
                    <div className="title">
                        {place} place
                    </div>
                </div> */}
                <div className="column is-narrow">
                    <div className="title">
                        {score} pts
                    </div>
                </div>
                <div className="column is-narrow">
                    <div className="image is-64x64">
                        <DisplayCanvas canvasData={decompressAndParse(playerInfo.compressedAvatarData)} />
                    </div>
                </div>
                <div className="column is-narrow">
                    <div className="title">
                        {playerInfo.nickname}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RankingUserCard;