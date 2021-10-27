import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../jsm/OrbitControls.js";

const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();
loader.load("../assets/image_roman_coliseum.jpg", function(texture){
    scene.background = texture;
});

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const materialChest = new THREE.MeshPhongMaterial({color: 0xC1AB51});
const cube = new THREE.Mesh( new THREE.BoxGeometry(1.3, 4, 1), materialChest );
scene.add( cube );

const materialSkin = new THREE.MeshPhongMaterial({color: 0xE4BADB});
const sphere = new THREE.Mesh( new THREE.SphereGeometry(1.2), materialSkin );
sphere.position.y = 1.7;
scene.add( sphere );

const cylinderArmLeft = new THREE.Mesh( new THREE.CylinderGeometry(0.3, 0.3, 1.8), materialSkin );
cylinderArmLeft.position.y = 0.1;
cylinderArmLeft.position.x = 1.1;
cylinderArmLeft.rotation.z = 0.5;
scene.add( cylinderArmLeft );

const cylinderArmRigth = new THREE.Mesh( new THREE.CylinderGeometry(0.3, 0.3, 1.8), materialSkin );
cylinderArmRigth.position.y = 0.1;
cylinderArmRigth.position.x = -1.1;
cylinderArmRigth.rotation.z = -0.5
scene.add( cylinderArmRigth );

const cylinderLegRigth = new THREE.Mesh( new THREE.CylinderGeometry(0.4, 0.4, 2), materialSkin );
cylinderLegRigth.position.y = -2.4;
cylinderLegRigth.position.x = -0.7;
cylinderLegRigth.rotation.z = -0.5;
scene.add( cylinderLegRigth );

const cylinderLegLeft = new THREE.Mesh( new THREE.CylinderGeometry(0.4, 0.4, 2), materialSkin );
cylinderLegLeft.position.y = -2.4;
cylinderLegLeft.position.x = 0.7;
cylinderLegLeft.rotation.z = 0.5;
scene.add( cylinderLegLeft );

const materialRing = new THREE.MeshPhongMaterial({color: 0xA72424});
const ring = new THREE.Mesh( new THREE.RingGeometry(0.8, 1.6, 16, 1, 0, Math.PI*0.6), materialRing );
ring.position.y = 2.2;
ring.rotation.y = 1.5;
ring.rotation.z = -0;
scene.add( ring );

const materialCone = new THREE.MeshPhongMaterial({color: 0x645F4A});
const cone = new THREE.Mesh( new THREE.ConeGeometry(0.3, 0.3, 1.8), materialCone );
cone.position.y = 0.1;
scene.add( cone );

const light = new THREE.DirectionalLight( 0xffffff);
light.position.set(1, 1, 1);
scene.add( light );


window.addEventListener("resize", resize);

function resize (){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 20;

camera.position.z = 8;

const animate= function() {
	requestAnimationFrame( animate );
    /*
    scene.traverse(function (object){
        if(object.isMesh){
            object.rotation.x += 0.01;
            object.rotation.y += 0.01;
        }
    });*/

	renderer.render( scene, camera );
}
animate();