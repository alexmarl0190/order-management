import {
    createUserController,
    getUsersController,
    updateUserController,
    deactivateUserController,
    activateUserController
} from './users.controller.js'

export default async function usersRoutes(fastify) {

    fastify.addHook('onRequest', fastify.authenticate)

    fastify.post('/', createUserController)
    fastify.get('/', getUsersController)
    fastify.put('/:id', updateUserController)
    fastify.delete('/:id', deactivateUserController)
    fastify.put('/:id/activate', activateUserController)
}
