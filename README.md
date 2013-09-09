# node-express-mongoose-example [![Build Status](https://secure.travis-ci.org/varju/node-express-mongoose-example.png?branch=master)](http://travis-ci.org/varju/node-express-mongoose-example)

Simple project to explore building a fully testable Node application.

## Demo endpoints

Call hello-world:
```
curl http://localhost:9650/
```

Create a user:
```
curl -X POST http://localhost:9650/users -H "Content-Type: application/json" -d '{ "name": "my user" }'
```
