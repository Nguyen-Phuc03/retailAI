import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    const filePath = join(process.cwd(), 'uploads', file.originalname);
    return await this.aiService.uploadFile(filePath);
  }

  @Get('trends')
  async getTrends() {
    return await this.aiService.getTrends();
  }

  @Get('inventory')
  async getInventory() {
    return await this.aiService.getInventory();
  }
}
