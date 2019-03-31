import React from 'react';
import { Link } from 'react-router-dom';
import './link.css';

const CustomLink = (props) => {
    let classlist = 'custom-link';

    if (props.className) {
         classlist = classlist + ' ' + props.className;
    }

    return (
        <Link
            className={classlist}
            to={props.navigateTo}>
            {props.label}
        </Link>
    );
};

export default CustomLink;