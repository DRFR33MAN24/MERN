import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotifications } from "../actions/notificationAction";

export default class NotificationMenu extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,

        notifications: PropTypes.object,
        getNotifications: PropTypes.func.isRequired,

        user: PropTypes.object
    };
    render() {
        return (
            <div className="notification-menu">
                <Button className="notification-btn">
                    <i class="fa fa-bell"></i>
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
    getNotifications,

})(NotificationMenu);
