import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resource/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import * as path from "path"
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AdminModule } from './resource/admin/admin.module';
import { AgentModule } from './resource/agent/agent.module';
import { VendorModule } from './resource/vendor/vendor.module';
import { GameModule } from './resource/game/game.module';
import { LogModule } from './resource/log/log.module';
const isProd = process.env.NODE_ENV == "production";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ isProd ? path.resolve(".env.prod") : path.resolve(".env") ]
    }),
    // TypeOrmModule.forRoot({
    //   type: "mysql",
    //   autoLoadEntities: true,
    //   host: "localhost",
    //   username: "root",
    //   password: "root",
    //   database: "default",
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sql',
      autoLoadEntities: true,
      synchronize: true,
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
