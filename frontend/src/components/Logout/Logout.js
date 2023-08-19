import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <main>
                <section className="flex justify-center items-center h-screen">
                    <div className="max-w-md p-4 bg-white shadow-lg rounded-lg">
                        <h1 className="text-2xl font-semibold mb-4">FocusApp Login</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email-address">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <button
                                    onClick={onLogin}
                                    className={`w-full p-2 rounded ${
                                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-sm">{errorMessage}</p>
                            )}
                        </form>

                        <p className="text-sm text-gray-600 mt-2">
                            No account yet?{' '}
                            <NavLink to="/signup" className="text-blue-500">
                                Sign up
                            </NavLink>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Login;
