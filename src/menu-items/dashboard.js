// assets
import { DashboardOutlined, UnorderedListOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    UnorderedListOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'surveys',
            title: 'Surveys',
            type: 'item',
            url: '/dashboard/',
            icon: icons.UnorderedListOutlined,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
