import { PageMetaDto } from './page.meta.dto';

export type PaginatedResponse = {
  totalResults: number;
  pageCount: number;
  currentPage: number;
  itemsPerPage: number;
};

export type PaginatedResultSet<T> = {
  entities?: T[];

  pagination: PageMetaDto;
};
