import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { arrayMove } from 'react-sortable-hoc';

import Draggable from '../hoc/Draggable';
import ColorPicker from '../components/ColorPicker';
import DraggableBox from '../components/DraggableBox';
import Layout from '../components/Layout';
import PaletteFormToolBar from '../components/PaletteFormToolBar';

import { DRAWER_WIDTH } from '../constants';
import { ColorsState, ToggleState } from '../hooks';
import { Main, MobileFirstMediaQuery, Nav, PaletteColumns, Typography } from '../theme';
import { randomColor, seedPalettes } from '../utils';

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

const PaletteForm = ({ classes, history, location, maxColors, palette, palettes, savePalette }) => {
  if (!palette) {
    palette = seedPalettes[0];
  }

  if (!palette.colors) {
    palette.colors = [];
  }

  const [colors, onSetColors] = ColorsState(palette.colors);
  const [toggled, onSetToggle] = ToggleState(false);
  const full = colors.length >= maxColors;

  const onAddColor = color => onSetColors([...colors, color]);

  const onAddRandomColor = () => {
    const random = randomColor(palettes, colors);
    onSetColors([...colors, random]);
  };

  const onClear = () => onSetColors([]);

  const onDelete = name => onSetColors(colors.filter(color => color.name !== name));

  const onDrawerOpen = () => onSetToggle(true);

  const onDrawerClose = () => onSetToggle(false);

  const onSave = (emojiData, paletteName) => {
    const id = paletteName.toLowerCase().replace(/ /g, '-');
    const emoji = emojiData.native;
    const palette = { colors, emoji, id, paletteName };

    savePalette(palette);
    history.push('/');
  };

  const onSortEnd = ({ oldIndex, newIndex }) => onSetColors(arrayMove(colors, oldIndex, newIndex));

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

  return (
    <Layout id={'new-palette'}>
      <CssBaseline />
      <Nav id={'new-palette'}>
        <PaletteFormToolBar
          open={toggled}
          palettes={palettes}
          onSave={onSave}
          onDrawerOpen={onDrawerOpen}
          location={location}
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

export default PaletteForm;
