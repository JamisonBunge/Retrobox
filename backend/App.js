const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const Weather = require('./DataSources/Weather')
//const Places = require('./DataSources/Places')
const path = require('path')
const app = express();
const cors = require('cors');

app.use(cors());


const schema = gql`
type Query {
	test: String,
    weatherNow(lat: Float!,long: Float!): WeatherRecord,
    weatherForecast(lat: Float!,long: Float!): [WeatherRecord]
},
type WeatherRecord {
    response: String,
    temp: String,
    temp_min: String,
    temp_max: String
    main: String,
    description: String,
    time: String
}
`;

const resolvers = {
    Query: {
        test: () => { return "MuddBot 3.0" },
        weatherNow: async (parent, { lat, lng }, { dataSources }) => dataSources.Weather.useCurrentWeatherAPI(),
        weatherForecast: async (parent, { lat, lng }, { dataSources }) => dataSources.Weather.useForecastAPI(),
    },
    // ,
};





const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    dataSources: () => ({
        Weather: new Weather,
    })
});

// server.listen().then(({ url }) => {
// 	console.log(`Server ready at ${url}`);
// });

// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
// 	console.log(`🚀 Server ready at ${url}`);
// });


//
app.use(express.static('public'))

//redirect everything that isnt to /graphql to the index.thml of the react app build


// Add the Apollo Server’s middleware
server.applyMiddleware({ app })

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})
app.listen({ port: process.env.PORT || 5000 }, () => console.log(`Apollo Server is listening on ${server.graphqlPath}`))
