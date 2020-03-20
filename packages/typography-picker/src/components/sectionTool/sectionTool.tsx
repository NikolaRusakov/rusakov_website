import React from 'react';

const SectionTool: React.FC<{ title: string }> = ({ children, title }) => (
  <div
    style={{
      float: 'left',
      marginRight: 5,
    }}>
    <span
      style={{
        fontSize: 10,
        lineHeight: '15px',
      }}>
      {title}
    </span>
    <br />
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: 80,
      }}>
      {children}
    </div>
  </div>
);

export default SectionTool;
