import { Injectable } from '@nestjs/common';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaClient } from '@prisma/client';
import {
  CountryDto,
  DistrictDto,
  ProviceDto,
  StreetDto,
  VillageDto,
  WardDto,
} from './dto/province.dto';
import { AppGateway } from 'src/app.gateway';
import { AppService } from 'src/app.service';

const prisma = new PrismaClient();

@Injectable()
export class LocationService {
  constructor(private readonly service: AppService) {}

  async createCountry(body: CountryDto) {
    try {
      const { countryName } = body;
      const check = await prisma.country.findFirst({
        where: {
          countryName,
          isDelete: false,
        },
      });
      if (!check) {
        const createCountry = await prisma.country.create({
          data: body,
        });
        if (createCountry) {
          this.service.emitToClients('reload', []);
          return this.service.response(200, 'done', createCountry.countryName);
        }
      } else {
        return this.service.response(409, 'existed', countryName);
      }
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'lỗi BE', error);
    }
  }
  async createProvince(body: ProviceDto) {
    try {
      const { provinceName, countryId } = body;
      const check = await prisma.province.findFirst({
        where: {
          provinceName: provinceName.trim(),
          countryId,
          isDelete: false,
        },
      });
      if (!check) {
        const createProvice = await prisma.province.create({
          data: body,
        });
        if (createProvice) {
          this.service.emitToClients('reload', []);
          return this.service.response(200, 'done', createProvice.provinceName);
        }
      } else {
        return this.service.response(409, 'existed', provinceName);
      }
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'lỗi BE', error);
    }
  }
  async createDistrict(body: DistrictDto) {
    try {
      const { districtName, provinceId } = body;
      const check = await prisma.district.findFirst({
        where: {
          districtName: districtName.trim(),
          provinceId,
          isDelete: false,
        },
      });
      if (!check) {
        const createDistrict = await prisma.district.create({
          data: body,
        });
        if (createDistrict) {
          this.service.emitToClients('reload', []);
          return this.service.response(
            200,
            'done',
            createDistrict.districtName,
          );
        }
      } else {
        return this.service.response(409, 'existed', districtName);
      }
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'lỗi BE', error);
    }
  }
  async createWard(body: WardDto) {
    try {
      const { wardName, districtId } = body;
      const check = await prisma.ward.findFirst({
        where: {
          wardName,
          districtId,
          isDelete: false,
        },
      });
      if (!check) {
        const createWard = await prisma.ward.create({
          data: body,
        });
        if (createWard) {
          this.service.emitToClients('reload', []);
          return this.service.response(200, 'done', createWard.wardName);
        }
      } else {
        return this.service.response(409, 'existed', wardName);
      }
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'lỗi BE', error);
    }
  }
  async createVillage(body: VillageDto) {
    try {
      const { villageName, wardId } = body;
      const check = await prisma.village.findFirst({
        where: {
          villageName,
          wardId,
          isDelete: false,
        },
      });
      if (!check) {
        const createVillage = await prisma.village.create({
          data: body,
        });
        if (createVillage) {
          this.service.emitToClients('reload', []);
          return this.service.response(200, 'done', createVillage.villageName);
        }
      } else {
        return this.service.response(409, 'existed', villageName);
      }
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'lỗi BE', error);
    }
  }
  async createStreet(body: StreetDto) {
    try {
      const { streetName, villageId } = body;
      const check = await prisma.street.findFirst({
        where: {
          streetName,
          villageId,
          isDelete: false,
        },
      });
      if (!check) {
        const createStreet = await prisma.street.create({
          data: body,
        });
        if (createStreet) {
          this.service.emitToClients('reload', []);
          return this.service.response(200, 'done', createStreet.streetName);
        }
      } else {
        return this.service.response(409, 'existed', streetName);
      }
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'lỗi BE', error);
    }
  }

  async findAll() {
    try {
      const location = await prisma.country.findMany({
        where: {
          isDelete: false,
        },
        orderBy: {
          countryName: 'asc',
        },
        select: {
          countryId: true,
          countryName: true,
          province: {
            where: {
              isDelete: false,
            },
            orderBy: {
              provinceName: 'asc',
            },
            select: {
              provinceId: true,
              provinceName: true,
              district: {
                where: {
                  isDelete: false,
                },
                orderBy: {
                  districtName: 'asc',
                },
                select: {
                  districtId: true,
                  districtName: true,
                  ward: {
                    where: {
                      isDelete: false,
                    },
                    orderBy: {
                      wardName: 'asc',
                    },
                    select: {
                      wardId: true,
                      wardName: true,
                      village: {
                        where: {
                          isDelete: false,
                        },
                        orderBy: {
                          villageName: 'asc',
                        },
                        select: {
                          villageId: true,
                          villageName: true,
                          street: {
                            where: {
                              isDelete: false,
                            },
                            orderBy: {
                              streetName: 'asc',
                            },
                            select: {
                              streetId: true,
                              streetName: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      return this.service.response(200, 'country', location);
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'lỗi BE', error);
    }
  }

  async findCountry(id: number) {
    try {
      const location = await prisma.country.findFirst({
        where: {
          isDelete: false,
          countryId: id,
        },
        select: {
          countryId: true,
          countryName: true,
          province: {
            where: {
              isDelete: false,
            },
            orderBy: {
              provinceName: 'asc',
            },
            select: {
              provinceId: true,
              provinceName: true,
              district: {
                where: {
                  isDelete: false,
                },
                orderBy: {
                  districtName: 'asc',
                },
                select: {
                  districtId: true,
                  districtName: true,
                  ward: {
                    where: {
                      isDelete: false,
                    },
                    orderBy: {
                      wardName: 'asc',
                    },
                    select: {
                      wardId: true,
                      wardName: true,
                      village: {
                        where: {
                          isDelete: false,
                        },
                        orderBy: {
                          villageName: 'asc',
                        },
                        select: {
                          villageId: true,
                          villageName: true,
                          street: {
                            where: {
                              isDelete: false,
                            },
                            orderBy: {
                              streetName: 'asc',
                            },
                            select: {
                              streetId: true,
                              streetName: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      return this.service.response(200, 'country', location);
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'lỗi BE', error);
    }
  }
  async findProvince(id: number) {
    try {
      const location = await prisma.province.findFirst({
        where: {
          isDelete: false,
          provinceId: id,
        },
        select: {
          provinceId: true,
          provinceName: true,
          country: {
            // Include the related country data
            select: {
              countryId: true,
              countryName: true,
            },
          },
          district: {
            where: {
              isDelete: false,
            },
            orderBy: {
              districtName: 'asc',
            },
            select: {
              districtId: true,
              districtName: true,

              ward: {
                where: {
                  isDelete: false,
                },
                orderBy: {
                  wardName: 'asc',
                },
                select: {
                  wardId: true,
                  wardName: true,
                  village: {
                    where: {
                      isDelete: false,
                    },
                    orderBy: {
                      villageName: 'asc',
                    },
                    select: {
                      villageId: true,
                      villageName: true,
                      street: {
                        where: {
                          isDelete: false,
                        },
                        orderBy: {
                          streetName: 'asc',
                        },
                        select: {
                          streetId: true,
                          streetName: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (location) {
        const { country, provinceId, provinceName, district } = location;
        const { countryId, countryName } = country;
        const res = {
          district,
          provinceId,
          provinceName,
          countryId,
          countryName,
        };
        return this.service.response(200, 'provice', res);
      }
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'lỗi BE', error);
    }
  }
  async findDistrict(id: number) {
    try {
      const location = await prisma.district.findFirst({
        where: {
          isDelete: false,
          districtId: id, // Ensure you're filtering by the correct ID
        },
        select: {
          districtId: true,
          districtName: true,
          province: {
            select: {
              provinceId: true,
              provinceName: true,
              country: {
                select: {
                  countryId: true,
                  countryName: true,
                },
              },
            },
          },

          ward: {
            where: {
              isDelete: false,
            },
            orderBy: {
              wardName: 'asc',
            },
            select: {
              wardId: true,
              wardName: true,
              village: {
                where: {
                  isDelete: false,
                },
                orderBy: {
                  villageName: 'asc',
                },
                select: {
                  villageId: true,
                  villageName: true,
                  street: {
                    where: {
                      isDelete: false,
                    },
                    orderBy: {
                      streetName: 'asc',
                    },
                    select: {
                      streetId: true,
                      streetName: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (location) {
        const { districtId, districtName, province, ward } = location;
        const { provinceId, provinceName, country } = province;
        const { countryId, countryName } = country;
        const res = {
          ward,
          districtId,
          districtName,
          provinceId,
          provinceName,
          countryId,
          countryName,
        };
        return this.service.response(200, 'district', res);
      }
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'Error fetching district', error);
    }
  }
  async findWard(id: number) {
    try {
      const location = await prisma.ward.findFirst({
        where: {
          isDelete: false,
          wardId: id, // Ensure you're filtering by the correct ID
        },
        select: {
          wardId: true,
          wardName: true,
          district: {
            select: {
              districtId: true,
              districtName: true,
              province: {
                select: {
                  provinceId: true,
                  provinceName: true,
                  country: {
                    select: {
                      countryId: true,
                      countryName: true,
                    },
                  },
                },
              },
            },
          },

          village: {
            where: {
              isDelete: false,
            },
            orderBy: {
              villageName: 'asc',
            },
            select: {
              villageId: true,
              villageName: true,
              street: {
                where: {
                  isDelete: false,
                },
                orderBy: {
                  streetName: 'asc',
                },
                select: {
                  streetId: true,
                  streetName: true,
                },
              },
            },
          },
        },
      });

      if (location) {
        const { district, wardId, wardName, village } = location;
        const { districtId, districtName, province } = district;
        const { provinceId, provinceName, country } = province;
        const { countryId, countryName } = country;
        const res = {
          village,
          wardId,
          wardName,
          districtId,
          districtName,
          provinceId,
          provinceName,
          countryId,
          countryName,
        };
        return this.service.response(200, 'ward', res);
      }
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'Error fetching district', error);
    }
  }
  async findVillage(id: number) {
    try {
      const location = await prisma.village.findFirst({
        where: {
          isDelete: false,
          villageId: id, // Ensure you're filtering by the correct ID
        },
        select: {
          villageId: true,
          villageName: true,

          ward: {
            select: {
              wardId: true,
              wardName: true,
              district: {
                select: {
                  districtId: true,
                  districtName: true,
                  province: {
                    select: {
                      provinceId: true,
                      provinceName: true,
                      country: {
                        select: {
                          countryId: true,
                          countryName: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },

          street: {
            where: {
              isDelete: false,
            },
            orderBy: {
              streetName: 'asc',
            },
            select: {
              streetId: true,
              streetName: true,
            },
          },
        },
      });

      if (location) {
        const { villageId, villageName, ward, street } = location;
        const { wardId, wardName, district } = ward;
        const { districtId, districtName, province } = district;
        const { provinceId, provinceName, country } = province;
        const { countryId, countryName } = country;
        const res = {
          street,
          villageId,
          villageName,
          wardId,
          wardName,
          districtId,
          districtName,
          provinceId,
          provinceName,
          countryId,
          countryName,
        };
        return this.service.response(200, 'village', res);
      }
    } catch (error) {
      console.log(error);
      return this.service.response(500, 'Error fetching district', error);
    }
  }

  // update(id: number, updateLocationDto: UpdateLocationDto) {
  //   return `This action updates a #${id} location`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} location`;
  // }
}
