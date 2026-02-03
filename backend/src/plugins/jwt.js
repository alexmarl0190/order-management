import fp from 'fastify-plugin'
import jwt from '@fastify/jwt'

export default fp(async (fastify) => {
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET
    })

    fastify.decorate(
        'authenticate',
        async (request, reply) => {
            try {
                await request.jwtVerify()
            } catch (err) {
                reply.code(401).send({ message: 'Unauthorized' })
            }
        }
    )
})
