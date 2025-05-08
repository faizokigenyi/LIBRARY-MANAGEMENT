import { Injectable } from '@nestjs/common';
import { Genre } from '../genre.entity';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from '../dtos/create-genre-dto';

@Injectable()
export class GenresService {
  constructor(
    // inject the genres Repository
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  public async createGenre(createGenreDto: CreateGenreDto) {
    const newGenre = this.genresRepository.create(createGenreDto);
    return await this.genresRepository.save(newGenre);
  }

  public getMultipleGenres(genreIds: number[]) {
    console.log('genreIds', genreIds);
    const genres = this.genresRepository.find({
      where: {
        id: In(genreIds),
      },
    });
    return genres;
  }
}
