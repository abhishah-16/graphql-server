const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/graphql',() => {
    console.log('connected to mongodb');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000, () => {
    console.log('server is running on 5000');
})