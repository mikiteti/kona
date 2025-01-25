precision mediump float;

uniform vec3 u_camera_pos;
uniform vec2 u_resolution;
uniform vec4 u_colors[9];
uniform mat3 u_rotcam;
uniform mat3 u_rotmodel;
uniform vec3 u_light;

attribute vec3 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute float a_type;
attribute float a_active;

varying vec4 v_color;

void main () {
    vec4 base_color = u_colors[int(a_color)];
    if (a_type == 3. || a_active == 1.) {
        base_color = u_colors[8];
    }
    if (a_type > 0.) {
        v_color = base_color;
    } else if (a_type == 0.) {
        float dot = dot(normalize(u_light), a_normal);
        float luminosity = .35 * (dot + 1.) + .3;
        v_color = vec4(base_color.rgb * luminosity, base_color.a);
    }

    if (a_active == -1. && a_type != 2.) {
        v_color = vec4(0., 0., 0., 0.);
    }
    // v_color = vec4(1., 1., 1., 1.);

    vec3 pos = a_position;
    pos *= u_rotmodel;
    pos += u_camera_pos;
    pos *= u_rotcam;

    if (a_active == -1. && a_type != 2.) {
        v_color = vec4(0., 0., 0., 0.);
        gl_Position = vec4(10000., 10000., 10000., 10000.);
    } else {
        gl_Position = vec4(pos.xy / u_resolution, pos.z, 1. + pos.z);
    }
}
