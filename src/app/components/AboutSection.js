import { CursorArrowRaysIcon, BoltIcon, FunnelIcon, CubeIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Idea Validation',
    description:
      'Prototype and validate your idea with real users. Get feedback on your product and make data-driven decisions.',
    icon: BoltIcon,
  },
  {
    name: 'Product Design',
    description:
      'Go from sticky notes to wires or jump staright to creating a light design system and protoyping with high-fidelity mocks.',
    icon: CubeIcon,
  },
  {
    name: 'Design Engineering',
    description:
      'Comfortable getting hands dirty with React, Next.js, TailwindCSS, Vercel and more.',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Landing Pages',
    description:
      'Create high-converting landing pages that drive signups and sales. Optimize your site for search engines and performance.',
    icon: FunnelIcon,
  },
]

export default function AboutSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-mono">
            What I Do
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Supercharge your growth team with a versatile expert who excels at brainstorming, prototyping in Figma, and deploying code to production.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 font-mono">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center  bg-black">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
