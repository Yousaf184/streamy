import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionFetchStream, actionUpdateStream } from '../../../redux-setup/actions';
import StreamForm from '../stream-form/streamForm';

class StreamEdit extends Component {

    componentDidMount() {
        this.props.fetchStreamById(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        const streamId = this.props.match.params.id;
        this.props.updateStreamInfo(streamId, formValues);
    };

    getStreamToEditInfo = () => {
        return {
            title: this.props.streamToEdit.title,
            description: this.props.streamToEdit.description
        };
    };

    render() {
        if (!this.props.streamToEdit) {
            return (
                <div>Loading</div>
            );
        }

        return (
            <div>
                <h1 className="component-title">Edit Stream</h1>
                <StreamForm
                    onSubmit={this.onSubmit}
                    initialValues={this.getStreamToEditInfo()}
                    btnText="Update Stream"
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const streamToEditId = ownProps.match.params.id;

    return {
        streamToEdit: state.reducerStreams[streamToEditId]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStreamById: (streamId) => dispatch(actionFetchStream(streamId)),
        updateStreamInfo: (streamId, formValues) => dispatch(actionUpdateStream(streamId, formValues))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);