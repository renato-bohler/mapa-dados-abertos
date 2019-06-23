import styled from 'styled-components';

const Body = styled.div`
  font-family: 'Montserrat', sans-serif;

  display: flex;
  justify-content: center;

  margin: 0;
  padding: 50px;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media screen and (max-width: 650px) {
    padding: 5px;
  }
`;

export default Body;
