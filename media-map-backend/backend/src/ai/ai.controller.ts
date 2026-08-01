import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { AnalyzeRequestDto, ChatRequestDto } from './dto/ai-request.dto';

@ApiTags('ИИ Консультант (GPT-4o mini)')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @ApiOperation({ summary: 'Экспресс-анализ контента через ИИ (GPT-4o mini)' })
  @ApiResponse({ status: 200, description: 'Анализ успешно выполнен' })
  @Post('analyze')
  @HttpCode(HttpStatus.OK)
  async analyze(@Body() dto: AnalyzeRequestDto) {
    return this.aiService.analyzeContent(dto);
  }

  @ApiOperation({ summary: 'Диалог с ИИ-помощником (GPT-4o mini)' })
  @ApiResponse({ status: 200, description: 'Ответ ИИ получен' })
  @Post('chat')
  @HttpCode(HttpStatus.OK)
  async chat(@Body() dto: ChatRequestDto) {
    return this.aiService.chat(dto);
  }
}
