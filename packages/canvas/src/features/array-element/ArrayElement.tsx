import React from 'react';
import { ArrayElementProps } from './array-element.types';

export const ArrayElement: React.FC<ArrayElementProps> = ({ 
  values, 
  selectedIndex, 
  onCellClick 
}) => {
  return (
    <div className="array-element">
      {values.map((value, index) => (
        <div
          key={index}
          className={`array-cell ${selectedIndex === index ? 'selected' : ''}`}
          onClick={() => onCellClick?.(index)}
        >
          {value}
        </div>
      ))}
    </div>
  );
}; 