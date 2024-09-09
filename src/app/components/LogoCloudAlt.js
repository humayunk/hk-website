export default function Example() {
  return (
    <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="my-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-mono text-center">Brands I&apos;ve Worked With</h2>
        <div className="-mx-6 mt-16 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
          <div className="bg-gray-950 p-8 sm:p-10">
            <img
              alt="ClassDojo"
              src="images/classdojo.svg"
              width={120}
              height={36}
              className="max-h-9 w-full object-contain"
            />
          </div>
          <div className="bg-gray-950 p-6 sm:p-10">
            <img
              alt="Shopify"
              src="images/shopify.png"
              width={158}
              height={48}
              className="max-h-12 w-full object-contain"
            />
          </div>
          <div className="bg-gray-950 p-6 sm:p-10">
            <img
              alt="Roadmunk"
              src="images/roadmunk.svg"
              width={120}
              height={36}
              className="max-h-9 w-full object-contain"
            />
          </div>
          <div className="bg-gray-950 p-6 sm:p-10">
            <img
              alt="RuthHealth"
              src="images/ruthhealth.svg"
              width={158}
              height={48}
              className="max-h-12 w-full object-contain"
            />
          </div>
          <div className="bg-gray-950 p-6 sm:p-10">
            <img
              alt="Applied Materials"
              src="images/applied-materials.svg"
              width={158}
              height={48}
              className="max-h-12 w-full object-contain"
            />
          </div>
          <div className="bg-gray-950 p-6 sm:p-10">
            <img
              alt="Yara International"
              src="images/yara.svg"
              width={158}
              height={48}
              className="max-h-16 w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
