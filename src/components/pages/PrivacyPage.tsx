import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Privacy Policy
      </h1>
      <div className="text-xs text-slate-500 mb-8">
        Last updated: November 2026 · Effective Date: January 1, 2026
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Our Core Commitment to Privacy</h2>
          <p>
            KeyNumbers is built with a privacy-by-design ethos. We believe that keyword research and competitive SEO intelligence should not require tracking user browsing behavior or building digital advertising profiles.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Local Storage and Client-Side Data</h2>
          <p>
            When you save keywords, organize custom lists, or review search history, this data is stored strictly in your browser's local storage (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">localStorage</code>). We do not transmit or store your private keyword lists on external databases.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Browser Extension Security</h2>
          <p>
            The KeyNumbers Chrome extension requests only necessary host permissions required to overlay keyword metrics on supported search engine pages. The extension does not record keystrokes, personal passwords, or private account data.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Third-Party Web Services</h2>
          <p>
            When you execute domain security or redirect audits, queries are processed statelessly. We never share query logs with advertising exchanges or data brokers.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Terms of Service
      </h1>
      <div className="text-xs text-slate-500 mb-8">
        Last updated: November 2026
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or utilizing KeyNumbers web tools and browser extensions, you agree to comply with and be bound by these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Accuracy and Disclaimers</h2>
          <p>
            Search volumes, keyword difficulty scores, and estimated CPC values are calculated based on statistical modeling, historical search engine demand distributions, and algorithmic projections. All data is provided "as is" for informational and planning purposes.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Acceptable Use Policy</h2>
          <p>
            You agree not to deploy automated botnets, abusive scraping scripts, or distributed denial-of-service attempts against KeyNumbers infrastructure. Normal API usage via published endpoints is permitted.
          </p>
        </section>
      </div>
    </div>
  );
};
