import styled from 'styled-components';

export const Grid = styled.div.attrs(props => ({
  role: 'grid',
  'aria-labelledby': props.id || 'theme-builder'
}))`
  display: grid;
  grid-template-areas:
    'header'
    'navbar'
    'main'
    'footer';
  grid-template-columns: 100%;
  grid-template-rows: auto auto 1fr auto;
  min-height: 100vh;

  @supports not (display: grid) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
  }
`;
