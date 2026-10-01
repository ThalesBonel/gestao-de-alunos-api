import { api } from './api.js'

let tokenEmCacheAdmin
let tokenEmCacheAluno

export async function comTokenDeAdmin() {
    if(!tokenEmCacheAdmin) {
    const loginRespostaAdmin = await api()
    .post("/api/auth/login")
    .set("Content-Type", "application/json")
    .send({
        email: process.env.EMAIL_ADMIN,
        senha: process.env.SENHA_ADMIN,
    })

    tokenEmCacheAdmin = loginRespostaAdmin.body.token
    
    }

    return `Bearer ${tokenEmCacheAdmin}`
}

export async function comTokenDeAluno({email, senha}) {
    if(!tokenEmCacheAluno) {
    const loginRespostaAluno = await api()
    .post("/api/auth/login")
    .set("Content-Type", "application/json")
    .send({email, senha})

    tokenEmCacheAluno = loginRespostaAluno.body.token
    
    }
    
    return `Bearer ${tokenEmCacheAluno}`
}