import React from 'react';
import styled from 'styled-components';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import theme from '../theme';
import Subsubtitle from './Subsubtitle';

import brasil from '../topo/states';
import states from '../data/states';

const Composable = styled(ComposableMap)`
  width: 90vw;
  height: 90vw;
  max-width: 600px;
  max-height: 600px;
`;

const Tooltip = styled(ReactTooltip)`
  color: ${props => props.theme.colors.black} !important;
  font-size: 15px;
  text-align: center;

  background-color: ${props => props.theme.colors.white} !important;
  box-shadow: 1px 11px 5px -4px ${props => props.theme.colors.gray};

  &.place-top {
    &:after {
      border-top-color: ${props => props.theme.colors.white} !important;
      border-top-style: solid !important;
      border-top-width: 6px !important;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 50px 0;
`;

const mapCenter = [-54.77989334751745, -13.603361893828286];

const StateSelect = ({ callback, selectedScope, selectedState }) => {
  if (selectedScope !== 'estadual') {
    return null;
  }

  const isSelected = geography => geography.id === selectedState;
  const getStateName = ufCode => (states.find(s => s.ufCode === ufCode) || { name: 'a' }).name;
  const countData = geography => (states.find(s => s.ufCode === geography.id) || { list: [] }).list.length;

  const fillColor = (geography, type = 'default') => {
    if (type === 'default') {
      if (isSelected(geography)) return theme.colors.green;
      if (countData(geography)) return theme.colors.lightGray;
      return theme.colors.lightRed;
    }

    if (type === 'hover') {
      if (isSelected(geography)) return theme.colors.green;
      if (countData(geography)) return theme.colors.lightGreen;
      return theme.colors.lightRed;
    }

    return theme.colors.lightGreen;
  };

  return (
    <Container>
      <Subsubtitle>Selecione um estado</Subsubtitle>
      <Composable
        projectionConfig={{
          scale: 1200,
        }}
      >
        <ZoomableGroup center={mapCenter} disablePanning>
          <Geographies geography={brasil} disableOptimization>
            {(geographies, projection) =>
              geographies.map(geography => (
                <Geography
                  key={geography.id}
                  geography={geography}
                  projection={projection}
                  onClick={({ id }) => callback(id)}
                  style={{
                    default: {
                      fill: fillColor(geography),
                      stroke: theme.colors.green,
                      outline: 'none',
                    },
                    hover: {
                      fill: fillColor(geography, 'hover'),
                      stroke: theme.colors.green,
                      outline: 'none',
                    },
                    pressed: {
                      fill: fillColor(geography, 'pressed'),
                      stroke: theme.colors.green,
                      outline: 'none',
                    },
                  }}
                  data-tip={geography.id}
                  data-for="map"
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </Composable>
      <Tooltip
        id="map"
        getContent={data => {
          const id = parseInt(data, 0);
          const listCount = countData({ id });
          return (
            <>
              <div>
                <strong>{getStateName(id)}</strong>
              </div>
              <div>{`(${listCount || 'nenhuma'} fonte${listCount > 1 ? 's' : ''} encontrada${listCount > 1 ? 's' : ''})`}</div>
            </>
          );
        }}
        border
        multiline
      />
    </Container>
  );
};

export default StateSelect;
