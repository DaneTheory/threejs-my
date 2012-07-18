var camera, scene, renderer, avatar;

document.addEventListener( "DOMContentLoaded", function( e ) {
  init();
  animate();
});

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  scene.add(camera);

  avatar = buildAvatar();
  scene.add(avatar);

  renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
}

function buildAvatar() {
  var avatar = new THREE.Object3D();

  var material = new THREE.MeshNormalMaterial();

  var body_geometry = new THREE.CylinderGeometry(1, 300, 300);
  var body = new THREE.Mesh(body_geometry, material);
  body.position.z = -150;
  avatar.add(body);

  var head_geometry = new THREE.SphereGeometry(200);
  var head = new THREE.Mesh(head_geometry, material);
  head.position.y = 200;
  avatar.add(head);

  var right_arm = limb(material);
  right_arm.position.x = 150;
  right_arm.position.z = -50;
  right_arm.rotation.z = -Math.PI/3;

  avatar.add(right_arm);

  var left_arm = limb(material);
  left_arm.position.x = -150;
  left_arm.position.z = -50;
  left_arm.rotation.z = Math.PI/3;
  avatar.add(left_arm);

  var left_leg = limb(material);
  left_leg.rotation.z = Math.PI;
  left_leg.position.y = -250;
  left_leg.position.x = -100;
  left_leg.position.z = -50;
  avatar.add(left_leg);

  var right_leg = limb(material);
  right_leg.rotation.z = Math.PI;
  right_leg.position.y = -250;
  right_leg.position.x = 100;
  right_leg.position.z = -50;
  avatar.add(right_leg);

  return avatar;
}

function limb(material) {
  var limb = new THREE.Object3D();

  var arm_geometry = new THREE.CylinderGeometry(25, 25, 500);
  var arm = new THREE.Mesh(arm_geometry, material);
  limb.add(arm);

  var hand_geometry = new THREE.SphereGeometry(75);
  var hand = new THREE.Mesh(hand_geometry, material);
  hand.position.y = 250;
  limb.add(hand);

  return limb;
}


function animate() {
  // note: three.js includes requestAnimationFrame shim
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}
