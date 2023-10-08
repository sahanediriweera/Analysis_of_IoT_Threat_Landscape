import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            navigate('/login');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            <section className="flex justify-center items-center h-screen">
                <div className="max-w-md p-4 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email-address">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email address"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm Password"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-3">
                            <button
                                type="submit"
                                onClick={onSubmit}
                                className={`w-full p-2 rounded ${
                                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                } text-white`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing up...' : 'Sign up'}
                            </button>
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 text-sm">{errorMessage}</p>
                        )}
                    </form>

                    <p className="text-sm text-gray-600 mt-2">
                        Already have an account?{' '}
                        <NavLink to="/login" className="text-blue-500">
                            Sign in
                        </NavLink>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Signup;
