import {
    createUser,
    getUsers,
    updateUser,
    deactivateUser,
    activateUser
} from './users.service.js'

export async function createUserController(req, reply) {
    await createUser(this, req.body)
    reply.code(201).send({ message: 'User created' })
}

export async function getUsersController(req, reply) {
    const users = await getUsers(this)
    reply.send(users)
}

export async function updateUserController(req, reply) {
    await updateUser(this, req.params.id, req.body)
    reply.send({ message: 'User updated' })
}



export async function deactivateUserController(req, reply) {
    await deactivateUser(this, req.params.id)
    reply.send({ message: 'User deactivated' })
}


export async function activateUserController(req, reply) {
    await activateUser(this, req.params.id)
    reply.send({ message: 'User activated' })
}
