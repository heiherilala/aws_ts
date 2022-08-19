import React from 'react';

const Loading = () => {
    return (
        <div className="loadingCid">
            <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;