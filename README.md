
# three-shapefile-loader

**three-shapefile-loader** is a cross platform Shapefile file loader for [THREE.js](https://threejs.org/). It takes URL of a Shapefile file as an input and returns THREE.js [Object3D](https://threejs.org/docs/?q=objec#api/en/core/Object3D) entity. This library works out of the box with cross platform react-native and react-three-fiber as well. It uses [shapefile](https://www.npmjs.com/package/shapefile) library underneath to do heavy-lifting.

#### Install
```
yarn add three-shapefile-loader three
```
or
```
npm i three-shapefile-loader three
```
#### Usage

```javascript

import * as THREE from 'three'
import { ShapefileLoader } from 'three-shapefile-loader'

const loader = new ShapefileLoader();
loader.setColor(0xFF0000);
// loader.setTransform(new THREE.Matrix4());
const scene = new THREE.Scene();
onLoad = (data) => {
    scene.add(data);
}
const onError = (error) => {
  console.log(error);
}
const onProgress = (xhr) => {
  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
}
// url = 'http://to/my/shapefile/file.shp'
loader.load(url, onLoad, onProgress, onError);

// loader.parse(buffer, onLoad, onError);
// promise = loader.parseAsync(buffer)

```

### API 

#### `load(url, onLoad, onProgress, onError)`

Takes url of shapefile as input and invokes `onLoad` when [Object3D](https://threejs.org/docs/?q=objec#api/en/core/Object3D) entity is created. `onProgress` and `onError` are invokes as per the [FileLoader](https://threejs.org/docs/#api/en/loaders/FileLoader) documentation.

#### `parse(shp, onLoad, onError)`

If typeof `shp` is `string`, opens the shapefile from the specified `shp` path. If `shp` instanceof `ArrayBuffer` or `shp` instanceof `Uint8Array`, reads the specified in-memory shapefile. Otherwise, shp must be a [Node readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) in Node or a [WhatWG standard readable stream](https://streams.spec.whatwg.org/#rs) in browsers.

It yields [Object3D](https://threejs.org/docs/?q=objec#api/en/core/Object3D) entity by calling `onLoad` callback or `onError` when failed.

#### `parseAsync(shp)`

If typeof `shp` is `string`, opens the shapefile from the specified `shp` path. If `shp` instanceof `ArrayBuffer` or `shp` instanceof `Uint8Array`, reads the specified in-memory shapefile. Otherwise, shp must be a [Node readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) in Node or a [WhatWG standard readable stream](https://streams.spec.whatwg.org/#rs) in browsers.

It return promise to yield [Object3D](https://threejs.org/docs/?q=objec#api/en/core/Object3D) entity.

#### `parseAsyncToGeoJson(shp)`

If typeof `shp` is `string`, opens the shapefile from the specified `shp` path. If `shp` instanceof `ArrayBuffer` or `shp` instanceof `Uint8Array`, reads the specified in-memory shapefile. Otherwise, shp must be a [Node readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) in Node or a [WhatWG standard readable stream](https://streams.spec.whatwg.org/#rs) in browsers.

It return promise to yield [GeoJSON](https://www.rfc-editor.org/rfc/rfc7946.html) object.

### Author

[Prolincur Technologies](https://prolincur.com)
