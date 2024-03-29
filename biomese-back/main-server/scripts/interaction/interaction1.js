import * as xeogl from 'http://localhost:4000/biomerse/script/xeogl';

// Create a 2x2x2 box centered at the World-space origin
var geometry = new xeogl.Geometry({
    // The primitive type - allowed values are
    // "points", "lines", "line-loop", "line-strip",
    // "triangles", "triangle-strip" and "triangle-fan".
    //
    // See the OpenGL/WebGL specification docs for
    // how the coordinate arrays are supposed to be laid out.
    primitive: "triangles",
    // The vertices - eight for our cube, each
    // one spanning three array elements for X,Y and Z
    positions: [
        // v0-v1-v2-v3 front
        1, 1, 1,
        -1, 1, 1,
        -1, -1, 1,
        1, -1, 1,
        // v0-v3-v4-v1 right
        1, 1, 1,
        1, -1, 1,
        1, -1, -1,
        1, 1, -1,
        // v0-v1-v6-v1 top
        1, 1, 1,
        1, 1, -1,
        -1, 1, -1,
        -1, 1, 1,
        // v1-v6-v7-v2 left
        -1, 1, 1,
        -1, 1, -1,
        -1, -1, -1,
        -1, -1, 1,
        // v7-v4-v3-v2 bottom
        -1, -1, -1,
        1, -1, -1,
        1, -1, 1,
        -1, -1, 1,
        // v4-v7-v6-v1 back
        1, -1, -1,
        -1, -1, -1,
        -1, 1, -1,
        1, 1, -1
    ],
    // Normal vectors, one for each vertex
    normals: [
        // v0-v1-v2-v3 front
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        // v0-v3-v4-v5 right
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        // v0-v5-v6-v1 top
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        // v1-v6-v7-v2 left
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        // v7-v4-v3-v2 bottom
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        // v4-v7-v6-v5 back
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1
    ],
    // UV coords
    uv: [
        // v0-v1-v2-v3 front
        1, 1,
        0, 1,
        0, 0,
        1, 0,
        // v0-v3-v4-v1 right
        0, 1,
        0, 0,
        1, 0,
        1, 1,
        // v0-v1-v6-v1 top
        1, 0,
        1, 1,
        0, 1,
        0, 0,
        // v1-v6-v7-v2 left
        1, 1,
        0, 1,
        0, 0,
        1, 0,
        // v7-v4-v3-v2 bottom
        0, 0,
        1, 0,
        1, 1,
        0, 1,
        // v4-v7-v6-v1 back
        0, 0,
        1, 0,
        1, 1,
        0, 1
    ],
    // Color for each vertex
    colors: [
        /* v0-v1-v2-v3 front
         */
        1.0, 0.0, 0.0, 1.5,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 1.0,
        /* v0-v3-v4-v5 right
         */
        1.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 0.0, 1.0,
        /* v0-v5-v6-v1 top
         */
        1.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        /* v1-v6-v7-v2 left
         */
        1.0, 0.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        /* v7-v4-v3-v2 bottom
         */
        0.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        /* v4-v7-v6-v5 back
         */
        1.0, 0.0, 1.0, 1.0,
        0.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 1.0, 1.0
    ],
    // Indices - these organise the
    // positions and uv texture coordinates
    // into geometric primitives in accordance
    // with the "primitive" parameter,
    // in this case a set of three indices
    // for each triangle.
    //
    // Note that each triangle is specified
    // in counter-clockwise winding order.
    //
    // You can specify them in clockwise
    // order if you configure the Material
    // frontface property as "cw", instead
    // of the default "ccw".
    indices: [
        0, 1, 2, 0, 2, 3,
        // front
        4, 5, 6, 4, 6, 7,
        // right
        8, 9, 10, 8, 10, 11,
        // top
        12, 13, 14, 12, 14, 15,
        // left
        16, 17, 18, 16, 18, 19,
        // bottom
        20, 21, 22, 20, 22, 23
    ]
});
var mesh = new xeogl.Mesh({
    geometry: geometry
});
 mesh.scene.camera.zoom(-5);
mesh.scene.on("tick", function () {
    mesh.scene.camera.orbitYaw(0.2);
    mesh.scene.camera.orbitPitch(0.1);
});

new xeogl.AmbientLight({ color: [1, 1, 1], intensity: 1 });
new xeogl.CameraControl();