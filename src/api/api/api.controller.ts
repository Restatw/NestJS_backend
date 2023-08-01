import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { Public } from 'src/auth/auth.guard';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}
  
  @Public()
  @Get("/c")
  a() {
    return "";
  }

}
