export class InvalidCredentialsError extends Error{
    constructor(){
        super('Usuário ou senha inválido(s)!')
    } 
}
