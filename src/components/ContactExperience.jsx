import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import { ContactBoy } from './Contactsandeep'
import useInView, { isMobile } from '../useInView'

const ContactExperience = () => {
  const [ref, inView] = useInView()

  return (
    <div ref={ref} className='w-full h-full'>
      <Canvas
        camera={{ position: [0, 1, 10], fov: 40 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        frameloop={inView ? 'always' : 'never'}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1} color={"#ffffff"} />
        <directionalLight position={[-4, 6, 5]} intensity={3} color={"#ffffff"} />
        <directionalLight position={[4, 2, 3]} intensity={1.5} color={"#ffffff"} />

        <group position={[1.2, 0, 0]}>
          <Center position={[0, -2.5, -4]}>
            <Text3D
              curveSegments={isMobile ? 8 : 32}
              bevelEnabled
              bevelSize={0.06}
              bevelThickness={0.15}
              height={1}
              letterSpacing={0.08}
              size={1.4}
              font={"/font/Inter_Bold.json"}
            >
              Hello!
              <meshPhysicalMaterial
                color={"#00B3B3"}
                emissive={"#00CCCC"}
                emissiveIntensity={0.7}
                roughness={0.05}
                metalness={1}
                clearcoat={1}
                clearcoatRoughness={0.05}
                reflectivity={1}
              />
            </Text3D>
          </Center>

          <ContactBoy scale={2.5} position={[0, -3, 0]} rotation={[0, 6, 0]} />
        </group>
      </Canvas>
    </div>
  )
}

export default ContactExperience
