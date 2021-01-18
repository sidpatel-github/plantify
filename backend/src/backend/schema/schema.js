const graphql = require('graphql')
const fetch = require("node-fetch");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt } = graphql

const Data = new GraphQLObjectType({
    name: 'Data',
    fields: () => ({
        id: { type: GraphQLID },
        slug: { type: GraphQLString },
        common_name: { type: GraphQLString },
        genus_id: { type: GraphQLString },
        observations: { type: GraphQLString },
        image_url: { type: GraphQLString },
        main_species: { type: MainSpecies }
    })
})

const Total = new GraphQLObjectType({
    name: 'Total',
    fields: () => ({
        total: { type: GraphQLString }
    })
})


const MainSpecies = new GraphQLObjectType({
    name: 'MainSpecies',
    fields: () => ({
        images: { type: MainSpeciesImages }
    })
})

const MainSpeciesImages = new GraphQLObjectType({
    name: 'MainSpeciesImages',
    fields: () => ({
        fruit: { type: new GraphQLList(Image) },
        habit: { type: new GraphQLList(Image) },
        leaf: { type: new GraphQLList(Image) },
        flower: { type: new GraphQLList(Image) }
    })
})
const Image = new GraphQLObjectType({
    name: 'Images',
    fields: () => ({
        image_url: { type: GraphQLString }
    })
})

const Plant = new GraphQLObjectType({
    name: 'Plant',
    description: 'plant details',
    fields: () => ({
        data: {
            type: Data
        }
        // ,
        // meta: {
        //     type: Total
        // }
    })
})

const PlantList = new GraphQLObjectType({
    name: 'PlantList',
    description: 'plant details',
    fields: () => ({
        data: {
            type: new GraphQLList(Data),
        }
        ,
        meta: {
            type: Total
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        plant: {
            type: Plant,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const body = get_data("https://trefle.io/api/v1/plants/" + args.id + "/?token=udvvyZTueX-fvahlrHK-JQVuOuBqZISY7euTvx2eooc")
                return body
            }
        },
        plants: {
            type: PlantList,
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
        },
        category: {
            type: PlantList,
            args: { categoryType: { type: GraphQLString } },
            resolve(parent, args) {
                var url = ''
                if (args.categoryType === 'genus') {
                    url = "https://trefle.io/api/v1/genus/?token=udvvyZTueX-fvahlrHK-JQVuOuBqZISY7euTvx2eooc&order[id]=asc";
                }
                console.log(url)
                const body = get_data(url)
                return body
            }
        },
        categoryPlants: {
            type: PlantList,
            args: {
                categoryType: { type: GraphQLString },
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                var url = ''
                if (args.categoryType === 'genus') {
                    url = "https://trefle.io/api/v1/genus/" + args.id + "/plants/?token=udvvyZTueX-fvahlrHK-JQVuOuBqZISY7euTvx2eooc";
                }

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
