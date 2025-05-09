import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile-dto';
import { ProfilesService } from './providers/profiles.service';
import { PatchProfileDto } from './dtos/patch-profile-dto';

@Controller('profiles')
export class ProfilesController {
  constructor(
    // inject profiles service
    // private readonly profilesService: ProfilesService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Post()
  public async createProfile(@Body() createProfileDto: CreateProfileDto) {
    return await this.profilesService.createProfile(createProfileDto);
  }

  @Get()
  public async getAllProfiles() {
    return await this.profilesService.getAllProfiles();
  }

  @Patch('/:id')
  public async patchProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchProfileDto: PatchProfileDto,
  ) {
    return await this.profilesService.updateProfile(id, patchProfileDto);
  }
}
