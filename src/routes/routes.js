import React from "react";
import { Redirect } from "react-router-dom";

const BarChart = React.lazy(() => import("../pages/barChart"));
const Login = React.lazy(() => import("../components/Login"));
const BarChart2 = React.lazy(() => import("../pages/barChart2"));
const LineChart = React.lazy(() => import("../pages/lineChart"));
const Signup = React.lazy(() => import("../components/Signup"));
const ForceGraph = React.lazy(() => import("../pages/forceDataGraph/index"));
const Svg = React.lazy(() => import("../pages/createSvgImg/SHome"));
const donut = React.lazy(() => import("../pages/donutChart"));
const PieChart = React.lazy(() => import("../pages/piChart"));
const DrillDownpieChartParent = React.lazy(() => import("../pages/DrillDownpieChart"));
const TreeChart = React.lazy(() => import("../pages/TreeChart/index"));
const Responcive = React.lazy(() => import("../pages/responsiveBarChart"));
const SankeyGraph = React.lazy(() => import("../pages/sankey"));
const StickeyForceGraph = React.lazy(() => import("../pages/stickeyForce"))
const SankeyGradiant = React.lazy(() => import("../pages/sankey-gradiant"));
const CollapsTree = React.lazy(() => import("../pages/collaps-tree"));
const ScatterPlot = React.lazy(() => import("../pages/scater-plot"));
const BoxPlot = React.lazy(() => import("../pages/box-plot"));
const Funnel = React.lazy(() => import("../pages/fuunel-chart"));
const SyemmeticTable = React.lazy(() => import("../pages/symmentic-table"));
const WaterFall = React.lazy(() => import("../pages/water-fall"));
const BubbleChart = React.lazy(() => import("../pages/bubble-chart"))

const protectedRoutes = [
    { path: '/bar-chart', component: BarChart },
    { path: '/bar-chart2', component: BarChart2 },
    { path: '/line-chart', component: LineChart },
    { path: '/force-chart', component: ForceGraph },
    { path: '/svg', component: Svg },
    { path: '/pie-chart', component: donut },
    { path: '/pie-chart2', component: PieChart },
    { path: '/drill-down', component: DrillDownpieChartParent },
    { path: '/tree-chart', component: TreeChart },
    { path: '/responsive', component: Responcive },
    { path: '/sankey', component: SankeyGraph },
    { path: '/stickey-forceGraph', component: StickeyForceGraph },
    { path: '/sankey-gradiant', component: SankeyGradiant },
    { path: '/collaps-tree', component: CollapsTree },
    { path: '/scatter-plot', component: ScatterPlot },
    { path: '/box-plot', component: BoxPlot },
    { path: '/funnel', component: Funnel },
    { path: '/symentic-table', component: SyemmeticTable },
    { path: '/water-fall', component: WaterFall },
    { path: '/bubble-chart', component: BubbleChart },

    {
        path: "/",
        exact: true,
        component: () => <Redirect to="/bar-chart" />,
    }
];

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
]

export { protectedRoutes, publicRoutes }