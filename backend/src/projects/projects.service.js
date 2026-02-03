export async function createProject(fastify, data) {
    const { code, name, description } = data

    await fastify.mysql.query(
        `INSERT INTO projects (code, name, description)
     VALUES (?, ?, ?)`,
        [code, name, description]
    )
}

export async function getProjects(fastify) {
    const [rows] = await fastify.mysql.query(
        `SELECT id, code, name, description, status
     FROM projects`
    )
    return rows
}

export async function getActiveProjects(fastify) {
    const [rows] = await fastify.mysql.query(
        `SELECT id, code, name
     FROM projects
     WHERE status='active'`
    )
    return rows
}

export async function deactivateProject(fastify, id) {
    await fastify.mysql.query(
        `UPDATE projects SET status='inactive' WHERE id=?`,
        [id]
    )
}

export async function activateProject(fastify, id) {
    await fastify.mysql.query(
        `UPDATE projects SET status='active' WHERE id=?`,
        [id]
    )
}
