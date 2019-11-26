import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import { OBJLoader2 } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

function main() {
    const canvas = document.getElementById('myCanvas');
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    const renderer = new THREE.WebGLRenderer({ canvas });
    //http://localhost:4000/biomerse/script/interaction.l/models/square/square.obj
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
    scene.background = new THREE.Color(0xEEEEEE);

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

    {
        function generalClick(){
            const body = `Tails are contractile, more or less rigid, long and relatively thick, and 
            they consist of a central core built of stacked rings of six subunits and surrounded by a 
            helical contractile sheath, which is separated from the head by a neck. During contraction, 
            sheath subunits slide over each other and the sheath becomes shorter and thicker, which brings 
            the tail core in contact with the bacterial plasma membrane. Compared to other tailed phages, 
            myoviruses often have larger heads and higher particle weights and DNA contents, and seem to be
             more sensitive to freezing and thawing and to osmotic shock. `
            const info = document.getElementById('info');
            info.innerHTML = formatInfo('Myoviridae', body);
        }
        generalClick();
        
        var meshObjects = [];
        function loadObj(url, method) {
            const mtlLoader = new MTLLoader();
            mtlLoader.load(`${url}.mtl`, (mtlParseResult) => {
                const objLoader = new OBJLoader2();
                const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
                objLoader.addMaterials(materials);
                objLoader.load(`${url}.obj`, (root) => {
                    root.traverse(function(child) {
                        if (child instanceof THREE.Mesh) {
                            child.callback = method;
                            meshObjects.push(child);
                        }
                    });
                    // var axis = new THREE.Vector3(0, 0, 1);
                    // root.translateOnAxis(axis, -2);
                    scene.add(root);
                });
            });
        }

        function formatInfo(title, body) {
            return `<div class='infoTitle'>${title}</div><div>${body}</div>`
        }

        function capsidHeadClick() {
            var body = `A capsid is the protein shell of a virus. It consists of several oligomeric 
            structural subunits made of protein called protomers. The observable 3-dimensional 
            morphological subunits, which may or may not correspond to individual proteins, are called 
            capsomeres. The capsid encloses the genetic material of the virus.`;
            const info = document.getElementById('info');
            info.innerHTML = formatInfo('Capsid Head', body);
        }
        loadObj('http://localhost:4000/biomerse/script/interaction/models/myoviridae/capsidHead', capsidHeadClick);

        function tailTubeSheathClick() {
            var body = `To infect bacteria, most bacteriophages employ a 'tail' that stabs and pierces the bacterium's 
            membrane to allow the virus's genetic material to pass through. The most sophisticated tails consist of
             a contractile sheath surrounding a tube akin to a stretched coil spring at the nanoscale. When the virus 
             attaches to the bacterial surface, the sheath contracts and drives the tube through it.`;
            const info = document.getElementById('info');
            info.innerHTML = formatInfo('Tail Tube and Sheath', body);
        }
        loadObj('http://localhost:4000/biomerse/script/interaction/models/myoviridae/tailTubeSheath', tailTubeSheathClick);

        function collarClick() {
            var body = `The collar and whisker are made of fibritin molecules. The collar and whiskers serve as molecular 
            chaperons facilitating attachment of the long tail fibers to the phage. Fibritin also serves as an 
            environment-sensing device that controls the retraction of the long tail fibers under adverse conditions 
            (e.g., low temperature, low ionic strength), thus preventing undesirable infection.`;
            const info = document.getElementById('info');
            info.innerHTML = formatInfo('Collar and Whiskers', body);
        }
        loadObj('http://localhost:4000/biomerse/script/interaction/models/myoviridae/collar', collarClick);

        function longTailFibreClick() {
            var body = `Host recognition occurs through a reversible interaction of the tip of the long tail fibers with 
            lipopolysaccharides or with the outer membrane porin protein C. Upon receptor binding, a recognition signal 
            is sent to the baseplate, causing the short tail fibers to extend and irreversibly bind to the outer 
            core region of the lipopolysaccharides .The T4 long tail fibers are an assembly of four different proteins 
            [gene product gp34, gp35, gp36, and gp37] and can be separated into proximal and distal half-fiber 
            segments of approximately 70 nm, hinged at an angle of around 160°.`;
            const info = document.getElementById('info');
            info.innerHTML = formatInfo('Long Tail Fibres', body);
        }
        loadObj('http://localhost:4000/biomerse/script/interaction/models/myoviridae/longTailFibre', longTailFibreClick);


        function centralTailClick() {
            var body = `To infect bacteria, most bacteriophages employ a 'tail' that stabs and pierces the bacterium's membrane
             to allow the virus's genetic material to pass through. After the other tails are connected with the cell,
             a recognition signal is sent to the baseplate. This allows the central tail or spike to move and pierce the membrane.`;
            const info = document.getElementById('info');
            info.innerHTML = formatInfo('Central Tail Fibre and Baseplate', body);

        }
        loadObj('http://localhost:4000/biomerse/script/interaction/models/myoviridae/centralTailFibre', centralTailClick);

        function shortTailClick() {
            var body = `After at least three long tail fibers have bound, short tail fibers extend and bind irreversibly to 
            the core region of the host cell lipopolysaccharides component (LPS). The short tail has adhesion proteins that binds 
            irreversibly to the lipopolysaccharides component (LPS) on the cell surface of cells during virus attachment.`;
            const info = document.getElementById('info');
            info.innerHTML = formatInfo('Short Tail Fibre', body);

        }
        loadObj('http://localhost:4000/biomerse/script/interaction/models/myoviridae/shortTailFibre', shortTailClick);


        //this is to frame the whole thing correctly
        const mtlLoader2 = new MTLLoader();
        mtlLoader2.load(`http://localhost:4000/biomerse/script/interaction/models/myoviridae/myoviridae.mtl`, (mtlParseResult) => {
            const objLoader = new OBJLoader2();
            const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
            objLoader.addMaterials(materials);
            objLoader.load(`http://localhost:4000/biomerse/script/interaction/models/myoviridae/myoviridae.obj`, (root) => {

                const box = new THREE.Box3().setFromObject(root);

                const boxSize = box.getSize(new THREE.Vector3()).length();
                const boxCenter = box.getCenter(new THREE.Vector3());

                frameArea(boxSize * 1.2, boxSize, boxCenter, camera);

                controls.maxDistance = boxSize * 10;
                controls.target.copy(boxCenter);
                controls.update();
            });
        });

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