import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <>
    <Spinner
    role="status"
    animation="border"
    style={{
      width: '100px',
      height: '100px',
      display: 'block',
      margin: 'auto',
    }}
    >
    </Spinner>
    <div className='text-center my-5'>Loading...</div>
    </>
  );
};

export default Loader;
