# Email Microservice

Este é um microserviço para envio de e-mails utilizando KafkaJS e Nodemailer.

## Descrição

O objetivo deste microserviço é fornecer uma maneira fácil e confiável, o envio de e-mails através de uma arquitetura baseada em mensagens utilizando o Apache Kafka para garantir a confiabilidade e escalabilidade do sistema.

## Funcionalidades

- Envio de e-mails utilizando o serviço Nodemailer.
- Integração com o Apache Kafka para garantir a confiabilidade das mensagens.
- Suporte para diferentes tipos de autenticação e provedores de e-mail.

## Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Node.js
- Kafka instalado e configurado
- Um provedor de e-mail configurado (por exemplo, Gmail)

## Instalação

1. Clone este repositório:
```
git clone https://github.com/jrgomessep/email-microservice.git
```

2. Instale as dependências do projeto:

```
cd email-microservice
npm install
```
3. Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias. Consulte o arquivo .env.example para saber quais variáveis são necessárias.

4. Inicie o servidor:

```
npm start
```

## Compilação

1. execute o comando: 

```
npm run build
```

2. diretorio destino:

```
dist
```

## Teste

1. execute o comando: 

```
npm test
```

## Contribuição

Se você deseja contribuir com este projeto, siga estas etapas:

1. Faça um fork do projeto
2. Crie uma branch para sua contribuição: `git checkout -b feature/SuaFeature`
3. Faça suas alterações e faça commit delas: `git commit -am 'Adiciona nova feature'`
4. Envie suas alterações para o seu fork: `git push origin feature/SuaFeature`
5. Crie um novo pull request para o repositório original