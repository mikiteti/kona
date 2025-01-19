precision mediump float;

varying vec3 v_color;

void main() {
    vec4 color = vec4(v_color, 1.);
    gl_FragColor = color;
}
