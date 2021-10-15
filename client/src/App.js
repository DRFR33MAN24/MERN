import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import NotificationMenu from "./components/NotificationMenu";
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
          <NotificationMenu />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
