import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { Orbit, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginStart());
    
    // Simulate API authorization wait time
    setTimeout(() => {
      if (values.email === 'vishwa@stackorbit.com' && values.password === 'password') {
        dispatch(
          loginSuccess({
            name: 'Vishwa Patel',
            email: 'vishwa@stackorbit.com',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
            title: 'Principal DevOps Architect',
          })
        );
        navigate('/');
      } else if (values.email === 'user@stackorbit.com' && values.password === 'password') {
        dispatch(
          loginSuccess({
            name: 'Regular Developer',
            email: 'user@stackorbit.com',
            role: 'user',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
            title: 'SRE Associate',
          })
        );
        navigate('/');
      } else {
        dispatch(loginFailure('Invalid credentials. Use vishwa@stackorbit.com / password'));
      }
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#FFFDF8] dark:bg-[#0A0915] px-4 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -left-64 -top-64 w-[500px] h-[500px] rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 blur-[120px] animate-pulse-glow"></div>
      <div className="absolute -right-64 -bottom-64 w-[500px] h-[500px] rounded-full bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-[120px] animate-pulse-glow"></div>

      <div className="w-full max-w-md relative">
        {/* Brand logo header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-premium mb-4 hover:rotate-12 transition-transform duration-300">
            <Orbit className="h-7 w-7 animate-spin-slow" style={{ animationDuration: '20s' }} />
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-slateText dark:text-white">
            Stack<span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Orbit</span>
          </h1>
          <p className="text-xs text-slate-400 mt-2">Sign in to control your pipeline clusters.</p>
        </div>

        {/* Form card container */}
        <div className="glass-card p-8 rounded-3xl relative border border-slate-200/50 dark:border-slate-800/80 shadow-glass-light dark:shadow-glass-dark">
          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-red-500/10 p-3.5 text-xs text-red-500 border border-red-500/20">
              <AlertCircle className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* Email input field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" /> Workspace Email
                  </label>
                  <div className="relative">
                    <Field
                      name="email"
                      type="email"
                      placeholder="e.g., vishwa@stackorbit.com"
                      className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-brand-slateText outline-none dark:border-slate-800 dark:bg-[#121124]/50 dark:text-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all duration-300"
                    />
                  </div>
                  <ErrorMessage name="email" component="span" className="text-xs text-red-500 font-medium" />
                </div>

                {/* Password input field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5" /> Security Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-brand-slateText outline-none dark:border-slate-800 dark:bg-[#121124]/50 dark:text-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all duration-300"
                    />
                  </div>
                  <ErrorMessage name="password" component="span" className="text-xs text-red-500 font-medium" />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-[#7C3AED] py-3.5 text-sm font-semibold text-white shadow-premium hover:shadow-premiumHover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none mt-2"
                >
                  {isSubmitting || loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      Verify Identity
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Quick instructions container */}
          <div className="mt-6 border-t border-slate-100 dark:border-slate-800/80 pt-6 text-center">
            <p className="text-[10px] text-slate-400">
              Dev accounts: <span className="font-semibold text-brand-primary dark:text-[#A78BFA]">vishwa@stackorbit.com</span> or{' '}
              <span className="font-semibold text-brand-secondary">user@stackorbit.com</span> with password <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-brand-accent">password</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
