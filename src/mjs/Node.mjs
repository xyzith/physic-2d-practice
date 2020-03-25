class Node {
	constructor(canvas, x, y, r = 5) {
		this.ctx = canvas.getContext('2d');
		this.tmpX = x;
		this.tmpY = y;
		this.zoneWidth = canvas.width;
		this.zoneHeight = canvas.height;
		this.r = r;
		this.springs = [];
		this.ax = 0;
		this.ay = 0;
		this.cx = 0;
		this.cy = 0;
		this.prevX = x;
		this.prevY = y;
	}

	get x() {
		const { tmpX, zoneWidth, cx } = this;
		return Math.min(zoneWidth, Math.max(tmpX + cx, 0));
	}

	get y() {
		const { tmpY, zoneHeight, cy } = this;
		return Math.min(zoneHeight, Math.max(tmpY + cy, 0));
	}

	render() {
		const { ctx, x, y, r } = this;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}

	addSpring(spring) {
		this.springs.push(spring);
	}

	move(vx, vy, ax, ay) {
		const { prevX, prevY } = this;
		this.prevX = prevX - vx;
		this.prevY = prevY - vy;
		this.ax = ax;
		this.ay = ay;
	}

	update(deltaT = 1) {
		const { x, y, prevX, prevY, ax, ay } = this;
		this.tmpX = x * 2 - prevX + ax * deltaT / 2;
		this.tmpY = y * 2 - prevY + ay * deltaT / 2;

		this.prevX = x;
		this.prevY = y;

		this.cx = 0;
		this.cy = 0;
	}
}

export default Node;
