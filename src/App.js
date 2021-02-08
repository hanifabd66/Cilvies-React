import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CreateFilm from "./Page/CreateFilmPage";
import FilmsList from "./Page/FilmListPage";
import FilmUpdate from "./Page/FilmUpdatePage";

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/films"} className="navbar-brand">
                            <h2>
                                <big class="text-muted">CIL</big>
                                <small class="text-muted">VIES</small>
                            </h2>
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/films"} className="nav-link">
                                    <big>List Films</big>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/films/add"} className="nav-link">
                                    <big> Add </big>
                                </Link>
                            </li>
                        </div>
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path="/films" component={FilmsList} />
                            <Route exact path="/films/add" component={CreateFilm} />
                            <Route path="/films/:id" component={FilmUpdate} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;