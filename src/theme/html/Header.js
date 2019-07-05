import styled from 'styled-components';

export const Header = styled.header`
  align-items: center;
  background: #141414;
  color: rgba(255, 255, 255, 1);
  display: flex;
  flex-flow: row nowrap;
  grid-auto-flow: row;
  grid-area: header;
  height: 5rem;
  justify-content: space-between;
  padding: 1rem;
  position: relative;

  &::after {
    bottom: 0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    content: '';
    height: 5rem;
    position: absolute;
    right: 0;
    width: 100vw;
  }
`;
