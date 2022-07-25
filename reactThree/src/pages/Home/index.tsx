
import { useModel } from '@umijs/max';
import styles from './index.less';
import { useRef, useEffect } from 'react';
import { controls } from './mouse';
import THREE, { AmbientLight, BoxGeometry, Mesh, MeshLambertMaterial, OrthographicCamera, PointLight, Scene, WebGLRenderer } from 'three';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const oneThree = useRef<HTMLDivElement>(null);
  let T0: any = new Date();
  const transfrom = (renderer: any, scence: any, camera: any, mesh: any) => {
    // 处理不是req不是标准fps60针
    let T1: any = new Date();//本次时间
    let t = T1 - T0;//时间差
    T0 = T1;//把本次时间赋值给上次时间
    // -----------------------------------------------
    requestAnimationFrame(() => transfrom(renderer, scence, camera, mesh))
    renderer.render(scence, camera);
    mesh.rotateY(0.001 * t);
  }

  useEffect(() => {
    // 创建场景对象
    const scence = new Scene();

    // 创建网格模型
    // 立方体
    const geometry = new BoxGeometry(100, 100, 100);
    // 材质
    const material = new MeshLambertMaterial({
      color: 0x000ff
    });
    const mesh = new Mesh(geometry, material);
    scence.add(mesh);

    // 光
    const point = new PointLight(0xffffff);
    point.position.set(400, 200, 300);
    scence.add(point);

    // 环境光
    const ambient = new AmbientLight(0x444444);
    scence.add(ambient);

    // 相机
    const width = window.innerWidth; //窗口宽度
    const height = window.innerHeight; //窗口高度
    const k = width / height;
    const s = 200;

    const camera = new OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200);
    camera.lookAt(scence.position);



    // 创建渲染对象
    const renderer = new WebGLRenderer();
    // 设置画布大小
    renderer.setSize(width, height);
    renderer.setClearColor('0xb9d3ff', 1);
    oneThree.current?.appendChild(renderer.domElement);
    renderer.render(scence, camera);

    transfrom(renderer, scence, camera, mesh);
    controls(camera, renderer);
  }, [])

  return (
    <div ref={oneThree}></div>
  );
};

export default HomePage;
