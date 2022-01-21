import { useState } from 'react';

export const useAnecdoteField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const resetValue = () => {
    setValue('');
  };

  return {
    data: {
      type,
      value,
      onChange,
    },
    resetValue,
  };
};
