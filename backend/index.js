const express = require('express')
const { graphqlHTTP } = require('express-graphql')
require('./src/backend/db/mongoose')
const User = require('./src/backend/models/user')

const app = express()
const schema = require('./src/backend/schema/schema');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


const port = 4000

// this will parse incoming request as a JSON
app.use(express.json())

const userRoute = require('./src/backend/routers/user')
const plantRoute = require('./src/backend/routers/plant')
const cartRoute = require('./src/backend/routers/cart')
const orderRoute = require('./src/backend/routers/order')

app.use(userRoute)
app.use(plantRoute)
app.use(cartRoute)
app.use(orderRoute)

// ***********************************************************************************************
app.listen(port, () => {
    console.log('server started on port!!!' + port)
})