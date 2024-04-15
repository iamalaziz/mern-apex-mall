import React from 'react';

const Message = ({ bg, children }) => {
  return <div className={`${bg} p-3 rounded-xl`}>{children}</div>;
};

Message.defaultProps = {
  variant: 'info',
};
export default Message;
