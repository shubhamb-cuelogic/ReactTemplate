import React, { Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { protectedRoutes, publicRoutes } from './routes';
import NonAuthLayout from "../layout/NonAuth";
import AuthLayout from "../layout/AuthLayout";
import { connect } from 'react-redux';

const AppRoute = ({ component: Component, layout: Layout, isAuthProtected, user, ...rest }) => {
    return <Route {...rest} render={props => {

        if (isAuthProtected && !user) {
            return (

                <Redirect to={{ pathname: "/bar-chart", state: { from: props.location } }} />
            );
        } else if (!isAuthProtected && user) {
            return (
                <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
            );
        }

        return <Layout><Component {...props} /></Layout>
    }} />
}

const Routes = (props) => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Suspense fallback={<div></div>} >
                    <Switch>
                        {publicRoutes.map((route, idx) =>
                            <AppRoute path={route.path} layout={NonAuthLayout} component={route.component}
                                key={idx} isAuthProtected={false} user={props.user} />
                        )}
                        {protectedRoutes.map((route, idx) => {
                            return < AppRoute path={route.path} layout={AuthLayout} component={route.component}
                                key={idx} isAuthProtected={true} user={props.user} />
                        })}
                    </Switch>
                </Suspense>
            </React.Fragment>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    const { user } = state.User;
    return { user }
}
export default connect(mapStateToProps)(Routes)
