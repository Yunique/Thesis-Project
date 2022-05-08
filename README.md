## Chat-App with AI
> This is my graduate work. The final goal of the project is an online messenger with the ability to analyze chat messages for the subsequent formation of metrics describing the corporate climate. 
At the moment: implemented online messenger, implemented a test module in Python.

## Overview
Based on hexlet-chat (previous pet-project), this is a simple real-time chat application that's able to provide information on the corporate climate, both in general and by individual person. 

## Features
- Registration and authorization. The project has a small server that supports [JWT](https://jwt.io/) technology.
- Create, rename and delete channels. These operations take place inside modals.
- Create and receive messages. Implemented via [websockets](https://socket.io/).
- All forms validation and error handling. Used by [formik](https://formik.org/).
- (In Work) Corporate climate metrics. Implemented via [pandas](https://pandas.pydata.org/).

## Tech Stack
- [React (with hooks)](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [React-Bootstrap](https://react-bootstrap.github.io/), [socket.io](https://socket.io/), [formik](https://formik.org/), [i18next](https://react.i18next.com/)
- [ESLint](https://eslint.org/), [Webpack](https://webpack.js.org/), [Heroku](https://heroku.com/), [Rollbar](https://rollbar.com/)
- [Pandas](https://pandas.pydata.org/)


## Requirements
- [node.js](https://nodejs.org/) >= v14
- [python](https://www.python.org/) >= 3
- [npm](https://www.npmjs.com/) >= v6
- [make](https://www.gnu.org/software/make/) >= v4
- [git](https://git-scm.com/) >= v2.28
- [heroku cli](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

## Online App link
```sh
https://yunik-thesis-project.herokuapp.com/
```

## Locally
```
$ git clone https://github.com/yunique/thesis-project.git
$ make install
$ make start
```

## By default available two users:
```
admin/admin
user/user
```
