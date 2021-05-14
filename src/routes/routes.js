import React from "react";
import { Redirect } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../components/Login"));
const ComponentA = React.lazy(() => import("../pages/ComponentA"));
const ComponentB = React.lazy(() => import("../pages/ComponentB"));
const Signup = React.lazy(() => import("../components/Signup"))
const protectedRoutes = [
    { path: '/home', component: Home },
    { path: '/com-a', component: ComponentA },
    { path: '/com-b', component: ComponentB },
    {
        path: "/",
        exact: true,
        component: () => <Redirect to="/home" />,
    }
];

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
]

export { protectedRoutes, publicRoutes }