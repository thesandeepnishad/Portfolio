import React from 'react'
import GradientSphares from '../components/GradientSphares'
import HeroExperience from '../components/HeroExperience'
import ErrorBoundary from '../components/ErrorBoundary'
const Hero = () => {
  return (
    <section id='home' className='text-white-50 h-dvh relative'>
        <GradientSphares sphare1Class={"gradient-sphere sphere-1"} sphare2Class={"gradient-sphere sphere-2"}/>
        <div className="w-full h-full flex-center">
            <div className='container relative h-full w-full'>
                <div className='md:mt-40 mt-20'>
                    <p className="font-medium md:text-2xl text-base">
                        Hey, I'm Here
                    </p>
                    <h1 className='font-bold md:text-9xl text-5xl'>Sandeep</h1>
                    <h1 className='font-bold md:text-9xl text-5xl'>Shopify</h1>
                </div>
                <div className="absolute w-full z-30 bottom-20 right-0 px-5 md:px-10 xl:px-16">
                    <div className="flex justify-between items-end">
                        <div className='flex flex-col items-center md:gap-5 gap-1'>
                            <p className='md:text-base text-xs'>Explore</p>
                            <img className='size-7 animate-bounce' src="images/arrowdown.svg" alt="" />
                        </div>
                        <div className='flex flex-col items-end'>
                            <img src="images/shape.svg" alt="shapeS" />
                            <h1 className='font-bold md:text-9xl text-5xl'>Developer</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full h-full absolute inset-0'>
            <ErrorBoundary>
              <HeroExperience />
            </ErrorBoundary>
        </div>
    </section>
  )
}

export default Hero