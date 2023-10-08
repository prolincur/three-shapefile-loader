/*
 * Copyright (c) 2020-23 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import React from 'react'
import 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Shapefile } from './shapefile'

const URL = '/sample.shp'

function App() {
  const onRenderJson = React.useCallback((obj) => {
    console.log(obj)
  }, [])

  return (
    <div style={{ height: '100vh', background: 'black' }}>
      <Canvas>
        <OrthographicCamera
          makeDefault
          position={[0, 0, 100]}
          left={80}
          right={100}
          top={15}
          bottom={5}
        />
        <ambientLight />
        <OrbitControls enableRotate={false} />
        <React.Suspense fallback={null}>
          <Shapefile onRender={onRenderJson} url={URL} />
        </React.Suspense>
      </Canvas>
    </div>
  )
}

export default App
