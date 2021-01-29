import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1611264464379 implements MigrationInterface {
    name = 'Initial1611264464379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device_problem_star" ("userId" uuid NOT NULL, "problemId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_61b32865c32b56648c5e2682159" PRIMARY KEY ("userId", "problemId"))`);
        await queryRunner.query(`CREATE TABLE "problem_image" ("path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "problemId" uuid NOT NULL, CONSTRAINT "PK_5f3dfc281e42fde197dba681a2a" PRIMARY KEY ("path"))`);
        await queryRunner.query(`CREATE TABLE "review_image" ("path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "reviewId" uuid NOT NULL, CONSTRAINT "PK_fbdabc3a94563e63ca7df57a515" PRIMARY KEY ("path"))`);
        await queryRunner.query(`CREATE TABLE "review_rating" ("reviewId" uuid NOT NULL, "deviceId" uuid NOT NULL, "overall" numeric, "display" numeric, "battery" numeric, "software" numeric, "camera" numeric, "processor" numeric, "gpu" numeric, "memory" numeric, "thermals" numeric, "ports" numeric, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_81080dc1f5342d8650c1ee7176" UNIQUE ("reviewId"), CONSTRAINT "PK_81080dc1f5342d8650c1ee7176c" PRIMARY KEY ("reviewId"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid NOT NULL, "deviceId" uuid NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid NOT NULL, "problemId" uuid, "reviewId" uuid, "solutionId" uuid, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solution_image" ("path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "solutionId" uuid NOT NULL, CONSTRAINT "PK_03d7c3d5f4d4a068c39cb24c3f7" PRIMARY KEY ("path"))`);
        await queryRunner.query(`CREATE TABLE "solution_star" ("userId" uuid NOT NULL, "solutionId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_916c9d5528419301be6a66d57d4" PRIMARY KEY ("userId", "solutionId"))`);
        await queryRunner.query(`CREATE TABLE "solution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "isPicked" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid NOT NULL, "problemId" uuid NOT NULL, CONSTRAINT "PK_73fc40b114205776818a2f2f248" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device_problem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "solvedBy" uuid, "pickedSolutionId" uuid, "authorId" uuid NOT NULL, "deviceId" uuid NOT NULL, CONSTRAINT "REL_49435f71d45097a84bbe871777" UNIQUE ("pickedSolutionId"), CONSTRAINT "PK_63a231d36d13cbae4af83ba12b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "link" character varying NOT NULL, "category" character varying NOT NULL, "seen" boolean NOT NULL DEFAULT 'false', "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_setting" ("userId" uuid NOT NULL, "isPrivate" boolean NOT NULL DEFAULT 'false', "notifications" boolean NOT NULL DEFAULT 'true', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_4b46d4a3adec99377740b0bafa" UNIQUE ("userId"), CONSTRAINT "PK_4b46d4a3adec99377740b0bafa0" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "oauthId" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying, "avatar" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b07c65387b10640a67199cc5490" UNIQUE ("oauthId"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device_follower" ("userId" uuid NOT NULL, "deviceId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_07081b449bd44b371b7462b6797" PRIMARY KEY ("userId", "deviceId"))`);
        await queryRunner.query(`CREATE TABLE "device_spec" ("deviceId" uuid NOT NULL, "display" character varying, "displaySimplify" character varying, "battery" character varying, "batterySimplify" character varying, "software" character varying, "softwareSimplify" character varying, "camera" character varying, "cameraSimplify" character varying, "processor" character varying, "processorSimplify" character varying, "gpu" character varying, "gpuSimplify" character varying, "memory" character varying, "memorySimplify" character varying, "thermals" character varying, "thermalsSimplify" character varying, "ports" character varying, "portsSimplify" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_c4b3ed746f36be39dfe1416b7e" UNIQUE ("deviceId"), CONSTRAINT "PK_c4b3ed746f36be39dfe1416b7e8" PRIMARY KEY ("deviceId"))`);
        await queryRunner.query(`CREATE TABLE "device" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "brand" character varying NOT NULL, "category" character varying NOT NULL, "subCategory" character varying, "buyLink" character varying, "price" character varying, "coverImage" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0a2d97cfb348b82d881e7a4d7a4" UNIQUE ("buyLink"), CONSTRAINT "UQ_c3e9688a8396aa73ce23dd6013e" UNIQUE ("price"), CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "device_problem_star" ADD CONSTRAINT "FK_8f8aeb9df1668447ad2c036b5f0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "device_problem_star" ADD CONSTRAINT "FK_1a7e54b12d0029465913fce1ae3" FOREIGN KEY ("problemId") REFERENCES "device_problem"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "problem_image" ADD CONSTRAINT "FK_7427cef3cd8019dbf387d265f17" FOREIGN KEY ("problemId") REFERENCES "device_problem"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review_image" ADD CONSTRAINT "FK_f0a1a48c40bcb0585f111015e5a" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review_rating" ADD CONSTRAINT "FK_81080dc1f5342d8650c1ee7176c" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review_rating" ADD CONSTRAINT "FK_2cab2a4174ed46a1d7f91de6f16" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1e758e3895b930ccf269f30c415" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_b17f9a0328c7296b7579e590afa" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_0a02cd5ccfc6544a17005a604fd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_1c6275c5dc590b541d8c76c4c4a" FOREIGN KEY ("problemId") REFERENCES "device_problem"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_0451d0acae4929a22738b09cda7" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_602eb146ed0fb11902a8e27f535" FOREIGN KEY ("solutionId") REFERENCES "solution"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solution_image" ADD CONSTRAINT "FK_a25c9a461a11b1d8de6ab799928" FOREIGN KEY ("solutionId") REFERENCES "solution"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solution_star" ADD CONSTRAINT "FK_3e661f8bf5e184f2eff85357f5a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solution_star" ADD CONSTRAINT "FK_0c007f92871f968260bf4bc69ea" FOREIGN KEY ("solutionId") REFERENCES "solution"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "FK_46d2e9ff5853278f929211dc5be" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "FK_1600724ccc854e519aa3a46958b" FOREIGN KEY ("problemId") REFERENCES "device_problem"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "device_problem" ADD CONSTRAINT "FK_94df0fd89a8f76621bab1366904" FOREIGN KEY ("solvedBy") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "device_problem" ADD CONSTRAINT "FK_49435f71d45097a84bbe871777d" FOREIGN KEY ("pickedSolutionId") REFERENCES "solution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "device_problem" ADD CONSTRAINT "FK_51ed546f81d2f061b080a2c703f" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "device_problem" ADD CONSTRAINT "FK_6713a96a7d69c0e1c512a9838dc" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_setting" ADD CONSTRAINT "FK_4b46d4a3adec99377740b0bafa0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "device_follower" ADD CONSTRAINT "FK_5ae0444871e2c4d2f20232fe0f2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "device_follower" ADD CONSTRAINT "FK_e5b86a371edc16d183042007f47" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "device_spec" ADD CONSTRAINT "FK_c4b3ed746f36be39dfe1416b7e8" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_spec" DROP CONSTRAINT "FK_c4b3ed746f36be39dfe1416b7e8"`);
        await queryRunner.query(`ALTER TABLE "device_follower" DROP CONSTRAINT "FK_e5b86a371edc16d183042007f47"`);
        await queryRunner.query(`ALTER TABLE "device_follower" DROP CONSTRAINT "FK_5ae0444871e2c4d2f20232fe0f2"`);
        await queryRunner.query(`ALTER TABLE "user_setting" DROP CONSTRAINT "FK_4b46d4a3adec99377740b0bafa0"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "device_problem" DROP CONSTRAINT "FK_6713a96a7d69c0e1c512a9838dc"`);
        await queryRunner.query(`ALTER TABLE "device_problem" DROP CONSTRAINT "FK_51ed546f81d2f061b080a2c703f"`);
        await queryRunner.query(`ALTER TABLE "device_problem" DROP CONSTRAINT "FK_49435f71d45097a84bbe871777d"`);
        await queryRunner.query(`ALTER TABLE "device_problem" DROP CONSTRAINT "FK_94df0fd89a8f76621bab1366904"`);
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "FK_1600724ccc854e519aa3a46958b"`);
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "FK_46d2e9ff5853278f929211dc5be"`);
        await queryRunner.query(`ALTER TABLE "solution_star" DROP CONSTRAINT "FK_0c007f92871f968260bf4bc69ea"`);
        await queryRunner.query(`ALTER TABLE "solution_star" DROP CONSTRAINT "FK_3e661f8bf5e184f2eff85357f5a"`);
        await queryRunner.query(`ALTER TABLE "solution_image" DROP CONSTRAINT "FK_a25c9a461a11b1d8de6ab799928"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_602eb146ed0fb11902a8e27f535"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_0451d0acae4929a22738b09cda7"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_1c6275c5dc590b541d8c76c4c4a"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_0a02cd5ccfc6544a17005a604fd"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_b17f9a0328c7296b7579e590afa"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1e758e3895b930ccf269f30c415"`);
        await queryRunner.query(`ALTER TABLE "review_rating" DROP CONSTRAINT "FK_2cab2a4174ed46a1d7f91de6f16"`);
        await queryRunner.query(`ALTER TABLE "review_rating" DROP CONSTRAINT "FK_81080dc1f5342d8650c1ee7176c"`);
        await queryRunner.query(`ALTER TABLE "review_image" DROP CONSTRAINT "FK_f0a1a48c40bcb0585f111015e5a"`);
        await queryRunner.query(`ALTER TABLE "problem_image" DROP CONSTRAINT "FK_7427cef3cd8019dbf387d265f17"`);
        await queryRunner.query(`ALTER TABLE "device_problem_star" DROP CONSTRAINT "FK_1a7e54b12d0029465913fce1ae3"`);
        await queryRunner.query(`ALTER TABLE "device_problem_star" DROP CONSTRAINT "FK_8f8aeb9df1668447ad2c036b5f0"`);
        await queryRunner.query(`DROP TABLE "device"`);
        await queryRunner.query(`DROP TABLE "device_spec"`);
        await queryRunner.query(`DROP TABLE "device_follower"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_setting"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "device_problem"`);
        await queryRunner.query(`DROP TABLE "solution"`);
        await queryRunner.query(`DROP TABLE "solution_star"`);
        await queryRunner.query(`DROP TABLE "solution_image"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "review_rating"`);
        await queryRunner.query(`DROP TABLE "review_image"`);
        await queryRunner.query(`DROP TABLE "problem_image"`);
        await queryRunner.query(`DROP TABLE "device_problem_star"`);
    }

}
