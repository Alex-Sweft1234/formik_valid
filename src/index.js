import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import InputMask from "react-input-mask";
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const validationSchema = yup.object({
    firstname: yup
        .string('Enter your name')
        .min(2, 'Name should be of minimum 2 characters length')
        .max(50, 'Name should be of maximum 50 characters length')
        .required('Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    phone: yup
        .string('Enter your phone')
        .transform(value => value.replace(/[^\d]/g, ''))
        .min(11, 'Phone should be of minimum 11 characters length')
        .required('Phone is required')
});

const WithMaterialUI = () => {
    const formik = useFormik({
        initialValues: {
            firstname: '',
            email: '',
            phone: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div style={{maxWidth: 500, marginTop: 100, marginLeft: 'auto', marginRight: 'auto'}}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="firstname"
                    name="firstname"
                    label="Name"
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                    style={{marginBottom: 10}}
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    style={{marginBottom: 10}}
                />
                <InputMask
                    mask="+7(\999)999-99-99"
                    //mask="99-999999999-9"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                >{() => {
                    return(
                        <TextField
                            fullWidth
                            id="phone"
                            name="phone"
                            type="text"
                            label="Phone"
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            style={{marginBottom: 10}}
                        />
                    )
                }}</InputMask>
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    style={{marginBottom: 10}}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

ReactDOM.render(<WithMaterialUI />, document.getElementById('root'));
