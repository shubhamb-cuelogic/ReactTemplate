import React from "react";
import { Redirect } from "react-router-dom";

const Home = React.lazy(() => import("../pages/barChart"));
const Login = React.lazy(() => import("../components/Login"));
const ComponentA = React.lazy(() => import("../pages/barChart2"));
const ComponentB = React.lazy(() => import("../pages/lineChart"));
const Signup = React.lazy(() => import("../components/Signup"));
const Test = React.lazy(() => import("../pages/forceDataGraph/index"));
const Svg = React.lazy(() => import("../pages/createSvgImg/SHome"));
const donut = React.lazy(() => import("../pages/donutChart"));
const PiChart=React.lazy(() => import("../pages/piChart"));

const protectedRoutes = [
    { path: '/home', component: Home },
    { path: '/com-a', component: ComponentA },
    { path: '/com-b', component: ComponentB },
    { path: '/test', component: Test },
    { path: '/svg', component: Svg },
    { path: '/pi-chart', component: donut },
    { path: '/pi-chart2', component: PiChart },
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