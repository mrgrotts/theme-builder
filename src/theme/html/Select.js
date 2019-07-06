import React from 'react';
import styled from 'styled-components';

import { MobileFirstMediaQuery } from '../queries';

// const ThemedOption = styled.span`
//   height: auto;
//   padding: 0.25rem;
//   width: 5rem;
// `;

const ThemedSelect = styled.select`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.color || '#141414'};
  color: ${props => props.color || '#141414'};
  font-size: 1rem;
  height: 100%;
  outline: none;
  padding: 0.25rem;
  width: 10rem;

  option {
    color: #141414;
  }

  ${MobileFirstMediaQuery('xs')} {
    width: auto;
  }
`;

export const Select = ({ className, color, field, onChange, style }) => {
  const options = field.options.map(({ name, value }) => (
    <option key={value} value={value}>
      {name}
    </option>
  ));

  return (
    <fieldset>
      <label htmlFor={field.name}>{field.name}</label>
      <ThemedSelect
        className={className}
        color={color}
        id={field.id}
        name={field.name}
        onChange={onChange}
        style={style}
        type={field.type}
        value={field.value}
      >
        {options}
      </ThemedSelect>
    </fieldset>
  );
};
