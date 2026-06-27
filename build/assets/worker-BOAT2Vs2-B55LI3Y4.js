function de(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var O, q;
function ue() {
  if (q) return O;
  q = 1;
  function o(n) {
    if (typeof n != "string")
      throw new TypeError("Path must be a string. Received " + JSON.stringify(n));
  }
  function r(n, e) {
    for (var t = "", l = 0, a = -1, u = 0, i, h = 0; h <= n.length; ++h) {
      if (h < n.length)
        i = n.charCodeAt(h);
      else {
        if (i === 47)
          break;
        i = 47;
      }
      if (i === 47) {
        if (!(a === h - 1 || u === 1)) if (a !== h - 1 && u === 2) {
          if (t.length < 2 || l !== 2 || t.charCodeAt(t.length - 1) !== 46 || t.charCodeAt(t.length - 2) !== 46) {
            if (t.length > 2) {
              var y = t.lastIndexOf("/");
              if (y !== t.length - 1) {
                y === -1 ? (t = "", l = 0) : (t = t.slice(0, y), l = t.length - 1 - t.lastIndexOf("/")), a = h, u = 0;
                continue;
              }
            } else if (t.length === 2 || t.length === 1) {
              t = "", l = 0, a = h, u = 0;
              continue;
            }
          }
          e && (t.length > 0 ? t += "/.." : t = "..", l = 2);
        } else
          t.length > 0 ? t += "/" + n.slice(a + 1, h) : t = n.slice(a + 1, h), l = h - a - 1;
        a = h, u = 0;
      } else i === 46 && u !== -1 ? ++u : u = -1;
    }
    return t;
  }
  function s(n, e) {
    var t = e.dir || e.root, l = e.base || (e.name || "") + (e.ext || "");
    return t ? t === e.root ? t + l : t + n + l : l;
  }
  var c = {
    // path.resolve([from ...], to)
    resolve: function() {
      for (var e = "", t = !1, l, a = arguments.length - 1; a >= -1 && !t; a--) {
        var u;
        a >= 0 ? u = arguments[a] : (l === void 0 && (l = process.cwd()), u = l), o(u), u.length !== 0 && (e = u + "/" + e, t = u.charCodeAt(0) === 47);
      }
      return e = r(e, !t), t ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
    },
    normalize: function(e) {
      if (o(e), e.length === 0) return ".";
      var t = e.charCodeAt(0) === 47, l = e.charCodeAt(e.length - 1) === 47;
      return e = r(e, !t), e.length === 0 && !t && (e = "."), e.length > 0 && l && (e += "/"), t ? "/" + e : e;
    },
    isAbsolute: function(e) {
      return o(e), e.length > 0 && e.charCodeAt(0) === 47;
    },
    join: function() {
      if (arguments.length === 0)
        return ".";
      for (var e, t = 0; t < arguments.length; ++t) {
        var l = arguments[t];
        o(l), l.length > 0 && (e === void 0 ? e = l : e += "/" + l);
      }
      return e === void 0 ? "." : c.normalize(e);
    },
    relative: function(e, t) {
      if (o(e), o(t), e === t || (e = c.resolve(e), t = c.resolve(t), e === t)) return "";
      for (var l = 1; l < e.length && e.charCodeAt(l) === 47; ++l)
        ;
      for (var a = e.length, u = a - l, i = 1; i < t.length && t.charCodeAt(i) === 47; ++i)
        ;
      for (var h = t.length, y = h - i, b = u < y ? u : y, d = -1, p = 0; p <= b; ++p) {
        if (p === b) {
          if (y > b) {
            if (t.charCodeAt(i + p) === 47)
              return t.slice(i + p + 1);
            if (p === 0)
              return t.slice(i + p);
          } else u > b && (e.charCodeAt(l + p) === 47 ? d = p : p === 0 && (d = 0));
          break;
        }
        var v = e.charCodeAt(l + p), C = t.charCodeAt(i + p);
        if (v !== C)
          break;
        v === 47 && (d = p);
      }
      var R = "";
      for (p = l + d + 1; p <= a; ++p)
        (p === a || e.charCodeAt(p) === 47) && (R.length === 0 ? R += ".." : R += "/..");
      return R.length > 0 ? R + t.slice(i + d) : (i += d, t.charCodeAt(i) === 47 && ++i, t.slice(i));
    },
    _makeLong: function(e) {
      return e;
    },
    dirname: function(e) {
      if (o(e), e.length === 0) return ".";
      for (var t = e.charCodeAt(0), l = t === 47, a = -1, u = !0, i = e.length - 1; i >= 1; --i)
        if (t = e.charCodeAt(i), t === 47) {
          if (!u) {
            a = i;
            break;
          }
        } else
          u = !1;
      return a === -1 ? l ? "/" : "." : l && a === 1 ? "//" : e.slice(0, a);
    },
    basename: function(e, t) {
      if (t !== void 0 && typeof t != "string") throw new TypeError('"ext" argument must be a string');
      o(e);
      var l = 0, a = -1, u = !0, i;
      if (t !== void 0 && t.length > 0 && t.length <= e.length) {
        if (t.length === e.length && t === e) return "";
        var h = t.length - 1, y = -1;
        for (i = e.length - 1; i >= 0; --i) {
          var b = e.charCodeAt(i);
          if (b === 47) {
            if (!u) {
              l = i + 1;
              break;
            }
          } else
            y === -1 && (u = !1, y = i + 1), h >= 0 && (b === t.charCodeAt(h) ? --h === -1 && (a = i) : (h = -1, a = y));
        }
        return l === a ? a = y : a === -1 && (a = e.length), e.slice(l, a);
      } else {
        for (i = e.length - 1; i >= 0; --i)
          if (e.charCodeAt(i) === 47) {
            if (!u) {
              l = i + 1;
              break;
            }
          } else a === -1 && (u = !1, a = i + 1);
        return a === -1 ? "" : e.slice(l, a);
      }
    },
    extname: function(e) {
      o(e);
      for (var t = -1, l = 0, a = -1, u = !0, i = 0, h = e.length - 1; h >= 0; --h) {
        var y = e.charCodeAt(h);
        if (y === 47) {
          if (!u) {
            l = h + 1;
            break;
          }
          continue;
        }
        a === -1 && (u = !1, a = h + 1), y === 46 ? t === -1 ? t = h : i !== 1 && (i = 1) : t !== -1 && (i = -1);
      }
      return t === -1 || a === -1 || // We saw a non-dot character immediately before the dot
      i === 0 || // The (right-most) trimmed path component is exactly '..'
      i === 1 && t === a - 1 && t === l + 1 ? "" : e.slice(t, a);
    },
    format: function(e) {
      if (e === null || typeof e != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
      return s("/", e);
    },
    parse: function(e) {
      o(e);
      var t = { root: "", dir: "", base: "", ext: "", name: "" };
      if (e.length === 0) return t;
      var l = e.charCodeAt(0), a = l === 47, u;
      a ? (t.root = "/", u = 1) : u = 0;
      for (var i = -1, h = 0, y = -1, b = !0, d = e.length - 1, p = 0; d >= u; --d) {
        if (l = e.charCodeAt(d), l === 47) {
          if (!b) {
            h = d + 1;
            break;
          }
          continue;
        }
        y === -1 && (b = !1, y = d + 1), l === 46 ? i === -1 ? i = d : p !== 1 && (p = 1) : i !== -1 && (p = -1);
      }
      return i === -1 || y === -1 || // We saw a non-dot character immediately before the dot
      p === 0 || // The (right-most) trimmed path component is exactly '..'
      p === 1 && i === y - 1 && i === h + 1 ? y !== -1 && (h === 0 && a ? t.base = t.name = e.slice(1, y) : t.base = t.name = e.slice(h, y)) : (h === 0 && a ? (t.name = e.slice(1, i), t.base = e.slice(1, y)) : (t.name = e.slice(h, i), t.base = e.slice(h, y)), t.ext = e.slice(i, y)), h > 0 ? t.dir = e.slice(0, h - 1) : a && (t.dir = "/"), t;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  return c.posix = c, O = c, O;
}
var pe = ue(), I = /* @__PURE__ */ de(pe);
const K = "/home/pyodide", Q = (o) => `${K}/${o}`, F = (o, r) => o == null ? I.resolve(K, r) : I.resolve(Q(o), r);
function V(o, r) {
  const s = I.normalize(r), n = I.dirname(s).split(/(?=\/)/);
  let e = "";
  for (const t of n) {
    e += t;
    const l = o.FS.analyzePath(e);
    if (l.exists && l.object) {
      if (!o.FS.isDir(l.object.mode))
        throw new Error(`"${e}" already exists and is not a directory.`);
      continue;
    }
    try {
      o.FS.mkdir(e);
    } catch (a) {
      throw console.error(`Failed to create a directory "${e}"`), a;
    }
  }
}
function Y(o, r, s, c) {
  V(o, r), o.FS.writeFile(r, s, c);
}
function fe(o, r, s) {
  V(o, s), o.FS.rename(r, s);
}
const ge = "[", me = "(<=>!~", he = ";", ye = "@", be = new RegExp(`[${ge + me + he + ye}]`);
function _e(o) {
  return o.split(be)[0].trim();
}
function W(o) {
  return o.forEach((s) => {
    let c;
    try {
      c = new URL(s);
    } catch {
      return;
    }
    if (c.protocol === "emfs:" || c.protocol === "file:")
      throw new Error(`"emfs:" and "file:" protocols are not allowed for the requirement (${s})`);
  }), o.filter((s) => _e(s) === "streamlit" ? (console.warn(`Streamlit is specified in the requirements ("${s}"), but it will be ignored. A built-in version of Streamlit will be used.`), !1) : !0);
}
async function we(o) {
  const r = typeof process < "u" && process.versions?.node;
  let s;
  r ? s = (await import(
    /* webpackIgnore: true */
    "./__vite-browser-external-CPvbk0mb.js"
  )).sep : s = "/";
  const c = o.slice(0, o.lastIndexOf(s) + 1);
  if (o.endsWith(".mjs")) {
    if (r) {
      const n = await import(
        /* webpackIgnore: true */
        "./__vite-browser-external-CPvbk0mb.js"
      ), e = await import(
        /* webpackIgnore: true */
        "./__vite-browser-external-CPvbk0mb.js"
      );
      !o.includes("://") && n.isAbsolute(o) && (o = e.pathToFileURL(o).href);
    }
    return {
      scriptURL: o,
      pyodideIndexURL: c,
      isESModule: !0
    };
  } else
    return {
      scriptURL: o,
      pyodideIndexURL: c,
      isESModule: !1
    };
}
async function ve(o, r) {
  const { scriptURL: s, pyodideIndexURL: c, isESModule: n } = await we(o);
  let e;
  return n ? e = (await import(
    /* webpackIgnore: true */
    /* @vite-ignore */
    s
  )).loadPyodide : (importScripts(s), e = self.loadPyodide), e({ ...r, indexURL: c });
}
function ke(o) {
  o.runPython(`
import micropip
micropip.add_mock_package(
    "pyarrow", "0.0.1",
    modules={
        "pyarrow": """
__version__ = '0.0.1'  # TODO: Update when releasing


class Table:
    @classmethod
    def from_pandas(*args, **kwargs):
        raise NotImplementedError("stlite is not supporting this method.")


class Array:
    def __init__(self, *args, **kwargs):
        raise NotImplementedError("stlite is not supporting PyArrow.Array")


class ChunkedArray:
    def __init__(self, *args, **kwargs):
        raise NotImplementedError("stlite is not supporting PyArrow.ChunkedArray")
"""
    }
)
`);
}
function Se(o, r, s) {
  const c = o.pyimport("pyodide"), n = (i) => c.code.find_imports(i).toJs(), e = s.map((i) => n(i)), a = Array.from(new Set(e.flat())).filter((i) => !o.runPython(`__import__('importlib').util.find_spec('${i}')`)).map((i) => o._api._import_name_to_package_name.get(i)).filter((i) => i);
  if (a.length === 0)
    return Promise.resolve();
  const u = o.loadPackage(a);
  return r(a, u), u.then();
}
function Z(o, r, s) {
  const c = Se(o, r, s);
  o.runPython(`
def __set_module_auto_load_promise__(promise):
    from streamlit.runtime.scriptrunner import script_runner
    script_runner.moduleAutoLoadPromise = promise

__set_module_auto_load_promise__`)(c);
}
async function Pe(o, r, s) {
  const { line: c, column: n } = s, e = o.Script(r);
  if (c > e._code_lines.length)
    return [];
  const t = e.complete.callKwargs({
    line: c,
    column: n,
    fuzzy: !1
  }), l = [];
  for (const a of t.toJs())
    l.push({
      name: a.name,
      type: a.$type,
      // PyProxy.type is overridden in Pyodide. We need to access it this way. Ref: https://github.com/pyodide/pyodide/issues/4032
      docstring: a.docstring.callKwargs({ raw: !0 }),
      complete: a.complete
    }), a.destroy();
  return l;
}
const ee = { version: "3.0", spec_version: "2.3" }, te = "1.1";
class Ae {
  items = [];
  waiters = [];
  enqueue(r) {
    const s = this.waiters.shift();
    s ? s(r) : this.items.push(r);
  }
  dequeue() {
    const r = this.items.shift();
    return r !== void 0 ? Promise.resolve(r) : new Promise((s) => {
      this.waiters.push(s);
    });
  }
}
function Ce(o) {
  const r = new URL(o.path, "http://stlite.local"), s = Object.entries(o.headers).map(([c, n]) => [
    new TextEncoder().encode(c.toLowerCase()),
    new TextEncoder().encode(n)
  ]);
  return {
    type: "http",
    asgi: ee,
    http_version: te,
    method: o.method.toUpperCase(),
    scheme: "http",
    path: r.pathname,
    raw_path: new TextEncoder().encode(r.pathname),
    query_string: new TextEncoder().encode(r.search.replace(/^\?/, "")),
    root_path: "",
    headers: s,
    client: ["stlite", 0],
    server: ["stlite", 80]
  };
}
function Re(o) {
  return typeof o == "string" ? new TextEncoder().encode(o) : new Uint8Array(o);
}
function oe(o) {
  return o && typeof o.toJs == "function" ? o.toJs({ dict_converter: Object.fromEntries }) : o;
}
async function $(o, r) {
  const s = Ce(r), c = Re(r.body);
  let n = !1;
  const e = async () => n ? { type: "http.disconnect" } : (n = !0, {
    type: "http.request",
    body: c,
    more_body: !1
  });
  let t = 0;
  const l = new Headers(), a = [];
  await o(s, e, async (b) => {
    const d = oe(b);
    if (d.type === "http.response.start") {
      t = d.status ?? 0;
      const p = d.headers ?? [];
      for (const [v, C] of p)
        l.append(N(v), N(C));
    } else if (d.type === "http.response.body") {
      const p = d.body;
      p && p.byteLength > 0 && a.push(p);
    }
  });
  const i = a.reduce((b, d) => b + d.byteLength, 0), h = new Uint8Array(i);
  let y = 0;
  for (const b of a)
    h.set(b, y), y += b.byteLength;
  return { statusCode: t, headers: l, body: h };
}
function Ee(o) {
  const r = new URL(o.path, "ws://stlite.local"), s = Object.entries(o.headers ?? {}).map(([c, n]) => [
    new TextEncoder().encode(c.toLowerCase()),
    new TextEncoder().encode(n)
  ]);
  return {
    type: "websocket",
    asgi: ee,
    http_version: te,
    scheme: "ws",
    path: r.pathname,
    raw_path: new TextEncoder().encode(r.pathname),
    query_string: new TextEncoder().encode(r.search.replace(/^\?/, "")),
    root_path: "",
    headers: s,
    client: ["stlite", 0],
    server: ["stlite", 80],
    subprotocols: o.subprotocols ?? []
  };
}
class Le {
  asgiApp;
  scope;
  onServerSend;
  receiveQueue = new Ae();
  acceptedResolve;
  acceptedReject;
  acceptedPromise;
  appTask = null;
  closed = !1;
  constructor(r, s, c) {
    this.asgiApp = r, this.scope = s, this.onServerSend = c, this.acceptedPromise = new Promise((n, e) => {
      this.acceptedResolve = n, this.acceptedReject = e;
    });
  }
  start() {
    this.receiveQueue.enqueue({ type: "websocket.connect" });
    const r = () => this.receiveQueue.dequeue(), s = async (n) => {
      const e = oe(n);
      if (e.type === "websocket.accept") {
        this.acceptedResolve(e.subprotocol ?? null);
        return;
      }
      e.type === "websocket.close" && !this.closed && this.acceptedReject(new Error(`WebSocket closed before accept (code=${e.code ?? "?"})`)), this.onServerSend(e);
    }, c = this.asgiApp(this.scope, r, s);
    return this.appTask = Promise.resolve(c), this.appTask.catch((n) => {
      this.acceptedReject(n);
    }), this.acceptedPromise;
  }
  postClientMessage(r) {
    if (this.closed)
      return;
    const s = typeof r == "string" ? { type: "websocket.receive", text: r } : { type: "websocket.receive", bytes: r };
    this.receiveQueue.enqueue(s);
  }
  async close(r = 1e3) {
    if (!this.closed && (this.closed = !0, this.receiveQueue.enqueue({ type: "websocket.disconnect", code: r }), this.appTask))
      try {
        await this.appTask;
      } catch {
      }
  }
}
function N(o) {
  return new TextDecoder("utf-8").decode(o);
}
const x = "_streamlit_xsrf", B = "X-XSRFtoken", Fe = "/_stcore/upload_file";
function re(o, r) {
  const s = r.toLowerCase();
  return Object.entries(o).find(([n]) => n.toLowerCase() === s)?.[1];
}
function Te(o, r) {
  return re(o, r) !== void 0;
}
function Ie(o) {
  return o.split(/,(?=\s*[^;,]+=)/).map((r) => r.trim());
}
function Me(o) {
  const s = o.getSetCookie?.();
  if (s)
    return s;
  const c = o.get("set-cookie");
  return c ? Ie(c) : [];
}
function He(o) {
  const r = o.split(";", 1)[0] ?? "", s = r.indexOf("=");
  return s <= 0 ? null : [
    r.slice(0, s).trim(),
    r.slice(s + 1).trim()
  ];
}
function D(o) {
  return o.method !== "PUT" && o.method !== "DELETE" ? !1 : new URL(o.path, "http://stlite.local").pathname.startsWith(Fe);
}
class Oe {
  cookies = /* @__PURE__ */ new Map();
  clear() {
    this.cookies.clear();
  }
  storeFromResponse(r) {
    for (const s of Me(r)) {
      const c = He(s);
      if (!c)
        continue;
      const [n, e] = c;
      if (n === x && e === "") {
        this.cookies.delete(n);
        continue;
      }
      this.cookies.set(n, e);
    }
  }
  getCookieHeader() {
    return Array.from(this.cookies).map(([r, s]) => `${r}=${s}`).join("; ");
  }
  needsXsrfWarmup(r) {
    return D(r) && !this.cookies.get(x);
  }
  applyToRequest(r) {
    const s = this.getCookieHeader(), c = this.cookies.get(x);
    if (!s && !(c && D(r)))
      return r;
    const n = { ...r.headers };
    if (s) {
      const e = re(n, "cookie");
      for (const t of Object.keys(n))
        t.toLowerCase() === "cookie" && delete n[t];
      n.Cookie = e ? `${e}; ${s}` : s;
    }
    return c && D(r) && !Te(n, B) && (n[B] = c), {
      ...r,
      headers: n
    };
  }
}
let j = null, z = Promise.resolve(), U = !1;
async function xe(o, r, s, c, n) {
  const { files: e, archives: t, requirements: l, prebuiltPackageNames: a, wheels: u, installs: i, pyodideUrl: h = o, streamlitConfig: y, idbfsMountpoints: b, nodefsMountpoints: d, moduleAutoLoad: p, env: v, languageServer: C } = s, R = W(l);
  j ? (n("Pyodide is already loaded."), console.debug("Pyodide is already loaded.")) : (n("Loading Pyodide."), console.debug("Loading Pyodide."), j = ve(h, {
    stdout: console.log,
    stderr: console.error
  }), console.debug("Loaded Pyodide"));
  const w = (
    // XXX: `{ FS: any }` is a temporary workaround to fix the type error.
    await j
  );
  if (v) {
    console.debug("Setting environment variables", v);
    const m = w.pyimport("os");
    m.environ.update(w.toPy(v)), console.debug("Set environment variables", m.environ);
  }
  let L = !1;
  b && (L = !0, b.forEach((m) => {
    w.FS.mkdir(m), w.FS.mount(w.FS.filesystems.IDBFS, {}, m);
  }), await new Promise((m, k) => {
    w.FS.syncfs(!0, (A) => {
      A ? k(A) : m();
    });
  })), d && Object.entries(d).forEach(([m, k]) => {
    w.FS.mkdir(m), w.FS.mount(w.FS.filesystems.NODEFS, { root: k }, m);
  }), n("Mounting files.");
  const T = [];
  await Promise.all(Object.keys(e).map(async (m) => {
    const k = e[m];
    m = F(r, m);
    let A;
    "url" in k ? (console.debug(`Fetch a file from ${k.url}`), A = await fetch(k.url).then((E) => E.arrayBuffer()).then((E) => new Uint8Array(E))) : A = k.data, console.debug(`Write a file "${m}"`), Y(w, m, A, e.opts), m.endsWith(".py") && T.push(m);
  })), n("Unpacking archives."), await Promise.all(t.map(async (m) => {
    let k;
    "url" in m ? (console.debug(`Fetch an archive from ${m.url}`), k = await fetch(m.url).then((ce) => ce.arrayBuffer())) : k = m.buffer;
    const { format: A, options: E } = m;
    console.debug("Unpack an archive", { format: A, options: E }), w.unpackArchive(k, A, E);
  })), await w.loadPackage("micropip");
  const S = w.pyimport("micropip");
  n("Mocking some packages."), console.debug("Mock pyarrow"), ke(w), console.debug("Mocked pyarrow"), n("Installing packages."), console.debug("Installing the prebuilt packages:", a), await w.loadPackage(a), console.debug("Installed the prebuilt packages");
  const M = async () => {
    console.debug("Installing the packages:", {
      requirements: R,
      systemPackagesInstalled: U
    });
    const m = [];
    U || (console.debug("System packages will be installed"), u && (m.push("protobuf>=7.34.1,<8"), m.push(u.streamlit), m.push(u.stliteLib)), C && m.push("jedi"));
    const k = [...m, ...R];
    console.debug("Installing the packages:", k), await S.install.callKwargs(k, { keep_going: !0 }), m.length > 0 && (console.debug("Installed the system packages"), U = !0), console.debug("Installed the packages");
  }, g = z.then(() => M());
  if (z = g.catch((m) => {
    console.error("Package installation failed:", m);
  }), await g, i && (console.debug("Installing the additional requirements"), await Promise.all(i.map(({ requirements: m, options: k }) => {
    const A = W(m);
    return console.debug("Installing the requirements:", A), S.install.callKwargs(A, k ?? {});
  }))), p) {
    const m = T.map((k) => w.FS.readFile(k, { encoding: "utf8" }));
    Z(w, c, m);
  }
  await w.runPythonAsync(`
import importlib
importlib.invalidate_caches()
`), n("Loading streamlit package."), console.debug("Loading the Streamlit package"), await w.runPythonAsync(`
import streamlit.runtime
  `), console.debug("Loaded the Streamlit package"), n("Setting up the loggers."), console.debug("Setting the loggers"), await w.runPythonAsync(`
import logging
import streamlit.logger

streamlit.logger.get_logger = logging.getLogger
streamlit.logger.setup_formatter = None
streamlit.logger.update_formatter = lambda *a, **k: None
streamlit.logger.set_log_level = lambda *a, **k: None

for name in streamlit.logger._loggers.keys():
    if name == "root":
        name = "streamlit"
    logger = logging.getLogger(name)
    logger.propagate = True
    logger.handlers.clear()
    logger.setLevel(logging.NOTSET)

streamlit.logger._loggers = {}
`);
  const f = (m, k) => {
    m >= 40 ? console.error(k) : m >= 30 ? console.warn(k) : m >= 20 ? console.info(k) : console.debug(k);
  }, _ = w.runPython(`
def __setup_loggers__(streamlit_level, streamlit_message_format, callback):
    class JsHandler(logging.Handler):
        def emit(self, record):
            msg = self.format(record)
            callback(record.levelno, msg)


    root_message_format = "%(levelname)s:%(name)s:%(message)s"

    root_logger = logging.getLogger()
    root_logger.handlers.clear()
    root_formatter = logging.Formatter(root_message_format)
    root_handler = JsHandler()
    root_handler.setFormatter(root_formatter)
    root_logger.addHandler(root_handler)
    root_logger.setLevel(logging.DEBUG)

    streamlit_logger = logging.getLogger("streamlit")
    streamlit_logger.propagate = False
    streamlit_logger.handlers.clear()
    streamlit_formatter = logging.Formatter(streamlit_message_format)
    streamlit_handler = JsHandler()
    streamlit_handler.setFormatter(streamlit_formatter)
    streamlit_logger.addHandler(streamlit_handler)
    streamlit_logger.setLevel(streamlit_level.upper())

__setup_loggers__`), P = (y?.["logger.level"] ?? "INFO").toString(), ne = y?.["logger.messageFormat"] ?? "%(asctime)s %(message)s";
  if (_(P, ne, f), console.debug("Set the loggers"), n("Mocking some Streamlit functions for the browser environment."), console.debug("Mocking some Streamlit functions"), await w.runPythonAsync(`
import streamlit

def is_cacheable_msg(msg):
  return False

streamlit.runtime.runtime.is_cacheable_msg = is_cacheable_msg
`), console.debug("Mocked some Streamlit functions"), L) {
    n("Setting up the IndexedDB filesystem synchronizer."), console.debug("Setting up the IndexedDB filesystem synchronizer");
    let m = !1;
    const k = () => {
      console.debug("The script has finished. Syncing the filesystem."), m || (m = !0, w.FS.syncfs(!1, (E) => {
        m = !1, E && console.error(E);
      }));
    };
    (await w.runPython(`
def __setup_script_finished_callback__(callback):
    from streamlit.runtime.app_session import AppSession
    from streamlit.runtime.scriptrunner import ScriptRunnerEvent

    def wrap_app_session_on_scriptrunner_event(original_method):
        def wrapped(self, *args, **kwargs):
            if "event" in kwargs:
                event = kwargs["event"]
                if event == ScriptRunnerEvent.SCRIPT_STOPPED_WITH_SUCCESS or event == ScriptRunnerEvent.SCRIPT_STOPPED_FOR_RERUN or event == ScriptRunnerEvent.SHUTDOWN:
                    callback()
            return original_method(self, *args, **kwargs)
        return wrapped

    AppSession._on_scriptrunner_event = wrap_app_session_on_scriptrunner_event(AppSession._on_scriptrunner_event)

__setup_script_finished_callback__`))(k), console.debug("Set up the IndexedDB filesystem synchronizer");
  }
  console.debug("Setting up the Streamlit configuration");
  const { load_config_options: ae } = w.pyimport("stlite_lib.bootstrap"), ie = {
    // gatherUsageStats is disabled as default, but can be enabled explicitly by setting it to true.
    "browser.gatherUsageStats": !1,
    ...y,
    "runner.fastReruns": !1
    // Fast reruns do not work well with the async script runner of stlite. See https://github.com/whitphx/stlite/pull/550#issuecomment-1505485865.
  }, le = r != null;
  ae(w.toPy(ie), le), console.debug("Set up the Streamlit configuration");
  let H;
  if (C) {
    n("Loading auto-completion engine."), console.debug("Loading Jedi");
    try {
      H = await w.pyimport("jedi"), console.debug("Loaded Jedi");
    } catch (m) {
      console.error("Failed to load Jedi:", m), H = void 0;
    }
  }
  return {
    pyodide: w,
    micropip: S,
    jedi: H,
    initData: s
  };
}
async function J(o, r, s) {
  const c = F(r, s);
  console.debug("Preparing the Streamlit environment");
  const { prepare: n } = o.pyimport("stlite_lib.bootstrap");
  n(c, []), console.debug("Prepared the Streamlit environment"), console.debug("Booting up the Streamlit ASGI app");
  const e = o.pyimport("stlite_lib.asgi_app"), t = e.create_app(c), l = await e.run_lifespan_startup(t);
  e.bind_runtime_to_current_context(t);
  const a = e.make_call_asgi(t, r ? Q(r) : void 0);
  return console.debug("Booted up the Streamlit ASGI app"), { asgiApp: a, lifespanState: l };
}
async function De(o, r) {
  const { run_lifespan_shutdown: s } = o.pyimport("stlite_lib.asgi_app");
  await s(r.lifespanState), r.lifespanState.destroy();
}
function G(o, r, s, c) {
  function n(b) {
    r({
      type: "event:loadProgress",
      data: {
        message: b
      }
    });
  }
  const e = (b, d) => {
    const p = new MessageChannel();
    r({
      type: "event:moduleAutoLoad",
      data: {
        packagesToLoad: b
      }
    }, [p.port2]), d.then((v) => {
      p.port1.postMessage({
        type: "moduleAutoLoad:success",
        data: {
          loadedPackages: v
        }
      }), p.port1.close();
    }).catch((v) => {
      throw p.port1.postMessage({
        type: "moduleAutoLoad:error",
        error: v
      }), p.port1.close(), v;
    });
  };
  let t = null, l = null, a = null;
  const u = new Oe();
  async function i(b, d) {
    console.debug("stlite XSRF warmup before upload", { requestPath: d });
    const p = await $(b, u.applyToRequest({
      method: "GET",
      path: "/_stcore/health",
      headers: { host: "stlite.local" },
      body: ""
    }));
    u.storeFromResponse(p.headers), console.debug("stlite XSRF warmup response", {
      requestPath: d,
      statusCode: p.statusCode
    });
  }
  async function h(b, d) {
    const p = {
      ...d,
      path: decodeURIComponent(d.path)
    };
    u.needsXsrfWarmup(p) && await i(b, p.path);
    const v = u.applyToRequest(p), C = await $(b, v);
    return u.storeFromResponse(C.headers), C;
  }
  const y = async (b) => {
    const d = b.data;
    if (d.type === "initData") {
      const g = d.data, f = {
        ...s,
        ...g
      };
      console.debug("Initial data", f), t = xe(o, c, f, e, n), t.then(({ pyodide: _ }) => (n("Booting up the Streamlit server."), l = J(_, c, f.entrypoint), l)).then(() => {
        r({
          type: "event:loadFinished"
        });
      }).catch((_) => {
        console.error(_), r({
          type: "event:loadError",
          data: {
            error: _
          }
        });
      });
      return;
    }
    if (!t)
      throw new Error("Pyodide initialization has not been started yet.");
    if (!l)
      throw new Error("Streamlit ASGI app has not been started yet.");
    const p = await t, v = p.pyodide, C = p.micropip, R = p.jedi, { moduleAutoLoad: w } = p.initData;
    let L = await l;
    const T = b.ports[0];
    function S(g) {
      T.postMessage(g);
    }
    function M(g) {
      if (g.type !== "websocket.send")
        return;
      const f = g.bytes;
      if (f) {
        const P = f.buffer.slice(f.byteOffset, f.byteOffset + f.byteLength);
        r({ type: "websocket:message", data: { payload: P } }, [P]);
        return;
      }
      const _ = g.text;
      typeof _ == "string" && r({ type: "websocket:message", data: { payload: _ } });
    }
    try {
      switch (d.type) {
        case "reboot": {
          console.debug("Reboot the Streamlit server", d.data);
          const { entrypoint: g } = d.data;
          a && (await a.close(), a = null), await De(v, L), u.clear(), console.debug("Booting up the Streamlit ASGI app"), l = J(v, c, g), L = await l, console.debug("Booted up the Streamlit ASGI app"), S({
            type: "reply"
          });
          break;
        }
        case "websocket:connect": {
          console.debug("websocket:connect", d.data);
          const { path: g } = d.data, f = u.getCookieHeader();
          a && (await a.close(), a = null);
          const _ = Ee({
            path: g,
            headers: {
              host: "stlite.local",
              origin: "http://stlite.local",
              ...f ? { cookie: f } : {}
            }
          });
          a = new Le(L.asgiApp, _, M), await a.start(), S({
            type: "reply"
          });
          break;
        }
        case "websocket:send": {
          console.debug("websocket:send", d.data);
          const { payload: g } = d.data;
          a && a.postClientMessage(g);
          break;
        }
        case "http:request": {
          console.debug("http:request", d.data);
          const { request: g } = d.data;
          h(L.asgiApp, g).then((f) => {
            S({
              type: "http:response",
              data: {
                response: {
                  statusCode: f.statusCode,
                  headers: new Map(f.headers.entries()),
                  body: f.body
                }
              }
            });
          }).catch((f) => {
            console.error("http:request dispatch failed", f), S({
              type: "http:response",
              data: {
                response: {
                  statusCode: 500,
                  headers: /* @__PURE__ */ new Map([
                    ["content-type", "text/plain; charset=utf-8"]
                  ]),
                  body: new TextEncoder().encode(`Internal server error: ${String(f)}`)
                }
              }
            });
          });
          break;
        }
        case "file:write": {
          const { path: g, data: f, opts: _ } = d.data, P = F(c, g);
          w && typeof f == "string" && P.endsWith(".py") && (console.debug(`Auto install the requirements in ${P}`), Z(v, e, [f])), console.debug(`Write a file "${P}"`), Y(v, P, f, _), S({
            type: "reply"
          });
          break;
        }
        case "file:rename": {
          const { oldPath: g, newPath: f } = d.data, _ = F(c, g), P = F(c, f);
          console.debug(`Rename "${_}" to ${P}`), fe(v, _, P), S({
            type: "reply"
          });
          break;
        }
        case "file:unlink": {
          const { path: g } = d.data, f = F(c, g);
          console.debug(`Remove "${f}`), v.FS.unlink(f), S({
            type: "reply"
          });
          break;
        }
        case "file:read": {
          const { path: g, opts: f } = d.data;
          console.debug(`Read "${g}"`);
          const _ = v.FS.readFile(g, f);
          S({
            type: "reply:file:read",
            data: {
              content: _
            }
          });
          break;
        }
        case "install": {
          const { requirements: g, options: f } = d.data, _ = W(g);
          console.debug("Install the requirements:", _), await C.install.callKwargs(_, f ?? {}).then(() => {
            console.debug("Successfully installed"), S({
              type: "reply"
            });
          });
          break;
        }
        case "setEnv": {
          const { env: g } = d.data;
          v.pyimport("os").environ.update(v.toPy(g)), console.debug("Successfully set the environment variables", g), S({
            type: "reply"
          });
          break;
        }
        case "code_completion": {
          if (!R)
            throw new Error("Jedi is not installed");
          const { code: g, line: f, column: _ } = d.data, P = await Pe(R, g, {
            line: f,
            column: _
          });
          S({
            type: "reply:code_completion",
            data: {
              codeCompletions: P
            }
          });
          break;
        }
        case "run_python": {
          const { code: g } = d.data;
          console.debug("Run python code", g);
          const f = await v.runPythonAsync(g);
          let _;
          f instanceof v.ffi.PyProxy ? (console.debug("The result is a PyProxy object"), _ = f.toJs(), f.destroy(), console.debug("Converted the result to a JS object", _)) : (_ = f, console.debug("The result is a JS primitive", _)), S({
            type: "reply:run_python",
            data: {
              result: _
            }
          });
          break;
        }
        case "add_mock_package": {
          const { name: g, version: f, modules: _, persistent: P } = d.data;
          console.debug("Add a mock package:", {
            name: g,
            version: f,
            modules: _,
            persistent: P
          }), C.add_mock_package.callKwargs({
            name: g,
            version: f,
            modules: v.toPy(_),
            persistent: P
          }), S({
            type: "reply"
          });
          break;
        }
      }
    } catch (g) {
      if (console.error(g), !(g instanceof Error))
        throw g;
      const f = new Error(g.message);
      f.name = g.name, f.stack = g.stack, S({
        type: "reply",
        error: f
      });
    }
  };
  return r({
    type: "event:envSetup"
  }), y;
}
const se = "abcdefghijklmnopqrstuvwxyz", je = se.length;
function Ue(o) {
  let r = "";
  for (let s = 0; s < o; s++) {
    const c = Math.floor(Math.random() * je);
    r += se[c];
  }
  return r;
}
const X = "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.mjs";
if ("postMessage" in self)
  self.onmessage = G(X, (o, r) => r ? self.postMessage(o, r) : self.postMessage(o));
else {
  const o = [];
  self.onconnect = (r) => {
    let s;
    do
      s = Ue(4);
    while (o.includes(s));
    o.push(s), console.debug("SharedWorker mode.", { appId: s });
    const c = r.ports[0];
    c.onmessage = G(X, (n, e) => e ? c.postMessage(n, e) : c.postMessage(n), void 0, s), c.start();
  };
}
//# sourceMappingURL=worker-BOAT2Vs2.js.map
