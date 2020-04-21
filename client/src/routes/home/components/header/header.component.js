import React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import './header.component.scss';
import { Layout, Menu } from 'antd';
import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined';
import TeamOutlined from '@ant-design/icons/lib/icons/TeamOutlined';
import { ajax } from '../../../../core/ajax-requests.util';
import { AuthContext } from '../../../../contexts/auth.context';
import { MyProfileContext } from '../../../../contexts/my-profile.context';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';

const { Header } = Layout;


export function HeaderComponent() {
    const { setAuthToken } = React.useContext(AuthContext);
    const { myProfile } = React.useContext(MyProfileContext);
    const match = useRouteMatch();
    const location = useLocation();
    const selectedMenuItem = location.pathname.indexOf('/users') === 0 ? 'users' : 'rentals';

    return <Header className={'page-header-component'}>
        <Menu mode='horizontal' selectedKeys={[selectedMenuItem]}>
            <Menu.Item key='rentals'>
                <Link to={match.path}>
                    <HomeOutlined/>
                    Rentals
                </Link>
            </Menu.Item>
            {myProfile.role === 'admin' ?
                <Menu.Item key='users'>
                    <Link to={`/users`}>
                        <TeamOutlined/>
                        Users
                    </Link> </Menu.Item>
                : null
            }
            <Menu.SubMenu
                title={<span><UserOutlined/>{myProfile?.username}</span>}>
                <Menu.ItemGroup>
                    <Menu.Item key='my-profile'><EditOutlined/> Edit</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup>
                    <Menu.Item key='logout' onClick={() => {
                        ajax.post({ url: 'auth/logout' }).then(() => {
                            localStorage.token = '';
                            setAuthToken(localStorage.token);
                        });
                    }}><LogoutOutlined/> Logout</Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
        </Menu>
    </Header>;
}
