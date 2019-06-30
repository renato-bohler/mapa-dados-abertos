import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { Body, Content, Title, Subtitle, TextHighlight, Paragraph, Link, Button, ButtonContainer, DataList, StateSelect, CitySelect } from './components';

const App = () => {
  const [selectedScope, setSelectedScope] = useState('');
  const [selectedState, setSelectedState] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);

  const scrollToList = () => window.scrollTo(0, document.getElementById('list').offsetTop);

  const handleClickScope = selected => {
    setSelectedScope(selected);
    setSelectedState(0);
    setSelectedCity(0);
  };
  const handleClickState = region => {
    setSelectedState(region);
    if (region) {
      scrollToList();
    }
  };
  const handleSelectCity = city => {
    setSelectedCity(city);
    if (city) {
      scrollToList();
    }
  };

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
            <Link href="https://github.com/renato-bohler/mapa-dados-abertos" target="_blank" rel="noopener noreferrer">
              através deste repositório
            </Link>
            , hospedado no GitHub. A leitura{' '}
            <Link href="https://github.com/renato-bohler/mapa-dados-abertos/blob/master/.github/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
              desta documentação
            </Link>{' '}
            é recomendada antes de iniciar um trabalho de contribuição.
          </Paragraph>
          <Subtitle>Selecione uma opção</Subtitle>
          <ButtonContainer>
            <Button onClick={() => handleClickScope('federal')} selected={selectedScope === 'federal'}>
              Federal
            </Button>
            <Button onClick={() => handleClickScope('estadual')} selected={selectedScope === 'estadual'}>
              Estadual
            </Button>
            <Button onClick={() => handleClickScope('municipal')} selected={selectedScope === 'municipal'}>
              Municipal
            </Button>
          </ButtonContainer>
          <StateSelect selectedScope={selectedScope} selectedState={selectedState} callback={handleClickState} />
          <CitySelect selectedScope={selectedScope} callback={handleSelectCity} />
          <DataList selectedScope={selectedScope} selectedState={selectedState} selectedCity={selectedCity} />
        </Content>
      </Body>
    </ThemeProvider>
  );
};

export default App;
