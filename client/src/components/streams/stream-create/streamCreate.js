import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreateStream } from '../../../redux-setup/actions';
import StreamForm from '../stream-form/streamForm';

class StreamCreate extends Component {

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h1 className="component-title">Create New Stream</h1>
        <StreamForm onSubmit={this.onSubmit} btnText="Create Stream" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createStream: (formValues) => dispatch(actionCreateStream(formValues))
  };
};

export default connect(null, mapDispatchToProps)(StreamCreate);