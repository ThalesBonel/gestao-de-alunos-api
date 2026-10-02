import { api } from './api.js'

let tokenEmCacheAdmin

const ADMIN_EMAIL = process.env.EMAIL_ADMIN || 'admin@escola.com'
const ADMIN_SENHA = process.env.SENHA_ADMIN || 'admin123'

export async function comTokenDeAdmin() {
    if (!tokenEmCacheAdmin) {
        const resposta = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: ADMIN_EMAIL,
                senha: ADMIN_SENHA,
            })

        if (!resposta.body.token) {
            throw new Error(`Falha no login do admin: ${resposta.status} ${resposta.text}`)
        }

        tokenEmCacheAdmin = resposta.body.token
    }

    return `Bearer ${tokenEmCacheAdmin}`
}

export async function comTokenDeAluno({ email, senha }) {
    const resposta = await api()
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({ email, senha })

    if (!resposta.body.token) {
        throw new Error(`Falha no login do aluno "${email}": ${resposta.status} ${resposta.text}`)
    }

    return `Bearer ${resposta.body.token}`
}
