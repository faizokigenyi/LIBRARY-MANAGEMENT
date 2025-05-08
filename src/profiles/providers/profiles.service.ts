import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile.entity';
import { CreateProfileDto } from '../dtos/create-profile-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    // inject users service
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  public async createProfile(createProfileDto: CreateProfileDto) {
    const { userId, ...profileData } = createProfileDto;

    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'], // make sure we load profile if it exists
    });

    if (!user) {
      return { message: 'User not found' };
    } else if (!user.profile) {
      const newProfile = this.profilesRepository.create(profileData);
      newProfile.user = user; // link the user to the profile

      const savedProfile = await this.profilesRepository.save(newProfile);
      return savedProfile;
    } else {
      return { message: 'User already has a profile' };
    }
  }

  public async getAllProfiles() {
    const profiles = await this.profilesRepository.find({
      relations: ['user'],
    });
    return profiles;
  }
}
