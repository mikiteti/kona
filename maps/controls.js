const rotcam_sensitivity = .005;
const rotmodel_sensitivity = .01;

let pointer_down = false, speed = .3;
let alpha = 0, beta = 0, theta = 0;

document.addEventListener("pointerdown", ()=>{pointer_down = true});
document.addEventListener("pointerup", ()=>{pointer_down = false});
document.addEventListener("pointermove", (e)=> {
    if (!pointer_down) return;

    if (!e.ctrlKey) {
        alpha += e.movementY * rotcam_sensitivity;
        beta += e.movementX * rotcam_sensitivity;
        
        return;
    }

    theta -= e.movementX * rotmodel_sensitivity;
});

const pressed_keys = [];
document.addEventListener("keydown", (e) => {
    if (!pressed_keys.includes(e.key)) pressed_keys.push(e.key);
});
document.addEventListener("keyup", (e) => {
    let key = pressed_keys.find(f => f == e.key);
    if (key) pressed_keys.splice(pressed_keys.indexOf(key), 1);
});
document.addEventListener("keypress", (e) => {
    if ([1,2,3,4,5].includes(parseInt(e.key))) speed = parseInt(e.key) / 10;
});

const check_movement_keys = () => {
    const movements = {
        w: [0,0,-1],
        a: [1,0,0],
        s: [0,0,1],
        d: [-1,0,0],
        q: [0,-1,0],
        e: [0,1,0],
    }

    for (const m in movements) {
        let rotmat_rev = assets.multiply_matrices(assets.get_rotmat(-beta, "y"), assets.get_rotmat(-alpha, "x"));
        if (pressed_keys.includes(m)) uni.camera_pos.data = assets.add_vectors(uni.camera_pos.data, assets.transform_vector(rotmat_rev, movements[m].map(c => c * speed)));
    }

    uni.camera_pos.set();
}

for (const name in paths) {
    document.getElementById("buttons").innerHTML += `
        <input type="checkbox" name="${name}" /><label for="${name}">${name}</label><br>
    `;
}

document.addEventListener("click", (e) => {
    if (e.target.matches("input")) {
        assets.set_path(e.target.getAttribute("name"), e.target.checked);
    }
});
