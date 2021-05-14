
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';


const useStyles = makeStyles((theme) => ({
    root: {
        background: `linear-gradient(to left, ${theme.palette.primary.dark
            } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
        color: theme.palette.primary.contrastText,
    },
    leftSection: {},
    rightSection: {
        background: `linear-gradient(to right, ${theme.palette.primary.dark
            } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
        color: theme.palette.primary.contrastText,
    },
}));

function Signup() {

    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            name: "",
            email: localStorage.getItem("email"),
            username: "",
            phoneNumber: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            username: Yup.string().required('Required'),
            phoneNumber: Yup.number().required('Required'),
            password: Yup.string().required('Required')
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain 8 Characters, One Uppercase, One Lowercase And One Number"),
            passwordConfirm: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: async (values, { resetForm }) => {
            //   try {
            //     await dispatch(
            //       submitRegister({
            //         name: values.name,
            //         email: values.email,
            //         username: values.username,
            //         phoneNumber: values.phoneNumber,
            //         password: values.password,
            //         securityToken: token.contractAddress
            //       })
            //     );
            //     if (!store.getState().auth.register.success) {
            //       setErrorMessage(store.getState().auth.register.error);
            //     }
            //   } catch (error) {
            //     resetForm();
            //   }
        }
    });

    return (
        <div
        >
            <div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
                <Card
                    style={{ padding: 10, margin: 20 }}
                    square
                >
                    <CardContent className="flex flex-col items-center justify-center w-full py-48 max-w-320">


                        <form
                            name="registerForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={formik.handleSubmit}
                        >
                            <TextField
                                style={{ marginBottom: 16 }}
                                className="mb-16"
                                label="Name"
                                autoFocus
                                type="name"
                                name="name"
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                error={
                                    formik.touched.name && formik.errors.name
                                        ? true
                                        : false
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name && formik.errors.name
                                }
                            />

                            <TextField
                                style={{ marginBottom: 16 }}
                                className="mb-16"
                                label="Username"
                                autoFocus
                                type="name"
                                name="username"
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                error={
                                    formik.touched.username && formik.errors.username
                                        ? true
                                        : false
                                }
                                helperText={
                                    formik.touched.username && formik.errors.username && formik.errors.username
                                }
                            />

                            <TextField
                                style={{ marginBottom: 16 }}
                                className="mb-16"
                                label="Phone Number"
                                autoFocus
                                type="name"
                                name="phoneNumber"
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                error={
                                    formik.touched.phoneNumber && formik.errors.phoneNumber
                                        ? true
                                        : false
                                }
                                helperText={
                                    formik.touched.phoneNumber && formik.errors.phoneNumber && formik.errors.phoneNumber
                                }
                            />

                            <TextField
                                style={{ marginBottom: 16 }}
                                className="mb-16"
                                label="Password"
                                type="password"
                                name="password"
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                error={
                                    formik.touched.password && formik.errors.password
                                        ? true
                                        : false
                                }
                                helperText={
                                    formik.touched.password && formik.errors.password && formik.errors.password
                                }
                            />

                            <TextField
                                style={{ marginBottom: 16 }}
                                className="mb-16"
                                label="Password (Confirm)"
                                type="password"
                                name="passwordConfirm"
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordConfirm}
                                onChange={formik.handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                error={
                                    formik.touched.passwordConfirm && formik.errors.passwordConfirm
                                        ? true
                                        : false
                                }
                                helperText={
                                    formik.touched.passwordConfirm && formik.errors.passwordConfirm && formik.errors.passwordConfirm
                                }
                            />

                            {/* <FormControl className="items-center">
                  <FormControlLabel
                    classes={{ label: "text-13 font-600" }}
                    control={
                      <Checkbox
                        name="acceptTermsConditions"
                        checked={form.acceptTermsConditions}
                        onChange={handleChange}
                      />
                    }
                    label="I read and accept terms and conditions"
                  />
                </FormControl> */}

                            <Button
                                style={{ marginBottom: 16 }}
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-8"
                                aria-label="Register"
                                // disabled={!isFormValid()}
                                type="submit"
                            >
                                Create an account
                  </Button>
                        </form>
                    </CardContent>

                    <div className="flex flex-col items-center justify-center pb-32">
                        <span className="font-medium">Already have an account?</span>
                        <Link className="font-medium" to="#">
                            Login
                </Link>
                    </div>
                </Card>


            </div>



        </div>
    );
}

export default Signup;
