import { forwardRef, Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './providers/profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService], // So other modules can use the service
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    forwardRef(() => UsersModule),
  ], // No self-import
})
export class ProfilesModule {}
