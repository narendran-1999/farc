import React from 'react';

const ProgressBar = ({ current, total }) => {
    const progress = Math.min(100, Math.max(0, (current / total) * 100));

    return (
        <>
            <div className="progress-text">
                {current} / {total}
            </div>
            <div className="progress-container">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </>
    );
};

export default ProgressBar;
