import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/itemModal";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authAction";
import { Component } from "react";
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
