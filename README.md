## Chat-App
> This is my thesis project.

## Overview
Based on hexlet-chat, this is a simple real-time chat application.

## Features
- Registration and authorization. The project has a small server that supports [JWT](https://jwt.io/) technology.
- Create, rename and delete channels. These operations take place inside modals.
- Create and receive messages. Implemented via [websockets](https://socket.io/).
- All forms validation and error handling. Used by [formik](https://formik.org/).

## Tech Stack
- [React (with hooks)](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [React-Bootstrap](https://react-bootstrap.github.io/), [socket.io](https://socket.io/), [formik](https://formik.org/), [i18next](https://react.i18next.com/)
- [ESLint](https://eslint.org/), [Webpack](https://webpack.js.org/), [Heroku](https://heroku.com/), [Rollbar](https://rollbar.com/)


## Requirements
- [node.js](https://nodejs.org/) >= v14
- [npm](https://www.npmjs.com/) >= v6
- [make](https://www.gnu.org/software/make/) >= v4
- [git](https://git-scm.com/) >= v2.28
- [heroku cli](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

## App link
```sh
TBA
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
