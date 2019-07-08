import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import NewRecord from "./containers/NewRecord";
import Records from "./containers/Records";
import RecordEdit from "./containers/RecordEdit";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Immunization from "./containers/Immunization";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <AuthenticatedRoute path="/records/new" exact component={NewRecord} props={childProps} />
    <AuthenticatedRoute path="/records/:id" exact component={Records} props={childProps} />
    <AuthenticatedRoute path="/records/edit/:id" exact component={RecordEdit} props={childProps} />
    <AuthenticatedRoute path="/immunization" exact component={Immunization} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
