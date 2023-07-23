import React from 'react';

const DropdownSearchInput = ({ options, onChange }) => {
  return (
    <select onChange={onChange} className='border-2 border-black-500 rounded'>
      {options.map((option, index) => (
        <option key={index} value={option.value} >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropdownSearchInput;