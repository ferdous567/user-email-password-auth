import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { BiSolidShow } from "react-icons/bi";



const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted)

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one uppercase character.');
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept our terms and conditions.');
            return;
        }

        //    reset error/success message
        setRegisterError('');
        setSuccess('');

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('User created successfully');

                // update
                updateProfile(result.user, {
                    displayName: name,

                })
                .then(() =>{
                    console.log('profile updated')
                })

                // send email verification
                sendEmailVerification(result.user)
                .then(() =>{
                    alert('Please check your email to verification.')
                })
            })
            .catch(error => {
                setRegisterError(error.message)
            })
    }

    return (

        <div className="text-center m-3 border-2 border-purple-600 p-4 rounded w-fit mx-auto">
            <h3 className="text-3xl">Register here.</h3>
            <form onSubmit={handleRegister}>
                <input className="m-3 w-[500px] p-2 border-2 border-blue-600 rounded "
                    placeholder="Name" type="text" name="name" required />
                <br />
                <input className="m-3 w-[500px] p-2 border-2 border-blue-600 rounded "
                    placeholder="Email" type="email" name="email" required />
                <br />
                <div className="relative">
                <input className="m-3 w-[500px] p-2  border-2 border-blue-600 rounded"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password" required />
                    <span onClick={() => setShowPassword(!showPassword)}
                    className="text-2xl absolute top-6 right-5"> <BiSolidShow></BiSolidShow></span>
                
                </div>
                <br />
                <input type="checkbox"  name="terms" id="terms" />
                <label className="ml-2" htmlFor="terms"><a href=""> Accept our terms and conditions.</a></label>
                <br />
                <input className="bg-green-400 font-bold text-white 
                rounded px-3 py-2" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-700">{registerError}</p>
            }
            {
                success && <p className="text-blue-700 text-xl font-normal">{success}</p>
            }
        </div>
    );
};

export default Register;