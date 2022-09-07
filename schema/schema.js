const graphQL = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphQL
const _ = require('lodash')

// dummy data
const books = [
    { name: 'aaaa', genre: 'bbb', id: 1 },
    { name: 'aaa', genre: 'bb', id: 2 },
    { name: 'aa', genre: 'b', id: 3 }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
               return _find(books, { id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})