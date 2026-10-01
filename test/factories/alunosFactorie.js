import { faker } from '@faker-js/faker'

export function novoAluno() {

    const timestamp = Date.now()

    const fisrtName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const password = faker.internet.password()
   
    return {
        "nome": `${fisrtName} ${lastName}`,
        "email": `${fisrtName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}_${timestamp}@test.com`,
        "matricula": `${timestamp}`,
        "senha": password
    }
    
}