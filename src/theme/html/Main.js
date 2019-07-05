import styled from 'styled-components';

export const Main = styled.main.attrs(props => ({
  role: 'main'
}))`
  display: flex;
  flex-flow: column nowrap;
  grid-auto-flow: column;
  grid-area: main;
  min-height: 100%;
  margin: 0 auto;
  width: 100%;
`;
