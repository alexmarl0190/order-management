import bcrypt from 'bcrypt'

export async function createUser(fastify, data) {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    await fastify.mysql.query(
        `INSERT INTO users (first_name, last_name, email, password, role)
     VALUES (?, ?, ?, ?, ?)`,
        [
            data.first_name,
            data.last_name,
            data.email,
            hashedPassword,
            data.role
        ]
    )
}

export async function getUsers(fastify) {
    const [rows] = await fastify.mysql.query(
        'SELECT id, first_name, last_name, email, role, status FROM users'
    )
    return rows
}

export async function updateUser(fastify, id, data) {
    await fastify.mysql.query(
        `UPDATE users SET first_name=?, last_name=?, email=?, role=?, status=? WHERE id=?`,
        [data.first_name, data.last_name, data.email, data.role, data.status, id]
    )
}

export async function deactivateUser(fastify, id) {
    await fastify.mysql.query(
        `UPDATE users SET status='inactive' WHERE id=?`,
        [id]
    )
}

export async function activateUser(fastify, id) {
    await fastify.mysql.query(
        `UPDATE users SET status='active' WHERE id=?`,
        [id]
    )
}
