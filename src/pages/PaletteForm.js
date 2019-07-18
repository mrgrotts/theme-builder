import React, { useContext, memo } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Draggable from '../hoc/Draggable';
import ColorPicker from '../components/ColorPicker';
import DraggableBox from '../components/DraggableBox';
import Layout from '../components/Layout';
import PaletteFormToolBar from '../components/PaletteFormToolBar';

import { DRAWER_WIDTH, MAX_COLORS } from '../constants';
import { Store, Dispatch } from '../context';
import { StorageState, ToggleState } from '../hooks';
import { Main, MobileFirstMediaQuery, Nav, PaletteColumns, Typography } from '../theme';
import { arrayMove, randomColor } from '../utils';

const screenWidth = window.innerWidth < DRAWER_WIDTH ? window.innerWidth : DRAWER_WIDTH;

const Root = styled.div`
  display: flex;
`;

const Actions = styled.div`
  margin: 3rem auto;
`;

const Action = styled(Button)`
  width: calc(50% - 0.5rem);
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justifycontent: flex-start;
  margin: 0 auto;
  width: 90%;

  ${MobileFirstMediaQuery('xs')} {
    width: 100%;
  }
`;

const PaletteFormDrawer = styled(Drawer)`
  flex-shrink: 0;
  height: 100vh;
  width: ${screenWidth}px;

  .MuiDrawer-paper {
    align-items: center;
    display: flex;
    width: ${screenWidth}px;

    ${MobileFirstMediaQuery('xs')} {
      margin-top: 5rem;
      width: ${DRAWER_WIDTH}px;
    }
  }

  ${MobileFirstMediaQuery('xs')} {
    width: ${DRAWER_WIDTH}px;
  }
`;

const DrawerHeader = styled.div`
  align-items: center;
  display: flex;
  height: 5rem;
  justify-content: flex-end;
  width: 100%;
  ${'' /* ${theme.mixins.toolbar} */}

  ${MobileFirstMediaQuery('xs')} {
    padding: 0 0.5rem;
  }
`;

const Palette = styled.div.attrs(props => ({
  toggled: props.toggled || false
}))`
  flex-grow: 1;
  height: calc(100vh - 5rem);
  padding: 0;
  transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  margin-left: ${-screenWidth}px;

  ${({ toggled }) =>
    toggled && {
      marginLeft: 0,
      transition:
        'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, width 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
    }}

  section {
    place-content: start flex-start;
    display: flex;
    flex-flow: row wrap;
    height: 100vh;
  }

  ${MobileFirstMediaQuery('xs')} {
    margin-left: ${-DRAWER_WIDTH}px;

    ${({ toggled }) =>
      toggled && {
        marginLeft: 0
      }}
  }
`;

// const DraggablePalette = withDraggable(({ children, ...props }) => (
//   <section
//     style={{
//       alignContent: 'start',
//       display: 'flex',
//       flexFlow: 'row wrap',
//       height: '100vh',
//       justifyContent: 'flex-start'
//     }}
//     {...props}
//   >
//     {children}
//   </section>
// ));

const PaletteForm = props => {
  const { colors, palettes } = useContext(Store);
  const dispatch = useContext(Dispatch);

  const [current, setCurrentPalette] = StorageState('currentPalette', null);
  const [toggled, OnToggle] = ToggleState(false);

  if (!current && props.location.state.fromPalette) {
    let palette = palettes.find(palette => palette.id === props.match.params.palette);
    setCurrentPalette(palette);
    dispatch({ type: 'SET_COLORS', colors: palette.colors });
  }

  const full = colors.length >= MAX_COLORS;

  const onAddColor = color => dispatch({ type: 'ADD_COLOR', color });

  const onAddRandomColor = () => {
    const color = randomColor(palettes, colors);
    dispatch({ type: 'ADD_COLOR', color });
  };

  const onClear = () => dispatch({ type: 'CLEAR_COLORS' });

  const onDelete = name => dispatch({ type: 'DELETE_COLOR', name });

  const onDrawerOpen = () => OnToggle(true);

  const onDrawerClose = () => OnToggle(false);

  const onSave = (emojiData, paletteName) => {
    const id = paletteName.toLowerCase().replace(/ /g, '-');
    const emoji = emojiData.native;
    const palette = { colors, emoji, id, paletteName };

    savePalette(palette);
    props.history.push('/');
  };

  const onSortEnd = ({ oldIndex, newIndex }) =>
    dispatch({ type: 'SET_COLORS', colors: arrayMove(colors, oldIndex, newIndex) });

  const savePalette = palette => dispatch({ type: 'SAVE_PALETTE', palette });

  let colindex = 0;
  const renderedColors = colors.map(({ color, name }, index) => {
    if (colindex === PaletteColumns) {
      colindex = 1;
    } else {
      colindex++;
    }

    return (
      <DraggableBox
        key={name}
        colindex={colindex}
        color={color}
        id={name}
        index={index}
        name={name}
        onDelete={() => onDelete(name)}
      />
    );
  });

  const drawer = (
    <PaletteFormDrawer variant="persistent" anchor="left" open={toggled}>
      <DrawerHeader>
        <IconButton onClick={onDrawerClose}>
          {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Container>
        <Typography type={`h4`}>Design A Palette</Typography>
        <Actions style={{ margin: '3rem 0' }}>
          <Action
            onClick={onClear}
            variant={`contained`}
            color={`secondary`}
            style={{ marginRight: '1rem' }}
          >
            Clear Palette
          </Action>
          <Action
            onClick={onAddRandomColor}
            variant={`contained`}
            color={`primary`}
            disabled={full}
          >
            Random Color
          </Action>
        </Actions>
        <ColorPicker colors={colors} full={full} onAddColor={onAddColor} />
      </Container>
    </PaletteFormDrawer>
  );

  const newPalette = (
    <Palette toggled={toggled}>
      <Draggable
        aria-colcount={PaletteColumns}
        axis={`xy`}
        columns={PaletteColumns}
        distance={20}
        onSortEnd={onSortEnd}
        style={{
          alignContent: 'start',
          display: 'flex',
          flexFlow: 'row wrap',
          height: '100vh',
          justifyContent: 'flex-start'
        }}
      >
        {renderedColors}
      </Draggable>
    </Palette>
  );

  /* using HOC
  const newPalette = (
    <Palette toggled={toggled}>
      <DraggablePalette axis={`xy`} columns={PaletteColumns} distance={20} onSortEnd={onSortEnd}>
        {renderedColors}
      </DraggablePalette>
    </Palette>
  );
  */

  return (
    <Layout id={'new-palette'}>
      <CssBaseline />
      <Nav id={'new-palette'}>
        <PaletteFormToolBar
          open={toggled}
          palettes={palettes}
          onSave={onSave}
          onDrawerOpen={onDrawerOpen}
          {...props}
        />
        <DrawerHeader />
      </Nav>
      <Main>
        <Root>
          {drawer}
          {newPalette}
        </Root>
      </Main>
    </Layout>
  );
};

export default memo(PaletteForm);
