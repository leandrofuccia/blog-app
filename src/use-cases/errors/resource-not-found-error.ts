export class ResourceNotFoundError extends Error{
    constructor(){
        super('Não encontrado!')
    }
}