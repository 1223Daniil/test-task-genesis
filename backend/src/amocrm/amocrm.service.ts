import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AmocrmService {
  private accessToken: string;
  private baseDomain: string;

  constructor() {
    this.initializeToken();
  }

  async initializeToken(): Promise<void> {
    try {
      const { data } = await axios.get('https://app2.gnzs.ru/amocrm/test/oauth/get-token.php', {
        headers: {
          'X-Client-Id': '32185358',
        },
      });

      this.accessToken = data.access_token;
      this.baseDomain = data.base_domain;
    } catch (error) {
      throw new HttpException('Failed to initialize token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createEntity(entity: string): Promise<any> {
    const url = `https://${this.baseDomain}/api/v4/${entity}`;

    const payload = this.getPayload(entity);

    try {
      const { data } = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return {
        id: data._embedded[`${entity}`][0].id,
        entity,
      };
    } catch (error) {
      throw new HttpException(
        error.response?.data?.detail || 'Failed to create entity',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private getPayload(entity: string): any {
    switch (entity) {
      case 'leads':
        return [{ name: 'Test leads' }];
      case 'contacts':
        return [{ name: 'Test Contact' }];
      case 'companies':
        return [{ name: 'Test Company' }];
      default:
        throw new HttpException('Invalid entity type', HttpStatus.BAD_REQUEST);
    }
  }
}
