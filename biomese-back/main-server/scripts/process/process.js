import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js'

function main(data) {
    console.log('data', data)
    var play = document.getElementById("play");
    play.style.visibility = "visible";
    play.onclick = () => { run = true; };
    var pause = document.getElementById("pause");
    pause.style.visibility = "visible";
    pause.onclick = () => { run = false; };
    document.getElementById('interactionDiv').innerHTML = `<canvas id='myCanvasP' ref="myCanvasP" />`;
    const canvas = document.getElementById('myCanvasP');
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    const renderer = new THREE.WebGLRenderer({ canvas });
    const fov = 45;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 100;
    var clock = new THREE.Clock();
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(7, 7, 7);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x64A9A4);
    var run = false;

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

    function generalClick() {
        const body = data[0].process_description
        const info = document.getElementById('info');
        info.innerHTML = formatInfo(data[0].process_name, body);
    }
    generalClick();

    var parts = data[0].subparts;
    function subpartHover(name) {
        var quit = false;
        for (var i = 0; i < parts.length && !quit; i++) {
            if (name.includes(parts[i].model_part_name)) {
                var body = parts[i].part_description;
                const info = document.getElementById('info');
                info.innerHTML = formatInfo(parts[i].part_name, body);
                quit = true;
            }
        }

    }
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
        var loadingLink = data[0].process_link;
        loader.load(
            // resource URL
            loadingLink,
            // called when the resource is loaded
            function (gltf) {

                scene.add(gltf.scene);
                gltf.scene.rotation.y = -Math.PI / 4;

                gltf.scene.traverse(function (child) {
                    //console.log(child.name);
                    if (child instanceof THREE.Mesh) {
                        child.callback = () => {
                            subpartHover(child.name);
                        };
                        meshObjects.push(child);
                    }
                });

                mixer = new THREE.AnimationMixer(gltf.scene);
                gltf.animations.forEach((clip) => {
                    //console.log(clip)
                    mixer.clipAction(clip).play();
                });
                //console.log('mixer', mixer);

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
        var delta = clock.getDelta();
        if (mixer != null && run) {
            mixer.update(delta);
        };
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

function video(data) {
    document.getElementById("play").style.visibility = "hidden";
    document.getElementById("pause").style.visibility = "hidden";
    document.getElementById('interactionDiv').innerHTML = `<video id="videoP" src="${data[0].video_link}" controls="true"></video>`;
}

const link = 'http://localhost:4000/biomerse/process/2';
        fetch(link, {
        method: 'GET',
        mode: 'cors',
        headers: {
            ...{ 'Content-Type': 'application/json' },
        },
        }).then(response => response.json()).then((responseJSON) => {
        main(responseJSON);
        const videoObject = document.getElementById('video');
        videoObject.onclick = ()=>video(responseJSON);
        const canvasObject = document.getElementById('model');
        canvasObject.onclick = ()=>main(responseJSON);
        });