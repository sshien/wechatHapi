const Hapi = require('hapi');
require('env2')('./.env')
const Config = require('./config');
const routesHelloHapi = require('./routes/hello-hapi')
const pluginHapiSwagger = require('./plugins/hapi-swagger')

const server = new Hapi.Server()

server.connection({
    ...Config
})

const init = async () => {
    await server.register([
        ...pluginHapiSwagger
    ])
    server.route([
        ...routesHelloHapi
    ]);

    await server.start();
    console.log(`Server runing at: ${server.info.uri}`)
}

init()