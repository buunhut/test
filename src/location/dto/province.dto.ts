import { ApiProperty } from '@nestjs/swagger';

export class CountryDto {
  @ApiProperty({ type: 'string' })
  countryName: string;
}
export class ProviceDto {
  @ApiProperty({ type: 'string' })
  provinceName: string;
  @ApiProperty({ type: 'number' })
  countryId: number;
}
export class DistrictDto {
  @ApiProperty({ type: 'string' })
  districtName: string;
  @ApiProperty({ type: 'number' })
  provinceId: number;
}
export class WardDto {
  @ApiProperty({ type: 'string' })
  wardName: string;
  @ApiProperty({ type: 'number' })
  districtId: number;
}
export class VillageDto {
  @ApiProperty({ type: 'string' })
  villageName: string;
  @ApiProperty({ type: 'number' })
  wardId: number;
}
export class StreetDto {
  @ApiProperty({ type: 'string' })
  streetName: string;
  @ApiProperty({ type: 'number' })
  villageId: number;
}
