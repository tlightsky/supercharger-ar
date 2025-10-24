// 初始化Three.js场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('ar-canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;

// 添加照明
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// 添加一个绿色的立方体作为占位符
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -2);
scene.add(cube);

// 加载3D模型
let model;
const loader = new THREE.GLTFLoader();
loader.load('assets/super_charger_tesla_free.glb', function(gltf) {
    model = gltf.scene;
    console.log('模型加载完成');
}, undefined, function(error) {
    console.error('模型加载失败:', error);
});

// 点击放置物体
let placedObjects = [];
renderer.domElement.addEventListener('click', function(event) {
    if (!model) return;

    // 获取相机位置和方向
    const position = new THREE.Vector3();
    camera.getWorldPosition(position);

    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);

    // 在相机前方1米处放置
    position.add(direction.multiplyScalar(1));

    // 克隆模型并放置
    const clone = model.clone();
    clone.position.copy(position);
    scene.add(clone);
    placedObjects.push(clone);
});

// 选择物体（双击最后一个放置的物体）
let selectedObject = null;
renderer.domElement.addEventListener('dblclick', function() {
    if (placedObjects.length > 0) {
        selectedObject = placedObjects[placedObjects.length - 1];
        console.log('选中物体');
    }
});

// 键盘控制选中物体
document.addEventListener('keydown', function(event) {
    if (!selectedObject) return;

    const moveSpeed = 0.1;
    const rotSpeed = 0.1;

    switch(event.key.toLowerCase()) {
        case 'w': selectedObject.position.z -= moveSpeed; break;
        case 's': selectedObject.position.z += moveSpeed; break;
        case 'a': selectedObject.position.x -= moveSpeed; break;
        case 'd': selectedObject.position.x += moveSpeed; break;
        case 'q': selectedObject.rotation.y -= rotSpeed; break;
        case 'e': selectedObject.rotation.y += rotSpeed; break;
    }
});

// 截图功能
document.getElementById('screenshot-btn').addEventListener('click', function() {
    const canvas = renderer.domElement;
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ar-screenshot.png';
        a.click();
        URL.revokeObjectURL(url);
    });
});

// 添加AR按钮
document.body.appendChild(THREE.XR.createButton(renderer));

// 渲染循环
function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    // 如果不在XR模式，设置相机位置
    if (!renderer.xr.isPresenting) {
        camera.position.set(0, 0, 0);
    }
    renderer.render(scene, camera);
}

animate();