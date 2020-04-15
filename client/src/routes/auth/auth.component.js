import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import './auth.component.scss';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export function AuthComponent() {
    const match = useRouteMatch();

    return <div>
        <Switch>
            <Route exact path={match.path} component={LoginComponent}/>
            <Route exact path={`${match.path}/register`} component={RegisterComponent}/>
        </Switch>
    </div>;
}
