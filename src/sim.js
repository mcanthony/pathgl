var forceShader = [
  'precision mediump float;'
, 'const vec3 TARGET = vec3( 0, 0, 0.01 )'
, 'uniform sampler2D uParticleData;'
, 'uniform vec2 uViewport;'
, 'vec4 texelAtOffet( vec2 offset ) {'
,     'return texture2D( uParticleData, ( gl_FragCoord.xy + offset ) / uViewport );'
, '}'
, 'void main() {'
,    ' int slot = int( mod( gl_FragCoord.x, 2.0 ) );'
, '    if ( slot == 0 ) { '
,         'vec4 dataA = texelAtOffet( vec2( 0, 0 ) );'
,         'vec4 dataB = texelAtOffet( vec2( 1, 0 ) );'
,         'vec3 pos = dataA.xyz;'
,         'vec3 vel = dataB.xyz;'
,         'float phase = dataA.w;'
,         'if ( phase > 0.0 ) {'
,             'pos += vel * 0.005;'
,             'if ( length( TARGET - pos ) < 0.035 ) phase = 0.0;'
,             'else phase += 0.1;'
,         '} else {'
,             'pos = vec3(-1);'
,         '}'
,         'gl_FragColor = vec4( pos, phase );'
,     '} else if ( slot == 1 ) {'
,         'vec4 dataA = texelAtOffet( vec2( -1, 0 ) );'
,         'vec4 dataB = texelAtOffet( vec2( 0, 0 ) );'
,         'vec3 pos = dataA.xyz;'
,         'vec3 vel = dataB.xyz;'
,         'float phase = dataA.w;'
,         'if ( phase > 0.0 ) {'
,             'vec3 delta = normalize( TARGET - pos );'
,             'vel += delta * 0.05;'
,             'vel *= 0.991;'
,         '} else {'
,             'vel = vec3(0);'
,         '}'
,         'gl_FragColor = vec4( vel, 1.0 );'
,     '}'
, '}'
].join('\n')

pathgl.sim = {}

pathgl.sim.force = function () {
 return pathgl.texture(forceShader)
}