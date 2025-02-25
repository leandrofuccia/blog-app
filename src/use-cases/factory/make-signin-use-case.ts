import { CredencialRepository } from "@/lib/typeorm/credencial.repository";
import { SigninUseCase } from "../signin";

export function makeSigninUseCase(){
    const credencialRepository = new CredencialRepository();

    const signinUseCase = new SigninUseCase(credencialRepository)

    return signinUseCase
}