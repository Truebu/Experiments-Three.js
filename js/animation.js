import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../jsm/OrbitControls.js";
import Stats from "../jsm/stats.module.js";
import { FBXLoader } from "../jsm/FBXLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFEFDFC);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);

window.addEventListener("resize", resize);

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 50;

const stats = new Stats();
const createStats = function () {
    stats.setMode(2);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "100px";
    stats.domElement.style.top = "10px";
    document.getElementById("stats").appendChild(stats.domElement);
    return stats;
}


const loader = new FBXLoader();

let mixer = null;

loader.load('../assets/sinon_animation.fbx', (fbx) => {
    mixer = new THREE.AnimationMixer(fbx);
    const action = mixer.clipAction(fbx.animations[0]);
    action.play();
    fbx.position.y = 15
    fbx.scale.setScalar("0.04");
    scene.add(fbx);
});


const clock = new THREE.Clock()

const listener = new THREE.AudioListener();
camera.add( listener );

const sound = new THREE.Audio( listener );

const audioLoader = new THREE.AudioLoader();
audioLoader.load( '../assets/song_animation.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});

camera.position.z = 50;

const animate = function () {

    requestAnimationFrame(animate);

    const delta = clock.getDelta()
    if (mixer) {
        mixer.update(delta)
    }

    stats.update();
    renderer.render(scene, camera);
}

animate();
createStats();