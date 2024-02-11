/*
 * Copyright (c) 2020-23 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import * as THREE from 'three'
import * as Shapefile from 'shapefile'
import { GeoJsonLoader } from 'three-geojson-loader'

class ShapefileLoader extends THREE.FileLoader {
  constructor(manager) {
    super(manager)
    this.color = 0xffffff
    this.transform = new THREE.Matrix4()
    this.responseType = 'arraybuffer'
  }

  setColor(color) {
    this.color = color
    return this
  }

  setTransform(transform) {
    if (transform instanceof THREE.Matrix4) {
      this.transform = transform
    }
    return this
  }

  load(url, onLoad, onProgress, onError) {
    const scope = this
    return super.load(
      url,
      (buffer) => {
        try {
          scope.parse(buffer, onLoad, onError)
        } catch (error) {
          onError(error)
        }
      },
      onProgress,
      onError
    )
  }

  parse(buffer, onLoad, onError) {
    this.parseAsync(buffer).then(onLoad).catch(onError)
  }

  async parseAsync(buffer) {
    const scope = this
    const geojson = await scope.parseAsyncToGeoJson(buffer)
    if (!geojson) return null

    const loader = new GeoJsonLoader()
    loader.setColor(scope.color)
    loader.setTransform(scope.transform)

    return loader.parse(geojson)
  }

  async parseAsyncToGeoJson(buffer) {
    if (!buffer) return null

    const source = await Shapefile.open(buffer)
    if (!source) return null

    const result = await source.read()
    const recursiveRead = async (result, outcome = []) => {
      if (result.done) return
      outcome.push(result.value)
      const data = await source.read()
      await recursiveRead(data, outcome)
    }

    const features = []
    await recursiveRead(result, features)

    return {
      type: 'FeatureCollection',
      features,
    }
  }
}

export { ShapefileLoader }
