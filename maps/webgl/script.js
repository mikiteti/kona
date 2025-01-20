console.log(`Controls:
Move camera with w (forward), a (left), s (backward), d (right), q (up), e (down).
Orient camera with arrow keys.
To change speed, press 1, 2, 3, 4 or 5.
`)
const center = [205.13, 6.20, 385.15];
const ball_size = 0.25;
const door_size = [.25,.5];
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
let vsSource, fsSource;

const uniforms = [
    {
        name: "u_offset",
        data: [ 0, 0, 75, ],
        type: "3fv",
    },
    {
        name: "u_light",
        data: [ -1, -1, -1 ],
        type: "3fv",
    },
    {
        name: "u_rotX",
        data: [ 1, 0, 0, 0, 0.9995500337489875, 0.02999550020249566, 0, -0.02999550020249566, 0.9995500337489875 ],
        type: "Matrix3fv",
    },
    {
        name: "u_rotY",
        data: [ 0.517219818079551, 0, 0.855852592322858, 0, 1, 0, -0.855852592322858, 0, 0.517219818079551 ],
        type: "Matrix3fv",
    },
    {
        name: "u_camX",
        data: [],
        type: "Matrix3fv",
    },
    {
        name: "u_camY",
        data: [],
        type: "Matrix3fv",
    },
    {
        name: "u_resolution",
        data: [window.innerWidth / Math.min(window.innerWidth, window.innerHeight), window.innerHeight / Math.min(window.innerWidth, window.innerHeight)],
        type: "2fv",
    },
    {
        name: "u_colors",
        // "white": "#cccccc",
        // "yellow": "#fae272",
        // "red": "#e2685e",
        // "blue": "#7a97c6",
        // "green": "#80beb2",

        data: [
            1,1,1,1,
            0.98,0.886,0.447,1,
            0.502,0.745,0.698,1,
            0.478,0.592,0.776,1,
            0.886,0.408,0.369,1,

            0.98,0.886,0.447, .4,
            0.502,0.745,0.698,.4,
            0.478,0.592,0.776,.4,
            0.886,0.408,0.369,.4,
        ],
        type: "4fv",
    },
];

const attributes = [
    {
        name: "a_position",
        data: [],
        size: 3,
        type: gl.FLOAT,
        primitiveType: gl.TRIANGLES,
    },
    {
        name: "a_color",
        data: [],
        size: 1,
        type: gl.FLOAT,
    },
    {
        name: "a_normal",
        data: [],
        size: 3,
        type: gl.FLOAT,
        normalize: true,
    },
]

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

gl.enable(gl.DEPTH_TEST);
// gl.enable(gl.CULL_FACE);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


const createShader = (gl, type, source) => {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

const createProgram = (gl, vertexShader, fragmentShader) => {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

const handleAttribute = (program, attr) => {
    const location = gl.getAttribLocation(program, attr.name);
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attr.data), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, attr.size, attr.type, attr.normalize || false, attr.stride || 0, attr.offset || 0);

    const draw = (from, to) => {
        gl.drawArrays(attr.primitiveType || gl.TRIANGLES, from/3, (to-from)/3); //gl.size || attr.data.length);
    }

    attr.location = location;
    attr.buffer = buffer;
    attr.draw = draw;
}

const handleUniform = (program, uni) => {
    const location = gl.getUniformLocation(program, uni.name);

    uni.location = location;

    uni.set = (value) => {
        uni.data = value;
        uni.type.includes("Matrix") ? gl["uniform" + uni.type](location, false, value) : gl["uniform" + uni.type](location, value);
    }

    uni.set(uni.data);
}


fetch("./vertex.glsl").then(res => res.text()).then(data => { 
    vsSource = data.replaceAll("\n", "")
    fetch("./fragment.glsl").then(res => res.text()).then(data => { 
        fsSource = data.replaceAll("\n", "") 

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

        const program = createProgram(gl, vertexShader, fragmentShader);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);

        setup_data();

        for (attr of attributes) {
            handleAttribute(program, attr);
        }

        for (uni of uniforms) {
            handleUniform(program, uni);
        }

        loop();
    });
});

