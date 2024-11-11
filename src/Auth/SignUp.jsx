import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usercontext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    let { signupdata } = useContext(usercontext)
    let navigate = useNavigate()
    // console.log(signupdata);

    const validateForm = () => {
        const newErrors = {};
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Username validation
        if (!formData.name) {
            newErrors.name = 'Username is required';
        } else if (formData.name.length < 3) {
            newErrors.name = 'Username must be at least 3 characters';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        // Confirm password validation
        if (formData.password !== formData.confirmpassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    // let handleSubmit = (e) => {
    //     e.preventDefault();
    //     let validation = validateForm()
    //     if (Object.keys(validation).length > 0) {
    //         setErrors(validation)
    //     }
    //     else {
    //         let getsignup= JSON.parse(localStorage.getItem("instaSignup"))
    //         console.log(getsignup);

    //         setErrors({})
    //         signupdata(formData)
    //         toast.success("Registration Success")
    //         setTimeout(() => {
    //             navigate("/signin")
    //         }, 1000);
    //     }
    // };

    let handleSubmit = (e) => {
        e.preventDefault();
        let getsignup = JSON.parse(localStorage.getItem("instaSignup")) || []
        let emailExists = getsignup.some((user) => user.email === formData.email);
        let nameExists = getsignup.some((user) => user.name === formData.name);
        
        if (emailExists) {
            toast.error("Email already exists. Please use a different email.");
        } else if (nameExists) {
            toast.error("Username already exists. Please use a different username.");
        } else {
            signupdata(formData);
            toast.success("Registration successful!");
            setTimeout(() => {
                navigate("/signin");
            }, 1000);
        }

        // console.log(checkuser);

    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    let { currentuser } = useContext(usercontext)
    // console.log(currentuser);
    if (currentuser.email) {
        navigate("/")
    }

    return (
        <>
            <div>
                <nav className='text-center'>
                    <Link to={"/signin"}>
                        <button className='text-white m-3 bg-blue-600 px-3 py-2 rounded'>Sign In</button>
                    </Link>
                    <Link to={"/signup"}>
                        <button className='text-black font-bold m-3'>Sign Up</button>
                    </Link>
                </nav>
            </div>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">

                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                    {/* Header */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            {/* <Instagram className="h-12 w-12 text-pink-500" /> */}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
                        <p className="text-gray-600">Create your Instagram account</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}

                        <div>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='w-full  px-4 py-3 rounded-lg border'
                                    placeholder="Email address"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Username Field */}
                        <div>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className='w-full  px-4 py-3 rounded-lg border'
                                    placeholder="User Id"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="relative">
                                <input
                                    type="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='w-full  px-4 py-3 rounded-lg border'
                                    placeholder="Password"
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <div className="relative">
                                <input
                                    type="Password"
                                    name="confirmpassword"
                                    value={formData.confirmpassword}
                                    onChange={handleChange}
                                    className='w-full  px-4 py-3 rounded-lg border'
                                    placeholder="Confirm Password"
                                />
                            </div>
                            {errors.confirmpassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.confirmpassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to={"/signin"} className="text-pink-500 hover:text-pink-600 font-semibold">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default SignUp;