// assets
import { DashboardOutlined, UnorderedListOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    UnorderedListOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const navigation = {
    id: 'group-navigation',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.DashboardOutlined,
            breadcrumbs: true
        },
        {
            id: 'surveys',
            title: 'Surveys',
            type: 'item',
            url: '/surveys',
            icon: icons.UnorderedListOutlined,
            breadcrumbs: true
        }
    ]
};

export default navigation;
