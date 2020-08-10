import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage";
import Example from "./routes/Example";
import { UserPageDynamic } from "./dynamic";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/example" exact component={Example} />
        <Route path="/user" exact component={UserPageDynamic} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
