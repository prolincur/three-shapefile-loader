/*
 * Copyright (c) 2020-23 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useLoader } from '@react-three/fiber'
import { ShapefileLoader } from 'three-shapefile-loader'

function Shapefile({ url, onRender }) {
  const group = useLoader(ShapefileLoader, url)
  React.useEffect(() => {
    if (group) {
      onRender(group)
    }
  }, [group, onRender])

  if (!url) return null
  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={group} />
}

Shapefile.propTypes = {
  url: PropTypes.string,
}

Shapefile.defaultProps = {
  url: '',
}

export { Shapefile }
