var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

THREE.ShaderLambertColor = {	
	'shader' : {

		uniforms: THREE.UniformsUtils.merge( [
			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "lights" ],
			THREE.UniformsLib[ "shadowmap" ],

			{

				"enableDiffuseR"	: { type: "i", value: 0 },
				"enableDiffuseG"	: { type: "i", value: 0 },
				"enableDiffuseB"	: { type: "i", value: 0 },

				"tDiffuseR"	   : { type: "t", value: null },
				"tDiffuseG"	   : { type: "t", value: null },
				"tDiffuseB"	   : { type: "t", value: null },	


				"enableSpecularR"  : { type: "i", value: 0 },
				"enableSpecularG"  : { type: "i", value: 0 },
				"enableSpecularB"  : { type: "i", value: 0 },	

				"tSpecularR"   : { type: "t", value: null },
				"tSpecularG"   : { type: "t", value: null },
				"tSpecularB"   : { type: "t", value: null },						

				"ambient"  : { type: "c", value: new THREE.Color( 0xffffff ) },
				"emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
				"wrapRGB"  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
			}

		] ),

		vertexShader: [
			"#define LAMBERT",

			"varying vec3 vLightFront;",

			"#ifdef DOUBLE_SIDED",

				"varying vec3 vLightBack;",

			"#endif",

			THREE.ShaderChunk[ "map_pars_vertex" ],
			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
			THREE.ShaderChunk[ "envmap_pars_vertex" ],
			THREE.ShaderChunk[ "lights_lambert_pars_vertex" ],
			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "map_vertex" ],
				//THREE.ShaderChunk[ "lightmap_vertex" ],
				"#ifdef USE_LIGHTMAP",

					"vUv2 = uv;",

				"#endif",
				THREE.ShaderChunk[ "color_vertex" ],

				THREE.ShaderChunk[ "morphnormal_vertex" ],
				THREE.ShaderChunk[ "skinbase_vertex" ],
				THREE.ShaderChunk[ "skinnormal_vertex" ],
				THREE.ShaderChunk[ "defaultnormal_vertex" ],

				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],

				THREE.ShaderChunk[ "worldpos_vertex" ],
				THREE.ShaderChunk[ "envmap_vertex" ],
				THREE.ShaderChunk[ "lights_lambert_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"
			

		].join("\n"),

		fragmentShader: [

			"uniform float opacity;",

			"varying vec3 vLightFront;",

			"#ifdef DOUBLE_SIDED",

				"varying vec3 vLightBack;",

			"#endif",


			THREE.ShaderChunk[ "color_pars_fragment" ],
			
			THREE.ShaderChunk[ "map_pars_fragment" ],
			"uniform bool enableDiffuseR;",
			"uniform bool enableDiffuseG;",
			"uniform bool enableDiffuseB;",
			
			"uniform sampler2D tDiffuseR;",
			"uniform sampler2D tDiffuseG;",
			"uniform sampler2D tDiffuseB;",




			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
			THREE.ShaderChunk[ "envmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],

			THREE.ShaderChunk[ "specularmap_pars_fragment" ],
			"uniform bool enableSpecularR;",
			"uniform bool enableSpecularG;",
			"uniform bool enableSpecularB;",

			"uniform sampler2D tSpecularR;",
			"uniform sampler2D tSpecularG;",
			"uniform sampler2D tSpecularB;",

			"void main() {",

				"gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",

				"#ifdef USE_MAP",

					"#ifdef GAMMA_INPUT",

						"vec4 texelColor = texture2D( map, vUv );",
						"texelColor.xyz *= texelColor.xyz;",

						"gl_FragColor = gl_FragColor * texelColor;",

					"#else",

						"gl_FragColor = gl_FragColor * texture2D( map, vUv );",

					"#endif",

					"#ifdef USE_COLOR",
						
						// DIFFUSE R
						"if( enableDiffuseR ) {",

							"vec4 fragColorR;",
							"#ifdef GAMMA_INPUT",

								"fragColorR = texture2D( tDiffuseR, vUv );",
								"fragColorR.xyz *= fragColorR.xyz;",

							"#else",

								"fragColorR = texture2D( tDiffuseR, vUv );",
								
							"#endif",

							"gl_FragColor.xyz = mix( gl_FragColor.xyz, fragColorR.xyz, vColor.r );",

						"}",	


						// DIFFUSE G
						"if( enableDiffuseG ) {",

							"vec4 fragColorG;",
							"#ifdef GAMMA_INPUT",

								"fragColorG = texture2D( tDiffuseG, vUv );",
								"fragColorG.xyz *= fragColorG.xyz;",

							"#else",

								"fragColorG = texture2D( tDiffuseG, vUv );",
								
							"#endif",

							"gl_FragColor.xyz = mix( gl_FragColor.xyz, fragColorG.xyz, vColor.g );",

						"}",


						// DIFFUSE B
						"if( enableDiffuseB ) {",

							"vec4 fragColorB;",
							"#ifdef GAMMA_INPUT",

								"fragColorB = texture2D( tDiffuseB, vUv );",
								"fragColorB.xyz *= fragColorB.xyz;",

							"#else",

								"fragColorB = texture2D( tDiffuseB, vUv );",
								
							"#endif",

							"gl_FragColor.xyz = mix( gl_FragColor.xyz, fragColorB.xyz, vColor.b );",

						"}",

					"#endif",	


				"#endif",


							



				THREE.ShaderChunk[ "alphatest_fragment" ],

				"float specularStrength;",

				"#ifdef USE_SPECULARMAP",
					"vec4 texelSpecular = texture2D( specularMap, vUv );",

					"#ifdef USE_COLOR",

						"if( enableSpecularR )",
							"texelSpecular = vec4( mix( texelSpecular.xyz, texture2D( tSpecularR, vUv ).xyz, vColor.r ), 1.0);",			
						"if( enableSpecularG )",
							"texelSpecular = vec4( mix( texelSpecular.xyz, texture2D( tSpecularG, vUv ).xyz, vColor.g ), 1.0);",
						"if( enableSpecularR )",
							"texelSpecular = vec4( mix( texelSpecular.xyz, texture2D( tSpecularB, vUv ).xyz, vColor.b ), 1.0);",

					"#endif",

				"#else",

					"specularStrength = 1.0;",

				"#endif",

				// original lambert part
				"#ifdef DOUBLE_SIDED",

					"if ( gl_FrontFacing )",
						"gl_FragColor.xyz *= vLightFront;",
					"else",
						"gl_FragColor.xyz *= vLightBack;",

				"#else",

					"gl_FragColor.xyz *= vLightFront;",

				"#endif",

				THREE.ShaderChunk[ "lightmap_fragment" ],
				//THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "envmap_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],

				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

				THREE.ShaderChunk[ "fog_fragment" ],

			"}"			

		].join("\n")
	}
}

}
/*
     FILE ARCHIVED ON 10:23:46 Sep 13, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:44:11 Mar 28, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 136.979
  exclusion.robots: 0.079
  exclusion.robots.policy: 0.069
  cdx.remote: 0.066
  esindex: 0.01
  LoadShardBlock: 67.928 (3)
  PetaboxLoader3.datanode: 109.78 (4)
  load_resource: 204.66
  PetaboxLoader3.resolve: 106.959
*/