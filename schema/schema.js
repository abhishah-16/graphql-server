const graphQL = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphQL

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