import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usercontext } from '../context/AuthContext';
// import { Eye, EyeOff, Instagram, AlertCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    let [formData, setFormData] = useState({});
    let [errors, setErrors] = useState({});
    let { signindata } = useContext(usercontext)
    let navigate = useNavigate()

    let handleSubmit = (e) => {
        e.preventDefault();
        let getsignup = JSON.parse(localStorage.getItem("instaSignup"))
        // console.log(getsignup);
        if (!formData.email || !formData.password) {
            toast.error("Enter Valid Detail")
        }
        else{
            let getdata= getsignup.find((val)=>{
                return val.email==formData.email
            })
            // console.log(getdata);
            if (!getdata) {
                toast.error("Email Doesn't Exist")
            }
            else if (getdata.password!=formData.password) {
                toast.error("Wrong Password")
            }
            else{
                toast.success("Login Success")
                // console.log(getdata);
                signindata(getdata)
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }  
            setFormData({})
        }
    };

    let handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };
    // let { currentuser } = useContext(usercontext)
    // console.log(currentuser);
    // if (currentuser.email) {
    //     navigate("/")
    // }


    return (
        <>
            <div>
                <nav className='text-center'>
                    <Link to={"/signup"}>
                        <button className='text-white m-3 bg-blue-600 px-3 py-2 rounded'>Sign Up</button>
                    </Link>
                    <Link to={"/signin"}>
                        <button className='text-black font-bold m-3'>Sign In</button>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email ? formData.email : ""}
                                    onChange={handleChange}
                                    className='w-full  px-4 py-3 rounded-lg border'
                                    placeholder="Email address"
                                />
                            </div>
                            {/* {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )} */}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="relative">
                                <input
                                    type="Password"
                                    name="password"
                                    value={formData.password ? formData.password : ""}
                                    onChange={handleChange}
                                    className='w-full  px-4 py-3 rounded-lg border'
                                    placeholder="Password"
                                />
                            </div>
                            {/* {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )} */}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            Don't Have an Account?{' '}
                            <Link to={"/signup"} className="text-pink-500 hover:text-pink-600 font-semibold">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default SignIn;