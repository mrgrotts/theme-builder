import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import EmojiPicker from './EmojiPicker';
import ModalForm from './ModalForm';

class PaletteFormMeta extends Component {
  state = {
    emoji: '',
    open: false,
    paletteName: '',
    stage: 'form'
  };

  componentDidMount() {
    const { palettes } = this.props;

    ValidatorForm.addValidationRule('isUniquePaletteName', value =>
      palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    );
  }

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onChangeEmoji = emoji => this.setState({ emoji, stage: 'review' });

  onSavePaletteName = () => this.setState({ stage: 'emoji' });

  onSave = () => {
    const { emoji, paletteName } = this.state;
    const { onSave } = this.props;

    onSave(emoji, paletteName);
    this.onClose();
  };

  render() {
    const { emoji, open, paletteName, stage } = this.state;
    let title = 'Save Palette';
    let content = 'Give your palette a name and emoji to remember it by.';

    const actions = (
      <>
        <Button onClick={this.onClose} color={'primary'}>
          Cancel
        </Button>
        {stage === 'review' ? (
          <Button variant={'contained'} color={'primary'} onClick={this.onSave}>
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
        onChange={this.onChange}
        placeholder={`A Juicy Palette Name`}
        validators={['required', 'isUniquePaletteName']}
        value={paletteName}
        errorMessages={['Name is required.', 'Palette Name is taken.']}
        style={{ marginBottom: '2rem' }}
      />
    );

    if (stage === 'emoji') {
      form = (
        <EmojiPicker
          open={stage === 'emoji'}
          onClose={this.onClose}
          onSelect={this.onChangeEmoji}
          PaperProps={{ style: { margin: '0', minWidth: '20rem' } }}
          set={'google'}
          title={'Pick an emoji'}
        />
      );
    }

    if (stage === 'review') {
      title = `Your New Palette`;
      content = `${paletteName} ${emoji && emoji.native}`;
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
        <Link style={{ marginRight: '1rem' }} to={`/`}>
          <Button color={'secondary'} variant={'contained'}>
            Go Back
          </Button>
        </Link>
        <Button variant="contained" color="primary" onClick={this.onOpen}>
          Save
        </Button>
        <ModalForm
          actions={actions}
          onClose={this.onClose}
          onSubmit={this.onSavePaletteName}
          open={open}
          title={title}
          content={content}
          PaperProps={{ style: { minWidth: '20rem' } }}
        >
          {form}
        </ModalForm>
      </div>
    );
  }
}

export default PaletteFormMeta;
