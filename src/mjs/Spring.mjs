class Spring {
	constructor(node1, node2, elasticity = 0.1) {
		this.nodes = [ node1, node2 ];
		this.elasticity = elasticity;
		this.origLength = this.length;
	}

	get length() {
		const [ node1, node2 ] = this.nodes;
		const diffx = node1.x - node2.x;
		const diffy = node1.y - node2.y;
		const length = Math.sqrt(Math.pow(diffx, 2) + Math.pow(diffy, 2));
		return length;
	}

	get deg() {
		const [ node1, node2 ] = this.nodes;
		const diffx = node1.x - node2.x;
		const diffy = node1.y - node2.y;
		return Math.atan2(diffy, diffx);
	}

	applyConstraint() {
		const { nodes, length, origLength, deg, elasticity } = this;
		const [ node1, node2 ] = nodes;
		const deltaLength = Number((length - origLength).toFixed(4));
		const constraintX = Math.cos(deg) * deltaLength * elasticity / 2;
		const constraintY = Math.sin(deg) * deltaLength * elasticity / 2;

		node1.setConstraint(-constraintX, -constraintY);
		node2.setConstraint(constraintX, constraintY);
	}

	render(ctx) {
		const [ start, end ] = this.nodes;
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
	}
}

export default Spring;
