var _____WB$wombat$assign$function_____ = function (name) {
  return (
    (self._wb_wombat &&
      self._wb_wombat.local_init &&
      self._wb_wombat.local_init(name)) ||
    self[name]
  );
};
if (!self.__WB_pmw) {
  self.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

  function initialize_compressor() {
    compressor = new LZMA("./js/lzma_worker.js");
    return compressor;
  }

  function initialize_helper() {}

  function load_url_code() {
    if (window.location.hash) {
      var hash = window.location.hash.substr(1);
      var version = hash.substr(0, 2);

      if (version == "A/") {
        // LZMA

        readURL(hash.substr(2));
      } else {
        // Basic format

        code.value = decodeURIComponent(hash);
      }
    } else {
      //readURL( '5d000001009a0200000000000000119a48c65ab5aec1f910f780dfdfe473e599a211a90304ab6aa581b342b344db4e71099beb79352b3c442c8dee970ffb4d054491e356b4f55882c2f3554393fe6662cf2c348a3f51dcce7b5760290bbc5c1b937d382ba6cdd0a9b35cf7fd57cebd800501c16f80f61ad4501d00a2ca4e63c8dc38b7b03703cba8d68914c6f2c6598f2f7008faee0e4b4cf4276eea6d0fb93df9188dae5b7f6db2579246363efaf9145f13206ee5b908e90eb4f6e19254a0f4fda81b31c2d3fd00e78e5b5fb5d5e51df87412a667211e121d77f3becd58d5960f9b77d8b826d4c6bce27a589f7158944441ae8fa5a297f23f0e7707f84fcbe0557976aaca9c97b99d3252a8b85b2a4ecb10d9b3cb65f6a5d75240f8bde39ed692b559c61276fe260578' );
      //code.value=document.
      compileOnChangeCode = false; // Prevent compile timer start
      code.setValue(document.getElementById("example").textContent);
      compile();
      compileOnChangeCode = true;
    }
  }

  function setURL(shaderString) {
    compressor.compress(
      shaderString,
      1,
      function (bytes) {
        var hex = convertBytesToHex(bytes);
        window.location.replace("#A/" + hex);
      },
      dummyFunction
    );
  }

  function readURL(hash) {
    var bytes = convertHexToBytes(hash);

    compressor.decompress(
      bytes,
      function (text) {
        compileOnChangeCode = false; // Prevent compile timer start
        code.setValue(text);
        compile();
        compileOnChangeCode = true;
      },
      dummyFunction
    );
  }

  function convertHexToBytes(text) {
    var tmpHex,
      array = [];

    for (var i = 0; i < text.length; i += 2) {
      tmpHex = text.substring(i, i + 2);
      array.push(parseInt(tmpHex, 16));
    }

    return array;
  }

  function convertBytesToHex(byteArray) {
    var tmpHex,
      hex = "";

    for (var i = 0, il = byteArray.length; i < il; i++) {
      if (byteArray[i] < 0) {
        byteArray[i] = byteArray[i] + 256;
      }

      tmpHex = byteArray[i].toString(16);

      // add leading zero

      if (tmpHex.length == 1) tmpHex = "0" + tmpHex;

      hex += tmpHex;
    }

    return hex;
  }

  // dummy functions for saveButton
  function set_save_button(visibility) {}

  function set_parent_button(visibility) {}

  function add_server_buttons() {}
}
/*
     FILE ARCHIVED ON 07:36:26 Jun 21, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:06:31 Mar 28, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 172.443
  exclusion.robots: 0.161
  exclusion.robots.policy: 0.147
  cdx.remote: 0.084
  esindex: 0.012
  LoadShardBlock: 127.821 (3)
  PetaboxLoader3.datanode: 204.689 (5)
  load_resource: 592.238 (2)
  PetaboxLoader3.resolve: 378.412 (2)
*/
