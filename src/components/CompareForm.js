import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPersonData1, getPersonData2} from '../actions/index';
var wtf_wikipedia = require("wtf_wikipedia");
import _ from 'lodash';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';


const BASE_URL = `http://lookup.dbpedia.org/api/search.asmx/PrefixSearch?QueryClass=&MaxHits=5&QueryString=`;

// const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=jsonfm&search=';

let personSuggestions = [];

function fillSuggestions(word){
  const url = `${BASE_URL}${word}`;
  console.log(url);
  axios.get(url).then((result) => {
    console.log(result);
    personSuggestions = result.data.results;
    console.log(personSuggestions);
  }).catch((e) => {});
}

function getSuggestions() {
return personSuggestions.filter(sugg =>
  sugg.label
);
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.label}</span>
  );
}


class CompareForm extends Component {
  constructor(props){
    super(props);

    this.state = {person1: '', person2: '',
      value1: '', value2: '', suggestions1: [], suggestions2: []};

    this.onChange1 = this.onChange1.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onSuggestionsFetchRequested1 = this.onSuggestionsFetchRequested1.bind(this);
    this.onSuggestionsClearRequested1 = this.onSuggestionsClearRequested1.bind(this);
    this.onSuggestionsFetchRequested2 = this.onSuggestionsFetchRequested2.bind(this);
    this.onSuggestionsClearRequested2 = this.onSuggestionsClearRequested2.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onChange1 = (event, { newValue, method }) => {
    fillSuggestions(newValue);
    this.setState({
      value1: newValue
    });
    console.log(this.state.value1)
  };

  onChange2 = (event, { newValue, method }) => {
    fillSuggestions(newValue);
    this.setState({
      value2: newValue
    })
  };

  onSuggestionsFetchRequested1 = ({ value1 }) => {
    this.setState({
      suggestions1: getSuggestions(value1)
    });
  };

  onSuggestionsClearRequested1 = () => {
    this.setState({
      suggestions1: []
    });
  };

  onSuggestionsFetchRequested2 = ({ value2 }) => {
    this.setState({
      suggestions2: getSuggestions(value2)
    });
  };

  onSuggestionsClearRequested2 = () => {
    this.setState({
      suggestions2: []
    });
  };

  onFormSubmit (event) {
    event.preventDefault();
    let word1 = this.state.value1;
    console.log(word1);
    let word2 = this.state.value2;
    let self = this;
    wtf_wikipedia.from_api(word1, "en", function(markup){
      var obj1= wtf_wikipedia.parse(markup);
      self.props.getPersonData1(obj1);
    });
    wtf_wikipedia.from_api(word2, "en", function(markup){
      var obj2= wtf_wikipedia.parse(markup);
      self.props.getPersonData2(obj2);
    });
  }

  render () {

    const { value1, value2, suggestions1, suggestions2 } = this.state;
    const inputProps1 = {
      placeholder: 'Search for Cricketer 1',
      value: value1,
      onChange: this.onChange1
    };
    const inputProps2 = {
      placeholder: 'Search for Cricketer 2',
      value: value2,
      onChange: this.onChange2
    };

    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <div className="fieldContainer">
            <Autosuggest
            id="person1"
            suggestions={suggestions1}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested1}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested1}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps1} />
          </div><div className="spacer">

          </div><div className="fieldContainer">
            <Autosuggest
            id="person2"
            suggestions={suggestions2}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested2}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested2}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps2} />
          </div>
          <div className="btnContainer">
            <button type="submit" className="btn btn-primary">Compare</button>
          </div>
        </form>
      </div>
    );
  }

}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({getPersonData1, getPersonData2}, dispatch);
}

export default connect(null, mapDispatchToProps)(CompareForm);
