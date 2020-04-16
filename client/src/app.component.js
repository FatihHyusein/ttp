import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './app.component.scss';
import { AuthComponent } from './routes/auth/auth.component';
import { HomeComponent } from './routes/home/home.component';
import { AuthContext } from './contexts/auth.context';
import { MyProfileContext } from './contexts/my-profile.context';
import { UsersContext } from './contexts/users.context';
import { RentalsContext } from './contexts/rentals.context';
import { ajax } from './core/ajax-requests.util';

export function AppComponent() {
    const [authToken, setAuthToken] = React.useState(localStorage.token);
    const [myProfile, setMyProfile] = React.useState({});
    const [users, setUsers] = React.useState([]);
    const [rentals, setRentals] = React.useState([]);
    ajax.setUpdateTokenFunction(setAuthToken);

    React.useEffect(() => {
        try {
            setMyProfile(JSON.parse(atob(authToken.split('.')[1])).user);
        } catch (e) {
            setMyProfile({});
        }
    }, [authToken]);

    return <AuthContext.Provider value={{
        authToken,
        setAuthToken
    }}>
        <MyProfileContext.Provider value={{
            myProfile,
            setMyProfile
        }}>
            <UsersContext.Provider value={{
                users,
                setUsers
            }}>
                <RentalsContext.Provider value={{
                    rentals,
                    setRentals
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
                </RentalsContext.Provider>
            </UsersContext.Provider>
        </MyProfileContext.Provider>
    </AuthContext.Provider>;
}
