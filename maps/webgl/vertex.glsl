precision mediump float;

attribute vec3 a_position;
attribute float a_color;
attribute vec3 a_normal;
attribute float a_noshade;

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
    if (a_noshade == 1.) {
        v_color = u_colors[int(a_color)];
    } else{
        float dot = (dot(normalize(u_light), normalize(a_normal)) + 1.) * .35 + .3;
        v_color = vec4(u_colors[int(a_color)].rgb * dot, u_colors[int(a_color)].a);
    }

    vec3 pos = a_position;
    pos *= u_rotY;
    pos *= u_rotX;
    pos += u_offset;
    pos *= u_camY;
    pos *= u_camX;

    gl_Position = vec4(pos.xy / u_resolution, pos.z, 1. + pos.z);
}
