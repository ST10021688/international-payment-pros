import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home'; // Main home page
import Login from './components/Login'; // Login component
import Register from './components/Register'; // Registration component
import Payment from './components/Payment'; // Payment component
import ProtectedRoute from './components/ProtectedRoute'; // Protect routes for logged-in users
import NotFound from './components/NotFound'; // 404 Not Found component

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/*<ProtectedRoute path="/payment" component={Payment} />*/}
          <Route component={NotFound} /> {/* Catch-all route for 404 */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
