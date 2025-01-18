let pointer_down = false;
let alpha = 0, beta = 0, d_a = 0, d_b = 0, dt = 0.01, dampening = .97;
const center = [0, 400, 0];
const scale = 2;
const sensitivity = 0.01;

const down = (e) => { pointer_down = true; };
const up = (e) => { pointer_down = false };

const move = (e) => {
    if (!pointer_down) return;

    d_a = e.movementX * sensitivity;
    d_b = e.movementY * sensitivity;
}

const getColor = (point) => {
    if (point.type == 0) {
        return colors.blue;
    }

    return colors.white;
}

const transformPoint = (matrix, point) => {
    return [
        matrix[0][0] * point[0] + matrix[0][1] * point[1] + matrix[0][2] * point[2],
        matrix[1][0] * point[0] + matrix[1][1] * point[1] + matrix[1][2] * point[2],
        matrix[2][0] * point[0] + matrix[2][1] * point[1] + matrix[2][2] * point[2],
    ];
}

const applyRotations = () => {
    const matrixA = [ // around Z
        [Math.cos(alpha), Math.sin(alpha), 0],
        [-Math.sin(alpha), Math.cos(alpha), 0],
        [0, 0, 1]
    ];
    const matrixB = [ // around X
        [1, 0, 0],
        [0, Math.cos(beta), -Math.sin(beta)],
        [0, Math.sin(beta), Math.cos(beta)],
    ];

    const array = [];
    for (const point of nodes.map(e => e.coords)) {
        const translated = [point[0] - center[0], point[1] - center[1], point[2] - center[2]];
        const transformed = transformPoint(matrixB, transformPoint(matrixA, translated));
        array.push(transformed);
    }

    return array;
}

const loop = () => {
    d_a *= dampening;
    d_b *= dampening;
    if (Math.abs(d_a) < 0.05) d_a = 0;
    if (Math.abs(d_b) < 0.05) d_b = 0;
    if (!d_a && !d_b && initial_render_done) {
        return;
    }
    initial_render_done = true;
    alpha += d_a * dt;
    beta += d_b * dt;
    const translated_points = applyRotations();
    for (let i = 0; i < translated_points.length; i++) {
        let node = nodes[i];
        translated_points[i] = {type: node.type, id: node.id, coords: translated_points[i]};
    }

    ctx.clearRect(-400, -250, 800, 500);
    for (const point of translated_points) {
        ctx.beginPath();
        ctx.arc(point.coords[0] * scale, point.coords[2] * scale, 1 * scale, 0, 2*Math.PI);
        ctx.fillStyle = getColor(point);
        ctx.fill();
    }
}

function draw() {
    alpha += d_a;
    beta += d_b;
    d_a *= dampening;
    d_b *= dampening;

    const translated_points = applyRotations();
    for (let i = 0; i < translated_points.length; i++) {
        let node = nodes[i];
        translated_points[i] = {type: node.type, id: node.id, coords: translated_points[i]};
    }

    background(0);
    lights();

    push();
    noStroke();
    for (const node of translated_points) {
        fill(getColor(node));
        translate(scale * node.coords[0], scale * node.coords[2], scale * node.coords[1]);
        sphere(scale * 1.5);
        translate(-scale * node.coords[0], -scale * node.coords[2], -scale * node.coords[1]);
    }
    pop();
}

function setup() {
    createCanvas(800, 800, WEBGL);
}

document.addEventListener("pointerdown", down);
document.addEventListener("pointerup", up);
document.addEventListener("pointermove", move);
