import React, { Component, Fragment } from "react";
import {
  Button,
  Toast,
  ToastBody,
  ToastHeader,
  Collapse,
  ListGroup,
  ListGroupItem,
  Container,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getNotifications,
  clearNotifications
} from "../actions/notificationAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

class NotificationMenu extends Component {
  state = { showNotificationsMenu: false };
  static propTypes = {
    isAuthenticated: PropTypes.bool,

    notifications: PropTypes.object,
    getNotifications: PropTypes.func.isRequired,
    clearNotifications: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentDidMount(prevProps) {
    const user = JSON.parse(localStorage.getItem("user"));

    this.props.getNotifications(user.id);
  }

  showNotifications = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ showNotificationsMenu: !this.state.showNotificationsMenu });

    this.props.clearNotifications(user.id);
  };

  render() {
    const { isAuthenticated, notifications } = this.props;
    const guest = <Fragment></Fragment>;

    if (!isAuthenticated) {
      return guest;
    }
    return (
      <div>
        {this.state.showNotificationsMenu ? (
          <Col sm="12" className="d-flex flex-column py-3 ">
            <ListGroup>
              {notifications.map(({ message }) => (
                <ListGroupItem className="text-start">
                  <small>{message}</small>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        ) : null}

        <div className="notification-menu">
          <Button className="notification-btn" onClick={this.showNotifications}>
            <span className="fa-layers fa-fw">
              {/* <i class="fa fa-bell"></i> */}
              <FontAwesomeIcon icon={faBell} />
              <span class="fa-layers-counter fa-2x">
                {notifications.length}
              </span>
            </span>
          </Button>
        </div>
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
  getNotifications,
  clearNotifications
})(NotificationMenu);
