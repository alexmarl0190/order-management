import bcrypt from 'bcrypt'

export async function login(fastify, email, password) {
    const [rows] = await fastify.mysql.query(
        'SELECT * FROM users WHERE email = ? AND status = "active"',
        [email]
    )

    const user = rows[0]
    if (!user) throw new Error('Invalid credentials')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Invalid credentials')

    const accessToken = fastify.jwt.sign(
        { id: user.id, role: user.role },
        { expiresIn: process.env.JWT_ACCESS_EXPIRES }
    )

    const refreshToken = fastify.jwt.sign(
        { id: user.id },
        { expiresIn: process.env.JWT_REFRESH_EXPIRES }
    )

    await fastify.mysql.query(
        `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
        [user.id, refreshToken]
    )

    return {
        userId: user.id,
        accessToken,
        refreshToken
    }
}

export async function logoutAll(fastify, userId) {
    await fastify.mysql.query(
        'DELETE FROM refresh_tokens WHERE user_id = ?',
        [userId]
    )
}

export async function getMe(fastify, userId) {
    const [rows] = await fastify.mysql.query(
        `SELECT id, first_name, last_name, email, role
     FROM users
     WHERE id = ?`,
        [userId]
    )

    return rows[0]
}
