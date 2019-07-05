import React from 'react';

import Select from '@material-ui/core/Select';

export const MaterialSelect = props => {
  return (
    <Select onChange={props.onChange} value={props.value}>
      {props.children}
    </Select>
  );
};
