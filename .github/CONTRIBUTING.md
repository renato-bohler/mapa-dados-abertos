# Contribuindo
Primeiramente, obrigado por considerar contribuir com o projeto :tada:

Este documento contém algumas instruções sobre como colaborar com o projeto.

## Informações importantes
- Qualquer pessoa pode propor alterações na forma e conteúdo do site.
- É necessário possuir uma conta no GitHub para efetuar as alterações.
- As alterações propostas devem ser realizadas num fork deste repositório, e um pull request deve ser aberto a partir do repositório forkado para este repositório.
- Toda alteração estará sujeita a aprovação pelos administradores do repositório.
- Qualquer dúvida em relação ao processo de contribuição, sinta-se à vontade para [abrir uma issue](https://github.com/renato-bohler/mapa-dados-abertos/issues/new) neste repositório.

## Alterações no conteúdo
Caso você queira adicionar, atualizar ou remover uma fonte de dados, existem algumas coisas importantes a saber.

### Localização dos arquivos
Os arquivos que contém as fontes de dados exibidas no site são os seguintes:

* Dados abertos federais: [`src/data/federal.js`](https://github.com/renato-bohler/mapa-dados-abertos/blob/master/src/data/federal.js)
* Dados abertos estaduais: [`src/data/states.js`](https://github.com/renato-bohler/mapa-dados-abertos/blob/master/src/data/states.js)
* Dados abertos municipais: [`src/data/cities.js`](https://github.com/renato-bohler/mapa-dados-abertos/blob/master/src/data/cities.js)

### Conteúdo dos arquivos
Todos os arquivos possuem uma estrutura de dados idêntica para identificar o título, subtítulo e o link para uma fonte de dados. Esta estrutura é simplesmente um objeto com as chaves `title`, `subtitle` e `url`, por exemplo:

```
{
  title: 'Governo Federal',
  subtitle: 'Portal da Transparência',
  url: 'http://www.portaltransparencia.gov.br/download-de-dados',
}
```

Existem pequenas diferenças na estrutura dos arquivos `federal.js`, `states.js` e `cities.js`, no entanto:

* [`src/data/federal.js`](https://github.com/renato-bohler/mapa-dados-abertos/blob/master/src/data/federal.js) exporta uma lista contendo as fontes de dados federais.
* [`src/data/states.js`](https://github.com/renato-bohler/mapa-dados-abertos/blob/master/src/data/states.js) exporta uma lista de estados, cada um contendo uma lista de fontes de dados do respectivo estado.
* [`src/data/states.js`](https://github.com/renato-bohler/mapa-dados-abertos/blob/master/src/data/states.js) exporta uma lista de municípios, cada um contendo uma lista de fontes de dados do respectivo município.

## Alterações na forma
Caso você queira alterar a forma (interface) do site, como por exemplo layout, tamanho de fonte, cores, etc., é importante saber que o projeto foi escrito utilizando a biblioteca [React](https://pt-br.reactjs.org). Ter experiência com esta biblioteca pode ser necessário para efetuar grandes mudanças, mas toda melhoria é muito bem vinda.

