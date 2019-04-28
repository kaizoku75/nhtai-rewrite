import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchNhentai } from "../actions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ButtonGroup extends Component {
    constructor(props) {
        super(props);

        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickLast = this.onClickLast.bind(this);
        this.renderPageButtons = this.renderPageButtons.bind(this);
        this.renderFirstPageButton = this.renderFirstPageButton.bind(this);
        this.renderLastPageButton = this.renderLastPageButton.bind(this);
    }

    onClickPrev() {
        const page = this.props.current_page;
        if (page - 1 < 1) {
            return;
        }
        const url = this.props.url.replace(`&page=${page}`, "");
        this.props.searchNhentai(url, page - 1);
    }

    onClickNext() {
        const page = this.props.current_page;
        const max = this.props.max_page;
        if (page + 1 > max) {
            return;
        }
        const url = this.props.url.replace(`&page=${page}`, "");
        this.props.searchNhentai(url, page + 1);
    }


    onClickLast() {
        const page = this.props.current_page;
        const max = this.props.max_page;
        const url = this.props.url.replace(`&page=${page}`, "");
        this.props.searchNhentai(url, max);
    }

    computePageButtons(page,max){
        const base = page <= 3 ? 1 : page-2;
        const page_array = [base];
        for(let i = base+1;i <= max && page_array.length < 5;i++){
            page_array.push(i);
        }
        if(page_array.length<5){
            for(let i = base-1; i > 0 && page_array.length < 5;i--){
                page_array.push(i);
            }
        }
        return page_array.sort((a,b)=>a-b);
    }

    renderPageButtons(page){
        const query = this.props.query ? `/search/${this.props.query}` : "";
        if(page.toString() === this.props.current_page){
            return <Link to={`${query}/${page}`} class="page current" key={page}>{page}</Link>;
        }
        return <Link to={`${query}/${page}`} class="page" key={page}>{page}</Link>;
    }

    renderFirstPageButton(query,page){
        if(page<4){
            return <noscript />;
        }
        return 
                <Link to={`${query}/1`} class="page">{1}</Link>
    }

    renderLastPageButton(query,page){
        if(page>this.props.max_page-3){
            return <noscript />;
        }
        return (
                <Link to={`${query}/${this.props.max_page}`} class="page">{this.props.max_page}</Link>
        );
    }


    render() {
        const query = this.props.query ? `/search/${this.props.query}` : "";
        return (
            <section class="pagination">
                    <Link disabled={this.props.current_page == 1} to={`${query}/1`} class="first"><i class="fa fa-chevron-left"></i><i class="fa fa-chevron-left"></i></Link>
                    <Link disabled={this.props.current_page - 1 < 1} to={`${query}/${parseInt(this.props.current_page) - 1}`} class="previous"><i class="fa fa-chevron-left"></i></Link>
                    {this.renderFirstPageButton(query,this.props.current_page)}
                    {this.computePageButtons(this.props.current_page,this.props.max_page).map(this.renderPageButtons)}
                    {this.renderLastPageButton(query,this.props.current_page)}
                    <Link disabled={this.props.current_page + 1 > this.props.max_page} to={`${query}/${parseInt(this.props.current_page) + 1}`} class="next"><i class="fa fa-chevron-right"></i></Link>
                    <Link disabled={this.props.current_page == this.props.max_page} to={`${query}/${this.props.max_page}`} class="last"><i class="fa fa-chevron-right"></i><i class="fa fa-chevron-right"></i></Link>
          </section>
        );
    }
}

function mapStateToProps({ gallery }) {
    return gallery;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchNhentai }, dispatch);
}

ButtonGroup.propTypes = {
    current_page: PropTypes.string,
    url: PropTypes.string,
    searchNhentai: PropTypes.func,
    max_page: PropTypes.string,
    query: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup);