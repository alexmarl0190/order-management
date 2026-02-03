import {
    createProject,
    getProjects,
    getActiveProjects,
    deactivateProject,
    activateProject,
} from './projects.service.js'

export async function createProjectController(req, reply) {
    await createProject(this, req.body)

    reply.code(201).send({ message: 'Project created' })
}

export async function getProjectsController(req, reply) {
    const projects = await getProjects(this)
    reply.send(projects)
}

export async function getActiveProjectsController(req, reply) {
    const projects = await getActiveProjects(this)
    reply.send(projects)
}

export async function deactivateProjectController(req, reply) {
    await deactivateProject(this, req.params.id)
    reply.send({ message: 'Project deactivated' })
}

export async function activateProjectController(req, reply) {
    await activateProject(this, req.params.id)
    reply.send({ message: 'Project activated' })
}
