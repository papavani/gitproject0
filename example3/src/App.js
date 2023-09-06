import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

function MyButton() {
  return (
    <Link to="/button-page">
      <button>
        I'm button
      </button>
    </Link>
  );
}

function ButtonPage() {
  return (
    <div>
      <h2>This is the Button Page</h2>
    </div>
  );
}

export default function MyApp() {
  return (
    <Router>
      <div>
        <h1>Welcome to my App</h1>
        <MyButton />

        <Route path="/button-page" component={ButtonPage} />
        <Redirect from="/" to="/button-page" />
      </div>
    </Router>
  );
}
