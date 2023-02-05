import { AppLogger } from '@common-kitchen/common';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostService } from '../services/post.service';

@Injectable()
export class PostJobService {
  constructor(private postService: PostService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    AppLogger.log(`${PostJobService.name} Task has just Started...`);

    await this.postService.publishPosts();

    AppLogger.log(`${PostJobService.name} All Post has been Published...`);
  }
}
