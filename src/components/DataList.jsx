import React from 'react';
import styled from 'styled-components';
import Subsubtitle from './Subsubtitle';

import federal from '../data/federal';
import states from '../data/states';
import cities from '../data/cities';

const getState = ufCode => states.find(s => s.ufCode === ufCode) || { name: '', list: [] };
const getCity = ibgeCode => cities.find(c => c.ibgeCode === ibgeCode) || { name: '', list: [] };

const getTitle = (selectedScope, selectedState, selectedCity) => {
  if (selectedScope === 'federal') return 'Dados abertos federais';
  if (selectedScope === 'estadual') return `Dados abertos ${getState(selectedState).name}`;
  if (selectedScope === 'municipal') return `Dados abertos ${getCity(selectedCity).name}`;
  return '';
};

const getData = (selectedScope, selectedState, selectedCity) => {
  if (selectedScope === 'federal') return federal;
  if (selectedScope === 'estadual' && selectedState) return getState(selectedState).list;
  if (selectedScope === 'municipal' && selectedCity) return getCity(selectedCity).list;
  return [];
};

const Box = styled.div`
  max-width: 1000px;

  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 15px;

  margin: auto;
  padding: 15px;
`;

const BaseItem = styled.a`
  display: flex;
  flex-direction: column;

  min-height: 50px;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;
  margin: 10px 5px;
  padding: 10px;

  text-decoration: none;

  transition-duration: 0.4s;

  background: ${props => props.theme.colors.lightGray};

  &:hover,
  &:active,
  &:focus {
    background: ${props => props.theme.colors.gray};
  }
`;

const Item = ({ title, subtitle, url }) => (
  <BaseItem href={url} target="_blank" rel="noopener noreferrer">
    <ItemTitle>{title}</ItemTitle>
    <ItemSubtitle>{subtitle}</ItemSubtitle>
  </BaseItem>
);

const ItemTitle = styled.span`
  flex-grow: 1;

  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.green};

  transition-duration: 0.4s;

  &:hover,
  &:active,
  &:focus {
    color: ${props => props.theme.colors.blue};
  }
`;

const ItemSubtitle = styled.div`
  font-style: italic;
  font-size: 15px;
  text-decoration: none;
  color: ${props => props.theme.colors.black};
`;

const NoResults = styled.div`
  font-size: 20px;
  text-align: center;
  height: 100px;
  line-height: 100px;
`;

const ListContainer = styled.div`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

const List = ({ title, id, visible, data = [] }) => (
  <ListContainer id={id} visible={visible}>
    <Subsubtitle>{title}</Subsubtitle>
    <Box>{data.length ? data.map(d => <Item key={d.url} {...d} />) : <NoResults>Nenhum resultado encontrado</NoResults>}</Box>
  </ListContainer>
);

const DataList = ({ selectedScope, selectedState, selectedCity }) => {
  const isVisible = (scope, state, city) => {
    if (scope === 'federal') return true;
    if (scope === 'estadual' && state) return true;
    if (scope === 'municipal' && city) return true;
    return false;
  };

  return (
    <List
      id="list"
      visible={isVisible(selectedScope, selectedState, selectedCity)}
      title={getTitle(selectedScope, selectedState, selectedCity)}
      data={getData(selectedScope, selectedState, selectedCity)}
    />
  );
};

export default DataList;
