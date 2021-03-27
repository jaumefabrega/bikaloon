import { Switch, Route } from "react-router-dom"
import Header from './components/Header/Header'
import BikesList from './components/BikesList/BikesList'
import BikeDetail from './components/BikeDetail/BikeDetail'
import Admin from './components/Admin/Admin'

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/bike/:bikeId">
          <BikeDetail />
        </Route>
        <Route path="/">
          <BikesList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
