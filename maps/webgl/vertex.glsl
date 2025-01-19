precision mediump float;

attribute vec3 a_position;
attribute float a_color;

uniform vec3 u_offset;
uniform mat3 u_matrix;
uniform vec2 u_resolution;
uniform vec3 u_colors[5];

varying vec3 v_color;

void main() {
    v_color = u_colors[int(a_color)];

    vec3 pos = vec3(a_position.xy / u_resolution, a_position.z);
    pos *= u_matrix;
    pos += u_offset;

    gl_Position = vec4(pos, 1. + pos.z);
}
