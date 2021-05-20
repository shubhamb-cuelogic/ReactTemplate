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
            <ListItem selected={history.location.pathname === '/home'} button onClick={() => history.push('/home')}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="BarChart-1" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/com-a'} onClick={() => history.push('/com-a')}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="BarChart-2" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/com-b'} onClick={() => history.push('/com-b')}>
                <ListItemIcon>
                    <MultilineChartIcon />
                </ListItemIcon>
                <ListItemText primary="Line-chart" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/test'} onClick={() => history.push('/test')}>
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
            <ListItem button selected={history.location.pathname === '/pi-chart'} onClick={() => history.push('/pi-chart')}>
                <ListItemIcon>
                    <DonutSmallIcon />
                </ListItemIcon>
                <ListItemText primary="Donut-chart" />
            </ListItem>
            <ListItem button selected={history.location.pathname === '/pi-chart2'} onClick={() => history.push('/pi-chart2')}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Pi-Chart" />
            </ListItem>
        </List>
    );
}
