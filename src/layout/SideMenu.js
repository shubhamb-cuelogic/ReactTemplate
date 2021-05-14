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
            styles={{ height: '100vh', width: 250,paddingLeft:10 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <h3 styles={{ marginLeft: 20 }}>Demo app</h3>
            <Divider />
            <ListItem selected={history.location.pathname==='/home'} button onClick={() => history.push('/home')}>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button selected={history.location.pathname==='/com-a'} onClick={() => history.push('/com-a')}>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Component-A" />
            </ListItem>
            <ListItem button selected={history.location.pathname==='/com-b'} onClick={() => history.push('/com-b')}>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Component-B" />
            </ListItem>
        </List>
    );
}
