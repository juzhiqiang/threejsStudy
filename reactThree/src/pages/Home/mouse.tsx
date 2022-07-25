import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 鼠标控制器
export const controls = (camera: any, renderen: any) => {
    const controls = new OrbitControls(camera, renderen.domElement);
    // 不能同时跟requestAnimationFrame 一起使用
    // controls.addEventListener("change", renderen)
}