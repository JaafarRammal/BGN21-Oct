import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { NavbarLinks } from "./Helpers/NavbarLinks";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          {Object.keys(NavbarLinks).map((key, index) => {
            const link = NavbarLinks[key];
            return <Route key={index} exact path={link.redirect} component={link.page} />;
          })}
          <Redirect from="**" to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
