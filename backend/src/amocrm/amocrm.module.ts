import { Module } from '@nestjs/common';
import { AmocrmController } from './amocrm.controller';
import { AmocrmService } from './amocrm.service';

@Module({
  controllers: [AmocrmController],
  providers: [AmocrmService]
})
export class AmocrmModule {}
