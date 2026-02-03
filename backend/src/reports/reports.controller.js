import {
    getReports,
    createReport,
    getReportFile
} from './reports.service.js'
import fs from 'fs'

export async function getReportsController(req, reply) {
    const reports = await getReports(this)
    reply.send(reports)
}

export async function createReportController(req, reply) {
    await createReport(this, req.body)
    reply.code(201).send({ message: 'Report created' })
}

export async function downloadReportController(req, reply) {
    const report = await getReportFile(this, req.params.id)

    reply.header('Content-Type', 'application/pdf')
    reply.header('Content-Disposition', 'attachment; filename=report.pdf')

    return reply.send(fs.createReadStream(report.file_path))
}
