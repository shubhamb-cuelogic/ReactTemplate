import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useHistory, withRouter } from "react-router-dom";
import SideMenu from './SideMenu';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { logOutUser } from '../redux/actions';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        flexDirection: 'column',
        marginLeft: 10
    },
    pages: {
        padding: 10,
        background: 'whitesmoke',
        flex: 1,
        flexGrow: 1,
        height: '90vh',
        overflow: 'auto',

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

}));
function AuthLayout(props) {
    const classes = useStyles();
    const [sidebar, setSidebar] = useState(true);
    const history = useHistory()

    const handleLogout = () => {
        console.log('logout called')
        localStorage.clear("user");
        props.logOutUser();
        //props.history.push('')
        history.push('/login');
    }
    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }
    return (
        <React.Fragment>
            <div style={{ display: 'flex', flexDirection: 'row', transition: 'linear .5s' }}>
                {sidebar && <SideMenu />}
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar style={{ justifyContent: 'space-between', display: 'flex' }}>
                            <IconButton onClick={toggleSidebar} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <IconButton onClick={handleLogout} style={{ color: 'white' }}>
                                <PowerSettingsNewIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.pages}>
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const { user } = state.User;
    return { user }
}
export default connect(mapStateToProps, { logOutUser })(withRouter(AuthLayout));
