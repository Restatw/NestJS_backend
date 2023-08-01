import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resource/user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import * as path from "path"
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AdminModule } from './resource/admin/admin.module';
import { AgentModule } from './resource/agent/agent.module';
import { VendorModule } from './resource/vendor/vendor.module';
import { GameModule } from './resource/game/game.module';
import { LogModule } from './resource/log/log.module';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nJsonLoader ,I18nModule, QueryResolver } from 'nestjs-i18n';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { ApiModule } from './api/api/api.module';

const isProd = process.env.NODE_ENV == "production";
const DBOption : Array<TypeOrmModuleOptions> = [
  {
    type: 'sqlite',
    database: 'database.sql',
    autoLoadEntities: true,
    synchronize: true,
  },
  {
    type: "mysql",
    autoLoadEntities: true,
    host: "localhost",
    username: "root",
    password: "root",
    database: "default",
    synchronize: true,
  }
];

@Module({
  imports: [

    // ENV config 環境設定
    ConfigModule.forRoot({
      envFilePath: [ isProd ? path.resolve(".env.prod") : path.resolve(".env") ]
    }),

    // Jwt Module 身分認證
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.EXPIRES_IN ? parseInt( process.env.EXPIRES_IN ) : 60 },
    }),

    // TypeORM Datatabase 資料庫
    TypeOrmModule.forRoot(
      DBOption[0]
    ),

    // i18n translation 翻譯
    I18nModule.forRoot({
      fallbackLanguage:  process.env._LANG ?? 'en',

      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      typesOutputPath: path.join(__dirname, '../src/generated/i18n.generated.ts'),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),

    // resource moddule
    UserModule,
    AuthModule,
    AdminModule,
    AgentModule,
    VendorModule,
    GameModule,
    LogModule,
    ApiModule,    
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
