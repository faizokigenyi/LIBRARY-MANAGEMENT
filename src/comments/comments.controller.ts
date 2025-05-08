import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './providers/comments.service';
import { CreateCommentDto } from './dtos/create-comment-dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  public async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }
}
