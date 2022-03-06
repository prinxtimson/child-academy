import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && (
  <div className="toast-container position-fixed top-0 end-0 py-5 px-2" style={{zIndex: 11}}>
    {alerts.map(alert => (
      <div 
        key={alert.id}
        className={`toast show align-items-center text-white bg-${alert.alertType}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
        <div className="toast-body">
          {alert.msg}
        </div>
      </div>
    ))
    }
  </div>
)

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
