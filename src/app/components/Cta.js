import Button from './Button';

export default function Example() {
  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-mono">
            Have a project? Let's talk.
          </h2>
          <p className="mx-auto my-6 max-w-xl text-lg leading-8 text-gray-600">
            I'm currently available for full-time and contract work. Slide in my inbox. I'll get back to you within 24 hours.
          </p>
          <Button />
        </div>
      </div>
    </div>
  )
}
