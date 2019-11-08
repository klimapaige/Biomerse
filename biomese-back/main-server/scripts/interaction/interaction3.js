


import {Viewer} from '../xeokit-sdk/src/viewer/Viewer.js';
import {Node} from "../xeokit-sdk/src/viewer/scene/nodes/Node.js";
import {OBJLoaderPlugin} from "../xeokit-sdk/src/plugins/OBJLoaderPlugin/OBJLoaderPlugin.js";
import {GLTFLoaderPlugin} from "../xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin.js";
import {Mesh} from "../xeokit-sdk/src/viewer/scene/mesh/Mesh.js";
import {buildPlaneGeometry} from "../xeokit-sdk/src/viewer/scene/geometry/builders/buildPlaneGeometry.js";
import {ReadableGeometry} from "../xeokit-sdk/src/viewer/scene/geometry/ReadableGeometry.js";
import {PhongMaterial} from "../xeokit-sdk/src/viewer/scene/materials/PhongMaterial.js";

const viewer = new Viewer({
    canvasId: "myCanvas"
});

const objLoader = new OBJLoaderPlugin(viewer);
const gltfLoader = new GLTFLoaderPlugin(viewer);

const cube = objLoader.load({
    id: "cube",
    src: "/models/square/square.obj",
    position: [-5, -1, 0],
});

// const ground =  new Mesh(viewer.scene, {
//     id: "myGroundPlane",
//     geometry: new ReadableGeometry(viewer.scene, buildPlaneGeometry({
//         xSize: 500,
//         zSize: 500
//     })),
//     material: new PhongMaterial(viewer.scene, {
//         diffuse: [0.4, 1.0, 0.4],
//         backfaces: true
//     }),
//     position: [0, -1.0, 0],
//     pickable: false,
//     collidable: false
// });