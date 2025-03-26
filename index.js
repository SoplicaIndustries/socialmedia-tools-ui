import { jsx as e, jsxs as o, Fragment as be } from "react/jsx-runtime";
import oe, { createContext as At, useContext as Ft, useMemo as xe, useEffect as he, useState as q, useRef as ke, useCallback as _t } from "react";
var dt = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, Xe = oe.createContext && /* @__PURE__ */ oe.createContext(dt), Bt = ["attr", "size", "title"];
function Ht(t, n) {
  if (t == null) return {};
  var r = Vt(t, n), s, p;
  if (Object.getOwnPropertySymbols) {
    var v = Object.getOwnPropertySymbols(t);
    for (p = 0; p < v.length; p++)
      s = v[p], !(n.indexOf(s) >= 0) && Object.prototype.propertyIsEnumerable.call(t, s) && (r[s] = t[s]);
  }
  return r;
}
function Vt(t, n) {
  if (t == null) return {};
  var r = {};
  for (var s in t)
    if (Object.prototype.hasOwnProperty.call(t, s)) {
      if (n.indexOf(s) >= 0) continue;
      r[s] = t[s];
    }
  return r;
}
function Re() {
  return Re = Object.assign ? Object.assign.bind() : function(t) {
    for (var n = 1; n < arguments.length; n++) {
      var r = arguments[n];
      for (var s in r)
        Object.prototype.hasOwnProperty.call(r, s) && (t[s] = r[s]);
    }
    return t;
  }, Re.apply(this, arguments);
}
function Ze(t, n) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    n && (s = s.filter(function(p) {
      return Object.getOwnPropertyDescriptor(t, p).enumerable;
    })), r.push.apply(r, s);
  }
  return r;
}
function $e(t) {
  for (var n = 1; n < arguments.length; n++) {
    var r = arguments[n] != null ? arguments[n] : {};
    n % 2 ? Ze(Object(r), !0).forEach(function(s) {
      Wt(t, s, r[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Ze(Object(r)).forEach(function(s) {
      Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(r, s));
    });
  }
  return t;
}
function Wt(t, n, r) {
  return n = qt(n), n in t ? Object.defineProperty(t, n, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : t[n] = r, t;
}
function qt(t) {
  var n = It(t, "string");
  return typeof n == "symbol" ? n : n + "";
}
function It(t, n) {
  if (typeof t != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var s = r.call(t, n);
    if (typeof s != "object") return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (n === "string" ? String : Number)(t);
}
function ut(t) {
  return t && t.map((n, r) => /* @__PURE__ */ oe.createElement(n.tag, $e({
    key: r
  }, n.attr), ut(n.child)));
}
function J(t) {
  return (n) => /* @__PURE__ */ oe.createElement(Yt, Re({
    attr: $e({}, t.attr)
  }, n), ut(t.child));
}
function Yt(t) {
  var n = (r) => {
    var {
      attr: s,
      size: p,
      title: v
    } = t, h = Ht(t, Bt), m = p || r.size || "1em", f;
    return r.className && (f = r.className), t.className && (f = (f ? f + " " : "") + t.className), /* @__PURE__ */ oe.createElement("svg", Re({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, s, h, {
      className: f,
      style: $e($e({
        color: t.color || r.color
      }, r.style), t.style),
      height: m,
      width: m,
      xmlns: "http://www.w3.org/2000/svg"
    }), v && /* @__PURE__ */ oe.createElement("title", null, v), t.children);
  };
  return Xe !== void 0 ? /* @__PURE__ */ oe.createElement(Xe.Consumer, null, (r) => n(r)) : n(dt);
}
function Ut(t) {
  return J({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" }, child: [] }] })(t);
}
function Gt(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" }, child: [] }] })(t);
}
function Jt(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" }, child: [] }] })(t);
}
function Xt(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" }, child: [] }] })(t);
}
function qe(t) {
  return J({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" }, child: [] }] })(t);
}
function Zt(t) {
  return J({ attr: { viewBox: "0 0 576 512" }, child: [{ tag: "path", attr: { d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" }, child: [] }] })(t);
}
function Kt(t) {
  return J({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z" }, child: [] }] })(t);
}
function Qt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var je = { exports: {} }, ze = { exports: {} }, V = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ke;
function er() {
  if (Ke) return V;
  Ke = 1;
  var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, s = t ? Symbol.for("react.fragment") : 60107, p = t ? Symbol.for("react.strict_mode") : 60108, v = t ? Symbol.for("react.profiler") : 60114, h = t ? Symbol.for("react.provider") : 60109, m = t ? Symbol.for("react.context") : 60110, f = t ? Symbol.for("react.async_mode") : 60111, C = t ? Symbol.for("react.concurrent_mode") : 60111, g = t ? Symbol.for("react.forward_ref") : 60112, c = t ? Symbol.for("react.suspense") : 60113, T = t ? Symbol.for("react.suspense_list") : 60120, y = t ? Symbol.for("react.memo") : 60115, E = t ? Symbol.for("react.lazy") : 60116, N = t ? Symbol.for("react.block") : 60121, z = t ? Symbol.for("react.fundamental") : 60117, w = t ? Symbol.for("react.responder") : 60118, O = t ? Symbol.for("react.scope") : 60119;
  function D(d) {
    if (typeof d == "object" && d !== null) {
      var A = d.$$typeof;
      switch (A) {
        case n:
          switch (d = d.type, d) {
            case f:
            case C:
            case s:
            case v:
            case p:
            case c:
              return d;
            default:
              switch (d = d && d.$$typeof, d) {
                case m:
                case g:
                case E:
                case y:
                case h:
                  return d;
                default:
                  return A;
              }
          }
        case r:
          return A;
      }
    }
  }
  function j(d) {
    return D(d) === C;
  }
  return V.AsyncMode = f, V.ConcurrentMode = C, V.ContextConsumer = m, V.ContextProvider = h, V.Element = n, V.ForwardRef = g, V.Fragment = s, V.Lazy = E, V.Memo = y, V.Portal = r, V.Profiler = v, V.StrictMode = p, V.Suspense = c, V.isAsyncMode = function(d) {
    return j(d) || D(d) === f;
  }, V.isConcurrentMode = j, V.isContextConsumer = function(d) {
    return D(d) === m;
  }, V.isContextProvider = function(d) {
    return D(d) === h;
  }, V.isElement = function(d) {
    return typeof d == "object" && d !== null && d.$$typeof === n;
  }, V.isForwardRef = function(d) {
    return D(d) === g;
  }, V.isFragment = function(d) {
    return D(d) === s;
  }, V.isLazy = function(d) {
    return D(d) === E;
  }, V.isMemo = function(d) {
    return D(d) === y;
  }, V.isPortal = function(d) {
    return D(d) === r;
  }, V.isProfiler = function(d) {
    return D(d) === v;
  }, V.isStrictMode = function(d) {
    return D(d) === p;
  }, V.isSuspense = function(d) {
    return D(d) === c;
  }, V.isValidElementType = function(d) {
    return typeof d == "string" || typeof d == "function" || d === s || d === C || d === v || d === p || d === c || d === T || typeof d == "object" && d !== null && (d.$$typeof === E || d.$$typeof === y || d.$$typeof === h || d.$$typeof === m || d.$$typeof === g || d.$$typeof === z || d.$$typeof === w || d.$$typeof === O || d.$$typeof === N);
  }, V.typeOf = D, V;
}
var W = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qe;
function tr() {
  return Qe || (Qe = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, s = t ? Symbol.for("react.fragment") : 60107, p = t ? Symbol.for("react.strict_mode") : 60108, v = t ? Symbol.for("react.profiler") : 60114, h = t ? Symbol.for("react.provider") : 60109, m = t ? Symbol.for("react.context") : 60110, f = t ? Symbol.for("react.async_mode") : 60111, C = t ? Symbol.for("react.concurrent_mode") : 60111, g = t ? Symbol.for("react.forward_ref") : 60112, c = t ? Symbol.for("react.suspense") : 60113, T = t ? Symbol.for("react.suspense_list") : 60120, y = t ? Symbol.for("react.memo") : 60115, E = t ? Symbol.for("react.lazy") : 60116, N = t ? Symbol.for("react.block") : 60121, z = t ? Symbol.for("react.fundamental") : 60117, w = t ? Symbol.for("react.responder") : 60118, O = t ? Symbol.for("react.scope") : 60119;
    function D(k) {
      return typeof k == "string" || typeof k == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      k === s || k === C || k === v || k === p || k === c || k === T || typeof k == "object" && k !== null && (k.$$typeof === E || k.$$typeof === y || k.$$typeof === h || k.$$typeof === m || k.$$typeof === g || k.$$typeof === z || k.$$typeof === w || k.$$typeof === O || k.$$typeof === N);
    }
    function j(k) {
      if (typeof k == "object" && k !== null) {
        var le = k.$$typeof;
        switch (le) {
          case n:
            var pe = k.type;
            switch (pe) {
              case f:
              case C:
              case s:
              case v:
              case p:
              case c:
                return pe;
              default:
                var ye = pe && pe.$$typeof;
                switch (ye) {
                  case m:
                  case g:
                  case E:
                  case y:
                  case h:
                    return ye;
                  default:
                    return le;
                }
            }
          case r:
            return le;
        }
      }
    }
    var d = f, A = C, S = m, I = h, ee = n, X = g, te = s, G = E, ve = y, Z = r, re = v, Y = p, se = c, de = !1;
    function ue(k) {
      return de || (de = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), u(k) || j(k) === f;
    }
    function u(k) {
      return j(k) === C;
    }
    function M(k) {
      return j(k) === m;
    }
    function _(k) {
      return j(k) === h;
    }
    function F(k) {
      return typeof k == "object" && k !== null && k.$$typeof === n;
    }
    function $(k) {
      return j(k) === g;
    }
    function H(k) {
      return j(k) === s;
    }
    function l(k) {
      return j(k) === E;
    }
    function b(k) {
      return j(k) === y;
    }
    function P(k) {
      return j(k) === r;
    }
    function L(k) {
      return j(k) === v;
    }
    function R(k) {
      return j(k) === p;
    }
    function U(k) {
      return j(k) === c;
    }
    W.AsyncMode = d, W.ConcurrentMode = A, W.ContextConsumer = S, W.ContextProvider = I, W.Element = ee, W.ForwardRef = X, W.Fragment = te, W.Lazy = G, W.Memo = ve, W.Portal = Z, W.Profiler = re, W.StrictMode = Y, W.Suspense = se, W.isAsyncMode = ue, W.isConcurrentMode = u, W.isContextConsumer = M, W.isContextProvider = _, W.isElement = F, W.isForwardRef = $, W.isFragment = H, W.isLazy = l, W.isMemo = b, W.isPortal = P, W.isProfiler = L, W.isStrictMode = R, W.isSuspense = U, W.isValidElementType = D, W.typeOf = j;
  }()), W;
}
var et;
function ht() {
  return et || (et = 1, process.env.NODE_ENV === "production" ? ze.exports = er() : ze.exports = tr()), ze.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Fe, tt;
function rr() {
  if (tt) return Fe;
  tt = 1;
  var t = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function s(v) {
    if (v == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(v);
  }
  function p() {
    try {
      if (!Object.assign)
        return !1;
      var v = new String("abc");
      if (v[5] = "de", Object.getOwnPropertyNames(v)[0] === "5")
        return !1;
      for (var h = {}, m = 0; m < 10; m++)
        h["_" + String.fromCharCode(m)] = m;
      var f = Object.getOwnPropertyNames(h).map(function(g) {
        return h[g];
      });
      if (f.join("") !== "0123456789")
        return !1;
      var C = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(g) {
        C[g] = g;
      }), Object.keys(Object.assign({}, C)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Fe = p() ? Object.assign : function(v, h) {
    for (var m, f = s(v), C, g = 1; g < arguments.length; g++) {
      m = Object(arguments[g]);
      for (var c in m)
        n.call(m, c) && (f[c] = m[c]);
      if (t) {
        C = t(m);
        for (var T = 0; T < C.length; T++)
          r.call(m, C[T]) && (f[C[T]] = m[C[T]]);
      }
    }
    return f;
  }, Fe;
}
var _e, rt;
function Ye() {
  if (rt) return _e;
  rt = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return _e = t, _e;
}
var Be, nt;
function mt() {
  return nt || (nt = 1, Be = Function.call.bind(Object.prototype.hasOwnProperty)), Be;
}
var He, at;
function nr() {
  if (at) return He;
  at = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var n = /* @__PURE__ */ Ye(), r = {}, s = /* @__PURE__ */ mt();
    t = function(v) {
      var h = "Warning: " + v;
      typeof console < "u" && console.error(h);
      try {
        throw new Error(h);
      } catch {
      }
    };
  }
  function p(v, h, m, f, C) {
    if (process.env.NODE_ENV !== "production") {
      for (var g in v)
        if (s(v, g)) {
          var c;
          try {
            if (typeof v[g] != "function") {
              var T = Error(
                (f || "React class") + ": " + m + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof v[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw T.name = "Invariant Violation", T;
            }
            c = v[g](h, g, f, m, null, n);
          } catch (E) {
            c = E;
          }
          if (c && !(c instanceof Error) && t(
            (f || "React class") + ": type specification of " + m + " `" + g + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof c + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), c instanceof Error && !(c.message in r)) {
            r[c.message] = !0;
            var y = C ? C() : "";
            t(
              "Failed " + m + " type: " + c.message + (y ?? "")
            );
          }
        }
    }
  }
  return p.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, He = p, He;
}
var Ve, ot;
function ar() {
  if (ot) return Ve;
  ot = 1;
  var t = ht(), n = rr(), r = /* @__PURE__ */ Ye(), s = /* @__PURE__ */ mt(), p = /* @__PURE__ */ nr(), v = function() {
  };
  process.env.NODE_ENV !== "production" && (v = function(m) {
    var f = "Warning: " + m;
    typeof console < "u" && console.error(f);
    try {
      throw new Error(f);
    } catch {
    }
  });
  function h() {
    return null;
  }
  return Ve = function(m, f) {
    var C = typeof Symbol == "function" && Symbol.iterator, g = "@@iterator";
    function c(u) {
      var M = u && (C && u[C] || u[g]);
      if (typeof M == "function")
        return M;
    }
    var T = "<<anonymous>>", y = {
      array: w("array"),
      bigint: w("bigint"),
      bool: w("boolean"),
      func: w("function"),
      number: w("number"),
      object: w("object"),
      string: w("string"),
      symbol: w("symbol"),
      any: O(),
      arrayOf: D,
      element: j(),
      elementType: d(),
      instanceOf: A,
      node: X(),
      objectOf: I,
      oneOf: S,
      oneOfType: ee,
      shape: G,
      exact: ve
    };
    function E(u, M) {
      return u === M ? u !== 0 || 1 / u === 1 / M : u !== u && M !== M;
    }
    function N(u, M) {
      this.message = u, this.data = M && typeof M == "object" ? M : {}, this.stack = "";
    }
    N.prototype = Error.prototype;
    function z(u) {
      if (process.env.NODE_ENV !== "production")
        var M = {}, _ = 0;
      function F(H, l, b, P, L, R, U) {
        if (P = P || T, R = R || b, U !== r) {
          if (f) {
            var k = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw k.name = "Invariant Violation", k;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var le = P + ":" + b;
            !M[le] && // Avoid spamming the console because they are often not actionable except for lib authors
            _ < 3 && (v(
              "You are manually calling a React.PropTypes validation function for the `" + R + "` prop on `" + P + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), M[le] = !0, _++);
          }
        }
        return l[b] == null ? H ? l[b] === null ? new N("The " + L + " `" + R + "` is marked as required " + ("in `" + P + "`, but its value is `null`.")) : new N("The " + L + " `" + R + "` is marked as required in " + ("`" + P + "`, but its value is `undefined`.")) : null : u(l, b, P, L, R);
      }
      var $ = F.bind(null, !1);
      return $.isRequired = F.bind(null, !0), $;
    }
    function w(u) {
      function M(_, F, $, H, l, b) {
        var P = _[F], L = Y(P);
        if (L !== u) {
          var R = se(P);
          return new N(
            "Invalid " + H + " `" + l + "` of type " + ("`" + R + "` supplied to `" + $ + "`, expected ") + ("`" + u + "`."),
            { expectedType: u }
          );
        }
        return null;
      }
      return z(M);
    }
    function O() {
      return z(h);
    }
    function D(u) {
      function M(_, F, $, H, l) {
        if (typeof u != "function")
          return new N("Property `" + l + "` of component `" + $ + "` has invalid PropType notation inside arrayOf.");
        var b = _[F];
        if (!Array.isArray(b)) {
          var P = Y(b);
          return new N("Invalid " + H + " `" + l + "` of type " + ("`" + P + "` supplied to `" + $ + "`, expected an array."));
        }
        for (var L = 0; L < b.length; L++) {
          var R = u(b, L, $, H, l + "[" + L + "]", r);
          if (R instanceof Error)
            return R;
        }
        return null;
      }
      return z(M);
    }
    function j() {
      function u(M, _, F, $, H) {
        var l = M[_];
        if (!m(l)) {
          var b = Y(l);
          return new N("Invalid " + $ + " `" + H + "` of type " + ("`" + b + "` supplied to `" + F + "`, expected a single ReactElement."));
        }
        return null;
      }
      return z(u);
    }
    function d() {
      function u(M, _, F, $, H) {
        var l = M[_];
        if (!t.isValidElementType(l)) {
          var b = Y(l);
          return new N("Invalid " + $ + " `" + H + "` of type " + ("`" + b + "` supplied to `" + F + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return z(u);
    }
    function A(u) {
      function M(_, F, $, H, l) {
        if (!(_[F] instanceof u)) {
          var b = u.name || T, P = ue(_[F]);
          return new N("Invalid " + H + " `" + l + "` of type " + ("`" + P + "` supplied to `" + $ + "`, expected ") + ("instance of `" + b + "`."));
        }
        return null;
      }
      return z(M);
    }
    function S(u) {
      if (!Array.isArray(u))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? v(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : v("Invalid argument supplied to oneOf, expected an array.")), h;
      function M(_, F, $, H, l) {
        for (var b = _[F], P = 0; P < u.length; P++)
          if (E(b, u[P]))
            return null;
        var L = JSON.stringify(u, function(U, k) {
          var le = se(k);
          return le === "symbol" ? String(k) : k;
        });
        return new N("Invalid " + H + " `" + l + "` of value `" + String(b) + "` " + ("supplied to `" + $ + "`, expected one of " + L + "."));
      }
      return z(M);
    }
    function I(u) {
      function M(_, F, $, H, l) {
        if (typeof u != "function")
          return new N("Property `" + l + "` of component `" + $ + "` has invalid PropType notation inside objectOf.");
        var b = _[F], P = Y(b);
        if (P !== "object")
          return new N("Invalid " + H + " `" + l + "` of type " + ("`" + P + "` supplied to `" + $ + "`, expected an object."));
        for (var L in b)
          if (s(b, L)) {
            var R = u(b, L, $, H, l + "." + L, r);
            if (R instanceof Error)
              return R;
          }
        return null;
      }
      return z(M);
    }
    function ee(u) {
      if (!Array.isArray(u))
        return process.env.NODE_ENV !== "production" && v("Invalid argument supplied to oneOfType, expected an instance of array."), h;
      for (var M = 0; M < u.length; M++) {
        var _ = u[M];
        if (typeof _ != "function")
          return v(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + de(_) + " at index " + M + "."
          ), h;
      }
      function F($, H, l, b, P) {
        for (var L = [], R = 0; R < u.length; R++) {
          var U = u[R], k = U($, H, l, b, P, r);
          if (k == null)
            return null;
          k.data && s(k.data, "expectedType") && L.push(k.data.expectedType);
        }
        var le = L.length > 0 ? ", expected one of type [" + L.join(", ") + "]" : "";
        return new N("Invalid " + b + " `" + P + "` supplied to " + ("`" + l + "`" + le + "."));
      }
      return z(F);
    }
    function X() {
      function u(M, _, F, $, H) {
        return Z(M[_]) ? null : new N("Invalid " + $ + " `" + H + "` supplied to " + ("`" + F + "`, expected a ReactNode."));
      }
      return z(u);
    }
    function te(u, M, _, F, $) {
      return new N(
        (u || "React class") + ": " + M + " type `" + _ + "." + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + $ + "`."
      );
    }
    function G(u) {
      function M(_, F, $, H, l) {
        var b = _[F], P = Y(b);
        if (P !== "object")
          return new N("Invalid " + H + " `" + l + "` of type `" + P + "` " + ("supplied to `" + $ + "`, expected `object`."));
        for (var L in u) {
          var R = u[L];
          if (typeof R != "function")
            return te($, H, l, L, se(R));
          var U = R(b, L, $, H, l + "." + L, r);
          if (U)
            return U;
        }
        return null;
      }
      return z(M);
    }
    function ve(u) {
      function M(_, F, $, H, l) {
        var b = _[F], P = Y(b);
        if (P !== "object")
          return new N("Invalid " + H + " `" + l + "` of type `" + P + "` " + ("supplied to `" + $ + "`, expected `object`."));
        var L = n({}, _[F], u);
        for (var R in L) {
          var U = u[R];
          if (s(u, R) && typeof U != "function")
            return te($, H, l, R, se(U));
          if (!U)
            return new N(
              "Invalid " + H + " `" + l + "` key `" + R + "` supplied to `" + $ + "`.\nBad object: " + JSON.stringify(_[F], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(u), null, "  ")
            );
          var k = U(b, R, $, H, l + "." + R, r);
          if (k)
            return k;
        }
        return null;
      }
      return z(M);
    }
    function Z(u) {
      switch (typeof u) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !u;
        case "object":
          if (Array.isArray(u))
            return u.every(Z);
          if (u === null || m(u))
            return !0;
          var M = c(u);
          if (M) {
            var _ = M.call(u), F;
            if (M !== u.entries) {
              for (; !(F = _.next()).done; )
                if (!Z(F.value))
                  return !1;
            } else
              for (; !(F = _.next()).done; ) {
                var $ = F.value;
                if ($ && !Z($[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function re(u, M) {
      return u === "symbol" ? !0 : M ? M["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && M instanceof Symbol : !1;
    }
    function Y(u) {
      var M = typeof u;
      return Array.isArray(u) ? "array" : u instanceof RegExp ? "object" : re(M, u) ? "symbol" : M;
    }
    function se(u) {
      if (typeof u > "u" || u === null)
        return "" + u;
      var M = Y(u);
      if (M === "object") {
        if (u instanceof Date)
          return "date";
        if (u instanceof RegExp)
          return "regexp";
      }
      return M;
    }
    function de(u) {
      var M = se(u);
      switch (M) {
        case "array":
        case "object":
          return "an " + M;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + M;
        default:
          return M;
      }
    }
    function ue(u) {
      return !u.constructor || !u.constructor.name ? T : u.constructor.name;
    }
    return y.checkPropTypes = p, y.resetWarningCache = p.resetWarningCache, y.PropTypes = y, y;
  }, Ve;
}
var We, st;
function or() {
  if (st) return We;
  st = 1;
  var t = /* @__PURE__ */ Ye();
  function n() {
  }
  function r() {
  }
  return r.resetWarningCache = n, We = function() {
    function s(h, m, f, C, g, c) {
      if (c !== t) {
        var T = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw T.name = "Invariant Violation", T;
      }
    }
    s.isRequired = s;
    function p() {
      return s;
    }
    var v = {
      array: s,
      bigint: s,
      bool: s,
      func: s,
      number: s,
      object: s,
      string: s,
      symbol: s,
      any: s,
      arrayOf: p,
      element: s,
      elementType: s,
      instanceOf: p,
      node: s,
      objectOf: p,
      oneOf: p,
      oneOfType: p,
      shape: p,
      exact: p,
      checkPropTypes: r,
      resetWarningCache: n
    };
    return v.PropTypes = v, v;
  }, We;
}
var lt;
function sr() {
  if (lt) return je.exports;
  if (lt = 1, process.env.NODE_ENV !== "production") {
    var t = ht(), n = !0;
    je.exports = /* @__PURE__ */ ar()(t.isElement, n);
  } else
    je.exports = /* @__PURE__ */ or()();
  return je.exports;
}
var lr = /* @__PURE__ */ sr();
const i = /* @__PURE__ */ Qt(lr), Ie = {
  facebook: Ut,
  instagram: Gt,
  tiktok: Xt,
  linkedin: Jt,
  youtube: Zt,
  twitter: qe,
  x: qe,
  default: Kt
};
function Ne({ platform: t, color: n, size: r }) {
  const s = Ie[t.toLowerCase()] || Ie.default;
  return /* @__PURE__ */ e(
    s,
    {
      color: n,
      size: r,
      style: {
        display: "block",
        // Ensures the SVG behaves like a block element
        margin: "auto",
        // Centers the icon in its container
        width: "100%",
        // Fill the container width
        height: "100%"
        // Fill the container height
      }
    }
  );
}
Ne.propTypes = {
  platform: i.oneOf(["facebook", "instagram", "tiktok", "linkedin", "youtube", "twitter", "x", "default"]).isRequired,
  color: i.string,
  size: i.oneOfType([i.number, i.string])
};
Ne.defaultProps = {
  color: "currentColor",
  size: "100%"
};
const ft = () => Object.keys(Ie).filter((t) => t !== "default"), it = {
  colors: {
    primary: "#1976d2",
    secondary: "#9c27b0",
    success: "#2e7d32",
    error: "#d32f2f",
    warning: "#ed6c02",
    info: "#0288d1",
    background: "#ffffff",
    surface: "#f5f5f5",
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)"
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.5rem"
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem"
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px"
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    md: "0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
    lg: "0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)"
  },
  transitions: {
    fast: "150ms ease-in-out",
    normal: "300ms ease-in-out",
    slow: "500ms ease-in-out"
  }
};
function Oe(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function gt(t, n) {
  const r = { ...t };
  return Oe(t) && Oe(n) && Object.keys(n).forEach((s) => {
    Oe(n[s]) ? s in t ? r[s] = gt(t[s], n[s]) : Object.assign(r, { [s]: n[s] }) : Object.assign(r, { [s]: n[s] });
  }), r;
}
function ir(t, n = "--sm") {
  const r = {};
  function s(p, v = []) {
    Object.entries(p).forEach(([h, m]) => {
      const f = [...v, h];
      if (Oe(m))
        s(m, f);
      else {
        const C = `${n}-${f.join("-")}`;
        r[C] = m;
      }
    });
  }
  return s(t), r;
}
function cr(t, n) {
  Object.entries(n).forEach(([r, s]) => {
    t.style.setProperty(r, s);
  });
}
const pt = At();
function dr({ theme: t, children: n }) {
  const r = xe(() => t ? gt(it, t) : it, [t]);
  return he(() => {
    var v, h, m, f;
    const s = ir(r);
    return cr(document.documentElement, s), ((h = (v = r.colors) == null ? void 0 : v.background) == null ? void 0 : h.toString().toLowerCase()) === "#121212" || ((f = (m = r.colors) == null ? void 0 : m.background) == null ? void 0 : f.toString().toLowerCase()) === "#1e1e1e" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark"), () => {
    };
  }, [r]), /* @__PURE__ */ e(pt.Provider, { value: { theme: r }, children: n });
}
dr.propTypes = {
  theme: i.object,
  children: i.node.isRequired
};
function Le() {
  const t = Ft(pt);
  if (!t)
    throw new Error("useTheme must be used within a ThemeProvider");
  return t.theme;
}
const ur = oe.memo(({
  avatar: t,
  name: n,
  platform: r,
  tooltipText: s,
  onClick: p,
  size: v = "md",
  isSelected: h,
  onCardClick: m,
  id: f
}) => {
  const [C, g] = q(!1), c = Le(), [T, y] = q(h || !1);
  he(() => {
    y(h || !1);
  }, [h]);
  const E = t || "https://via.placeholder.com/100", N = () => {
    alert(`Clicked on ${n || "AccountCard"}`);
  }, z = (j) => {
    if (m) {
      m(j);
      return;
    }
    p ? p(j) : N();
  }, O = (() => {
    switch (v) {
      case "sm":
        return {
          container: "w-12 h-12",
          // 48px
          icon: "w-6 h-6 p-[2px]"
          // Increased from w-5 to w-6, reduced padding
        };
      case "lg":
        return {
          container: "w-20 h-20",
          // 80px
          icon: "w-9 h-9 p-[4px]"
          // Increased from w-7 to w-9, reduced padding
        };
      default:
        return {
          container: "w-16 h-16",
          // 64px
          icon: "w-6 h-6 p-[4px]"
          // Increased from w-5 to w-7, reduced padding
        };
    }
  })(), D = hr(r, c);
  return /* @__PURE__ */ o(
    "div",
    {
      className: `relative inline-flex flex-col items-center justify-center cursor-pointer m-2 transition-transform duration-300 origin-bottom
        ${T ? "" : "hover:-translate-y-1"}`,
      onMouseEnter: () => g(!0),
      onMouseLeave: () => g(!1),
      onClick: z,
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: `relative ${O.container} rounded-full overflow-visible ${T ? "border-3 shadow-lg ring-2 ring-offset-2" : "border-0"}`,
            style: {
              borderColor: T ? c.colors.primary : "transparent",
              ringColor: T ? c.colors.primary : "transparent"
            },
            children: [
              /* @__PURE__ */ e(
                "img",
                {
                  src: E,
                  alt: n || "User avatar",
                  className: "w-full h-full object-cover rounded-full shadow-md"
                }
              ),
              /* @__PURE__ */ e(
                "div",
                {
                  className: `absolute bottom-0 right-0 ${O.icon} rounded-full flex items-center justify-center 
            translate-x-[20%] translate-y-[20%] shadow-md`,
                  style: { backgroundColor: D },
                  children: /* @__PURE__ */ e(Ne, { platform: r || "default", color: "#FFFFFF" })
                }
              )
            ]
          }
        ),
        C && s && /* @__PURE__ */ o("div", { className: `absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-white text-gray-800 \r
          px-3 py-1 rounded whitespace-nowrap text-sm z-10 shadow-sm pointer-events-none`, children: [
          s,
          /* @__PURE__ */ e("div", { className: "absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" })
        ] })
      ]
    }
  );
});
function hr(t = "", n) {
  return {
    facebook: "#1877F2",
    instagram: "#E4405F",
    tiktok: "#000000",
    linkedin: "#0A66C2",
    youtube: "#FF0000",
    twitter: "#1DA1F2",
    x: "#1DA1F2"
  }[t.toLowerCase()] || n.colors.primary;
}
ur.propTypes = {
  avatar: i.string,
  name: i.string,
  platform: i.oneOf([...ft(), "default"]),
  tooltipText: i.string,
  onClick: i.func,
  size: i.oneOf(["sm", "md", "lg"]),
  isSelected: i.bool,
  onCardClick: i.func,
  id: i.oneOfType([i.string, i.number])
};
const bt = ({
  isMenuOpen: t,
  onToggleMenu: n,
  onSelectPlatform: r,
  platforms: s = ["facebook", "instagram", "twitter", "youtube", "tiktok", "linkedin"],
  size: p = "md"
}) => {
  const v = Le(), h = {
    facebook: "#1877F2",
    instagram: "#E4405F",
    tiktok: "#000000",
    linkedin: "#0A66C2",
    youtube: "#FF0000",
    twitter: "#1DA1F2",
    x: "#1DA1F2"
  };
  let m, f, C, g, c;
  switch (p) {
    case "sm":
      m = 44, f = 85, C = 50, g = 170, c = 280;
      break;
    case "lg":
      m = 72, f = 125, C = 65, g = 250, c = 360;
      break;
    case "md":
    default:
      m = 58, f = 105, C = 60, g = 210, c = 320;
      break;
  }
  const T = 360 / s.length;
  return /* @__PURE__ */ o(
    "div",
    {
      className: `account-card-wrapper add-button-wrapper add-button-wrapper--${p} ${t ? "menu-open" : ""}`,
      style: {
        "--button-size": `${m}px`,
        "--primary-color": v.colors.primary,
        "--container-bg": v.colors.surface,
        "--angle-step": `${T}deg`
        // Make angle step available to CSS
      },
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: "add-account-button-wrapper",
            onClick: n,
            children: [
              /* @__PURE__ */ e("div", { className: "add-account-button", children: /* @__PURE__ */ e("span", { className: "plus-icon", children: t ? "×" : "+" }) }),
              /* @__PURE__ */ e("span", { className: "add-account-label", children: "Add Account" })
            ]
          }
        ),
        t && /* @__PURE__ */ o(be, { children: [
          /* @__PURE__ */ e(
            "div",
            {
              className: "local-overlay",
              style: { "--overlay-size": `${c}px` },
              onClick: n
            }
          ),
          /* @__PURE__ */ e("ul", { className: "platform-circle-container", style: {
            "--circle-size": `${g}px`,
            "--item-size": `${C}px`,
            "--translate-distance": `${f}px`
          }, children: s.map((y, E) => /* @__PURE__ */ e(
            "li",
            {
              className: "platform-item",
              style: {
                "--platform-color": h[y.toLowerCase()] || v.colors.primary
              },
              onClick: (N) => {
                N.stopPropagation(), r(y);
              },
              children: /* @__PURE__ */ e("div", { className: "platform-icon-wrapper", children: /* @__PURE__ */ e(Ne, { platform: y }) })
            },
            y
          )) })
        ] })
      ]
    }
  );
};
bt.propTypes = {
  isMenuOpen: i.bool.isRequired,
  onToggleMenu: i.func.isRequired,
  onSelectPlatform: i.func.isRequired,
  platforms: i.arrayOf(i.string),
  size: i.oneOf(["sm", "md", "lg"])
};
const mr = ({
  children: t,
  title: n,
  hideTitle: r = !1,
  // New prop to hide the title
  transparent: s = !1,
  // New prop to remove background and padding
  maxRows: p = 1,
  expandBreakpoint: v = "768px",
  itemsPerRow: h = 5,
  selectable: m = !1,
  onSelectionChange: f = null,
  editable: C = !1,
  onAccountAdd: g = null,
  onAccountRemove: c = null,
  showAddButton: T = !1,
  scrollable: y = !1,
  // When true, horizontal scroll; when false, wrap to next line
  size: E = "md"
  // Add size prop with default value 'md'
}) => {
  const N = ke(null), [z, w] = q(!1), O = Le(), [D, j] = q([]), [d, A] = q(!1), [S, I] = q(!1);
  he(() => {
    const Z = () => {
      if (N.current) {
        const { scrollWidth: re, clientWidth: Y } = N.current;
        w(re > Y);
      }
    };
    return Z(), window.addEventListener("resize", Z), () => {
      window.removeEventListener("resize", Z);
    };
  }, [t]);
  const ee = _t((Z) => {
    m && j((re) => {
      const Y = Z.key, de = re.includes(Y) ? re.filter((ue) => ue !== Y) : [...re, Y];
      return setTimeout(() => {
        if (f) {
          const ue = oe.Children.toArray(t).filter((u) => oe.isValidElement(u) && de.includes(u.key)).map((u) => ({
            id: u.props.id || u.key,
            props: oe.isValidElement(u) ? { ...u.props } : {}
          }));
          f(ue);
        }
      }, 0), de;
    });
  }, [m, t, f]), X = (Z, re) => {
    re.stopPropagation(), c ? c(Z) : alert(`Remove account with ID: ${Z}`);
  }, te = (Z = null) => {
    Z && (g ? g(Z) : alert(`Add new ${Z} account`), I(!1));
  }, G = oe.useMemo(() => {
    const re = oe.Children.toArray(t).map((Y) => {
      if (oe.isValidElement(Y)) {
        const se = oe.cloneElement(Y, {
          isSelected: D.includes(Y.key),
          onCardClick: m ? () => ee(Y) : void 0
        });
        return /* @__PURE__ */ o("div", { className: "relative", children: [
          C && d && /* @__PURE__ */ e(
            "button",
            {
              className: "absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full text-lg shadow-md hover:bg-red-700 hover:scale-110 transition-all z-10",
              onClick: (de) => X(Y.props.id || Y.key, de),
              children: "×"
            }
          ),
          se
        ] }, Y.key);
      }
      return Y;
    });
    return T && re.push(
      /* @__PURE__ */ e(
        bt,
        {
          isMenuOpen: S,
          onToggleMenu: () => I(!S),
          onSelectPlatform: te,
          size: E
        },
        "add-account"
      )
    ), re;
  }, [
    t,
    m,
    D,
    ee,
    d,
    C,
    c,
    T,
    S,
    E
  ]), ve = y ? "flex flex-nowrap overflow-x-auto pb-2 scrollbar-thin" : "flex flex-wrap gap-4 overflow-visible";
  return /* @__PURE__ */ o(
    "div",
    {
      className: `w-full relative ${s ? "" : "bg-surface rounded-lg p-4 shadow-sm"} ${S ? "z-50" : ""}`,
      style: s ? {} : { backgroundColor: O.colors.surface },
      children: [
        (!r && n || C) && /* @__PURE__ */ o("div", { className: "flex justify-start items-center mb-4 gap-4", children: [
          C && /* @__PURE__ */ o(
            "div",
            {
              className: `flex items-center cursor-pointer px-3 py-1.5 rounded ${d ? "hover:bg-red-100" : "hover:bg-blue-100"}`,
              onClick: () => A(!d),
              children: [
                /* @__PURE__ */ e("span", { className: `mr-2 ${d ? "text-red-600" : "text-blue-600"}`, children: d ? "✓" : "✎" }),
                /* @__PURE__ */ e("span", { className: `text-sm font-medium ${d ? "text-red-600" : "text-blue-600"}`, children: d ? "Done" : "Edit" })
              ]
            }
          ),
          !r && n && /* @__PURE__ */ e("h3", { className: "text-xl font-normal m-0", children: n })
        ] }),
        d && /* @__PURE__ */ e("p", { className: "text-gray-600 text-sm italic text-center mb-4", children: "Click the X button to remove accounts" }),
        /* @__PURE__ */ e("div", { className: ve, ref: N, children: G }),
        y && z && /* @__PURE__ */ e("div", { className: "absolute right-4 bottom-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md animate-pulse", children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "ml-1", children: /* @__PURE__ */ e("polyline", { points: "9 18 15 12 9 6" }) }) })
      ]
    }
  );
};
mr.propTypes = {
  children: i.node.isRequired,
  title: i.string,
  hideTitle: i.bool,
  transparent: i.bool,
  maxRows: i.number,
  expandBreakpoint: i.string,
  itemsPerRow: i.number,
  selectable: i.bool,
  onSelectionChange: i.func,
  editable: i.bool,
  onAccountAdd: i.func,
  onAccountRemove: i.func,
  showAddButton: i.bool,
  scrollable: i.bool,
  size: i.oneOf(["sm", "md", "lg"])
};
const vt = ({
  currentDate: t,
  view: n,
  onPrevPeriod: r,
  onNextPeriod: s,
  onTodayClick: p,
  onViewChange: v,
  formatHeaderDate: h,
  showDayView: m = !1,
  onSearch: f = () => {
  },
  searchQuery: C = "",
  onPlatformFilterChange: g = () => {
  },
  selectedPlatforms: c = []
}) => {
  const [T, y] = q(C), [E, N] = q(!1), z = ke(null);
  he(() => {
    function S(I) {
      z.current && !z.current.contains(I.target) && N(!1);
    }
    return document.addEventListener("mousedown", S), () => document.removeEventListener("mousedown", S);
  }, []);
  const w = ft(), O = (S) => {
    y(S.target.value);
  }, D = (S) => {
    S.preventDefault(), f(T);
  }, j = () => {
    y(""), f("");
  }, d = (S) => {
    g(S);
  }, A = () => {
    g(null, !0);
  };
  return /* @__PURE__ */ o("div", { className: "bg-white dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10", children: [
    /* @__PURE__ */ o("div", { className: "flex justify-between items-center mb-2", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center", children: [
        /* @__PURE__ */ e(
          "button",
          {
            className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
            onClick: r,
            "aria-label": "Previous period",
            children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-gray-600 dark:text-gray-300", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }) })
          }
        ),
        /* @__PURE__ */ e("h2", { className: "text-lg font-semibold text-gray-800 dark:text-gray-100 mx-2", children: h(t, n) }),
        /* @__PURE__ */ e(
          "button",
          {
            className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
            onClick: s,
            "aria-label": "Next period",
            children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-gray-600 dark:text-gray-300", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) })
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex items-center ml-4", children: [
        /* @__PURE__ */ e(
          "button",
          {
            className: "px-3 py-1.5 text-sm rounded-md font-medium mr-3 transition-colors",
            onClick: p,
            style: {
              backgroundColor: "rgba(79, 70, 229, 0.1)",
              color: "#4F46E5"
            },
            children: "Today"
          }
        ),
        /* @__PURE__ */ o("div", { className: "flex bg-gray-100 dark:bg-gray-700 rounded-md", children: [
          m && /* @__PURE__ */ e(
            "button",
            {
              className: `px-3 py-1.5 text-sm font-medium transition-colors ${n === "day" ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-600 dark:text-gray-300"} rounded-md`,
              onClick: () => v("day"),
              children: "Day"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              className: `px-3 py-1.5 text-sm font-medium transition-colors ${n === "week" ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-600 dark:text-gray-300"} rounded-md`,
              onClick: () => v("week"),
              children: "Week"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              className: `px-3 py-1.5 text-sm font-medium transition-colors ${n === "month" ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-600 dark:text-gray-300"} rounded-md`,
              onClick: () => v("month"),
              children: "Month"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex-1" }),
      /* @__PURE__ */ o("div", { className: "flex items-center", children: [
        /* @__PURE__ */ o("div", { className: "relative mr-3", ref: z, children: [
          /* @__PURE__ */ o(
            "button",
            {
              className: "flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
              onClick: () => N(!E),
              children: [
                /* @__PURE__ */ e("span", { className: "mr-1", children: "Platforms" }),
                c.length > 0 && /* @__PURE__ */ e("span", { className: "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium ml-1 px-2 py-0.5 rounded-full", children: c.length }),
                /* @__PURE__ */ e("svg", { className: "w-4 h-4 ml-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
              ]
            }
          ),
          E && /* @__PURE__ */ e("div", { className: "absolute right-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ o("div", { className: "p-2", children: [
            /* @__PURE__ */ o("div", { className: "text-xs text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center", children: [
              /* @__PURE__ */ e("span", { children: "Filter by platform" }),
              c.length > 0 && /* @__PURE__ */ e(
                "button",
                {
                  className: "text-xs text-indigo-600 dark:text-indigo-400 hover:underline",
                  onClick: A,
                  children: "Clear all"
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "max-h-60 overflow-y-auto py-1", children: w.map((S) => /* @__PURE__ */ o("label", { className: "flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer", children: [
              /* @__PURE__ */ e(
                "input",
                {
                  type: "checkbox",
                  checked: c.includes(S),
                  onChange: () => d(S),
                  className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                }
              ),
              /* @__PURE__ */ o("div", { className: "flex items-center ml-2", children: [
                /* @__PURE__ */ e("div", { className: "w-5 h-5 mr-2 bg-gray-200 dark:bg-gray-600 rounded-full p-1", children: /* @__PURE__ */ e(Ne, { platform: S, size: "100%" }) }),
                /* @__PURE__ */ e("span", { className: "text-sm text-gray-700 dark:text-gray-300 capitalize", children: S })
              ] })
            ] }, S)) })
          ] }) })
        ] }),
        /* @__PURE__ */ o("form", { onSubmit: D, className: "relative flex items-center", children: [
          /* @__PURE__ */ e("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none", children: /* @__PURE__ */ e("svg", { className: "w-4 h-4 text-gray-500 dark:text-gray-400", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" }) }) }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: T,
              onChange: O,
              placeholder: "Search events...",
              className: "w-60 pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }
          ),
          T && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "absolute inset-y-0 right-12 flex items-center pr-3",
              onClick: j,
              children: /* @__PURE__ */ e("svg", { className: "w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              type: "submit",
              className: "absolute right-0 top-0 h-full px-4 text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-r-md",
              children: [
                /* @__PURE__ */ e("span", { className: "sr-only", children: "Search" }),
                /* @__PURE__ */ e("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    c.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2 mt-2", children: c.map((S) => /* @__PURE__ */ o(
      "span",
      {
        className: "inline-flex items-center py-1 px-2 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200",
        children: [
          /* @__PURE__ */ e("div", { className: "w-3 h-3 mr-1", children: /* @__PURE__ */ e(Ne, { platform: S, size: "100%" }) }),
          /* @__PURE__ */ e("span", { className: "capitalize", children: S }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "ml-1 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500",
              onClick: () => d(S),
              children: [
                /* @__PURE__ */ e("span", { className: "sr-only", children: "Remove" }),
                /* @__PURE__ */ e("svg", { className: "h-3 w-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })
              ]
            }
          )
        ]
      },
      S
    )) })
  ] });
};
vt.propTypes = {
  currentDate: i.instanceOf(Date).isRequired,
  view: i.oneOf(["week", "month"]).isRequired,
  onPrevPeriod: i.func.isRequired,
  onNextPeriod: i.func.isRequired,
  onTodayClick: i.func.isRequired,
  onViewChange: i.func.isRequired,
  formatHeaderDate: i.func.isRequired,
  showDayView: i.bool,
  onSearch: i.func,
  searchQuery: i.string,
  onPlatformFilterChange: i.func,
  selectedPlatforms: i.arrayOf(i.string)
};
const Ue = ({
  title: t,
  description: n,
  startTime: r,
  endTime: s,
  color: p,
  isAllDay: v = !1,
  onClick: h,
  view: m = "month",
  services: f = []
}) => {
  const C = () => {
    if (v) return "All day";
    const c = (T) => new Date(T).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return s ? `${c(r)} - ${c(s)}` : c(r);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "rounded shadow-sm cursor-pointer transition-all hover:shadow-md hover:brightness-110 py-1 px-2 mb-2 w-full flex flex-col p-3",
      style: {
        backgroundColor: `${p}bb`,
        // Semi-transparency
        color: "white",
        borderLeft: `4px solid ${p}`
      },
      onClick: h,
      children: [
        /* @__PURE__ */ o("div", { className: "flex-1 text-left mb-2", children: [
          t && /* @__PURE__ */ e("div", { className: `font-bold ${m === "month" ? "text-xs" : "text-sm"} truncate text-left mb-2`, children: t }),
          n && /* @__PURE__ */ e("div", { className: `font-bold ${m === "month" ? "text-xs" : "text-sm"} 
            opacity-100 line-clamp-3 overflow-hidden text-ellipsis text-left leading-relaxed`, children: n })
        ] }),
        f && f.length > 0 && /* @__PURE__ */ e("div", { className: "flex items-center space-x-2 justify-start mb-1", children: f.map((c, T) => /* @__PURE__ */ e("div", { className: "w-5 h-5 bg-white/40 rounded-full p-1", children: /* @__PURE__ */ e(Ne, { platform: c, size: "100%" }) }, T)) }),
        /* @__PURE__ */ o("div", { className: "flex items-center text-xs opacity-90 text-left mt-1 border-t border-white/10 pt-1", children: [
          /* @__PURE__ */ e("svg", { className: "w-3.5 h-3.5 mr-1.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
          /* @__PURE__ */ e("span", { className: "font-medium", children: C() })
        ] })
      ]
    }
  );
};
Ue.propTypes = {
  title: i.string,
  description: i.string,
  startTime: i.oneOfType([i.string, i.instanceOf(Date)]),
  endTime: i.oneOfType([i.string, i.instanceOf(Date)]),
  color: i.string.isRequired,
  isAllDay: i.bool,
  onClick: i.func,
  view: i.oneOf(["month", "week"]),
  services: i.arrayOf(i.string)
};
const yt = ({
  daysInMonth: t,
  weekdayNames: n,
  selectedDate: r,
  highlightToday: s,
  onDayClick: p,
  onEventClick: v,
  onEventUpdate: h
}) => {
  const [m, f] = q(null), C = (y, E) => {
    y.preventDefault(), y.dataTransfer.dropEffect = "move", h && f(E.date.getTime());
  }, g = () => {
    f(null);
  }, c = (y, E) => {
    y.preventDefault(), f(null);
    const N = y.dataTransfer.getData("text/plain"), z = y.dataTransfer.getData("application/json");
    if (z && N && h) {
      const { hour: w, minute: O, hasEndTime: D, endHour: j, endMinute: d, duration: A } = JSON.parse(z), S = new Date(E.date);
      S.setHours(w, O, 0, 0);
      let I = null;
      D && (j !== void 0 && d !== void 0 ? (I = new Date(E.date), I.setHours(j, d, 0, 0)) : A && (I = new Date(S.getTime() + A))), h(N, S, I);
    }
  }, T = (y) => {
    if (!y.events || y.events.length === 0) return null;
    const E = y.events || [];
    return /* @__PURE__ */ e("div", { className: "mt-1", children: E.map((N) => /* @__PURE__ */ e(
      "div",
      {
        onClick: (z) => {
          z.stopPropagation(), v(N);
        },
        draggable: !!h,
        onDragStart: (z) => {
          z.dataTransfer.setData("text/plain", N.id);
          const w = {
            hour: new Date(N.startTime).getHours(),
            minute: new Date(N.startTime).getMinutes(),
            hasEndTime: !!N.endTime,
            duration: N.endTime ? new Date(N.endTime) - new Date(N.startTime) : null
          };
          z.dataTransfer.setData("application/json", JSON.stringify(w));
          const O = z.currentTarget, D = O.cloneNode(!0);
          D.style.position = "absolute", D.style.top = "-1000px", D.style.left = "-1000px", D.style.width = `${O.offsetWidth}px`, D.style.height = `${O.offsetHeight}px`, D.style.opacity = "0.7", D.style.pointerEvents = "none", D.style.zIndex = "-1", D.style.transform = "scale(0.95)", D.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)", document.body.appendChild(D), z.dataTransfer.setDragImage(D, 10, 10), setTimeout(() => {
            document.body.removeChild(D);
          }, 0);
        },
        children: /* @__PURE__ */ e(
          Ue,
          {
            title: N.title,
            description: N.description,
            startTime: N.startTime,
            endTime: N.endTime,
            color: N.color,
            isAllDay: N.isAllDay,
            services: N.services || [],
            view: "month"
          }
        )
      },
      N.id
    )) });
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ e("div", { className: "grid grid-cols-7 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600", children: n.map((y, E) => /* @__PURE__ */ e("div", { className: "py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400", children: y }, E)) }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-7 grid-auto-rows bg-white dark:bg-gray-800 gap-[1px]", children: t.map((y, E) => {
      const N = m === y.date.getTime();
      return /* @__PURE__ */ o(
        "div",
        {
          className: `
                border border-gray-200 dark:border-gray-700
                ${y.isCurrentMonth ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"} 
                ${y.isToday && s ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                ${r && y.date.toDateString() === r.toDateString() ? "ring-2 ring-indigo-400 dark:ring-indigo-600 z-10" : ""}
                ${y.isCurrentMonth ? "hover:bg-gray-50 dark:hover:bg-gray-700" : ""}
                ${N ? "ring-1 ring-blue-400 dark:ring-blue-500" : ""}
                relative p-1 min-h-[100px] flex flex-col
                ${y.events && y.events.length > 2 ? "h-auto" : ""}
                ${h ? "cursor-pointer" : ""}
                transition-all duration-200 ease-in-out
                ${N ? "z-20" : ""}
              `,
          onClick: () => p(y),
          onDragOver: (z) => h ? C(z, y) : null,
          onDragLeave: h ? g : null,
          onDrop: (z) => h ? c(z, y) : null,
          style: {
            boxShadow: N ? "0 0 12px 2px rgba(59,130,246,0.5)" : "none"
          },
          children: [
            /* @__PURE__ */ e("div", { className: "flex justify-center mb-2 pt-1", children: /* @__PURE__ */ e("span", { className: `
                  inline-flex items-center justify-center
                  ${y.isToday ? "bg-blue-500 text-white rounded-full w-7 h-7" : "text-center"}
                  ${N && !y.isToday ? "text-blue-600 dark:text-blue-400 font-medium" : ""}
                  ${y.isCurrentMonth ? y.isToday ? "text-white font-bold" : "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"}
                  transition-colors duration-150
                `, children: y.dayNumber }) }),
            N && /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-blue-100 dark:bg-blue-900 opacity-10 pointer-events-none rounded-sm z-0" }),
            y.events && y.events.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-col mt-1 relative z-10", children: T(y) })
          ]
        },
        E
      );
    }) })
  ] });
};
yt.propTypes = {
  daysInMonth: i.array.isRequired,
  weekdayNames: i.array.isRequired,
  selectedDate: i.instanceOf(Date),
  highlightToday: i.bool,
  onDayClick: i.func.isRequired,
  onEventClick: i.func,
  onEventUpdate: i.func
};
const xt = ({
  weekDays: t,
  hours: n,
  selectedDate: r,
  onDayClick: s,
  onEventClick: p,
  compactView: v = !1,
  onEventUpdate: h
}) => {
  const [m, f] = q(null), C = 15, g = (/* @__PURE__ */ new Date()).getHours(), c = xe(() => {
    const w = {};
    return t.forEach((O, D) => {
      O.events && O.events.forEach((j) => {
        const d = new Date(j.startTime), A = d.getHours(), S = d.getMinutes();
        w[A] || (w[A] = {}), w[A][D] || (w[A][D] = []), w[A][D].push({
          ...j,
          topPosition: S / 60 * 100,
          dayIndex: D
        });
      });
    }), w;
  }, [t]), T = xe(() => {
    if (!v)
      return n;
    const w = Object.keys(c).map(Number);
    if (w.length === 0) {
      const A = Math.max(0, g - 2), S = Math.min(23, g + 2);
      return n.filter((I) => I.hour >= A && I.hour <= S);
    }
    const O = Math.max(0, Math.min(...w) - 1), D = Math.min(23, Math.max(...w) + 1), j = Math.min(O, g - 1), d = Math.max(D, g + 1);
    return n.filter((A) => A.hour >= j && A.hour <= d);
  }, [n, c, v, g]), y = (w, O) => {
    const D = Math.floor(w / O * 60);
    return Math.round(D / C) * C;
  }, E = (w, O, D) => {
    if (w.preventDefault(), w.dataTransfer.dropEffect = "move", !h) return;
    const j = w.currentTarget.getBoundingClientRect(), d = w.clientY - j.top, A = y(d, j.height);
    f({
      dayIndex: O,
      hour: D,
      minute: A,
      clientX: w.clientX,
      clientY: w.clientY,
      width: j.width
    });
  }, N = () => {
    f(null);
  }, z = (w, O, D) => {
    w.preventDefault(), f(null);
    const j = w.dataTransfer.getData("text/plain");
    if (j && h && t[O]) {
      const d = new Date(t[O].date), A = w.currentTarget.getBoundingClientRect(), S = w.clientY - A.top, I = y(S, A.height);
      d.setHours(D, I, 0, 0);
      const ee = w.dataTransfer.getData("application/json");
      let X = null;
      if (ee) {
        const { hasEndTime: te, duration: G } = JSON.parse(ee);
        te && G && (X = new Date(d.getTime() + G));
      }
      h(j, d, X);
    }
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ e("div", { className: "p-2 border-r border-gray-200 dark:border-gray-700" }),
      t.map((w, O) => /* @__PURE__ */ o(
        "div",
        {
          className: `
              p-2 text-center border-r border-gray-200 dark:border-gray-700 cursor-pointer
              ${w.isToday ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              ${r && w.date.toDateString() === r.toDateString() ? "ring-2 ring-inset ring-indigo-400 dark:ring-indigo-600" : ""}
            `,
          onClick: () => s(w),
          children: [
            /* @__PURE__ */ e("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: w.dayName }),
            /* @__PURE__ */ e("div", { className: `text-base font-medium ${w.isToday ? "text-blue-600 dark:text-blue-400" : "text-gray-800 dark:text-gray-200"}`, children: w.dayNumber }),
            /* @__PURE__ */ e("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: w.monthName })
          ]
        },
        O
      ))
    ] }),
    /* @__PURE__ */ o("div", { className: "grid grid-cols-8 w-full", children: [
      /* @__PURE__ */ e("div", { className: "col-span-1", children: T.map((w, O) => /* @__PURE__ */ e(
        "div",
        {
          className: `
                h-20 border-b border-r border-gray-200 dark:border-gray-700 
                text-xs text-gray-500 dark:text-gray-400 text-right pr-2 pt-0.5
                ${w.hour === g ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}
              `,
          children: w.timeLabel
        },
        O
      )) }),
      /* @__PURE__ */ o("div", { className: "col-span-7 grid grid-cols-7 relative", children: [
        T.map((w, O) => /* @__PURE__ */ e(oe.Fragment, { children: t.map((D, j) => {
          var d, A;
          return /* @__PURE__ */ o(
            "div",
            {
              className: `
                    h-20 border-b border-r border-gray-200 dark:border-gray-700 relative
                    ${D.isToday && w.hour === g ? "bg-blue-50 dark:bg-blue-900/10" : ""}
                    ${D.isToday ? "bg-blue-50/30 dark:bg-blue-900/5" : ""}
                    ${h ? "cursor-pointer" : ""}
                  `,
              onDragOver: (S) => h ? E(S, j, w.hour) : null,
              onDragLeave: h ? N : null,
              onDrop: (S) => h ? z(S, j, w.hour) : null,
              children: [
                h && Array.from({ length: 60 / C }).map((S, I) => I > 0 && /* @__PURE__ */ e(
                  "div",
                  {
                    className: "absolute w-full border-b border-dashed border-gray-200 dark:border-gray-700 pointer-events-none opacity-50",
                    style: { top: `${I * C / 60 * 100}%` }
                  },
                  `guide-${I}`
                )),
                (A = (d = c[w.hour]) == null ? void 0 : d[j]) == null ? void 0 : A.map((S, I) => /* @__PURE__ */ e(
                  "div",
                  {
                    className: "absolute left-0 right-0 px-1",
                    style: {
                      top: `${S.topPosition}%`,
                      zIndex: 10
                    },
                    onClick: (ee) => {
                      ee.stopPropagation(), p(S);
                    },
                    draggable: !!h,
                    onDragStart: (ee) => {
                      ee.dataTransfer.setData("text/plain", S.id);
                      const X = {
                        hour: new Date(S.startTime).getHours(),
                        minute: new Date(S.startTime).getMinutes(),
                        hasEndTime: !!S.endTime,
                        duration: S.endTime ? new Date(S.endTime) - new Date(S.startTime) : null
                      };
                      ee.dataTransfer.setData("application/json", JSON.stringify(X));
                      const te = ee.currentTarget, G = te.cloneNode(!0);
                      G.style.position = "absolute", G.style.top = "-1000px", G.style.left = "-1000px", G.style.width = `${te.offsetWidth}px`, G.style.height = `${te.offsetHeight}px`, G.style.opacity = "0.7", G.style.pointerEvents = "none", G.style.zIndex = "-1", G.style.transform = "scale(0.95)", G.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)", document.body.appendChild(G), ee.dataTransfer.setDragImage(G, 10, 10), setTimeout(() => {
                        document.body.removeChild(G);
                      }, 0);
                    },
                    children: /* @__PURE__ */ e(
                      Ue,
                      {
                        title: S.title,
                        description: S.description,
                        startTime: S.startTime,
                        endTime: S.endTime,
                        color: S.color,
                        isAllDay: S.isAllDay,
                        services: S.services || [],
                        view: "week"
                      }
                    )
                  },
                  I
                ))
              ]
            },
            `${O}-${j}`
          );
        }) }, O)),
        t.some((w) => w.isToday) && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute left-0 right-0 border-t-2 border-red-500 z-20 pointer-events-none",
            style: {
              top: v ? `${T.findIndex((w) => w.hour === g) * 80 + (/* @__PURE__ */ new Date()).getMinutes() / 60 * 80}px` : `${g * 80 + (/* @__PURE__ */ new Date()).getMinutes() / 60 * 80}px`,
              display: T.some((w) => w.hour === g) ? "block" : "none"
            },
            children: /* @__PURE__ */ e("div", { className: "w-2.5 h-2.5 rounded-full bg-red-500 absolute -left-1.5 -top-1.5" })
          }
        ),
        m && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute h-0.5 bg-blue-600 dark:bg-blue-500 z-30 pointer-events-none transition-all duration-75 ease-in-out",
            style: {
              left: `${m.dayIndex * 100 / 7}%`,
              width: `${100 / 7}%`,
              top: `${T.findIndex((w) => w.hour === m.hour) * 80 + m.minute / 60 * 80}px`,
              height: "2px",
              boxShadow: "0 0 6px 1px rgba(59, 130, 246, 0.6)",
              transform: "scaleY(1)"
            },
            children: /* @__PURE__ */ e("div", { className: "absolute right-full mr-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded whitespace-nowrap", children: `${m.hour % 12 || 12}:${m.minute.toString().padStart(2, "0")} ${m.hour >= 12 ? "PM" : "AM"}` })
          }
        )
      ] })
    ] })
  ] });
};
xt.propTypes = {
  weekDays: i.array.isRequired,
  hours: i.array.isRequired,
  selectedDate: i.instanceOf(Date),
  onDayClick: i.func.isRequired,
  onEventClick: i.func.isRequired,
  compactView: i.bool,
  onEventUpdate: i.func
};
class De {
  /**
   * Create a calendar event
   * @param {Object} config - The event configuration
   * @param {string} config.id - Unique identifier for the event
   * @param {string} [config.title] - Event title (optional)
   * @param {string} [config.description=''] - Event description
   * @param {Date|string} config.startTime - Event start date/time
   * @param {Date|string} [config.endTime] - Event end date/time (optional)
   * @param {string} [config.color='#4F46E5'] - Event color
   * @param {boolean} [config.isAllDay=false] - Whether the event is all day
   * @param {Object} [config.metadata={}] - Additional event metadata
   * @param {string[]} [config.services=[]] - Social media services associated with this event
   */
  constructor(n) {
    this.id = n.id || `event-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, this.title = n.title || "", this.description = n.description || "", this.startTime = n.startTime instanceof Date ? n.startTime : new Date(n.startTime), this.endTime = n.endTime ? n.endTime instanceof Date ? n.endTime : new Date(n.endTime) : null, this.color = n.color || "#4F46E5", this.isAllDay = !!n.isAllDay, this.metadata = n.metadata || {}, this.services = Array.isArray(n.services) ? n.services : [];
  }
  /**
   * Check if the event has an end time
   * @returns {boolean} Whether the event has an end time
   */
  hasEndTime() {
    return this.endTime !== null;
  }
  /**
   * Create a CalendarEvent from a plain object
   * @param {Object} eventData - Plain event data object
   * @returns {CalendarEvent} New CalendarEvent instance
   */
  static fromObject(n) {
    return new De(n);
  }
  /**
   * Convert an array of plain objects to CalendarEvent instances
   * @param {Array} eventsArray - Array of plain event objects
   * @returns {Array<CalendarEvent>} Array of CalendarEvent instances
   */
  static fromArray(n) {
    return n.map((r) => De.fromObject(r));
  }
  /**
   * Check if the event matches a search query in any of its text fields
   * @param {string} searchText - Text to search for
   * @returns {boolean} True if the event contains the search text
   */
  matchesSearch(n) {
    if (!n) return !0;
    const r = n.toLowerCase();
    return this.title && this.title.toLowerCase().includes(r) || this.description && this.description.toLowerCase().includes(r) || this.metadata && Object.values(this.metadata).some(
      (s) => typeof s == "string" && s.toLowerCase().includes(r)
    );
  }
  /**
   * Get the event date formatted as a string
   * @returns {string} Formatted date
   */
  getFormattedDate() {
    return this.startTime.toLocaleDateString();
  }
  /**
   * Get the event time formatted as a string
   * @returns {string} Formatted time or time range
   */
  getFormattedTimeRange() {
    if (this.isAllDay) return "All day";
    const n = (r) => r.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return this.hasEndTime() ? `${n(this.startTime)} - ${n(this.endTime)}` : n(this.startTime);
  }
  /**
   * Get just the start time formatted
   * @returns {string} Formatted start time
   */
  getFormattedStartTime() {
    return this.isAllDay ? "All day" : this.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  /**
   * Convert the event to a plain object
   * @returns {Object} Plain event object
   */
  toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      startTime: this.startTime,
      endTime: this.endTime,
      color: this.color,
      isAllDay: this.isAllDay,
      metadata: this.metadata,
      services: this.services
    };
  }
}
const fr = ({
  initialDate: t = /* @__PURE__ */ new Date(),
  onDateClick: n,
  highlightToday: r = !0,
  startWeekOnSunday: s = !0,
  className: p = "",
  initialView: v = "month",
  events: h = [],
  maxHeight: m = "none",
  compactWeekView: f = !1,
  onEventUpdate: C = null
  // New prop for handling event updates
}) => {
  Le();
  const [g, c] = q(new Date(t)), [T, y] = q([]), [E, N] = q(null), [z, w] = q(v === "day" ? "month" : v), [O, D] = q(""), [j, d] = q([]), A = xe(() => h.map((l) => l instanceof De ? l : new De(l)), [h]), S = xe(() => {
    let l = A;
    return O && (l = l.filter((b) => b.matchesSearch(O))), j.length > 0 && (l = l.filter((b) => !b.services || b.services.length === 0 ? !1 : b.services.some((P) => j.includes(P)))), l;
  }, [A, O, j]);
  he(() => {
    X(g, S);
  }, [g, z, S]);
  const I = (l) => {
    D(l);
  }, ee = (l, b = !1) => {
    b ? d([]) : l && d((P) => P.includes(l) ? P.filter((L) => L !== l) : [...P, l]);
  }, X = (l, b) => {
    const P = l.getFullYear(), L = l.getMonth(), R = new Date(P, L, 1), U = new Date(P, L + 1, 0);
    let k = R.getDay();
    s || (k = k === 0 ? 6 : k - 1);
    const le = U.getDate(), pe = [];
    if (k > 0) {
      const me = new Date(P, L, 0).getDate();
      for (let Te = me - k + 1; Te <= me; Te++) {
        const Me = new Date(P, L - 1, Te);
        pe.push({
          date: Me,
          dayNumber: Te,
          isCurrentMonth: !1,
          isPrevMonth: !0,
          isNextMonth: !1,
          events: te(Me, b)
        });
      }
    }
    const ye = [];
    for (let ae = 1; ae <= le; ae++) {
      const me = new Date(P, L, ae);
      ye.push({
        date: me,
        dayNumber: ae,
        isCurrentMonth: !0,
        isPrevMonth: !1,
        isNextMonth: !1,
        isToday: se(me),
        events: te(me, b)
      });
    }
    const ie = Math.ceil((k + le) / 7) * 7 - (pe.length + ye.length), ce = [];
    for (let ae = 1; ae <= ie; ae++) {
      const me = new Date(P, L + 1, ae);
      ce.push({
        date: me,
        dayNumber: ae,
        isCurrentMonth: !1,
        isPrevMonth: !1,
        isNextMonth: !0,
        events: te(me, b)
      });
    }
    y([...pe, ...ye, ...ce]);
  }, te = (l, b) => b.filter((P) => {
    const L = new Date(P.startTime);
    return L.getDate() === l.getDate() && L.getMonth() === l.getMonth() && L.getFullYear() === l.getFullYear();
  }), G = () => {
    const l = new Date(g), b = l.getDay(), P = s ? b : b === 0 ? 6 : b - 1;
    l.setDate(l.getDate() - P);
    const L = [];
    for (let R = 0; R < 7; R++) {
      const U = new Date(l);
      L.push({
        date: new Date(U),
        dayNumber: U.getDate(),
        dayName: U.toLocaleDateString("en-US", { weekday: "short" }),
        monthName: U.toLocaleDateString("en-US", { month: "short" }),
        isCurrentMonth: U.getMonth() === g.getMonth(),
        isToday: se(U),
        events: te(U, h)
      }), l.setDate(l.getDate() + 1);
    }
    return L;
  }, ve = () => {
    const l = [];
    for (let b = 0; b < 24; b++)
      l.push({
        hour: b,
        timeLabel: Y(b),
        events: Z(b)
      });
    return l;
  }, Z = (l) => h.filter((b) => {
    const P = new Date(b.startTime);
    return re(P, g) && P.getHours() === l;
  }), re = (l, b) => l.getDate() === b.getDate() && l.getMonth() === b.getMonth() && l.getFullYear() === b.getFullYear(), Y = (l) => `${l % 12 === 0 ? 12 : l % 12}${l < 12 ? "am" : "pm"}`, se = (l) => {
    const b = /* @__PURE__ */ new Date();
    return l.getDate() === b.getDate() && l.getMonth() === b.getMonth() && l.getFullYear() === b.getFullYear();
  }, de = () => {
    c((l) => {
      const b = new Date(l);
      return z === "week" ? b.setDate(b.getDate() - 7) : b.setMonth(b.getMonth() - 1), b;
    });
  }, ue = () => {
    c((l) => {
      const b = new Date(l);
      return z === "week" ? b.setDate(b.getDate() + 7) : b.setMonth(b.getMonth() + 1), b;
    });
  }, u = () => {
    c(/* @__PURE__ */ new Date());
  }, M = (l) => {
    N(l.date), n && n(l.date);
  }, _ = (l, b) => {
    if (b === "week") {
      const P = G(), L = P[0].date, R = P[6].date;
      return L.getMonth() !== R.getMonth() ? `${L.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${R.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : `${L.toLocaleDateString("en-US", { month: "long", day: "numeric" })} - ${R.getDate()}, ${R.getFullYear()}`;
    } else
      return l.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, F = () => s ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], $ = (l, b, P) => {
    if (C) {
      const L = A.find((R) => R.id === l);
      if (L) {
        let R = P;
        if (L.endTime && !P) {
          const U = L.endTime - L.startTime;
          R = new Date(new Date(b).getTime() + U);
        }
        C(l, new Date(b), R);
      }
    }
  }, H = (l) => {
    alert(`Event: ${l.title}
Time: ${new Date(l.startTime).toLocaleTimeString()} - ${l.endTime ? new Date(l.endTime).toLocaleTimeString() : ""}
${l.description || ""}`);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: `bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col ${p}`,
      children: [
        /* @__PURE__ */ e(
          vt,
          {
            currentDate: g,
            view: z,
            onPrevPeriod: de,
            onNextPeriod: ue,
            onTodayClick: u,
            onViewChange: w,
            formatHeaderDate: _,
            showDayView: !1,
            onSearch: I,
            searchQuery: O,
            onPlatformFilterChange: ee,
            selectedPlatforms: j
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            className: "flex-1 overflow-auto",
            style: {
              maxHeight: m !== "none" ? `calc(${m} - ${j.length > 0 ? "100px" : "60px"})` : "none"
            },
            children: [
              z === "month" && T.length > 0 && /* @__PURE__ */ e(
                yt,
                {
                  daysInMonth: T,
                  weekdayNames: F(),
                  selectedDate: E,
                  highlightToday: r,
                  onDayClick: M,
                  onEventClick: H,
                  onEventUpdate: $
                }
              ),
              z === "week" && /* @__PURE__ */ e(
                xt,
                {
                  weekDays: G(),
                  hours: ve(),
                  selectedDate: E,
                  onDayClick: M,
                  onEventClick: H,
                  compactView: f,
                  onEventUpdate: $
                }
              )
            ]
          }
        )
      ]
    }
  );
};
fr.propTypes = {
  initialDate: i.instanceOf(Date),
  onDateClick: i.func,
  highlightToday: i.bool,
  startWeekOnSunday: i.bool,
  className: i.string,
  initialView: i.oneOf(["week", "month"]),
  events: i.arrayOf(i.shape({
    id: i.string.isRequired,
    title: i.string.isRequired,
    description: i.string,
    startTime: i.oneOfType([i.string, i.instanceOf(Date)]).isRequired,
    endTime: i.oneOfType([i.string, i.instanceOf(Date)]).isRequired,
    color: i.string.isRequired,
    isAllDay: i.bool
  })),
  maxHeight: i.string,
  compactWeekView: i.bool,
  onEventUpdate: i.func
  // Add prop type for the new prop
};
const wt = ({ onEmojiSelect: t, onClose: n }) => {
  const r = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "❣️",
    "💕",
    "💞",
    "👍",
    "👎",
    "👏",
    "🙌",
    "👌",
    "🤌",
    "🤞",
    "✌️",
    "🤟",
    "🤘",
    "👋",
    "🤚",
    "🖐️",
    "✋",
    "🖖",
    "👆",
    "👇",
    "👈",
    "👉",
    "🤙",
    "🔥",
    "✨",
    "⭐",
    "💫",
    "🌟",
    "💯",
    "💢",
    "💥",
    "💦",
    "💨"
  ], s = (p) => {
    t(p);
  };
  return /* @__PURE__ */ o("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4", children: [
    /* @__PURE__ */ o("div", { className: "flex justify-between items-center mb-2", children: [
      /* @__PURE__ */ e("h3", { className: "text-md font-medium text-gray-700 dark:text-gray-300", children: "Emoji Picker" }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: n,
          className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-8 gap-2", children: r.map((p, v) => /* @__PURE__ */ e(
      "button",
      {
        onClick: () => s(p),
        className: "h-8 w-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer text-xl transition-colors",
        children: p
      },
      v
    )) })
  ] });
};
wt.propTypes = {
  onEmojiSelect: i.func.isRequired,
  onClose: i.func.isRequired
};
function gr(t) {
  return J({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" }, child: [] }] })(t);
}
function pr(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" }, child: [] }] })(t);
}
function br(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" }, child: [] }] })(t);
}
function vr(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" }, child: [] }] })(t);
}
function yr(t) {
  return J({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" }, child: [] }] })(t);
}
function xr(t) {
  return J({ attr: { viewBox: "0 0 576 512" }, child: [{ tag: "path", attr: { d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" }, child: [] }] })(t);
}
function wr(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z" }, child: [] }] })(t);
}
function kr(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" }, child: [] }] })(t);
}
function Nr(t) {
  return J({ attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" }, child: [] }] })(t);
}
function Cr(t) {
  return J({ attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" }, child: [] }] })(t);
}
function Tr(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z" }, child: [] }] })(t);
}
function Ge(t) {
  return J({ attr: { viewBox: "0 0 496 512" }, child: [{ tag: "path", attr: { d: "M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z" }, child: [] }] })(t);
}
function Mr(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z" }, child: [] }] })(t);
}
function Pe(t) {
  return J({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" }, child: [] }] })(t);
}
function Ae(t) {
  return J({ attr: { viewBox: "0 0 384 512" }, child: [{ tag: "path", attr: { d: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" }, child: [] }] })(t);
}
function Sr(t) {
  return J({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" }, child: [] }] })(t);
}
function Dr(t) {
  return J({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z" }, child: [] }] })(t);
}
function Pr(t) {
  return J({ attr: { viewBox: "0 0 496 512" }, child: [{ tag: "path", attr: { d: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm194.8 170.2C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.6-16.3 11-36.7 24.6-20.5 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c13.4-16.2 38.1 4.2 24.6 20.5z" }, child: [] }] })(t);
}
function Lr(t) {
  return J({ attr: { viewBox: "0 0 352 512" }, child: [{ tag: "path", attr: { d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" }, child: [] }] })(t);
}
function ct(t) {
  return J({ attr: { viewBox: "0 0 576 512" }, child: [{ tag: "path", attr: { d: "M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z" }, child: [] }] })(t);
}
const Er = ({ account: t, caption: n, media: r, location: s, selectedMediaIndex: p, timestamp: v, formatCaptionForPreview: h, isVideo: m, goToPrevMedia: f, goToNextMedia: C, selectMediaDot: g }) => {
  const c = r[p !== null ? p : 0], T = () => c ? {
    aspectRatio: "1/1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  } : null;
  return /* @__PURE__ */ o("div", { className: "border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center p-3", children: [
      /* @__PURE__ */ e("div", { className: "h-8 w-8 rounded-full overflow-hidden mr-2", children: /* @__PURE__ */ e(
        "img",
        {
          src: `https://i.pravatar.cc/150?img=${t.id || 11}`,
          alt: t.name,
          className: "h-full w-full object-cover"
        }
      ) }),
      /* @__PURE__ */ e("div", { className: "font-medium text-sm", children: t.name }),
      s && /* @__PURE__ */ e("div", { className: "text-xs text-gray-500 ml-2", children: s }),
      /* @__PURE__ */ e("div", { className: "ml-auto", children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" }) }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "bg-black relative", style: T(), children: r.length > 0 ? /* @__PURE__ */ o(be, { children: [
      c && m(c) ? /* @__PURE__ */ e(
        "video",
        {
          src: c.url,
          className: "max-w-full max-h-full w-auto h-auto object-contain",
          autoPlay: !0,
          loop: !0,
          muted: !0,
          playsInline: !0,
          controls: !0
        }
      ) : /* @__PURE__ */ e(
        "img",
        {
          src: c ? c.url : "",
          alt: "Post media",
          className: "max-w-full max-h-full w-auto h-auto object-contain"
        }
      ),
      r.length > 1 && /* @__PURE__ */ o("div", { className: "absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5", children: [
        p !== null ? p + 1 : 1,
        "/",
        r.length
      ] }),
      r.length > 1 && /* @__PURE__ */ o(be, { children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: f,
            className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80",
            children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }) })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: C,
            className: "absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80",
            children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) })
          }
        )
      ] }),
      r.length > 1 && /* @__PURE__ */ e("div", { className: "absolute bottom-2 left-0 right-0 flex justify-center gap-1", children: r.map((y, E) => /* @__PURE__ */ e(
        "button",
        {
          onClick: (N) => g(E, N),
          className: `w-2 h-2 rounded-full ${p === E ? "bg-blue-500" : "bg-white/70"}`,
          "aria-label": `Go to slide ${E + 1}`
        },
        E
      )) })
    ] }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ e(Pe, { className: "h-10 w-10 text-gray-400 dark:text-gray-600" }) }) }),
    /* @__PURE__ */ o("div", { className: "p-3 text-sm", children: [
      /* @__PURE__ */ o("div", { className: "flex mb-2", children: [
        /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }),
        /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
        /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" }) }),
        /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 ml-auto", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" }) })
      ] }),
      /* @__PURE__ */ e("div", { className: "font-medium text-sm mb-2", children: "0 likes" }),
      n && /* @__PURE__ */ o("div", { className: "text-sm mb-1", children: [
        /* @__PURE__ */ e("span", { className: "font-medium mr-1", children: t.name }),
        h(n)
      ] }),
      /* @__PURE__ */ e("div", { className: "text-gray-500 text-xs uppercase mt-2", children: v })
    ] })
  ] });
}, jr = ({ account: t, caption: n, media: r, location: s, selectedMediaIndex: p, timestamp: v, formatCaptionForPreview: h, isVideo: m, goToPrevMedia: f, goToNextMedia: C, selectMediaDot: g }) => {
  const c = r[p !== null ? p : 0], T = () => c ? {
    backgroundColor: "#000",
    position: "relative",
    padding: "56.25% 0 0 0",
    // 16:9 aspect ratio container as fallback
    overflow: "hidden"
  } : null, y = () => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain"
  });
  return /* @__PURE__ */ o("div", { className: "border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center p-3", children: [
      /* @__PURE__ */ e("div", { className: "h-10 w-10 rounded-full overflow-hidden mr-2", children: /* @__PURE__ */ e(
        "img",
        {
          src: `https://i.pravatar.cc/150?img=${t.id || 11}`,
          alt: t.name,
          className: "h-full w-full object-cover"
        }
      ) }),
      /* @__PURE__ */ o("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-sm", children: t.name }),
        /* @__PURE__ */ o("div", { className: "text-xs text-gray-500 flex items-center", children: [
          v,
          " · ",
          /* @__PURE__ */ e(Ge, { className: "ml-1", size: 10 })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "ml-auto", children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" }) }) })
    ] }),
    n && /* @__PURE__ */ e("div", { className: "px-3 pb-2 text-sm", children: h(n) }),
    r.length > 0 && /* @__PURE__ */ o("div", { className: "border-t border-b border-gray-200 dark:border-gray-700", style: T(), children: [
      c && m(c) ? /* @__PURE__ */ e(
        "video",
        {
          src: c.url,
          style: y(),
          autoPlay: !0,
          loop: !0,
          muted: !0,
          playsInline: !0,
          controls: !0
        }
      ) : /* @__PURE__ */ e(
        "img",
        {
          src: c ? c.url : "",
          alt: "Post media",
          style: y()
        }
      ),
      r.length > 1 && /* @__PURE__ */ o("div", { className: "absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5 z-10", children: [
        p !== null ? p + 1 : 1,
        "/",
        r.length
      ] }),
      r.length > 1 && /* @__PURE__ */ o(be, { children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: f,
            className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80 z-10",
            children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }) })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: C,
            className: "absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80 z-10",
            children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) })
          }
        )
      ] }),
      r.length > 1 && /* @__PURE__ */ e("div", { className: "absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10", children: r.map((E, N) => /* @__PURE__ */ e(
        "button",
        {
          onClick: (z) => g(N, z),
          className: `w-2 h-2 rounded-full ${p === N ? "bg-blue-500" : "bg-white/70"}`,
          "aria-label": `Go to slide ${N + 1}`
        },
        N
      )) })
    ] }),
    s && /* @__PURE__ */ o("div", { className: "px-3 py-2 text-xs text-gray-500 flex items-center", children: [
      /* @__PURE__ */ e(Ae, { className: "mr-1" }),
      " ",
      s
    ] }),
    /* @__PURE__ */ o("div", { className: "px-3 py-2 border-t border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ o("div", { className: "flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs mb-2", children: [
        /* @__PURE__ */ e("div", { children: "0 Likes" }),
        /* @__PURE__ */ e("div", { children: "0 Comments · 0 Shares" })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-1", children: [
        /* @__PURE__ */ o("button", { className: "flex-1 flex items-center justify-center py-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded", children: [
          /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" }) }),
          "Like"
        ] }),
        /* @__PURE__ */ o("button", { className: "flex-1 flex items-center justify-center py-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded", children: [
          /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03 8 9 8s9-3.582 9-8z" }) }),
          "Comment"
        ] }),
        /* @__PURE__ */ o("button", { className: "flex-1 flex items-center justify-center py-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded", children: [
          /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" }) }),
          "Share"
        ] })
      ] })
    ] })
  ] });
}, zr = ({ account: t, caption: n, media: r, location: s, selectedMediaIndex: p, formatCaptionForPreview: v, isVideo: h, goToPrevMedia: m, goToNextMedia: f, selectMediaDot: C }) => {
  const g = r[p !== null ? p : 0], c = () => g ? h(g) ? { aspectRatio: "16/9", backgroundColor: "#000" } : {
    maxHeight: "400px",
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } : null;
  return /* @__PURE__ */ e("div", { className: "border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto", children: /* @__PURE__ */ o("div", { className: "flex items-start p-3", children: [
    /* @__PURE__ */ e("div", { className: "h-10 w-10 rounded-full overflow-hidden mr-2", children: /* @__PURE__ */ e(
      "img",
      {
        src: `https://i.pravatar.cc/150?img=${t.id || 11}`,
        alt: t.name,
        className: "h-full w-full object-cover"
      }
    ) }),
    /* @__PURE__ */ o("div", { className: "flex flex-col flex-grow min-w-0", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center", children: [
        /* @__PURE__ */ e("span", { className: "font-bold text-sm truncate", children: t.name }),
        /* @__PURE__ */ o("span", { className: "text-gray-500 text-sm ml-1 truncate", children: [
          "@",
          t.name.replace(/\s+/g, "").toLowerCase()
        ] }),
        /* @__PURE__ */ e("span", { className: "text-gray-500 text-sm mx-1", children: "·" }),
        /* @__PURE__ */ e("span", { className: "text-gray-500 text-sm", children: "2m" })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-sm mt-1 break-words", children: v(n || "What's happening?") }),
      s && /* @__PURE__ */ o("div", { className: "mt-1 text-xs text-[#1d9bf0] dark:text-[#1d9bf0]", children: [
        /* @__PURE__ */ e(Ae, { className: "inline mr-1", size: 12 }),
        " ",
        s
      ] }),
      r.length > 0 && /* @__PURE__ */ o("div", { className: "mt-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 relative", style: c(), children: [
        g && h(g) ? /* @__PURE__ */ e(
          "video",
          {
            src: g.url,
            className: "w-full h-full object-contain",
            autoPlay: !0,
            loop: !0,
            muted: !0,
            playsInline: !0,
            controls: !0
          }
        ) : /* @__PURE__ */ e(
          "img",
          {
            src: g ? g.url : "",
            alt: "Post media",
            className: "max-w-full max-h-full w-auto h-auto object-contain"
          }
        ),
        r.length > 1 && /* @__PURE__ */ o("div", { className: "absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5", children: [
          p !== null ? p + 1 : 1,
          "/",
          r.length
        ] }),
        r.length > 1 && /* @__PURE__ */ o(be, { children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: m,
              className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80",
              children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }) })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: f,
              className: "absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80",
              children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) })
            }
          )
        ] }),
        r.length > 1 && /* @__PURE__ */ e("div", { className: "absolute bottom-2 left-0 right-0 flex justify-center gap-1", children: r.map((T, y) => /* @__PURE__ */ e(
          "button",
          {
            onClick: (E) => C(y, E),
            className: `w-2 h-2 rounded-full ${p === y ? "bg-blue-500" : "bg-white/70"}`,
            "aria-label": `Go to slide ${y + 1}`
          },
          y
        )) })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex justify-between mt-3 text-gray-500", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center hover:text-[#1d9bf0]", children: [
          /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
          /* @__PURE__ */ e("span", { className: "text-xs ml-1", children: "0" })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center hover:text-[#1d9bf0]", children: [
          /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }),
          /* @__PURE__ */ e("span", { className: "text-xs ml-1", children: "0" })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center hover:text-[#f91880]", children: [
          /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }),
          /* @__PURE__ */ e("span", { className: "text-xs ml-1", children: "0" })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center hover:text-[#1d9bf0]", children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" }) }) })
      ] })
    ] })
  ] }) });
}, Or = ({ account: t, caption: n, media: r, location: s, selectedMediaIndex: p, timestamp: v, formatCaptionForPreview: h, isVideo: m, goToPrevMedia: f, goToNextMedia: C, selectMediaDot: g }) => {
  const c = r[p !== null ? p : 0], T = () => c ? m(c) ? { aspectRatio: "16/9", backgroundColor: "#000" } : {
    maxHeight: "400px",
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } : null;
  return /* @__PURE__ */ o("div", { className: "border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto", children: [
    /* @__PURE__ */ o("div", { className: "flex items-start p-3", children: [
      /* @__PURE__ */ e("div", { className: "h-12 w-12 rounded-full overflow-hidden mr-2", children: /* @__PURE__ */ e(
        "img",
        {
          src: `https://i.pravatar.cc/150?img=${t.id || 11}`,
          alt: t.name,
          className: "h-full w-full object-cover"
        }
      ) }),
      /* @__PURE__ */ o("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-sm", children: t.name }),
        /* @__PURE__ */ o("div", { className: "text-xs text-gray-500", children: [
          t.name,
          "'s Professional Title"
        ] }),
        /* @__PURE__ */ o("div", { className: "text-xs text-gray-500 flex items-center", children: [
          v,
          " · ",
          /* @__PURE__ */ e(Ge, { className: "ml-1", size: 10 })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "ml-auto", children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" }) }) })
    ] }),
    n && /* @__PURE__ */ e("div", { className: "px-3 pb-3 text-sm", children: h(n) }),
    r.length > 0 && /* @__PURE__ */ o("div", { className: "border-t border-b border-gray-200 dark:border-gray-700 relative", style: T(), children: [
      c && m(c) ? /* @__PURE__ */ e(
        "video",
        {
          src: c.url,
          className: "w-full h-full object-contain",
          autoPlay: !0,
          loop: !0,
          muted: !0,
          playsInline: !0,
          controls: !0
        }
      ) : /* @__PURE__ */ e(
        "img",
        {
          src: c ? c.url : "",
          alt: "Post media",
          className: "max-w-full max-h-full w-auto h-auto object-contain"
        }
      ),
      r.length > 1 && /* @__PURE__ */ o("div", { className: "absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5", children: [
        p !== null ? p + 1 : 1,
        "/",
        r.length
      ] }),
      r.length > 1 && /* @__PURE__ */ o(be, { children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: f,
            className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80",
            children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }) })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: C,
            className: "absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80",
            children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) })
          }
        )
      ] }),
      r.length > 1 && /* @__PURE__ */ e("div", { className: "absolute bottom-2 left-0 right-0 flex justify-center gap-1", children: r.map((y, E) => /* @__PURE__ */ e(
        "button",
        {
          onClick: (N) => g(E, N),
          className: `w-2 h-2 rounded-full ${p === E ? "bg-blue-500" : "bg-white/70"}`,
          "aria-label": `Go to slide ${E + 1}`
        },
        E
      )) })
    ] }),
    /* @__PURE__ */ o("div", { className: "p-3", children: [
      /* @__PURE__ */ o("div", { className: "flex justify-between text-gray-500 text-xs mb-2", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center", children: [
          /* @__PURE__ */ e("div", { className: "bg-blue-500 text-white p-1 rounded-full", children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-3 w-3", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" }) }) }),
          /* @__PURE__ */ e("span", { className: "ml-1", children: "0" })
        ] }),
        /* @__PURE__ */ e("div", { children: "0 comments" })
      ] }),
      /* @__PURE__ */ o("div", { className: "border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-around", children: [
        /* @__PURE__ */ o("button", { className: "flex items-center text-sm text-gray-500", children: [
          /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" }) }),
          "Like"
        ] }),
        /* @__PURE__ */ o("button", { className: "flex items-center text-sm text-gray-500", children: [
          /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
          "Comment"
        ] }),
        /* @__PURE__ */ o("button", { className: "flex items-center text-sm text-gray-500", children: [
          /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" }) }),
          "Share"
        ] }),
        /* @__PURE__ */ o("button", { className: "flex items-center text-sm text-gray-500", children: [
          /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
          "Send"
        ] })
      ] })
    ] })
  ] });
}, Rr = ({ account: t, caption: n, media: r, selectedMediaIndex: s, formatCaptionForPreview: p, isVideo: v, goToPrevMedia: h, goToNextMedia: m, selectMediaDot: f }) => {
  const C = r[s !== null ? s : 0];
  return /* @__PURE__ */ e("div", { className: "border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-black mx-auto flex justify-center py-2", children: /* @__PURE__ */ o(
    "div",
    {
      className: "relative flex-shrink-0 overflow-hidden",
      style: {
        width: "min(100%, 270px)",
        // Narrower width (changed from 350px)
        aspectRatio: "9/16",
        maxHeight: "75vh",
        // Slightly reduced height
        margin: "0 auto"
        // Center horizontally
      },
      children: [
        r.length > 0 ? /* @__PURE__ */ o(be, { children: [
          /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black", children: C && v(C) ? /* @__PURE__ */ e(
            "video",
            {
              src: C.url,
              className: "max-h-full max-w-full h-auto w-auto object-contain",
              autoPlay: !0,
              loop: !0,
              muted: !0,
              playsInline: !0,
              controls: !0
            }
          ) : /* @__PURE__ */ e(
            "img",
            {
              src: C ? C.url : "",
              alt: "Post media",
              className: "max-h-full max-w-full h-auto w-auto object-contain"
            }
          ) }),
          r.length > 1 && /* @__PURE__ */ o("div", { className: "absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5 z-10", children: [
            s !== null ? s + 1 : 1,
            "/",
            r.length
          ] }),
          r.length > 1 && /* @__PURE__ */ o(be, { children: [
            /* @__PURE__ */ e(
              "button",
              {
                onClick: h,
                className: "absolute left-1 top-1/2 transform -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80 z-10",
                children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }) })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: m,
                className: "absolute right-1 top-1/2 transform -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80 z-10",
                children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) })
              }
            )
          ] }),
          r.length > 1 && /* @__PURE__ */ e("div", { className: "absolute bottom-14 left-0 right-0 flex justify-center gap-1 z-10", children: r.map((g, c) => /* @__PURE__ */ e(
            "button",
            {
              onClick: (T) => f(c, T),
              className: `w-2 h-2 rounded-full ${s === c ? "bg-[#FE2C55]" : "bg-white/70"}`,
              "aria-label": `Go to slide ${c + 1}`
            },
            c
          )) })
        ] }) : /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-gray-800 flex items-center justify-center", children: /* @__PURE__ */ e(Pe, { className: "h-16 w-16 text-gray-600" }) }),
        /* @__PURE__ */ o("div", { className: "absolute inset-0 flex flex-col justify-between p-2 z-10", children: [
          /* @__PURE__ */ e("div", { className: `text-white text-xs p-1.5 bg-black/30 rounded max-w-[80%] backdrop-blur-sm overflow-hidden ${n ? "" : "invisible collapse"}`, children: /* @__PURE__ */ o("div", { className: "line-clamp-3", children: [
            "  ",
            n ? p(n) : "TikTok Caption"
          ] }) }),
          /* @__PURE__ */ o("div", { className: "absolute right-1.5 bottom-16 flex flex-col items-center space-y-3", children: [
            /* @__PURE__ */ o("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ e("div", { className: "bg-black rounded-full p-1.5", children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }) }),
              /* @__PURE__ */ e("span", { className: "text-white text-xs mt-0.5", children: "0" })
            ] }),
            /* @__PURE__ */ o("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ e("div", { className: "bg-black rounded-full p-1.5", children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }) }),
              /* @__PURE__ */ e("span", { className: "text-white text-xs mt-0.5", children: "0" })
            ] }),
            /* @__PURE__ */ o("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ e("div", { className: "bg-black rounded-full p-1.5", children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" }) }) }),
              /* @__PURE__ */ e("span", { className: "text-white text-xs mt-0.5", children: "0" })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex items-center space-x-1.5", children: [
            /* @__PURE__ */ e("div", { className: "h-8 w-8 rounded-full overflow-hidden border-2 border-white", children: /* @__PURE__ */ e(
              "img",
              {
                src: `https://i.pravatar.cc/150?img=${t.id || 11}`,
                alt: t.name,
                className: "h-full w-full object-cover"
              }
            ) }),
            /* @__PURE__ */ o("div", { className: "text-white font-medium text-xs", children: [
              "@",
              t.name.replace(/\s+/g, "").toLowerCase()
            ] }),
            /* @__PURE__ */ e("div", { className: "ml-auto", children: /* @__PURE__ */ e("button", { className: "bg-[#FE2C55] text-white text-[10px] font-medium rounded-sm px-2 py-0.5", children: "Follow" }) })
          ] })
        ] })
      ]
    }
  ) });
}, $r = ({ account: t, caption: n, media: r, selectedMediaIndex: s, isVideo: p, goToPrevMedia: v, goToNextMedia: h, selectMediaDot: m }) => {
  const f = r[s !== null ? s : 0], C = () => ({
    aspectRatio: "16/9",
    // Standard YouTube ratio
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }), g = () => f ? {
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto"
  } : {};
  return /* @__PURE__ */ o("div", { className: "border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto", children: [
    r.length > 0 ? /* @__PURE__ */ e("div", { className: "relative", children: /* @__PURE__ */ o("div", { className: "w-full", style: C(), children: [
      f && p(f) ? /* @__PURE__ */ e(
        "video",
        {
          src: f.url,
          style: g(),
          className: "bg-black",
          autoPlay: !0,
          loop: !0,
          muted: !0,
          playsInline: !0,
          controls: !0
        }
      ) : /* @__PURE__ */ e(
        "img",
        {
          src: f ? f.url : "",
          alt: "Video thumbnail",
          style: g(),
          className: "bg-black"
        }
      ),
      /* @__PURE__ */ e("div", { className: "absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded", children: "0:30" }),
      r.length > 1 && /* @__PURE__ */ o(be, { children: [
        /* @__PURE__ */ o("div", { className: "absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5", children: [
          s !== null ? s + 1 : 1,
          "/",
          r.length
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: v,
            className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80",
            children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }) })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: h,
            className: "absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80",
            children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) })
          }
        ),
        /* @__PURE__ */ e("div", { className: "absolute bottom-2 left-0 right-0 flex justify-center gap-1", children: r.map((c, T) => /* @__PURE__ */ e(
          "button",
          {
            onClick: (y) => m(T, y),
            className: `w-2 h-2 rounded-full ${s === T ? "bg-red-500" : "bg-white/70"}`,
            "aria-label": `Go to slide ${T + 1}`
          },
          T
        )) })
      ] })
    ] }) }) : /* @__PURE__ */ e("div", { className: "aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center", children: /* @__PURE__ */ e(Pe, { className: "h-10 w-10 text-gray-400 dark:text-gray-600" }) }),
    /* @__PURE__ */ e("div", { className: "p-3", children: /* @__PURE__ */ o("div", { className: "flex", children: [
      /* @__PURE__ */ e("div", { className: "h-9 w-9 rounded-full overflow-hidden mr-2 flex-shrink-0", children: /* @__PURE__ */ e(
        "img",
        {
          src: `https://i.pravatar.cc/150?img=${t.id || 11}`,
          alt: t.name,
          className: "h-full w-full object-cover"
        }
      ) }),
      /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ e("h3", { className: "text-sm font-semibold line-clamp-2 mb-1", children: n || "YouTube Video Title" }),
        /* @__PURE__ */ o("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
          t.name,
          /* @__PURE__ */ e("span", { className: "mx-1", children: "•" }),
          /* @__PURE__ */ e("span", { children: "0 views" }),
          /* @__PURE__ */ e("span", { className: "mx-1", children: "•" }),
          /* @__PURE__ */ e("span", { children: "2 hours ago" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "ml-auto flex-shrink-0", children: /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" }) }) })
    ] }) })
  ] });
}, Ar = `
  /* Custom scrollbar styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  /* For Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }
  
  /* For dark mode */
  .dark .custom-scrollbar::-webkit-scrollbar-track {
    background: #2d3748;
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4a5568;
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #718096;
  }
  
  .dark .custom-scrollbar {
    scrollbar-color: #4a5568 #2d3748;
  }
`, Hr = ({
  selectedAccounts: t = [],
  accountSelector: n = null,
  onPost: r = () => {
  },
  onSchedule: s = () => {
  },
  onSaveDraft: p = () => {
  },
  customMediaInputs: v = []
}) => {
  he(() => {
    const a = document.createElement("style");
    return a.textContent = Ar, document.head.appendChild(a), () => {
      document.head.removeChild(a);
    };
  }, []), Le();
  const [h, m] = q(""), [f, C] = q([]), [g, c] = q(null), [T, y] = q(!1), [E, N] = q(!1), [z, w] = q(!1), [O, D] = q(""), [j, d] = q(!1), [A, S] = q([
    "New York, NY, USA",
    "Los Angeles, CA, USA",
    "Chicago, IL, USA",
    "San Francisco, CA, USA",
    "Miami, FL, USA",
    "London, UK",
    "Paris, France",
    "Berlin, Germany",
    "Tokyo, Japan",
    "Sydney, Australia"
  ]), I = ke(null), ee = ke(null), X = ke(null), te = ke(null);
  he(() => {
    const a = (x) => {
      te.current && !te.current.contains(x.target) && d(!1);
    };
    return document.addEventListener("mousedown", a), () => {
      document.removeEventListener("mousedown", a);
    };
  }, []), he(() => {
    t.length > 0 && !T && y(!0);
  }, [t, T]);
  const G = () => {
    const a = t.find((x) => x.platform === "instagram");
    return a || t[0];
  };
  (() => {
    const a = G();
    return a ? {
      username: a.name || "username",
      avatar: `https://i.pravatar.cc/150?img=${a.id || 11}`,
      platform: a.platform || "instagram"
    } : {
      username: "your_username",
      avatar: "https://i.pravatar.cc/150?img=11",
      platform: "instagram"
    };
  })();
  const Z = "2 MINUTES AGO", [re, Y] = q(0);
  he(() => {
    Y(h.length);
  }, [h]);
  const se = [
    "#instagood",
    "#photooftheday",
    "#fashion",
    "#beautiful",
    "#happy",
    "#cute",
    "#tbt",
    "#like4like",
    "#followme",
    "#picoftheday",
    "#selfie",
    "#summer",
    "#instadaily"
  ], de = (a) => {
    m(a.target.value);
  }, ue = (a) => a.map((x) => {
    if (x.type === "video" && !x.thumbnail) {
      const B = document.createElement("video");
      return B.src = x.url, B.crossOrigin = "anonymous", new Promise((K) => {
        B.onloadeddata = () => {
          B.currentTime = 0.5, B.onseeked = () => {
            const Q = document.createElement("canvas");
            Q.width = B.videoWidth, Q.height = B.videoHeight, Q.getContext("2d").drawImage(B, 0, 0, Q.width, Q.height);
            const ne = Q.toDataURL("image/jpeg");
            K({
              ...x,
              thumbnail: ne
            });
          };
        }, B.onerror = () => K(x);
      });
    }
    return Promise.resolve(x);
  }), u = (a, x = "image") => {
    if (a.target.files && a.target.files[0]) {
      const K = Array.from(a.target.files).slice(0, 5).map((Q) => new Promise((fe) => {
        const ne = new FileReader();
        ne.onload = (ge) => {
          fe({
            url: ge.target.result,
            type: Q.type.startsWith("video/") ? "video" : "image",
            file: Q
          });
        }, ne.readAsDataURL(Q);
      }));
      Promise.all(K).then((Q) => {
        Promise.all(ue(Q)).then((fe) => {
          C((ne) => [...ne, ...fe].slice(0, 5)), g === null && c(0);
        });
      });
    }
  }, M = (a) => a && a.type === "video", _ = (a) => a ? a.file && a.file.name ? a.file.name.length > 15 ? a.file.name.substring(0, 12) + "..." : a.file.name : M(a) ? "video.mp4" : "image.jpg" : "", F = () => {
    N(!E), w(!1);
  }, $ = () => {
    w(!z), N(!1);
  }, H = (a) => {
    const x = X.current.selectionStart, B = h.substring(0, x), K = h.substring(x), Q = B + a + K;
    m(Q), setTimeout(() => {
      X.current.selectionStart = X.current.selectionEnd = x + a.length, X.current.focus();
    }, 0);
  }, l = (a) => {
    const x = X.current.selectionStart, B = h.substring(0, x), K = h.substring(x), Q = B + a + " " + K;
    m(Q), setTimeout(() => {
      X.current.selectionStart = X.current.selectionEnd = x + a.length + 1, X.current.focus();
    }, 0), w(!1);
  }, b = (a) => {
    const x = X.current.selectionStart, B = h.substring(0, x), K = h.substring(x), Q = B + `{{${a}}}` + K;
    m(Q), setTimeout(() => {
      X.current.selectionStart = X.current.selectionEnd = x + a.length + 4, X.current.focus();
    }, 0);
  }, P = (a) => {
    C((x) => x.filter((B, K) => K !== a)), g === a ? c((x) => x > 0 ? x - 1 : null) : g > a && c((x) => x - 1);
  }, L = (a) => {
    c(a);
  }, R = (a) => {
    if (!a) return null;
    const x = /#[a-zA-Z0-9_]+/g, B = /\{\{([^}]+)\}\}/g;
    let K = [], Q = 0, fe;
    for (; (fe = x.exec(a)) !== null; )
      Q < fe.index && K.push({
        type: "text",
        content: a.substring(Q, fe.index)
      }), K.push({
        type: "hashtag",
        content: fe[0]
      }), Q = fe.index + fe[0].length;
    if (Q < a.length) {
      let ne = a.substring(Q), ge = [], Se = 0, we;
      for (; (we = B.exec(ne)) !== null; )
        Se < we.index && ge.push({
          type: "text",
          content: ne.substring(Se, we.index)
        }), ge.push({
          type: "placeholder",
          content: we[0],
          variable: we[1]
        }), Se = we.index + we[0].length;
      Se < ne.length && ge.push({
        type: "text",
        content: ne.substring(Se)
      }), ge.length > 0 ? K = [...K, ...ge] : K.push({
        type: "text",
        content: ne
      });
    }
    return /* @__PURE__ */ e("div", { children: K.map((ne, ge) => ne.type === "hashtag" ? /* @__PURE__ */ e("span", { className: "text-blue-500 hover:underline cursor-pointer", children: ne.content }, ge) : ne.type === "placeholder" ? /* @__PURE__ */ e("span", { className: "bg-yellow-100 dark:bg-yellow-800 px-1 rounded", children: ne.content }, ge) : /* @__PURE__ */ e("span", { children: ne.content }, ge)) });
  }, [U, k] = q(0);
  he(() => {
    k(0);
  }, [t]);
  const le = () => t.length === 0 ? {
    name: "your_username",
    avatar: "https://i.pravatar.cc/150?img=11",
    platform: "instagram",
    id: 11
  } : t[U], pe = (a) => {
    switch (a == null ? void 0 : a.toLowerCase()) {
      case "facebook":
        return gr;
      case "instagram":
        return pr;
      case "linkedin":
        return br;
      case "twitter":
        return yr;
      case "x":
        return qe;
      case "tiktok":
        return vr;
      case "youtube":
        return xr;
      default:
        return Ge;
    }
  };
  le();
  const ye = (a) => {
    var K;
    const x = ((K = a == null ? void 0 : a.platform) == null ? void 0 : K.toLowerCase()) || "instagram", B = {
      account: a,
      caption: h,
      media: f,
      location: O,
      selectedMediaIndex: g,
      timestamp: Z,
      formatCaptionForPreview: R,
      isVideo: M,
      goToPrevMedia: Dt,
      goToNextMedia: Pt,
      selectMediaDot: Lt
    };
    switch (x) {
      case "facebook":
        return /* @__PURE__ */ e(jr, { ...B });
      case "twitter":
      case "x":
        return /* @__PURE__ */ e(zr, { ...B });
      case "linkedin":
        return /* @__PURE__ */ e(Or, { ...B });
      case "tiktok":
        return /* @__PURE__ */ e(Rr, { ...B });
      case "youtube":
        return /* @__PURE__ */ e($r, { ...B });
      case "instagram":
      default:
        return /* @__PURE__ */ e(Er, { ...B });
    }
  }, Ce = xe(() => {
    const a = {};
    return t.forEach((x) => {
      const B = x.platform || "other";
      a[B] || (a[B] = []), a[B].push(x);
    }), a;
  }, [t]), ie = xe(() => Object.keys(Ce), [Ce]), [ce, ae] = q(null);
  he(() => {
    if (ie.length > 0) {
      const a = ie.includes("instagram") ? "instagram" : ie[0];
      ae(a);
    } else
      ae(null);
  }, [ie]);
  const me = () => {
    const a = ie.indexOf(ce);
    a > 0 ? ae(ie[a - 1]) : ae(ie[ie.length - 1]);
  }, Te = () => {
    const a = ie.indexOf(ce);
    a < ie.length - 1 ? ae(ie[a + 1]) : ae(ie[0]);
  }, Me = xe(() => !ce || !Ce[ce] ? [{
    name: "your_username",
    avatar: "https://i.pravatar.cc/150?img=11",
    platform: "instagram",
    id: 11
  }] : Ce[ce], [ce, Ce]), kt = () => {
    r({
      caption: h,
      media: f,
      location: O,
      accounts: t,
      timestamp: /* @__PURE__ */ new Date()
    });
  }, Nt = () => {
    s({
      caption: h,
      media: f,
      location: O,
      accounts: t
    });
  }, Ct = () => {
    p({
      caption: h,
      media: f,
      location: O,
      timestamp: /* @__PURE__ */ new Date()
    });
  }, Tt = (a) => {
    if (D(a.target.value), d(!0), a.target.value.trim()) {
      const x = A.filter(
        (B) => B.toLowerCase().includes(a.target.value.toLowerCase())
      );
      S(x.length > 0 ? x : ["No results found"]);
    } else
      S([
        "New York, NY, USA",
        "Los Angeles, CA, USA",
        "Chicago, IL, USA",
        "San Francisco, CA, USA",
        "Miami, FL, USA",
        "London, UK",
        "Paris, France",
        "Berlin, Germany",
        "Tokyo, Japan",
        "Sydney, Australia"
      ]);
  }, Mt = (a) => {
    D(a), d(!1);
  }, St = () => {
    D("");
  }, Dt = (a) => {
    a && a.stopPropagation(), !(f.length <= 1) && c((x) => x > 0 ? x - 1 : f.length - 1);
  }, Pt = (a) => {
    a && a.stopPropagation(), !(f.length <= 1) && c((x) => x < f.length - 1 ? x + 1 : 0);
  }, Lt = (a, x) => {
    x && x.stopPropagation(), a >= 0 && a < f.length && c(a);
  }, [Et, jt] = q(!1), [zt, Je] = q(!1), Ee = ke(null);
  he(() => {
    const a = () => {
      const x = Ee.current;
      if (x) {
        const B = x.scrollHeight > x.clientHeight;
        jt(B);
        const K = Math.abs(x.scrollHeight - x.scrollTop - x.clientHeight) < 20;
        Je(K);
      }
    };
    return a(), window.addEventListener("resize", a), () => {
      window.removeEventListener("resize", a);
    };
  }, [f, Me, ce]);
  const Ot = () => {
    const a = Ee.current;
    if (a) {
      const x = Math.abs(a.scrollHeight - a.scrollTop - a.clientHeight) < 20;
      Je(x);
    }
  }, Rt = () => {
    const a = Ee.current;
    a && a.scrollTo({
      top: a.scrollHeight,
      behavior: "smooth"
    });
  }, $t = (a) => {
    a && a.url && (a.type === "image" || a.type === "video") && (a.type === "video" && !a.thumbnail ? ue([a]).then((x) => {
      C((B) => [...B, ...x].slice(0, 5)), g === null && c(0);
    }) : (C((x) => [...x, a].slice(0, 5)), g === null && c(0)));
  };
  return /* @__PURE__ */ o("div", { className: "w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full", children: [
    /* @__PURE__ */ o("div", { className: "flex border-b border-gray-200 dark:border-gray-600 flex-shrink-0", children: [
      /* @__PURE__ */ e("div", { className: `p-4 bg-gray-50 dark:bg-gray-700 ${T ? "md:w-3/5" : "w-full"} flex items-center border-r border-gray-200 dark:border-gray-600`, children: t.length > 0 && /* @__PURE__ */ o("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ e("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Posting to:" }),
        /* @__PURE__ */ o("div", { className: "flex -space-x-2", children: [
          t.slice(0, 3).map((a, x) => /* @__PURE__ */ e("div", { className: "h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden", title: `${a.name} (${a.platform})`, children: /* @__PURE__ */ e(
            "img",
            {
              src: `https://i.pravatar.cc/150?img=${a.id || x + 11}`,
              alt: a.name,
              className: "h-full w-full object-cover"
            }
          ) }, x)),
          t.length > 3 && /* @__PURE__ */ o("div", { className: "h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800", children: [
            "+",
            t.length - 3
          ] })
        ] })
      ] }) }),
      T && /* @__PURE__ */ e("div", { className: "md:w-2/5 bg-gray-50 dark:bg-gray-700 flex items-center justify-center", children: ie.length > 1 && /* @__PURE__ */ o("div", { className: "flex items-center justify-center w-full px-4 py-3", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: me,
            className: "p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300",
            children: /* @__PURE__ */ e(Nr, { size: 14 })
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-grow mx-4 text-center", children: ce && /* @__PURE__ */ o("div", { className: "flex items-center justify-center", children: [
          /* @__PURE__ */ e("div", { className: "h-5 w-5 mr-2", children: oe.createElement(pe(ce), {
            className: "h-full w-full",
            style: { color: Fr(ce) }
          }) }),
          /* @__PURE__ */ e("span", { className: "text-sm font-medium capitalize", children: ce })
        ] }) }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: Te,
            className: "p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300",
            children: /* @__PURE__ */ e(Cr, { size: 14 })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row flex-grow overflow-hidden", children: [
      /* @__PURE__ */ o("div", { className: `flex flex-col ${T ? "md:w-3/5" : "w-full"} overflow-hidden`, children: [
        n && /* @__PURE__ */ e("div", { className: "p-4 border-b border-gray-200 dark:border-gray-600 flex-shrink-0", children: n }),
        /* @__PURE__ */ o("div", { className: "p-4 flex-grow overflow-y-auto custom-scrollbar", children: [
          /* @__PURE__ */ o("div", { className: "mb-6", children: [
            /* @__PURE__ */ o("div", { className: "border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-800", children: [
              /* @__PURE__ */ e(
                "textarea",
                {
                  ref: X,
                  className: "w-full px-3 py-4 text-gray-700 dark:text-gray-300 border-none rounded-t-lg focus:outline-none bg-white dark:bg-gray-800 resize-none min-h-[180px]",
                  placeholder: "Write your post... Use #hashtags and {{placeholders}} for dynamic content",
                  value: h,
                  onChange: de
                }
              ),
              /* @__PURE__ */ o("div", { className: "flex items-center border-t border-gray-200 dark:border-gray-600 px-2 py-2 bg-gray-50 dark:bg-gray-700 rounded-b-lg", children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: F,
                    className: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300",
                    children: /* @__PURE__ */ e(Pr, {})
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: $,
                    className: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300",
                    children: /* @__PURE__ */ e(Mr, {})
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: () => b("website"),
                    className: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300",
                    children: /* @__PURE__ */ e(Tr, {})
                  }
                ),
                /* @__PURE__ */ e("div", { className: "flex-grow" }),
                /* @__PURE__ */ o("div", { className: "px-2 text-sm text-gray-500 dark:text-gray-400", children: [
                  re,
                  " characters"
                ] })
              ] })
            ] }),
            E && /* @__PURE__ */ e("div", { className: "mt-2 absolute z-10", children: /* @__PURE__ */ e(wt, { onEmojiSelect: H, onClose: () => N(!1) }) }),
            z && /* @__PURE__ */ o("div", { className: "mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 absolute z-10", children: [
              /* @__PURE__ */ o("div", { className: "flex justify-between items-center mb-2", children: [
                /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Popular Hashtags" }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: () => w(!1),
                    className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                    children: "✕"
                  }
                )
              ] }),
              /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2", children: se.map((a, x) => /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => l(a),
                  className: "px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 text-sm transition-colors",
                  children: a
                },
                x
              )) })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "mb-6", children: [
            /* @__PURE__ */ o("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ e("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Media" }),
              /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2 items-center", children: f.length < 5 && /* @__PURE__ */ o(be, { children: [
                /* @__PURE__ */ o(
                  "button",
                  {
                    onClick: () => I.current.click(),
                    className: "px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 text-xs flex items-center",
                    children: [
                      /* @__PURE__ */ e(Pe, { className: "mr-1" }),
                      " Add Image",
                      /* @__PURE__ */ e(
                        "input",
                        {
                          type: "file",
                          ref: I,
                          onChange: u,
                          accept: "image/*",
                          multiple: !0,
                          className: "hidden"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    onClick: () => ee.current.click(),
                    className: "px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 text-xs flex items-center",
                    children: [
                      /* @__PURE__ */ e(ct, { className: "mr-1" }),
                      " Add Video",
                      /* @__PURE__ */ e(
                        "input",
                        {
                          type: "file",
                          ref: ee,
                          onChange: (a) => u(a, "video"),
                          accept: "video/*",
                          className: "hidden"
                        }
                      )
                    ]
                  }
                ),
                v.map((a, x) => /* @__PURE__ */ o(
                  "button",
                  {
                    onClick: () => a.onClick($t),
                    className: "px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 text-xs flex items-center",
                    title: a.tooltip || a.label,
                    children: [
                      a.icon && /* @__PURE__ */ e("span", { className: "mr-1", children: a.icon }),
                      a.label
                    ]
                  },
                  x
                ))
              ] }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-[120px] bg-gray-50 dark:bg-gray-700/50", children: f.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-3", children: f.map((a, x) => /* @__PURE__ */ o(
              "div",
              {
                className: `relative w-24 h-24 border-2 rounded-lg overflow-hidden cursor-pointer transition-all
                          ${g === x ? "border-blue-500 shadow-md scale-105" : "border-gray-300 dark:border-gray-600"}`,
                onClick: () => L(x),
                children: [
                  /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black", children: /* @__PURE__ */ e(
                    "img",
                    {
                      src: a.thumbnail || a.url,
                      alt: `Media ${x + 1}`,
                      className: "max-h-full max-w-full object-contain"
                    }
                  ) }),
                  /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-black/20 flex items-center justify-center", children: M(a) && /* @__PURE__ */ e(ct, { className: "text-white text-lg drop-shadow-md" }) }),
                  /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] px-1 py-0.5 truncate text-center", children: _(a) }),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100",
                      onClick: (B) => {
                        B.stopPropagation(), P(x);
                      },
                      children: "×"
                    }
                  )
                ]
              },
              x
            )) }) : /* @__PURE__ */ o("div", { className: "flex flex-col items-center justify-center h-32 text-gray-400", children: [
              /* @__PURE__ */ e(Pe, { className: "text-4xl mb-2" }),
              /* @__PURE__ */ e("p", { className: "text-sm", children: "Add images or videos to your post" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "p-4 border-t border-gray-200 dark:border-gray-600 flex-shrink-0", children: /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ o("div", { className: "relative md:w-1/3 max-w-xs flex-shrink-0", ref: te, children: [
            /* @__PURE__ */ o("div", { className: "flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 h-10", children: [
              /* @__PURE__ */ e(Ae, { className: "text-gray-500 mr-2 flex-shrink-0" }),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "text",
                  className: "bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-300 w-full text-sm",
                  placeholder: "Add location",
                  value: O,
                  onChange: Tt,
                  onClick: () => d(!0)
                }
              ),
              O && /* @__PURE__ */ e(
                "button",
                {
                  className: "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400",
                  onClick: St,
                  children: /* @__PURE__ */ e(Lr, {})
                }
              )
            ] }),
            j && /* @__PURE__ */ e("div", { className: "absolute mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10", children: /* @__PURE__ */ e("div", { className: "max-h-48 overflow-y-auto p-1", children: A.map((a, x) => /* @__PURE__ */ o(
              "div",
              {
                className: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer flex items-center text-sm",
                onClick: () => Mt(a),
                children: [
                  /* @__PURE__ */ e(Ae, { className: "text-gray-500 mr-2 flex-shrink-0" }),
                  /* @__PURE__ */ e("span", { children: a })
                ]
              },
              x
            )) }) })
          ] }),
          /* @__PURE__ */ e("div", { className: "flex-grow" }),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: Ct,
              className: "px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center font-medium",
              children: [
                /* @__PURE__ */ e(Dr, { className: "mr-2" }),
                "Save Draft"
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: Nt,
              disabled: t.length === 0,
              className: "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center font-medium disabled:opacity-50 disabled:cursor-not-allowed",
              children: [
                /* @__PURE__ */ e(wr, { className: "mr-2" }),
                "Schedule"
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: kt,
              disabled: t.length === 0,
              className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center font-medium disabled:opacity-50 disabled:cursor-not-allowed",
              children: [
                /* @__PURE__ */ e(Sr, { className: "mr-2" }),
                "Post Now"
              ]
            }
          )
        ] }) })
      ] }),
      T && /* @__PURE__ */ e("div", { className: "md:w-2/5 border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden", children: /* @__PURE__ */ o(
        "div",
        {
          ref: Ee,
          onScroll: Ot,
          className: "flex-grow overflow-y-auto custom-scrollbar relative",
          style: { minHeight: "0", maxHeight: "100%" },
          children: [
            /* @__PURE__ */ e("div", { className: "p-4 space-y-4", children: Me.map((a, x) => /* @__PURE__ */ e("div", { className: "relative", children: ye(a) }, x)) }),
            Et && !zt && /* @__PURE__ */ e(
              "div",
              {
                className: "absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-20",
                onClick: Rt,
                children: /* @__PURE__ */ e("div", { className: "bg-gray-800/80 dark:bg-gray-600/90 text-white rounded-full p-2.5 shadow-lg", children: /* @__PURE__ */ e(kr, { className: "h-5 w-5" }) })
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}, Fr = (t = "") => ({
  facebook: "#1877F2",
  instagram: "#E4405F",
  tiktok: "#000000",
  linkedin: "#0A66C2",
  youtube: "#FF0000",
  twitter: "#1DA1F2",
  x: "#000000"
})[t.toLowerCase()] || "#4F46E5";
export {
  ur as AccountCard,
  mr as AccountContainer,
  fr as Calendar,
  De as CalendarEvent,
  Hr as PostEditor,
  dr as ThemeProvider,
  ft as availablePlatforms,
  Le as useTheme
};
