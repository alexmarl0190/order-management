import { login } from './auth.service.js'
import { logoutAll } from './auth.service.js'
import { getMe } from './auth.service.js'

export async function loginController(req, reply) {
    const { email, password } = req.body

    try {
        const result = await login(this, email, password)

        reply.send(result)

    } catch (error) {
        reply.code(401).send({ message: 'Invalid credentials' })
    }
}

export async function refreshTokenController(req, reply) {
    const { refreshToken } = req.body

    try {
        const payload = await this.jwt.verify(refreshToken)

        const [rows] = await this.mysql.query(
            'SELECT * FROM refresh_tokens WHERE token = ?',
            [refreshToken]
        )

        if (!rows.length) {
            return reply.code(401).send({ message: 'Invalid refresh token' })
        }

        const newAccessToken = this.jwt.sign(
            { id: payload.id },
            { expiresIn: process.env.JWT_ACCESS_EXPIRES }
        )

        reply.send({ accessToken: newAccessToken })
    } catch (err) {
        reply.code(401).send({ message: 'Invalid refresh token' })
    }
}

export async function logoutController(req, reply) {

    const userId = req.user.id

    await logoutAll(this, userId)

    reply.send({ message: 'Logged out from all devices' })
}

export async function getMeController(req, reply) {
    const userId = req.user.id

    const user = await getMe(this, userId)

    reply.send(user)
}