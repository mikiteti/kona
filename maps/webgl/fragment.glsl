precision mediump float;

uniform vec3 u_offset;
uniform vec3 u_colors[5];

varying vec3 v_color;

void main() {
    vec4 color = vec4(v_color, 1.);
    gl_FragColor = color;
}