const setup_data = () => {
    const getColor = (node) => {
        switch (node.id[0]) {
            case "S":
                return 1;
            case "Z":
                return 2;
            case "K":
                return 3;
            case "P":
                return 4;
        }

        return colors.white;
    }



    const add_triangle = (pos, color) => {
        attributes.find(e => e.name == "a_position").data.push(...pos);
        attributes.find(e => e.name == "a_color").data.push(color, color, color);
        // let v1 = [pos[0] - pos[3], pos[1] - pos[4], pos[2] - pos[5]];
        // let v2 = [pos[0] - pos[6], pos[1] - pos[7], pos[2] - pos[8]];
        // let normal = [
        //     v1[1]*v2[2] - v1[2]*v2[1],
        //     v1[2]*v2[0] - v1[0]*v2[2],
        //     v1[0]*v2[1] - v1[1]*v2[0]
        // ];
        // attributes.find(e => e.name == "a_normal").data.push(...normal, ...normal, ...normal);
    }

    const add_octahedron = (pos, color1, color2 = color1) => {
        const skeleton = [
            [1,0,0, 0,0,1, 0,1,0],
            [1,0,0, 0,1,0, 0,0,-1],
            [1,0,0, 0,-1,0, 0,0,1],
            [1,0,0, 0,0,-1, 0,-1,0],
            [-1,0,0, 0,1,0, 0,0,1],
            [-1,0,0, 0,0,-1, 0,1,0],
            [-1,0,0, 0,0,1, 0,-1,0],
            [-1,0,0, 0,-1,0, 0,0,-1]
        ];
        const color_map = [ 0, 1, 1, 0, 1, 0, 0, 1 ];

        for (let i in skeleton) {
            const face = skeleton[i];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    face[3*i+j] *= ball_size;
                    face[3*i+j] += pos[j];
                }
            }
            add_triangle(face, [color1, color2][color_map[i]]);
        }
    }

    const add_rectangle = (pos, orientation, color) => {
        const rot = [
            [1, 1/Math.sqrt(2), 0, -1/Math.sqrt(2)],
            [0, -1/Math.sqrt(2), -1, -1/Math.sqrt(2)]
        ];

        let coords = [
            [pos[0] + door_size[0] * rot[0][orientation], pos[1] + door_size[1], pos[2] + door_size[0] * rot[1][orientation]],
            [pos[0] + door_size[0] * rot[0][orientation], pos[1] - door_size[1], pos[2] + door_size[0] * rot[1][orientation]],
            [pos[0] - door_size[0] * rot[0][orientation], pos[1] - door_size[1], pos[2] - door_size[0] * rot[1][orientation]],
            [pos[0] - door_size[0] * rot[0][orientation], pos[1] + door_size[1], pos[2] - door_size[0] * rot[1][orientation]],
        ];

        add_triangle([...coords[0], ...coords[2], ...coords[1]], color);
        add_triangle([...coords[0], ...coords[2], ...coords[3]], color);
    }

    const floor_data = [
        [1.6, 0.75],
        [5.23, 4.38],
        [8.53, 7.68],
        [11.83, 10.98]
    ]
    let which_floor = 0;
    for (const n of nodes) {
        n.ends = [attributes[0].data.length];
        if (floor_data[which_floor] && n.coords[1] >= floor_data[which_floor][1] - .01) {
            which_floor++;
            floors.push(attributes[0].data.length);
        }
        const coords = [n.coords[0] - center[0], n.coords[1] - center[1], n.coords[2] - center[2]];
        let orientation = 0;
        if (n.coords[2] >= 402.19 - .05 || n.coords[2] <= 372.76 + .05) orientation = 2;
        else if (n.coords[2] >= 393.33 - 4.05 || n.coords[2] <= 380.39 + 4.05) {
            orientation = 1;
            let star_centers = [121.26, 184.465, 274.335];
            let star_center = 0;
            if (Math.abs(star_centers[1] - n.coords[0]) < Math.abs(star_centers[star_center] - n.coords[0])) star_center++;
            if (Math.abs(star_centers[2] - n.coords[0]) < Math.abs(star_centers[star_center] - n.coords[0])) star_center++;
            if (Math.sign(n.coords[0] - star_centers[star_center]) != Math.sign(n.coords[2] - center[2])) orientation = 3;
        }
        n.type == 0 ? add_octahedron(coords, 0, 3) : add_rectangle(coords, orientation, getColor(n));
        n.ends.push(attributes[0].data.length);
    }
    floors.push(attributes[0].data.length);

    const floor_coords = [
        141, 430, 
        141, 339,
        68, 339,
        141, 430,
        68, 430,
        68, 339,
    ];

    for (let floor = 0; floor < 4; floor++) {
        for (let i = 0; i < 2; i++) {
            let offset = 1;
            let coords = [floor_coords[6*i] - center[0], floor_data[floor][1] - offset - center[1], floor_coords[6*i+1] - center[2],
                          floor_coords[6*i+2] - center[0], floor_data[floor][1] - offset - center[1], floor_coords[6*i+3] - center[2], 
                          floor_coords[6*i+4] - center[0], floor_data[floor][1] - offset - center[1], floor_coords[6*i+5] - center[2]];
            add_triangle(coords, floor + 5);
        }
    }

    const add_outline = (coords, color) => {
        attributes[0].data.push(...coords);
        for (let i = 0; i < coords.length; i+=3) attributes[1].data.push(color);
    }

    for (const out of outlines) {
        out.ends = [attributes[0].data.length];
        let coords = [];
        for (let i in out.coords) {
            coords.push(out.coords[i] - center[i%3]);
        }
        add_outline(coords, out.color);
        out.ends.push(attributes[0].data.length);
    }
}

