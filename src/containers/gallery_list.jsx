import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ButtonGroup from "./page_button";
import { searchBooksByKeyword } from "../actions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import LazyLoad from "react-lazyload";
import axios from 'axios';
import _ from "lodash";
import $ from "jquery";

import PageLoader from "../components/page_loader";
import ImageLoader from "../components/image-loader";

class GalleryList extends Component {
    constructor(props) {
        super(props);
        
        

        this.state = {
            query: props.match.params.query,
            current_page: props.match.params.page,
            data: props.data
        };

        // fetch the data while user enter
        // search the query or the all page
        let url;
        if (_.get(props,"match.params.query",null)) {
            url = `https://nhtai-api.glitch.me/api/search?query=${props.match.params.query}`;
        }
        else {
            url = "https://nhtai-api.glitch.me/api/search?";
        }
        // specify the page at
        const page = props.match.params.page || 1;
        props.searchBooksByKeyword(url, page);

        this.renderGallery = this.renderGallery.bind(this);
        this.computePath = this.computePath.bind(this);
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (!(state.query === nextProps.match.params.query && state.current_page === nextProps.match.params.page)) {
            let url;
            if (_.get(nextProps,"match.params.query",null)) {
                url = `https://nhtai-api.glitch.me/api/search?query=${nextProps.match.params.query}`;
            }
            else {
                url = "https://nhtai-api.glitch.me/api/search?";
            }
            const page = nextProps.match.params.page || 1;
            nextProps.searchBooksByKeyword(url, page);
            return {
                data: null,
                query: nextProps.match.params.query,
                current_page: nextProps.match.params.page,
            };
        }
        // state setting while receive props from actions
        return {
            data: nextProps.data,
            query: nextProps.match.params.query,
            current_page: nextProps.match.params.page,
        };
    }

    computePath() {
        const query = this.props.match.params.query;
        const page = this.props.current_page;
        if (query) {
            return `/search/${query}/${page}`;
        } else {
            return `/${page}`;
        }
    }

    renderTitle(query){
        if(query){
            return (
                <Helmet>
                    <title>{`Search: ${query} » nHtai`}</title>
                </Helmet>
            );
        }
        return (
            <Helmet>
                <title>nHtai</title>
            </Helmet>
        );
    }

    renderGallery(galleryData) {
        const cover_type = { j: "jpg", p: "png", g: "gif" };
        const this_type = galleryData.images.thumbnail.t;
        return (
            <Link to={{ pathname: `/g/${galleryData.id}`, state: { backpath: this.computePath() } }} key={galleryData.id}>
                <div class="gallery">
                <div class="caption">{galleryData.title.english}</div>
                  <LazyLoad height="100%" once >
                    <ImageLoader src={`https://kontol.nhent.ai/galleries/${galleryData.media_id}/thumb.${cover_type[this_type]}`} className="item-img" />
                  </LazyLoad>
                </div>
            </Link>
        );
    }

    render() {
        if (this.state.data === null || typeof this.state.data === "undefined") {
            return <PageLoader />;
        } else if (this.state.data.length <= 0) {
            return (
                <div>
                    {this.renderTitle(this.state.query)}
                    <h1 className="loading">No Results</h1>
                </div>
            );
        }
        return (
            <div>
                {this.renderTitle(this.state.query)}
            <br/>
            <div id="notification" class="alert alert-info alert-dismissible text-center" role="alert">
        				<strong>Update (24-Apr):</strong> Migration to OVH Server and Redesign like <strong>nHentai</strong>
            </div>
            <div class="iklan" height="90" width="728">
              <a href="https://onnime.me"><img src="https://cdn.onnime.me/uploads/2019/04/banner-728x90.gif"></img></a>
            </div>
                <ButtonGroup page={this.state.current_page} query={this.state.query} />
                <div class="container index-container">
                    {this.state.data.map(this.renderGallery)}
                </div>
                <ButtonGroup page={this.state.current_page} query={this.state.query} />
            <div class="iklan" height="90" width="728">
              <a href="https://doramaku.me"><img src="https://drakormu.com/wp-content/uploads/2018/06/doramaku.jpg"></img></a>
            </div>
            </div>
        );
    }
}

function mapStateToProps({ gallery }) {
    return gallery;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchBooksByKeyword }, dispatch);
}

GalleryList.propTypes = {
    match:PropTypes.shape({
        params:PropTypes.shape({
            query: PropTypes.string,
            page: PropTypes.string
        })
    }),
    current_page: PropTypes.string,
    data: PropTypes.array,
    searchBooksByKeyword: PropTypes.func,
    book:PropTypes.shape({
        title:PropTypes.shape({
            english:PropTypes.string,
            japanese:PropTypes.string,
          pretty:PropTypes.string
        }),
        media_id:PropTypes.string,
        images:PropTypes.shape({
            cover:PropTypes.shape({
                t:PropTypes.string
            })
        }),
        tags:PropTypes.shape({
            id:PropTypes.string
        }),
        num_pages:PropTypes.number
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryList);