import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import './home.component.scss';
import { UsersComponent } from './users/users.component';
import { RentalsComponent } from './rentals/rentals.component';
import { Layout } from 'antd';
import { MyProfileContext } from '../../contexts/my-profile.context';
import { HeaderComponent } from './components/header/header.component';
import { userRoles } from '../../core/roles.enum';

const { Content } = Layout;


export function HomeComponent() {
    const { myProfile } = React.useContext(MyProfileContext);
    const match = useRouteMatch();

    return <div>
        <Layout>
            <HeaderComponent/>
            <Content>
                <div className='site-layout-content'>
                    <Switch>
                        <Route exact path={match.path} component={RentalsComponent}/>
                        {
                            myProfile.role === userRoles.admin ?
                                <Route exactpath={`${match.path}/users`} component={UsersComponent}/>
                                : null
                        }
                        <Route path='*' render={() => (<Redirect to={`/`}/>)}/>
                    </Switch>
                </div>
            </Content>
        </Layout>
    </div>;
}
