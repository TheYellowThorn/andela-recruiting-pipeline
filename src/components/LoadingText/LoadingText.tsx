import React from 'react';
import './LoadingText.scss';

const LoadingText = (props: { label: string }) => {
  return (
    <div className="loader-container">
      <div className="lds-ripple"><div></div><div></div></div>
      <p className="loadingName">{props.label}</p>
    </div>
  );
}

export default LoadingText;