const transform_point = (matrix, point) => {
    return [
        matrix[0][0] * point[0] + matrix[0][1] * point[1] + matrix[0][2] * point[2],
        matrix[1][0] * point[0] + matrix[1][1] * point[1] + matrix[1][2] * point[2],
        matrix[2][0] * point[0] + matrix[2][1] * point[1] + matrix[2][2] * point[2],
    ];
}
const add_vectors = (v1, v2) => {
    return [
        v1[0] + v2[0],
        v1[1] + v2[1],
        v1[2] + v2[2],
    ]
}

const floors = [];
let x = 0, 
    y = 1, 
    dx = 0, 
    dy = 0, 
    pointer_down = false, 
    sensitivity = 0.01, 
    damping = .97, 
    camera_pos = [ 146.39187853868904, -44, -70.18656853260983 ], 
    alpha = -.35, 
    beta = -1.87, 
    camX = [], 
    camY = []
    speed = .4;
const loop = () => {
    setInterval(() => {
        x += dx;
        y += dy;
        dx *= damping;
        dy *= damping;

        if (pressed_keys.includes("ArrowLeft")) beta += 0.01;
        if (pressed_keys.includes("ArrowRight")) beta -= 0.01;
        if (pressed_keys.includes("ArrowDown")) alpha -= 0.01;
        if (pressed_keys.includes("ArrowUp")) alpha += 0.01;

        camX = [
            [ 1,0,0, ],
            [ 0,Math.cos(alpha),-Math.sin(alpha), ],
            [ 0,Math.sin(alpha),Math.cos(alpha),  ],
        ];
        camY = [
            [ Math.cos(beta),0,Math.sin(beta), ],
            [ 0,1,0, ],
            [ -Math.sin(beta),0,Math.cos(beta), ],
        ]
        let camX_rev = JSON.parse(JSON.stringify(camX)), camY_rev = JSON.parse(JSON.stringify(camY));
        camX_rev[1][2] *= -1;
        camX_rev[2][1] *= -1;
        camY_rev[0][2] *= -1;
        camY_rev[2][0] *= -1;
        // if (camera_pos[0]+center[0] > 67 && camera_pos[0]+center[0] < 316 && camera_pos[1]+center[1] > 0 && camera_pos[1]+center[1] < 14 && camera_pos[2]+center[2] < 431 && camera_pos[2]+center[2] > 338) {
        //     speed = 0.1;
        //     console.log("inside");
        // }
        if (pressed_keys.includes("w")) camera_pos = add_vectors(camera_pos, transform_point(camY_rev, transform_point(camX_rev, [0, 0, -speed])));
        if (pressed_keys.includes("s")) camera_pos = add_vectors(camera_pos, transform_point(camY_rev, transform_point(camX_rev, [0, 0, speed])));
        if (pressed_keys.includes("a")) camera_pos = add_vectors(camera_pos, transform_point(camY_rev, transform_point(camX_rev, [speed, 0, 0])));
        if (pressed_keys.includes("d")) camera_pos = add_vectors(camera_pos, transform_point(camY_rev, transform_point(camX_rev, [-speed, 0, 0])));
        if (pressed_keys.includes("q")) camera_pos = add_vectors(camera_pos, transform_point(camY_rev, transform_point(camX_rev, [0, -speed, 0])));
        if (pressed_keys.includes("e")) camera_pos = add_vectors(camera_pos, transform_point(camY_rev, transform_point(camX_rev, [0, speed, 0])));


        uniforms.find(uni => uni.name == "u_rotX").set([
            1,0,0,
            0,Math.cos(x),-Math.sin(x),
            0,Math.sin(x),Math.cos(x),
        ]);
        uniforms.find(uni => uni.name == "u_rotY").set([
            Math.cos(y),0,Math.sin(y),
            0,1,0,
            -Math.sin(y),0,Math.cos(y),
        ]);
        uniforms.find(uni => uni.name == "u_offset").set([
            ...camera_pos
        ]);
        uniforms.find(uni => uni.name == "u_camX").set([
            ...camX[0],
            ...camX[1],
            ...camX[2],
        ]);
        uniforms.find(uni => uni.name == "u_camY").set([
            ...camY[0],
            ...camY[1],
            ...camY[2],
        ]);

        if (document.getElementById("floor1").checked) attributes[0].draw(floors[0], floors[1]);
        if (document.getElementById("floor2").checked) attributes[0].draw(floors[1], floors[2]);
        if (document.getElementById("floor3").checked) attributes[0].draw(floors[2], floors[3]);
        if (document.getElementById("floor4").checked) attributes[0].draw(floors[3], floors[4]);
        for (let out of outlines) {
            gl.drawArrays(gl.LINE_LOOP, out.ends[0] / 3, (out.ends[1] - out.ends[0]) / 3);
        }
        // attributes[0].draw(0, attributes[0].data.length);
    }, 10);
}

