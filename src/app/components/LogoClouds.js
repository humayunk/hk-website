export default function LogoCloud() {
  return (
    <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-xl font-semibold leading-8 text-white font-mono">
          You're in good company
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <img
            alt="Transistor"
            src="../../images/classdojo.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Reform"
            src="../../images/roadmunk.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Tuple"
            src="../../images/shopify.png"
            width={158}
            height={48}
            className="col-span-2 max-h-10 w-full object-contain lg:col-span-1"
          />
          <img
            alt="SavvyCal"
            src="../../images/ruthhealth.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-10 w-full object-contain sm:col-start-2 lg:col-span-1"
          />
        </div>
      </div>
    </div>
  )
}
