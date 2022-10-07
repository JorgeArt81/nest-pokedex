import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces';

@Injectable()
export class SeedService {
  baseURL = 'https://pokeapi.co/api/v2/pokemon?limit=650';

  constructor(
    private readonly httpService: AxiosAdapter,
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async executedSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const data = await this.httpService.get<PokeResponse>(this.baseURL);

    const pokemoToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      pokemoToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemoToInsert);

    return 'Seed executed';
  }
}
