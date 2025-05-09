import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './providers/comments.service';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { PatchCommentDto } from './dtos/patch-comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  public async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get()
  public async getComments() {
    return this.commentsService.getAllComments();
  }

  @Patch('')
  public async updateComment(@Body() PatchCommentDto: PatchCommentDto) {
    return this.commentsService.patchComment(PatchCommentDto);
  }

  @Delete('/:id')
  public async deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.deleteComment(id);
  }
}
