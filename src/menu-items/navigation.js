// assets
import { DashboardOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    UnorderedListOutlined,
    UserOutlined
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
            breadcrumbs: false
        },
        {
            id: 'surveys',
            title: 'Surveys',
            type: 'item',
            url: '/surveys',
            icon: icons.UnorderedListOutlined,
            breadcrumbs: false
        },
        {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/profile',
            icon: icons.UserOutlined,
            breadcrumbs: false
        }
    ]
};

export default navigation;
