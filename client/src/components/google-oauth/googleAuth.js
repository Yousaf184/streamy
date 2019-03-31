import React, { Component } from 'react';
import { connect } from 'react-redux';
import './googleAuth.css';
import { actionSignIn, actionSignOut } from '../../redux-setup/actions';

class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '118863017266-9i7nla66a4akgt3cudfl4bhqr5jn23nq.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get());

                // listen for auth status change
                this.auth.isSignedIn.listen(() => {
                    this.onAuthChange(this.auth.isSignedIn.get());
                });
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            const currentUserID = this.auth.currentUser.get().getId();
            // disptach sign in action creator
            this.props.signIn(currentUserID);
        } else if (!isSignedIn) {
            // disptach sign out action creator
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="auth-btn" onClick={this.onSignOutClick}>
                    <i className="fab fa-google"></i>
                    Sign out
                </button>
            );
        } else if (!this.props.isSignedIn) {
            return (
                <button className="auth-btn" onClick={this.onSignInClick}>
                    <i className="fab fa-google"></i>
                    Sign in
                </button>
            );
        }
    }

    render() {
        return (
            <div>{ this.renderAuthButton() }</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.reducerAuth.isSignedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (currentUserID) => dispatch(actionSignIn(currentUserID)),
        signOut: () => dispatch(actionSignOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);