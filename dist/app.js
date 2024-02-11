/*! Copyright (c) 2021-23 Prolincur Technologies LLP.
All Rights Reserved.

Please check the provided LICENSE file for licensing details.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
 */
import * as f from "three";
function z() {
  return this._array = null, Promise.resolve();
}
function J() {
  var e = this._array;
  return this._array = null, Promise.resolve(e ? { done: !1, value: e } : { done: !0, value: void 0 });
}
function v(e) {
  return new M(e instanceof Uint8Array ? e : new Uint8Array(e));
}
function M(e) {
  this._array = e;
}
M.prototype.read = J;
M.prototype.cancel = z;
function O(e) {
  return fetch(e).then(function(t) {
    return t.body && t.body.getReader ? t.body.getReader() : t.arrayBuffer().then(v);
  });
}
function V(e) {
  return new Promise(function(t, n) {
    var r = new XMLHttpRequest();
    r.responseType = "arraybuffer", r.onload = function() {
      t(v(r.response));
    }, r.onerror = n, r.ontimeout = n, r.open("GET", e, !0), r.send();
  });
}
function x(e) {
  return (typeof fetch == "function" ? O : V)(e);
}
function T(e) {
  return typeof e.read == "function" ? e : e.getReader();
}
const L = new Uint8Array(0);
function H() {
  return this._source.cancel();
}
function X(e, t) {
  if (!e.length)
    return t;
  if (!t.length)
    return e;
  var n = new Uint8Array(e.length + t.length);
  return n.set(e), n.set(t, e.length), n;
}
function K() {
  var e = this, t = e._array.subarray(e._index);
  return e._source.read().then(function(n) {
    return e._array = L, e._index = 0, n.done ? t.length > 0 ? { done: !1, value: t } : { done: !0, value: void 0 } : { done: !1, value: X(t, n.value) };
  });
}
function Q(e) {
  if ((e |= 0) < 0)
    throw new Error("invalid length");
  var t = this, n = this._array.length - this._index;
  if (this._index + e <= this._array.length)
    return Promise.resolve(this._array.subarray(this._index, this._index += e));
  var r = new Uint8Array(e);
  return r.set(this._array.subarray(this._index)), function i() {
    return t._source.read().then(function(a) {
      return a.done ? (t._array = L, t._index = 0, n > 0 ? r.subarray(0, n) : null) : n + a.value.length >= e ? (t._array = a.value, t._index = e - n, r.set(a.value.subarray(0, e - n), n), r) : (r.set(a.value, n), n += a.value.length, i());
    });
  }();
}
function B(e) {
  return typeof e.slice == "function" ? e : new m(typeof e.read == "function" ? e : e.getReader());
}
function m(e) {
  this._source = e, this._array = L, this._index = 0;
}
m.prototype.read = K;
m.prototype.slice = Q;
m.prototype.cancel = H;
function W() {
  return this._source.cancel();
}
function Y(e) {
  return /^[nf]$/i.test(e) ? !1 : /^[yt]$/i.test(e) ? !0 : null;
}
function Z(e) {
  return new Date(+e.substring(0, 4), e.substring(4, 6) - 1, +e.substring(6, 8));
}
function w(e) {
  return !(e = e.trim()) || isNaN(e = +e) ? null : e;
}
function j(e) {
  return e.trim() || null;
}
var ee = {
  B: w,
  C: j,
  D: Z,
  F: w,
  L: Y,
  M: w,
  N: w
};
function te() {
  var e = this, t = 1;
  return e._source.slice(e._recordLength).then(function(n) {
    return n && n[0] !== 26 ? { done: !1, value: e._fields.reduce(function(r, i) {
      return r[i.name] = ee[i.type](e._decode(n.subarray(t, t += i.length))), r;
    }, {}) } : { done: !0, value: void 0 };
  });
}
function _(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function ne(e, t) {
  return e = B(e), e.slice(32).then(function(n) {
    var r = _(n);
    return e.slice(r.getUint16(8, !0) - 32).then(function(i) {
      return new I(e, t, r, _(i));
    });
  });
}
function I(e, t, n, r) {
  this._source = e, this._decode = t.decode.bind(t), this._recordLength = n.getUint16(10, !0), this._fields = [];
  for (var i = 0; r.getUint8(i) !== 13; i += 32) {
    for (var a = 0; a < 11 && r.getUint8(i + a) !== 0; ++a)
      ;
    this._fields.push({
      name: this._decode(new Uint8Array(r.buffer, r.byteOffset + i, a)),
      type: String.fromCharCode(r.getUint8(i + 11)),
      length: r.getUint8(i + 16)
    });
  }
}
var k = I.prototype;
k.read = te;
k.cancel = W;
function re() {
  return this._source.cancel();
}
function b(e) {
  var t = 40, n, r = e.getInt32(36, !0), i = new Array(r);
  for (n = 0; n < r; ++n, t += 16)
    i[n] = [e.getFloat64(t, !0), e.getFloat64(t + 8, !0)];
  return { type: "MultiPoint", coordinates: i };
}
function ie() {
  return null;
}
function A(e) {
  return { type: "Point", coordinates: [e.getFloat64(4, !0), e.getFloat64(12, !0)] };
}
function P(e) {
  var t = 44, n, r = e.getInt32(36, !0), i = e.getInt32(40, !0), a = new Array(r), s = new Array(i), c = [], p = [];
  for (n = 0; n < r; ++n, t += 4)
    a[n] = e.getInt32(t, !0);
  for (n = 0; n < i; ++n, t += 16)
    s[n] = [e.getFloat64(t, !0), e.getFloat64(t + 8, !0)];
  return a.forEach(function(h, o) {
    var u = s.slice(h, a[o + 1]);
    ae(u) ? c.push([u]) : p.push(u);
  }), p.forEach(function(h) {
    c.some(function(o) {
      if (oe(o[0], h))
        return o.push(h), !0;
    }) || c.push([h]);
  }), c.length === 1 ? { type: "Polygon", coordinates: c[0] } : { type: "MultiPolygon", coordinates: c };
}
function ae(e) {
  if ((n = e.length) < 4)
    return !1;
  for (var t = 0, n, r = e[n - 1][1] * e[0][0] - e[n - 1][0] * e[0][1]; ++t < n; )
    r += e[t - 1][1] * e[t][0] - e[t - 1][0] * e[t][1];
  return r >= 0;
}
function oe(e, t) {
  for (var n = -1, r = t.length, i; ++n < r; )
    if (i = ue(e, t[n]))
      return i > 0;
  return !1;
}
function ue(e, t) {
  for (var n = t[0], r = t[1], i = -1, a = 0, s = e.length, c = s - 1; a < s; c = a++) {
    var p = e[a], h = p[0], o = p[1], u = e[c], l = u[0], d = u[1];
    if (se(p, u, t))
      return 0;
    o > r != d > r && n < (l - h) * (r - o) / (d - o) + h && (i = -i);
  }
  return i;
}
function se(e, t, n) {
  var r = n[0] - e[0], i = n[1] - e[1];
  if (r === 0 && i === 0)
    return !0;
  var a = t[0] - e[0], s = t[1] - e[1];
  if (a === 0 && s === 0)
    return !1;
  var c = (r * a + i * s) / (a * a + s * s);
  return c < 0 || c > 1 ? !1 : c === 0 || c === 1 ? !0 : c * a === r && c * s === i;
}
function F(e) {
  var t = 44, n, r = e.getInt32(36, !0), i = e.getInt32(40, !0), a = new Array(r), s = new Array(i);
  for (n = 0; n < r; ++n, t += 4)
    a[n] = e.getInt32(t, !0);
  for (n = 0; n < i; ++n, t += 16)
    s[n] = [e.getFloat64(t, !0), e.getFloat64(t + 8, !0)];
  return r === 1 ? { type: "LineString", coordinates: s } : { type: "MultiLineString", coordinates: a.map(function(c, p) {
    return s.slice(c, a[p + 1]);
  }) };
}
function C(e, t) {
  var n = new Uint8Array(e.length + t.length);
  return n.set(e, 0), n.set(t, e.length), n;
}
function ce() {
  var e = this;
  return ++e._index, e._source.slice(12).then(function(t) {
    if (t == null)
      return { done: !0, value: void 0 };
    var n = _(t);
    function r() {
      return e._source.slice(4).then(function(a) {
        return a == null ? { done: !0, value: void 0 } : (n = _(t = C(t.slice(4), a)), n.getInt32(0, !1) !== e._index ? r() : i());
      });
    }
    function i() {
      var a = n.getInt32(4, !1) * 2 - 4, s = n.getInt32(8, !0);
      return a < 0 || s && s !== e._type ? r() : e._source.slice(a).then(function(c) {
        return { done: !1, value: s ? e._parse(_(C(t.slice(8), c))) : null };
      });
    }
    return i();
  });
}
var E = {
  0: ie,
  1: A,
  3: F,
  5: P,
  8: b,
  11: A,
  // PointZ
  13: F,
  // PolyLineZ
  15: P,
  // PolygonZ
  18: b,
  // MultiPointZ
  21: A,
  // PointM
  23: F,
  // PolyLineM
  25: P,
  // PolygonM
  28: b
  // MultiPointM
};
function fe(e) {
  return e = B(e), e.slice(100).then(function(t) {
    return new D(e, _(t));
  });
}
function D(e, t) {
  var n = t.getInt32(32, !0);
  if (!(n in E))
    throw new Error("unsupported shape type: " + n);
  this._source = e, this._type = n, this._index = 0, this._parse = E[n], this.bbox = [t.getFloat64(36, !0), t.getFloat64(44, !0), t.getFloat64(52, !0), t.getFloat64(60, !0)];
}
var G = D.prototype;
G.read = ce;
G.cancel = re;
function le() {
}
function he() {
  return Promise.all([
    this._dbf && this._dbf.cancel(),
    this._shp.cancel()
  ]).then(le);
}
function pe() {
  var e = this;
  return Promise.all([
    e._dbf ? e._dbf.read() : { value: {} },
    e._shp.read()
  ]).then(function(t) {
    var n = t[0], r = t[1];
    return r.done ? r : {
      done: !1,
      value: {
        type: "Feature",
        properties: n.value,
        geometry: r.value
      }
    };
  });
}
function de(e, t, n) {
  return Promise.all([
    fe(e),
    t && ne(t, n)
  ]).then(function(r) {
    return new $(r[0], r[1]);
  });
}
function $(e, t) {
  this._shp = e, this._dbf = t, this.bbox = e.bbox;
}
var R = $.prototype;
R.read = pe;
R.cancel = he;
function ye(e, t, n) {
  return typeof t == "string" ? (/\.dbf$/.test(t) || (t += ".dbf"), t = x(t)) : t instanceof ArrayBuffer || t instanceof Uint8Array ? t = v(t) : t != null && (t = T(t)), typeof e == "string" ? (/\.shp$/.test(e) || (e += ".shp"), t === void 0 && (t = x(e.substring(0, e.length - 4) + ".dbf").catch(function() {
  })), e = x(e)) : e instanceof ArrayBuffer || e instanceof Uint8Array ? e = v(e) : e = T(e), Promise.all([e, t]).then(function(r) {
    var i = r[0], a = r[1], s = "windows-1252";
    return n && n.encoding != null && (s = n.encoding), de(i, a, a && new TextDecoder(s));
  });
}
/*! Copyright (c) 2021-23 Prolincur Technologies LLP.
All Rights Reserved.

Please check the provided LICENSE file for licensing details.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
 */
class ge extends f.FileLoader {
  constructor(t) {
    super(t), this.responseType = "json", this.color = 16777215, this.transform = new f.Matrix4();
  }
  setColor(t) {
    return this.color = t, this;
  }
  setTransform(t) {
    return t instanceof f.Matrix4 && (this.transform = t), this;
  }
  load(t, n, r, i) {
    const a = this;
    return super.load(
      t,
      (s) => {
        try {
          const c = a.parse(s);
          n(c);
        } catch (c) {
          i(c);
        }
      },
      r,
      i
    );
  }
  parse(t) {
    if (!t)
      return null;
    const n = this, r = (o) => {
      const u = new f.Vector3(o[0], o[1], 0);
      return u.applyMatrix4(n.transform), u;
    }, i = (o) => {
      const u = new f.BufferGeometry(), l = r(o), d = [];
      d.push(l.x, l.y, l.z), u.setAttribute("position", new f.Float32BufferAttribute(d, 3));
      const g = new f.PointsMaterial({ color: n.color });
      return new f.Points(u, g);
    }, a = (o) => {
      const u = new f.BufferGeometry(), l = [];
      o == null || o.forEach((g) => {
        const y = r(g);
        l.push(y.x, y.y, y.z);
      }), u.setAttribute("position", new f.Float32BufferAttribute(l, 3));
      const d = new f.LineBasicMaterial({ color: n.color });
      return new f.Line(u, d);
    }, s = (o) => {
      let u = null;
      o.forEach((g) => {
        const y = new f.Shape();
        g.forEach((N, q) => {
          const [S, U] = N;
          q === 0 ? y.moveTo(S, U) : y.lineTo(S, U);
        }), y.lineTo(g[0][0], g[0][1]), u ? u.holes.push(y) : u = y;
      });
      const l = new f.ShapeGeometry(u), d = new f.MeshBasicMaterial({ color: n.color, side: f.DoubleSide });
      return new f.Mesh(l, d);
    }, c = (o) => {
      const u = [];
      switch (o == null ? void 0 : o.type) {
        case "Point":
          u.push(i(o.coordinates));
          break;
        case "LineString":
          u.push(a(o.coordinates));
          break;
        case "Polygon":
          u.push(s(o.coordinates));
          break;
        case "MultiPoint":
          o.coordinates.forEach((l) => {
            u.push(i(l));
          });
          break;
        case "MultiPolygon":
          o.coordinates.forEach((l) => {
            u.push(s(l));
          });
          break;
        case "MultiLineString":
          o.coordinates.forEach((l) => {
            u.push(a(l));
          });
          break;
      }
      return u;
    }, p = (o) => {
      if (o.geometry) {
        const u = c(o.geometry);
        return u.forEach((l) => {
          o.properties && (l.userData = {
            ...o.properties
          });
        }), u;
      }
      return [];
    };
    let h = [];
    if (Array.isArray(t) ? h = t : t.type === "FeatureCollection" ? h = t.features : t.type === "Feature" && (h = [t]), h.length) {
      const o = new f.Group();
      return h.forEach((u) => {
        p(u).forEach((l) => {
          o.add(l);
        });
      }), o;
    }
    return null;
  }
}
class _e extends f.FileLoader {
  constructor(t) {
    super(t), this.color = 16777215, this.transform = new f.Matrix4(), this.responseType = "arraybuffer";
  }
  setColor(t) {
    return this.color = t, this;
  }
  setTransform(t) {
    return t instanceof f.Matrix4 && (this.transform = t), this;
  }
  load(t, n, r, i) {
    const a = this;
    return super.load(
      t,
      (s) => {
        try {
          a.parse(s, n, i);
        } catch (c) {
          i(c);
        }
      },
      r,
      i
    );
  }
  parse(t, n, r) {
    this.parseAsync(t).then(n).catch(r);
  }
  async parseAsync(t) {
    const n = this, r = await n.parseAsyncToGeoJson(t);
    if (!r)
      return null;
    const i = new ge();
    return i.setColor(n.color), i.setTransform(n.transform), i.parse(r);
  }
  async parseAsyncToGeoJson(t) {
    if (!t)
      return null;
    const n = await ye(t);
    if (!n)
      return null;
    const r = await n.read(), i = async (s, c = []) => {
      if (s.done)
        return;
      c.push(s.value);
      const p = await n.read();
      await i(p, c);
    }, a = [];
    return await i(r, a), {
      type: "FeatureCollection",
      features: a
    };
  }
}
export {
  _e as ShapefileLoader
};
