import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionFetchStream, actionDeleteStream } from '../../../redux-setup/actions';
import Modal from '../../modal/modal';
import CustomLink from '../../link/link';
import './streamDelete.css';

class StreamDelete extends Component {

    componentDidMount() {
        this.props.fetchStreamById(this.props.match.params.id);
    }

    deleteStream(streamId) {
        this.props.deleteStreamById(streamId);
    }

    getActionButtons = () => {
        return (
            <div className="modal-actions-container">
                <button
                    className="delete-btn"
                    onClick={() => this.deleteStream(this.props.streamToDelete.id)}>
                    Delete
                </button>
                <CustomLink label="Cancel" navigateTo="/" className="cancel-btn" />
            </div>
        );
    };

    renderModal = () => {
        let promptMessage;

        if (!this.props.streamToDelete) {
            promptMessage = (<p>Are you sure you want to delete this stream?</p>);
        } else {
            promptMessage = (
                <p>
                    Are you sure you want to delete stream with title:
                    <b>"{this.props.streamToDelete.title}"</b>?
                </p>
            );
        }

        return (
            <Modal title="Delete Stream" message={promptMessage} actions={this.getActionButtons()}/>
        );
    };

    render() {
        return (
            <div>{ this.renderModal() }</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const streamId = ownProps.match.params.id;

    return {
        streamToDelete: state.reducerStreams[streamId]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStreamById: (streamId) => dispatch(actionFetchStream(streamId)),
        deleteStreamById: (streamId) => dispatch(actionDeleteStream(streamId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);