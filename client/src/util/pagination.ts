export interface PageMetaDto {
  page: number;

  take: number;
}

export const defaultPaginationDto: PageMetaDto = {
  page: 1,
  take: 20,
};
