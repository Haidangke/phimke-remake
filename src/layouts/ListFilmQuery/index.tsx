import { ReactChild, ReactChildren, ReactElement } from 'react';
import './ListFilmQuery.scss';

interface Props {
    children: ReactChild | ReactChildren | any;
}

function ListFilmQuery({ children }: Props): ReactElement {
    return children;
}

export default ListFilmQuery;
