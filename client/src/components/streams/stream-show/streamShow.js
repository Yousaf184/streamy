import React, { Component } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { actionFetchStream } from '../../../redux-setup/actions';
import './streamShow.css';

class StreamShow extends Component {

    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchStreamById(this.props.match.params.id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.streamToShow) {
            return;
        }

        const streamName = this.props.match.params.streamName;

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${streamName}.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    renderStream = () => {
        if (!this.props.streamToShow) {
            return (
                <p>Loading...</p>
            );
        }

        return (
            <div className="stream-show-info-container">
                <h1>{this.props.streamToShow.title}</h1>
                <p>{this.props.streamToShow.description}</p>
            </div>
        );
    }

    render() {
        return (
            <div className="stream-show-component">
                <video ref={this.videoRef} style={{width: '100%'}} controls></video>
                { this.renderStream() }
            </div>
        );
    }
}

const mapStateToProps = (state, ownState) => {
    const streamToShowId = ownState.match.params.id;

    return {
        streamToShow: state.reducerStreams[streamToShowId]
    };
};

const mapDisptachToProps = (dispatch) => {
    return {
        fetchStreamById: (streamId) => dispatch(actionFetchStream(streamId))
    };
};

export default connect(mapStateToProps, mapDisptachToProps)(StreamShow);