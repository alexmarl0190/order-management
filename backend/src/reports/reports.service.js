export async function getReports(fastify) {
    const [rows] = await fastify.mysql.query(
        'SELECT id, name, file_path, status FROM reports WHERE status = "active"'
    )
    return rows
}

export async function createReport(fastify, data) {
    await fastify.mysql.query(
        `INSERT INTO reports (name, file_path)
     VALUES (?, ?)`,
        [data.name, data.file_path]
    )
}

export async function getReportFile(fastify, id) {
    const [[report]] = await fastify.mysql.query(
        'SELECT file_path FROM reports WHERE id = ?',
        [id]
    )
    return report
}
