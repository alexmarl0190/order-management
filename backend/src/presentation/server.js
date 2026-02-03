import Fastify from 'fastify'
import cors from '@fastify/cors'
import { registerDB } from '../database/db.js'
import jwt from '../plugins/jwt.js'
import authRoutes from '../auth/auth.routes.js'
import usersRoutes from '../users/users.routes.js'
import agreementsRoutes from '../agreements/agreements.routes.js'
import projectsRoutes from '../projects/projects.routes.js'
import reportsRoutes from '../reports/reports.routes.js'

const fastify = Fastify({ logger: false })


export class Server {

    async start() {
        const port = process.env.port

        fastify.get('/health/db', async () => {
            await fastify.mysql.query('SELECT 1')
            return { status: 'ok', database: 'connected' }
        })


        try {

            //cors
            fastify.register(cors, {
                origin: 'http://localhost:4200',
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            });

            //db
            await registerDB(fastify)

            //jwt
            await fastify.register(jwt)

            //routes
            fastify.register(authRoutes, { prefix: '/auth' })
            fastify.register(usersRoutes, { prefix: '/users' })
            fastify.register(agreementsRoutes, { prefix: '/agreements' })
            fastify.register(projectsRoutes, { prefix: '/projects' })
            fastify.register(reportsRoutes, { prefix: '/reports' })

            await fastify.listen({ port })
            console.log(`order management server runing in http://localhost:${port}`);

        } catch (error) {
            fastify.log.error(error);
        }


    }
}
