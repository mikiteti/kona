let pointer_down = false;
let alpha = 0, beta = 0, d_a = 0, d_b = 0, dt = 0.01, dampening = .97;
const center = [105.13, 385.15, 6.29];
let camera_pos = [0, 0];
let scale = Math.min(window.innerHeight, window.innerWidth) / 400 * 3; // take out * 3 later
const sensitivity = 0.01;
let ball_size = 1;
const shownPaths = [];

const down = (e) => { pointer_down = true; };
const up = (e) => { pointer_down = false };

const move = (e) => {
    if (!pointer_down) return;

    if (!e.ctrlKey) {
        d_a = e.movementX * sensitivity;
        d_b = e.movementY * sensitivity;

        return;
    }

    camera_pos[0] -= e.movementX;
    camera_pos[1] -= e.movementY;

}

const getColor = (point) => {
    if (point.type == 0) {
        for (let j in shownPaths) {
            if (shownPaths[j].find(e => e == point.id)) {
                return colors.green;
            }
            return colors.red;
        }
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

function draw() {
    alpha += d_a;
    beta += d_b;
    d_a *= dampening;
    d_b *= dampening;
    d_a = 0;
    d_b = 0;

    const translated_points = applyRotations();
    for (let i = 0; i < translated_points.length; i++) {
        let node = nodes[i];
        translated_points[i] = {type: node.type, id: node.id, coords: translated_points[i]};
    }

    background(0);
    lights();
    translate(-camera_pos[0], -camera_pos[1], 0);

    push();
    noStroke();
    for (const node of translated_points) {
        fill(getColor(node));
        translate(scale * node.coords[0], scale * node.coords[2], scale * node.coords[1]);
        sphere(scale * ball_size);
        translate(-scale * node.coords[0], -scale * node.coords[2], -scale * node.coords[1]);
    }
    pop();

    push();
    stroke("green");
    strokeWeight(2);
    for (const j in shownPaths) {
        const path = shownPaths[j];
        let p1 = translated_points.find(e => e.id == path[0]).coords;
        for (let i = 0; i < path.length - 1; i++) {
            let p2 = translated_points.find(e => e.id == path[i+1]).coords;
            line(scale * p1[0], scale * p1[2], scale * p1[1], scale * p2[0], scale * p2[2], scale * p2[1]);
            p1 = p2;
        }
    } 
    pop();

    translate(...camera_pos, 0);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
}

const togglePath = (id) => {
    if (shownPaths[id]) {
        delete shownPaths[id];
        return;
    }

    const path_skeleton = paths[id];
    const path = [];

    for (let node_id of path_skeleton) {
        path.push(nodes.find(e => e.id == node_id));
    }

    shownPaths[id] = path_skeleton;
}

document.addEventListener("pointerdown", down);
document.addEventListener("pointerup", up);
document.addEventListener("pointermove", move);
document.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        togglePath(e.target.innerHTML);
    }
});
document.addEventListener("wheel", (e) => {
    scale *= 0.999 ** e.deltaY;
});
