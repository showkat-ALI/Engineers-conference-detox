import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import { AuthProvider } from "../contexts/AuthContext"
import { AuthProvider } from "../Contexts/AuthContexts";
import Chats from "./Chats/Chats";

// import Chats from "./Chats"
import Login from "./Login/Login";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