const down = (e) => { pointer_down = true; };
const up = (e) => { pointer_down = false };

const move = (e) => {
    if (!pointer_down) return;

    if (!e.ctrlKey) {
        dy = -e.movementX * sensitivity;
        dx = -e.movementY * sensitivity;

        return;
    }

    camera_pos[0] += e.movementX *100* sensitivity / camera_pos[2];
    camera_pos[1] -= e.movementY *100* sensitivity / camera_pos[2];
}

const togglePath = (id) => {
    const path = paths[id];

    for (let id of path.map(e => nodes.indexOf(nodes.find(f => f.id == e)))) {
        uniform.find(uni => uni.name == "u_")
    }
}

document.addEventListener("pointerdown", down);
document.addEventListener("pointerup", up);
document.addEventListener("pointermove", move);
document.addEventListener("click", (e) => {
    if (e.target.matches("#buttons button")) {
        togglePath(e.target.getAttribute("d-id"));
    } else if (e.target.matches("#search")) {
        highlighted_node = document.getElementById("input").value;
    }
});
document.addEventListener("wheel", (e) => {
    camera_pos[2] *= 1.001 ** e.deltaY;
});
const pressed_keys = [];
document.addEventListener("keydown", (e) => {
    if (pressed_keys.includes(e.key)) return;
    pressed_keys.push(e.key);
});
document.addEventListener("keyup", (e) => {
    pressed_keys.splice(pressed_keys.indexOf(e.key), 1);
});
document.addEventListener("keypress", (e) => {
    switch (e.key) {
        case "1":
            speed = .2;
            break;
        case "2":
            speed = .4;
            break;
        case "3":
            speed = .6;
            break;
        case "4":
            speed = .8;
            break;
        case "5":
            speed = 1;
            break;
    }
})
