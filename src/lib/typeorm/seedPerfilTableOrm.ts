import { appDataSource } from "./typeorm";
import { Perfil } from "@/entities/perfil.entity";

export async function seedPerfilTableOrm() {
  const perfilRepository = appDataSource.getRepository(Perfil);

  // Verifica se os dados já estão presentes
  const existingEntries = await perfilRepository.find();
  if (existingEntries.length > 0) {
    console.log("Dados já existem na tabela 'perfil'.");
    return;
  }

  // Insere os dados na tabela
  const perfis = [
    { id: 1, perfil: "Aluno" },
    { id: 2, perfil: "Professor" },
  ];
  await perfilRepository.save(perfis);
  console.log("Dados inseridos na tabela 'perfil'.");
}
