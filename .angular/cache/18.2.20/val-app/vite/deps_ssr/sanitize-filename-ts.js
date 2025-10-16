import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  __commonJS
} from "./chunk-NQ4HTGF6.js";

// node_modules/truncate-utf8-bytes/lib/truncate.js
var require_truncate = __commonJS({
  "node_modules/truncate-utf8-bytes/lib/truncate.js"(exports, module) {
    "use strict";
    function isHighSurrogate(codePoint) {
      return codePoint >= 55296 && codePoint <= 56319;
    }
    function isLowSurrogate(codePoint) {
      return codePoint >= 56320 && codePoint <= 57343;
    }
    module.exports = function truncate(getLength, string, byteLength) {
      if (typeof string !== "string") {
        throw new Error("Input must be string");
      }
      var charLength = string.length;
      var curByteLength = 0;
      var codePoint;
      var segment;
      for (var i = 0; i < charLength; i += 1) {
        codePoint = string.charCodeAt(i);
        segment = string[i];
        if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {
          i += 1;
          segment += string[i];
        }
        curByteLength += getLength(segment);
        if (curByteLength === byteLength) {
          return string.slice(0, i + 1);
        } else if (curByteLength > byteLength) {
          return string.slice(0, i - segment.length + 1);
        }
      }
      return string;
    };
  }
});

// node_modules/truncate-utf8-bytes/index.js
var require_truncate_utf8_bytes = __commonJS({
  "node_modules/truncate-utf8-bytes/index.js"(exports, module) {
    "use strict";
    var truncate = require_truncate();
    var getLength = Buffer.byteLength.bind(Buffer);
    module.exports = truncate.bind(null, getLength);
  }
});

// node_modules/sanitize-filename-ts/build/index.js
var require_build = __commonJS({
  "node_modules/sanitize-filename-ts/build/index.js"(exports) {
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var truncate_utf8_bytes_1 = __importDefault(require_truncate_utf8_bytes());
    var illegalRe = /[\/\?<>\\:\*\|":]/g;
    var controlRe = /[\x00-\x1f\x80-\x9f]/g;
    var reservedRe = /^\.+$/;
    var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    var windowsTrailingRe = /[\. ]+$/;
    function replace(input, replacement) {
      const sanitized = input.replace(illegalRe, replacement).replace(controlRe, replacement).replace(reservedRe, replacement).replace(windowsReservedRe, replacement).replace(windowsTrailingRe, replacement);
      return truncate_utf8_bytes_1.default(sanitized, 255);
    }
    function sanitize(input, options) {
      const replacement = options && options.replacement || "";
      const output = replace(input, replacement);
      if (replacement === "") {
        return output;
      }
      return replace(output, "");
    }
    exports.sanitize = sanitize;
  }
});
export default require_build();
//# sourceMappingURL=sanitize-filename-ts.js.map
