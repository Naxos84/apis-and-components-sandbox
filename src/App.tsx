import React from "react";
import "./styles.css";
import { Route, Switch, NavLink } from "react-router-dom";
import { Todos } from "./Todos";
import { WeatherPage } from "./Weather";
import { CountriesPage } from "./Countries";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { Counter } from "./Counter";

function App() {
  /*

      <div style={{ border: "8px solid lightsalmon" }}>
        <pre>sandbox: https://codesandbox.io/s/silly-violet-in7uu</pre>
        <br />
        <a href="https://ratings.gfu.cloud/form.html?h=4871821fc990c0938d6a79cd644014e06aae4fab3e402994a2f0400e4d771a36&type=trainer">
          Bewertungsformular zur Schulung
        </a>
        <br />
        <a href="http://marko-knoebl.github.io/slides">slides</a>
      </div>
  */
  return (
    <div className="App">
      <AppBar position="static">
        <Tabs
          value={false}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <NavLink to="/">
            <Tab label="Home" style={{ color: "white" }} />
          </NavLink>
          <NavLink to="/todos">
            <Tab label="Todos" style={{ color: "white" }} />
          </NavLink>
          <NavLink to="/weather">
            <Tab label="Weather" style={{ color: "white" }} />
          </NavLink>
          <NavLink to="/countries">
            <Tab label="Countries" style={{ color: "white" }} />
          </NavLink>
          <NavLink to="/counter">
            <Tab label="Counter" style={{ color: "white" }} />
          </NavLink>
          <NavLink to="/about">
            <Tab label="About" style={{ color: "white" }} />
          </NavLink>
        </Tabs>
      </AppBar>
      <Switch>
        <Route path="/" exact={true}>
          <div>Welcome to Matthias Kolley's API page</div>
        </Route>
        <Route path="/todos">
          <Todos />
        </Route>
        <Route path="/weather">
          <WeatherPage />
        </Route>
        <Route path="/countries">
          <CountriesPage />
        </Route>
        <Route path="/counter">
          <Counter />
        </Route>
        <Route path="/about">
          <p>Application by Matthias Kolley</p>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
