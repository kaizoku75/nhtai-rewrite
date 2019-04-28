import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = { term: "" };
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    // control the input
    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();

        this.props.history.push(`/search/${this.state.term}/1`);
    }

    render() {
        return (
            <form role="search" class="search" onSubmit={this.onFormSubmit}>
                <input
                    placeholder="Search: Ex 'FUTANARI'"
                    className="search"
                    value={this.state.term}
                    onChange={this.onInputChange} />
                <button type="submit" className="btn btn-primary btn-square"><i class="fa fa-search fa-lg"></i></button>
            </form>
        );
    }
}

SearchBar.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

export default withRouter(SearchBar);