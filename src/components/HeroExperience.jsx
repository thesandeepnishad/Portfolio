import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { Herosandeep } from './Herosandeep'
import palette from '../colors'
import useInView, { isMobile } from '../useInView'

const HeroExperience = () => {
  const [ref, inView] = useInView()

  return (
    <div ref={ref} className='w-full h-full'>
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        frameloop={inView ? 'always' : 'never'}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
      >
        <ambientLight />
        <directionalLight position={[-2, 0, 3]} intensity={3} color={palette.glow1} />
        <directionalLight position={[2, 0, 3]} intensity={3} color={palette.accent} />
        <Sparkles count={isMobile ? 40 : 100} scale={[10, 10, 2]} size={2} speed={0.5} color={palette.spark} />
        <group>
          <Herosandeep scale={9} position={[0, -15, 0]} />
        </group>
      </Canvas>
    </div>
  )
}

export default HeroExperience
