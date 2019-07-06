import { useState } from 'react';

export const InputState = initialState => {
  const [value, setValue] = useState(initialState);
  const onInputChange = event => setValue(event.target.value);

  const reset = () => setValue('');

  return [value, onInputChange, reset];
};
