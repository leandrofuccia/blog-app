import { appDataSource } from "./typeorm";
import { Perfil } from "@/entities/perfil.entity";

export async function seedPerfilTableOrm() {
  const perfilRepository = appDataSource.getRepository(Perfil);

  const existingEntries = await perfilRepository.find();
  if (existingEntries.length > 0) {
    return;
  }

  const perfis = [
    { id: 1, perfil: "Aluno" },
    { id: 2, perfil: "Professor" },
  ];
  await perfilRepository.save(perfis);
  console.log("Dados inseridos na tabela 'perfil'.");
}
