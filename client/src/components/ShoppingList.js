// import React, { Component } from "react";
// import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

// import { connect } from "react-redux";
// import { getItems, deleteItem } from "../actions/itemAction";

// import PropTypes from "prop-types";

// class ShoppingList extends Component {
//   static propTypes = {
//     getItems: PropTypes.func,
//     items: PropTypes.object,
//     isAuthenticated: PropTypes.bool
//   };

//   componentDidMount() {
//     this.props.getItems();
//   }

//   onDeleteClick = id => {
//     this.props.deleteItem(id);
//   };

//   render() {
//     const { items } = this.props.items;
//     return (
//       <Container>
//         <ListGroup>
//           <TransitionGroup className="shopping-list">
//             {items.map(({ _id, name, date }) => (
//               <CSSTransition key={_id} timeout={500} classNames="fade">
//                 <ListGroupItem>
//                   {this.props.isAuthenticated ? (
//                     <Button
//                       className="remove-btn"
//                       color="danger"
//                       size="sm"
//                       onClick={this.onDeleteClick.bind(this, _id)}
//                     >
//                       &times;
//                     </Button>
//                   ) : null}

//                   {name}
//                 </ListGroupItem>
//               </CSSTransition>
//             ))}
//           </TransitionGroup>
//         </ListGroup>
//       </Container>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   items: state.item,
//   isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
