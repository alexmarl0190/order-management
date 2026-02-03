import {
    createAgreement,
    getAgreements,
    deactivateAgreement,
    activateAgreement,
} from './agreements.service.js'

export async function createAgreementController(req, reply) {
    try {
        await createAgreement(this, req.body)
        reply.code(201).send({ message: 'Global agreement created' })

    } catch (err) {
        if (err.statusCode === 409) {
            reply.code(409).send({
                message: 'Ya existe un acuerdo global con ese ID',
            })
            return
        }

        throw err
    }
}


export async function getAgreementsController(req, reply) {
    const agreements = await getAgreements(this)
    reply.send(agreements)
}

export async function deactivateAgreementController(req, reply) {
    await deactivateAgreement(this, req.params.id)
    reply.send({ message: 'Global agreement deactivated' })
}

export async function activateAgreementController(req, reply) {
    await activateAgreement(this, req.params.id)
    reply.send({ message: 'Global agreement activated' })
}
