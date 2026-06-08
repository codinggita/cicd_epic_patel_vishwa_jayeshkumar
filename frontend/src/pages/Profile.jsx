import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updateProfile } from '../store/authSlice';
import { Shield, Sparkles, Mail, User, Terminal, Check } from 'lucide-react';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  title: Yup.string().required('Job title is required'),
});

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(updateProfile(values));
    setSubmitting(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-slateText dark:text-white md:text-4xl">
          Identity Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Personal identity specifications, access privileges, and connected system certificates.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Card - visual profile card */}
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-between text-center relative overflow-hidden group">
          {/* Neon accent orb background decorative */}
          <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-brand-primary/10 blur-2xl group-hover:bg-brand-primary/20 transition-all duration-500"></div>
          <div className="absolute -left-24 -bottom-24 h-48 w-48 rounded-full bg-brand-secondary/5 blur-2xl group-hover:bg-brand-secondary/15 transition-all duration-500"></div>

          <div className="w-full flex flex-col items-center">
            {/* Avatar frame */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-primary via-[#7C3AED] to-[#14B8A6] opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-300"></div>
              <img
                src={user?.avatar}
                alt={user?.name}
                className="relative h-28 w-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-lg"
              />
            </div>

            <h3 className="font-display text-xl font-bold text-brand-slateText dark:text-white mt-6">
              {user?.name}
            </h3>
            <p className="text-xs font-medium text-slate-400 mt-1">{user?.title}</p>

            <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary dark:bg-brand-primary/20 dark:text-[#A78BFA]">
              <Shield className="h-3 w-3" />
              Role: {user?.role}
            </span>
          </div>

          <div className="mt-8 w-full border-t border-slate-100 dark:border-slate-800/80 pt-6 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Status</span>
              <span className="font-semibold text-brand-secondary flex items-center gap-1">
                <Check className="h-3 w-3" /> Enabled
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Access Key</span>
              <span className="font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                so_live_**94a2
              </span>
            </div>
          </div>
        </div>

        {/* Right card - profile editor Form */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-secondary" />
            <h3 className="font-display font-bold text-brand-slateText dark:text-white">
              Identity Detail Parameters
            </h3>
          </div>

          <Formik
            initialValues={{
              name: user?.name || '',
              title: user?.title || '',
            }}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> Full Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className="rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-brand-slateText outline-none dark:border-slate-800 dark:bg-[#121124]/50 dark:text-slate-200 focus:border-brand-primary transition-all duration-300"
                    />
                  </div>

                  {/* Title field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1">
                      <Terminal className="h-3.5 w-3.5" /> Title
                    </label>
                    <Field
                      name="title"
                      type="text"
                      className="rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-brand-slateText outline-none dark:border-slate-800 dark:bg-[#121124]/50 dark:text-slate-200 focus:border-brand-primary transition-all duration-300"
                    />
                  </div>

                  {/* Readonly email field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Security Email
                    </label>
                    <input
                      type="text"
                      value={user?.email}
                      disabled
                      className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-400 dark:border-slate-800/80 dark:bg-slate-900/50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex justify-end border-t border-slate-100 dark:border-slate-800/80 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white shadow-premium hover:shadow-premiumHover transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    Update Profile
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Profile;
