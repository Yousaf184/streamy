import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionFetchStreams } from '../../../redux-setup/actions';
import CustomLink from '../../link/link';
import './streamList.css';

class StreamList extends Component {

    componentDidMount() {
        this.props.fetchStreamsList();
    }

    // render edit/delete button with stream
    // if currentUserID === user id associated with stream
    renderStreamButtons(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="btnContainer">
                    <CustomLink
                        className="editStreamBtn"
                        label="Edit"
                        navigateTo={`/streams/edit/${stream.id}`}
                    />
                    <CustomLink
                        className="deleteStreamBtn"
                        label="Delete"
                        navigateTo={`/streams/delete/${stream.id}`}
                    />
                </div>
            );
        }
    }

    renderList = () => {
        const list = this.props.streamsList.map(stream => {
            return (
                <div className="stream" key={stream.id}>
                    <div className="stream-info-container">
                        <i className="fa fa-broadcast-tower"></i>
                        <div>
                            <Link
                                className="stream-title-text"
                                to={`/streams/show/${stream.id}/${stream.title}`}>
                                {stream.title}</Link>
                            <p>{stream.description}</p>
                        </div>
                    </div>
                    { this.renderStreamButtons(stream) }
                </div>
            );
        });

        return list;
    };

    // display create stream button if user is logged in
    renderCreateBtn() {
        if (this.props.isSignedIn) {
            return (
                <CustomLink
                    className="createStreamBtn"
                    label="Create Stream"
                    navigateTo={`/streams/new`}
                />
            );
        }
    }

    render() {
        return (
            <div className="streamListComponent">
                <div className="create-btn-container">
                    <h1>Available Streams</h1>
                    { this.renderCreateBtn() }
                </div>
                { this.renderList() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streamsList: Object.values(state.reducerStreams),
        currentUserId: state.reducerAuth.currentUserId,
        isSignedIn: state.reducerAuth.isSignedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStreamsList: () => dispatch(actionFetchStreams())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);