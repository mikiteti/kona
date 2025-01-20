precision mediump float;

attribute vec3 a_position;
attribute float a_color;
attribute vec3 a_normal;

uniform vec3 u_offset;
uniform vec3 u_light;
uniform mat3 u_rotX;
uniform mat3 u_rotY;
uniform mat3 u_camX;
uniform mat3 u_camY;
uniform vec2 u_resolution;
uniform vec4 u_colors[9];

varying vec4 v_color;

void main() {
    v_color = u_colors[int(a_color)];

    vec3 pos = a_position;
    pos *= u_rotY;
    pos *= u_rotX;
    pos += u_offset;
    pos *= u_camY;
    pos *= u_camX;

    gl_Position = vec4(pos.xy / u_resolution, pos.z, 1. + pos.z);
}
