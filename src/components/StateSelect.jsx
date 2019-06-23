/**
 * @TODO
 * - adicionar tooltip
 */
import React from 'react';
import styled from 'styled-components';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import theme from '../theme';
import Subsubtitle from './Subsubtitle';

import brasil from '../topo/states.json';

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
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </Container>
  );
};

export default StateSelect;
