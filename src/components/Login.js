import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { loginUser } from '../redux/actions';
import AuthService from '../services/authService';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async () => {
       localStorage.setItem('user', JSON.stringify({ email, password }))
        props.loginUser({ email, password });
        // let res = await AuthService.logIn({ email, password })
        // console.log(res);
        history.push('/bar-chart');
    }

    return (
        <React.Fragment>
            <h2 style={{ textAlign: 'center' }}>log-in</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Grid container style={{ justifyContent: 'center' }}>
                    <Grid item xs={12} md={7} lg={7} style={{ paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            type="email"
                            name="email"

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%' }} required />
                    </Grid>
                    <Grid item xs={12} md={7} lg={7} style={{ paddingLeft: 5, paddingRight: 5, marginBottom: 10 }}>
                        <TextField
                            id="standard-basic"
                            label="Password"
                            type="password"
                            name="password"

                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%' }} required />
                    </Grid>

                    <Grid item xs={12} md={7} lg={7} >
                        <div style={{ textDecoration: 'none', padding: 10, marginBottom: 10 }}>
                            <Button
                                className="btn-purple"
                                variant="contained"
                                type="submit"
                                color="primary"
                                disableElevation={true}
                            >
                                Login
                    </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const { user } = state.User;
    return { user }
}
export default connect(mapStateToProps, { loginUser })(Login)
