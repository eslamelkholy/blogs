export interface PaginationMetaDto {
  page: number;

  take: number;

  itemCount?: number;

  pageCount?: number;

  hasPreviousPage?: boolean;

  hasNextPage?: boolean;
}
