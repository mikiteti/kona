let pointer_down = false;
let alpha = 0, beta = Math.PI, d_a = 0, d_b = 0, dt = 0.01, dampening = .97;
const center = [105.13, 6.20, 385.15];
let camera_pos = [0, 0];
let scale = Math.min(window.innerHeight, window.innerWidth) / 400 * 4; // take out * 3 later
const sensitivity = 0.01;
let ball_size = .25;
const shownPaths = [];
let highlighted_node;

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
            return false;
        }
        return colors.white;
    }

    switch (point.id[0]) {
        case "S":
            return colors.yellow;
        case "P":
            return colors.red;
        case "K":
            return colors.blue;
        case "Z":
            return colors.green;
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

const applyRotations = (point) => {
    const matrixA = [ // around Y
        [Math.cos(alpha), 0, Math.sin(alpha)],
        [0, 1, 0],
        [-Math.sin(alpha), 0, Math.cos(alpha)],
    ];
    const matrixB = [ // around X
        [1, 0, 0],
        [0, Math.cos(beta), Math.sin(beta)],
        [0, -Math.sin(beta), Math.cos(beta)],
    ];

    const transformed = transformPoint(matrixB, transformPoint(matrixA, point));

    return transformed;
}

function draw() {
    alpha += d_a;
    beta += d_b;
    d_a *= dampening;
    d_b *= dampening;
    d_a = 0;
    d_b = 0;

    background(0, 0, 0, 0);
    //lights();
    ambientLight(128, 128, 128);
    directionalLight(128, 128, 128, 0, 0, -1);

    translate(-camera_pos[0], -camera_pos[1], 0);

    push();
    rotateY(alpha);
    rotateX(-beta);
    for (const node of nodes) {
        const vec = [scale * (node.coords[0] - center[0]), scale * (node.coords[1] - center[1]), scale * (node.coords[2] - center[2])];
        translate(...vec);
        if (node.type == 0) {
            let my_color = getColor(node);
            if (my_color) {
                fill(my_color);
                noStroke();
                sphere(scale * ball_size);
            }
        } else {
            stroke(getColor(node));
            const weight = scale / 10;
            strokeWeight(weight);
            noFill();
            const a = .15*scale;
            const b = .4*scale;
            const A = a + .5 * weight;
            const B = b + .5 * weight;

            //--
            //+-
            //++
            //-+
            line(-A, -b, 0, A, -b, 0);
            line(a, -B, 0, a, B, 0);
            line(A, b, 0, -A, b, 0);
            line(-a, B, 0, -a, -B, 0);
            //rect(-.15*scale, -.3*scale, .3*scale, .6*scale);
        }
        translate(-vec[0], -vec[1], -vec[2]);
    }


    stroke(colors.green);
    strokeWeight(2);
    for (const j in shownPaths) {
        const path = shownPaths[j];
        let p1 = nodes.find(e => e.id == path[0]).coords;
        p1 = [scale * (p1[0] - center[0]), scale * (p1[1] - center[1]), scale * (p1[2] - center[2])];
        for (let i = 0; i < path.length - 1; i++) {
            let p2 = nodes.find(e => e.id == path[i+1]).coords;
            p2 = [scale * (p2[0] - center[0]), scale * (p2[1] - center[1]), scale * (p2[2] - center[2])];
            line(...p1, ...p2);
            p1 = p2;
        }
    } 

    pop();

    if (highlighted_node) {
        rotateY(alpha);
        rotateX(-beta);
        let coords = nodes.find(e => e.id == highlighted_node.toUpperCase()).coords; 
        coords = [scale*(coords[0] - center[0]), scale*(coords[1] - center[1]), scale*(coords[2] - center[2])]
        translate(...coords);
        rotateX(beta);
        rotateY(-alpha);
        translate(scale*ball_size, scale*ball_size, scale*ball_size);
        textSize((applyRotations(coords)[2] + 800) / 20);
        text(highlighted_node, 0, 0);
    }

    document.getElementById("frame_rate").innerHTML = `fps: ${ parseInt(frameRate()) }`;
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    textFont(font);
    console.log()
    textAlign(LEFT, BOTTOM);
}

let font;
function preload() {
    font = loadFont("font.ttf");
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
    if (e.target.matches("#buttons button")) {
        togglePath(e.target.innerHTML);
    } else if (e.target.matches("#search")) {
        highlighted_node = document.getElementById("input").value;
    }
});
document.addEventListener("wheel", (e) => {
    scale *= 0.999 ** e.deltaY;
});
