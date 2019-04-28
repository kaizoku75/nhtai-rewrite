import React, { Component } from "react";
import GalleryDetail from "../containers/gallery_detail";
import GalleryImages from "../containers/gallery_images";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Disqus from 'disqus-react';

export default class GalleryPage extends Component {
  constructor(props) {
        super(props);
        // if contains a back path , set it
        // if no back path , set it back to root path "/"
        try {
            const backpath = props.location.state.backpath;
            this.state = {
                backpath
            };
        } catch (e) {
            this.state = {
                backpath: "/"
            };
        }
    };

    render() {
      const disqusShortname = 'nhtai';
        return (
            <div className="items-container">
                <GalleryDetail id={this.props.match.params.id} />
                <GalleryImages backpath={this.state.backpath} />
            <div class="container" id="comment-container">
            <Disqus.DiscussionEmbed shortname={disqusShortname} />
            </div>
          </div>
        );
      }
}
GalleryPage.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            backpath: PropTypes.string
        })
    }),
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }),
 
};
