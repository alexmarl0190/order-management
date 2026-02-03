import {
    getReportsController,
    createReportController,
    downloadReportController
} from './reports.controller.js'

export default async function reportsRoutes(fastify) {

    fastify.addHook('onRequest', fastify.authenticate)

    fastify.get('/', getReportsController)
    fastify.post('/', createReportController)
    fastify.get('/:id/download', downloadReportController)
}
