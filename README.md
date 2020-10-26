# Login

## Introduction
__________________
Front-end React based application which authenticates user login/ signup using JSON Web Tokens. Solves the JSON web token access refresh with local storage refresh token. Handles routing to appropriate components, based on conditional mounting outcomes.

## Table of Contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General Info
Login is a React application which takes advantage of the component routing system that React-router-dom provides. Enables conditional statement approach to rendering sensitive data of specific components based on the success of the Axios API calls using locally stored JSON web tokens.
1. Login component is default
2. Upon "login" / "signup" option appropriate API call is made
3. Credentials are sent using POST requests
4. Upon success, API response includes JSON web tokens
5. JSON web tokens are locally stored
6. Application routing dependent on access and refresh being present and valid
7. Appropriate user data to be displayed until token expiration.

## Technologies
* React v16
* Axios v0.2
* React-router-dom v5
* Email-validator v2
* Password-Validator v5

## Setup
Running this project requires local installation of npm: 
1. $ cd .. Login
2. $ cd ../client
3. $ npm install
4. $ npm start
