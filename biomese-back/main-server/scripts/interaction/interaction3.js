import {Viewer} from '../xeokit-sdk/src/viewer/Viewer.js';
import {OBJLoaderPlugin} from "../xeokit-sdk/src/plugins/OBJLoaderPlugin/OBJLoaderPlugin.js";

const viewer = new Viewer({
    canvasId: "myCanvas"
});

const objLoader = new OBJLoaderPlugin(viewer);

const cube = objLoader.load({
    id: "cube",
    src: "/models/square/square.obj",
    position: [-5, -1, 0],
});

export {cube};

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