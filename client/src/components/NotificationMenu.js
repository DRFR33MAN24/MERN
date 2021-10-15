import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotifications } from "../actions/notificationAction";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";

class NotificationMenu extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,

    notifications: PropTypes.object,
    getNotifications: PropTypes.func.isRequired,

    user: PropTypes.object
  };

  componentDidMount(prevProps) {
    const user = JSON.parse(localStorage.getItem("user"));

    this.props.getNotifications(user.id);
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const guest = <Fragment></Fragment>;

    if (!isAuthenticated) {
      return guest;
    }
    return (
      <div className="notification-menu">
        <Button className="notification-btn">
          <span className="fa-layers fa-fw">
            <i class="fa fa-bell"></i>
            <span class="fa-layers-counter fa-2x">1,419</span>
          </span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,

  notifications: state.notifications.notifications,

  user: state.auth.user
});

export default connect(mapStateToProps, {
  getNotifications
})(NotificationMenu);
