import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './app.component.scss';
import { AuthComponent } from './routes/auth/auth.component';
import { HomeComponent } from './routes/home/home.component';
import { AuthContext } from './auth.context';
import { ajax } from './core/ajax-requests.util';

export function AppComponent() {
    const [authToken, setAuthToken] = React.useState(localStorage.token);
    ajax.setUpdateTokenFunction(setAuthToken);

    return <AuthContext.Provider value={{
        authToken,
        setAuthToken
    }}>
        <Router>
            {authToken ?
                <React.Fragment>
                    <Switch>
                        <Route path='/auth' render={() => (<Redirect to={`/`}/>)}/>
                        <Route path='/' component={HomeComponent}/>
                    </Switch>
                </React.Fragment> :
                <React.Fragment>
                    <Route path='/' render={() => (<Redirect to={`/auth`}/>)}/>
                    <Route path={`/auth`} component={AuthComponent}/>
                </React.Fragment>
            }
        </Router>
    </AuthContext.Provider>;
}
