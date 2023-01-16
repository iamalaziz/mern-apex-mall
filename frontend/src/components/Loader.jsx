import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      role="status"
      animation="border"
      style={{
        width: '50px',
        height: '50px',
        display: 'block',
        margin: 'auto',
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
