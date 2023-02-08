import { Pagination } from '@mui/material';
import { PaginationProp } from './type';

export default function PaginationContainer(props: PaginationProp) {
  const { pageCount } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <Pagination count={pageCount || 1} color='primary' />
    </div>
  );
}
