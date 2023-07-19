import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resource/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import * as path from "path"
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AdminModule } from './resource/admin/admin.module';
import { AgentModule } from './resource/agent/agent.module';
import { VendorModule } from './resource/vendor/vendor.module';
import { GameModule } from './resource/game/game.module';
import { LogModule } from './resource/log/log.module';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nJsonLoader ,I18nModule, QueryResolver } from 'nestjs-i18n';

const isProd = process.env.NODE_ENV == "production";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ isProd ? path.resolve(".env.prod") : path.resolve(".env") ]
    }),
    TypeOrmModule.forRoot({

      // MYSQL
      //   type: "mysql",
      //   autoLoadEntities: true,
      //   host: "localhost",
      //   username: "root",
      //   password: "root",
      //   database: "default",
      //   synchronize: true,

      // SQLITE
      type: 'sqlite',
      database: 'database.sql',
      autoLoadEntities: true,
      synchronize: true,

    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
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
    UserModule,
    AuthModule,
    AdminModule,
    AgentModule,
    VendorModule,
    GameModule,
    LogModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
