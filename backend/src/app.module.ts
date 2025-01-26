import { Module } from '@nestjs/common';
import { AmocrmModule } from './amocrm/amocrm.module';

@Module({
  imports: [AmocrmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
