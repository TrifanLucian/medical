import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1722202881267 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE biology_questions (
              id int NOT NULL AUTO_INCREMENT,
              question_text text NOT NULL,
              answer_a varchar(255) NOT NULL,
              answer_b varchar(255) NOT NULL,
              answer_c varchar(255) NOT NULL,
              answer_d varchar(255) NOT NULL,
              answer_e varchar(255) NOT NULL,
              correct_answer char(1) NOT NULL,
              PRIMARY KEY (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        await queryRunner.query(`
            CREATE TABLE users (
              id int NOT NULL AUTO_INCREMENT,
              username varchar(255) NOT NULL,
              password varchar(255) NOT NULL,
              role varchar(50) NOT NULL,
              PRIMARY KEY (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        await queryRunner.query(`
            CREATE TABLE chemistry_questions (
              id int NOT NULL AUTO_INCREMENT,
              question_text text NOT NULL,
              answer_a varchar(255) NOT NULL,
              answer_b varchar(255) NOT NULL,
              answer_c varchar(255) NOT NULL,
              answer_d varchar(255) NOT NULL,
              answer_e varchar(255) NOT NULL,
              correct_answer char(1) NOT NULL,
              PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE biology_questions");
        await queryRunner.query("DROP TABLE users");
        await queryRunner.query("DROP TABLE chemistry_questions");
    }

}
