import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Root } from "./Root";
import NavBar from "./components/nav_bar";
import GalleryList from "./containers/gallery_list";
import GalleryPage from "./components/gallery_page";
import GalleryReader from "./components/gallery_reader";


ReactDOM.render(
    <Root>
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route path="/g/:id/:page" component={GalleryReader} />
                    <Route path="/g/:id" component={GalleryPage} />
                    <Route path="/search/:query?/:page?" component={GalleryList} />
                    <Route path="/:page?" component={GalleryList} />
                </Switch>
            </div>
        </BrowserRouter>
    </Root>
    , document.getElementById("content"));