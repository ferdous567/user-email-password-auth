import { useRef, useState } from "react";
import auth from "../../firebase/firebase.config";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }

        setRegisterError('');
        setSuccess('');

        // add validation
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if(result.user.emailVerified){
                    setSuccess('User logged in successfully');
                }
                else{
                    alert('Please verify your email.')
                }
            })
            .catch(error => {
                setRegisterError(error.message)
            });

    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
             console.log('Please provide an email', emailRef.current.value)
        }
        else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            console.log('please write a valid email');
            return;
        }
        // send password reset email
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('sent a verification, please check your email.')
        })
        .catch(error => {
            console.log(error.message)
        })
    }


    return (
        <div className="w-1/2 mx-auto mt-18 ">

            <div className="card flex-shrink-0 w-full max-w-md text-center shadow-2xl bg-base-100">
                <div className="card-body w-[400px]">
                    <form onSubmit={handleLogin}>
                        <div className="form-control">
                            {/* <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email" placeholder="email"
                                ref={emailRef}
                                className="input input-bordered" /> */}
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email" placeholder="email"
                                ref={emailRef}
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        registerError && <p className="text-red-700">{registerError}</p>
                    }
                    {
                        success && <p className="text-blue-700 text-xl font-normal">{success}</p>
                    }
                    <p>New here? Please <Link className="text-blue-700 underline" to='/register'>Sign Up</Link></p>
                </div>

            </div>
        </div>

    );
};

export default Login;