// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Reusable icon components (Heroicons)
const HeartIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const LeafIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const About = () => {
  const highlights = [
    {
      icon: <HeartIcon />,
      title: 'Comfort First',
      text: 'Breathable uppers, cushioned insoles, and reliable grip.',
    },
    {
      icon: <LeafIcon />,
      title: 'Sustainable Steps',
      text: 'Smart cutting, responsible sourcing, and lighter packaging.',
    },
  ];

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-100/70 via-white to-orange-50/70"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            About <span className="text-orange-500">Comforty</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            A good pair of shoes should set the tone for your day—and we build ours to do exactly that.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-slate mx-auto space-y-6 text-slate-700">
          <p>
            Comforty started a few years ago in a small workshop with a handful of makers and designers
            who simply love building things that last. That same spirit still guides us.
          </p>
          <p>
            We keep our promise to comfort, durability, and clean design in every step—from sketch to
            final check. You’ll find breathable uppers, cushioned insoles, and reliable grip, paired
            with premium leather or performance fabrics. Every pair is checked by hand before it goes
            out the door.
          </p>
          <p>
            Whether you’re headed to work, traveling, celebrating, or just getting the errands done,
            your feet should feel light and supported. Quality shouldn’t demand a markup you have to
            think twice about, so we price fairly and stand by what we make.
          </p>
          <p>
            We listen closely to your feedback and use it to improve the next batch. After your
            purchase, we’re still here with easy size exchanges, quick support, and simple care tips.
            We also work to cut waste through smart cutting, responsible sourcing, and packaging that
            treads lighter.
          </p>
          <p>
            Thank you for walking with us. Comforty is here to be your everyday companion—one
            comfortable step at a time.
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {highlights.map(({ icon, title, text }) => (
              <div
                key={title}
                className="group flex items-start space-x-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition-transform group-hover:scale-110">
                  {icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">Walk with us</h2>
          <p className="mt-4 text-slate-600">
            Ready for everyday comfort?
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center rounded-full bg-orange-500 px-20 py-5 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;