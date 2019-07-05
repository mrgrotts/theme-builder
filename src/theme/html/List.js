import styled from 'styled-components';

import { MobileFirstMediaQuery } from '../queries';

export const List = styled.ul.attrs(props => ({
  'aria-colcount': props.columns || 3,
  role: props.role || 'rowgroup',
  padding: props.children.length ? props.children.length : props.children.props.children.length
}))`
  display: grid;
  grid-gap: 2.5%;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  min-height: 100%;
  margin: 0 auto;
  padding: ${({ padding }) => `3rem 3rem ${padding * 4}rem 3rem`};
  width: 100%;

  ${MobileFirstMediaQuery('xs')} {
    grid-gap: 5%;
    grid-template-columns: ${props => {
      let percent = {
        1: '90%',
        2: '45%',
        3: '30%',
        4: '25%',
        5: '20%'
      };

      if (props.columns) {
        return `repeat(${props.columns}, ${percent[props.columns]})`;
      } else {
        return `repeat(3, 30%)`;
      }
    }};
    padding: ${({ padding }) => `1rem 3rem ${padding * 2}rem 3rem`};
    width: 64rem;
  }
`;
