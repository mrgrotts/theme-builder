import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import MUIButton from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import EmojiPicker from './EmojiPicker';
import PaletteFormMetaModal from './PaletteFormMetaModal';

import { InputState, StorageState, ToggleState } from '../hooks';
import { Button, MobileFirstMediaQuery, Typography } from '../theme';

const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 0 1.5rem;
  position: relative;
  width: 100%;
`;

const MenuButton = styled(Button)`
  border-radius: 50%;
  display: ${({ open }) => (open ? 'none' : 'inline-flex')};
  height: 3rem;
  margin-right: 1rem;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  :active,
  :focus,
  :hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const Title = styled(Typography)`
  display: none;

  ${MobileFirstMediaQuery('xs')} {
    display: inline-flex;
    width: 100%;
  }
`;

const PaletteFormMeta = ({ location, match, onDrawerOpen, onSave, open, palettes }) => {
  let palette;
  let title = 'Save Palette';
  let content = 'Give your palette a name and emoji to remember it by.';
  let to = `/`;

  if (location && location.state && location.state.fromPalette) {
    palette = palettes.find(palette => palette.id === match.params.palette);
    to = location.pathname
      .split('/')
      .slice(0, -1)
      .join('/');
  }

  let [emoji, onSetEmoji, resetEmoji] = StorageState('emoji', palette ? palette.emoji : null);
  let [name, onSetName, resetName] = InputState(palette ? palette.paletteName : '');
  let [stage, onSetStage, resetStage] = StorageState('stage', 'form');
  const [toggled, OnToggle] = ToggleState(false);

  ValidatorForm.addValidationRule('isUniquePaletteName', name => {
    if (match.params.palette && match.params.palette.length) {
      return true;
    } else {
      return palettes.every(({ paletteName }) => paletteName.toLowerCase() !== name.toLowerCase());
    }
  });

  const onOpen = () => OnToggle(true);
  const onClose = () => OnToggle(false);

  const onChangeEmoji = emoji => {
    console.log(name, stage, emoji);
    onSetEmoji(emoji);
    onSetStage('review');
  };

  const onSavePaletteName = event => {
    console.log(name, stage, emoji);
    onSetStage('emoji');
  };

  const onSavePalette = () => {
    console.log(name, stage, emoji);
    onSave(emoji, name);
    resetEmoji();
    resetName();
    resetStage();
    onClose();
  };

  const actions = (
    <>
      <MUIButton onClick={onClose} color={'primary'}>
        Cancel
      </MUIButton>
      {stage === 'review' ? (
        <MUIButton variant={'contained'} color={'primary'} onClick={onSavePalette}>
          Save Palette
        </MUIButton>
      ) : (
        <MUIButton variant={'contained'} color={'primary'} type={'submit'}>
          Next
        </MUIButton>
      )}
    </>
  );

  let form = (
    <TextValidator
      fullWidth
      label={`Palette Name`}
      margin={'normal'}
      name={`paletteName`}
      onChange={onSetName}
      placeholder={`A Juicy Palette Name`}
      validators={['required', 'isUniquePaletteName']}
      value={name}
      errorMessages={['Name is required.', 'Palette Name is taken.']}
      style={{ marginBottom: '2rem' }}
    />
  );

  if (stage === 'emoji') {
    form = (
      <EmojiPicker
        autoFocus
        emoji={emoji}
        emojiTooltip
        onClose={onClose}
        onSelect={onChangeEmoji}
        open={stage === 'emoji'}
        PaperProps={{ style: { margin: '0', minWidth: '20rem' } }}
        set={'google'}
        title={emoji ? `Palette emoji: ${emoji}` : `Choose emoji`}
      />
    );
  }

  if (stage === 'review') {
    title = `Your New Palette`;
    content = `${name} ${emoji && emoji.native ? emoji.native : emoji}`;
  }

  return (
    <Container>
      <MenuButton
        aria-label={'open drawer'}
        onClick={onDrawerOpen}
        open={open}
        style={{ boxShadow: 'none' }}
      >
        <MenuIcon style={{ color: '#141414' }} />
      </MenuButton>
      <Title type={'h6'} style={{ lineHeight: '5rem' }}>
        {palette ? `${palette.paletteName} ${palette.emoji}` : `New Palette`}
      </Title>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%'
        }}
      >
        <Link style={{ marginRight: '1rem' }} to={to}>
          <MUIButton color={'secondary'} variant={'contained'}>
            Go Back
          </MUIButton>
        </Link>
        <MUIButton variant="contained" color="primary" onClick={onOpen}>
          Save
        </MUIButton>
        <PaletteFormMetaModal
          actions={actions}
          onClose={onClose}
          onSubmit={onSavePaletteName}
          open={toggled}
          title={title}
          content={content}
          PaperProps={{ style: { minWidth: '20rem', overflow: 'visible' } }}
        >
          {form}
        </PaletteFormMetaModal>
      </div>
    </Container>
  );
};

export default PaletteFormMeta;
