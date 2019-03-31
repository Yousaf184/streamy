import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

class Modal extends Component {
    render() {
        return ReactDOM.createPortal(
            <div className="modal-container">
                <div className="modal">
                    <h1>{this.props.title}</h1>
                    <div className="modal-body">
                        {this.props.message}
                    </div>
                    <div className="modal-footer">
                        {this.props.actions}
                    </div>
                </div>
            </div>
            ,
            document.querySelector('#modal')
        );
    };
}

export default Modal;