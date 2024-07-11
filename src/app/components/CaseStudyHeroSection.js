import React from 'react';

export default function CaseStudyHeroSection({ title, description, image, video, tags }) {
  return (
    <div className="bg-white">
      <div className="relative isolate pt-14">
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-mono">
                {title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {description}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {tags.map(tag => (
                  <span key={tag} className="bg-black text-white px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2">
                {video ? (
                  <video
                    loop
                    autoPlay
                    muted
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10 w-full"
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    alt="App screenshot"
                    src={image}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
