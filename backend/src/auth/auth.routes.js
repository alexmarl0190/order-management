import { loginController } from './auth.controller.js'
import { refreshTokenController } from './auth.controller.js'
import { logoutController } from './auth.controller.js'
import { getMeController } from './auth.controller.js'

export default async function authRoutes(fastify) {
    fastify.post('/login', loginController)
    fastify.post('/refresh-token', refreshTokenController)
    fastify.post(
        '/logout',
        { onRequest: [fastify.authenticate] },
        logoutController
    )
    fastify.get(
        '/me',
        { onRequest: [fastify.authenticate] },
        getMeController
    )
}
