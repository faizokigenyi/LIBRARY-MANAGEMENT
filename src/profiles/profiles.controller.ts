import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile-dto';
import { ProfilesService } from './providers/profiles.service';

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
}
