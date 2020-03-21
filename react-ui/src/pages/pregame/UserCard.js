import React from 'react';
import DisplayCanvas from '../../common/components/canvas/DisplayCanvas';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'

function UserCard(props) {
    return (
        <div className="media-content">
            <div className="columns is-vcentered">
                <div className="column is-narrow">
                    <div className="image is-64x64">
                        <DisplayCanvas canvasData={props.canvasData} />
                    </div>
                </div>
                <div className="column">
                    <div className="subtitle">
                        {props.name}
                    </div>
                </div>
                {props.gameOwner &&
                    <div className="column is-narrow">
                        <span className="icon has-text-warning">
                            <FontAwesomeIcon icon={faCrown} />
                        </span>
                    </div>
                }
            </div>
        </div>
    );
}

export default UserCard;