import React from 'react';

const SectionTool: React.FC<{ title: string }> = ({ children, title }) => (
  <div
    style={{
      float: 'left',
      marginRight: 5,
      width: '45%',
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
        // width: '16ch',
      }}>
      {children}
    </div>
  </div>
);

export default SectionTool;
