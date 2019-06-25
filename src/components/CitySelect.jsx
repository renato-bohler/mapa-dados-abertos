import React, { useState } from 'react';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import removeAccents from 'remove-accents';
import Subsubtitle from './Subsubtitle';

import cities from '../data/cities';

import './autosuggest.css';

const MAX_RESULTS = 10;

const Container = styled.div`
  display: ${props => props.visible ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
`;

const Suggestion = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SuggestionTitleContainer = styled.div`
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

const SuggestionDetail = styled.div`
  display: flex;

  font-size: 12px;
  font-style: italic;

  justify-content: center;
  align-items: center;

  background: ${props => (props.count ? props.theme.colors.lightGreen : props.theme.colors.lightRed)};
  border-radius: 8px;

  padding: 0 5px;
`;

const renderSuggestion = suggestion => (
  <Suggestion>
    <SuggestionTitleContainer>
      <SuggestionTitle>{suggestion.name}</SuggestionTitle>
      <SuggestionSubtitle>{suggestion.ufName}</SuggestionSubtitle>
    </SuggestionTitleContainer>
    <SuggestionDetail count={suggestion.list.length}>
      {suggestion.list.length || 'Nenhuma'} fonte{suggestion.list.length > 1 ? 's' : ''}
    </SuggestionDetail>
  </Suggestion>
);

const prepareString = (str = '') =>
  removeAccents(
    str
      .toString()
      .toLowerCase()
      .split(' ')
      .join(''),
  );

const getSuggestions = value => {
  const inputValue = prepareString(value);

  return cities
    .filter(
      c =>
        prepareString(c.name).includes(inputValue) ||
        prepareString(c.uf).includes(inputValue) ||
        prepareString(c.ufName).includes(inputValue) ||
        prepareString(c.ibgeCode).includes(inputValue),
    )
    .slice(0, MAX_RESULTS);
};

const getSuggestionValue = suggestion => `${suggestion.name} - ${suggestion.uf}`;

const CitySelect = ({ selectedButton, callback = () => {} }) => {
  const initialSuggestions = cities.slice(0, MAX_RESULTS);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const onSuggestionsFetchRequested = ({ value: v }) => {
    setSuggestions(getSuggestions(v));
  };
  const onSuggestionsClearRequested = () => setSuggestions(initialSuggestions);
  const onChange = (e, { newValue: v }) => {
    setValue(v);
    callback(v);
  };

  return (
    <Container visible={selectedButton === 'municipal'}>
      <Subsubtitle>Selecione uma cidade</Subsubtitle>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Pesquise uma cidade pelo seu nome, estado ou código IBGE...',
          value,
          onChange,
        }}
      />
    </Container>
  );
};

export default CitySelect;
