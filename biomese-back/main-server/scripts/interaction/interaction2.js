var geometry = new xeogl.TorusGeometry({
    radius: 1.0,
    tube: 0.3
});
var img1 = new Image(); // Image constructor
img1.src = "http://localhost:4200/bioImages/texture/UVMap.png";
var img2 = new Image(); // Image constructor
img2.src = "http://localhost:4200/bioImages/texture/roughGoldTexture.jpg";
var material = new xeogl.MetallicMaterial({
    baseColorMap: new xeogl.Texture({
        image: img1
    }),
    roughnessMap: new xeogl.Texture({
        image: img2
    })
});

var mesh = new xeogl.Mesh({
    geometry: geometry,
    material: material,
    position: [0, 0, 10]
});
mesh.visible = true; 