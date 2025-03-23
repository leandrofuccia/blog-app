export class InvalidUsuarioError extends Error{
    constructor(){
        super('Usuário não cadastrado!')
    } 
}
