import './Pagination.scss';

interface PaginationProps {
    children: any;
}

function Pagination({ children }: PaginationProps) {
    return <div className='pagination'>{children}</div>;
}

export default Pagination;
