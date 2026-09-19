import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Register() {
  const navigate = useNavigate();
  return <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6"><div className="w-full max-w-md rounded-2xl bg-white/10 border border-white/10 p-8"><h1 className="text-2xl font-semibold">Create Account</h1><p className="mt-2 text-sm text-slate-300">Registration is available through the demo sign-in flow.</p><button onClick={() => navigate('/signin')} className="mt-6 w-full rounded-lg bg-white px-4 py-3 font-medium text-slate-950">Continue to Sign In</button><Link to="/" className="mt-4 block text-center text-sm text-slate-300">Back to home</Link></div></main>;
}
