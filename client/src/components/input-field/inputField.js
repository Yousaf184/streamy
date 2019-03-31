import React from 'react';
import './inputField.css';

const InputField = (props) => {

    let showError = false;
    let borderColor = 'black';

    if (props.meta.touched && props.meta.invalid) {
      showError = true;
      borderColor = 'red';
    }

    return (
      <div className="input-field-container">
        <label>{props.label}</label>
        <input
          className="input-field"
          style={{ borderColor: borderColor }}
          {...props.input}
        />
        {
          showError ?
            <small>
              <i className="fas fa-exclamation-circle"></i>
              { props.meta.error }
            </small> :
            null
        }
      </div>
    );
};

export default InputField;