import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Save, Bell, Globe, Shield, Database } from 'lucide-react';

const SettingsSchema = Yup.object().shape({
  workspaceName: Yup.string()
    .min(3, 'Workspace name is too short!')
    .max(50, 'Workspace name is too long!')
    .required('Workspace name is required'),
  apiRateLimit: Yup.number()
    .min(10, 'Minimum limit must be at least 10 req/min')
    .max(10000, 'Maximum limit is 10,000 req/min')
    .required('Rate limit threshold is required'),
  contactEmail: Yup.string()
    .email('Invalid email address')
    .required('Contact email is required'),
  enableClusterNotifications: Yup.boolean(),
  maintenanceMode: Yup.boolean(),
});

function Settings() {
  const initialValues = {
    workspaceName: 'StackOrbit Hub',
    apiRateLimit: 120,
    contactEmail: 'security@stackorbit.com',
    enableClusterNotifications: true,
    maintenanceMode: false,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-slateText dark:text-white md:text-4xl">
          System Preferences
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Configure API thresholds, rate limits, workspace variables, and security options.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={SettingsSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-8">
            {/* Form grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left pane - configurations */}
              <div className="lg:col-span-2 space-y-6">
                {/* General Settings Card */}
                <div className="glass-card p-6 rounded-2xl space-y-4">
                  <h3 className="font-display font-bold text-brand-slateText dark:text-white flex items-center gap-2">
                    <Globe className="h-5 w-5 text-brand-primary" />
                    General Configuration
                  </h3>

                  <div className="space-y-4">
                    {/* Workspace name field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase">Workspace Name</label>
                      <Field
                        name="workspaceName"
                        type="text"
                        className="rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-brand-slateText outline-none dark:border-slate-800 dark:bg-[#121124]/50 dark:text-slate-200 focus:border-brand-primary transition-all duration-300"
                      />
                      <ErrorMessage name="workspaceName" component="span" className="text-xs text-red-500 font-medium" />
                    </div>

                    {/* Contact email field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase">System Security Contact</label>
                      <Field
                        name="contactEmail"
                        type="email"
                        className="rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-brand-slateText outline-none dark:border-slate-800 dark:bg-[#121124]/50 dark:text-slate-200 focus:border-brand-primary transition-all duration-300"
                      />
                      <ErrorMessage name="contactEmail" component="span" className="text-xs text-red-500 font-medium" />
                    </div>
                  </div>
                </div>

                {/* API Parameters */}
                <div className="glass-card p-6 rounded-2xl space-y-4">
                  <h3 className="font-display font-bold text-brand-slateText dark:text-white flex items-center gap-2">
                    <Database className="h-5 w-5 text-brand-secondary" />
                    API Performance
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Rate Limit Threshold (req/min)</label>
                    <Field
                      name="apiRateLimit"
                      type="number"
                      className="rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-brand-slateText outline-none dark:border-slate-800 dark:bg-[#121124]/50 dark:text-slate-200 focus:border-brand-primary transition-all duration-300"
                    />
                    <ErrorMessage name="apiRateLimit" component="span" className="text-xs text-red-500 font-medium" />
                  </div>
                </div>
              </div>

              {/* Right pane - toggles */}
              <div className="space-y-6">
                {/* Security and notification toggles */}
                <div className="glass-card p-6 rounded-2xl space-y-6">
                  <h3 className="font-display font-bold text-brand-slateText dark:text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-brand-accent" />
                    Policy Switches
                  </h3>

                  {/* Toggle 1 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-brand-slateText dark:text-slate-200 uppercase">Cluster Alerts</h4>
                      <p className="text-[10px] text-slate-400">Dispatch messages on node warnings.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={values.enableClusterNotifications}
                        onChange={() => setFieldValue('enableClusterNotifications', !values.enableClusterNotifications)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-primary/20 dark:bg-slate-750 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-650 peer-checked:bg-brand-primary"></div>
                    </label>
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-brand-slateText dark:text-slate-200 uppercase">Maintenance Mode</h4>
                      <p className="text-[10px] text-slate-400">Lock database changes and write accesses.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={values.maintenanceMode}
                        onChange={() => setFieldValue('maintenanceMode', !values.maintenanceMode)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-secondary/20 dark:bg-slate-750 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-650 peer-checked:bg-brand-secondary"></div>
                    </label>
                  </div>
                </div>

                {/* Info alert banner card */}
                <div className="glass-card p-6 rounded-2xl flex gap-3 border-l-4 border-l-brand-primary bg-brand-primary/5">
                  <Bell className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-slateText dark:text-slate-200 uppercase">Propagation Delay</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      Adjustments to security policies could require up to 5 minutes to propagate to peripheral nodes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save footer */}
            <div className="flex items-center justify-end border-t border-slate-100 dark:border-slate-800/80 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-[#7C3AED] px-6 py-3 text-sm font-semibold text-white shadow-premium hover:shadow-premiumHover transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Syncing...' : 'Commit Configuration'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Settings;
