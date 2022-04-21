import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import "../css/Regis.css"
import apiServer from "../../config/apiServer";
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';


const LoginForm = () => {
    const { register, handleSubmit, error } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, error: error2 } = useForm();
    const { register: register3, handleSubmit: handleSubmit3, error: error3 } = useForm();
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [errorMessage, setErrorMessage] = useState("");
    const { setAuth, setEmail, setUserId, setUser, setUsername } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fld, setFld] = useState(false);
    const [usr, setUsr] = useState(false);



    const fldOpen = () => {
        setFld(true);
    }
    const fldClose = () => {
        setFld(false);
    }
    const scsOpen = () => {
        setSuccess(true);
    }
    const scsClose = () => {
        setSuccess(false);
    }
    const reload = () => {
        window.location.reload();
    }


    const getUser = async () => {

        const res = await apiServer.get(`/user/`);
        console.log(res.data.data)
        setUsr(res.data.data);
    };

    useEffect(() => {
        getUser();
    }, []);

    const renderedProjects = usr.map((us, i) => {
        return (
            <option key={i} id={us.id} value={us.id}>
                {us.user_name}
            </option>
        );
    });

    const onSubmit = async ({ text }) => {
        setLoading(true);
    }

    const onLogin = async ({ user_email, user_password }) => {
        setLoading(true);
        console.log("masuk");
        console.log(user_email);
        console.log(user_password);
        if (!user_email || user_email == '') {
            // alert("Email kosong!");
            setErrorMessage("Email kosong!");
            return;//kalo abis return di mainstream programming language biasanya ga akan di eksekusi
        }
        if (!user_password || user_password == '') {
            // alert("Password kosong!");
            setErrorMessage("Password kosong!");
            return;
        }
        try {
            // const res = await apiServer.post("/auth/login", { user_email, user_password });
            const data = {
                "user_email": user_email,
                "user_password": user_password,
            };

            // console.log(data);

            const res = await apiServer.post("/login", data);
            console.log(res);

            if (res.data.length > 0) {
                // localStorage.setItem("userId", res.data.id);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("userId", res.data.id);
                localStorage.setItem("token", res.data.token);
                // setErrorMessage("");
                setAuth(res.data.token);
                setUserId(res.data.id);
                setEmail(res.data.email);
                setUser(res.data);
            }
        } catch (err) {
            setLoading(false);
            setErrorMessage("The provided credentials were invalid");
        }
    };

    const onRegister = async ({ user_name, user_email, password }) => {
        setLoading(true);
        console.log('regis click');
        try {
            // const res = await apiServer.post("/auth/login", { user_email, user_password });
            const data = {
                "user_name": user_name,
                "user_email": user_email,
                "password": password,
            };

            console.log(data);
            const res2 = await apiServer.post("/register", data);
            if (res2.status === 200) {
                scsOpen();
                window.location.reload();
            }



        } catch (err) {
            setLoading(false);
            setErrorMessage("The provided credentials were invalid");
        }
    };



    const [addclass, setaddclass] = useState("");
    const [signupMode, setSignupMode] = useState("");

    const signupBtn = () => {
        setSignupMode("sign-up-mode");
    };

    const signinBtn = () => {
        setSignupMode("");
    };

    // useEffect(() => {
    //   onLogin();
    // }, [onLogin]);

    return (
        <>
            <div className={"app" + " " + signupMode}>
                <div className="forms-container">
                    {/* <Link to='/' className='closebtn'>
          <MdArrowBack />
        </Link> */}
                    <div className="signin-signup">
                        <form onSubmit={handleSubmit2(onLogin)} className="sign-in-form">

                            <h2 className="title" style={{ color: '#07575b' }}>Sign in</h2>
                            <div className="input-field">
                                <span className="icon">
                                    <FaEnvelope />
                                </span>
                                <input type="email" placeholder="Email" {...register2('user_email', { required: false })} />
                                {errorMessage.user_email && <p className='err_text'>Please Enter Your Email</p>}
                            </div>
                            <div className="input-field">
                                <span className="icon">
                                    <FaLock />
                                </span>
                                <input type="password" placeholder="Password" {...register2('user_password', { required: false })} />
                                {errorMessage.user_password && <p className='err_text'>Please Enter Your Password</p>}
                            </div>


                            <input type="submit" className="btn solid" value="Sign In" />



                        </form>


                        <form onSubmit={handleSubmit(onRegister)} className="sign-up-form">

                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <span className="icon">
                                    <FaUser />
                                </span>
                                <input type="text" placeholder="Full Name"  {...register('user_name', { required: true })} />
                                {/* {errors.user_name && <p className='err_text'>Please Enter Your Full Name</p>} */}
                            </div>
                            <div className="input-field">
                                <span className="icon">
                                    <FaEnvelope />
                                </span>
                                <input type="email" placeholder="Email" {...register('user_email', { required: true })} />
                                {/* {errors.user_email?.type === "required" && <p className='err_text'>Please Enter Your Email</p>} */}
                            </div>
                            <div className="input-field">
                                <span className="icon">
                                    <FaLock />
                                </span>
                                <input type="password" placeholder="Password" {...register('password', { required: true })} />
                                {/* {errors.password && <p className='err_text'>Please Enter Your Password</p>} */}
                            </div>
                            <input type="submit" className="btn solid" value="Sign Up" />

                        </form>
                    </div>
                </div>

                <div className="panels-container">

                    <div className="panel left-panel">
                        <a href='/' className="btn_cls" >
                            <MdArrowBack />
                        </a>
                        <div className="content">
                            <h3>Baru disini?</h3>
                            <p>
                                {/* Enter your personal details and start your journey with us */}
                                Masukkan data anda dan mulai perjalanan anda bersama kami
                            </p>
                            <button
                                className="btn transparent"
                                id="sign-up-btn"
                                onClick={signupBtn}
                            >
                                {/* <a href='/register'>Sign up</a> */}
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Salah satu dari kami?</h3>
                            <p>
                                Untuk tetap terhubung dengan kami, silakan masuk dengan info pribadi Anda
                                {/* To keep connected with us please login with your personal info */}
                            </p>
                            <button
                                className="btn transparent"
                                id="sign-in-btn"
                                onClick={signinBtn}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div >


        </>
    );
};

export default LoginForm;
