import { useState } from 'react';

export const FormatState = initialState => {
  const [format, setFormat] = useState(initialState);

  const onChangeFormat = format => setFormat(format);

  return [format, onChangeFormat];
};
