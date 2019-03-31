import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../input-field/inputField';
import Button from '../../button/button';
import './streamForm.css';

class StreamForm extends Component {
    render() {
      return (
        <form
          className="create-stream-form"
          onSubmit={this.props.handleSubmit(this.props.onSubmit)}>

          <Field
            name="title"
            component={InputField}
            label="Title"
          />
          <Field
            name="description"
            component={InputField}
            label="Description"
          />
          <Button btnLabel={this.props.btnText}/>

        </form>
      );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
      errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
      errors.description = 'You must enter description';
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);