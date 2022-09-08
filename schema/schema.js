const graphQL = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt } = graphQL
const _ = require('lodash')

// dummy data
const books = [
    { name: 'aaaa', genre: 'bbb', id: '1', authorID: '1' },
    { name: 'aaa', genre: 'bb', id: '2', authorID: '1' },
    { name: 'aa', genre: 'b', id: '3', authorID: '3' }
]

const authors = [
    { name: 'abhishah', age: 21, id: '1' },
    { name: 'markshah', age: 55, id: '2' },
    { name: 'jack', age: 49, id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                const author = _.find(authors, { id: parent.authorID })
                return author
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
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
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                const book = _.find(books, { id: args.id })
                return book
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                const author = _.find(authors, { id: args.id })
                return author
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})