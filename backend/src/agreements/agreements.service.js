export async function createAgreement(fastify, data) {
    const { agreement_key, name, project_id } = data

    try {
        await fastify.mysql.query(
            `INSERT INTO global_agreements (agreement_key, name, project_id)
       VALUES (?, ?, ?)`,
            [agreement_key, name, project_id]
        )
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            const error = new Error('Agreement key already exists')
            error.statusCode = 409
            throw error
        }
        throw err
    }
}


export async function getAgreements(fastify) {
    const [rows] = await fastify.mysql.query(
        `SELECT
       ga.id,
       ga.agreement_key,
       ga.name,
       ga.status,
       p.name AS project_name
     FROM global_agreements ga
     JOIN projects p ON p.id = ga.project_id`
    )

    return rows
}

export async function deactivateAgreement(fastify, id) {
    await fastify.mysql.query(
        `UPDATE global_agreements SET status='inactive' WHERE id=?`,
        [id]
    )
}

export async function activateAgreement(fastify, id) {
    await fastify.mysql.query(
        `UPDATE global_agreements SET status='active' WHERE id=?`,
        [id]
    )
}
