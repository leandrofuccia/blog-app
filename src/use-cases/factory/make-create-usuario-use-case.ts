import { UsuarioRepository } from "@/repositories/pg/usuario.repository";

import { CreateUsuarioUseCase } from "../create-usuario";

export function makeCreateUsuarioUseCase() {
    const usuarioRepository = new UsuarioRepository();
    const createUsuarioUseCase = new CreateUsuarioUseCase(usuarioRepository);

    return createUsuarioUseCase;
}  