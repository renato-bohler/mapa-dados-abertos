import styled from 'styled-components';

const TextHighlight = styled.span`
  background: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.yellow};
`;

export default TextHighlight;
