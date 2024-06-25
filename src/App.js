import {BrowserRouter as Router, Switch, Route} from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from './Navbar';
import NotFound from './NotFound';
import About from './About';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
