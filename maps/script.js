canvas.width = window.innerWidth; canvas.height = window.innerHeight;
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);

fetch("./vertex.glsl").then(res => res.text()).then(vs_source => {
    fetch("./fragment.glsl").then(res => res.text()).then(fs_source => {
        const vertex_shader = assets.create_shader(gl, gl.VERTEX_SHADER, vs_source);
        const fragment_shader = assets.create_shader(gl, gl.FRAGMENT_SHADER, fs_source);

        const program = assets.create_program(gl, vertex_shader, fragment_shader);

        gl.useProgram(program);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        setup();

        for (const name in attr) {
            assets.initiate_attribute(program, attr[name]);
        }

        for (const name in uni) {
            assets.initiate_uniform(program, uni[name]);
        }

        setInterval(() => {
            loop();
        }, 10);
    });
});

const loop = () => {
    check_movement_keys();
    let rotmat = assets.multiply_matrices(assets.get_rotmat(alpha, "x"), assets.get_rotmat(beta, "y"));
    uni.rotcam.data = [...rotmat[0], ...rotmat[1], ...rotmat[2]];
    uni.rotcam.set();
    let rotmodel = assets.get_rotmat(theta, "y");
    uni.rotmodel.data = [...rotmodel];
    uni.rotmodel.set();

    for (const f of floor) {
        gl.drawArrays(gl.LINE_LOOP, f.outline[0].ends[0], 40);
    }
    for (const i in paths) {
        const p = paths[i];
        if (!p.active) continue;

        gl.drawArrays(gl.LINE_STRIP, p.ends[0], p.ends[1] - p.ends[0]);
    } 
    let end= nodes.find(e => e.type == 2).ends[0] - 1;
    gl.drawArrays(gl.TRIANGLES, 0, end);
}

const setup = () => {
    for (const n of nodes) {
        n.ends = [attr.position.data.length/3];
        switch (n.type) {
            case 0:
                assets.add_scanner(n.coords, n.floor);
                break;
            case 1:
                assets.add_door(n.coords, n.orientation, n.floor + 4);
                break;
            case 2:
                assets.add_outline(n.coords, n.floor + 4);
                break;
        }
        n.ends.push(attr.position.data.length/3);
    }
}
