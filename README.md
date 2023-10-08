
# three-shapefile-loader

**three-shapefile-loader** is a cross platform Shapefile file loader for [THREE.js](https://threejs.org/). It takes URL of a Shapefile file as an input and returns THREE.js Object3D entities. This library works out of the box with cross platform react-native and react-three-fiber as well. It uses [shapefile](https://www.npmjs.com/package/shapefile) library underneath to do heavy-lifting.

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

```

### Author

[Prolincur Technologies](https://prolincur.com)
