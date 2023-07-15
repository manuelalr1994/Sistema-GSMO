import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 0 0 * * *', {
      name: 'daily',
      timeZone: 'America/Hermosillo'
    })
  dailySchedule() {
    this.logger.log('Called every 24 hours.');
  }
}