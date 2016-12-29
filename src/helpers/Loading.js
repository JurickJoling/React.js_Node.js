import React, { PropTypes } from 'react';
import Loader from 'react-loader';
import cl from 'classnames';

function Loading({ className, loaded, scale = 1, children }) {
  const options = {
    lines: 10,
    length: 5,
    width: 2.0,
    radius: 6,
    corners: 1,
    rotate: 9,
    direction: 1,
    color: '#000',
    speed: 1,
    trail: 60,
    shadow: false,
    hwaccel: true,
    zIndex: 2e9,
    top: '65%',
    left: '50%',
    scale
  };

  return (
    <div className={cl(className)}>
      {loaded ? children : <Loader options={options} loaded={loaded}>{children}</Loader>}
    </div>
  );
}

Loading.propTypes = {
  className: PropTypes.string,
  loaded: PropTypes.bool.isRequired,
  scale: PropTypes.number,
  children: PropTypes.node.isRequired
};

export default Loading;
