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
  return r.set(this._array.subarray(this._index)), function o() {
    return t._source.read().then(function(i) {
      return i.done ? (t._array = L, t._index = 0, n > 0 ? r.subarray(0, n) : null) : n + i.value.length >= e ? (t._array = i.value, t._index = e - n, r.set(i.value.subarray(0, e - n), n), r) : (r.set(i.value, n), n += i.value.length, o());
    });
  }();
}
function C(e) {
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
    return n && n[0] !== 26 ? { done: !1, value: e._fields.reduce(function(r, o) {
      return r[o.name] = ee[o.type](e._decode(n.subarray(t, t += o.length))), r;
    }, {}) } : { done: !0, value: void 0 };
  });
}
function _(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function ne(e, t) {
  return e = C(e), e.slice(32).then(function(n) {
    var r = _(n);
    return e.slice(r.getUint16(8, !0) - 32).then(function(o) {
      return new I(e, t, r, _(o));
    });
  });
}
function I(e, t, n, r) {
  this._source = e, this._decode = t.decode.bind(t), this._recordLength = n.getUint16(10, !0), this._fields = [];
  for (var o = 0; r.getUint8(o) !== 13; o += 32) {
    for (var i = 0; i < 11 && r.getUint8(o + i) !== 0; ++i)
      ;
    this._fields.push({
      name: this._decode(new Uint8Array(r.buffer, r.byteOffset + o, i)),
      type: String.fromCharCode(r.getUint8(o + 11)),
      length: r.getUint8(o + 16)
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
  var t = 40, n, r = e.getInt32(36, !0), o = new Array(r);
  for (n = 0; n < r; ++n, t += 16)
    o[n] = [e.getFloat64(t, !0), e.getFloat64(t + 8, !0)];
  return { type: "MultiPoint", coordinates: o };
}
function oe() {
  return null;
}
function A(e) {
  return { type: "Point", coordinates: [e.getFloat64(4, !0), e.getFloat64(12, !0)] };
}
function P(e) {
  var t = 44, n, r = e.getInt32(36, !0), o = e.getInt32(40, !0), i = new Array(r), s = new Array(o), c = [], d = [];
  for (n = 0; n < r; ++n, t += 4)
    i[n] = e.getInt32(t, !0);
  for (n = 0; n < o; ++n, t += 16)
    s[n] = [e.getFloat64(t, !0), e.getFloat64(t + 8, !0)];
  return i.forEach(function(h, a) {
    var u = s.slice(h, i[a + 1]);
    ie(u) ? c.push([u]) : d.push(u);
  }), d.forEach(function(h) {
    c.some(function(a) {
      if (ae(a[0], h))
        return a.push(h), !0;
    }) || c.push([h]);
  }), c.length === 1 ? { type: "Polygon", coordinates: c[0] } : { type: "MultiPolygon", coordinates: c };
}
function ie(e) {
  if ((n = e.length) < 4)
    return !1;
  for (var t = 0, n, r = e[n - 1][1] * e[0][0] - e[n - 1][0] * e[0][1]; ++t < n; )
    r += e[t - 1][1] * e[t][0] - e[t - 1][0] * e[t][1];
  return r >= 0;
}
function ae(e, t) {
  for (var n = -1, r = t.length, o; ++n < r; )
    if (o = ue(e, t[n]))
      return o > 0;
  return !1;
}
function ue(e, t) {
  for (var n = t[0], r = t[1], o = -1, i = 0, s = e.length, c = s - 1; i < s; c = i++) {
    var d = e[i], h = d[0], a = d[1], u = e[c], l = u[0], p = u[1];
    if (se(d, u, t))
      return 0;
    a > r != p > r && n < (l - h) * (r - a) / (p - a) + h && (o = -o);
  }
  return o;
}
function se(e, t, n) {
  var r = n[0] - e[0], o = n[1] - e[1];
  if (r === 0 && o === 0)
    return !0;
  var i = t[0] - e[0], s = t[1] - e[1];
  if (i === 0 && s === 0)
    return !1;
  var c = (r * i + o * s) / (i * i + s * s);
  return c < 0 || c > 1 ? !1 : c === 0 || c === 1 ? !0 : c * i === r && c * s === o;
}
function F(e) {
  var t = 44, n, r = e.getInt32(36, !0), o = e.getInt32(40, !0), i = new Array(r), s = new Array(o);
  for (n = 0; n < r; ++n, t += 4)
    i[n] = e.getInt32(t, !0);
  for (n = 0; n < o; ++n, t += 16)
    s[n] = [e.getFloat64(t, !0), e.getFloat64(t + 8, !0)];
  return r === 1 ? { type: "LineString", coordinates: s } : { type: "MultiLineString", coordinates: i.map(function(c, d) {
    return s.slice(c, i[d + 1]);
  }) };
}
function E(e, t) {
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
      return e._source.slice(4).then(function(i) {
        return i == null ? { done: !0, value: void 0 } : (n = _(t = E(t.slice(4), i)), n.getInt32(0, !1) !== e._index ? r() : o());
      });
    }
    function o() {
      var i = n.getInt32(4, !1) * 2 - 4, s = n.getInt32(8, !0);
      return i < 0 || s && s !== e._type ? r() : e._source.slice(i).then(function(c) {
        return { done: !1, value: s ? e._parse(_(E(t.slice(8), c))) : null };
      });
    }
    return o();
  });
}
var B = {
  0: oe,
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
  return e = C(e), e.slice(100).then(function(t) {
    return new D(e, _(t));
  });
}
function D(e, t) {
  var n = t.getInt32(32, !0);
  if (!(n in B))
    throw new Error("unsupported shape type: " + n);
  this._source = e, this._type = n, this._index = 0, this._parse = B[n], this.bbox = [t.getFloat64(36, !0), t.getFloat64(44, !0), t.getFloat64(52, !0), t.getFloat64(60, !0)];
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
function de() {
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
function pe(e, t, n) {
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
R.read = de;
R.cancel = he;
function ye(e, t, n) {
  return typeof t == "string" ? (/\.dbf$/.test(t) || (t += ".dbf"), t = x(t)) : t instanceof ArrayBuffer || t instanceof Uint8Array ? t = v(t) : t != null && (t = T(t)), typeof e == "string" ? (/\.shp$/.test(e) || (e += ".shp"), t === void 0 && (t = x(e.substring(0, e.length - 4) + ".dbf").catch(function() {
  })), e = x(e)) : e instanceof ArrayBuffer || e instanceof Uint8Array ? e = v(e) : e = T(e), Promise.all([e, t]).then(function(r) {
    var o = r[0], i = r[1], s = "windows-1252";
    return n && n.encoding != null && (s = n.encoding), pe(o, i, i && new TextDecoder(s));
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
  load(t, n, r, o) {
    const i = this;
    return super.load(
      t,
      (s) => {
        try {
          const c = i.parse(s);
          n(c);
        } catch (c) {
          o(c);
        }
      },
      r,
      o
    );
  }
  parse(t) {
    if (!t)
      return null;
    const n = this, r = (a) => {
      const u = new f.Vector3(a[0], a[1], 0);
      return u.applyMatrix4(n.transform), u;
    }, o = (a) => {
      const u = new f.BufferGeometry(), l = r(a), p = [];
      p.push(l.x, l.y, l.z), u.setAttribute("position", new f.Float32BufferAttribute(p, 3));
      const g = new f.PointsMaterial({ color: n.color });
      return new f.Points(u, g);
    }, i = (a) => {
      const u = new f.BufferGeometry(), l = [];
      a == null || a.forEach((g) => {
        const y = r(g);
        l.push(y.x, y.y, y.z);
      }), u.setAttribute("position", new f.Float32BufferAttribute(l, 3));
      const p = new f.LineBasicMaterial({ color: n.color });
      return new f.Line(u, p);
    }, s = (a) => {
      let u = null;
      a.forEach((g) => {
        const y = new f.Shape();
        g.forEach((N, q) => {
          const [S, U] = N;
          q === 0 ? y.moveTo(S, U) : y.lineTo(S, U);
        }), y.lineTo(g[0][0], g[0][1]), u ? u.holes.push(y) : u = y;
      });
      const l = new f.ShapeGeometry(u), p = new f.MeshBasicMaterial({ color: n.color, side: f.DoubleSide });
      return new f.Mesh(l, p);
    }, c = (a) => {
      const u = [];
      switch (a == null ? void 0 : a.type) {
        case "Point":
          u.push(o(a.coordinates));
          break;
        case "LineString":
          u.push(i(a.coordinates));
          break;
        case "Polygon":
          u.push(s(a.coordinates));
          break;
        case "MultiPoint":
          a.coordinates.forEach((l) => {
            u.push(o(l));
          });
          break;
        case "MultiPolygon":
          a.coordinates.forEach((l) => {
            u.push(s(l));
          });
          break;
        case "MultiLineString":
          a.coordinates.forEach((l) => {
            u.push(i(l));
          });
          break;
      }
      return u;
    }, d = (a) => {
      if (a.geometry) {
        const u = c(a.geometry);
        return u.forEach((l) => {
          a.properties && (l.userData = {
            ...a.properties
          });
        }), u;
      }
      return [];
    };
    let h = [];
    if (Array.isArray(t) ? h = t : t.type === "FeatureCollection" ? h = t.features : t.type === "Feature" && (h = [t]), h.length) {
      const a = new f.Group();
      return h.forEach((u) => {
        d(u).forEach((l) => {
          a.add(l);
        });
      }), a;
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
  load(t, n, r, o) {
    const i = this;
    return super.load(
      t,
      (s) => {
        try {
          i.parse(s, n, o);
        } catch (c) {
          o(c);
        }
      },
      r,
      o
    );
  }
  parse(t, n, r) {
    this.parseAsync(t).then(n).catch(r);
  }
  async parseAsync(t) {
    const n = this, r = await n.parseAsyncToGeoJson(t);
    if (!r)
      return null;
    const o = new ge();
    return o.setColor(n.color), o.setTransform(n.transform), o.parse(r);
  }
  async parseAsyncToGeoJson(t) {
    if (!t)
      return null;
    const n = await ye(t), r = await n.read(), o = async (s) => {
      if (s.done)
        return;
      const c = await n.read();
      await o(c);
    };
    return await o(r), r.value;
  }
}
export {
  _e as ShapefileLoader
};
