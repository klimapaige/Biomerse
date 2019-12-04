import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import { OBJLoader2 } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js'
function main() {
    const canvas = document.getElementById('myCanvas');
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    const renderer = new THREE.WebGLRenderer({ canvas });
    const fov = 45;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(7, 7, 7);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x64A9A4);

    {
        const color = 0xEEEEEE;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, .75);
        light.position.set(1, 0, 0);
        scene.add(light);
        const light2 = new THREE.DirectionalLight(color, .75);
        light2.position.set(0, 1, 0);
        scene.add(light2);
        const light3 = new THREE.DirectionalLight(color, .50);
        light3.position.set(0, 0, 1);
        scene.add(light3);
        const light4 = new THREE.DirectionalLight(color, .75);
        light4.position.set(-1, 0, 0);
        scene.add(light4);
        const light5 = new THREE.DirectionalLight(color, .75);
        light5.position.set(0, -1, 0);
        scene.add(light5);
        const light6 = new THREE.DirectionalLight(color, .5);
        light6.position.set(0, 0, -1);
        scene.add(light6);
    }

    function formatInfo(title, body) {
        return `<div class='infoTitle'>${title}</div><div>${body}</div>`
    }

    function lipidBilayerClick() {
        var body = `lipid`;
        const info = document.getElementById('info');
        info.innerHTML = formatInfo('Lipid Bilayer', body);
    }
    function potassiumClick() {
        var body = `potassium.`;
        const info = document.getElementById('info');
        info.innerHTML = formatInfo('Potassium', body);
    }
    function potassiumPumpClick() {
        var body = `potassiumPump`;
        const info = document.getElementById('info');
        info.innerHTML = formatInfo('Potassium Pump', body);
    }
    function sodiumClick() {
        var body = `sodium`;
        const info = document.getElementById('info');
        info.innerHTML = formatInfo('Sodium', body);
    }
    function sodiumPumpClick() {
        var body = `sodiumPump`;
        const info = document.getElementById('info');
        info.innerHTML = formatInfo('Sodium Pump', body);

    }
    function atpPhosphateClick() {
        var body = `atp`;
        const info = document.getElementById('info');
        info.innerHTML = formatInfo('ATP (Adenosine triphosphate) - Phosphate', body);

    }
    function atpAdenosineClick() {
        var body = `atp`;
        const info = document.getElementById('info');
        info.innerHTML = formatInfo('ATP (Adenosine triphosphate) - Adenosine', body);

    }
    function generalClick() {
        const body = `sodiumPotassiumPump `
        const info = document.getElementById('info');
        info.innerHTML = formatInfo('Sodium Potassium Pump', body);
    }
    generalClick();


    {

        var meshObjects = [];

        function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
            const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
            const halfFovY = THREE.Math.degToRad(camera.fov * .5);
            const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
            // compute a unit vector that points in the direction the camera is now
            // in the xz plane from the center of the box
            const direction = (new THREE.Vector3())
                .subVectors(camera.position, boxCenter)
                .multiply(new THREE.Vector3(1, 0, 1))
                .normalize();

            // move the camera to a position distance units way from the center
            // in whatever direction the camera was from the center already
            camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

            // pick some near and far values for the frustum that
            // will contain the box.
            camera.near = boxSize / 100;
            camera.far = boxSize * 100;

            camera.updateProjectionMatrix();

            // point the camera to look at the center of the box
            camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
        }

        //this is to frame the whole thing correctly
        //const mtlLoader2 = new MTLLoader();
        var loader = new GLTFLoader();
        var mixer;
        let animations;
        var clips;

        function update() {
            mixer.update(deltaSeconds);
        }

        loader.load(
            // resource URL
            'http://localhost:4000/biomerse/script/interaction/models/sodiumPotassiumPump/sodiumPotassiumPump.gltf',
            // called when the resource is loaded
            function (gltf) {

                scene.add(gltf.scene);
                //console.log(gltf.scene);
                gltf.scene.rotation.y = -Math.PI / 4;
                //gltf.scene.rotation.z = .5;

                gltf.scene.traverse(function (child) {
                    //console.log(child)
                    if (child instanceof THREE.Mesh) {
                        //child.rotation.y = -Math.PI / 4;
                        console.log(child.name);
                        child.callback = () => {
                            if (child.name.includes("sodium0")) {
                                sodiumClick();
                            }
                            else if (child.name.includes("potassium0")) {
                                potassiumClick();
                            }
                            else if (child.name.includes("BezierCurve")) {
                                lipidBilayerClick();
                            }
                            else if (child.name.includes("potassiumpump")) {
                                potassiumPumpClick();
                            }
                            else if (child.name.includes("sodiumpump")) {
                                sodiumPumpClick();
                            } else if (child.name.includes("Sphere.012_0") || child.name.includes("Sphere_0")) {
                                atpAdenosineClick();
                            }
                            else if (child.name.includes("phosphate") || child.name.includes("Sphere")) {//2,1 phosphate Sphere.012_0-a
                                atpPhosphateClick();

                            }
                        };
                        meshObjects.push(child);
                    }
                });
                
                mixer = new THREE.AnimationMixer(gltf.scene);
                gltf.animations.forEach((clip) => {
                    console.log(clip)
                    mixer.clipAction(clip).play();
                });
                console.log('mixer',mixer);

                const box = new THREE.Box3().setFromObject(gltf.scene);

                const boxSize = box.getSize(new THREE.Vector3()).length();
                const boxCenter = box.getCenter(new THREE.Vector3());

                // set the camera to frame the box
                frameArea(boxSize * 0.75, boxSize, boxCenter, camera);

                // update the Trackball controls to handle the new size
                controls.maxDistance = boxSize * 10;
                controls.target.copy(boxCenter);
                controls.update();

            },
            // called while loading is progressing
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error) {

                console.log('An error happened');

            }
        );

        function onDocumentMouseDown(event) {
            event.preventDefault();
            const x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
            const y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;
            mouse.x = x;
            mouse.y = y;
            console.log('x', x);
            console.log('y', y);

            raycaster.setFromCamera(mouse, camera);
            console.log('Raycaster', raycaster);

            // three.js objects with click handlers we are interested in
            var intersects = raycaster.intersectObjects(meshObjects);
            console.log('intersects', intersects);

            if (intersects.length > 0) {
                intersects[0].object.callback();
            } else {
                generalClick();
            }

        }

        canvas.onmousemove = onDocumentMouseDown;

    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }


    function render() {
        // if(mixer){
        //     mixer.update(deltaTimeInSeconds) ;

        // }
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

}

main();