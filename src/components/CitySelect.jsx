import React from 'react';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import removeAccents from 'remove-accents';
import Subsubtitle from './Subsubtitle';

import cities from '../data/cities';
import './autosuggest.css';

const MAX_RESULTS = 10;

const prepareString = str => removeAccents(str.toString().toLowerCase().split(' ').join(''));

const getSuggestions = value => {
  const inputValue = prepareString(value);

  return inputValue === '' ? cities.slice(0, MAX_RESULTS) : cities.filter(c => (
    prepareString(c.name).includes(inputValue) ||
    prepareString(c.uf).includes(inputValue) ||
    prepareString(c.ufName).includes(inputValue) ||
    prepareString(c.ibgeCode).includes(inputValue)
  )).slice(0, MAX_RESULTS);
};

const getSuggestionValue = suggestion => `${suggestion.name} - ${suggestion.uf}`;

const Suggestion = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuggestionTitle = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const SuggestionSubtitle = styled.span`
  font-style: italic;
  font-size: 15px;
`;

const renderSuggestion = suggestion => (
  <Suggestion>
    <SuggestionTitle>
      {suggestion.name}
    </SuggestionTitle>
    <SuggestionSubtitle>
      {suggestion.ufName}
    </SuggestionSubtitle>
  </Suggestion>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// TODO: refactor to stateless components using hooks
// TODO: show only if selectedButton === 'municipal'
class CitySelect extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: cities.slice(0, MAX_RESULTS)
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Pesquise uma cidade pelo seu nome, estado ou código IBGE...',
      value,
      onChange: this.onChange
    };

    // TODO: center horizontally, add title, etc.
    return (
      <Container>
        <Subsubtitle>Selecione uma cidade</Subsubtitle>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </Container>
    );
  }
}

export default CitySelect;