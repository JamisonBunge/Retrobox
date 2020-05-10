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
    weatherForecast(lat: Float!,long: Float!): [WeatherRecord],
    getWeatherCard(lat: Float!,long: Float!): WeatherCard
},
type WeatherRecord {
    response: String,
    temp: String,
    temp_min: String,
    temp_max: String
    main: String,
    description: String,
    time: String
},
type WeatherCard {
    response: String,
    date: String,
    location: String,
    main: String,
    background: String,
    icon: String,

    today_temp: String,
    today_high_low: String,
    forecast: [forecast]

},
type forecast {
    day: String,
    temp: String
}
`;

const resolvers = {
    Query: {
        test: () => { return "MuddBot 3.0" },
        weatherNow: async (parent, { lat, long }, { dataSources }) => dataSources.Weather.useCurrentWeatherAPI(lat, long),
        weatherForecast: async (parent, { lat, long }, { dataSources }) => dataSources.Weather.useForecastAPI(lat, long),
        getWeatherCard: async (parent, { lat, long }, { dataSources }) => dataSources.Weather.createCard(lat, long),

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
