import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5px;
  margin: 0 0 50px 0;

  @media screen and (max-width: 650px) {
    flex-direction: column;

    & > button {
      margin: 0 0 25px 0;
    }
  }
`;

export default ButtonContainer;
