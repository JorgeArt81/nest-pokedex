import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces';

@Injectable()
export class SeedService {
  baseURL = 'https://pokeapi.co/api/v2/pokemon?limit=650';

  constructor(private readonly httpService: HttpService) {}
  async executedSeed() {
    const { data } = await this.httpService.axiosRef.get<PokeResponse>(
      this.baseURL,
    );
    return data.results;
  }
}
