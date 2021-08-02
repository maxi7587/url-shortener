import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { CreateShortUrlFormView } from "./views/CreateShortUrlFormView";

function App() {
  return (
      <Router>
        <div>
          <ul className={'app-header'}>
            <li>
              <Link className={'app-link'} to="/">Home</Link>
            </li>
            <li>
              <Link className={'app-link'} to="/list">About</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <CreateShortUrlFormView />
            </Route>
              <Route path="/list">
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
