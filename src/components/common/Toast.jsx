import React from 'react';

export default function Toast({ message, visible }) {
  if (!visible) return null;
  return (
    <div className="toast-msg show" id="toast-msg">
      <span className="toast-icon">⚡</span>
      <span>{message}</span>
    </div>
  );
}
