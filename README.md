# Cadastro de cidades e estado
Grud utilizando Vue + nodejs para cadastro de cidade e estado

### Considerações iniciais
- Este é o primeiro arquivo criado desse projeto
- Para efeito de cálculo de performance este teste foi feito em 05/09/2020 10:30 - 
- Este projeto será baseado em micro serviços, será divido em dois serviços stateless (API, WEB) que serão pasta na raiz do projeto
- Para a API será utilizada um container node com a versão 12.18 visto que essa é a última versão estável no momento em que esse projeto foi feito
- Para executar o projeto basta executar o comando, é nescessário que o pc tenha o docker instalado
```bash
docker-compose up
```
- Variaveis de ambiente estão na raiz do projeto
> Eu sei que não se commita .env mas minha inteção é facilitar a execução do projeto

#### API
- Para a documentação será utilizado o “Swagger JSDoc” e “Swagger UI Express” para gerar a documentação OpenAPI de forma automática.
- A documentação da API estará disponível em “http://localhost:3000/”
- Para os testes automatizados será utilizado o “Jest”
- Para executar os testes uma vez com os containers rodando executar
```bash
docker exec -it CCE_API jest --watchAll
```

#### WEB
- Para o front-end será usado uma instalação padrão de um projeto vue
- Para os testes automatizados será utilizado o “Jest”

