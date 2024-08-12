import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { UpdateLocationDto } from './dto/update-location.dto';
import {
  CountryDto,
  DistrictDto,
  ProviceDto,
  StreetDto,
  VillageDto,
  WardDto,
} from './dto/province.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('/country')
  createCountry(@Body() body: CountryDto) {
    return this.locationService.createCountry(body);
  }

  @Post('/province')
  createProvice(@Body() body: ProviceDto) {
    return this.locationService.createProvince(body);
  }
  @Post('/district')
  createDistrict(@Body() body: DistrictDto) {
    return this.locationService.createDistrict(body);
  }
  @Post('/ward')
  createWard(@Body() body: WardDto) {
    return this.locationService.createWard(body);
  }
  @Post('/village')
  createVillage(@Body() body: VillageDto) {
    return this.locationService.createVillage(body);
  }
  @Post('/street')
  createStreet(@Body() body: StreetDto) {
    return this.locationService.createStreet(body);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get('country/:id')
  findCountry(@Param('id') id: string) {
    return this.locationService.findCountry(+id);
  }
  @Get('province/:id')
  findProvince(@Param('id') id: string) {
    return this.locationService.findProvince(+id);
  }
  @Get('district/:id')
  findDistrict(@Param('id') id: string) {
    return this.locationService.findDistrict(+id);
  }
  @Get('ward/:id')
  findWard(@Param('id') id: string) {
    return this.locationService.findWard(+id);
  }
  @Get('village/:id')
  findVillage(@Param('id') id: string) {
    return this.locationService.findVillage(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLocationDto: UpdateLocationDto,
  // ) {
  //   return this.locationService.update(+id, updateLocationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.locationService.remove(+id);
  // }
}
