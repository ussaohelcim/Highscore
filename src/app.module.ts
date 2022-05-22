import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { GamesController } from './games.controller';

@Module({
  imports: [],
  controllers: [GamesController],
  // providers: [AppService],
})
export class AppModule {}
