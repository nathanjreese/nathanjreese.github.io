
export default server => {

    server.route({
        method: 'GET',
        path: '/api/imsaData',
        config: {
            handler: async request => {
                return 'IMSA SUCCESS'
            }
        }
    }

    )
}