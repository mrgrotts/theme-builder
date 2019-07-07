import React, { PureComponent } from 'react';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

import { Button } from '../theme';

class ColorPicker extends PureComponent {
  state = {
    color: 'teal',
    name: 'teal'
  };

  componentDidMount() {
    ValidatorForm.addValidationRule('isUniqueColorName', value =>
      this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule('isUniqueColor', value =>
      this.props.colors.every(({ color }) => color !== this.state.color)
    );
  }

  onColorNameChange = event => this.setState({ [event.target.name]: event.target.value });

  onColorChangeComplete = color => this.setState({ color: color.hex });

  onAddColor = () => {
    const { onAddColor } = this.props;
    const color = { ...this.state };

    onAddColor(color);
    this.setState({ name: '' });
  };

  render() {
    const { color, name } = this.state;
    const { full } = this.props;
    let disabled = false;

    if (full) {
      disabled = true;
    } else if (!name || name.length === 0) {
      disabled = true;
    } else {
      disabled = false;
    }

    const errorMessages = [
      'Name is required.',
      `Name ${name} is in use.`,
      `Color ${color} is in use.`
    ];

    return (
      <>
        <ChromePicker color={color} onChangeComplete={this.onColorChangeComplete} width={'320px'} />
        <ValidatorForm instantValidate={false} onSubmit={this.onAddColor} ref={'form'}>
          <TextValidator
            margin={'normal'}
            name={`name`}
            onChange={this.onColorNameChange}
            placeholder={`A Juicy Color Name`}
            style={{ height: '70px', marginTop: '3rem', width: '100%' }}
            validators={['required', 'isUniqueColorName', 'isUniqueColor']}
            value={name}
            errorMessages={errorMessages}
          />
          <div style={{ marginTop: '1rem' }}>
            <Button
              style={{
                backgroundColor: disabled ? 'lightgrey' : color,
                fontSize: '1.5rem',
                padding: '2rem 6rem'
              }}
              type={`submit`}
              disabled={disabled}
            >
              {full ? 'Palette Full' : 'Add Color'}
            </Button>
          </div>
        </ValidatorForm>
      </>
    );
  }
}

export default ColorPicker;
