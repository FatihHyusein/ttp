import React from 'react';
import { Route, Switch, Link, useLocation, useRouteMatch } from 'react-router-dom';
import './home.component.scss';
import { UsersComponent } from './users/users.component';
import { RentalsComponent } from './rentals/rentals.component';
import { Layout, Menu } from 'antd';
import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined';
import TeamOutlined from '@ant-design/icons/lib/icons/TeamOutlined';
import SettingOutlined from '@ant-design/icons/lib/icons/SettingOutlined';
import { ajax } from '../../core/ajax-requests.util';
import { AuthContext } from '../../contexts/auth.context';
import { MyProfileContext } from '../../contexts/my-profile.context';

const { Header, Footer, Content } = Layout;


export function HomeComponent() {
    const { setAuthToken } = React.useContext(AuthContext);
    const { myProfile } = React.useContext(MyProfileContext);
    const match = useRouteMatch();
    const location = useLocation();
    const selectedMenuItem = location.pathname.indexOf('/users') === 0 ? 'users' : 'rentals';

    return <div>
        <Layout>
            <Header>
                <Menu mode='horizontal' selectedKeys={[selectedMenuItem]}>
                    <Menu.Item key='rentals'>
                        <Link to={match.path}>
                            <HomeOutlined/>
                            Rentals
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='users'>
                        <Link to={`/users`}>
                            <TeamOutlined/>
                            Users
                        </Link> </Menu.Item>
                    <Menu.SubMenu
                        title={
                            <span className='submenu-title-wrapper'>
                                <SettingOutlined/>
                              User
                            </span>}>
                        <Menu.ItemGroup>
                            <Menu.Item key='my-profile'>{myProfile?.username}</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup>
                            <Menu.Item key='logout' onClick={() => {
                                ajax.post({ url: 'auth/logout' }).then(() => {
                                    localStorage.token = '';
                                    setAuthToken(localStorage.token);
                                });
                            }}>Logout</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                </Menu>
            </Header>
            <Content>
                <div className='site-layout-content'>
                    <Switch>
                        <Route exact path={match.path} component={RentalsComponent}/>
                        <Route exactpath={`${match.path}/users`} component={UsersComponent}/>
                    </Switch>
                </div>
            </Content>
        </Layout>
    </div>;
}
