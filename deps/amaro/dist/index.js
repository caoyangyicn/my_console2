"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/wasm.js
var require_wasm = __commonJS({
  "lib/wasm.js"(exports2, module2) {
    "use strict";
    var imports = {};
    imports["__wbindgen_placeholder__"] = module2.exports;
    var wasm;
    var { TextDecoder, TextEncoder } = require("util");
    var heap = new Array(128).fill(void 0);
    heap.push(void 0, null, true, false);
    function getObject(idx) {
      return heap[idx];
    }
    var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true });
    cachedTextDecoder.decode();
    var cachedUint8ArrayMemory0 = null;
    function getUint8ArrayMemory0() {
      if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
      }
      return cachedUint8ArrayMemory0;
    }
    function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
    }
    var heap_next = heap.length;
    function addHeapObject(obj) {
      if (heap_next === heap.length) heap.push(heap.length + 1);
      const idx = heap_next;
      heap_next = heap[idx];
      heap[idx] = obj;
      return idx;
    }
    var WASM_VECTOR_LEN = 0;
    var cachedTextEncoder = new TextEncoder("utf-8");
    var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
      return cachedTextEncoder.encodeInto(arg, view);
    } : function(arg, view) {
      const buf = cachedTextEncoder.encode(arg);
      view.set(buf);
      return {
        read: arg.length,
        written: buf.length
      };
    };
    function passStringToWasm0(arg, malloc, realloc) {
      if (realloc === void 0) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr2 = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr2;
      }
      let len = arg.length;
      let ptr = malloc(len, 1) >>> 0;
      const mem = getUint8ArrayMemory0();
      let offset = 0;
      for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 127) break;
        mem[ptr + offset] = code;
      }
      if (offset !== len) {
        if (offset !== 0) {
          arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
      }
      WASM_VECTOR_LEN = offset;
      return ptr;
    }
    function isLikeNone(x) {
      return x === void 0 || x === null;
    }
    var cachedDataViewMemory0 = null;
    function getDataViewMemory0() {
      if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
      }
      return cachedDataViewMemory0;
    }
    function dropObject(idx) {
      if (idx < 132) return;
      heap[idx] = heap_next;
      heap_next = idx;
    }
    function takeObject(idx) {
      const ret = getObject(idx);
      dropObject(idx);
      return ret;
    }
    function debugString(val) {
      const type = typeof val;
      if (type == "number" || type == "boolean" || val == null) {
        return `${val}`;
      }
      if (type == "string") {
        return `"${val}"`;
      }
      if (type == "symbol") {
        const description = val.description;
        if (description == null) {
          return "Symbol";
        } else {
          return `Symbol(${description})`;
        }
      }
      if (type == "function") {
        const name = val.name;
        if (typeof name == "string" && name.length > 0) {
          return `Function(${name})`;
        } else {
          return "Function";
        }
      }
      if (Array.isArray(val)) {
        const length = val.length;
        let debug = "[";
        if (length > 0) {
          debug += debugString(val[0]);
        }
        for (let i = 1; i < length; i++) {
          debug += ", " + debugString(val[i]);
        }
        debug += "]";
        return debug;
      }
      const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
      let className;
      if (builtInMatches.length > 1) {
        className = builtInMatches[1];
      } else {
        return toString.call(val);
      }
      if (className == "Object") {
        try {
          return "Object(" + JSON.stringify(val) + ")";
        } catch (_) {
          return "Object";
        }
      }
      if (val instanceof Error) {
        return `${val.name}: ${val.message}
${val.stack}`;
      }
      return className;
    }
    var CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((state) => {
      wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
    });
    function makeMutClosure(arg0, arg1, dtor, f) {
      const state = { a: arg0, b: arg1, cnt: 1, dtor };
      const real = (...args) => {
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
          return f(a, state.b, ...args);
        } finally {
          if (--state.cnt === 0) {
            wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
            CLOSURE_DTORS.unregister(state);
          } else {
            state.a = a;
          }
        }
      };
      real.original = state;
      CLOSURE_DTORS.register(real, state, state);
      return real;
    }
    function __wbg_adapter_38(arg0, arg1, arg2) {
      wasm.__wbindgen_export_3(arg0, arg1, addHeapObject(arg2));
    }
    module2.exports.transform = function(input, options) {
      const ret = wasm.transform(addHeapObject(input), addHeapObject(options));
      return takeObject(ret);
    };
    module2.exports.transformSync = function(input, options) {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.transformSync(retptr, addHeapObject(input), addHeapObject(options));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        if (r2) {
          throw takeObject(r1);
        }
        return takeObject(r0);
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
      }
    };
    function getCachedStringFromWasm0(ptr, len) {
      if (ptr === 0) {
        return getObject(len);
      } else {
        return getStringFromWasm0(ptr, len);
      }
    }
    function handleError(f, args) {
      try {
        return f.apply(this, args);
      } catch (e) {
        wasm.__wbindgen_export_4(addHeapObject(e));
      }
    }
    function __wbg_adapter_57(arg0, arg1, arg2, arg3) {
      wasm.__wbindgen_export_5(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
    }
    module2.exports.__wbindgen_boolean_get = function(arg0) {
      const v = getObject(arg0);
      const ret = typeof v === "boolean" ? v ? 1 : 0 : 2;
      return ret;
    };
    module2.exports.__wbindgen_string_new = function(arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    };
    module2.exports.__wbindgen_string_get = function(arg0, arg1) {
      const obj = getObject(arg1);
      const ret = typeof obj === "string" ? obj : void 0;
      var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
      var len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    module2.exports.__wbindgen_is_string = function(arg0) {
      const ret = typeof getObject(arg0) === "string";
      return ret;
    };
    module2.exports.__wbindgen_is_object = function(arg0) {
      const val = getObject(arg0);
      const ret = typeof val === "object" && val !== null;
      return ret;
    };
    module2.exports.__wbindgen_is_undefined = function(arg0) {
      const ret = getObject(arg0) === void 0;
      return ret;
    };
    module2.exports.__wbindgen_in = function(arg0, arg1) {
      const ret = getObject(arg0) in getObject(arg1);
      return ret;
    };
    module2.exports.__wbg_new_b85e72ed1bfd57f9 = function(arg0, arg1) {
      try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = (arg02, arg12) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return __wbg_adapter_57(a, state0.b, arg02, arg12);
          } finally {
            state0.a = a;
          }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
      } finally {
        state0.a = state0.b = 0;
      }
    };
    module2.exports.__wbindgen_is_falsy = function(arg0) {
      const ret = !getObject(arg0);
      return ret;
    };
    module2.exports.__wbg_getwithrefkey_edc2c8960f0f1191 = function(arg0, arg1) {
      const ret = getObject(arg0)[getObject(arg1)];
      return addHeapObject(ret);
    };
    module2.exports.__wbg_length_ae22078168b726f5 = function(arg0) {
      const ret = getObject(arg0).length;
      return ret;
    };
    module2.exports.__wbg_get_3baa728f9d58d3f6 = function(arg0, arg1) {
      const ret = getObject(arg0)[arg1 >>> 0];
      return addHeapObject(ret);
    };
    module2.exports.__wbg_new_525245e2b9901204 = function() {
      const ret = new Object();
      return addHeapObject(ret);
    };
    module2.exports.__wbg_set_f975102236d3c502 = function(arg0, arg1, arg2) {
      getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    };
    module2.exports.__wbg_self_3093d5d1f7bcb682 = function() {
      return handleError(function() {
        const ret = self.self;
        return addHeapObject(ret);
      }, arguments);
    };
    module2.exports.__wbg_window_3bcfc4d31bc012f8 = function() {
      return handleError(function() {
        const ret = window.window;
        return addHeapObject(ret);
      }, arguments);
    };
    module2.exports.__wbg_globalThis_86b222e13bdf32ed = function() {
      return handleError(function() {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
      }, arguments);
    };
    module2.exports.__wbg_global_e5a3fe56f8be9485 = function() {
      return handleError(function() {
        const ret = global.global;
        return addHeapObject(ret);
      }, arguments);
    };
    module2.exports.__wbg_newnoargs_76313bd6ff35d0f2 = function(arg0, arg1) {
      var v0 = getCachedStringFromWasm0(arg0, arg1);
      const ret = new Function(v0);
      return addHeapObject(ret);
    };
    module2.exports.__wbg_call_1084a111329e68ce = function() {
      return handleError(function(arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    };
    module2.exports.__wbindgen_object_drop_ref = function(arg0) {
      takeObject(arg0);
    };
    module2.exports.__wbg_call_89af060b4e1523f2 = function() {
      return handleError(function(arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    module2.exports.__wbg_length_8339fcf5d8ecd12e = function(arg0) {
      const ret = getObject(arg0).length;
      return ret;
    };
    module2.exports.__wbindgen_memory = function() {
      const ret = wasm.memory;
      return addHeapObject(ret);
    };
    module2.exports.__wbg_buffer_b7b08af79b0b0974 = function(arg0) {
      const ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    };
    module2.exports.__wbg_new_ea1883e1e5e86686 = function(arg0) {
      const ret = new Uint8Array(getObject(arg0));
      return addHeapObject(ret);
    };
    module2.exports.__wbg_set_d1e79e2388520f18 = function(arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    module2.exports.__wbindgen_error_new = function(arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    };
    module2.exports.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
      const ret = getObject(arg0) == getObject(arg1);
      return ret;
    };
    module2.exports.__wbindgen_number_get = function(arg0, arg1) {
      const obj = getObject(arg1);
      const ret = typeof obj === "number" ? obj : void 0;
      getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    module2.exports.__wbg_instanceof_Uint8Array_247a91427532499e = function(arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Uint8Array;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    };
    module2.exports.__wbg_instanceof_ArrayBuffer_61dfc3198373c902 = function(arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof ArrayBuffer;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    };
    module2.exports.__wbg_entries_7a0e06255456ebcd = function(arg0) {
      const ret = Object.entries(getObject(arg0));
      return addHeapObject(ret);
    };
    module2.exports.__wbindgen_object_clone_ref = function(arg0) {
      const ret = getObject(arg0);
      return addHeapObject(ret);
    };
    module2.exports.__wbindgen_debug_string = function(arg0, arg1) {
      const ret = debugString(getObject(arg1));
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    module2.exports.__wbindgen_throw = function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
    module2.exports.__wbg_then_95e6edc0f89b73b1 = function(arg0, arg1) {
      const ret = getObject(arg0).then(getObject(arg1));
      return addHeapObject(ret);
    };
    module2.exports.__wbg_queueMicrotask_12a30234db4045d3 = function(arg0) {
      queueMicrotask(getObject(arg0));
    };
    module2.exports.__wbg_queueMicrotask_48421b3cc9052b68 = function(arg0) {
      const ret = getObject(arg0).queueMicrotask;
      return addHeapObject(ret);
    };
    module2.exports.__wbindgen_is_function = function(arg0) {
      const ret = typeof getObject(arg0) === "function";
      return ret;
    };
    module2.exports.__wbg_resolve_570458cb99d56a43 = function(arg0) {
      const ret = Promise.resolve(getObject(arg0));
      return addHeapObject(ret);
    };
    module2.exports.__wbindgen_cb_drop = function(arg0) {
      const obj = takeObject(arg0).original;
      if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
      }
      const ret = false;
      return ret;
    };
    module2.exports.__wbindgen_closure_wrapper7250 = function(arg0, arg1, arg2) {
      const ret = makeMutClosure(arg0, arg1, 687, __wbg_adapter_38);
      return addHeapObject(ret);
    };
    var { Buffer: Buffer2 } = require("node:buffer");
    var wasmModule = new WebAssembly.Module(bytes);
    var wasmInstance = new WebAssembly.Instance(wasmModule, imports);
    wasm = wasmInstance.exports;
    module2.exports.__wasm = wasm;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  transformSync: () => transformSync
});
module.exports = __toCommonJS(src_exports);

// src/transform.ts
var import_wasm = __toESM(require_wasm());
var DEFAULT_OPTIONS = {
  mode: "strip-only",
  // default transform will only work when mode is "transform"
  transform: {
    verbatimModuleSyntax: true,
    nativeClassProperties: true,
    noEmptyExport: true,
    importNotUsedAsValues: "preserve"
  }
};
function transformSync(source, options) {
  const input = `${source ?? ""}`;
  return import_wasm.default.transformSync(input, {
    ...DEFAULT_OPTIONS,
    ...options
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  transformSync
});