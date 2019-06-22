import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../containers/search_bar";
import $ from "jquery";

class NavBar extends Component { // eslint-disable-line arrow-body-style
 componentDidMount(){
        $(document)['ready'](function(){$('#hamburger')['on']('click',function(NavBar){$('.collapse')['toggleClass']('open')})});$(document)['ready'](function(){$('#dropdown')['on']('click',function(NavBar){$('.dropdown-menu')['toggleClass']('open')})});
    }
    render() {
    return (
        <nav role="navigation">
            <Link to="/" class="logo"><img src="https://cdn.glitch.com/5a6707b1-9411-4d99-bf4f-5fcc2c727e46%2Fnhtai.png?1555820206666" alt="logo" width="46" height="30" /></Link>
            <SearchBar />
                    <button type="button" class="btn btn-secondary btn-square" id="hamburger">
                      <span class="line"></span>
                      <span class="line"></span>
                      <span class="line"></span>
                    </button>
                    <div class="collapse">
                      <ul class="menu left">
                        <li class="desktop ">
                          <a href="https://random.nhent.ai">Random</a>
                        </li>
                        <li class="desktop ">
                          <a href="/partner/">Partner</a>
                        </li>
                        <li class="desktop ">
                          <a href="/app/">App</a>
                        </li>
                        <li class="dropdown">
                          <button class="btn btn-secondary btn-square" type="button" id="dropdown">
                            <i class="fa fa-chevron-down"></i>
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <a href="https://random.nhent.ai/">Random</a>
                            </li>
                            <li>
                              <a href="/partner/">Partner</a>
                            </li>
                            <li>
                              <a href="/app/">App</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
        </nav>
    )
   }
}
export default NavBar;
