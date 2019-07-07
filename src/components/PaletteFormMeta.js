import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import EmojiPicker from './EmojiPicker';
import PaletteFormMetaModal from './PaletteFormMetaModal';

import { EmojiState, InputState, StageState, ToggleState } from '../hooks';

const PaletteFormMeta = ({ location, onSave, palettes }) => {
  const [emoji, onSetEmoji] = EmojiState('');
  const [value, onInputChange] = InputState('');
  const [stage, onSetStage] = StageState('form');
  const [toggled, onSetToggle] = ToggleState(false);

  let title = 'Save Palette';
  let content = 'Give your palette a name and emoji to remember it by.';

  ValidatorForm.addValidationRule('isUniquePaletteName', name =>
    palettes.every(({ paletteName }) => paletteName.toLowerCase() !== name.toLowerCase())
  );

  const onOpen = () => onSetToggle(true);
  const onClose = () => onSetToggle(false);

  const onChangeEmoji = emoji => {
    console.log(value, stage, emoji);
    onSetEmoji(emoji);
    onSetStage('review');
  };

  const onSavePaletteName = event => {
    console.log(value, stage, emoji);
    onSetStage('emoji');
  };

  const onSavePalette = () => {
    console.log(value, stage, emoji);
    onSave(emoji, value);
    onClose();
  };

  const actions = (
    <>
      <Button onClick={onClose} color={'primary'}>
        Cancel
      </Button>
      {stage === 'review' ? (
        <Button variant={'contained'} color={'primary'} onClick={onSavePalette}>
          Save Palette
        </Button>
      ) : (
        <Button variant={'contained'} color={'primary'} type={'submit'}>
          Next
        </Button>
      )}
    </>
  );

  let form = (
    <TextValidator
      fullWidth
      label={`Palette Name`}
      margin={'normal'}
      name={`paletteName`}
      onChange={onInputChange}
      placeholder={`A Juicy Palette Name`}
      validators={['required', 'isUniquePaletteName']}
      value={value}
      errorMessages={['Name is required.', 'Palette Name is taken.']}
      style={{ marginBottom: '2rem' }}
    />
  );

  if (stage === 'emoji') {
    form = (
      <EmojiPicker
        open={stage === 'emoji'}
        onClose={onClose}
        onSelect={onChangeEmoji}
        PaperProps={{ style: { margin: '0', minWidth: '20rem' } }}
        set={'google'}
        title={'Pick an emoji'}
      />
    );
  }

  if (stage === 'review') {
    title = `Your New Palette`;
    content = `${value} ${emoji && emoji.native}`;
  }

  let to = `/`;
  if (location && location.state && location.state.fromPalette) {
    to = location.pathname
      .split('/')
      .slice(0, -1)
      .join('/');
  }

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
      }}
    >
      <Link style={{ marginRight: '1rem' }} to={to}>
        <Button color={'secondary'} variant={'contained'}>
          Go Back
        </Button>
      </Link>
      <Button variant="contained" color="primary" onClick={onOpen}>
        Save
      </Button>
      <PaletteFormMetaModal
        actions={actions}
        onClose={onClose}
        onSubmit={onSavePaletteName}
        open={toggled}
        title={title}
        content={content}
        PaperProps={{ style: { minWidth: '20rem' } }}
      >
        {form}
      </PaletteFormMetaModal>
    </div>
  );
};

export default PaletteFormMeta;
