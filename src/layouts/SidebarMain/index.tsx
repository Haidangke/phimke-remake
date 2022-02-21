import { ReactElement } from 'react';
import './SidebarMain.scss';
interface Props {
    children: any;
}

function SidebarMain({ children }: Props): ReactElement {
    return children;
}

export default SidebarMain;
