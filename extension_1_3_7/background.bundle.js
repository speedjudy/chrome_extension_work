!(function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          r.d(
            n,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 49));
})([
  ,
  function (e, t, r) {
    e.exports = r(16);
  },
  ,
  function (e, t) {
    function r(e, t, r, n, o, a, i) {
      try {
        var c = e[a](i),
          u = c.value;
      } catch (e) {
        return void r(e);
      }
      c.done ? t(u) : Promise.resolve(u).then(n, o);
    }
    e.exports = function (e) {
      return function () {
        var t = this,
          n = arguments;
        return new Promise(function (o, a) {
          var i = e.apply(t, n);
          function c(e) {
            r(i, o, a, c, u, "next", e);
          }
          function u(e) {
            r(i, o, a, c, u, "throw", e);
          }
          c(void 0);
        });
      };
    };
  },
  function (e, t, r) {
    "use strict";
    r.d(t, "d", function () {
      return c;
    }),
      r.d(t, "a", function () {
        return u;
      }),
      r.d(t, "c", function () {
        return s;
      }),
      r.d(t, "b", function () {
        return f;
      });
    var n = r(1),
      o = r.n(n),
      a = r(3),
      i = r.n(a);
    r(12);
    function c(e) {
      return new Promise(function (t, r) {
        chrome.runtime.sendMessage(e, t);
      });
    }
    function u(e) {
      var t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : "local";
      return new Promise(function (r, n) {
        chrome.storage[t].get(e, function (t) {
          r(t && t[e]);
        });
      });
    }
    function s(e, t) {
      var r =
        arguments.length > 2 && void 0 !== arguments[2]
          ? arguments[2]
          : "local";
      return new Promise(function (n, o) {
        var a = {};
        (a[e] = t), chrome.storage[r].set(a, n);
      });
    }
    function f(e) {
      return p.apply(this, arguments);
    }
    function p() {
      return (p = i()(
        o.a.mark(function e(t) {
          var r, n;
          return o.a.wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (e.next = 2), u("config", "sync");
                case 2:
                  if (((e.t0 = e.sent), e.t0)) {
                    e.next = 5;
                    break;
                  }
                  e.t0 = {};
                case 5:
                  return (
                    (r = e.t0),
                    (n = Object.assign({}, r, t)),
                    (e.next = 9),
                    s("config", n, "sync")
                  );
                case 9:
                  return e.abrupt("return", n);
                case 10:
                case "end":
                  return e.stop();
              }
          }, e);
        })
      )).apply(this, arguments);
    }
  },
  function (e, t, r) {
    "use strict";
    r.d(t, "b", function () {
      return n;
    }),
      r.d(t, "c", function () {
        return o;
      }),
      r.d(t, "a", function () {
        return a;
      });
    var n = "https://freelancer-helper.com",
      o = (new Date(2021, 2, 3), 3),
      a = 3.99;
  },
  ,
  ,
  ,
  function (e, t, r) {
    "use strict";
    r.d(t, "a", function () {
      return f;
    }),
      r.d(t, "d", function () {
        return l;
      }),
      r.d(t, "c", function () {
        return d;
      }),
      r.d(t, "e", function () {
        return h;
      }),
      r.d(t, "f", function () {
        return m;
      }),
      r.d(t, "b", function () {
        return y;
      }),
      r.d(t, "g", function () {
        return b;
      });
    var n = r(1),
      o = r.n(n),
      a = r(3),
      i = r.n(a),
      c = r(4),
      u = r(5),
      s = function () {
        return chrome.runtime.getManifest().version;
      },
      f = (function () {
        var e = i()(
          o.a.mark(function e(t) {
            var r, n, a, i, c;
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (t) {
                      e.next = 2;
                      break;
                    }
                    return e.abrupt("return", 0);
                  case 2:
                    return (
                      (r = u.c),
                      864e5,
                      (n = new Date(t.signup_date)),
                      (a = new Date()),
                      (i = a.getTime() - n.getTime()),
                      (c = Math.ceil(r - i / 864e5)),
                      e.abrupt("return", c)
                    );
                  case 9:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      p = (function () {
        var e = i()(
          o.a.mark(function e(t) {
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (!t) {
                      e.next = 16;
                      break;
                    }
                    if (
                      !(
                        t.amount &&
                        parseFloat(t.amount) >= u.a &&
                        "USD" === t.currency
                      )
                    ) {
                      e.next = 5;
                      break;
                    }
                    return e.abrupt("return", "PREMIUM");
                  case 5:
                    if (!t.signup_date) {
                      e.next = 14;
                      break;
                    }
                    return (e.next = 8), f(t);
                  case 8:
                    if (!(e.sent > 0)) {
                      e.next = 13;
                      break;
                    }
                    return e.abrupt("return", "DURING_TRIAL");
                  case 13:
                    return e.abrupt("return", "TRIAL_EXPIRED");
                  case 14:
                    e.next = 17;
                    break;
                  case 16:
                    return e.abrupt("return", "PREMIUM");
                  case 17:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      l = (function () {
        var e = i()(
          o.a.mark(function e(t) {
            var r, n, a, i, c, u, s, f;
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (
                      ((r = t.userData),
                      (n = void 0 === r ? null : r),
                      (a = t.queryServer),
                      (i = void 0 !== a && a),
                      (c = t.callback),
                      (e.t0 = n),
                      e.t0)
                    ) {
                      e.next = 6;
                      break;
                    }
                    return (e.next = 5), d({ queryServer: i });
                  case 5:
                    e.t0 = e.sent;
                  case 6:
                    return (u = e.t0), (e.next = 9), p(u);
                  case 9:
                    return (
                      (s = e.sent),
                      c((f = { actual: s, adjusted: s })),
                      e.abrupt("return", f)
                    );
                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      d = (function () {
        var e = i()(
          o.a.mark(function e(t) {
            var r, n, a, i, u, s;
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (
                      ((r = t.queryServer),
                      (n = void 0 !== r && r),
                      (a = t.callback),
                      (i = void 0 === a ? null : a),
                      !n)
                    ) {
                      e.next = 9;
                      break;
                    }
                    return (e.next = 4), b();
                  case 4:
                    return (
                      (u = e.sent), i && i(u.data), e.abrupt("return", u.data)
                    );
                  case 9:
                    return (e.next = 11), Object(c.a)("userData");
                  case 11:
                    if (((e.t0 = e.sent), e.t0)) {
                      e.next = 14;
                      break;
                    }
                    e.t0 = null;
                  case 14:
                    return (s = e.t0), i && i(s), e.abrupt("return", s);
                  case 17:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      h = (function () {
        var e = i()(
          o.a.mark(function e(t) {
            var r, n, a, i, f, p, l, d;
            return o.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.token),
                        (n = t.provider),
                        (a = void 0 === n ? "google" : n),
                        (i = t.callback),
                        (f = new FormData()).append("authToken", r),
                        f.append("provider", a),
                        f.append("extensionVersion", s()),
                        (p = { method: "POST", body: f }),
                        (e.prev = 6),
                        (e.next = 9),
                        fetch("".concat(u.b, "/login.php"), p)
                      );
                    case 9:
                      return (l = e.sent), (e.next = 12), l.json();
                    case 12:
                      if (!(d = e.sent).data || !d.data.session_handle) {
                        e.next = 16;
                        break;
                      }
                      return (
                        (e.next = 16),
                        Object(c.c)("sessionHandle", d.data.session_handle)
                      );
                    case 16:
                      i(d), (e.next = 24);
                      break;
                    case 20:
                      (e.prev = 20),
                        (e.t0 = e.catch(6)),
                        i({
                          success: !1,
                          message: "Error accessing the server.",
                        });
                    case 24:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [[6, 20]]
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      v = (function () {
        var e = i()(
          o.a.mark(function e() {
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (e.next = 2),
                      Promise.all([
                        Object(c.c)("sessionHandle", null),
                        Object(c.c)("googleToken", null),
                        Object(c.c)("userData", null),
                      ])
                    );
                  case 2:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        );
        return function () {
          return e.apply(this, arguments);
        };
      })(),
      m = (function () {
        var e = i()(
          o.a.mark(function e(t) {
            var r, n, a, i, f, p, l, d, h, m;
            return o.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.token),
                        (n = t.provider),
                        (a = void 0 === n ? "google" : n),
                        (i = t.callback),
                        chrome.identity.clearAllCachedAuthTokens(function (e) {
                          return e;
                        }),
                        (f = null),
                        (e.next = 5),
                        Object(c.a)("sessionHandle")
                      );
                    case 5:
                      return (
                        (p = e.sent),
                        (l = new FormData()).append("authToken", r),
                        l.append("provider", a),
                        l.append("extensionVersion", s()),
                        p && l.append("sessionHandle", p),
                        (d = { method: "POST", body: l }),
                        (e.next = 14),
                        v()
                      );
                    case 14:
                      return (
                        (e.prev = 14),
                        (e.next = 17),
                        fetch("".concat(u.b, "/logout.php"), d)
                      );
                    case 17:
                      return (h = e.sent), (e.next = 20), h.json();
                    case 20:
                      (m = e.sent).success, (f = m), (e.next = 29);
                      break;
                    case 25:
                      (e.prev = 25),
                        (e.t0 = e.catch(14)),
                        (f = {
                          success: !1,
                          message: "Error accessing the server.",
                        });
                    case 29:
                      i(f);
                    case 30:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [[14, 25]]
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      y = (function () {
        var e = i()(
          o.a.mark(function e(t) {
            var r, n, a, i, f, p, l, d, h, v;
            return o.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.paymentData),
                        (n = t.provider),
                        (a = void 0 === n ? "paypal" : n),
                        (i = t.callback),
                        (f = null),
                        (e.next = 4),
                        Object(c.a)("sessionHandle")
                      );
                    case 4:
                      return (
                        (p = e.sent),
                        (l = new FormData()).append("orderID", r.orderID),
                        l.append("paymentProvider", a),
                        l.append("sessionHandle", p),
                        l.append("extensionVersion", s()),
                        (d = { method: "POST", body: l }),
                        (e.prev = 12),
                        (e.next = 15),
                        fetch("".concat(u.b, "/paypal/capture_payment.php"), d)
                      );
                    case 15:
                      return (h = e.sent), (e.next = 18), h.json();
                    case 18:
                      (v = e.sent), (f = v), (e.next = 27);
                      break;
                    case 23:
                      (e.prev = 23),
                        (e.t0 = e.catch(12)),
                        (f = {
                          success: !1,
                          message:
                            "Error accessing the server. Please contact support.",
                        });
                    case 27:
                      i(f);
                    case 28:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [[12, 23]]
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      b = (function () {
        var e = i()(
          o.a.mark(function e() {
            var t, r, n, a, i;
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), Object(c.a)("sessionHandle");
                  case 2:
                    return (
                      (t = e.sent),
                      (r = new FormData()).append("sessionHandle", t),
                      r.append("extensionVersion", s()),
                      (n = { method: "POST", body: r }),
                      (e.next = 9),
                      fetch("".concat(u.b, "/get_user_data.php"), n)
                    );
                  case 9:
                    return (a = e.sent), (e.next = 12), a.json();
                  case 12:
                    return (
                      (i = e.sent).success &&
                        Object(c.c)("userData", i.data || null),
                      e.abrupt("return", i)
                    );
                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        );
        return function () {
          return e.apply(this, arguments);
        };
      })();
  },
  function (e, t) {
    e.exports = function (e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    };
  },
  function (e, t) {
    e.exports = function (e, t, r) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    };
  },
  function (e, t, r) {
    var n = r(19),
      o = r(20),
      a = r(13),
      i = r(21);
    e.exports = function (e) {
      return n(e) || o(e) || a(e) || i();
    };
  },
  function (e, t, r) {
    var n = r(10);
    e.exports = function (e, t) {
      if (e) {
        if ("string" == typeof e) return n(e, t);
        var r = Object.prototype.toString.call(e).slice(8, -1);
        return (
          "Object" === r && e.constructor && (r = e.constructor.name),
          "Map" === r || "Set" === r
            ? Array.from(e)
            : "Arguments" === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            ? n(e, t)
            : void 0
        );
      }
    };
  },
  ,
  ,
  function (e, t, r) {
    var n = (function (e) {
      "use strict";
      var t = Object.prototype,
        r = t.hasOwnProperty,
        n = "function" == typeof Symbol ? Symbol : {},
        o = n.iterator || "@@iterator",
        a = n.asyncIterator || "@@asyncIterator",
        i = n.toStringTag || "@@toStringTag";
      function c(e, t, r) {
        return (
          Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          e[t]
        );
      }
      try {
        c({}, "");
      } catch (e) {
        c = function (e, t, r) {
          return (e[t] = r);
        };
      }
      function u(e, t, r, n) {
        var o = t && t.prototype instanceof p ? t : p,
          a = Object.create(o.prototype),
          i = new k(n || []);
        return (
          (a._invoke = (function (e, t, r) {
            var n = "suspendedStart";
            return function (o, a) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === o) throw a;
                return L();
              }
              for (r.method = o, r.arg = a; ; ) {
                var i = r.delegate;
                if (i) {
                  var c = w(i, r);
                  if (c) {
                    if (c === f) continue;
                    return c;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = s(e, t, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === f)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          })(e, r, i)),
          a
        );
      }
      function s(e, t, r) {
        try {
          return { type: "normal", arg: e.call(t, r) };
        } catch (e) {
          return { type: "throw", arg: e };
        }
      }
      e.wrap = u;
      var f = {};
      function p() {}
      function l() {}
      function d() {}
      var h = {};
      h[o] = function () {
        return this;
      };
      var v = Object.getPrototypeOf,
        m = v && v(v(j([])));
      m && m !== t && r.call(m, o) && (h = m);
      var y = (d.prototype = p.prototype = Object.create(h));
      function b(e) {
        ["next", "throw", "return"].forEach(function (t) {
          c(e, t, function (e) {
            return this._invoke(t, e);
          });
        });
      }
      function g(e, t) {
        var n;
        this._invoke = function (o, a) {
          function i() {
            return new t(function (n, i) {
              !(function n(o, a, i, c) {
                var u = s(e[o], e, a);
                if ("throw" !== u.type) {
                  var f = u.arg,
                    p = f.value;
                  return p && "object" == typeof p && r.call(p, "__await")
                    ? t.resolve(p.__await).then(
                        function (e) {
                          n("next", e, i, c);
                        },
                        function (e) {
                          n("throw", e, i, c);
                        }
                      )
                    : t.resolve(p).then(
                        function (e) {
                          (f.value = e), i(f);
                        },
                        function (e) {
                          return n("throw", e, i, c);
                        }
                      );
                }
                c(u.arg);
              })(o, a, n, i);
            });
          }
          return (n = n ? n.then(i, i) : i());
        };
      }
      function w(e, t) {
        var r = e.iterator[t.method];
        if (void 0 === r) {
          if (((t.delegate = null), "throw" === t.method)) {
            if (
              e.iterator.return &&
              ((t.method = "return"),
              (t.arg = void 0),
              w(e, t),
              "throw" === t.method)
            )
              return f;
            (t.method = "throw"),
              (t.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return f;
        }
        var n = s(r, e.iterator, t.arg);
        if ("throw" === n.type)
          return (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), f;
        var o = n.arg;
        return o
          ? o.done
            ? ((t[e.resultName] = o.value),
              (t.next = e.nextLoc),
              "return" !== t.method && ((t.method = "next"), (t.arg = void 0)),
              (t.delegate = null),
              f)
            : o
          : ((t.method = "throw"),
            (t.arg = new TypeError("iterator result is not an object")),
            (t.delegate = null),
            f);
      }
      function x(e) {
        var t = { tryLoc: e[0] };
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t);
      }
      function O(e) {
        var t = e.completion || {};
        (t.type = "normal"), delete t.arg, (e.completion = t);
      }
      function k(e) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          e.forEach(x, this),
          this.reset(!0);
      }
      function j(e) {
        if (e) {
          var t = e[o];
          if (t) return t.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var n = -1,
              a = function t() {
                for (; ++n < e.length; )
                  if (r.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                return (t.value = void 0), (t.done = !0), t;
              };
            return (a.next = a);
          }
        }
        return { next: L };
      }
      function L() {
        return { value: void 0, done: !0 };
      }
      return (
        (l.prototype = y.constructor = d),
        (d.constructor = l),
        (l.displayName = c(d, i, "GeneratorFunction")),
        (e.isGeneratorFunction = function (e) {
          var t = "function" == typeof e && e.constructor;
          return (
            !!t &&
            (t === l || "GeneratorFunction" === (t.displayName || t.name))
          );
        }),
        (e.mark = function (e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, d)
              : ((e.__proto__ = d), c(e, i, "GeneratorFunction")),
            (e.prototype = Object.create(y)),
            e
          );
        }),
        (e.awrap = function (e) {
          return { __await: e };
        }),
        b(g.prototype),
        (g.prototype[a] = function () {
          return this;
        }),
        (e.AsyncIterator = g),
        (e.async = function (t, r, n, o, a) {
          void 0 === a && (a = Promise);
          var i = new g(u(t, r, n, o), a);
          return e.isGeneratorFunction(r)
            ? i
            : i.next().then(function (e) {
                return e.done ? e.value : i.next();
              });
        }),
        b(y),
        c(y, i, "Generator"),
        (y[o] = function () {
          return this;
        }),
        (y.toString = function () {
          return "[object Generator]";
        }),
        (e.keys = function (e) {
          var t = [];
          for (var r in e) t.push(r);
          return (
            t.reverse(),
            function r() {
              for (; t.length; ) {
                var n = t.pop();
                if (n in e) return (r.value = n), (r.done = !1), r;
              }
              return (r.done = !0), r;
            }
          );
        }),
        (e.values = j),
        (k.prototype = {
          constructor: k,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = void 0),
              this.tryEntries.forEach(O),
              !e)
            )
              for (var t in this)
                "t" === t.charAt(0) &&
                  r.call(this, t) &&
                  !isNaN(+t.slice(1)) &&
                  (this[t] = void 0);
          },
          stop: function () {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ("throw" === e.type) throw e.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var t = this;
            function n(r, n) {
              return (
                (i.type = "throw"),
                (i.arg = e),
                (t.next = r),
                n && ((t.method = "next"), (t.arg = void 0)),
                !!n
              );
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var a = this.tryEntries[o],
                i = a.completion;
              if ("root" === a.tryLoc) return n("end");
              if (a.tryLoc <= this.prev) {
                var c = r.call(a, "catchLoc"),
                  u = r.call(a, "finallyLoc");
                if (c && u) {
                  if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                } else if (c) {
                  if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                } else {
                  if (!u)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var o = this.tryEntries[n];
              if (
                o.tryLoc <= this.prev &&
                r.call(o, "finallyLoc") &&
                this.prev < o.finallyLoc
              ) {
                var a = o;
                break;
              }
            }
            a &&
              ("break" === e || "continue" === e) &&
              a.tryLoc <= t &&
              t <= a.finallyLoc &&
              (a = null);
            var i = a ? a.completion : {};
            return (
              (i.type = e),
              (i.arg = t),
              a
                ? ((this.method = "next"), (this.next = a.finallyLoc), f)
                : this.complete(i)
            );
          },
          complete: function (e, t) {
            if ("throw" === e.type) throw e.arg;
            return (
              "break" === e.type || "continue" === e.type
                ? (this.next = e.arg)
                : "return" === e.type
                ? ((this.rval = this.arg = e.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === e.type && t && (this.next = t),
              f
            );
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];
              if (r.finallyLoc === e)
                return this.complete(r.completion, r.afterLoc), O(r), f;
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];
              if (r.tryLoc === e) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  O(r);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (e, t, r) {
            return (
              (this.delegate = { iterator: j(e), resultName: t, nextLoc: r }),
              "next" === this.method && (this.arg = void 0),
              f
            );
          },
        }),
        e
      );
    })(e.exports);
    try {
      regeneratorRuntime = n;
    } catch (e) {
      Function("r", "regeneratorRuntime = r")(n);
    }
  },
  ,
  ,
  function (e, t, r) {
    var n = r(10);
    e.exports = function (e) {
      if (Array.isArray(e)) return n(e);
    };
  },
  function (e, t) {
    e.exports = function (e) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
        return Array.from(e);
    };
  },
  function (e, t) {
    e.exports = function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    };
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (e, t, r) {
    "use strict";
    r.r(t);
    var n = r(1),
      o = r.n(n),
      a = r(11),
      i = r.n(a),
      c = r(3),
      u = r.n(c),
      s = r(9),
      f = r(4);
    function p(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function l(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? p(Object(r), !0).forEach(function (t) {
              i()(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : p(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    var d = {
      countriesBlacklist: [],
      namesBlacklist: [],
      tagsBlacklist: [],
      employerPropertiesAll: [],
      employerPropertiesOne: [],
      openAttachments: !1,
      resultsPerPage: 20,
      user: "usr_".concat(Math.floor(1e9 * Math.random())),
      firstRegisteredInstallTimestamp: Math.floor(Date.now() / 1e3),
    };
    function h(e) {
      var t = e.responseHeaders,
        r = t.find(function (e) {
          return "content-type" === e.name.toLowerCase();
        });
      if (
        r &&
        [
          "text/plain",
          "text/html",
          "text/css",
          "text/javascript",
          "text/markdown",
          "text/x-c++",
          "image/gif",
          "image/png",
          "image/jpeg",
          "image/bmp",
          "image/webp",
          "image/vnd.microsoft.icon",
          "audio/midi",
          "audio/mpeg",
          "audio/webm",
          "audio/ogg",
          "audio/wav",
          "video/webm",
          "video/ogg",
          "video/mp4",
          "application/xhtml+xml",
          "application/xml",
          "application/pdf",
          "application/json",
          "application/javascript",
        ].includes(r.value.split(";")[0])
      ) {
        var n = t.find(function (e) {
          return "content-disposition" === e.name.toLowerCase();
        });
        if (n) {
          var o = n.value.split(";");
          "attachment" === o[0] && ((o[0] = "inline"), (n.value = o.join(";")));
        }
      }
      return { responseHeaders: t };
    }
    chrome.runtime.onInstalled.addListener(
      (function () {
        var e = u()(
          o.a.mark(function e(t) {
            var r, n;
            return o.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 3), Object(f.a)("config", "sync");
                  case 3:
                    if (((e.t0 = e.sent), e.t0)) {
                      e.next = 6;
                      break;
                    }
                    e.t0 = {};
                  case 6:
                    return (
                      (r = e.t0),
                      (n = l(l({}, d), r)),
                      (e.next = 10),
                      Object(f.c)("config", n, "sync")
                    );
                  case 10:
                    chrome.alarms.create("analyticsAlarm", {
                      when: Date.now() + 1e4,
                      periodInMinutes: 60,
                    }),
                      chrome.alarms.create("userDataAlarm", {
                        when: Date.now() + 36e5,
                        periodInMinutes: 1440,
                      });
                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })()
    ),
      u()(
        o.a.mark(function e() {
          var t;
          return o.a.wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (e.next = 2), Object(f.a)("config", "sync");
                case 2:
                  if (((e.t0 = e.sent), e.t0)) {
                    e.next = 5;
                    break;
                  }
                  e.t0 = {};
                case 5:
                  (t = e.t0) &&
                    t.openAttachments &&
                    (chrome.webRequest.onHeadersReceived.hasListener(h) ||
                      chrome.webRequest.onHeadersReceived.addListener(
                        h,
                        {
                          urls: [
                            "https://www.freelancer.com/fs/download-api.php*",
                          ],
                        },
                        ["blocking", "responseHeaders"]
                      ));
                case 7:
                case "end":
                  return e.stop();
              }
          }, e);
        })
      )(),
      chrome.alarms.onAlarm.addListener(function (e) {
        "analyticsAlarm" === e.name || ("userDataAlarm" === e.name && s.g());
      }),
      chrome.runtime.onMessage.addListener(function (e, t, r) {
        return "openInBrowser" === e.action
          ? (!0 === e.payload
              ? chrome.permissions.request(
                  {
                    permissions: ["webRequest", "webRequestBlocking"],
                    origins: [
                      "https://www.freelancer.com/fs/download-api.php*",
                    ],
                  },
                  function (e) {
                    e
                      ? (chrome.webRequest.onHeadersReceived.hasListener(h) ||
                          chrome.webRequest.onHeadersReceived.addListener(
                            h,
                            {
                              urls: [
                                "https://www.freelancer.com/fs/download-api.php*",
                              ],
                            },
                            ["blocking", "responseHeaders"]
                          ),
                        Object(f.b)({ openAttachments: !0 }).then(function (e) {
                          r({ success: !0 });
                        }))
                      : Object(f.b)({ openAttachments: !1 }).then(function (e) {
                          r({ success: !1 });
                        });
                  }
                )
              : !1 === e.payload &&
                (chrome.webRequest.onHeadersReceived.removeListener(
                  h,
                  { urls: ["https://www.freelancer.com/fs/download-api.php*"] },
                  ["blocking", "responseHeaders"]
                ),
                Object(f.b)({ openAttachments: !1 }).then(function (e) {
                  r({ success: !0 });
                })),
            !0)
          : "loginToServer" === e.action
          ? (s.e(l(l({}, e), {}, { callback: r })), !0)
          : "logoutFromAuth" === e.action
          ? (s.f(l(l({}, e), {}, { callback: r })), !0)
          : "capturePayment" === e.action
          ? (s.b(l(l({}, e), {}, { callback: r })), !0)
          : "getUserData" === e.action
          ? (s.c(l(l({}, e), {}, { callback: r })), !0)
          : "getUserTiers" === e.action
          ? (s.d(l(l({}, e), {}, { callback: r })), !0)
          : void 0;
      });
  },
]);
