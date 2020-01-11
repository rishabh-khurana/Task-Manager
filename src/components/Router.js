import React from 'react';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class LandingPage extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={LoginPage}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/signup' component={SignUpPage}/>
                    <Route path='/home' component={HomePage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default LandingPage;