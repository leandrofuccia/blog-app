import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPerfilTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO perfil (id, perfil) VALUES 
      (1, 'Aluno'), 
      (2, 'Professor');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM perfil WHERE id IN (1, 2);
    `);
  }
}
