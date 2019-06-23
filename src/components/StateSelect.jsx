import React from 'react';
import styled from 'styled-components';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import theme from '../theme';
import Subsubtitle from './Subsubtitle';

import brasil from '../topo/states.json';

const Tooltip = styled(ReactTooltip)`
  color: ${props => props.theme.colors.black} !important;
  font-weight: bold;
  font-size: 15px;

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

const mapCenter = [-52.77989334751745, -13.603361893828286];

const StateSelect = ({ callback, selectedButton, selectedRegion }) => {
  if (selectedRegion || selectedButton !== 'estadual') {
    return null;
  }
  return (
    <Container>
      <Subsubtitle>Selecione um estado</Subsubtitle>
      <ComposableMap
        projectionConfig={{
          scale: 1200,
        }}
        style={{ width: '600px', height: '600px' }}
      >
        <ZoomableGroup center={mapCenter} disablePanning>
          <Geographies geography={brasil}>
            {(geographies, projection) =>
              geographies.map(geography => (
                <Geography
                  key={geography.id}
                  geography={geography}
                  projection={projection}
                  onClick={({ id }) => callback(id)}
                  style={{
                    default: {
                      fill: theme.colors.lightGray,
                      stroke: theme.colors.green,
                      outline: 'none',
                    },
                    hover: {
                      fill: theme.colors.gray,
                      stroke: theme.colors.green,
                      outline: 'none',
                    },
                    pressed: {
                      fill: theme.colors.lightGreen,
                      stroke: theme.colors.green,
                      outline: 'none',
                    },
                  }}
                  data-tip={`${geography.properties.nome} (${geography.id})`}
                  data-for="map"
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip id="map" border />
    </Container>
  );
};

export default StateSelect;
