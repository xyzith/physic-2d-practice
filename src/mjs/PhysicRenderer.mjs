import Node from './Node.mjs';
import Spring from './Spring.mjs';

class PhysicRenderer {
	constructor(canvas) {
		this.ctx = canvas.getContext('2d');
		this.preRenderer = this.createPrerenderer(canvas);
		this.preCtx = this.preRenderer.getContext('2d');
		this.play = this.play.bind(this);
		this.nodes = [];
		this.springs = [];
		this.ctx.globalCompositeOperation = 'copy';
	}

	createPrerenderer(canvas) {
		const { width, height } = canvas;
		const renderer = document.createElement('canvas');
		renderer.width = width;
		renderer.height = height;
		return renderer;
	}

	addNode(x, y, createSpring) {
		const { preRenderer } = this;
		const node = new Node(preRenderer, x, y);
		this.nodes.push(node);
		if (createSpring) {
			this.createSpringsForNode(node);
		}
	}

	createSpringsForNode(node) {
		const { nodes } = this;
		nodes.forEach((target) => {
			if (node !== target) {
				this.addSpring(node, target);
			}
		});
	}

	move(vx, vy, ax, ay) {
		const { nodes } = this;
		nodes.forEach((dot) => dot.move(vx, vy, ax, ay));
	}

	addSpring(node1, node2) {
		const spring = new Spring(node1, node2);
		this.springs.push(spring);
	}

	clear() {
		const { ctx, preRenderer } = this;
		const { width, height } = preRenderer;
		ctx.clearRect(0, 0, width, height);
		this.nodes = [];
		this.springs = [];
	}

	render() {
		const { ctx, preRenderer, preCtx, nodes, springs } = this;
		const { width, height } = preRenderer;

		nodes.forEach((dot) => dot.update());
		springs.forEach((spring) => spring.applyConstraint());

		nodes.forEach((dot) => dot.render(preCtx));
		springs.forEach((spring) => spring.render(preCtx));

		ctx.drawImage(preRenderer, 0, 0);
		preCtx.clearRect(0, 0, width, height);
	}

	play() {
		this.render();
		this.reqId = window.requestAnimationFrame(this.play);
	}
}

export default PhysicRenderer;
