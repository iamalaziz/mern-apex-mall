import React from 'react';

const SVG = ({ item, style }) => {
  return (
    <>
      {item === 'like' && (
        <svg
          width="30"
          height="26"
          viewBox="0 0 30 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...style}
        >
          <path
            d="M14.9995 24.5722C-11.6667 9.83334 6.99999 -6.16666 14.9995 3.95075C23 -6.16666 41.6666 9.83334 14.9995 24.5722Z"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            {...style}
          />
        </svg>
      )}
      {item === 'fill-like' && (
        <svg
          width="30"
          height="26"
          viewBox="0 0 30 26"
          fill="red"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            trasnition: '.1s all',
          }}
        >
          <path
            d="M14.9995 24.5722C-11.6667 9.83334 6.99999 -6.16666 14.9995 3.95075C23 -6.16666 41.6666 9.83334 14.9995 24.5722Z"
            stroke="red"
            strokeWidth="1.5"
          />
        </svg>
      )}
      {item === 'cart' && (
        <svg
          width="34"
          height="35"
          viewBox="0 0 34 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...style}
        >
          <path
            d="M11.3333 14.6667H7.08333L4.25 30.25H29.75L26.9167 14.6667H22.6667M11.3333 14.6667V10.4167C11.3333 7.28705 13.8704 4.75 17 4.75V4.75C20.1296 4.75 22.6667 7.28705 22.6667 10.4167V14.6667M11.3333 14.6667H22.6667M11.3333 14.6667V18.9167M22.6667 14.6667V18.9167"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...style}
          />
        </svg>
      )}
    </>
  );
};

export default SVG;
