import {Controller, Get, Param} from '@nestjs/common';
import {GeoService} from './geo.service';

@Controller('geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) {
  }

  @Get('cords/:location')
  cords(@Param('location') location: string) {
    return this.geoService.cords(location)
  }
}
