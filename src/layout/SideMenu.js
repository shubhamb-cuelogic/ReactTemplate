import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { Divider } from '@material-ui/core';
import { useHistory } from 'react-router';
import BarChartIcon from '@material-ui/icons/BarChart';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import ExtensionIcon from '@material-ui/icons/Extension';
import SettingsInputSvideoIcon from '@material-ui/icons/SettingsInputSvideo';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 300,
        background: 'whitesmoke',
        position: 'relative',
        overflow: 'auto',
        flexDirection: 'column',
        marginRight: 10,
        height: '100vh'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function SideMenu(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <List
            styles={{ height: '100vh', width: 250, paddingLeft: 10 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <h3 styles={{ marginLeft: 20 }}>Demo app</h3>
            <Divider />
            <ListItem selected={history.location.pathname === '/bar-chart'} button onClick={() => history.push('/bar-chart')}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="BarChart-1" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/bar-chart2'} onClick={() => history.push('/bar-chart2')}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="BarChart-2" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/line-chart'} onClick={() => history.push('/line-chart')}>
                <ListItemIcon>
                    <MultilineChartIcon />
                </ListItemIcon>
                <ListItemText primary="Line-chart" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/force-chart'} onClick={() => history.push('/force-chart')}>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Force-chart" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/svg'} onClick={() => history.push('/svg')}>
                <ListItemIcon>
                    <SettingsInputSvideoIcon />
                </ListItemIcon>
                <ListItemText primary="Create svg" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/pie-chart'} onClick={() => history.push('/pie-chart')}>
                <ListItemIcon>
                    <DonutSmallIcon />
                </ListItemIcon>
                <ListItemText primary="Donut-chart" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/pie-chart2'} onClick={() => history.push('/pie-chart2')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Pi-Chart" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/drill-down'} onClick={() => history.push('/drill-down')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Drill-down" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/tree-chart'} onClick={() => history.push('/tree-chart')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Tree-Chart" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/responsive'} onClick={() => history.push('/responsive')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Responsive" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/sankey'} onClick={() => history.push('/sankey')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Sankey-graph" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/stickey-forceGraph'} onClick={() => history.push('/stickey-forceGraph')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Stickey-forceGraph" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/sankey-gradiant'} onClick={() => history.push('/sankey-gradiant')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Sankey-Gradiant" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/collaps-tree'} onClick={() => history.push('/collaps-tree')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Collaps-Tree" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/scatter-plot'} onClick={() => history.push('/scatter-plot')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Scatter-Plot" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/box-plot'} onClick={() => history.push('/box-plot')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Box-Plot" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/funnel'} onClick={() => history.push('/funnel')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Funnel" />
            </ListItem>
        </List>
    );
}
