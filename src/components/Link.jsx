import styled from 'styled-components';

const Link = styled.a`
  color: ${props => props.theme.colors.blue};
  text-decoration: underline;

  &:hover,
  &:active,
  &:focus {
    color: ${props => props.theme.colors.darkBlue};
    text-decoration-style: double;
  }
`;

export default Link;
