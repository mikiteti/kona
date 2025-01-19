const center = [105.13, 6.20, 385.15];
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
let vsSource, fsSource;

const uniforms = [
    {
        name: "u_offset",
        data: [ 0, 0, 50, ],
        type: "3fv",
    },
    {
        name: "u_center",
        data: [ 0, 0, 0 ],
        type: "3fv",
    },
    {
        name: "u_matrix",
        data: [
            1,0,0,
            0,1,0,
            0,0,1,
        ],
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
        // "blue": "#7a97c6",
        // "red": "#e2685e",
        // "green": "#80beb2",
        // "yellow": "#fae272",

        data: [
            1, 1, 1,
            0.478,0.592,0.776,
            0.886,0.408,0.369,
            0.502,0.745,0.698,
            0.98,0.886,0.447
        ],
        type: "3fv",
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
        stride: 4,
    }
]

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);


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

    const draw = () => {
        gl.drawArrays(attr.primitiveType || gl.TRIANGLES, gl.offset || 0, gl.size || attr.data.length);
    }

    attr.location = location;
    attr.buffer = buffer;
    attr.draw = draw;
}

const handleUniform = (program, uni) => {
    const location = gl.getUniformLocation(program, uni.name);

    uni.location = location;

    uni.set = (value) => {
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
    const add_triangle = (pos, color) => {
        attributes.find(e => e.name == "a_position").data.push(...pos);
        attributes.find(e => e.name == "a_color").data.push(color, color, color);
    }

    const add_octahedron = (pos, size, color1, color2 = color1) => {
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
                    face[3*i+j] *= size;
                    face[3*i+j] += pos[j];
                }
            }
            add_triangle(face, [color1, color2][color_map[i]]);
        }
    }

    // add_triangle([0,0,0,1,1,1,0,0,1], 2);
    // add_octahedron([-1,0,0], 1, 0, 1);
    // add_octahedron([1,0,0], 1, 0, 1);

    for (const n of nodes.filter(e => e.type == 0)) {
        const coords = [n.coords[0] - center[0], n.coords[1] - center[1], n.coords[2] - center[2]];
        add_octahedron(coords, 1, 0, 1);
    }
}

const loop = () => {
    attributes[0].draw();

    let theta = 0;
    setInterval(() => {
        uniforms.find(uni => uni.name == "u_matrix").set([
            1,0,0,
            0,Math.cos(theta),-Math.sin(theta),
            0,Math.sin(theta),Math.cos(theta),
        ]);

        theta += .01;

        attributes[0].draw();
    }, 10);
}
