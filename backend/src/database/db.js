import mysql from '@fastify/mysql'

export async function registerDB(fastify) {
    await fastify.register(mysql, {
        promise: true,
        connectionString: 'mysql://root:123456@127.0.0.1/order_management'
    })

    // Test de conexión
    try {
        await fastify.mysql.query('SELECT 1')
        console.log('MySQL connected successfully')
    } catch (error) {
        console.error('MySQL connection failed', error)
        throw error
    }
}
