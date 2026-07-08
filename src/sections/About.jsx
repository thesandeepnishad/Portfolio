import React, { useRef } from 'react'
import GradientSphares from '../components/GradientSphares'
import TitleHeader from '../components/TitleHeader'
import { Canvas, useFrame } from '@react-three/fiber'
import { CuteRobot } from '../../public/models/Cute_robot'
import { Alien } from '../../public/models/Alien'
import { OrbitControls } from '@react-three/drei'
import { div } from 'three/tsl'
import { bentoSocialLinks } from '../constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useInView, { isMobile, isTouchDevice } from '../useInView'
gsap.registerPlugin(ScrollTrigger)

const BouncingAlien = () => {
    const groupRef = useRef()

    useFrame(({ clock }) => {
        if (groupRef.current) {
            // Smooth up-and-down bounce
            groupRef.current.position.y = -5.5 + Math.abs(Math.sin(clock.elapsedTime * 2)) * 0.6
        }
    })

    return (
        <group ref={groupRef} position={[0, -5.5, 0]}>
            <Alien scale={2} rotation={[0, -0.5, 0]} />
        </group>
    )
}

const About = () => {
    const [canvasRef, canvasInView] = useInView()

    useGSAP(() => {
        gsap.from("#card", {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: "#about",
                start: "top 60%",
            }
        });

        gsap.from(".animated-text", {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: "#about",
                start: "top 60%",
            }
        })
    }, []);
  return (
    <section id='about' className='flex-center relative'>
        <GradientSphares sphare1Class={"about-gradient-sphere about-sphere-1"} sphare2Class={"about-gradient-sphere about-sphere-2"}/>
        <div className="container w-full h-full md:my-40 my-20">
            <TitleHeader title="About Me" subtext="A brief introduction about me" number="01"/>
            <div className="md:mt-20 mt-10">
                <div className="grid grid-cols-12 md:grid-rows-12 gap-5">
                    <div className="md:col-span-7 col-span-12 row-span-5">
                        <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                            <div className='flex items-center gap-2 w-full'>
                                <img src="/images/nano.png" alt="flower" className='md:w-32 w-16' />
                                <div className=''>
                                    <h2 className='text-blue-50 md:text-5xl text-3xl animated-text'>Hi, I'm Sandeep</h2>
                                </div>
                            </div>
                            
                            <div className='mt-5'>
                                <h1 className='text-blue-50 md:text-4xl text-3xl animated-text'> a Shopify Developer</h1>
                                <p className='md:text-2xl mt-2 animated-text'>
                                I enjoy building Shopify stores that are fast, easy to use, and built to scale. Over the past few years, I've worked on custom themes, app integrations, performance optimization, and features that solve real business problems. I like writing clean, maintainable code and turning ideas into shopping experiences that people actually enjoy using
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <CuteRobot /> */}
                    <div className="md:col-span-5 col-span-12 row-span-5">
                        <div ref={canvasRef} className="about-model-bg hover:cursor-grab rounded-2xl md:h-full h-60 w-full">
                            <Canvas
                                className='w-full h-full'
                                dpr={[1, isMobile ? 1.5 : 2]}
                                frameloop={canvasInView ? 'always' : 'never'}
                                gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
                            >
                                {/* OrbitControls hijacks one-finger touch drags and blocks page scroll on mobile */}
                                {!isTouchDevice && <OrbitControls enableZoom={false} enablePan={false} />}
                                {/* <CuteRobot scale={2} position={[0, -3, 0]} rotation={[0, 5, 0]} /> */}
                                <BouncingAlien />
                            </Canvas>
                        </div>
                    </div>
                {/* web design card */}
                <div id='card' className="md:col-span-6 col-span-12 row-span-3">
                    <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                        <div className='flex flex-col h-full justify-center gap-2'>
                            <h1 className='gradient-title md:text-3xl text-2xl font-medium animated-text'>Shopify Theme Development</h1>
                            <p className='md:text-2xl animated-text'>
                            I build custom Shopify themes with a strong focus on performance, responsive design, and clean, maintainable code. From custom sections and product pages to advanced storefront features, I create shopping experiences that are fast, scalable, and easy to manage.
                            </p>
                        </div>
                    </div>
                </div>
                {/* web design card */}
                <div id='card' className="md:col-span-6 col-span-12 row-span-3">
                    <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                        <div className='flex flex-col h-full justify-center gap-2'>
                            <h1 className='gradient-title md:text-3xl text-2xl font-medium animated-text'>Shopify App</h1>
                            <p className='md:text-2xl animated-text'>I have experience working with Shopify APIs, React, Remix, and custom app functionality. I build practical solutions that extend Shopify stores and help automate business workflows.</p>
                        </div>
                    </div>
                </div>
                {/* web design card */}
                <div id='card' className="md:col-span-4 col-span-12 row-span-4">
                    <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                        <div className="flex flex-col justify-around h-full">
                            <h1 className="gradient-title md:text-4xl text-3xl font-bold">
                                BE YOURSELF!
                            </h1>
                            <h1 className="gradient-title md:text-4xl text-3xl font-bold">
                                BE DIFFERENT!
                            </h1>
                            <h1 className="gradient-title md:text-4xl text-3xl font-bold">
                                BUILD DIFFERENT!
                            </h1>
                         </div>
                    </div>
                </div>
                {/* social links */}
                {bentoSocialLinks.map((item, index) => (
                    <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="md:col-span-4 col-span-12 row-span-2">
                        <div className="bg-black-300 rounded-2xl p-7 w-full h-full group cursor-pointer">
                        <div className="flex justify-between items-center h-full">
                            <div className="flex items-center md:gap-5">
                            <img src={item.icon} alt={item.icon} />
                            <h1 className="gradient-title md:text-3xl text-xl md:m-0 ms-5 font-medium">
                                {item.name}
                            </h1>
                            </div>
                            <div className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                            <img
                                src="/images/arrowupright.svg"
                                alt="arrow-up"
                                className="md:scale-100 scale-50"
                            />
                            </div>
                        </div>
                        </div>
                    </a>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default About