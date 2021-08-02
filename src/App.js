import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { CreateShortUrlFormView } from "./views/create-url-short-form-view/CreateShortUrlFormView";
import {UrlListView} from "./views/url-list-view/UrlListView";

function App() {
  return (
      <Router>
        <div>
          <ul className={'app-header'}>
            <li>
              <Link className={'app-link'} to="/">Generate URL</Link>
            </li>
            <li>
              <Link className={'app-link'} to="/list">URL List</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <CreateShortUrlFormView />
            </Route>
            <Route path="/list">
              <UrlListView />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
