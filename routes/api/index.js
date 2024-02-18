import imsa from "./imsa"



export default server => {

    imsa(server)

    server.route({
        method: ['GET', 'POST'],
        path: '/api/{path*}',
        handler: request => `${request.params.path} does not exist`
    }
    )
}