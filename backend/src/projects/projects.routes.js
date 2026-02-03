import {
    createProjectController,
    getProjectsController,
    getActiveProjectsController,
    deactivateProjectController,
    activateProjectController,
} from './projects.controller.js'

export default async function projectsRoutes(fastify) {

    fastify.addHook('onRequest', fastify.authenticate)

    fastify.post('/', createProjectController)
    fastify.get('/', getProjectsController)

    // Para selects (Acuerdos Globales)
    fastify.get('/active', getActiveProjectsController)

    fastify.put('/:id/activate', activateProjectController)
    fastify.delete('/:id', deactivateProjectController)
}
