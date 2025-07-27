import { Usuario } from "@/entities/usuario.entity";
import { Credencial } from "@/entities/credencial.entity";
import { appDataSource } from "./typeorm";
import { hash } from "bcryptjs";

export async function seedUsuarioAdminDefault() {
  const usuarioRepository = appDataSource.getRepository(Usuario);
  const credencialRepository = appDataSource.getRepository(Credencial);

  const existingCredencial = await credencialRepository.findOne({
    where: { username: "admin@dominio.com" },
  });

  if (existingCredencial) return;

  const hashedPassword = await hash("123456", 8);

  const credencial = new Credencial("admin@dominio.com", hashedPassword);
  await credencialRepository.save(credencial);

  const usuario = new Usuario("Professor Admin", 2);
  usuario.credencialId = credencial.id!;
  await usuarioRepository.save(usuario);

  console.log("Usuário e credencial admin criados com senha criptografada.");
}