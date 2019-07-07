import React, { Component } from 'react';

import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import { arrayMove } from 'react-sortable-hoc';

import Draggable from '../hoc/Draggable';
import ColorPicker from '../components/ColorPicker';
import DraggableBox from '../components/DraggableBox';
import Layout from '../components/Layout';
import PaletteFormToolBar from '../components/PaletteFormToolBar';

import { DRAWER_WIDTH } from '../constants';
import { Main, MobileFirstMediaQuery, Nav, PaletteColumns, Typography } from '../theme';
import { randomColor, seedPalettes } from '../utils';

const screenWidth = window.innerWidth < DRAWER_WIDTH ? window.innerWidth : DRAWER_WIDTH;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    flexShrink: 0,
    height: '100vh',
    width: screenWidth,
    [MobileFirstMediaQuery('xs')]: {
      width: DRAWER_WIDTH
    }
  },
  drawerPaper: {
    alignItems: 'center',
    display: 'flex',
    width: screenWidth,
    [MobileFirstMediaQuery('xs')]: {
      marginTop: '5rem',
      width: DRAWER_WIDTH
    }
  },
  drawerHeader: {
    alignItems: 'center',
    display: 'flex',
    height: '5rem',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
    width: '100%',
    [MobileFirstMediaQuery('xs')]: {
      padding: '0 0.5rem'
    }
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 5rem)',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -screenWidth,
    [MobileFirstMediaQuery('xs')]: {
      marginLeft: -DRAWER_WIDTH
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
    margin: '0 auto',
    width: '90%',
    [MobileFirstMediaQuery('xs')]: {
      width: '100%'
    }
  },
  buttons: {
    margin: '0 auto'
  },
  button: {
    width: 'calc(50% - 0.5rem)'
  }
});

class PaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };

  state = {
    colors: [],
    open: false,
    columns: PaletteColumns
  };

  componentDidMount() {
    this.loadPalette();
  }

  loadPalette = () => {
    let { palette } = this.props;

    if (!palette) {
      palette = seedPalettes[4];
    }

    this.setState({ colors: palette.colors });
  };

  onAddColor = color => this.setState({ colors: [...this.state.colors, color] });

  onAddRandomColor = () => {
    const { colors } = this.state;
    const { palettes } = this.props;

    const random = randomColor(palettes, colors);
    this.setState({ colors: [...colors, random] });
  };

  onClear = () => this.setState({ colors: [] });

  onDelete = name =>
    this.setState({ colors: this.state.colors.filter(color => color.name !== name) });

  onDrawerOpen = () => this.setState({ open: true });

  onDrawerClose = () => this.setState({ open: false });

  onSave = (emojiData, paletteName) => {
    const { colors } = this.state;
    const id = paletteName.toLowerCase().replace(/ /g, '-');
    const emoji = emojiData.native;
    const palette = { colors, emoji, id, paletteName };

    this.props.savePalette(palette);
    this.props.history.push('/');
  };

  onSortEnd = ({ oldIndex, newIndex }) =>
    this.setState(({ colors }) => ({ colors: arrayMove(colors, oldIndex, newIndex) }));

  render() {
    let { colors, columns, open } = this.state;
    let { classes, location, maxColors, palettes, theme } = this.props;

    if (!colors) {
      colors = [];
    }

    let full = colors.length >= maxColors;

    let colindex = 0;
    const renderedColors = colors.map(({ color, name }, index) => {
      if (colindex === columns) {
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
          onDelete={() => this.onDelete(name)}
        />
      );
    });

    const drawer = (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.onDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography type={`h4`}>Design A Palette</Typography>
          <div className={classes.buttons} style={{ margin: '3rem 0' }}>
            <Button
              className={classes.button}
              onClick={this.onClear}
              variant={`contained`}
              color={`secondary`}
              style={{ marginRight: '1rem' }}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              onClick={this.onAddRandomColor}
              variant={`contained`}
              color={`primary`}
              disabled={full}
            >
              Random Color
            </Button>
          </div>
          <ColorPicker colors={colors} full={full} onAddColor={this.onAddColor} />
        </div>
      </Drawer>
    );

    const palette = (
      <div className={classNames(classes.content, { [classes.contentShift]: open })}>
        <Draggable
          aria-colcount={columns}
          axis={`xy`}
          columns={columns}
          distance={20}
          onSortEnd={this.onSortEnd}
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
      </div>
    );

    return (
      <Layout id={'new-palette'}>
        <CssBaseline />
        <Nav id={'new-palette'}>
          <PaletteFormToolBar
            open={open}
            palettes={palettes}
            onSave={this.onSave}
            onDrawerOpen={this.onDrawerOpen}
            location={location}
          />
          <div className={classes.drawerHeader} />
        </Nav>
        <Main>
          <div className={classes.root}>
            {drawer}
            {palette}
          </div>
        </Main>
      </Layout>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteForm);
