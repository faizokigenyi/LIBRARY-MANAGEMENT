import { Body, Controller, Post } from '@nestjs/common';
import { GenresService } from './providers/genres.service';
import { CreateGenreDto } from './dtos/create-genre-dto';

@Controller('genres')
export class GenresController {
  constructor(
    // inject the service for genres
    private readonly genresService: GenresService,
  ) {}

  @Post()
  public async createGenre(@Body() createGenreDto: CreateGenreDto) {
    return await this.genresService.createGenre(createGenreDto);
  }
}
