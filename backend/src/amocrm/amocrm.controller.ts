import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AmocrmService } from './amocrm.service';

@Controller('amocrm')
export class AmocrmController {
  constructor(private readonly amocrmService: AmocrmService) {}

  @Post('create')
  async createEntity(@Body() body: { entity: string }): Promise<any> {
    const { entity } = body;

    if (!['leads', 'contacts', 'companies'].includes(entity)) {
      throw new HttpException('Invalid entity type', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.amocrmService.createEntity(entity);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create entity',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

