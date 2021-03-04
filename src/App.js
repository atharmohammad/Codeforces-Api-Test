import logo from './logo.svg';
import './App.css';
import Problems from './Components/Problems'
import User from './Components/User'
import {Route,BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={Problems}/>
        <Route path='/user' component={User}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
