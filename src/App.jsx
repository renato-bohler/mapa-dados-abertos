import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { Body, Content, Title, Subtitle, TextHighlight, Paragraph, Link, Button, ButtonContainer } from './components';

const App = () => {
  const [selectedButton, setSelectedButton] = useState('federal');

  return (
    <ThemeProvider theme={theme}>
      <Body>
        <Content>
          <Title>
            Mapa <TextHighlight>brasileiro</TextHighlight> de dados abertos
          </Title>
          <Paragraph>
            Este é um site independente, com o simples objetivo de mapear as mais diversas fontes de dados abertos disponíveis no Brasil, seja a nível federal,
            estadual ou municipal.
          </Paragraph>
          <Paragraph>
            Qualquer pessoa pode propor alterações alterações à forma ou conteúdo desta página,{' '}
            <Link href="https://github.com/renato-bohler/mapa-dados-abertos" target="_blank">
              através deste repositório
            </Link>
            , hospedado no GitHub.
          </Paragraph>
          <Subtitle>Selecione uma opção</Subtitle>
          <ButtonContainer>
            <Button onClick={() => setSelectedButton('federal')} selected={selectedButton === 'federal'}>
              Federal
            </Button>
            <Button onClick={() => setSelectedButton('estadual')} selected={selectedButton === 'estadual'}>
              Estadual
            </Button>
            <Button onClick={() => setSelectedButton('municipal')} selected={selectedButton === 'municipal'}>
              Municipal
            </Button>
          </ButtonContainer>
        </Content>
      </Body>
    </ThemeProvider>
  );
};

export default App;
