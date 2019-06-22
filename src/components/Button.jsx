import React from 'react';
import styled from 'styled-components';

const BaseButton = styled.button`
  border: 2px solid ${props => (props.selected ? props.theme.colors.green : props.theme.colors.lightGray)};
  border-radius: 5px;
  outline: none;
  padding: 15px;

  min-width: 150px;

  background: ${props => (props.selected ? props.theme.colors.green : props.theme.colors.gray)};
  color: ${props => (props.selected ? props.theme.colors.yellow : props.theme.colors.black)};

  font-family: 'Montserrat', sans-serif;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  font-size: 15px;
  text-transform: uppercase;

  transition-duration: 0.1s;

  &:hover,
  &:focus {
    background: ${props => (props.selected ? props.theme.colors.lightGreen : 'none')};
    border: 2px solid ${props => (props.selected ? props.theme.colors.green : props.theme.colors.gray)};
    color: ${props => (props.selected ? props.theme.colors.blue : props.theme.colors.black)};
  }

  &:active {
    font-weight: bold;
    background-color: ${props => props.theme.colors.lightGreen};
    box-shadow: 0 5px ${props => props.theme.colors.gray};
    transform: translateY(4px);
  }
`;

const Button = ({ selected, onClick, children }) => (
  <BaseButton selected={selected} onClick={onClick}>
    {children}
  </BaseButton>
);

export default Button;
