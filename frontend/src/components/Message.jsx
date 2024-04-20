import React from 'react';

const Message = ({ bg, children }) => {
  return (
    <div
      className={`${
        bg ? bg : 'bg-blue-100 border border-blue-400'
      } p-3 rounded-xl mb-2`}
    >
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: 'info',
};
export default Message;
