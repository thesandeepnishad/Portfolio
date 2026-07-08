import React from 'react'
import TitleHeader from '../components/TitleHeader'
import ContactForm from '../components/ContactForm'
import ContactExperience from '../components/ContactExperience'
import ErrorBoundary from '../components/ErrorBoundary'
const Contact = () => {
  return (
    <section id="contact" className="flex-center relative">
      <div className="w-full h-full container md:my-40 my-20">
        <TitleHeader
          title="Contact Me"
          number="05"
          subtext="Have a project in mind or need a Shopify developer? Let's build something great together."
        />
        <div className="mt-20">
          <div className="grid grid-cols-12">
            <div className="md:col-span-5 col-span-12 md:order-none order-1 relative z-10">
              <ContactForm />
            </div>
            <div className="md:col-span-7 col-span-12">
              <div className="w-full md:w-auto md:h-full h-96 md:absolute top-0 md:left-96 md:right-0 left-0 md:m-0 -mt-32">
                <ErrorBoundary>
                  <ContactExperience />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact