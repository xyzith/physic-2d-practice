import PhysicRenderer from './mjs/PhysicRenderer.mjs';

const canvas = document.querySelector('canvas');
canvas.width = 640;
canvas.height = 480;

const renderer = new PhysicRenderer(canvas);

renderer.addNode(100, 20, true);
renderer.addNode(160, 80, true);
renderer.addNode(80, 120, true);
renderer.addNode(40, 40, true);
renderer.move(5, 0, 0, 0.1);
renderer.play();
