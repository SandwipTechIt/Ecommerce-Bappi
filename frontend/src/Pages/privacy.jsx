// src/pages/PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <main className="bg-slate-50 text-slate-800">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Policy Body */}
        <article className="prose prose-lg prose-slate mx-auto mt-14 space-y-8 text-slate-700">
          <p>
            This notice explains what information Comforty (“we,” “us,” “our”) collects, how we use it,
            who we share it with, and the choices you have. By using our website or any online service
            we provide, you agree to this policy.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Information we collect</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Account &amp; order details:</strong> name, delivery address, email, phone
                number, and order history.
              </li>
              <li>
                <strong>Payment details:</strong> we accept 100% Cash on Delivery. We do not collect
                or store card or mobile wallet information.
              </li>
              <li>
                <strong>Technical &amp; usage data:</strong> device and browser information, IP
                address, cookie IDs, pages viewed, clicks, and session logs.
              </li>
              <li>
                <strong>Communications:</strong> messages you send us (chat/email), reviews, feedback,
                and support requests.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">How we use your information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To process orders, arrange delivery, and handle returns/exchanges</li>
              <li>To provide customer support and manage your account</li>
              <li>
                To improve performance, security, and user experience (including analytics and limited
                testing)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Cookies &amp; similar technologies</h2>
            <p>
              We use essential cookies (for login/cart), performance/analytics cookies, and sometimes
              marketing cookies. You can control cookies in your browser settings and, where
              available, via our “Cookie Settings” link.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">When we share information</h2>
            <p>We do not sell your personal information. We share it only with:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Service providers:</strong> trusted partners that help with delivery/courier
                services, website hosting, analytics, and customer support—under contracts that limit
                their use of your data.
              </li>
              <li>
                <strong>Legal reasons:</strong> when required to comply with applicable laws or valid
                requests from authorities.
              </li>
              <li>
                <strong>Business changes:</strong> if we undergo a merger or acquisition, subject to
                comparable confidentiality and protection.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Data retention</h2>
            <p>
              We keep personal data only as long as needed for the purposes above and to meet legal
              or accounting requirements. After that, we delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Security</h2>
            <p>
              We use reasonable technical and organizational measures—encryption in transit where
              applicable, access controls, and routine monitoring. No online system is 100% secure,
              so please use strong passwords and keep your devices protected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Your rights</h2>
            <p>
              Depending on your location, you may have the right to access, update/correct, delete,
              restrict or object to processing, and opt out of marketing. Email us and we’ll respond
              within a reasonable time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Children’s privacy</h2>
            <p>
              Our services aren’t directed to children under 13, and we don’t knowingly collect their
              data. If we learn we have, we’ll delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">International transfers</h2>
            <p>
              Our servers and providers may be located in other countries. Where required, we use
              lawful safeguards for these transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Changes to this policy</h2>
            <p>
              We may update this policy from time to time. If we make significant changes, we’ll post
              a notice on the site and update the date above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Contact us</h2>
            <p>
              For any privacy questions or requests, email{' '}
              <a
                href="mailto:comfortylife@gmail.com"
                className="font-medium text-orange-600 hover:underline"
              >
                comfortylife@gmail.com
              </a>
              .
            </p>
          </section>
        </article>
      </section>
    </main>
  );
};

export default PrivacyPolicy;