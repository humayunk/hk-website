export default function Example() {
  return (
    <section className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
            <img alt="" src="/images/ruthhealth.svg" className="h-12 self-start" />
            <figure className="mt-10 flex flex-auto flex-col justify-between">
              <blockquote className="text-lg leading-8 text-white">
                <p>
                  &quot;Humayun took our MVP functionality and updated brand guidelines to create a design system and product experience we could be proud of from the ground up while keeping both the new and aspiring mothers we work with firmly in mind. And that too at a rapid clip as he iterated through the various design stages while incorporating stakeholder feedback. He&apos;d be a valuable addition to any early-stage start-up.&quot;
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-x-6">
                <img
                  alt=""
                  src="/images/ag.jpeg"
                  className="h-14 w-14 rounded-full bg-gray-800"
                />
                <div className="text-base">
                  <div className="font-semibold text-white">Alison Greenberg</div>
                  <div className="mt-1 text-gray-400">Co-Founder & CEO, RuthHealth</div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="flex flex-col border-t border-white/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
            <img alt="" src="/images/ambry.svg" className="h-12 self-start" />
            <figure className="mt-10 flex flex-auto flex-col justify-between">
              <blockquote className="text-lg leading-8 text-white">
                <p>
                &quot;Humayun&apos;s design expertise has been invaluable in improving the Ambry Care Platform for Oncology and COVID-19. He worked closely with all the stakeholders to ensure that the patient, provider, and reporting platforms are user-friendly and meets the business objectives in a short amount of time.&quot;
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-x-6">
                <img
                  alt=""
                  src="/images/kennywong.png"
                  className="h-14 w-14 rounded-full bg-gray-800"
                />
                <div className="text-base">
                  <div className="font-semibold text-white">Kenny Wong</div>
                  <div className="mt-1 text-gray-400">Ex-VP Product, Ambry Genetics</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
