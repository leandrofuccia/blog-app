import {CredencialRepository } from "@/lib/typeorm/credencial.repository";
import { SigninUseCase } from "@/use-cases/signin";
import { ICredencial } from "@/entities/models/credencial.interface";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { ZodNull } from "zod";

jest.mock("@/lib/typeorm/credencial.repository");

describe("SigninUseCase", () => {
    let credencialRepositoryMock: jest.Mocked<CredencialRepository>;
    let signinUseCase: SigninUseCase;

    beforeEach(() => {
        credencialRepositoryMock = {
            findByUsername: jest.fn()
        } as unknown as jest.Mocked<CredencialRepository>;
        signinUseCase = new SigninUseCase(credencialRepositoryMock);
    });

    it("deve buscar a credencial pelo nome", async () => {
        const credenciais = [
            { id: 1, username: "teste@gmail.com", password: "1234" },
            { id: 2, username: "fulano@hotmail.com.br", password: "1234" }
        ];
        
        credencialRepositoryMock.findByUsername.mockImplementation((username: string) => {
            const credencial = credenciais.find(c => c.username === username);
            return Promise.resolve(credencial as ICredencial);
        });

        const result = await signinUseCase.handler("teste@gmail.com");

        expect(result?.username).toBe("teste@gmail.com");
    });


    it("deve lançar InvalidCredentialsError se as credenciais não forem encontradas", async () => {
            const username = ZodNull;             
           
            credencialRepositoryMock.findByUsername.mockImplementation = jest.fn().mockImplementation(() => {
                return Promise.resolve(username);
            });
    
            await expect(signinUseCase.handler("inexistente@gmail.com")).rejects.toThrow(InvalidCredentialsError);
        });
});
