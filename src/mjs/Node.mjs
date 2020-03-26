class Node {
	constructor(canvas, x, y, r = 5) {
		this.ctx = canvas.getContext('2d');
		this.zoneWidth = canvas.width;
		this.zoneHeight = canvas.height;
		this.x = x;
		this.y = y;
		this.r = r;
		this.prevx = x;
		this.prevy = y;
		this.ax = 0;
		this.ay = 0;
		this.cx = 0;
		this.cy = 0;
	}

	render() {
		const { ctx, x, y, cx, cy, r, zoneWidth, zoneHeight } = this;

		const finalx = Math.min(zoneWidth, Math.max(x + cx, 0));
		const finaly = Math.min(zoneHeight, Math.max(y + cy, 0));

		this.cx = 0;
		this.cy = 0;
		this.x = finalx;
		this.y = finaly;

		ctx.beginPath();
		ctx.arc(finalx, finaly, r, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}

	move(vx, vy, ax, ay) {
		const { prevx, prevy } = this;
		this.prevx = prevx - vx;
		this.prevy = prevy - vy;
		this.ax = ax;
		this.ay = ay;
	}

	update(deltaT = 1) {
		const { x, y, prevx, prevy, ax, ay, zoneWidth, zoneHeight } = this;
		const tmpx = x * 2 - prevx + ax * deltaT / 2;
		const tmpy = y * 2 - prevy + ay * deltaT / 2;
		this.prevx = x;
		this.prevy = y;

		this.x = Math.min(zoneWidth, Math.max(tmpx, 0));
		this.y = Math.min(zoneHeight, Math.max(tmpy, 0));
	}

	setConstraint(cx, cy) {
		this.cx += cx;
		this.cy += cy;
	}
}

export default Node;
