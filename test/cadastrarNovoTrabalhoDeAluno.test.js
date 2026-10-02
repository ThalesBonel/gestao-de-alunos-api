import { api } from './helpers/api.js'
import { expect } from 'chai'
import { comTokenDeAluno, comTokenDeAdmin } from './helpers/auth.js'
import testeRegistroTrabalho from './fixtures/registroTrabalho.json' with {type: 'json'}
import { novoAluno } from './factories/alunosFactorie.js'

describe('Registrar Novos trabalhos como Aluno', () => {

    let tokenAdmin
    let tokenAluno

    beforeEach(async () => {
        tokenAdmin = await comTokenDeAdmin()
    })

    testeRegistroTrabalho.forEach(testeRegistroTrabalho => {
        it(testeRegistroTrabalho.testTitle, async () => {
            
            //Arrange
            const dadosAluno = novoAluno()

            const cadastrarNovoAluno = await api()
            .post("/api/admin/alunos")
            .set("Content-Type", "application/json")
            .set('Authorization', tokenAdmin)
            .send(dadosAluno)

            tokenAluno = await comTokenDeAluno(dadosAluno)
            const idAluno = cadastrarNovoAluno.body.id
            
            const listaDeDisciplinas = await api()
            .get("/api/admin/disciplinas")
            .set('Authorization', tokenAdmin)

            const disciplinaDaFixture = listaDeDisciplinas.body
                .find(d => d.id === testeRegistroTrabalho.registroTrabalho.disciplinaId)

            expect(disciplinaDaFixture, 'disciplina da fixture não existe no banco').to.exist
            const disciplina = disciplinaDaFixture.id

            await api()
            .post(`/api/admin/disciplinas/${disciplina}/matriculas`)
            .set("Content-Type", "application/json")
            .set('Authorization', tokenAdmin)
            .send({
                alunoId: idAluno
            })
            
            // Act
            const registrarNovoTrabalho = await api()
            .post(`/api/alunos/${idAluno}/trabalhos`)
            .set("Content-Type", "application/json")
            .set('Authorization', tokenAluno)
            .send(testeRegistroTrabalho.registroTrabalho)

            // Assert
            expect(registrarNovoTrabalho.status).to.equal(testeRegistroTrabalho.statusCodeEsperado)
            expect(registrarNovoTrabalho.body.alunoId).to.equal(idAluno)
            expect(registrarNovoTrabalho.body.disciplinaId).to.equal(testeRegistroTrabalho.registroTrabalho.disciplinaId)
            expect(registrarNovoTrabalho.body.titulo).to.equal(testeRegistroTrabalho.registroTrabalho.titulo)
            expect(registrarNovoTrabalho.body.descricao).to.equal(testeRegistroTrabalho.registroTrabalho.descricao)
            expect(registrarNovoTrabalho.body.status).to.equal(testeRegistroTrabalho.registroTrabalho.status)
        })
    })
})