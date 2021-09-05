import React, { Component, Fragment } from "react";
import { logout } from "../../actions/authAction";
import { connect } from "react-redux";
import { NavLink, DropdownItem } from "reactstrap";
import PropTypes from "prop-types";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        {/* <NavLink onClick={this.props.logout} href="#">
          Logout
        </NavLink> */}
        <DropdownItem>
          <div onClick={this.props.logout}>Logout</div>
        </DropdownItem>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
