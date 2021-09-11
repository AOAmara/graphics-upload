import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from "react-bootstrap";

const AlertDialog = ({alertStatusCode, alertStatus, alertMessage, alertMessageDetails, shown }) => {
    return (
        <Alert variant={alertStatusCode <= 300 ? 'success' : 'danger'}
               show={shown}
               transition>
            <Alert.Heading>{alertStatus}</Alert.Heading>
            <p>{alertMessage}</p>
            <p>{alertMessageDetails}</p>
        </Alert>
    );
};

AlertDialog.prototype = {
    alertStatusCode: PropTypes.number,
    alertStatus: PropTypes.string,
    alertMessage: PropTypes.string,
    alertMessageDetails: PropTypes.array,
    shown: PropTypes.bool
};

AlertDialog.defaultProps = {
    alertStatusCode: 200,
    alertStatus: '',
    alertMessage: '',
    alertMessageDetails: [],
    shown: false
};

export default AlertDialog;
