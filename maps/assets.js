const assets = {
    create_shader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) return shader;

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    },

    create_program(gl, vertex_shader, fragment_shader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertex_shader);
        gl.attachShader(program, fragment_shader);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) return program;

        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    },

    initiate_attribute(program, attribute, normalize = false, stride = 0, offset = 0) {
        const location = gl.getAttribLocation(program, attribute.name);
        const buffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attribute.data), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, attribute.size, attribute.type, normalize, stride, offset);
        
        attribute.location = location;
        attribute.buffer = buffer;
    },

    update_attr_data(attr) {
        gl.bindBuffer(gl.ARRAY_BUFFER, attr.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attr.data), gl.STATIC_DRAW);
    },

    initiate_uniform(program, uni) {
        const location = gl.getUniformLocation(program, uni.name);

        uni.location = location;

        uni.set = () => {
            uni.type.includes("Matrix") ? gl["uniform" + uni.type](location, false, uni.data) : gl["uniform" + uni.type](location, uni.data);
        }
        uni.set();
    },

    add_triangle(coords, color, type = 1, active = 0) {
        const ends = [attr.position.data.length];
        attr.position.data.push(...coords[0], ...coords[1], ...coords[2]);
        attr.color.data.push(color, color, color);

        const v1 = [coords[1][0] - coords[0][0], coords[1][1] - coords[0][1], coords[1][2] - coords[0][2]];
        const v2 = [coords[2][0] - coords[0][0], coords[2][1] - coords[0][1], coords[2][2] - coords[0][2]];
        let normal = [
            v1[1] * v2[2] - v1[2] * v2[1],
            v1[2] * v2[0] - v1[0] * v2[2],
            v1[0] * v2[1] - v1[1] * v2[0],
        ];
        normal = normal.map(c => c / Math.hypot(...normal));
        attr.normal.data.push(...normal, ...normal, ...normal);
        attr.type.data.push(type, type, type);
        attr.active.data.push(active, active, active);
        
        ends.push(attr.position.data.length);
        return ends;
    },

    add_door(pos, orientation, color) {
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

        assets.add_triangle([coords[0], coords[2], coords[1]], color);
        assets.add_triangle([coords[0], coords[2], coords[3]], color);
    },

    add_scanner(pos, color) {
        // const skeleton = [
        //     [1,0,0],
        //     [0,1,0],
        //     [0,0,1],
        //
        //     [1,0,0],
        //     [0,0,-1],
        //     [0,1,0],
        //
        //     [1,0,0],
        //     [0,0,1],
        //     [0,-1,0],
        //
        //     [-1,0,0],
        //     [0,0,1],
        //     [0,1,0,],
        //
        //     [1,0,0],
        //     [0,-1,0],
        //     [0,0,-1],
        //
        //     [-1,0,0],
        //     [0,1,0],
        //     [0,0,-1],
        //
        //     [-1,0,0],
        //     [0,-1,0],
        //     [0,0,1],
        //
        //     [-1,0,0],
        //     [0,0,-1],
        //     [0,-1,0],
        // ];

        const skeleton = [];
        const phi = (1+Math.sqrt(5)) / 2;
        const vertices = [
            [ +phi, +1, 0 ],
            [ +phi, -1, 0 ],
            [ -phi, +1, 0 ],
            [ -phi, -1, 0 ],

            [ +1, 0, +phi ],
            [ +1, 0, -phi ],
            [ -1, 0, +phi ],
            [ -1, 0, -phi ],

            [ 0, +phi, +1 ],
            [ 0, +phi, -1 ],
            [ 0, -phi, +1 ],
            [ 0, -phi, -1 ],
        ];
        const faces = [ [ 0, 4, 1 ], [ 0, 1, 5 ], [ 0, 8, 4 ], [ 0, 5, 9 ], [ 0, 9, 8 ], [ 1, 4, 10 ], [ 1, 11, 5 ], [ 1, 10, 11 ], [ 2, 3, 6 ], [ 2, 7, 3 ], [ 2, 6, 8 ], [ 2, 9, 7 ], [ 2, 8, 9 ], [ 3, 10, 6 ], [ 3, 7, 11 ], [ 3, 11, 10 ], [ 4, 8, 6 ], [ 4, 6, 10 ], [ 5, 7, 9 ], [ 5, 11, 7 ] ];
        // for (let i = 0; i < vertices.length - 2; i++) {
        //     let v1 = vertices[i];
        //     for (let j = i+1; j < vertices.length - 1; j++) {
        //         let v2 = vertices[j];
        //         if (Math.abs(Math.hypot(v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]) - 2) < 0.1) {
        //             for (let k = j+1; k < vertices.length; k++) {
        //                 let v3 = vertices[k];
        //                 if (Math.abs(Math.hypot(v1[0] - v3[0], v1[1] - v3[1], v1[2] - v3[2]) - 2) < 0.1) {
        //                     if (Math.abs(Math.hypot(v2[0] - v3[0], v2[1] - v3[1], v2[2] - v3[2]) - 2) < 0.1) {
        //                         faces.push([i,j,k]);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // for (const i in faces)  {
        //     let face = faces[i];
        //     const coords = [vertices[face[0]], vertices[face[1]], vertices[face[2]]];
        //     const v1 = [coords[1][0] - coords[0][0], coords[1][1] - coords[0][1], coords[1][2] - coords[0][2]];
        //     const v2 = [coords[2][0] - coords[0][0], coords[2][1] - coords[0][1], coords[2][2] - coords[0][2]];
        //     let normal = [
        //         v1[1] * v2[2] - v1[2] * v2[1],
        //         v1[2] * v2[0] - v1[0] * v2[2],
        //         v1[0] * v2[1] - v1[1] * v2[0],
        //     ];
        //     let dot = normal[0] * coords[0][0] + normal[1] * coords[0][1] + normal[2] * coords[0][2];
        //     if (dot < 0) {
        //         faces[i] = [face[0], face[2], face[1]];
        //     }
        // }
        for (const face of faces) {
            skeleton.push(...face.map(e => vertices[e]));
        }


        for (const i in skeleton) skeleton[i] = assets.add_vectors(pos, skeleton[i].map(c => c * scanner_size));

        for (let i = 0; i < skeleton.length; i += 3) {
            assets.add_triangle([skeleton[i], skeleton[i+1], skeleton[i+2]], color, 0);
        }
    },

    add_vectors(v1, v2) {
        return [
            v1[0] + v2[0],
            v1[1] + v2[1],
            v1[2] + v2[2],
        ]
    },

    transform_vector(mat, v) {
        return [
            mat[0][0] * v[0] + mat[0][1] * v[1] + mat[0][2] * v[2],
            mat[1][0] * v[0] + mat[1][1] * v[1] + mat[1][2] * v[2],
            mat[2][0] * v[0] + mat[2][1] * v[1] + mat[2][2] * v[2],
        ];
    },

    multiply_matrices(m1, m2) {
        if (!m1[0][0]) {
            m1 = [[m1[0], m1[1], m1[2]], [m1[3], m1[4], m1[5]], [m1[6], m1[7], m1[8]]];
            m2 = [[m2[0], m2[1], m2[2]], [m2[3], m2[4], m2[5]], [m2[6], m2[7], m2[8]]];
        }
        return [
            [
                m1[0][0]*m2[0][0] + m1[0][1]*m2[1][0] + m1[0][2]*m2[2][0], 
                m1[0][0]*m2[0][1] + m1[0][1]*m2[1][1] + m1[0][2]*m2[2][1], 
                m1[0][0]*m2[0][2] + m1[0][1]*m2[1][2] + m1[0][2]*m2[2][2],
            ],
            [
                m1[1][0]*m2[0][0] + m1[1][1]*m2[1][0] + m1[1][2]*m2[2][0], 
                m1[1][0]*m2[0][1] + m1[1][1]*m2[1][1] + m1[1][2]*m2[2][1], 
                m1[1][0]*m2[0][2] + m1[1][1]*m2[1][2] + m1[1][2]*m2[2][2],
            ],
            [
                m1[2][0]*m2[0][0] + m1[2][1]*m2[1][0] + m1[2][2]*m2[2][0], 
                m1[2][0]*m2[0][1] + m1[2][1]*m2[1][1] + m1[2][2]*m2[2][1], 
                m1[2][0]*m2[0][2] + m1[2][1]*m2[1][2] + m1[2][2]*m2[2][2],
            ],
        ]
    },

    get_rotmat(theta, axes) {
        const cos = Math.cos(theta), sin = Math.sin(theta);
        switch (axes) {
            case "x":
            case 0:
                return [
                    1,0,0,
                    0,cos,-sin,
                    0,sin,cos
                ];
            case "y":
            case 1:
                return [
                    cos,0,sin,
                    0,1,0,
                    -sin,0,cos
                ];
            case "z":
            case 2:
                return [
                    cos,-sin,0,
                    sin,cos,0,
                    0,0,1
                ];
        }
    },

    get_door_orientation(n) {
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

        return orientation;
    },

    set_active(node, active) {
        for (let i = node.ends[0]; i < node.ends[1]; i++) {
            attr.active.data[i] = active;
        }
    },

    set_path(name, active) {
        document.querySelector(`[name=${name}]`).checked = active;

        const path = paths[name];
        console.log({name, path, paths});

        attr.active.data = attr.active.data.map(e => -1);
        path.active = active;

        let end_of_last_outline = floor.at(-1).outline[0].ends[1];
        attr.position.data = attr.position.data.slice(0, end_of_last_outline * 3);
        attr.type.data = attr.type.data.slice(0, end_of_last_outline);

        let there_is_active_path = false;
        for (let i in paths) {
            let p = paths[i];
            if (p.active) {
                there_is_active_path = true;
                p.ends = [attr.position.data.length/3];
                for (const id of p.nodes) {
                    const n = nodes.find(e => e.id == id);
                    assets.set_active(n, 1);
                    attr.position.data.push(...n.coords);
                    attr.type.data.push(3, 3, 3);
                }
                p.ends.push(attr.position.data.length/3);
            }
        }

        if (!there_is_active_path) attr.active.data = attr.active.data.map(e => 0);

        assets.update_attr_data(attr.position);
        assets.update_attr_data(attr.type);
        assets.update_attr_data(attr.active);
    },

    set_floor(num, active) {
        for (const i in paths) {
            if (paths[i].active) assets.set_path(i, false);
        }

        for (const n of nodes) {
            if (n.floor == num && n.type < 2) {
                assets.set_active(n, active);
            }
        }

        assets.update_attr_data(attr.active);
    },

    add_outline(coords, color) {
        attr.position.data.push(...coords);
        const sample = [];
        for (let i = 0; i < coords.length; i += 3) sample.push("someting");
        attr.color.data.push(...sample.map(e => color));
        attr.normal.data.push(...sample.map(e => 0));
        attr.type.data.push(...sample.map(e => 2));
        attr.active.data.push(...sample.map(e => 0));
    }
}
