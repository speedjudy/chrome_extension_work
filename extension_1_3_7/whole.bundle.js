!(function (t) {
  var e = {};
  function r(n) {
    if (e[n]) return e[n].exports;
    var o = (e[n] = { i: n, l: !1, exports: {} });
    return t[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = t),
    (r.c = e),
    (r.d = function (t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (r.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (r.t = function (t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          r.d(
            n,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return r.d(e, "a", e), e;
    }),
    (r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (r.p = ""),
    r((r.s = 50));
})([
  ,
  function (t, e, r) {
    t.exports = r(16);
  },
  ,
  function (t, e) {
    function r(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (t) {
        return void r(t);
      }
      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }
    t.exports = function (t) {
      return function () {
        var e = this,
          n = arguments;
        return new Promise(function (o, i) {
          var a = t.apply(e, n);
          function c(t) {
            r(a, o, i, c, u, "next", t);
          }
          function u(t) {
            r(a, o, i, c, u, "throw", t);
          }
          c(void 0);
        });
      };
    };
  },
  function (t, e, r) {
    "use strict";
    r.d(e, "d", function () {
      return c;
    }),
      r.d(e, "a", function () {
        return u;
      }),
      r.d(e, "c", function () {
        return s;
      }),
      r.d(e, "b", function () {
        return l;
      });
    var n = r(1),
      o = r.n(n),
      i = r(3),
      a = r.n(i);
    r(12);
    function c(t) {
      return new Promise(function (e, r) {
        chrome.runtime.sendMessage(t, e);
      });
    }
    function u(t) {
      var e =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : "local";
      return new Promise(function (r, n) {
        chrome.storage[e].get(t, function (e) {
          r(e && e[t]);
        });
      });
    }
    function s(t, e) {
      var r =
        arguments.length > 2 && void 0 !== arguments[2]
          ? arguments[2]
          : "local";
      return new Promise(function (n, o) {
        var i = {};
        (i[t] = e), chrome.storage[r].set(i, n);
      });
    }
    function l(t) {
      return f.apply(this, arguments);
    }
    function f() {
      return (f = a()(
        o.a.mark(function t(e) {
          var r, n;
          return o.a.wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (t.next = 2), u("config", "sync");
                case 2:
                  if (((t.t0 = t.sent), t.t0)) {
                    t.next = 5;
                    break;
                  }
                  t.t0 = {};
                case 5:
                  return (
                    (r = t.t0),
                    (n = Object.assign({}, r, e)),
                    (t.next = 9),
                    s("config", n, "sync")
                  );
                case 9:
                  return t.abrupt("return", n);
                case 10:
                case "end":
                  return t.stop();
              }
          }, t);
        })
      )).apply(this, arguments);
    }
  },
  ,
  function (t, e, r) {
    var n = r(24),
      o = r(25),
      i = r(13),
      a = r(26);
    t.exports = function (t, e) {
      return n(t) || o(t, e) || i(t, e) || a();
    };
  },
  ,
  ,
  ,
  function (t, e) {
    t.exports = function (t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
      return n;
    };
  },
  function (t, e) {
    t.exports = function (t, e, r) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = r),
        t
      );
    };
  },
  function (t, e, r) {
    var n = r(19),
      o = r(20),
      i = r(13),
      a = r(21);
    t.exports = function (t) {
      return n(t) || o(t) || i(t) || a();
    };
  },
  function (t, e, r) {
    var n = r(10);
    t.exports = function (t, e) {
      if (t) {
        if ("string" == typeof t) return n(t, e);
        var r = Object.prototype.toString.call(t).slice(8, -1);
        return (
          "Object" === r && t.constructor && (r = t.constructor.name),
          "Map" === r || "Set" === r
            ? Array.from(t)
            : "Arguments" === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            ? n(t, e)
            : void 0
        );
      }
    };
  },
  ,
  ,
  function (t, e, r) {
    var n = (function (t) {
      "use strict";
      var e = Object.prototype,
        r = e.hasOwnProperty,
        n = "function" == typeof Symbol ? Symbol : {},
        o = n.iterator || "@@iterator",
        i = n.asyncIterator || "@@asyncIterator",
        a = n.toStringTag || "@@toStringTag";
      function c(t, e, r) {
        return (
          Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        c({}, "");
      } catch (t) {
        c = function (t, e, r) {
          return (t[e] = r);
        };
      }
      function u(t, e, r, n) {
        var o = e && e.prototype instanceof f ? e : f,
          i = Object.create(o.prototype),
          a = new O(n || []);
        return (
          (i._invoke = (function (t, e, r) {
            var n = "suspendedStart";
            return function (o, i) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === o) throw i;
                return E();
              }
              for (r.method = o, r.arg = i; ; ) {
                var a = r.delegate;
                if (a) {
                  var c = b(a, r);
                  if (c) {
                    if (c === l) continue;
                    return c;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = s(t, e, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === l)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          })(t, r, a)),
          i
        );
      }
      function s(t, e, r) {
        try {
          return { type: "normal", arg: t.call(e, r) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      t.wrap = u;
      var l = {};
      function f() {}
      function p() {}
      function h() {}
      var d = {};
      d[o] = function () {
        return this;
      };
      var y = Object.getPrototypeOf,
        m = y && y(y(_([])));
      m && m !== e && r.call(m, o) && (d = m);
      var v = (h.prototype = f.prototype = Object.create(d));
      function g(t) {
        ["next", "throw", "return"].forEach(function (e) {
          c(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function w(t, e) {
        var n;
        this._invoke = function (o, i) {
          function a() {
            return new e(function (n, a) {
              !(function n(o, i, a, c) {
                var u = s(t[o], t, i);
                if ("throw" !== u.type) {
                  var l = u.arg,
                    f = l.value;
                  return f && "object" == typeof f && r.call(f, "__await")
                    ? e.resolve(f.__await).then(
                        function (t) {
                          n("next", t, a, c);
                        },
                        function (t) {
                          n("throw", t, a, c);
                        }
                      )
                    : e.resolve(f).then(
                        function (t) {
                          (l.value = t), a(l);
                        },
                        function (t) {
                          return n("throw", t, a, c);
                        }
                      );
                }
                c(u.arg);
              })(o, i, n, a);
            });
          }
          return (n = n ? n.then(a, a) : a());
        };
      }
      function b(t, e) {
        var r = t.iterator[e.method];
        if (void 0 === r) {
          if (((e.delegate = null), "throw" === e.method)) {
            if (
              t.iterator.return &&
              ((e.method = "return"),
              (e.arg = void 0),
              b(t, e),
              "throw" === e.method)
            )
              return l;
            (e.method = "throw"),
              (e.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return l;
        }
        var n = s(r, t.iterator, e.arg);
        if ("throw" === n.type)
          return (e.method = "throw"), (e.arg = n.arg), (e.delegate = null), l;
        var o = n.arg;
        return o
          ? o.done
            ? ((e[t.resultName] = o.value),
              (e.next = t.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = void 0)),
              (e.delegate = null),
              l)
            : o
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            l);
      }
      function j(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function x(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function O(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(j, this),
          this.reset(!0);
      }
      function _(t) {
        if (t) {
          var e = t[o];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var n = -1,
              i = function e() {
                for (; ++n < t.length; )
                  if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
                return (e.value = void 0), (e.done = !0), e;
              };
            return (i.next = i);
          }
        }
        return { next: E };
      }
      function E() {
        return { value: void 0, done: !0 };
      }
      return (
        (p.prototype = v.constructor = h),
        (h.constructor = p),
        (p.displayName = c(h, a, "GeneratorFunction")),
        (t.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === p || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (t.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, h)
              : ((t.__proto__ = h), c(t, a, "GeneratorFunction")),
            (t.prototype = Object.create(v)),
            t
          );
        }),
        (t.awrap = function (t) {
          return { __await: t };
        }),
        g(w.prototype),
        (w.prototype[i] = function () {
          return this;
        }),
        (t.AsyncIterator = w),
        (t.async = function (e, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new w(u(e, r, n, o), i);
          return t.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        g(v),
        c(v, a, "Generator"),
        (v[o] = function () {
          return this;
        }),
        (v.toString = function () {
          return "[object Generator]";
        }),
        (t.keys = function (t) {
          var e = [];
          for (var r in t) e.push(r);
          return (
            e.reverse(),
            function r() {
              for (; e.length; ) {
                var n = e.pop();
                if (n in t) return (r.value = n), (r.done = !1), r;
              }
              return (r.done = !0), r;
            }
          );
        }),
        (t.values = _),
        (O.prototype = {
          constructor: O,
          reset: function (t) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = void 0),
              this.tryEntries.forEach(x),
              !t)
            )
              for (var e in this)
                "t" === e.charAt(0) &&
                  r.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = void 0);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (t) {
            if (this.done) throw t;
            var e = this;
            function n(r, n) {
              return (
                (a.type = "throw"),
                (a.arg = t),
                (e.next = r),
                n && ((e.method = "next"), (e.arg = void 0)),
                !!n
              );
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var i = this.tryEntries[o],
                a = i.completion;
              if ("root" === i.tryLoc) return n("end");
              if (i.tryLoc <= this.prev) {
                var c = r.call(i, "catchLoc"),
                  u = r.call(i, "finallyLoc");
                if (c && u) {
                  if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                  if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                } else if (c) {
                  if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                } else {
                  if (!u)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var o = this.tryEntries[n];
              if (
                o.tryLoc <= this.prev &&
                r.call(o, "finallyLoc") &&
                this.prev < o.finallyLoc
              ) {
                var i = o;
                break;
              }
            }
            i &&
              ("break" === t || "continue" === t) &&
              i.tryLoc <= e &&
              e <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), l)
                : this.complete(a)
            );
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && e && (this.next = e),
              l
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t)
                return this.complete(r.completion, r.afterLoc), x(r), l;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.tryLoc === t) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  x(r);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (t, e, r) {
            return (
              (this.delegate = { iterator: _(t), resultName: e, nextLoc: r }),
              "next" === this.method && (this.arg = void 0),
              l
            );
          },
        }),
        t
      );
    })(t.exports);
    try {
      regeneratorRuntime = n;
    } catch (t) {
      Function("r", "regeneratorRuntime = r")(n);
    }
  },
  ,
  ,
  function (t, e, r) {
    var n = r(10);
    t.exports = function (t) {
      if (Array.isArray(t)) return n(t);
    };
  },
  function (t, e) {
    t.exports = function (t) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
        return Array.from(t);
    };
  },
  function (t, e) {
    t.exports = function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    };
  },
  ,
  ,
  function (t, e) {
    t.exports = function (t) {
      if (Array.isArray(t)) return t;
    };
  },
  function (t, e) {
    t.exports = function (t, e) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
        var r = [],
          n = !0,
          o = !1,
          i = void 0;
        try {
          for (
            var a, c = t[Symbol.iterator]();
            !(n = (a = c.next()).done) &&
            (r.push(a.value), !e || r.length !== e);
            n = !0
          );
        } catch (t) {
          (o = !0), (i = t);
        } finally {
          try {
            n || null == c.return || c.return();
          } finally {
            if (o) throw i;
          }
        }
        return r;
      }
    };
  },
  function (t, e) {
    t.exports = function () {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
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
  function (t, e, r) {
    "use strict";
    r.r(e);
    var n = r(6),
      o = r.n(n),
      i = r(1),
      a = r.n(i),
      c = r(11),
      u = r.n(c),
      s = r(3),
      l = r.n(s),
      f = r(4);
    function p(t, e) {
      var r = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function h(t) {
      for (var e = 1; e < arguments.length; e++) {
        var r = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? p(Object(r), !0).forEach(function (e) {
              u()(t, e, r[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
          : p(Object(r)).forEach(function (e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(r, e)
              );
            });
      }
      return t;
    }
    function d() {
      var t, e, r, n;
      function o(t) {
        return new Promise(function (e, r) {
          fetch(
            "https://www.freelancer.com/ajax/reputation-employer-on-hover-content.php?user_id=".concat(
              t
            )
          )
            .then(function (t) {
              return t.json();
            })
            .then(function (t) {
              var n = {
                name: t.profile.name,
                logo: t.profile.logo,
                past_projects: t.rep.entire_history.totalCompleted,
                completed_projects: t.rep.entire_history.count_all_project,
              };
              t ? e(n) : r("no employer details found");
            })
            .catch(function (t) {
              r(t);
            });
        });
      }
      function i() {
        var e,
          r = document.createElement("div");
        if (
          ((r.id = "freelancer-helper-details"),
          "2" === "2")
        ) {
          var n;
          t.logo &&
            (((n = new window.Image()).width = 50),
            (n.style.marginRight = "10px"),
            (n.src = t.logo));
          var o = document.createElement("a");
          (o.textContent = t.name),
            (o.href = "https://www.freelancer.com/u/".concat(t.name, "?w=f")),
            (o.target = "_blank");
          var i = t.past_projects / t.completed_projects,
            c =
              i > 4
                ? 5
                : i > 3
                ? 4
                : i > 2
                ? 3
                : i > 1.5
                ? 2
                : isNaN(i)
                ? 0
                : 1,
            u = [
              {
                color: "#a1c4c3",
                title: "This is a new employer. Proceed with caution.",
              },
              {
                color: "green",
                title:
                  "Amazing employer. Very high chance of awarding the project. Make sure to write a convincing bid - it will pay off.",
              },
              {
                color: "blue",
                title:
                  "Great employer. Very likely will award someone. Write a good bid.",
              },
              { color: "#c7c70a", title: "Medium chance of awarding." },
              {
                color: "purple",
                title:
                  "Low chance of employer awarding the project. Only bid if project is very interesting.",
              },
              {
                color: "red",
                title:
                  "Employer has poor track record of awarding projects. Best look for another project to bid on.",
              },
            ],
            s = '<span title="'
              .concat(t.past_projects, ' projects opened">')
              .concat(t.past_projects, '</span> / <span title="')
              .concat(Number(t.completed_projects), ' projects awarded">')
              .concat(Number(t.completed_projects), "</span> = "),
            l = "".concat(isNaN(i) ? "New" : i.toFixed(1)),
            f = document.createElement("p");
          (f.style.marginTop = "10px"),
            (f.style.fontWeight = "900"),
            (f.innerHTML = s),
            (f.style.cursor = "help");
          var p = document.createElement("span");
          f.appendChild(p),
            (p.style.color = u[c].color),
            (p.style.fontSize = "1.2em"),
            (p.textContent = l),
            (p.title = u[c].title),
            r.appendChild(n),
            r.appendChild(o),
            r.appendChild(f);
        } else {
          var h = document.createElement("a");
          (h.textContent = t.name),
            (h.href = "https://www.freelancer.com/u/".concat(t.name, "?w=f")),
            (h.target = "_blank"),
            r.appendChild(h);
        }
        ((e = performance.now()),
        new Promise(function (t, r) {
          var n = setInterval(function () {
            if (performance.now() - e > 1e4)
              clearInterval(n), r("target parent not found");
            else {
              var o = document.querySelector("app-employer-info fl-list-item");
              o && (clearInterval(n), t(o));
            }
          }, 50);
        })).then(function (t) {
          var e = a();
          e && e.remove(), t.appendChild(r);
        });
      }
      function a() {
        return document.getElementById("freelancer-helper-details");
      }
      function c(t) {
        return (
          config.countriesBlacklist.includes(t.location.country.name) ||
          config.namesBlacklist.includes(t.username) ||
          config.employerPropertiesAll.some(function (e) {
            return !t.status[e];
          }) ||
          (0 != config.employerPropertiesOne.length &&
            !config.employerPropertiesOne.some(function (e) {
              return t.status[e];
            }))
        );
      }
      function u(t) {
        return t.jobs.some(function (t) {
          return config.tagsBlacklist.includes(t.name);
        });
      }
      (e = XMLHttpRequest.prototype),
        (r = null),
        (n = e.open),
        (e.open = function (e, a) {
          var s = "/api/projects/0.1/projects/active",
            l = "https://www.freelancer.com/api/projects/0.1/projects?",
            f = arguments;
          if (a.includes(l) && a.includes("full_description=true"))
            this.addEventListener("load", function (e) {
              o(JSON.parse(this.response).result.projects[0].owner_id)
                .then(function (e) {
                  (t = e), i();
                })
                .catch(function (t) {});
            });
          else if (
            (2 === 2) &&
            a.includes(s)
          ) {
            var p = parseInt(config.resultsPerPage) || 20,
              h = new URL(a, "https://www.freelancer.com"),
              d = h.searchParams,
              y = d.get("offset"),
              m = parseInt(y) / 10 + 1;
            d.set("limit", p);
            var v = (m - 1) * p;
            1 !== m && r && r <= v && (v = r - 1),
              d.set("offset", v),
              !d.has("user_status") &&
                (d.set("compact", "true"),
                d.set("user_details", "true"),
                d.set("user_status", "true")),
              ((f = Array.prototype.slice.call(arguments))[1] = h.href),
              this.addEventListener("load", function (t) {
                var e = JSON.parse(this.response),
                  n = e.result.users,
                  o = e.result.projects.filter(function (t) {
                    var e = n[t.owner_id],
                      r = !u(t) && !c(e);
                    return r;
                  });
                e.result.projects = o;
                var i = JSON.stringify(e);
                Object.defineProperty(this, "response", {
                  get: function () {
                    return i;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                  (r = e.result.total_count),
                  window.setTimeout(function () {
                    return window.postMessage(
                      { action: "addCountryFlags", data: e.result },
                      "*"
                    );
                  }, 500);
              });
          }
          return n.apply(this, f);
        }),
        window.setInterval(function () {
          t &&
            !a() &&
            document.querySelector("app-employer-info fl-list-item") &&
            i();
        }, 1e3);
    }
    function y() {
      return (y = l()(
        a.a.mark(function t(e) {
          var r, n, o, i, c, u;
          return a.a.wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (
                    (t.next = 2),
                    fetch(chrome.runtime.getURL("public/country_to_code.json"))
                  );
                case 2:
                  return (r = t.sent), (t.next = 5), r.json();
                case 5:
                  (n = t.sent),
                    (o = h({}, e)),
                    (i = o.projects),
                    (c = o.users),
                    (u = document.querySelectorAll(
                      ".ProjectFooter, .search-result-item .info-card-details--hasTooltip"
                    )),
                    i.forEach(function (t, e) {
                      var r = u[e];
                      r.querySelector(".fh-flag-image") &&
                        r.querySelector(".fh-flag-image").remove();
                      var o = c[t.owner_id],
                        i = new window.Image(),
                        a = o.location.country.name,
                        s = n[a] || o.timezone.country;
                      s &&
                        ((i.src =
                          "https://www.f-cdn.com/assets/main/en/assets/flags/".concat(
                            s.toLowerCase(),
                            ".svg"
                          )),
                        (i.title = a),
                        i.classList.add("fh-flag-image"),
                        (i.width = "20"),
                        (i.style.marginRight = "8px"),
                        r.prepend(i));
                    });
                case 9:
                case "end":
                  return t.stop();
              }
          }, t);
        })
      )).apply(this, arguments);
    }
    function m(t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = document.createElement("script");
      (r.text = '(function(){const tier = "'
        .concat(e.tier, '"; const config=')
        .concat(JSON.stringify(e.config), ";(")
        .concat(t.toString(), ")()})();")),
        document.documentElement.appendChild(r);
    }
    function v() {
      return (v = l()(
        a.a.mark(function t() {
          var e, r, n, i;
          return a.a.wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (
                    (t.next = 2),
                    Promise.all([
                      Object(f.a)("config", "sync"),
                      Object(f.d)({ action: "getUserTiers" }),
                    ])
                  );
                case 2:
                  (e = t.sent),
                    (r = o()(e, 2)),
                    (n = r[0]),
                    (i = r[1]),
                    m(d, { config: n, tier: i.actual });
                case 7:
                case "end":
                  return t.stop();
              }
          }, t);
        })
      )).apply(this, arguments);
    }
    window.addEventListener("message", function (t) {
      var e = t.data;
      "addCountryFlags" === e.action &&
        (function (t) {
          y.apply(this, arguments);
        })(e.data);
    }),
      (function () {
        v.apply(this, arguments);
      })();
  },
]);
