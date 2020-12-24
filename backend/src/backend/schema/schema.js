const graphql = require('graphql')
const fetch = require("node-fetch");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt } = graphql

const DataType = new GraphQLObjectType({
    name: 'Data',
    fields: () => ({
        id: { type: GraphQLID },
        slug: { type: GraphQLString },
        common_name: { type: GraphQLString },
        genus_id: { type: GraphQLString },
        observations: { type: GraphQLString },
        image_url: { type: GraphQLString }
    })
})

const TotalType = new GraphQLObjectType({
    name: 'Total',
    fields: () => ({
        total: { type: GraphQLString }
    })
})

const PlantType = new GraphQLObjectType({
    name: 'Plant',
    description: 'plant details',
    fields: () => ({
        data: {
            type: DataType
        }
        // ,
        // meta: {
        //     type: TotalType
        // }
    })
})

const PlantListType = new GraphQLObjectType({
    name: 'PlantList',
    description: 'plant details',
    fields: () => ({
        data: {
            type: new GraphQLList(DataType),
        }
        ,
        meta: {
            type: TotalType
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        plant: {
            type: PlantType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const body = get_data("https://trefle.io/api/v1/plants/" + args.id + "/?token=udvvyZTueX-fvahlrHK-JQVuOuBqZISY7euTvx2eooc")
                return body
            }
        },
        plants: {
            type: PlantListType,
            args: { page: { type: GraphQLInt } },
            resolve(parent, args) {
                console.log('******************' + args.page);
                var url = "https://trefle.io/api/v1/plants/?token=udvvyZTueX-fvahlrHK-JQVuOuBqZISY7euTvx2eooc";
                if (args.page != undefined) {
                    url += '&page=' + args.page
                }
                console.log(url)
                const body = get_data(url)
                return body
            }
        }
    },
})


const get_data = async url => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        // console.log(json)
        return json
    } catch (error) {
        console.log(error);
    }
};

module.exports = new GraphQLSchema({
    query: RootQuery
})
