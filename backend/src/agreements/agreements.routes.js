import {
    createAgreementController,
    getAgreementsController,
    deactivateAgreementController,
    activateAgreementController,
} from './agreements.controller.js'

export default async function agreementsRoutes(fastify) {

    fastify.addHook('onRequest', fastify.authenticate)

    fastify.post('/', createAgreementController)
    fastify.get('/', getAgreementsController)

    fastify.put('/:id/activate', activateAgreementController)
    fastify.delete('/:id', deactivateAgreementController)
}
