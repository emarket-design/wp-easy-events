!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : (e.CodeMirror = t());
})(this, function () {
    "use strict";
    function e(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
    }
    function t(e) {
        for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
        return e;
    }
    function n(e, n) {
        return t(e).appendChild(n);
    }
    function r(e, t, n, r) {
        var i = document.createElement(e);
        if ((n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t)) i.appendChild(document.createTextNode(t));
        else if (t) for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
        return i;
    }
    function i(e, t, n, i) {
        var o = r(e, t, n, i);
        return o.setAttribute("role", "presentation"), o;
    }
    function o(e, t) {
        if ((3 == t.nodeType && (t = t.parentNode), e.contains)) return e.contains(t);
        do {
            if ((11 == t.nodeType && (t = t.host), t == e)) return !0;
        } while ((t = t.parentNode));
    }
    function l() {
        var e;
        try {
            e = document.activeElement;
        } catch (t) {
            e = document.body || null;
        }
        for (; e && e.shadowRoot && e.shadowRoot.activeElement; ) e = e.shadowRoot.activeElement;
        return e;
    }
    function s(t, n) {
        var r = t.className;
        e(n).test(r) || (t.className += (r ? " " : "") + n);
    }
    function a(t, n) {
        for (var r = t.split(" "), i = 0; i < r.length; i++) r[i] && !e(r[i]).test(n) && (n += " " + r[i]);
        return n;
    }
    function u(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function () {
            return e.apply(null, t);
        };
    }
    function c(e, t, n) {
        t || (t = {});
        for (var r in e) !e.hasOwnProperty(r) || (!1 === n && t.hasOwnProperty(r)) || (t[r] = e[r]);
        return t;
    }
    function h(e, t, n, r, i) {
        null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
        for (var o = r || 0, l = i || 0; ; ) {
            var s = e.indexOf("\t", o);
            if (s < 0 || s >= t) return l + (t - o);
            (l += s - o), (l += n - (l % n)), (o = s + 1);
        }
    }
    function f(e, t) {
        for (var n = 0; n < e.length; ++n) if (e[n] == t) return n;
        return -1;
    }
    function d(e, t, n) {
        for (var r = 0, i = 0; ; ) {
            var o = e.indexOf("\t", r);
            -1 == o && (o = e.length);
            var l = o - r;
            if (o == e.length || i + l >= t) return r + Math.min(l, t - i);
            if (((i += o - r), (i += n - (i % n)), (r = o + 1), i >= t)) return r;
        }
    }
    function p(e) {
        for (; Rl.length <= e; ) Rl.push(g(Rl) + " ");
        return Rl[e];
    }
    function g(e) {
        return e[e.length - 1];
    }
    function v(e, t) {
        for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r);
        return n;
    }
    function m(e, t, n) {
        for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i; ) r++;
        e.splice(r, 0, t);
    }
    function y() {}
    function b(e, t) {
        var n;
        return Object.create ? (n = Object.create(e)) : ((y.prototype = e), (n = new y())), t && c(t, n), n;
    }
    function w(e) {
        return /\w/.test(e) || (e > "" && (e.toUpperCase() != e.toLowerCase() || zl.test(e)));
    }
    function x(e, t) {
        return t ? !!(t.source.indexOf("\\w") > -1 && w(e)) || t.test(e) : w(e);
    }
    function C(e) {
        for (var t in e) if (e.hasOwnProperty(t) && e[t]) return !1;
        return !0;
    }
    function S(e) {
        return e.charCodeAt(0) >= 768 && Bl.test(e);
    }
    function L(e, t, n) {
        for (; (n < 0 ? t > 0 : t < e.length) && S(e.charAt(t)); ) t += n;
        return t;
    }
    function k(e, t, n) {
        for (;;) {
            if (Math.abs(t - n) <= 1) return e(t) ? t : n;
            var r = Math.floor((t + n) / 2);
            e(r) ? (n = r) : (t = r);
        }
    }
    function M(e, t, n) {
        var o = this;
        (this.input = n),
            (o.scrollbarFiller = r("div", null, "CodeMirror-scrollbar-filler")),
            o.scrollbarFiller.setAttribute("cm-not-content", "true"),
            (o.gutterFiller = r("div", null, "CodeMirror-gutter-filler")),
            o.gutterFiller.setAttribute("cm-not-content", "true"),
            (o.lineDiv = i("div", null, "CodeMirror-code")),
            (o.selectionDiv = r("div", null, null, "position: relative; z-index: 1")),
            (o.cursorDiv = r("div", null, "CodeMirror-cursors")),
            (o.measure = r("div", null, "CodeMirror-measure")),
            (o.lineMeasure = r("div", null, "CodeMirror-measure")),
            (o.lineSpace = i("div", [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv], null, "position: relative; outline: none"));
        var l = i("div", [o.lineSpace], "CodeMirror-lines");
        (o.mover = r("div", [l], null, "position: relative")),
            (o.sizer = r("div", [o.mover], "CodeMirror-sizer")),
            (o.sizerWidth = null),
            (o.heightForcer = r("div", null, null, "position: absolute; height: " + Hl + "px; width: 1px;")),
            (o.gutters = r("div", null, "CodeMirror-gutters")),
            (o.lineGutter = null),
            (o.scroller = r("div", [o.sizer, o.heightForcer, o.gutters], "CodeMirror-scroll")),
            o.scroller.setAttribute("tabIndex", "-1"),
            (o.wrapper = r("div", [o.scrollbarFiller, o.gutterFiller, o.scroller], "CodeMirror")),
            ul && cl < 8 && ((o.gutters.style.zIndex = -1), (o.scroller.style.paddingRight = 0)),
            hl || (ol && wl) || (o.scroller.draggable = !0),
            e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)),
            (o.viewFrom = o.viewTo = t.first),
            (o.reportedViewFrom = o.reportedViewTo = t.first),
            (o.view = []),
            (o.renderedView = null),
            (o.externalMeasured = null),
            (o.viewOffset = 0),
            (o.lastWrapHeight = o.lastWrapWidth = 0),
            (o.updateLineNumbers = null),
            (o.nativeBarWidth = o.barHeight = o.barWidth = 0),
            (o.scrollbarsClipped = !1),
            (o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null),
            (o.alignWidgets = !1),
            (o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null),
            (o.maxLine = null),
            (o.maxLineLength = 0),
            (o.maxLineChanged = !1),
            (o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null),
            (o.shift = !1),
            (o.selForContextMenu = null),
            (o.activeTouch = null),
            n.init(o);
    }
    function T(e, t) {
        if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var n = e; !n.lines; )
            for (var r = 0; ; ++r) {
                var i = n.children[r],
                    o = i.chunkSize();
                if (t < o) {
                    n = i;
                    break;
                }
                t -= o;
            }
        return n.lines[t];
    }
    function N(e, t, n) {
        var r = [],
            i = t.line;
        return (
            e.iter(t.line, n.line + 1, function (e) {
                var o = e.text;
                i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), ++i;
            }),
            r
        );
    }
    function O(e, t, n) {
        var r = [];
        return (
            e.iter(t, n, function (e) {
                r.push(e.text);
            }),
            r
        );
    }
    function A(e, t) {
        var n = t - e.height;
        if (n) for (var r = e; r; r = r.parent) r.height += n;
    }
    function W(e) {
        if (null == e.parent) return null;
        for (var t = e.parent, n = f(t.lines, e), r = t.parent; r; t = r, r = r.parent) for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize();
        return n + t.first;
    }
    function D(e, t) {
        var n = e.first;
        e: do {
            for (var r = 0; r < e.children.length; ++r) {
                var i = e.children[r],
                    o = i.height;
                if (t < o) {
                    e = i;
                    continue e;
                }
                (t -= o), (n += i.chunkSize());
            }
            return n;
        } while (!e.lines);
        for (var l = 0; l < e.lines.length; ++l) {
            var s = e.lines[l].height;
            if (t < s) break;
            t -= s;
        }
        return n + l;
    }
    function H(e, t) {
        return t >= e.first && t < e.first + e.size;
    }
    function F(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber));
    }
    function E(e, t, n) {
        if ((void 0 === n && (n = null), !(this instanceof E))) return new E(e, t, n);
        (this.line = e), (this.ch = t), (this.sticky = n);
    }
    function P(e, t) {
        return e.line - t.line || e.ch - t.ch;
    }
    function I(e, t) {
        return e.sticky == t.sticky && 0 == P(e, t);
    }
    function R(e) {
        return E(e.line, e.ch);
    }
    function z(e, t) {
        return P(e, t) < 0 ? t : e;
    }
    function B(e, t) {
        return P(e, t) < 0 ? e : t;
    }
    function G(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1));
    }
    function U(e, t) {
        if (t.line < e.first) return E(e.first, 0);
        var n = e.first + e.size - 1;
        return t.line > n ? E(n, T(e, n).text.length) : V(t, T(e, t.line).text.length);
    }
    function V(e, t) {
        var n = e.ch;
        return null == n || n > t ? E(e.line, t) : n < 0 ? E(e.line, 0) : e;
    }
    function K(e, t) {
        for (var n = [], r = 0; r < t.length; r++) n[r] = U(e, t[r]);
        return n;
    }
    function j() {
        Gl = !0;
    }
    function X() {
        Ul = !0;
    }
    function Y(e, t, n) {
        (this.marker = e), (this.from = t), (this.to = n);
    }
    function _(e, t) {
        if (e)
            for (var n = 0; n < e.length; ++n) {
                var r = e[n];
                if (r.marker == t) return r;
            }
    }
    function $(e, t) {
        for (var n, r = 0; r < e.length; ++r) e[r] != t && (n || (n = [])).push(e[r]);
        return n;
    }
    function q(e, t) {
        (e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t]), t.marker.attachLine(e);
    }
    function Z(e, t, n) {
        var r;
        if (e)
            for (var i = 0; i < e.length; ++i) {
                var o = e[i],
                    l = o.marker;
                if (null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t) || (o.from == t && "bookmark" == l.type && (!n || !o.marker.insertLeft))) {
                    var s = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                    (r || (r = [])).push(new Y(l, o.from, s ? null : o.to));
                }
            }
        return r;
    }
    function Q(e, t, n) {
        var r;
        if (e)
            for (var i = 0; i < e.length; ++i) {
                var o = e[i],
                    l = o.marker;
                if (null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t) || (o.from == t && "bookmark" == l.type && (!n || o.marker.insertLeft))) {
                    var s = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                    (r || (r = [])).push(new Y(l, s ? null : o.from - t, null == o.to ? null : o.to - t));
                }
            }
        return r;
    }
    function J(e, t) {
        if (t.full) return null;
        var n = H(e, t.from.line) && T(e, t.from.line).markedSpans,
            r = H(e, t.to.line) && T(e, t.to.line).markedSpans;
        if (!n && !r) return null;
        var i = t.from.ch,
            o = t.to.ch,
            l = 0 == P(t.from, t.to),
            s = Z(n, i, l),
            a = Q(r, o, l),
            u = 1 == t.text.length,
            c = g(t.text).length + (u ? i : 0);
        if (s)
            for (var h = 0; h < s.length; ++h) {
                var f = s[h];
                if (null == f.to) {
                    var d = _(a, f.marker);
                    d ? u && (f.to = null == d.to ? null : d.to + c) : (f.to = i);
                }
            }
        if (a)
            for (var p = 0; p < a.length; ++p) {
                var v = a[p];
                null != v.to && (v.to += c), null == v.from ? _(s, v.marker) || ((v.from = c), u && (s || (s = [])).push(v)) : ((v.from += c), u && (s || (s = [])).push(v));
            }
        s && (s = ee(s)), a && a != s && (a = ee(a));
        var m = [s];
        if (!u) {
            var y,
                b = t.text.length - 2;
            if (b > 0 && s) for (var w = 0; w < s.length; ++w) null == s[w].to && (y || (y = [])).push(new Y(s[w].marker, null, null));
            for (var x = 0; x < b; ++x) m.push(y);
            m.push(a);
        }
        return m;
    }
    function ee(e) {
        for (var t = 0; t < e.length; ++t) {
            var n = e[t];
            null != n.from && n.from == n.to && !1 !== n.marker.clearWhenEmpty && e.splice(t--, 1);
        }
        return e.length ? e : null;
    }
    function te(e, t, n) {
        var r = null;
        if (
            (e.iter(t.line, n.line + 1, function (e) {
                if (e.markedSpans)
                    for (var t = 0; t < e.markedSpans.length; ++t) {
                        var n = e.markedSpans[t].marker;
                        !n.readOnly || (r && -1 != f(r, n)) || (r || (r = [])).push(n);
                    }
            }),
            !r)
        )
            return null;
        for (var i = [{ from: t, to: n }], o = 0; o < r.length; ++o)
            for (var l = r[o], s = l.find(0), a = 0; a < i.length; ++a) {
                var u = i[a];
                if (!(P(u.to, s.from) < 0 || P(u.from, s.to) > 0)) {
                    var c = [a, 1],
                        h = P(u.from, s.from),
                        d = P(u.to, s.to);
                    (h < 0 || (!l.inclusiveLeft && !h)) && c.push({ from: u.from, to: s.from }), (d > 0 || (!l.inclusiveRight && !d)) && c.push({ from: s.to, to: u.to }), i.splice.apply(i, c), (a += c.length - 3);
                }
            }
        return i;
    }
    function ne(e) {
        var t = e.markedSpans;
        if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
            e.markedSpans = null;
        }
    }
    function re(e, t) {
        if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
            e.markedSpans = t;
        }
    }
    function ie(e) {
        return e.inclusiveLeft ? -1 : 0;
    }
    function oe(e) {
        return e.inclusiveRight ? 1 : 0;
    }
    function le(e, t) {
        var n = e.lines.length - t.lines.length;
        if (0 != n) return n;
        var r = e.find(),
            i = t.find(),
            o = P(r.from, i.from) || ie(e) - ie(t);
        if (o) return -o;
        var l = P(r.to, i.to) || oe(e) - oe(t);
        return l || t.id - e.id;
    }
    function se(e, t) {
        var n,
            r = Ul && e.markedSpans;
        if (r) for (var i = void 0, o = 0; o < r.length; ++o) (i = r[o]).marker.collapsed && null == (t ? i.from : i.to) && (!n || le(n, i.marker) < 0) && (n = i.marker);
        return n;
    }
    function ae(e) {
        return se(e, !0);
    }
    function ue(e) {
        return se(e, !1);
    }
    function ce(e, t, n, r, i) {
        var o = T(e, t),
            l = Ul && o.markedSpans;
        if (l)
            for (var s = 0; s < l.length; ++s) {
                var a = l[s];
                if (a.marker.collapsed) {
                    var u = a.marker.find(0),
                        c = P(u.from, n) || ie(a.marker) - ie(i),
                        h = P(u.to, r) || oe(a.marker) - oe(i);
                    if (
                        !((c >= 0 && h <= 0) || (c <= 0 && h >= 0)) &&
                        ((c <= 0 && (a.marker.inclusiveRight && i.inclusiveLeft ? P(u.to, n) >= 0 : P(u.to, n) > 0)) || (c >= 0 && (a.marker.inclusiveRight && i.inclusiveLeft ? P(u.from, r) <= 0 : P(u.from, r) < 0)))
                    )
                        return !0;
                }
            }
    }
    function he(e) {
        for (var t; (t = ae(e)); ) e = t.find(-1, !0).line;
        return e;
    }
    function fe(e) {
        for (var t; (t = ue(e)); ) e = t.find(1, !0).line;
        return e;
    }
    function de(e) {
        for (var t, n; (t = ue(e)); ) (e = t.find(1, !0).line), (n || (n = [])).push(e);
        return n;
    }
    function pe(e, t) {
        var n = T(e, t),
            r = he(n);
        return n == r ? t : W(r);
    }
    function ge(e, t) {
        if (t > e.lastLine()) return t;
        var n,
            r = T(e, t);
        if (!ve(e, r)) return t;
        for (; (n = ue(r)); ) r = n.find(1, !0).line;
        return W(r) + 1;
    }
    function ve(e, t) {
        var n = Ul && t.markedSpans;
        if (n)
            for (var r = void 0, i = 0; i < n.length; ++i)
                if ((r = n[i]).marker.collapsed) {
                    if (null == r.from) return !0;
                    if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && me(e, t, r)) return !0;
                }
    }
    function me(e, t, n) {
        if (null == n.to) {
            var r = n.marker.find(1, !0);
            return me(e, r.line, _(r.line.markedSpans, n.marker));
        }
        if (n.marker.inclusiveRight && n.to == t.text.length) return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
            if ((i = t.markedSpans[o]).marker.collapsed && !i.marker.widgetNode && i.from == n.to && (null == i.to || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && me(e, t, i)) return !0;
    }
    function ye(e) {
        for (var t = 0, n = (e = he(e)).parent, r = 0; r < n.lines.length; ++r) {
            var i = n.lines[r];
            if (i == e) break;
            t += i.height;
        }
        for (var o = n.parent; o; n = o, o = n.parent)
            for (var l = 0; l < o.children.length; ++l) {
                var s = o.children[l];
                if (s == n) break;
                t += s.height;
            }
        return t;
    }
    function be(e) {
        if (0 == e.height) return 0;
        for (var t, n = e.text.length, r = e; (t = ae(r)); ) {
            var i = t.find(0, !0);
            (r = i.from.line), (n += i.from.ch - i.to.ch);
        }
        for (r = e; (t = ue(r)); ) {
            var o = t.find(0, !0);
            (n -= r.text.length - o.from.ch), (n += (r = o.to.line).text.length - o.to.ch);
        }
        return n;
    }
    function we(e) {
        var t = e.display,
            n = e.doc;
        (t.maxLine = T(n, n.first)),
            (t.maxLineLength = be(t.maxLine)),
            (t.maxLineChanged = !0),
            n.iter(function (e) {
                var n = be(e);
                n > t.maxLineLength && ((t.maxLineLength = n), (t.maxLine = e));
            });
    }
    function xe(e, t, n, r) {
        if (!e) return r(t, n, "ltr");
        for (var i = !1, o = 0; o < e.length; ++o) {
            var l = e[o];
            ((l.from < n && l.to > t) || (t == n && l.to == t)) && (r(Math.max(l.from, t), Math.min(l.to, n), 1 == l.level ? "rtl" : "ltr"), (i = !0));
        }
        i || r(t, n, "ltr");
    }
    function Ce(e, t, n) {
        var r;
        Vl = null;
        for (var i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.from < t && o.to > t) return i;
            o.to == t && (o.from != o.to && "before" == n ? (r = i) : (Vl = i)), o.from == t && (o.from != o.to && "before" != n ? (r = i) : (Vl = i));
        }
        return null != r ? r : Vl;
    }
    function Se(e, t) {
        var n = e.order;
        return null == n && (n = e.order = Kl(e.text, t)), n;
    }
    function Le(e, t, n) {
        var r = L(e.text, t + n, n);
        return r < 0 || r > e.text.length ? null : r;
    }
    function ke(e, t, n) {
        var r = Le(e, t.ch, n);
        return null == r ? null : new E(t.line, r, n < 0 ? "after" : "before");
    }
    function Me(e, t, n, r, i) {
        if (e) {
            var o = Se(n, t.doc.direction);
            if (o) {
                var l,
                    s = i < 0 ? g(o) : o[0],
                    a = i < 0 == (1 == s.level) ? "after" : "before";
                if (s.level > 0) {
                    var u = qt(t, n);
                    l = i < 0 ? n.text.length - 1 : 0;
                    var c = Zt(t, u, l).top;
                    (l = k(
                        function (e) {
                            return Zt(t, u, e).top == c;
                        },
                        i < 0 == (1 == s.level) ? s.from : s.to - 1,
                        l
                    )),
                        "before" == a && (l = Le(n, l, 1));
                } else l = i < 0 ? s.to : s.from;
                return new E(r, l, a);
            }
        }
        return new E(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after");
    }
    function Te(e, t, n, r) {
        var i = Se(t, e.doc.direction);
        if (!i) return ke(t, n, r);
        n.ch >= t.text.length ? ((n.ch = t.text.length), (n.sticky = "before")) : n.ch <= 0 && ((n.ch = 0), (n.sticky = "after"));
        var o = Ce(i, n.ch, n.sticky),
            l = i[o];
        if ("ltr" == e.doc.direction && l.level % 2 == 0 && (r > 0 ? l.to > n.ch : l.from < n.ch)) return ke(t, n, r);
        var s,
            a = function (e, n) {
                return Le(t, e instanceof E ? e.ch : e, n);
            },
            u = function (n) {
                return e.options.lineWrapping ? ((s = s || qt(e, t)), vn(e, t, s, n)) : { begin: 0, end: t.text.length };
            },
            c = u("before" == n.sticky ? a(n, -1) : n.ch);
        if ("rtl" == e.doc.direction || 1 == l.level) {
            var h = (1 == l.level) == r < 0,
                f = a(n, h ? 1 : -1);
            if (null != f && (h ? f <= l.to && f <= c.end : f >= l.from && f >= c.begin)) {
                var d = h ? "before" : "after";
                return new E(n.line, f, d);
            }
        }
        var p = function (e, t, r) {
                for (
                    var o = function (e, t) {
                        return t ? new E(n.line, a(e, 1), "before") : new E(n.line, e, "after");
                    };
                    e >= 0 && e < i.length;
                    e += t
                ) {
                    var l = i[e],
                        s = t > 0 == (1 != l.level),
                        u = s ? r.begin : a(r.end, -1);
                    if (l.from <= u && u < l.to) return o(u, s);
                    if (((u = s ? l.from : a(l.to, -1)), r.begin <= u && u < r.end)) return o(u, s);
                }
            },
            g = p(o + r, r, c);
        if (g) return g;
        var v = r > 0 ? c.end : a(c.begin, -1);
        return null == v || (r > 0 && v == t.text.length) || !(g = p(r > 0 ? 0 : i.length - 1, r, u(v))) ? null : g;
    }
    function Ne(e, t) {
        return (e._handlers && e._handlers[t]) || jl;
    }
    function Oe(e, t, n) {
        if (e.removeEventListener) e.removeEventListener(t, n, !1);
        else if (e.detachEvent) e.detachEvent("on" + t, n);
        else {
            var r = e._handlers,
                i = r && r[t];
            if (i) {
                var o = f(i, n);
                o > -1 && (r[t] = i.slice(0, o).concat(i.slice(o + 1)));
            }
        }
    }
    function Ae(e, t) {
        var n = Ne(e, t);
        if (n.length) for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) n[i].apply(null, r);
    }
    function We(e, t, n) {
        return (
            "string" == typeof t &&
                (t = {
                    type: t,
                    preventDefault: function () {
                        this.defaultPrevented = !0;
                    },
                }),
            Ae(e, n || t.type, e, t),
            Ie(t) || t.codemirrorIgnore
        );
    }
    function De(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t) for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r) -1 == f(n, t[r]) && n.push(t[r]);
    }
    function He(e, t) {
        return Ne(e, t).length > 0;
    }
    function Fe(e) {
        (e.prototype.on = function (e, t) {
            Xl(this, e, t);
        }),
            (e.prototype.off = function (e, t) {
                Oe(this, e, t);
            });
    }
    function Ee(e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
    }
    function Pe(e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
    }
    function Ie(e) {
        return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue;
    }
    function Re(e) {
        Ee(e), Pe(e);
    }
    function ze(e) {
        return e.target || e.srcElement;
    }
    function Be(e) {
        var t = e.which;
        return null == t && (1 & e.button ? (t = 1) : 2 & e.button ? (t = 3) : 4 & e.button && (t = 2)), xl && e.ctrlKey && 1 == t && (t = 3), t;
    }
    function Ge(e) {
        if (null == Wl) {
            var t = r("span", "​");
            n(e, r("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Wl = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(ul && cl < 8));
        }
        var i = Wl ? r("span", "​") : r("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
        return i.setAttribute("cm-text", ""), i;
    }
    function Ue(e) {
        if (null != Dl) return Dl;
        var r = n(e, document.createTextNode("AخA")),
            i = kl(r, 0, 1).getBoundingClientRect(),
            o = kl(r, 1, 2).getBoundingClientRect();
        return t(e), !(!i || i.left == i.right) && (Dl = o.right - i.right < 3);
    }
    function Ve(e) {
        if (null != Zl) return Zl;
        var t = n(e, r("span", "x")),
            i = t.getBoundingClientRect(),
            o = kl(t, 0, 1).getBoundingClientRect();
        return (Zl = Math.abs(i.left - o.left) > 1);
    }
    function Ke(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), (Ql[e] = t);
    }
    function je(e) {
        if ("string" == typeof e && Jl.hasOwnProperty(e)) e = Jl[e];
        else if (e && "string" == typeof e.name && Jl.hasOwnProperty(e.name)) {
            var t = Jl[e.name];
            "string" == typeof t && (t = { name: t }), ((e = b(t, e)).name = t.name);
        } else {
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return je("application/xml");
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return je("application/json");
        }
        return "string" == typeof e ? { name: e } : e || { name: "null" };
    }
    function Xe(e, t) {
        t = je(t);
        var n = Ql[t.name];
        if (!n) return Xe(e, "text/plain");
        var r = n(e, t);
        if (es.hasOwnProperty(t.name)) {
            var i = es[t.name];
            for (var o in i) i.hasOwnProperty(o) && (r.hasOwnProperty(o) && (r["_" + o] = r[o]), (r[o] = i[o]));
        }
        if (((r.name = t.name), t.helperType && (r.helperType = t.helperType), t.modeProps)) for (var l in t.modeProps) r[l] = t.modeProps[l];
        return r;
    }
    function Ye(e, t) {
        c(t, es.hasOwnProperty(e) ? es[e] : (es[e] = {}));
    }
    function _e(e, t) {
        if (!0 === t) return t;
        if (e.copyState) return e.copyState(t);
        var n = {};
        for (var r in t) {
            var i = t[r];
            i instanceof Array && (i = i.concat([])), (n[r] = i);
        }
        return n;
    }
    function $e(e, t) {
        for (var n; e.innerMode && (n = e.innerMode(t)) && n.mode != e; ) (t = n.state), (e = n.mode);
        return n || { mode: e, state: t };
    }
    function qe(e, t, n) {
        return !e.startState || e.startState(t, n);
    }
    function Ze(e, t, n, r) {
        var i = [e.state.modeGen],
            o = {};
        ot(
            e,
            t.text,
            e.doc.mode,
            n,
            function (e, t) {
                return i.push(e, t);
            },
            o,
            r
        );
        for (var l = n.state, s = 0; s < e.state.overlays.length; ++s)
            !(function (r) {
                var l = e.state.overlays[r],
                    s = 1,
                    a = 0;
                (n.state = !0),
                    ot(
                        e,
                        t.text,
                        l.mode,
                        n,
                        function (e, t) {
                            for (var n = s; a < e; ) {
                                var r = i[s];
                                r > e && i.splice(s, 1, e, i[s + 1], r), (s += 2), (a = Math.min(e, r));
                            }
                            if (t)
                                if (l.opaque) i.splice(n, s - n, e, "overlay " + t), (s = n + 2);
                                else
                                    for (; n < s; n += 2) {
                                        var o = i[n + 1];
                                        i[n + 1] = (o ? o + " " : "") + "overlay " + t;
                                    }
                        },
                        o
                    );
            })(s);
        return (n.state = l), { styles: i, classes: o.bgClass || o.textClass ? o : null };
    }
    function Qe(e, t, n) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
            var r = Je(e, W(t)),
                i = t.text.length > e.options.maxHighlightLength && _e(e.doc.mode, r.state),
                o = Ze(e, t, r);
            i && (r.state = i),
                (t.stateAfter = r.save(!i)),
                (t.styles = o.styles),
                o.classes ? (t.styleClasses = o.classes) : t.styleClasses && (t.styleClasses = null),
                n === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier));
        }
        return t.styles;
    }
    function Je(e, t, n) {
        var r = e.doc,
            i = e.display;
        if (!r.mode.startState) return new rs(r, !0, t);
        var o = lt(e, t, n),
            l = o > r.first && T(r, o - 1).stateAfter,
            s = l ? rs.fromSaved(r, l, o) : new rs(r, qe(r.mode), o);
        return (
            r.iter(o, t, function (n) {
                et(e, n.text, s);
                var r = s.line;
                (n.stateAfter = r == t - 1 || r % 5 == 0 || (r >= i.viewFrom && r < i.viewTo) ? s.save() : null), s.nextLine();
            }),
            n && (r.modeFrontier = s.line),
            s
        );
    }
    function et(e, t, n, r) {
        var i = e.doc.mode,
            o = new ts(t, e.options.tabSize, n);
        for (o.start = o.pos = r || 0, "" == t && tt(i, n.state); !o.eol(); ) nt(i, o, n.state), (o.start = o.pos);
    }
    function tt(e, t) {
        if (e.blankLine) return e.blankLine(t);
        if (e.innerMode) {
            var n = $e(e, t);
            return n.mode.blankLine ? n.mode.blankLine(n.state) : void 0;
        }
    }
    function nt(e, t, n, r) {
        for (var i = 0; i < 10; i++) {
            r && (r[0] = $e(e, n).mode);
            var o = e.token(t, n);
            if (t.pos > t.start) return o;
        }
        throw new Error("Mode " + e.name + " failed to advance stream.");
    }
    function rt(e, t, n, r) {
        var i,
            o,
            l = e.doc,
            s = l.mode,
            a = T(l, (t = U(l, t)).line),
            u = Je(e, t.line, n),
            c = new ts(a.text, e.options.tabSize, u);
        for (r && (o = []); (r || c.pos < t.ch) && !c.eol(); ) (c.start = c.pos), (i = nt(s, c, u.state)), r && o.push(new is(c, i, _e(l.mode, u.state)));
        return r ? o : new is(c, i, u.state);
    }
    function it(e, t) {
        if (e)
            for (;;) {
                var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!n) break;
                e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
                var r = n[1] ? "bgClass" : "textClass";
                null == t[r] ? (t[r] = n[2]) : new RegExp("(?:^|s)" + n[2] + "(?:$|s)").test(t[r]) || (t[r] += " " + n[2]);
            }
        return e;
    }
    function ot(e, t, n, r, i, o, l) {
        var s = n.flattenSpans;
        null == s && (s = e.options.flattenSpans);
        var a,
            u = 0,
            c = null,
            h = new ts(t, e.options.tabSize, r),
            f = e.options.addModeClass && [null];
        for ("" == t && it(tt(n, r.state), o); !h.eol(); ) {
            if ((h.pos > e.options.maxHighlightLength ? ((s = !1), l && et(e, t, r, h.pos), (h.pos = t.length), (a = null)) : (a = it(nt(n, h, r.state, f), o)), f)) {
                var d = f[0].name;
                d && (a = "m-" + (a ? d + " " + a : d));
            }
            if (!s || c != a) {
                for (; u < h.start; ) i((u = Math.min(h.start, u + 5e3)), c);
                c = a;
            }
            h.start = h.pos;
        }
        for (; u < h.pos; ) {
            var p = Math.min(h.pos, u + 5e3);
            i(p, c), (u = p);
        }
    }
    function lt(e, t, n) {
        for (var r, i, o = e.doc, l = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), s = t; s > l; --s) {
            if (s <= o.first) return o.first;
            var a = T(o, s - 1),
                u = a.stateAfter;
            if (u && (!n || s + (u instanceof ns ? u.lookAhead : 0) <= o.modeFrontier)) return s;
            var c = h(a.text, null, e.options.tabSize);
            (null == i || r > c) && ((i = s - 1), (r = c));
        }
        return i;
    }
    function st(e, t) {
        if (((e.modeFrontier = Math.min(e.modeFrontier, t)), !(e.highlightFrontier < t - 10))) {
            for (var n = e.first, r = t - 1; r > n; r--) {
                var i = T(e, r).stateAfter;
                if (i && (!(i instanceof ns) || r + i.lookAhead < t)) {
                    n = r + 1;
                    break;
                }
            }
            e.highlightFrontier = Math.min(e.highlightFrontier, n);
        }
    }
    function at(e, t, n, r) {
        (e.text = t), e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), ne(e), re(e, n);
        var i = r ? r(e) : 1;
        i != e.height && A(e, i);
    }
    function ut(e) {
        (e.parent = null), ne(e);
    }
    function ct(e, t) {
        if (!e || /^\s*$/.test(e)) return null;
        var n = t.addModeClass ? as : ss;
        return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"));
    }
    function ht(e, t) {
        var n = i("span", null, null, hl ? "padding-right: .1px" : null),
            r = { pre: i("pre", [n], "CodeMirror-line"), content: n, col: 0, pos: 0, cm: e, trailingSpace: !1, splitSpaces: (ul || hl) && e.getOption("lineWrapping") };
        t.measure = {};
        for (var o = 0; o <= (t.rest ? t.rest.length : 0); o++) {
            var l = o ? t.rest[o - 1] : t.line,
                s = void 0;
            (r.pos = 0),
                (r.addToken = dt),
                Ue(e.display.measure) && (s = Se(l, e.doc.direction)) && (r.addToken = gt(r.addToken, s)),
                (r.map = []),
                mt(l, r, Qe(e, l, t != e.display.externalMeasured && W(l))),
                l.styleClasses && (l.styleClasses.bgClass && (r.bgClass = a(l.styleClasses.bgClass, r.bgClass || "")), l.styleClasses.textClass && (r.textClass = a(l.styleClasses.textClass, r.textClass || ""))),
                0 == r.map.length && r.map.push(0, 0, r.content.appendChild(Ge(e.display.measure))),
                0 == o ? ((t.measure.map = r.map), (t.measure.cache = {})) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}));
        }
        if (hl) {
            var u = r.content.lastChild;
            (/\bcm-tab\b/.test(u.className) || (u.querySelector && u.querySelector(".cm-tab"))) && (r.content.className = "cm-tab-wrap-hack");
        }
        return Ae(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = a(r.pre.className, r.textClass || "")), r;
    }
    function ft(e) {
        var t = r("span", "•", "cm-invalidchar");
        return (t.title = "\\u" + e.charCodeAt(0).toString(16)), t.setAttribute("aria-label", t.title), t;
    }
    function dt(e, t, n, i, o, l, s) {
        if (t) {
            var a,
                u = e.splitSpaces ? pt(t, e.trailingSpace) : t,
                c = e.cm.state.specialChars,
                h = !1;
            if (c.test(t)) {
                a = document.createDocumentFragment();
                for (var f = 0; ; ) {
                    c.lastIndex = f;
                    var d = c.exec(t),
                        g = d ? d.index - f : t.length - f;
                    if (g) {
                        var v = document.createTextNode(u.slice(f, f + g));
                        ul && cl < 9 ? a.appendChild(r("span", [v])) : a.appendChild(v), e.map.push(e.pos, e.pos + g, v), (e.col += g), (e.pos += g);
                    }
                    if (!d) break;
                    f += g + 1;
                    var m = void 0;
                    if ("\t" == d[0]) {
                        var y = e.cm.options.tabSize,
                            b = y - (e.col % y);
                        (m = a.appendChild(r("span", p(b), "cm-tab"))).setAttribute("role", "presentation"), m.setAttribute("cm-text", "\t"), (e.col += b);
                    } else
                        "\r" == d[0] || "\n" == d[0]
                            ? ((m = a.appendChild(r("span", "\r" == d[0] ? "␍" : "␤", "cm-invalidchar"))).setAttribute("cm-text", d[0]), (e.col += 1))
                            : ((m = e.cm.options.specialCharPlaceholder(d[0])).setAttribute("cm-text", d[0]), ul && cl < 9 ? a.appendChild(r("span", [m])) : a.appendChild(m), (e.col += 1));
                    e.map.push(e.pos, e.pos + 1, m), e.pos++;
                }
            } else (e.col += t.length), (a = document.createTextNode(u)), e.map.push(e.pos, e.pos + t.length, a), ul && cl < 9 && (h = !0), (e.pos += t.length);
            if (((e.trailingSpace = 32 == u.charCodeAt(t.length - 1)), n || i || o || h || s)) {
                var w = n || "";
                i && (w += i), o && (w += o);
                var x = r("span", [a], w, s);
                return l && (x.title = l), e.content.appendChild(x);
            }
            e.content.appendChild(a);
        }
    }
    function pt(e, t) {
        if (e.length > 1 && !/  /.test(e)) return e;
        for (var n = t, r = "", i = 0; i < e.length; i++) {
            var o = e.charAt(i);
            " " != o || !n || (i != e.length - 1 && 32 != e.charCodeAt(i + 1)) || (o = " "), (r += o), (n = " " == o);
        }
        return r;
    }
    function gt(e, t) {
        return function (n, r, i, o, l, s, a) {
            i = i ? i + " cm-force-border" : "cm-force-border";
            for (var u = n.pos, c = u + r.length; ; ) {
                for (var h = void 0, f = 0; f < t.length && !((h = t[f]).to > u && h.from <= u); f++);
                if (h.to >= c) return e(n, r, i, o, l, s, a);
                e(n, r.slice(0, h.to - u), i, o, null, s, a), (o = null), (r = r.slice(h.to - u)), (u = h.to);
            }
        };
    }
    function vt(e, t, n, r) {
        var i = !r && n.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i),
            !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)),
            i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)),
            (e.pos += t),
            (e.trailingSpace = !1);
    }
    function mt(e, t, n) {
        var r = e.markedSpans,
            i = e.text,
            o = 0;
        if (r)
            for (var l, s, a, u, c, h, f, d = i.length, p = 0, g = 1, v = "", m = 0; ; ) {
                if (m == p) {
                    (a = u = c = h = s = ""), (f = null), (m = 1 / 0);
                    for (var y = [], b = void 0, w = 0; w < r.length; ++w) {
                        var x = r[w],
                            C = x.marker;
                        "bookmark" == C.type && x.from == p && C.widgetNode
                            ? y.push(C)
                            : x.from <= p && (null == x.to || x.to > p || (C.collapsed && x.to == p && x.from == p))
                            ? (null != x.to && x.to != p && m > x.to && ((m = x.to), (u = "")),
                              C.className && (a += " " + C.className),
                              C.css && (s = (s ? s + ";" : "") + C.css),
                              C.startStyle && x.from == p && (c += " " + C.startStyle),
                              C.endStyle && x.to == m && (b || (b = [])).push(C.endStyle, x.to),
                              C.title && !h && (h = C.title),
                              C.collapsed && (!f || le(f.marker, C) < 0) && (f = x))
                            : x.from > p && m > x.from && (m = x.from);
                    }
                    if (b) for (var S = 0; S < b.length; S += 2) b[S + 1] == m && (u += " " + b[S]);
                    if (!f || f.from == p) for (var L = 0; L < y.length; ++L) vt(t, 0, y[L]);
                    if (f && (f.from || 0) == p) {
                        if ((vt(t, (null == f.to ? d + 1 : f.to) - p, f.marker, null == f.from), null == f.to)) return;
                        f.to == p && (f = !1);
                    }
                }
                if (p >= d) break;
                for (var k = Math.min(d, m); ; ) {
                    if (v) {
                        var M = p + v.length;
                        if (!f) {
                            var T = M > k ? v.slice(0, k - p) : v;
                            t.addToken(t, T, l ? l + a : a, c, p + T.length == m ? u : "", h, s);
                        }
                        if (M >= k) {
                            (v = v.slice(k - p)), (p = k);
                            break;
                        }
                        (p = M), (c = "");
                    }
                    (v = i.slice(o, (o = n[g++]))), (l = ct(n[g++], t.cm.options));
                }
            }
        else for (var N = 1; N < n.length; N += 2) t.addToken(t, i.slice(o, (o = n[N])), ct(n[N + 1], t.cm.options));
    }
    function yt(e, t, n) {
        (this.line = t), (this.rest = de(t)), (this.size = this.rest ? W(g(this.rest)) - n + 1 : 1), (this.node = this.text = null), (this.hidden = ve(e, t));
    }
    function bt(e, t, n) {
        for (var r, i = [], o = t; o < n; o = r) {
            var l = new yt(e.doc, T(e.doc, o), o);
            (r = o + l.size), i.push(l);
        }
        return i;
    }
    function wt(e) {
        us ? us.ops.push(e) : (e.ownsGroup = us = { ops: [e], delayedCallbacks: [] });
    }
    function xt(e) {
        var t = e.delayedCallbacks,
            n = 0;
        do {
            for (; n < t.length; n++) t[n].call(null);
            for (var r = 0; r < e.ops.length; r++) {
                var i = e.ops[r];
                if (i.cursorActivityHandlers) for (; i.cursorActivityCalled < i.cursorActivityHandlers.length; ) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm);
            }
        } while (n < t.length);
    }
    function Ct(e, t) {
        var n = e.ownsGroup;
        if (n)
            try {
                xt(n);
            } finally {
                (us = null), t(n);
            }
    }
    function St(e, t) {
        var n = Ne(e, t);
        if (n.length) {
            var r,
                i = Array.prototype.slice.call(arguments, 2);
            us ? (r = us.delayedCallbacks) : cs ? (r = cs) : ((r = cs = []), setTimeout(Lt, 0));
            for (var o = 0; o < n.length; ++o)
                !(function (e) {
                    r.push(function () {
                        return n[e].apply(null, i);
                    });
                })(o);
        }
    }
    function Lt() {
        var e = cs;
        cs = null;
        for (var t = 0; t < e.length; ++t) e[t]();
    }
    function kt(e, t, n, r) {
        for (var i = 0; i < t.changes.length; i++) {
            var o = t.changes[i];
            "text" == o ? Ot(e, t) : "gutter" == o ? Wt(e, t, n, r) : "class" == o ? At(e, t) : "widget" == o && Dt(e, t, r);
        }
        t.changes = null;
    }
    function Mt(e) {
        return e.node == e.text && ((e.node = r("div", null, null, "position: relative")), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), ul && cl < 8 && (e.node.style.zIndex = 2)), e.node;
    }
    function Tt(e, t) {
        var n = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
        if ((n && (n += " CodeMirror-linebackground"), t.background)) n ? (t.background.className = n) : (t.background.parentNode.removeChild(t.background), (t.background = null));
        else if (n) {
            var i = Mt(t);
            (t.background = i.insertBefore(r("div", null, n), i.firstChild)), e.display.input.setUneditable(t.background);
        }
    }
    function Nt(e, t) {
        var n = e.display.externalMeasured;
        return n && n.line == t.line ? ((e.display.externalMeasured = null), (t.measure = n.measure), n.built) : ht(e, t);
    }
    function Ot(e, t) {
        var n = t.text.className,
            r = Nt(e, t);
        t.text == t.node && (t.node = r.pre),
            t.text.parentNode.replaceChild(r.pre, t.text),
            (t.text = r.pre),
            r.bgClass != t.bgClass || r.textClass != t.textClass ? ((t.bgClass = r.bgClass), (t.textClass = r.textClass), At(e, t)) : n && (t.text.className = n);
    }
    function At(e, t) {
        Tt(e, t), t.line.wrapClass ? (Mt(t).className = t.line.wrapClass) : t.node != t.text && (t.node.className = "");
        var n = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = n || "";
    }
    function Wt(e, t, n, i) {
        if ((t.gutter && (t.node.removeChild(t.gutter), (t.gutter = null)), t.gutterBackground && (t.node.removeChild(t.gutterBackground), (t.gutterBackground = null)), t.line.gutterClass)) {
            var o = Mt(t);
            (t.gutterBackground = r("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px; width: " + i.gutterTotalWidth + "px")),
                e.display.input.setUneditable(t.gutterBackground),
                o.insertBefore(t.gutterBackground, t.text);
        }
        var l = t.line.gutterMarkers;
        if (e.options.lineNumbers || l) {
            var s = Mt(t),
                a = (t.gutter = r("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px"));
            if (
                (e.display.input.setUneditable(a),
                s.insertBefore(a, t.text),
                t.line.gutterClass && (a.className += " " + t.line.gutterClass),
                !e.options.lineNumbers ||
                    (l && l["CodeMirror-linenumbers"]) ||
                    (t.lineNumber = a.appendChild(r("div", F(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + i.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))),
                l)
            )
                for (var u = 0; u < e.options.gutters.length; ++u) {
                    var c = e.options.gutters[u],
                        h = l.hasOwnProperty(c) && l[c];
                    h && a.appendChild(r("div", [h], "CodeMirror-gutter-elt", "left: " + i.gutterLeft[c] + "px; width: " + i.gutterWidth[c] + "px"));
                }
        }
    }
    function Dt(e, t, n) {
        t.alignable && (t.alignable = null);
        for (var r = t.node.firstChild, i = void 0; r; r = i) (i = r.nextSibling), "CodeMirror-linewidget" == r.className && t.node.removeChild(r);
        Ft(e, t, n);
    }
    function Ht(e, t, n, r) {
        var i = Nt(e, t);
        return (t.text = t.node = i.pre), i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), At(e, t), Wt(e, t, n, r), Ft(e, t, r), t.node;
    }
    function Ft(e, t, n) {
        if ((Et(e, t.line, t, n, !0), t.rest)) for (var r = 0; r < t.rest.length; r++) Et(e, t.rest[r], t, n, !1);
    }
    function Et(e, t, n, i, o) {
        if (t.widgets)
            for (var l = Mt(n), s = 0, a = t.widgets; s < a.length; ++s) {
                var u = a[s],
                    c = r("div", [u.node], "CodeMirror-linewidget");
                u.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"), Pt(u, c, n, i), e.display.input.setUneditable(c), o && u.above ? l.insertBefore(c, n.gutter || n.text) : l.appendChild(c), St(u, "redraw");
            }
    }
    function Pt(e, t, n, r) {
        if (e.noHScroll) {
            (n.alignable || (n.alignable = [])).push(t);
            var i = r.wrapperWidth;
            (t.style.left = r.fixedPos + "px"), e.coverGutter || ((i -= r.gutterTotalWidth), (t.style.paddingLeft = r.gutterTotalWidth + "px")), (t.style.width = i + "px");
        }
        e.coverGutter && ((t.style.zIndex = 5), (t.style.position = "relative"), e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"));
    }
    function It(e) {
        if (null != e.height) return e.height;
        var t = e.doc.cm;
        if (!t) return 0;
        if (!o(document.body, e.node)) {
            var i = "position: relative;";
            e.coverGutter && (i += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (i += "width: " + t.display.wrapper.clientWidth + "px;"), n(t.display.measure, r("div", [e.node], null, i));
        }
        return (e.height = e.node.parentNode.offsetHeight);
    }
    function Rt(e, t) {
        for (var n = ze(t); n != e.wrapper; n = n.parentNode) if (!n || (1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events")) || (n.parentNode == e.sizer && n != e.mover)) return !0;
    }
    function zt(e) {
        return e.lineSpace.offsetTop;
    }
    function Bt(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight;
    }
    function Gt(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH;
        var t = n(e.measure, r("pre", "x")),
            i = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
            o = { left: parseInt(i.paddingLeft), right: parseInt(i.paddingRight) };
        return isNaN(o.left) || isNaN(o.right) || (e.cachedPaddingH = o), o;
    }
    function Ut(e) {
        return Hl - e.display.nativeBarWidth;
    }
    function Vt(e) {
        return e.display.scroller.clientWidth - Ut(e) - e.display.barWidth;
    }
    function Kt(e) {
        return e.display.scroller.clientHeight - Ut(e) - e.display.barHeight;
    }
    function jt(e, t, n) {
        var r = e.options.lineWrapping,
            i = r && Vt(e);
        if (!t.measure.heights || (r && t.measure.width != i)) {
            var o = (t.measure.heights = []);
            if (r) {
                t.measure.width = i;
                for (var l = t.text.firstChild.getClientRects(), s = 0; s < l.length - 1; s++) {
                    var a = l[s],
                        u = l[s + 1];
                    Math.abs(a.bottom - u.bottom) > 2 && o.push((a.bottom + u.top) / 2 - n.top);
                }
            }
            o.push(n.bottom - n.top);
        }
    }
    function Xt(e, t, n) {
        if (e.line == t) return { map: e.measure.map, cache: e.measure.cache };
        for (var r = 0; r < e.rest.length; r++) if (e.rest[r] == t) return { map: e.measure.maps[r], cache: e.measure.caches[r] };
        for (var i = 0; i < e.rest.length; i++) if (W(e.rest[i]) > n) return { map: e.measure.maps[i], cache: e.measure.caches[i], before: !0 };
    }
    function Yt(e, t) {
        var r = W((t = he(t))),
            i = (e.display.externalMeasured = new yt(e.doc, t, r));
        i.lineN = r;
        var o = (i.built = ht(e, i));
        return (i.text = o.pre), n(e.display.lineMeasure, o.pre), i;
    }
    function _t(e, t, n, r) {
        return Zt(e, qt(e, t), n, r);
    }
    function $t(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[kn(e, t)];
        var n = e.display.externalMeasured;
        return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0;
    }
    function qt(e, t) {
        var n = W(t),
            r = $t(e, n);
        r && !r.text ? (r = null) : r && r.changes && (kt(e, r, n, wn(e)), (e.curOp.forceUpdate = !0)), r || (r = Yt(e, t));
        var i = Xt(r, t, n);
        return { line: t, view: r, rect: null, map: i.map, cache: i.cache, before: i.before, hasHeights: !1 };
    }
    function Zt(e, t, n, r, i) {
        t.before && (n = -1);
        var o,
            l = n + (r || "");
        return (
            t.cache.hasOwnProperty(l) ? (o = t.cache[l]) : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (jt(e, t.view, t.rect), (t.hasHeights = !0)), (o = en(e, t, n, r)).bogus || (t.cache[l] = o)),
            { left: o.left, right: o.right, top: i ? o.rtop : o.top, bottom: i ? o.rbottom : o.bottom }
        );
    }
    function Qt(e, t, n) {
        for (var r, i, o, l, s, a, u = 0; u < e.length; u += 3)
            if (((s = e[u]), (a = e[u + 1]), t < s ? ((i = 0), (o = 1), (l = "left")) : t < a ? (o = (i = t - s) + 1) : (u == e.length - 3 || (t == a && e[u + 3] > t)) && ((i = (o = a - s) - 1), t >= a && (l = "right")), null != i)) {
                if (((r = e[u + 2]), s == a && n == (r.insertLeft ? "left" : "right") && (l = n), "left" == n && 0 == i)) for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft; ) (r = e[2 + (u -= 3)]), (l = "left");
                if ("right" == n && i == a - s) for (; u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft; ) (r = e[(u += 3) + 2]), (l = "right");
                break;
            }
        return { node: r, start: i, end: o, collapse: l, coverStart: s, coverEnd: a };
    }
    function Jt(e, t) {
        var n = hs;
        if ("left" == t) for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++);
        else for (var i = e.length - 1; i >= 0 && (n = e[i]).left == n.right; i--);
        return n;
    }
    function en(e, t, n, r) {
        var i,
            o = Qt(t.map, n, r),
            l = o.node,
            s = o.start,
            a = o.end,
            u = o.collapse;
        if (3 == l.nodeType) {
            for (var c = 0; c < 4; c++) {
                for (; s && S(t.line.text.charAt(o.coverStart + s)); ) --s;
                for (; o.coverStart + a < o.coverEnd && S(t.line.text.charAt(o.coverStart + a)); ) ++a;
                if ((i = ul && cl < 9 && 0 == s && a == o.coverEnd - o.coverStart ? l.parentNode.getBoundingClientRect() : Jt(kl(l, s, a).getClientRects(), r)).left || i.right || 0 == s) break;
                (a = s), (s -= 1), (u = "right");
            }
            ul && cl < 11 && (i = tn(e.display.measure, i));
        } else {
            s > 0 && (u = r = "right");
            var h;
            i = e.options.lineWrapping && (h = l.getClientRects()).length > 1 ? h["right" == r ? h.length - 1 : 0] : l.getBoundingClientRect();
        }
        if (ul && cl < 9 && !s && (!i || (!i.left && !i.right))) {
            var f = l.parentNode.getClientRects()[0];
            i = f ? { left: f.left, right: f.left + bn(e.display), top: f.top, bottom: f.bottom } : hs;
        }
        for (var d = i.top - t.rect.top, p = i.bottom - t.rect.top, g = (d + p) / 2, v = t.view.measure.heights, m = 0; m < v.length - 1 && !(g < v[m]); m++);
        var y = m ? v[m - 1] : 0,
            b = v[m],
            w = { left: ("right" == u ? i.right : i.left) - t.rect.left, right: ("left" == u ? i.left : i.right) - t.rect.left, top: y, bottom: b };
        return i.left || i.right || (w.bogus = !0), e.options.singleCursorHeightPerLine || ((w.rtop = d), (w.rbottom = p)), w;
    }
    function tn(e, t) {
        if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Ve(e)) return t;
        var n = screen.logicalXDPI / screen.deviceXDPI,
            r = screen.logicalYDPI / screen.deviceYDPI;
        return { left: t.left * n, right: t.right * n, top: t.top * r, bottom: t.bottom * r };
    }
    function nn(e) {
        if (e.measure && ((e.measure.cache = {}), (e.measure.heights = null), e.rest)) for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {};
    }
    function rn(e) {
        (e.display.externalMeasure = null), t(e.display.lineMeasure);
        for (var n = 0; n < e.display.view.length; n++) nn(e.display.view[n]);
    }
    function on(e) {
        rn(e), (e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null), e.options.lineWrapping || (e.display.maxLineChanged = !0), (e.display.lineNumChars = null);
    }
    function ln() {
        return dl && bl ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft;
    }
    function sn() {
        return dl && bl ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop;
    }
    function an(e, t, n, r, i) {
        if (!i && t.widgets)
            for (var o = 0; o < t.widgets.length; ++o)
                if (t.widgets[o].above) {
                    var l = It(t.widgets[o]);
                    (n.top += l), (n.bottom += l);
                }
        if ("line" == r) return n;
        r || (r = "local");
        var s = ye(t);
        if (("local" == r ? (s += zt(e.display)) : (s -= e.display.viewOffset), "page" == r || "window" == r)) {
            var a = e.display.lineSpace.getBoundingClientRect();
            s += a.top + ("window" == r ? 0 : sn());
            var u = a.left + ("window" == r ? 0 : ln());
            (n.left += u), (n.right += u);
        }
        return (n.top += s), (n.bottom += s), n;
    }
    function un(e, t, n) {
        if ("div" == n) return t;
        var r = t.left,
            i = t.top;
        if ("page" == n) (r -= ln()), (i -= sn());
        else if ("local" == n || !n) {
            var o = e.display.sizer.getBoundingClientRect();
            (r += o.left), (i += o.top);
        }
        var l = e.display.lineSpace.getBoundingClientRect();
        return { left: r - l.left, top: i - l.top };
    }
    function cn(e, t, n, r, i) {
        return r || (r = T(e.doc, t.line)), an(e, r, _t(e, r, t.ch, i), n);
    }
    function hn(e, t, n, r, i, o) {
        function l(t, l) {
            var s = Zt(e, i, t, l ? "right" : "left", o);
            return l ? (s.left = s.right) : (s.right = s.left), an(e, r, s, n);
        }
        function s(e, t, n) {
            var r = a[t].level % 2 != 0;
            return l(n ? e - 1 : e, r != n);
        }
        (r = r || T(e.doc, t.line)), i || (i = qt(e, r));
        var a = Se(r, e.doc.direction),
            u = t.ch,
            c = t.sticky;
        if ((u >= r.text.length ? ((u = r.text.length), (c = "before")) : u <= 0 && ((u = 0), (c = "after")), !a)) return l("before" == c ? u - 1 : u, "before" == c);
        var h = Ce(a, u, c),
            f = Vl,
            d = s(u, h, "before" == c);
        return null != f && (d.other = s(u, f, "before" != c)), d;
    }
    function fn(e, t) {
        var n = 0;
        (t = U(e.doc, t)), e.options.lineWrapping || (n = bn(e.display) * t.ch);
        var r = T(e.doc, t.line),
            i = ye(r) + zt(e.display);
        return { left: n, right: n, top: i, bottom: i + r.height };
    }
    function dn(e, t, n, r, i) {
        var o = E(e, t, n);
        return (o.xRel = i), r && (o.outside = !0), o;
    }
    function pn(e, t, n) {
        var r = e.doc;
        if ((n += e.display.viewOffset) < 0) return dn(r.first, 0, null, !0, -1);
        var i = D(r, n),
            o = r.first + r.size - 1;
        if (i > o) return dn(r.first + r.size - 1, T(r, o).text.length, null, !0, 1);
        t < 0 && (t = 0);
        for (var l = T(r, i); ; ) {
            var s = mn(e, l, i, t, n),
                a = ue(l),
                u = a && a.find(0, !0);
            if (!a || !(s.ch > u.from.ch || (s.ch == u.from.ch && s.xRel > 0))) return s;
            i = W((l = u.to.line));
        }
    }
    function gn(e, t, n, r) {
        var i = function (r) {
                return an(e, t, Zt(e, n, r), "line");
            },
            o = t.text.length,
            l = k(
                function (e) {
                    return i(e - 1).bottom <= r;
                },
                o,
                0
            );
        return (
            (o = k(
                function (e) {
                    return i(e).top > r;
                },
                l,
                o
            )),
            { begin: l, end: o }
        );
    }
    function vn(e, t, n, r) {
        return gn(e, t, n, an(e, t, Zt(e, n, r), "line").top);
    }
    function mn(e, t, n, r, i) {
        i -= ye(t);
        var o,
            l = 0,
            s = t.text.length,
            a = qt(e, t);
        if (Se(t, e.doc.direction)) {
            if (e.options.lineWrapping) {
                var u;
                (l = (u = gn(e, t, a, i)).begin), (s = u.end);
            }
            o = new E(n, Math.floor(l + (s - l) / 2));
            var c,
                h,
                f = hn(e, o, "line", t, a).left,
                d = f < r ? 1 : -1,
                p = f - r,
                g = Math.ceil((s - l) / 4);
            e: do {
                (c = p), (h = o);
                for (var v = 0; v < g; ++v) {
                    var m = o;
                    if (null == (o = Te(e, t, o, d)) || o.ch < l || s <= ("before" == o.sticky ? o.ch - 1 : o.ch)) {
                        o = m;
                        break e;
                    }
                }
                if (((p = hn(e, o, "line", t, a).left - r), g > 1)) {
                    var y = Math.abs(p - c) / g;
                    (g = Math.min(g, Math.ceil(Math.abs(p) / y))), (d = p < 0 ? 1 : -1);
                }
            } while (0 != p && (g > 1 || (d < 0 != p < 0 && Math.abs(p) <= Math.abs(c))));
            if (Math.abs(p) > Math.abs(c)) {
                if (p < 0 == c < 0) throw new Error("Broke out of infinite loop in coordsCharInner");
                o = h;
            }
        } else {
            var b = k(
                function (n) {
                    var o = an(e, t, Zt(e, a, n), "line");
                    return o.top > i ? ((s = Math.min(n, s)), !0) : !(o.bottom <= i) && (o.left > r || (!(o.right < r) && r - o.left < o.right - r));
                },
                l,
                s
            );
            o = new E(n, (b = L(t.text, b, 1)), b == s ? "before" : "after");
        }
        var w = hn(e, o, "line", t, a);
        return (i < w.top || w.bottom < i) && (o.outside = !0), (o.xRel = r < w.left ? -1 : r > w.right ? 1 : 0), o;
    }
    function yn(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;
        if (null == ls) {
            ls = r("pre");
            for (var i = 0; i < 49; ++i) ls.appendChild(document.createTextNode("x")), ls.appendChild(r("br"));
            ls.appendChild(document.createTextNode("x"));
        }
        n(e.measure, ls);
        var o = ls.offsetHeight / 50;
        return o > 3 && (e.cachedTextHeight = o), t(e.measure), o || 1;
    }
    function bn(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;
        var t = r("span", "xxxxxxxxxx"),
            i = r("pre", [t]);
        n(e.measure, i);
        var o = t.getBoundingClientRect(),
            l = (o.right - o.left) / 10;
        return l > 2 && (e.cachedCharWidth = l), l || 10;
    }
    function wn(e) {
        for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling, ++l) (n[e.options.gutters[l]] = o.offsetLeft + o.clientLeft + i), (r[e.options.gutters[l]] = o.clientWidth);
        return { fixedPos: xn(t), gutterTotalWidth: t.gutters.offsetWidth, gutterLeft: n, gutterWidth: r, wrapperWidth: t.wrapper.clientWidth };
    }
    function xn(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
    }
    function Cn(e) {
        var t = yn(e.display),
            n = e.options.lineWrapping,
            r = n && Math.max(5, e.display.scroller.clientWidth / bn(e.display) - 3);
        return function (i) {
            if (ve(e.doc, i)) return 0;
            var o = 0;
            if (i.widgets) for (var l = 0; l < i.widgets.length; l++) i.widgets[l].height && (o += i.widgets[l].height);
            return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t;
        };
    }
    function Sn(e) {
        var t = e.doc,
            n = Cn(e);
        t.iter(function (e) {
            var t = n(e);
            t != e.height && A(e, t);
        });
    }
    function Ln(e, t, n, r) {
        var i = e.display;
        if (!n && "true" == ze(t).getAttribute("cm-not-content")) return null;
        var o,
            l,
            s = i.lineSpace.getBoundingClientRect();
        try {
            (o = t.clientX - s.left), (l = t.clientY - s.top);
        } catch (t) {
            return null;
        }
        var a,
            u = pn(e, o, l);
        if (r && 1 == u.xRel && (a = T(e.doc, u.line).text).length == u.ch) {
            var c = h(a, a.length, e.options.tabSize) - a.length;
            u = E(u.line, Math.max(0, Math.round((o - Gt(e.display).left) / bn(e.display)) - c));
        }
        return u;
    }
    function kn(e, t) {
        if (t >= e.display.viewTo) return null;
        if ((t -= e.display.viewFrom) < 0) return null;
        for (var n = e.display.view, r = 0; r < n.length; r++) if ((t -= n[r].size) < 0) return r;
    }
    function Mn(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
    }
    function Tn(e, t) {
        for (var n = e.doc, r = {}, i = (r.cursors = document.createDocumentFragment()), o = (r.selection = document.createDocumentFragment()), l = 0; l < n.sel.ranges.length; l++)
            if (!1 !== t || l != n.sel.primIndex) {
                var s = n.sel.ranges[l];
                if (!(s.from().line >= e.display.viewTo || s.to().line < e.display.viewFrom)) {
                    var a = s.empty();
                    (a || e.options.showCursorWhenSelecting) && Nn(e, s.head, i), a || On(e, s, o);
                }
            }
        return r;
    }
    function Nn(e, t, n) {
        var i = hn(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
            o = n.appendChild(r("div", " ", "CodeMirror-cursor"));
        if (((o.style.left = i.left + "px"), (o.style.top = i.top + "px"), (o.style.height = Math.max(0, i.bottom - i.top) * e.options.cursorHeight + "px"), i.other)) {
            var l = n.appendChild(r("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
            (l.style.display = ""), (l.style.left = i.other.left + "px"), (l.style.top = i.other.top + "px"), (l.style.height = 0.85 * (i.other.bottom - i.other.top) + "px");
        }
    }
    function On(e, t, n) {
        function i(e, t, n, i) {
            t < 0 && (t = 0),
                (t = Math.round(t)),
                (i = Math.round(i)),
                a.appendChild(
                    r(
                        "div",
                        null,
                        "CodeMirror-selected",
                        "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == n ? h - e : n) + "px;\n                             height: " + (i - t) + "px"
                    )
                );
        }
        function o(t, n, r) {
            function o(n, r) {
                return cn(e, E(t, n), "div", u, r);
            }
            var l,
                a,
                u = T(s, t),
                f = u.text.length;
            return (
                xe(Se(u, s.direction), n || 0, null == r ? f : r, function (e, t, s) {
                    var u,
                        d,
                        p,
                        g = o(e, "left");
                    if (e == t) (u = g), (d = p = g.left);
                    else {
                        if (((u = o(t - 1, "right")), "rtl" == s)) {
                            var v = g;
                            (g = u), (u = v);
                        }
                        (d = g.left), (p = u.right);
                    }
                    null == n && 0 == e && (d = c),
                        u.top - g.top > 3 && (i(d, g.top, null, g.bottom), (d = c), g.bottom < u.top && i(d, g.bottom, null, u.top)),
                        null == r && t == f && (p = h),
                        (!l || g.top < l.top || (g.top == l.top && g.left < l.left)) && (l = g),
                        (!a || u.bottom > a.bottom || (u.bottom == a.bottom && u.right > a.right)) && (a = u),
                        d < c + 1 && (d = c),
                        i(d, u.top, p - d, u.bottom);
                }),
                { start: l, end: a }
            );
        }
        var l = e.display,
            s = e.doc,
            a = document.createDocumentFragment(),
            u = Gt(e.display),
            c = u.left,
            h = Math.max(l.sizerWidth, Vt(e) - l.sizer.offsetLeft) - u.right,
            f = t.from(),
            d = t.to();
        if (f.line == d.line) o(f.line, f.ch, d.ch);
        else {
            var p = T(s, f.line),
                g = T(s, d.line),
                v = he(p) == he(g),
                m = o(f.line, f.ch, v ? p.text.length + 1 : null).end,
                y = o(d.line, v ? 0 : null, d.ch).start;
            v && (m.top < y.top - 2 ? (i(m.right, m.top, null, m.bottom), i(c, y.top, y.left, y.bottom)) : i(m.right, m.top, y.left - m.right, m.bottom)), m.bottom < y.top && i(c, m.bottom, null, y.top);
        }
        n.appendChild(a);
    }
    function An(e) {
        if (e.state.focused) {
            var t = e.display;
            clearInterval(t.blinker);
            var n = !0;
            (t.cursorDiv.style.visibility = ""),
                e.options.cursorBlinkRate > 0
                    ? (t.blinker = setInterval(function () {
                          return (t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden");
                      }, e.options.cursorBlinkRate))
                    : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
        }
    }
    function Wn(e) {
        e.state.focused || (e.display.input.focus(), Hn(e));
    }
    function Dn(e) {
        (e.state.delayingBlurEvent = !0),
            setTimeout(function () {
                e.state.delayingBlurEvent && ((e.state.delayingBlurEvent = !1), Fn(e));
            }, 100);
    }
    function Hn(e, t) {
        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1),
            "nocursor" != e.options.readOnly &&
                (e.state.focused ||
                    (Ae(e, "focus", e, t),
                    (e.state.focused = !0),
                    s(e.display.wrapper, "CodeMirror-focused"),
                    e.curOp ||
                        e.display.selForContextMenu == e.doc.sel ||
                        (e.display.input.reset(),
                        hl &&
                            setTimeout(function () {
                                return e.display.input.reset(!0);
                            }, 20)),
                    e.display.input.receivedFocus()),
                An(e));
    }
    function Fn(e, t) {
        e.state.delayingBlurEvent ||
            (e.state.focused && (Ae(e, "blur", e, t), (e.state.focused = !1), Nl(e.display.wrapper, "CodeMirror-focused")),
            clearInterval(e.display.blinker),
            setTimeout(function () {
                e.state.focused || (e.display.shift = !1);
            }, 150));
    }
    function En(e) {
        for (var t = e.display, n = t.lineDiv.offsetTop, r = 0; r < t.view.length; r++) {
            var i = t.view[r],
                o = void 0;
            if (!i.hidden) {
                if (ul && cl < 8) {
                    var l = i.node.offsetTop + i.node.offsetHeight;
                    (o = l - n), (n = l);
                } else {
                    var s = i.node.getBoundingClientRect();
                    o = s.bottom - s.top;
                }
                var a = i.line.height - o;
                if ((o < 2 && (o = yn(t)), (a > 0.005 || a < -0.005) && (A(i.line, o), Pn(i.line), i.rest))) for (var u = 0; u < i.rest.length; u++) Pn(i.rest[u]);
            }
        }
    }
    function Pn(e) {
        if (e.widgets) for (var t = 0; t < e.widgets.length; ++t) e.widgets[t].height = e.widgets[t].node.parentNode.offsetHeight;
    }
    function In(e, t, n) {
        var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
        r = Math.floor(r - zt(e));
        var i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight,
            o = D(t, r),
            l = D(t, i);
        if (n && n.ensure) {
            var s = n.ensure.from.line,
                a = n.ensure.to.line;
            s < o ? ((o = s), (l = D(t, ye(T(t, s)) + e.wrapper.clientHeight))) : Math.min(a, t.lastLine()) >= l && ((o = D(t, ye(T(t, a)) - e.wrapper.clientHeight)), (l = a));
        }
        return { from: o, to: Math.max(l, o + 1) };
    }
    function Rn(e) {
        var t = e.display,
            n = t.view;
        if (t.alignWidgets || (t.gutters.firstChild && e.options.fixedGutter)) {
            for (var r = xn(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", l = 0; l < n.length; l++)
                if (!n[l].hidden) {
                    e.options.fixedGutter && (n[l].gutter && (n[l].gutter.style.left = o), n[l].gutterBackground && (n[l].gutterBackground.style.left = o));
                    var s = n[l].alignable;
                    if (s) for (var a = 0; a < s.length; a++) s[a].style.left = o;
                }
            e.options.fixedGutter && (t.gutters.style.left = r + i + "px");
        }
    }
    function zn(e) {
        if (!e.options.lineNumbers) return !1;
        var t = e.doc,
            n = F(e.options, t.first + t.size - 1),
            i = e.display;
        if (n.length != i.lineNumChars) {
            var o = i.measure.appendChild(r("div", [r("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                l = o.firstChild.offsetWidth,
                s = o.offsetWidth - l;
            return (
                (i.lineGutter.style.width = ""),
                (i.lineNumInnerWidth = Math.max(l, i.lineGutter.offsetWidth - s) + 1),
                (i.lineNumWidth = i.lineNumInnerWidth + s),
                (i.lineNumChars = i.lineNumInnerWidth ? n.length : -1),
                (i.lineGutter.style.width = i.lineNumWidth + "px"),
                Ar(e),
                !0
            );
        }
        return !1;
    }
    function Bn(e, t) {
        if (!We(e, "scrollCursorIntoView")) {
            var n = e.display,
                i = n.sizer.getBoundingClientRect(),
                o = null;
            if ((t.top + i.top < 0 ? (o = !0) : t.bottom + i.top > (window.innerHeight || document.documentElement.clientHeight) && (o = !1), null != o && !ml)) {
                var l = r(
                    "div",
                    "​",
                    null,
                    "position: absolute;\n                         top: " +
                        (t.top - n.viewOffset - zt(e.display)) +
                        "px;\n                         height: " +
                        (t.bottom - t.top + Ut(e) + n.barHeight) +
                        "px;\n                         left: " +
                        t.left +
                        "px; width: " +
                        Math.max(2, t.right - t.left) +
                        "px;"
                );
                e.display.lineSpace.appendChild(l), l.scrollIntoView(o), e.display.lineSpace.removeChild(l);
            }
        }
    }
    function Gn(e, t, n, r) {
        null == r && (r = 0);
        var i;
        e.options.lineWrapping || t != n || (n = "before" == (t = t.ch ? E(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t).sticky ? E(t.line, t.ch + 1, "before") : t);
        for (var o = 0; o < 5; o++) {
            var l = !1,
                s = hn(e, t),
                a = n && n != t ? hn(e, n) : s,
                u = Vn(e, (i = { left: Math.min(s.left, a.left), top: Math.min(s.top, a.top) - r, right: Math.max(s.left, a.left), bottom: Math.max(s.bottom, a.bottom) + r })),
                c = e.doc.scrollTop,
                h = e.doc.scrollLeft;
            if ((null != u.scrollTop && (qn(e, u.scrollTop), Math.abs(e.doc.scrollTop - c) > 1 && (l = !0)), null != u.scrollLeft && (Qn(e, u.scrollLeft), Math.abs(e.doc.scrollLeft - h) > 1 && (l = !0)), !l)) break;
        }
        return i;
    }
    function Un(e, t) {
        var n = Vn(e, t);
        null != n.scrollTop && qn(e, n.scrollTop), null != n.scrollLeft && Qn(e, n.scrollLeft);
    }
    function Vn(e, t) {
        var n = e.display,
            r = yn(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : n.scroller.scrollTop,
            o = Kt(e),
            l = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var s = e.doc.height + Bt(n),
            a = t.top < r,
            u = t.bottom > s - r;
        if (t.top < i) l.scrollTop = a ? 0 : t.top;
        else if (t.bottom > i + o) {
            var c = Math.min(t.top, (u ? s : t.bottom) - o);
            c != i && (l.scrollTop = c);
        }
        var h = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : n.scroller.scrollLeft,
            f = Vt(e) - (e.options.fixedGutter ? n.gutters.offsetWidth : 0),
            d = t.right - t.left > f;
        return d && (t.right = t.left + f), t.left < 10 ? (l.scrollLeft = 0) : t.left < h ? (l.scrollLeft = Math.max(0, t.left - (d ? 0 : 10))) : t.right > f + h - 3 && (l.scrollLeft = t.right + (d ? 0 : 10) - f), l;
    }
    function Kn(e, t) {
        null != t && (_n(e), (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t));
    }
    function jn(e) {
        _n(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = { from: t, to: t, margin: e.options.cursorScrollMargin };
    }
    function Xn(e, t, n) {
        (null == t && null == n) || _n(e), null != t && (e.curOp.scrollLeft = t), null != n && (e.curOp.scrollTop = n);
    }
    function Yn(e, t) {
        _n(e), (e.curOp.scrollToPos = t);
    }
    function _n(e) {
        var t = e.curOp.scrollToPos;
        t && ((e.curOp.scrollToPos = null), $n(e, fn(e, t.from), fn(e, t.to), t.margin));
    }
    function $n(e, t, n, r) {
        var i = Vn(e, { left: Math.min(t.left, n.left), top: Math.min(t.top, n.top) - r, right: Math.max(t.right, n.right), bottom: Math.max(t.bottom, n.bottom) + r });
        Xn(e, i.scrollLeft, i.scrollTop);
    }
    function qn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (ol || Nr(e, { top: t }), Zn(e, t, !0), ol && Nr(e), xr(e, 100));
    }
    function Zn(e, t, n) {
        (t = Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)),
            (e.display.scroller.scrollTop != t || n) && ((e.doc.scrollTop = t), e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
    }
    function Qn(e, t, n, r) {
        (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)),
            ((n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r) || ((e.doc.scrollLeft = t), Rn(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
    }
    function Jn(e) {
        var t = e.display,
            n = t.gutters.offsetWidth,
            r = Math.round(e.doc.height + Bt(e.display));
        return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? n : 0,
            docHeight: r,
            scrollHeight: r + Ut(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: n,
        };
    }
    function er(e, t) {
        t || (t = Jn(e));
        var n = e.display.barWidth,
            r = e.display.barHeight;
        tr(e, t);
        for (var i = 0; (i < 4 && n != e.display.barWidth) || r != e.display.barHeight; i++) n != e.display.barWidth && e.options.lineWrapping && En(e), tr(e, Jn(e)), (n = e.display.barWidth), (r = e.display.barHeight);
    }
    function tr(e, t) {
        var n = e.display,
            r = n.scrollbars.update(t);
        (n.sizer.style.paddingRight = (n.barWidth = r.right) + "px"),
            (n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px"),
            (n.heightForcer.style.borderBottom = r.bottom + "px solid transparent"),
            r.right && r.bottom ? ((n.scrollbarFiller.style.display = "block"), (n.scrollbarFiller.style.height = r.bottom + "px"), (n.scrollbarFiller.style.width = r.right + "px")) : (n.scrollbarFiller.style.display = ""),
            r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter
                ? ((n.gutterFiller.style.display = "block"), (n.gutterFiller.style.height = r.bottom + "px"), (n.gutterFiller.style.width = t.gutterWidth + "px"))
                : (n.gutterFiller.style.display = "");
    }
    function nr(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && Nl(e.display.wrapper, e.display.scrollbars.addClass)),
            (e.display.scrollbars = new ps[e.options.scrollbarStyle](
                function (t) {
                    e.display.wrapper.insertBefore(t, e.display.scrollbarFiller),
                        Xl(t, "mousedown", function () {
                            e.state.focused &&
                                setTimeout(function () {
                                    return e.display.input.focus();
                                }, 0);
                        }),
                        t.setAttribute("cm-not-content", "true");
                },
                function (t, n) {
                    "horizontal" == n ? Qn(e, t) : qn(e, t);
                },
                e
            )),
            e.display.scrollbars.addClass && s(e.display.wrapper, e.display.scrollbars.addClass);
    }
    function rr(e) {
        (e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: null,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++gs,
        }),
            wt(e.curOp);
    }
    function ir(e) {
        Ct(e.curOp, function (e) {
            for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
            or(e);
        });
    }
    function or(e) {
        for (var t = e.ops, n = 0; n < t.length; n++) lr(t[n]);
        for (var r = 0; r < t.length; r++) sr(t[r]);
        for (var i = 0; i < t.length; i++) ar(t[i]);
        for (var o = 0; o < t.length; o++) ur(t[o]);
        for (var l = 0; l < t.length; l++) cr(t[l]);
    }
    function lr(e) {
        var t = e.cm,
            n = t.display;
        Sr(t),
            e.updateMaxLine && we(t),
            (e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || (e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo)) || (n.maxLineChanged && t.options.lineWrapping)),
            (e.update = e.mustUpdate && new vs(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate));
    }
    function sr(e) {
        e.updatedDisplay = e.mustUpdate && Mr(e.cm, e.update);
    }
    function ar(e) {
        var t = e.cm,
            n = t.display;
        e.updatedDisplay && En(t),
            (e.barMeasure = Jn(t)),
            n.maxLineChanged &&
                !t.options.lineWrapping &&
                ((e.adjustWidthTo = _t(t, n.maxLine, n.maxLine.text.length).left + 3),
                (t.display.sizerWidth = e.adjustWidthTo),
                (e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + Ut(t) + t.display.barWidth)),
                (e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Vt(t)))),
            (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection(e.focus));
    }
    function ur(e) {
        var t = e.cm;
        null != e.adjustWidthTo && ((t.display.sizer.style.minWidth = e.adjustWidthTo + "px"), e.maxScrollLeft < t.doc.scrollLeft && Qn(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), (t.display.maxLineChanged = !1));
        var n = e.focus && e.focus == l() && (!document.hasFocus || document.hasFocus());
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n),
            (e.updatedDisplay || e.startHeight != t.doc.height) && er(t, e.barMeasure),
            e.updatedDisplay && Wr(t, e.barMeasure),
            e.selectionChanged && An(t),
            t.state.focused && e.updateInput && t.display.input.reset(e.typing),
            n && Wn(e.cm);
    }
    function cr(e) {
        var t = e.cm,
            n = t.display,
            r = t.doc;
        e.updatedDisplay && Tr(t, e.update),
            null == n.wheelStartX || (null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos) || (n.wheelStartX = n.wheelStartY = null),
            null != e.scrollTop && Zn(t, e.scrollTop, e.forceScroll),
            null != e.scrollLeft && Qn(t, e.scrollLeft, !0, !0),
            e.scrollToPos && Bn(t, Gn(t, U(r, e.scrollToPos.from), U(r, e.scrollToPos.to), e.scrollToPos.margin));
        var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers;
        if (i) for (var l = 0; l < i.length; ++l) i[l].lines.length || Ae(i[l], "hide");
        if (o) for (var s = 0; s < o.length; ++s) o[s].lines.length && Ae(o[s], "unhide");
        n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Ae(t, "changes", t, e.changeObjs), e.update && e.update.finish();
    }
    function hr(e, t) {
        if (e.curOp) return t();
        rr(e);
        try {
            return t();
        } finally {
            ir(e);
        }
    }
    function fr(e, t) {
        return function () {
            if (e.curOp) return t.apply(e, arguments);
            rr(e);
            try {
                return t.apply(e, arguments);
            } finally {
                ir(e);
            }
        };
    }
    function dr(e) {
        return function () {
            if (this.curOp) return e.apply(this, arguments);
            rr(this);
            try {
                return e.apply(this, arguments);
            } finally {
                ir(this);
            }
        };
    }
    function pr(e) {
        return function () {
            var t = this.cm;
            if (!t || t.curOp) return e.apply(this, arguments);
            rr(t);
            try {
                return e.apply(this, arguments);
            } finally {
                ir(t);
            }
        };
    }
    function gr(e, t, n, r) {
        null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), r || (r = 0);
        var i = e.display;
        if ((r && n < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), (e.curOp.viewChanged = !0), t >= i.viewTo)) Ul && pe(e.doc, t) < i.viewTo && mr(e);
        else if (n <= i.viewFrom) Ul && ge(e.doc, n + r) > i.viewFrom ? mr(e) : ((i.viewFrom += r), (i.viewTo += r));
        else if (t <= i.viewFrom && n >= i.viewTo) mr(e);
        else if (t <= i.viewFrom) {
            var o = yr(e, n, n + r, 1);
            o ? ((i.view = i.view.slice(o.index)), (i.viewFrom = o.lineN), (i.viewTo += r)) : mr(e);
        } else if (n >= i.viewTo) {
            var l = yr(e, t, t, -1);
            l ? ((i.view = i.view.slice(0, l.index)), (i.viewTo = l.lineN)) : mr(e);
        } else {
            var s = yr(e, t, t, -1),
                a = yr(e, n, n + r, 1);
            s && a ? ((i.view = i.view.slice(0, s.index).concat(bt(e, s.lineN, a.lineN)).concat(i.view.slice(a.index))), (i.viewTo += r)) : mr(e);
        }
        var u = i.externalMeasured;
        u && (n < u.lineN ? (u.lineN += r) : t < u.lineN + u.size && (i.externalMeasured = null));
    }
    function vr(e, t, n) {
        e.curOp.viewChanged = !0;
        var r = e.display,
            i = e.display.externalMeasured;
        if ((i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo))) {
            var o = r.view[kn(e, t)];
            if (null != o.node) {
                var l = o.changes || (o.changes = []);
                -1 == f(l, n) && l.push(n);
            }
        }
    }
    function mr(e) {
        (e.display.viewFrom = e.display.viewTo = e.doc.first), (e.display.view = []), (e.display.viewOffset = 0);
    }
    function yr(e, t, n, r) {
        var i,
            o = kn(e, t),
            l = e.display.view;
        if (!Ul || n == e.doc.first + e.doc.size) return { index: o, lineN: n };
        for (var s = e.display.viewFrom, a = 0; a < o; a++) s += l[a].size;
        if (s != t) {
            if (r > 0) {
                if (o == l.length - 1) return null;
                (i = s + l[o].size - t), o++;
            } else i = s - t;
            (t += i), (n += i);
        }
        for (; pe(e.doc, n) != n; ) {
            if (o == (r < 0 ? 0 : l.length - 1)) return null;
            (n += r * l[o - (r < 0 ? 1 : 0)].size), (o += r);
        }
        return { index: o, lineN: n };
    }
    function br(e, t, n) {
        var r = e.display;
        0 == r.view.length || t >= r.viewTo || n <= r.viewFrom
            ? ((r.view = bt(e, t, n)), (r.viewFrom = t))
            : (r.viewFrom > t ? (r.view = bt(e, t, r.viewFrom).concat(r.view)) : r.viewFrom < t && (r.view = r.view.slice(kn(e, t))),
              (r.viewFrom = t),
              r.viewTo < n ? (r.view = r.view.concat(bt(e, r.viewTo, n))) : r.viewTo > n && (r.view = r.view.slice(0, kn(e, n)))),
            (r.viewTo = n);
    }
    function wr(e) {
        for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
            var i = t[r];
            i.hidden || (i.node && !i.changes) || ++n;
        }
        return n;
    }
    function xr(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, u(Cr, e));
    }
    function Cr(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
            var n = +new Date() + e.options.workTime,
                r = Je(e, t.highlightFrontier),
                i = [];
            t.iter(r.line, Math.min(t.first + t.size, e.display.viewTo + 500), function (o) {
                if (r.line >= e.display.viewFrom) {
                    var l = o.styles,
                        s = o.text.length > e.options.maxHighlightLength ? _e(t.mode, r.state) : null,
                        a = Ze(e, o, r, !0);
                    s && (r.state = s), (o.styles = a.styles);
                    var u = o.styleClasses,
                        c = a.classes;
                    c ? (o.styleClasses = c) : u && (o.styleClasses = null);
                    for (var h = !l || l.length != o.styles.length || (u != c && (!u || !c || u.bgClass != c.bgClass || u.textClass != c.textClass)), f = 0; !h && f < l.length; ++f) h = l[f] != o.styles[f];
                    h && i.push(r.line), (o.stateAfter = r.save()), r.nextLine();
                } else o.text.length <= e.options.maxHighlightLength && et(e, o.text, r), (o.stateAfter = r.line % 5 == 0 ? r.save() : null), r.nextLine();
                if (+new Date() > n) return xr(e, e.options.workDelay), !0;
            }),
                (t.highlightFrontier = r.line),
                (t.modeFrontier = Math.max(t.modeFrontier, r.line)),
                i.length &&
                    hr(e, function () {
                        for (var t = 0; t < i.length; t++) vr(e, i[t], "text");
                    });
        }
    }
    function Sr(e) {
        var t = e.display;
        !t.scrollbarsClipped &&
            t.scroller.offsetWidth &&
            ((t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth),
            (t.heightForcer.style.height = Ut(e) + "px"),
            (t.sizer.style.marginBottom = -t.nativeBarWidth + "px"),
            (t.sizer.style.borderRightWidth = Ut(e) + "px"),
            (t.scrollbarsClipped = !0));
    }
    function Lr(e) {
        if (e.hasFocus()) return null;
        var t = l();
        if (!t || !o(e.display.lineDiv, t)) return null;
        var n = { activeElt: t };
        if (window.getSelection) {
            var r = window.getSelection();
            r.anchorNode && r.extend && o(e.display.lineDiv, r.anchorNode) && ((n.anchorNode = r.anchorNode), (n.anchorOffset = r.anchorOffset), (n.focusNode = r.focusNode), (n.focusOffset = r.focusOffset));
        }
        return n;
    }
    function kr(e) {
        if (e && e.activeElt && e.activeElt != l() && (e.activeElt.focus(), e.anchorNode && o(document.body, e.anchorNode) && o(document.body, e.focusNode))) {
            var t = window.getSelection(),
                n = document.createRange();
            n.setEnd(e.anchorNode, e.anchorOffset), n.collapse(!1), t.removeAllRanges(), t.addRange(n), t.extend(e.focusNode, e.focusOffset);
        }
    }
    function Mr(e, n) {
        var r = e.display,
            i = e.doc;
        if (n.editorIsHidden) return mr(e), !1;
        if (!n.force && n.visible.from >= r.viewFrom && n.visible.to <= r.viewTo && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) && r.renderedView == r.view && 0 == wr(e)) return !1;
        zn(e) && (mr(e), (n.dims = wn(e)));
        var o = i.first + i.size,
            l = Math.max(n.visible.from - e.options.viewportMargin, i.first),
            s = Math.min(o, n.visible.to + e.options.viewportMargin);
        r.viewFrom < l && l - r.viewFrom < 20 && (l = Math.max(i.first, r.viewFrom)), r.viewTo > s && r.viewTo - s < 20 && (s = Math.min(o, r.viewTo)), Ul && ((l = pe(e.doc, l)), (s = ge(e.doc, s)));
        var a = l != r.viewFrom || s != r.viewTo || r.lastWrapHeight != n.wrapperHeight || r.lastWrapWidth != n.wrapperWidth;
        br(e, l, s), (r.viewOffset = ye(T(e.doc, r.viewFrom))), (e.display.mover.style.top = r.viewOffset + "px");
        var u = wr(e);
        if (!a && 0 == u && !n.force && r.renderedView == r.view && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)) return !1;
        var c = Lr(e);
        return (
            u > 4 && (r.lineDiv.style.display = "none"),
            Or(e, r.updateLineNumbers, n.dims),
            u > 4 && (r.lineDiv.style.display = ""),
            (r.renderedView = r.view),
            kr(c),
            t(r.cursorDiv),
            t(r.selectionDiv),
            (r.gutters.style.height = r.sizer.style.minHeight = 0),
            a && ((r.lastWrapHeight = n.wrapperHeight), (r.lastWrapWidth = n.wrapperWidth), xr(e, 400)),
            (r.updateLineNumbers = null),
            !0
        );
    }
    function Tr(e, t) {
        for (
            var n = t.viewport, r = !0;
            ((r && e.options.lineWrapping && t.oldDisplayWidth != Vt(e)) ||
                (n && null != n.top && (n = { top: Math.min(e.doc.height + Bt(e.display) - Kt(e), n.top) }), (t.visible = In(e.display, e.doc, n)), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) &&
            Mr(e, t);
            r = !1
        ) {
            En(e);
            var i = Jn(e);
            Mn(e), er(e, i), Wr(e, i), (t.force = !1);
        }
        t.signal(e, "update", e),
            (e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo) ||
                (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), (e.display.reportedViewFrom = e.display.viewFrom), (e.display.reportedViewTo = e.display.viewTo));
    }
    function Nr(e, t) {
        var n = new vs(e, t);
        if (Mr(e, n)) {
            En(e), Tr(e, n);
            var r = Jn(e);
            Mn(e), er(e, r), Wr(e, r), n.finish();
        }
    }
    function Or(e, n, r) {
        function i(t) {
            var n = t.nextSibling;
            return hl && xl && e.display.currentWheelTarget == t ? (t.style.display = "none") : t.parentNode.removeChild(t), n;
        }
        for (var o = e.display, l = e.options.lineNumbers, s = o.lineDiv, a = s.firstChild, u = o.view, c = o.viewFrom, h = 0; h < u.length; h++) {
            var d = u[h];
            if (d.hidden);
            else if (d.node && d.node.parentNode == s) {
                for (; a != d.node; ) a = i(a);
                var p = l && null != n && n <= c && d.lineNumber;
                d.changes && (f(d.changes, "gutter") > -1 && (p = !1), kt(e, d, c, r)), p && (t(d.lineNumber), d.lineNumber.appendChild(document.createTextNode(F(e.options, c)))), (a = d.node.nextSibling);
            } else {
                var g = Ht(e, d, c, r);
                s.insertBefore(g, a);
            }
            c += d.size;
        }
        for (; a; ) a = i(a);
    }
    function Ar(e) {
        var t = e.display.gutters.offsetWidth;
        e.display.sizer.style.marginLeft = t + "px";
    }
    function Wr(e, t) {
        (e.display.sizer.style.minHeight = t.docHeight + "px"), (e.display.heightForcer.style.top = t.docHeight + "px"), (e.display.gutters.style.height = t.docHeight + e.display.barHeight + Ut(e) + "px");
    }
    function Dr(e) {
        var n = e.display.gutters,
            i = e.options.gutters;
        t(n);
        for (var o = 0; o < i.length; ++o) {
            var l = i[o],
                s = n.appendChild(r("div", null, "CodeMirror-gutter " + l));
            "CodeMirror-linenumbers" == l && ((e.display.lineGutter = s), (s.style.width = (e.display.lineNumWidth || 1) + "px"));
        }
        (n.style.display = o ? "" : "none"), Ar(e);
    }
    function Hr(e) {
        var t = f(e.gutters, "CodeMirror-linenumbers");
        -1 == t && e.lineNumbers ? (e.gutters = e.gutters.concat(["CodeMirror-linenumbers"])) : t > -1 && !e.lineNumbers && ((e.gutters = e.gutters.slice(0)), e.gutters.splice(t, 1));
    }
    function Fr(e) {
        var t = e.wheelDeltaX,
            n = e.wheelDeltaY;
        return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? (n = e.detail) : null == n && (n = e.wheelDelta), { x: t, y: n };
    }
    function Er(e) {
        var t = Fr(e);
        return (t.x *= ys), (t.y *= ys), t;
    }
    function Pr(e, t) {
        var n = Fr(t),
            r = n.x,
            i = n.y,
            o = e.display,
            l = o.scroller,
            s = l.scrollWidth > l.clientWidth,
            a = l.scrollHeight > l.clientHeight;
        if ((r && s) || (i && a)) {
            if (i && xl && hl)
                e: for (var u = t.target, c = o.view; u != l; u = u.parentNode)
                    for (var h = 0; h < c.length; h++)
                        if (c[h].node == u) {
                            e.display.currentWheelTarget = u;
                            break e;
                        }
            if (r && !ol && !pl && null != ys) return i && a && qn(e, Math.max(0, l.scrollTop + i * ys)), Qn(e, Math.max(0, l.scrollLeft + r * ys)), (!i || (i && a)) && Ee(t), void (o.wheelStartX = null);
            if (i && null != ys) {
                var f = i * ys,
                    d = e.doc.scrollTop,
                    p = d + o.wrapper.clientHeight;
                f < 0 ? (d = Math.max(0, d + f - 50)) : (p = Math.min(e.doc.height, p + f + 50)), Nr(e, { top: d, bottom: p });
            }
            ms < 20 &&
                (null == o.wheelStartX
                    ? ((o.wheelStartX = l.scrollLeft),
                      (o.wheelStartY = l.scrollTop),
                      (o.wheelDX = r),
                      (o.wheelDY = i),
                      setTimeout(function () {
                          if (null != o.wheelStartX) {
                              var e = l.scrollLeft - o.wheelStartX,
                                  t = l.scrollTop - o.wheelStartY,
                                  n = (t && o.wheelDY && t / o.wheelDY) || (e && o.wheelDX && e / o.wheelDX);
                              (o.wheelStartX = o.wheelStartY = null), n && ((ys = (ys * ms + n) / (ms + 1)), ++ms);
                          }
                      }, 200))
                    : ((o.wheelDX += r), (o.wheelDY += i)));
        }
    }
    function Ir(e, t) {
        var n = e[t];
        e.sort(function (e, t) {
            return P(e.from(), t.from());
        }),
            (t = f(e, n));
        for (var r = 1; r < e.length; r++) {
            var i = e[r],
                o = e[r - 1];
            if (P(o.to(), i.from()) >= 0) {
                var l = B(o.from(), i.from()),
                    s = z(o.to(), i.to()),
                    a = o.empty() ? i.from() == i.head : o.from() == o.head;
                r <= t && --t, e.splice(--r, 2, new ws(a ? s : l, a ? l : s));
            }
        }
        return new bs(e, t);
    }
    function Rr(e, t) {
        return new bs([new ws(e, t || e)], 0);
    }
    function zr(e) {
        return e.text ? E(e.from.line + e.text.length - 1, g(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to;
    }
    function Br(e, t) {
        if (P(e, t.from) < 0) return e;
        if (P(e, t.to) <= 0) return zr(t);
        var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            r = e.ch;
        return e.line == t.to.line && (r += zr(t).ch - t.to.ch), E(n, r);
    }
    function Gr(e, t) {
        for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
            var i = e.sel.ranges[r];
            n.push(new ws(Br(i.anchor, t), Br(i.head, t)));
        }
        return Ir(n, e.sel.primIndex);
    }
    function Ur(e, t, n) {
        return e.line == t.line ? E(n.line, e.ch - t.ch + n.ch) : E(n.line + (e.line - t.line), e.ch);
    }
    function Vr(e, t, n) {
        for (var r = [], i = E(e.first, 0), o = i, l = 0; l < t.length; l++) {
            var s = t[l],
                a = Ur(s.from, i, o),
                u = Ur(zr(s), i, o);
            if (((i = s.to), (o = u), "around" == n)) {
                var c = e.sel.ranges[l],
                    h = P(c.head, c.anchor) < 0;
                r[l] = new ws(h ? u : a, h ? a : u);
            } else r[l] = new ws(a, a);
        }
        return new bs(r, e.sel.primIndex);
    }
    function Kr(e) {
        (e.doc.mode = Xe(e.options, e.doc.modeOption)), jr(e);
    }
    function jr(e) {
        e.doc.iter(function (e) {
            e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null);
        }),
            (e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first),
            xr(e, 100),
            e.state.modeGen++,
            e.curOp && gr(e);
    }
    function Xr(e, t) {
        return 0 == t.from.ch && 0 == t.to.ch && "" == g(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore);
    }
    function Yr(e, t, n, r) {
        function i(e) {
            return n ? n[e] : null;
        }
        function o(e, n, i) {
            at(e, n, i, r), St(e, "change", e, t);
        }
        function l(e, t) {
            for (var n = [], o = e; o < t; ++o) n.push(new os(u[o], i(o), r));
            return n;
        }
        var s = t.from,
            a = t.to,
            u = t.text,
            c = T(e, s.line),
            h = T(e, a.line),
            f = g(u),
            d = i(u.length - 1),
            p = a.line - s.line;
        if (t.full) e.insert(0, l(0, u.length)), e.remove(u.length, e.size - u.length);
        else if (Xr(e, t)) {
            var v = l(0, u.length - 1);
            o(h, h.text, d), p && e.remove(s.line, p), v.length && e.insert(s.line, v);
        } else if (c == h)
            if (1 == u.length) o(c, c.text.slice(0, s.ch) + f + c.text.slice(a.ch), d);
            else {
                var m = l(1, u.length - 1);
                m.push(new os(f + c.text.slice(a.ch), d, r)), o(c, c.text.slice(0, s.ch) + u[0], i(0)), e.insert(s.line + 1, m);
            }
        else if (1 == u.length) o(c, c.text.slice(0, s.ch) + u[0] + h.text.slice(a.ch), i(0)), e.remove(s.line + 1, p);
        else {
            o(c, c.text.slice(0, s.ch) + u[0], i(0)), o(h, f + h.text.slice(a.ch), d);
            var y = l(1, u.length - 1);
            p > 1 && e.remove(s.line + 1, p - 1), e.insert(s.line + 1, y);
        }
        St(e, "change", e, t);
    }
    function _r(e, t, n) {
        function r(e, i, o) {
            if (e.linked)
                for (var l = 0; l < e.linked.length; ++l) {
                    var s = e.linked[l];
                    if (s.doc != i) {
                        var a = o && s.sharedHist;
                        (n && !a) || (t(s.doc, a), r(s.doc, e, a));
                    }
                }
        }
        r(e, null, !0);
    }
    function $r(e, t) {
        if (t.cm) throw new Error("This document is already in use.");
        (e.doc = t), (t.cm = e), Sn(e), Kr(e), qr(e), e.options.lineWrapping || we(e), (e.options.mode = t.modeOption), gr(e);
    }
    function qr(e) {
        ("rtl" == e.doc.direction ? s : Nl)(e.display.lineDiv, "CodeMirror-rtl");
    }
    function Zr(e) {
        hr(e, function () {
            qr(e), gr(e);
        });
    }
    function Qr(e) {
        (this.done = []),
            (this.undone = []),
            (this.undoDepth = 1 / 0),
            (this.lastModTime = this.lastSelTime = 0),
            (this.lastOp = this.lastSelOp = null),
            (this.lastOrigin = this.lastSelOrigin = null),
            (this.generation = this.maxGeneration = e || 1);
    }
    function Jr(e, t) {
        var n = { from: R(t.from), to: zr(t), text: N(e, t.from, t.to) };
        return (
            li(e, n, t.from.line, t.to.line + 1),
            _r(
                e,
                function (e) {
                    return li(e, n, t.from.line, t.to.line + 1);
                },
                !0
            ),
            n
        );
    }
    function ei(e) {
        for (; e.length && g(e).ranges; ) e.pop();
    }
    function ti(e, t) {
        return t ? (ei(e.done), g(e.done)) : e.done.length && !g(e.done).ranges ? g(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), g(e.done)) : void 0;
    }
    function ni(e, t, n, r) {
        var i = e.history;
        i.undone.length = 0;
        var o,
            l,
            s = +new Date();
        if ((i.lastOp == r || (i.lastOrigin == t.origin && t.origin && (("+" == t.origin.charAt(0) && e.cm && i.lastModTime > s - e.cm.options.historyEventDelay) || "*" == t.origin.charAt(0)))) && (o = ti(i, i.lastOp == r)))
            (l = g(o.changes)), 0 == P(t.from, t.to) && 0 == P(t.from, l.to) ? (l.to = zr(t)) : o.changes.push(Jr(e, t));
        else {
            var a = g(i.done);
            for ((a && a.ranges) || oi(e.sel, i.done), o = { changes: [Jr(e, t)], generation: i.generation }, i.done.push(o); i.done.length > i.undoDepth; ) i.done.shift(), i.done[0].ranges || i.done.shift();
        }
        i.done.push(n), (i.generation = ++i.maxGeneration), (i.lastModTime = i.lastSelTime = s), (i.lastOp = i.lastSelOp = r), (i.lastOrigin = i.lastSelOrigin = t.origin), l || Ae(e, "historyAdded");
    }
    function ri(e, t, n, r) {
        var i = t.charAt(0);
        return "*" == i || ("+" == i && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500));
    }
    function ii(e, t, n, r) {
        var i = e.history,
            o = r && r.origin;
        n == i.lastSelOp || (o && i.lastSelOrigin == o && ((i.lastModTime == i.lastSelTime && i.lastOrigin == o) || ri(e, o, g(i.done), t))) ? (i.done[i.done.length - 1] = t) : oi(t, i.done),
            (i.lastSelTime = +new Date()),
            (i.lastSelOrigin = o),
            (i.lastSelOp = n),
            r && !1 !== r.clearRedo && ei(i.undone);
    }
    function oi(e, t) {
        var n = g(t);
        (n && n.ranges && n.equals(e)) || t.push(e);
    }
    function li(e, t, n, r) {
        var i = t["spans_" + e.id],
            o = 0;
        e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function (n) {
            n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o;
        });
    }
    function si(e) {
        if (!e) return null;
        for (var t, n = 0; n < e.length; ++n) e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
        return t ? (t.length ? t : null) : e;
    }
    function ai(e, t) {
        var n = t["spans_" + e.id];
        if (!n) return null;
        for (var r = [], i = 0; i < t.text.length; ++i) r.push(si(n[i]));
        return r;
    }
    function ui(e, t) {
        var n = ai(e, t),
            r = J(e, t);
        if (!n) return r;
        if (!r) return n;
        for (var i = 0; i < n.length; ++i) {
            var o = n[i],
                l = r[i];
            if (o && l)
                e: for (var s = 0; s < l.length; ++s) {
                    for (var a = l[s], u = 0; u < o.length; ++u) if (o[u].marker == a.marker) continue e;
                    o.push(a);
                }
            else l && (n[i] = l);
        }
        return n;
    }
    function ci(e, t, n) {
        for (var r = [], i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.ranges) r.push(n ? bs.prototype.deepCopy.call(o) : o);
            else {
                var l = o.changes,
                    s = [];
                r.push({ changes: s });
                for (var a = 0; a < l.length; ++a) {
                    var u = l[a],
                        c = void 0;
                    if ((s.push({ from: u.from, to: u.to, text: u.text }), t)) for (var h in u) (c = h.match(/^spans_(\d+)$/)) && f(t, Number(c[1])) > -1 && ((g(s)[h] = u[h]), delete u[h]);
                }
            }
        }
        return r;
    }
    function hi(e, t, n, r) {
        if (r) {
            var i = e.anchor;
            if (n) {
                var o = P(t, i) < 0;
                o != P(n, i) < 0 ? ((i = t), (t = n)) : o != P(t, n) < 0 && (t = n);
            }
            return new ws(i, t);
        }
        return new ws(n || t, t);
    }
    function fi(e, t, n, r, i) {
        null == i && (i = e.cm && (e.cm.display.shift || e.extend)), yi(e, new bs([hi(e.sel.primary(), t, n, i)], 0), r);
    }
    function di(e, t, n) {
        for (var r = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++) r[o] = hi(e.sel.ranges[o], t[o], null, i);
        yi(e, Ir(r, e.sel.primIndex), n);
    }
    function pi(e, t, n, r) {
        var i = e.sel.ranges.slice(0);
        (i[t] = n), yi(e, Ir(i, e.sel.primIndex), r);
    }
    function gi(e, t, n, r) {
        yi(e, Rr(t, n), r);
    }
    function vi(e, t, n) {
        var r = {
            ranges: t.ranges,
            update: function (t) {
                var n = this;
                this.ranges = [];
                for (var r = 0; r < t.length; r++) n.ranges[r] = new ws(U(e, t[r].anchor), U(e, t[r].head));
            },
            origin: n && n.origin,
        };
        return Ae(e, "beforeSelectionChange", e, r), e.cm && Ae(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? Ir(r.ranges, r.ranges.length - 1) : t;
    }
    function mi(e, t, n) {
        var r = e.history.done,
            i = g(r);
        i && i.ranges ? ((r[r.length - 1] = t), bi(e, t, n)) : yi(e, t, n);
    }
    function yi(e, t, n) {
        bi(e, t, n), ii(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n);
    }
    function bi(e, t, n) {
        (He(e, "beforeSelectionChange") || (e.cm && He(e.cm, "beforeSelectionChange"))) && (t = vi(e, t, n)),
            wi(e, Ci(e, t, (n && n.bias) || (P(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1), !0)),
            (n && !1 === n.scroll) || !e.cm || jn(e.cm);
    }
    function wi(e, t) {
        t.equals(e.sel) || ((e.sel = t), e.cm && ((e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0), De(e.cm)), St(e, "cursorActivity", e));
    }
    function xi(e) {
        wi(e, Ci(e, e.sel, null, !1));
    }
    function Ci(e, t, n, r) {
        for (var i, o = 0; o < t.ranges.length; o++) {
            var l = t.ranges[o],
                s = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                a = Li(e, l.anchor, s && s.anchor, n, r),
                u = Li(e, l.head, s && s.head, n, r);
            (i || a != l.anchor || u != l.head) && (i || (i = t.ranges.slice(0, o)), (i[o] = new ws(a, u)));
        }
        return i ? Ir(i, t.primIndex) : t;
    }
    function Si(e, t, n, r, i) {
        var o = T(e, t.line);
        if (o.markedSpans)
            for (var l = 0; l < o.markedSpans.length; ++l) {
                var s = o.markedSpans[l],
                    a = s.marker;
                if ((null == s.from || (a.inclusiveLeft ? s.from <= t.ch : s.from < t.ch)) && (null == s.to || (a.inclusiveRight ? s.to >= t.ch : s.to > t.ch))) {
                    if (i && (Ae(a, "beforeCursorEnter"), a.explicitlyCleared)) {
                        if (o.markedSpans) {
                            --l;
                            continue;
                        }
                        break;
                    }
                    if (!a.atomic) continue;
                    if (n) {
                        var u = a.find(r < 0 ? 1 : -1),
                            c = void 0;
                        if (((r < 0 ? a.inclusiveRight : a.inclusiveLeft) && (u = ki(e, u, -r, u && u.line == t.line ? o : null)), u && u.line == t.line && (c = P(u, n)) && (r < 0 ? c < 0 : c > 0))) return Si(e, u, t, r, i);
                    }
                    var h = a.find(r < 0 ? -1 : 1);
                    return (r < 0 ? a.inclusiveLeft : a.inclusiveRight) && (h = ki(e, h, r, h.line == t.line ? o : null)), h ? Si(e, h, t, r, i) : null;
                }
            }
        return t;
    }
    function Li(e, t, n, r, i) {
        var o = r || 1,
            l = Si(e, t, n, o, i) || (!i && Si(e, t, n, o, !0)) || Si(e, t, n, -o, i) || (!i && Si(e, t, n, -o, !0));
        return l || ((e.cantEdit = !0), E(e.first, 0));
    }
    function ki(e, t, n, r) {
        return n < 0 && 0 == t.ch ? (t.line > e.first ? U(e, E(t.line - 1)) : null) : n > 0 && t.ch == (r || T(e, t.line)).text.length ? (t.line < e.first + e.size - 1 ? E(t.line + 1, 0) : null) : new E(t.line, t.ch + n);
    }
    function Mi(e) {
        e.setSelection(E(e.firstLine(), 0), E(e.lastLine()), El);
    }
    function Ti(e, t, n) {
        var r = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function () {
                return (r.canceled = !0);
            },
        };
        return (
            n &&
                (r.update = function (t, n, i, o) {
                    t && (r.from = U(e, t)), n && (r.to = U(e, n)), i && (r.text = i), void 0 !== o && (r.origin = o);
                }),
            Ae(e, "beforeChange", e, r),
            e.cm && Ae(e.cm, "beforeChange", e.cm, r),
            r.canceled ? null : { from: r.from, to: r.to, text: r.text, origin: r.origin }
        );
    }
    function Ni(e, t, n) {
        if (e.cm) {
            if (!e.cm.curOp) return fr(e.cm, Ni)(e, t, n);
            if (e.cm.state.suppressEdits) return;
        }
        if (!(He(e, "beforeChange") || (e.cm && He(e.cm, "beforeChange"))) || (t = Ti(e, t, !0))) {
            var r = Gl && !n && te(e, t.from, t.to);
            if (r) for (var i = r.length - 1; i >= 0; --i) Oi(e, { from: r[i].from, to: r[i].to, text: i ? [""] : t.text });
            else Oi(e, t);
        }
    }
    function Oi(e, t) {
        if (1 != t.text.length || "" != t.text[0] || 0 != P(t.from, t.to)) {
            var n = Gr(e, t);
            ni(e, t, n, e.cm ? e.cm.curOp.id : NaN), Di(e, t, n, J(e, t));
            var r = [];
            _r(e, function (e, n) {
                n || -1 != f(r, e.history) || (Ii(e.history, t), r.push(e.history)), Di(e, t, null, J(e, t));
            });
        }
    }
    function Ai(e, t, n) {
        if (!e.cm || !e.cm.state.suppressEdits || n) {
            for (var r, i = e.history, o = e.sel, l = "undo" == t ? i.done : i.undone, s = "undo" == t ? i.undone : i.done, a = 0; a < l.length && ((r = l[a]), n ? !r.ranges || r.equals(e.sel) : r.ranges); a++);
            if (a != l.length) {
                for (i.lastOrigin = i.lastSelOrigin = null; (r = l.pop()).ranges; ) {
                    if ((oi(r, s), n && !r.equals(e.sel))) return void yi(e, r, { clearRedo: !1 });
                    o = r;
                }
                var u = [];
                oi(o, s), s.push({ changes: u, generation: i.generation }), (i.generation = r.generation || ++i.maxGeneration);
                for (var c = He(e, "beforeChange") || (e.cm && He(e.cm, "beforeChange")), h = r.changes.length - 1; h >= 0; --h) {
                    var d = (function (n) {
                        var i = r.changes[n];
                        if (((i.origin = t), c && !Ti(e, i, !1))) return (l.length = 0), {};
                        u.push(Jr(e, i));
                        var o = n ? Gr(e, i) : g(l);
                        Di(e, i, o, ui(e, i)), !n && e.cm && e.cm.scrollIntoView({ from: i.from, to: zr(i) });
                        var s = [];
                        _r(e, function (e, t) {
                            t || -1 != f(s, e.history) || (Ii(e.history, i), s.push(e.history)), Di(e, i, null, ui(e, i));
                        });
                    })(h);
                    if (d) return d.v;
                }
            }
        }
    }
    function Wi(e, t) {
        if (
            0 != t &&
            ((e.first += t),
            (e.sel = new bs(
                v(e.sel.ranges, function (e) {
                    return new ws(E(e.anchor.line + t, e.anchor.ch), E(e.head.line + t, e.head.ch));
                }),
                e.sel.primIndex
            )),
            e.cm)
        ) {
            gr(e.cm, e.first, e.first - t, t);
            for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++) vr(e.cm, r, "gutter");
        }
    }
    function Di(e, t, n, r) {
        if (e.cm && !e.cm.curOp) return fr(e.cm, Di)(e, t, n, r);
        if (t.to.line < e.first) Wi(e, t.text.length - 1 - (t.to.line - t.from.line));
        else if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);
                Wi(e, i), (t = { from: E(e.first, 0), to: E(t.to.line + i, t.to.ch), text: [g(t.text)], origin: t.origin });
            }
            var o = e.lastLine();
            t.to.line > o && (t = { from: t.from, to: E(o, T(e, o).text.length), text: [t.text[0]], origin: t.origin }), (t.removed = N(e, t.from, t.to)), n || (n = Gr(e, t)), e.cm ? Hi(e.cm, t, r) : Yr(e, t, r), bi(e, n, El);
        }
    }
    function Hi(e, t, n) {
        var r = e.doc,
            i = e.display,
            o = t.from,
            l = t.to,
            s = !1,
            a = o.line;
        e.options.lineWrapping ||
            ((a = W(he(T(r, o.line)))),
            r.iter(a, l.line + 1, function (e) {
                if (e == i.maxLine) return (s = !0), !0;
            })),
            r.sel.contains(t.from, t.to) > -1 && De(e),
            Yr(r, t, n, Cn(e)),
            e.options.lineWrapping ||
                (r.iter(a, o.line + t.text.length, function (e) {
                    var t = be(e);
                    t > i.maxLineLength && ((i.maxLine = e), (i.maxLineLength = t), (i.maxLineChanged = !0), (s = !1));
                }),
                s && (e.curOp.updateMaxLine = !0)),
            st(r, o.line),
            xr(e, 400);
        var u = t.text.length - (l.line - o.line) - 1;
        t.full ? gr(e) : o.line != l.line || 1 != t.text.length || Xr(e.doc, t) ? gr(e, o.line, l.line + 1, u) : vr(e, o.line, "text");
        var c = He(e, "changes"),
            h = He(e, "change");
        if (h || c) {
            var f = { from: o, to: l, text: t.text, removed: t.removed, origin: t.origin };
            h && St(e, "change", e, f), c && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(f);
        }
        e.display.selForContextMenu = null;
    }
    function Fi(e, t, n, r, i) {
        if ((r || (r = n), P(r, n) < 0)) {
            var o = r;
            (r = n), (n = o);
        }
        "string" == typeof t && (t = e.splitLines(t)), Ni(e, { from: n, to: r, text: t, origin: i });
    }
    function Ei(e, t, n, r) {
        n < e.line ? (e.line += r) : t < e.line && ((e.line = t), (e.ch = 0));
    }
    function Pi(e, t, n, r) {
        for (var i = 0; i < e.length; ++i) {
            var o = e[i],
                l = !0;
            if (o.ranges) {
                o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
                for (var s = 0; s < o.ranges.length; s++) Ei(o.ranges[s].anchor, t, n, r), Ei(o.ranges[s].head, t, n, r);
            } else {
                for (var a = 0; a < o.changes.length; ++a) {
                    var u = o.changes[a];
                    if (n < u.from.line) (u.from = E(u.from.line + r, u.from.ch)), (u.to = E(u.to.line + r, u.to.ch));
                    else if (t <= u.to.line) {
                        l = !1;
                        break;
                    }
                }
                l || (e.splice(0, i + 1), (i = 0));
            }
        }
    }
    function Ii(e, t) {
        var n = t.from.line,
            r = t.to.line,
            i = t.text.length - (r - n) - 1;
        Pi(e.done, n, r, i), Pi(e.undone, n, r, i);
    }
    function Ri(e, t, n, r) {
        var i = t,
            o = t;
        return "number" == typeof t ? (o = T(e, G(e, t))) : (i = W(t)), null == i ? null : (r(o, i) && e.cm && vr(e.cm, i, n), o);
    }
    function zi(e) {
        var t = this;
        (this.lines = e), (this.parent = null);
        for (var n = 0, r = 0; r < e.length; ++r) (e[r].parent = t), (n += e[r].height);
        this.height = n;
    }
    function Bi(e) {
        var t = this;
        this.children = e;
        for (var n = 0, r = 0, i = 0; i < e.length; ++i) {
            var o = e[i];
            (n += o.chunkSize()), (r += o.height), (o.parent = t);
        }
        (this.size = n), (this.height = r), (this.parent = null);
    }
    function Gi(e, t, n) {
        ye(t) < ((e.curOp && e.curOp.scrollTop) || e.doc.scrollTop) && Kn(e, n);
    }
    function Ui(e, t, n, r) {
        var i = new xs(e, n, r),
            o = e.cm;
        return (
            o && i.noHScroll && (o.display.alignWidgets = !0),
            Ri(e, t, "widget", function (t) {
                var n = t.widgets || (t.widgets = []);
                if ((null == i.insertAt ? n.push(i) : n.splice(Math.min(n.length - 1, Math.max(0, i.insertAt)), 0, i), (i.line = t), o && !ve(e, t))) {
                    var r = ye(t) < e.scrollTop;
                    A(t, t.height + It(i)), r && Kn(o, i.height), (o.curOp.forceUpdate = !0);
                }
                return !0;
            }),
            St(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : W(t)),
            i
        );
    }
    function Vi(e, t, n, r, o) {
        if (r && r.shared) return Ki(e, t, n, r, o);
        if (e.cm && !e.cm.curOp) return fr(e.cm, Vi)(e, t, n, r, o);
        var l = new Ss(e, o),
            s = P(t, n);
        if ((r && c(r, l, !1), s > 0 || (0 == s && !1 !== l.clearWhenEmpty))) return l;
        if (
            (l.replacedWith &&
                ((l.collapsed = !0), (l.widgetNode = i("span", [l.replacedWith], "CodeMirror-widget")), r.handleMouseEvents || l.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (l.widgetNode.insertLeft = !0)),
            l.collapsed)
        ) {
            if (ce(e, t.line, t, n, l) || (t.line != n.line && ce(e, n.line, t, n, l))) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            X();
        }
        l.addToHistory && ni(e, { from: t, to: n, origin: "markText" }, e.sel, NaN);
        var a,
            u = t.line,
            h = e.cm;
        if (
            (e.iter(u, n.line + 1, function (e) {
                h && l.collapsed && !h.options.lineWrapping && he(e) == h.display.maxLine && (a = !0), l.collapsed && u != t.line && A(e, 0), q(e, new Y(l, u == t.line ? t.ch : null, u == n.line ? n.ch : null)), ++u;
            }),
            l.collapsed &&
                e.iter(t.line, n.line + 1, function (t) {
                    ve(e, t) && A(t, 0);
                }),
            l.clearOnEnter &&
                Xl(l, "beforeCursorEnter", function () {
                    return l.clear();
                }),
            l.readOnly && (j(), (e.history.done.length || e.history.undone.length) && e.clearHistory()),
            l.collapsed && ((l.id = ++Cs), (l.atomic = !0)),
            h)
        ) {
            if ((a && (h.curOp.updateMaxLine = !0), l.collapsed)) gr(h, t.line, n.line + 1);
            else if (l.className || l.title || l.startStyle || l.endStyle || l.css) for (var f = t.line; f <= n.line; f++) vr(h, f, "text");
            l.atomic && xi(h.doc), St(h, "markerAdded", h, l);
        }
        return l;
    }
    function Ki(e, t, n, r, i) {
        (r = c(r)).shared = !1;
        var o = [Vi(e, t, n, r, i)],
            l = o[0],
            s = r.widgetNode;
        return (
            _r(e, function (e) {
                s && (r.widgetNode = s.cloneNode(!0)), o.push(Vi(e, U(e, t), U(e, n), r, i));
                for (var a = 0; a < e.linked.length; ++a) if (e.linked[a].isParent) return;
                l = g(o);
            }),
            new Ls(o, l)
        );
    }
    function ji(e) {
        return e.findMarks(E(e.first, 0), e.clipPos(E(e.lastLine())), function (e) {
            return e.parent;
        });
    }
    function Xi(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n],
                i = r.find(),
                o = e.clipPos(i.from),
                l = e.clipPos(i.to);
            if (P(o, l)) {
                var s = Vi(e, o, l, r.primary, r.primary.type);
                r.markers.push(s), (s.parent = r);
            }
        }
    }
    function Yi(e) {
        for (var t = 0; t < e.length; t++)
            !(function (t) {
                var n = e[t],
                    r = [n.primary.doc];
                _r(n.primary.doc, function (e) {
                    return r.push(e);
                });
                for (var i = 0; i < n.markers.length; i++) {
                    var o = n.markers[i];
                    -1 == f(r, o.doc) && ((o.parent = null), n.markers.splice(i--, 1));
                }
            })(t);
    }
    function _i(e) {
        var t = this;
        if ((Zi(t), !We(t, e) && !Rt(t.display, e))) {
            Ee(e), ul && (Ts = +new Date());
            var n = Ln(t, e, !0),
                r = e.dataTransfer.files;
            if (n && !t.isReadOnly())
                if (r && r.length && window.FileReader && window.File)
                    for (var i = r.length, o = Array(i), l = 0, s = 0; s < i; ++s)
                        !(function (e, r) {
                            if (!t.options.allowDropFileTypes || -1 != f(t.options.allowDropFileTypes, e.type)) {
                                var s = new FileReader();
                                (s.onload = fr(t, function () {
                                    var e = s.result;
                                    if ((/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), (o[r] = e), ++l == i)) {
                                        var a = { from: (n = U(t.doc, n)), to: n, text: t.doc.splitLines(o.join(t.doc.lineSeparator())), origin: "paste" };
                                        Ni(t.doc, a), mi(t.doc, Rr(n, zr(a)));
                                    }
                                })),
                                    s.readAsText(e);
                            }
                        })(r[s], s);
                else {
                    if (t.state.draggingText && t.doc.sel.contains(n) > -1)
                        return (
                            t.state.draggingText(e),
                            void setTimeout(function () {
                                return t.display.input.focus();
                            }, 20)
                        );
                    try {
                        var a = e.dataTransfer.getData("Text");
                        if (a) {
                            var u;
                            if ((t.state.draggingText && !t.state.draggingText.copy && (u = t.listSelections()), bi(t.doc, Rr(n, n)), u)) for (var c = 0; c < u.length; ++c) Fi(t.doc, "", u[c].anchor, u[c].head, "drag");
                            t.replaceSelection(a, "around", "paste"), t.display.input.focus();
                        }
                    } catch (e) {}
                }
        }
    }
    function $i(e, t) {
        if (ul && (!e.state.draggingText || +new Date() - Ts < 100)) Re(t);
        else if (!We(e, t) && !Rt(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), (t.dataTransfer.effectAllowed = "copyMove"), t.dataTransfer.setDragImage && !gl)) {
            var n = r("img", null, null, "position: fixed; left: 0; top: 0;");
            (n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                pl && ((n.width = n.height = 1), e.display.wrapper.appendChild(n), (n._top = n.offsetTop)),
                t.dataTransfer.setDragImage(n, 0, 0),
                pl && n.parentNode.removeChild(n);
        }
    }
    function qi(e, t) {
        var i = Ln(e, t);
        if (i) {
            var o = document.createDocumentFragment();
            Nn(e, i, o),
                e.display.dragCursor || ((e.display.dragCursor = r("div", null, "CodeMirror-cursors CodeMirror-dragcursors")), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)),
                n(e.display.dragCursor, o);
        }
    }
    function Zi(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), (e.display.dragCursor = null));
    }
    function Qi(e) {
        if (document.getElementsByClassName)
            for (var t = document.getElementsByClassName("CodeMirror"), n = 0; n < t.length; n++) {
                var r = t[n].CodeMirror;
                r && e(r);
            }
    }
    function Ji() {
        Ns || (eo(), (Ns = !0));
    }
    function eo() {
        var e;
        Xl(window, "resize", function () {
            null == e &&
                (e = setTimeout(function () {
                    (e = null), Qi(to);
                }, 100));
        }),
            Xl(window, "blur", function () {
                return Qi(Fn);
            });
    }
    function to(e) {
        var t = e.display;
        (t.lastWrapHeight == t.wrapper.clientHeight && t.lastWrapWidth == t.wrapper.clientWidth) || ((t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null), (t.scrollbarsClipped = !1), e.setSize());
    }
    function no(e) {
        var t = e.split(/-(?!$)/);
        e = t[t.length - 1];
        for (var n, r, i, o, l = 0; l < t.length - 1; l++) {
            var s = t[l];
            if (/^(cmd|meta|m)$/i.test(s)) o = !0;
            else if (/^a(lt)?$/i.test(s)) n = !0;
            else if (/^(c|ctrl|control)$/i.test(s)) r = !0;
            else {
                if (!/^s(hift)?$/i.test(s)) throw new Error("Unrecognized modifier name: " + s);
                i = !0;
            }
        }
        return n && (e = "Alt-" + e), r && (e = "Ctrl-" + e), o && (e = "Cmd-" + e), i && (e = "Shift-" + e), e;
    }
    function ro(e) {
        var t = {};
        for (var n in e)
            if (e.hasOwnProperty(n)) {
                var r = e[n];
                if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue;
                if ("..." == r) {
                    delete e[n];
                    continue;
                }
                for (var i = v(n.split(" "), no), o = 0; o < i.length; o++) {
                    var l = void 0,
                        s = void 0;
                    o == i.length - 1 ? ((s = i.join(" ")), (l = r)) : ((s = i.slice(0, o + 1).join(" ")), (l = "..."));
                    var a = t[s];
                    if (a) {
                        if (a != l) throw new Error("Inconsistent bindings for " + s);
                    } else t[s] = l;
                }
                delete e[n];
            }
        for (var u in t) e[u] = t[u];
        return e;
    }
    function io(e, t, n, r) {
        var i = (t = ao(t)).call ? t.call(e, r) : t[e];
        if (!1 === i) return "nothing";
        if ("..." === i) return "multi";
        if (null != i && n(i)) return "handled";
        if (t.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return io(e, t.fallthrough, n, r);
            for (var o = 0; o < t.fallthrough.length; o++) {
                var l = io(e, t.fallthrough[o], n, r);
                if (l) return l;
            }
        }
    }
    function oo(e) {
        var t = "string" == typeof e ? e : Os[e.keyCode];
        return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
    }
    function lo(e, t, n) {
        var r = e;
        return (
            t.altKey && "Alt" != r && (e = "Alt-" + e),
            (Ml ? t.metaKey : t.ctrlKey) && "Ctrl" != r && (e = "Ctrl-" + e),
            (Ml ? t.ctrlKey : t.metaKey) && "Cmd" != r && (e = "Cmd-" + e),
            !n && t.shiftKey && "Shift" != r && (e = "Shift-" + e),
            e
        );
    }
    function so(e, t) {
        if (pl && 34 == e.keyCode && e.char) return !1;
        var n = Os[e.keyCode];
        return null != n && !e.altGraphKey && lo(n, e, t);
    }
    function ao(e) {
        return "string" == typeof e ? Hs[e] : e;
    }
    function uo(e, t) {
        for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
            for (var o = t(n[i]); r.length && P(o.from, g(r).to) <= 0; ) {
                var l = r.pop();
                if (P(l.from, o.from) < 0) {
                    o.from = l.from;
                    break;
                }
            }
            r.push(o);
        }
        hr(e, function () {
            for (var t = r.length - 1; t >= 0; t--) Fi(e.doc, "", r[t].from, r[t].to, "+delete");
            jn(e);
        });
    }
    function co(e, t) {
        var n = T(e.doc, t),
            r = he(n);
        return r != n && (t = W(r)), Me(!0, e, r, t, 1);
    }
    function ho(e, t) {
        var n = T(e.doc, t),
            r = fe(n);
        return r != n && (t = W(r)), Me(!0, e, n, t, -1);
    }
    function fo(e, t) {
        var n = co(e, t.line),
            r = T(e.doc, n.line),
            i = Se(r, e.doc.direction);
        if (!i || 0 == i[0].level) {
            var o = Math.max(0, r.text.search(/\S/)),
                l = t.line == n.line && t.ch <= o && t.ch;
            return E(n.line, l ? 0 : o, n.sticky);
        }
        return n;
    }
    function po(e, t, n) {
        if ("string" == typeof t && !(t = Fs[t])) return !1;
        e.display.input.ensurePolled();
        var r = e.display.shift,
            i = !1;
        try {
            e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), (i = t(e) != Fl);
        } finally {
            (e.display.shift = r), (e.state.suppressEdits = !1);
        }
        return i;
    }
    function go(e, t, n) {
        for (var r = 0; r < e.state.keyMaps.length; r++) {
            var i = io(t, e.state.keyMaps[r], n, e);
            if (i) return i;
        }
        return (e.options.extraKeys && io(t, e.options.extraKeys, n, e)) || io(t, e.options.keyMap, n, e);
    }
    function vo(e, t, n, r) {
        var i = e.state.keySeq;
        if (i) {
            if (oo(t)) return "handled";
            Es.set(50, function () {
                e.state.keySeq == i && ((e.state.keySeq = null), e.display.input.reset());
            }),
                (t = i + " " + t);
        }
        var o = go(e, t, r);
        return "multi" == o && (e.state.keySeq = t), "handled" == o && St(e, "keyHandled", e, t, n), ("handled" != o && "multi" != o) || (Ee(n), An(e)), i && !o && /\'$/.test(t) ? (Ee(n), !0) : !!o;
    }
    function mo(e, t) {
        var n = so(t, !0);
        return (
            !!n &&
            (t.shiftKey && !e.state.keySeq
                ? vo(e, "Shift-" + n, t, function (t) {
                      return po(e, t, !0);
                  }) ||
                  vo(e, n, t, function (t) {
                      if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return po(e, t);
                  })
                : vo(e, n, t, function (t) {
                      return po(e, t);
                  }))
        );
    }
    function yo(e, t, n) {
        return vo(e, "'" + n + "'", t, function (t) {
            return po(e, t, !0);
        });
    }
    function bo(e) {
        var t = this;
        if (((t.curOp.focus = l()), !We(t, e))) {
            ul && cl < 11 && 27 == e.keyCode && (e.returnValue = !1);
            var n = e.keyCode;
            t.display.shift = 16 == n || e.shiftKey;
            var r = mo(t, e);
            pl && ((Ps = r ? n : null), !r && 88 == n && !ql && (xl ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), 18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || wo(t);
        }
    }
    function wo(e) {
        function t(e) {
            (18 != e.keyCode && e.altKey) || (Nl(n, "CodeMirror-crosshair"), Oe(document, "keyup", t), Oe(document, "mouseover", t));
        }
        var n = e.display.lineDiv;
        s(n, "CodeMirror-crosshair"), Xl(document, "keyup", t), Xl(document, "mouseover", t);
    }
    function xo(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1), We(this, e);
    }
    function Co(e) {
        var t = this;
        if (!(Rt(t.display, e) || We(t, e) || (e.ctrlKey && !e.altKey) || (xl && e.metaKey))) {
            var n = e.keyCode,
                r = e.charCode;
            if (pl && n == Ps) return (Ps = null), void Ee(e);
            if (!pl || (e.which && !(e.which < 10)) || !mo(t, e)) {
                var i = String.fromCharCode(null == r ? n : r);
                "\b" != i && (yo(t, e, i) || t.display.input.onKeyPress(e));
            }
        }
    }
    function So(e, t) {
        var n = +new Date();
        return zs && zs.compare(n, e, t) ? ((Rs = zs = null), "triple") : Rs && Rs.compare(n, e, t) ? ((zs = new Is(n, e, t)), (Rs = null), "double") : ((Rs = new Is(n, e, t)), (zs = null), "single");
    }
    function Lo(e) {
        var t = this,
            n = t.display;
        if (!(We(t, e) || (n.activeTouch && n.input.supportsTouch())))
            if ((n.input.ensurePolled(), (n.shift = e.shiftKey), Rt(n, e)))
                hl ||
                    ((n.scroller.draggable = !1),
                    setTimeout(function () {
                        return (n.scroller.draggable = !0);
                    }, 100));
            else if (!Do(t, e)) {
                var r = Ln(t, e),
                    i = Be(e),
                    o = r ? So(r, i) : "single";
                window.focus(),
                    1 == i && t.state.selectingText && t.state.selectingText(e),
                    (r && ko(t, i, r, o, e)) ||
                        (1 == i
                            ? r
                                ? To(t, r, o, e)
                                : ze(e) == n.scroller && Ee(e)
                            : 2 == i
                            ? (r && fi(t.doc, r),
                              setTimeout(function () {
                                  return n.input.focus();
                              }, 20))
                            : 3 == i && (Tl ? Ho(t, e) : Dn(t)));
            }
    }
    function ko(e, t, n, r, i) {
        var o = "Click";
        return (
            "double" == r ? (o = "Double" + o) : "triple" == r && (o = "Triple" + o),
            (o = (1 == t ? "Left" : 2 == t ? "Middle" : "Right") + o),
            vo(e, lo(o, i), i, function (t) {
                if (("string" == typeof t && (t = Fs[t]), !t)) return !1;
                var r = !1;
                try {
                    e.isReadOnly() && (e.state.suppressEdits = !0), (r = t(e, n) != Fl);
                } finally {
                    e.state.suppressEdits = !1;
                }
                return r;
            })
        );
    }
    function Mo(e, t, n) {
        var r = e.getOption("configureMouse"),
            i = r ? r(e, t, n) : {};
        if (null == i.unit) {
            var o = Cl ? n.shiftKey && n.metaKey : n.altKey;
            i.unit = o ? "rectangle" : "single" == t ? "char" : "double" == t ? "word" : "line";
        }
        return (null == i.extend || e.doc.extend) && (i.extend = e.doc.extend || n.shiftKey), null == i.addNew && (i.addNew = xl ? n.metaKey : n.ctrlKey), null == i.moveOnDrag && (i.moveOnDrag = !(xl ? n.altKey : n.ctrlKey)), i;
    }
    function To(e, t, n, r) {
        ul ? setTimeout(u(Wn, e), 0) : (e.curOp.focus = l());
        var i,
            o = Mo(e, n, r),
            s = e.doc.sel;
        e.options.dragDrop && Yl && !e.isReadOnly() && "single" == n && (i = s.contains(t)) > -1 && (P((i = s.ranges[i]).from(), t) < 0 || t.xRel > 0) && (P(i.to(), t) > 0 || t.xRel < 0) ? No(e, r, t, o) : Ao(e, r, t, o);
    }
    function No(e, t, n, r) {
        var i = e.display,
            o = !1,
            l = fr(e, function (t) {
                hl && (i.scroller.draggable = !1),
                    (e.state.draggingText = !1),
                    Oe(document, "mouseup", l),
                    Oe(document, "mousemove", s),
                    Oe(i.scroller, "dragstart", a),
                    Oe(i.scroller, "drop", l),
                    o ||
                        (Ee(t),
                        r.addNew || fi(e.doc, n, null, null, r.extend),
                        hl || (ul && 9 == cl)
                            ? setTimeout(function () {
                                  document.body.focus(), i.input.focus();
                              }, 20)
                            : i.input.focus());
            }),
            s = function (e) {
                o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10;
            },
            a = function () {
                return (o = !0);
            };
        hl && (i.scroller.draggable = !0),
            (e.state.draggingText = l),
            (l.copy = !r.moveOnDrag),
            i.scroller.dragDrop && i.scroller.dragDrop(),
            Xl(document, "mouseup", l),
            Xl(document, "mousemove", s),
            Xl(i.scroller, "dragstart", a),
            Xl(i.scroller, "drop", l),
            Dn(e),
            setTimeout(function () {
                return i.input.focus();
            }, 20);
    }
    function Oo(e, t, n) {
        if ("char" == n) return new ws(t, t);
        if ("word" == n) return e.findWordAt(t);
        if ("line" == n) return new ws(E(t.line, 0), U(e.doc, E(t.line + 1, 0)));
        var r = n(e, t);
        return new ws(r.from, r.to);
    }
    function Ao(e, t, n, r) {
        function i(t) {
            if (0 != P(m, t))
                if (((m = t), "rectangle" == r.unit)) {
                    for (
                        var i = [],
                            o = e.options.tabSize,
                            l = h(T(u, n.line).text, n.ch, o),
                            s = h(T(u, t.line).text, t.ch, o),
                            a = Math.min(l, s),
                            g = Math.max(l, s),
                            v = Math.min(n.line, t.line),
                            y = Math.min(e.lastLine(), Math.max(n.line, t.line));
                        v <= y;
                        v++
                    ) {
                        var b = T(u, v).text,
                            w = d(b, a, o);
                        a == g ? i.push(new ws(E(v, w), E(v, w))) : b.length > w && i.push(new ws(E(v, w), E(v, d(b, g, o))));
                    }
                    i.length || i.push(new ws(n, n)), yi(u, Ir(p.ranges.slice(0, f).concat(i), f), { origin: "*mouse", scroll: !1 }), e.scrollIntoView(t);
                } else {
                    var x,
                        C = c,
                        S = Oo(e, t, r.unit),
                        L = C.anchor;
                    P(S.anchor, L) > 0 ? ((x = S.head), (L = B(C.from(), S.anchor))) : ((x = S.anchor), (L = z(C.to(), S.head)));
                    var k = p.ranges.slice(0);
                    (k[f] = new ws(U(u, L), x)), yi(u, Ir(k, f), Pl);
                }
        }
        function o(t) {
            var n = ++b,
                s = Ln(e, t, !0, "rectangle" == r.unit);
            if (s)
                if (0 != P(s, m)) {
                    (e.curOp.focus = l()), i(s);
                    var c = In(a, u);
                    (s.line >= c.to || s.line < c.from) &&
                        setTimeout(
                            fr(e, function () {
                                b == n && o(t);
                            }),
                            150
                        );
                } else {
                    var h = t.clientY < y.top ? -20 : t.clientY > y.bottom ? 20 : 0;
                    h &&
                        setTimeout(
                            fr(e, function () {
                                b == n && ((a.scroller.scrollTop += h), o(t));
                            }),
                            50
                        );
                }
        }
        function s(t) {
            (e.state.selectingText = !1), (b = 1 / 0), Ee(t), a.input.focus(), Oe(document, "mousemove", w), Oe(document, "mouseup", x), (u.history.lastSelOrigin = null);
        }
        var a = e.display,
            u = e.doc;
        Ee(t);
        var c,
            f,
            p = u.sel,
            g = p.ranges;
        if ((r.addNew && !r.extend ? ((f = u.sel.contains(n)), (c = f > -1 ? g[f] : new ws(n, n))) : ((c = u.sel.primary()), (f = u.sel.primIndex)), "rectangle" == r.unit)) r.addNew || (c = new ws(n, n)), (n = Ln(e, t, !0, !0)), (f = -1);
        else {
            var v = Oo(e, n, r.unit);
            c = r.extend ? hi(c, v.anchor, v.head, r.extend) : v;
        }
        r.addNew
            ? -1 == f
                ? ((f = g.length), yi(u, Ir(g.concat([c]), f), { scroll: !1, origin: "*mouse" }))
                : g.length > 1 && g[f].empty() && "char" == r.unit && !r.extend
                ? (yi(u, Ir(g.slice(0, f).concat(g.slice(f + 1)), 0), { scroll: !1, origin: "*mouse" }), (p = u.sel))
                : pi(u, f, c, Pl)
            : ((f = 0), yi(u, new bs([c], 0), Pl), (p = u.sel));
        var m = n,
            y = a.wrapper.getBoundingClientRect(),
            b = 0,
            w = fr(e, function (e) {
                Be(e) ? o(e) : s(e);
            }),
            x = fr(e, s);
        (e.state.selectingText = x), Xl(document, "mousemove", w), Xl(document, "mouseup", x);
    }
    function Wo(e, t, n, r) {
        var i, o;
        try {
            (i = t.clientX), (o = t.clientY);
        } catch (t) {
            return !1;
        }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
        r && Ee(t);
        var l = e.display,
            s = l.lineDiv.getBoundingClientRect();
        if (o > s.bottom || !He(e, n)) return Ie(t);
        o -= s.top - l.viewOffset;
        for (var a = 0; a < e.options.gutters.length; ++a) {
            var u = l.gutters.childNodes[a];
            if (u && u.getBoundingClientRect().right >= i) return Ae(e, n, e, D(e.doc, o), e.options.gutters[a], t), Ie(t);
        }
    }
    function Do(e, t) {
        return Wo(e, t, "gutterClick", !0);
    }
    function Ho(e, t) {
        Rt(e.display, t) || Fo(e, t) || We(e, t, "contextmenu") || e.display.input.onContextMenu(t);
    }
    function Fo(e, t) {
        return !!He(e, "gutterContextMenu") && Wo(e, t, "gutterContextMenu", !1);
    }
    function Eo(e) {
        (e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-")), on(e);
    }
    function Po(e) {
        Dr(e), gr(e), Rn(e);
    }
    function Io(e, t, n) {
        if (!t != !(n && n != Bs)) {
            var r = e.display.dragFunctions,
                i = t ? Xl : Oe;
            i(e.display.scroller, "dragstart", r.start), i(e.display.scroller, "dragenter", r.enter), i(e.display.scroller, "dragover", r.over), i(e.display.scroller, "dragleave", r.leave), i(e.display.scroller, "drop", r.drop);
        }
    }
    function Ro(e) {
        e.options.lineWrapping ? (s(e.display.wrapper, "CodeMirror-wrap"), (e.display.sizer.style.minWidth = ""), (e.display.sizerWidth = null)) : (Nl(e.display.wrapper, "CodeMirror-wrap"), we(e)),
            Sn(e),
            gr(e),
            on(e),
            setTimeout(function () {
                return er(e);
            }, 100);
    }
    function zo(e, t) {
        var n = this;
        if (!(this instanceof zo)) return new zo(e, t);
        (this.options = t = t ? c(t) : {}), c(Gs, t, !1), Hr(t);
        var r = t.value;
        "string" == typeof r && (r = new Ms(r, t.mode, null, t.lineSeparator, t.direction)), (this.doc = r);
        var i = new zo.inputStyles[t.inputStyle](this),
            o = (this.display = new M(e, r, i));
        (o.wrapper.CodeMirror = this),
            Dr(this),
            Eo(this),
            t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"),
            nr(this),
            (this.state = {
                keyMaps: [],
                overlays: [],
                modeGen: 0,
                overwrite: !1,
                delayingBlurEvent: !1,
                focused: !1,
                suppressEdits: !1,
                pasteIncoming: !1,
                cutIncoming: !1,
                selectingText: !1,
                draggingText: !1,
                highlight: new Al(),
                keySeq: null,
                specialChars: null,
            }),
            t.autofocus && !wl && o.input.focus(),
            ul &&
                cl < 11 &&
                setTimeout(function () {
                    return n.display.input.reset(!0);
                }, 20),
            Bo(this),
            Ji(),
            rr(this),
            (this.curOp.forceUpdate = !0),
            $r(this, r),
            (t.autofocus && !wl) || this.hasFocus() ? setTimeout(u(Hn, this), 20) : Fn(this);
        for (var l in Us) Us.hasOwnProperty(l) && Us[l](n, t[l], Bs);
        zn(this), t.finishInit && t.finishInit(this);
        for (var s = 0; s < Vs.length; ++s) Vs[s](n);
        ir(this), hl && t.lineWrapping && "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering && (o.lineDiv.style.textRendering = "auto");
    }
    function Bo(e) {
        function t() {
            i.activeTouch &&
                ((o = setTimeout(function () {
                    return (i.activeTouch = null);
                }, 1e3)),
                ((l = i.activeTouch).end = +new Date()));
        }
        function n(e) {
            if (1 != e.touches.length) return !1;
            var t = e.touches[0];
            return t.radiusX <= 1 && t.radiusY <= 1;
        }
        function r(e, t) {
            if (null == t.left) return !0;
            var n = t.left - e.left,
                r = t.top - e.top;
            return n * n + r * r > 400;
        }
        var i = e.display;
        Xl(i.scroller, "mousedown", fr(e, Lo)),
            ul && cl < 11
                ? Xl(
                      i.scroller,
                      "dblclick",
                      fr(e, function (t) {
                          if (!We(e, t)) {
                              var n = Ln(e, t);
                              if (n && !Do(e, t) && !Rt(e.display, t)) {
                                  Ee(t);
                                  var r = e.findWordAt(n);
                                  fi(e.doc, r.anchor, r.head);
                              }
                          }
                      })
                  )
                : Xl(i.scroller, "dblclick", function (t) {
                      return We(e, t) || Ee(t);
                  }),
            Tl ||
                Xl(i.scroller, "contextmenu", function (t) {
                    return Ho(e, t);
                });
        var o,
            l = { end: 0 };
        Xl(i.scroller, "touchstart", function (t) {
            if (!We(e, t) && !n(t)) {
                i.input.ensurePolled(), clearTimeout(o);
                var r = +new Date();
                (i.activeTouch = { start: r, moved: !1, prev: r - l.end <= 300 ? l : null }), 1 == t.touches.length && ((i.activeTouch.left = t.touches[0].pageX), (i.activeTouch.top = t.touches[0].pageY));
            }
        }),
            Xl(i.scroller, "touchmove", function () {
                i.activeTouch && (i.activeTouch.moved = !0);
            }),
            Xl(i.scroller, "touchend", function (n) {
                var o = i.activeTouch;
                if (o && !Rt(i, n) && null != o.left && !o.moved && new Date() - o.start < 300) {
                    var l,
                        s = e.coordsChar(i.activeTouch, "page");
                    (l = !o.prev || r(o, o.prev) ? new ws(s, s) : !o.prev.prev || r(o, o.prev.prev) ? e.findWordAt(s) : new ws(E(s.line, 0), U(e.doc, E(s.line + 1, 0)))), e.setSelection(l.anchor, l.head), e.focus(), Ee(n);
                }
                t();
            }),
            Xl(i.scroller, "touchcancel", t),
            Xl(i.scroller, "scroll", function () {
                i.scroller.clientHeight && (qn(e, i.scroller.scrollTop), Qn(e, i.scroller.scrollLeft, !0), Ae(e, "scroll", e));
            }),
            Xl(i.scroller, "mousewheel", function (t) {
                return Pr(e, t);
            }),
            Xl(i.scroller, "DOMMouseScroll", function (t) {
                return Pr(e, t);
            }),
            Xl(i.wrapper, "scroll", function () {
                return (i.wrapper.scrollTop = i.wrapper.scrollLeft = 0);
            }),
            (i.dragFunctions = {
                enter: function (t) {
                    We(e, t) || Re(t);
                },
                over: function (t) {
                    We(e, t) || (qi(e, t), Re(t));
                },
                start: function (t) {
                    return $i(e, t);
                },
                drop: fr(e, _i),
                leave: function (t) {
                    We(e, t) || Zi(e);
                },
            });
        var s = i.input.getField();
        Xl(s, "keyup", function (t) {
            return xo.call(e, t);
        }),
            Xl(s, "keydown", fr(e, bo)),
            Xl(s, "keypress", fr(e, Co)),
            Xl(s, "focus", function (t) {
                return Hn(e, t);
            }),
            Xl(s, "blur", function (t) {
                return Fn(e, t);
            });
    }
    function Go(e, t, n, r) {
        var i,
            o = e.doc;
        null == n && (n = "add"), "smart" == n && (o.mode.indent ? (i = Je(e, t).state) : (n = "prev"));
        var l = e.options.tabSize,
            s = T(o, t),
            a = h(s.text, null, l);
        s.stateAfter && (s.stateAfter = null);
        var u,
            c = s.text.match(/^\s*/)[0];
        if (r || /\S/.test(s.text)) {
            if ("smart" == n && ((u = o.mode.indent(i, s.text.slice(c.length), s.text)) == Fl || u > 150)) {
                if (!r) return;
                n = "prev";
            }
        } else (u = 0), (n = "not");
        "prev" == n ? (u = t > o.first ? h(T(o, t - 1).text, null, l) : 0) : "add" == n ? (u = a + e.options.indentUnit) : "subtract" == n ? (u = a - e.options.indentUnit) : "number" == typeof n && (u = a + n), (u = Math.max(0, u));
        var f = "",
            d = 0;
        if (e.options.indentWithTabs) for (var g = Math.floor(u / l); g; --g) (d += l), (f += "\t");
        if ((d < u && (f += p(u - d)), f != c)) return Fi(o, f, E(t, 0), E(t, c.length), "+input"), (s.stateAfter = null), !0;
        for (var v = 0; v < o.sel.ranges.length; v++) {
            var m = o.sel.ranges[v];
            if (m.head.line == t && m.head.ch < c.length) {
                var y = E(t, c.length);
                pi(o, v, new ws(y, y));
                break;
            }
        }
    }
    function Uo(e) {
        Ks = e;
    }
    function Vo(e, t, n, r, i) {
        var o = e.doc;
        (e.display.shift = !1), r || (r = o.sel);
        var l = e.state.pasteIncoming || "paste" == i,
            s = _l(t),
            a = null;
        if (l && r.ranges.length > 1)
            if (Ks && Ks.text.join("\n") == t) {
                if (r.ranges.length % Ks.text.length == 0) {
                    a = [];
                    for (var u = 0; u < Ks.text.length; u++) a.push(o.splitLines(Ks.text[u]));
                }
            } else
                s.length == r.ranges.length &&
                    e.options.pasteLinesPerSelection &&
                    (a = v(s, function (e) {
                        return [e];
                    }));
        for (var c, h = r.ranges.length - 1; h >= 0; h--) {
            var f = r.ranges[h],
                d = f.from(),
                p = f.to();
            f.empty() && (n && n > 0 ? (d = E(d.line, d.ch - n)) : e.state.overwrite && !l ? (p = E(p.line, Math.min(T(o, p.line).text.length, p.ch + g(s).length))) : Ks && Ks.lineWise && Ks.text.join("\n") == t && (d = p = E(d.line, 0))),
                (c = e.curOp.updateInput);
            var m = { from: d, to: p, text: a ? a[h % a.length] : s, origin: i || (l ? "paste" : e.state.cutIncoming ? "cut" : "+input") };
            Ni(e.doc, m), St(e, "inputRead", e, m);
        }
        t && !l && jo(e, t), jn(e), (e.curOp.updateInput = c), (e.curOp.typing = !0), (e.state.pasteIncoming = e.state.cutIncoming = !1);
    }
    function Ko(e, t) {
        var n = e.clipboardData && e.clipboardData.getData("Text");
        if (n)
            return (
                e.preventDefault(),
                t.isReadOnly() ||
                    t.options.disableInput ||
                    hr(t, function () {
                        return Vo(t, n, 0, null, "paste");
                    }),
                !0
            );
    }
    function jo(e, t) {
        if (e.options.electricChars && e.options.smartIndent)
            for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
                var i = n.ranges[r];
                if (!(i.head.ch > 100 || (r && n.ranges[r - 1].head.line == i.head.line))) {
                    var o = e.getModeAt(i.head),
                        l = !1;
                    if (o.electricChars) {
                        for (var s = 0; s < o.electricChars.length; s++)
                            if (t.indexOf(o.electricChars.charAt(s)) > -1) {
                                l = Go(e, i.head.line, "smart");
                                break;
                            }
                    } else o.electricInput && o.electricInput.test(T(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = Go(e, i.head.line, "smart"));
                    l && St(e, "electricInput", e, i.head.line);
                }
            }
    }
    function Xo(e) {
        for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
            var i = e.doc.sel.ranges[r].head.line,
                o = { anchor: E(i, 0), head: E(i + 1, 0) };
            n.push(o), t.push(e.getRange(o.anchor, o.head));
        }
        return { text: t, ranges: n };
    }
    function Yo(e, t) {
        e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", !!t);
    }
    function _o() {
        var e = r("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
            t = r("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return hl ? (e.style.width = "1000px") : e.setAttribute("wrap", "off"), yl && (e.style.border = "1px solid black"), Yo(e), t;
    }
    function $o(e, t, n, r, i) {
        function o() {
            var r = t.line + n;
            return !(r < e.first || r >= e.first + e.size) && ((t = new E(r, t.ch, t.sticky)), (u = T(e, r)));
        }
        function l(r) {
            var l;
            if (null == (l = i ? Te(e.cm, u, t, n) : ke(u, t, n))) {
                if (r || !o()) return !1;
                t = Me(i, e.cm, u, t.line, n);
            } else t = l;
            return !0;
        }
        var s = t,
            a = n,
            u = T(e, t.line);
        if ("char" == r) l();
        else if ("column" == r) l(!0);
        else if ("word" == r || "group" == r)
            for (var c = null, h = "group" == r, f = e.cm && e.cm.getHelper(t, "wordChars"), d = !0; !(n < 0) || l(!d); d = !1) {
                var p = u.text.charAt(t.ch) || "\n",
                    g = x(p, f) ? "w" : h && "\n" == p ? "n" : !h || /\s/.test(p) ? null : "p";
                if ((!h || d || g || (g = "s"), c && c != g)) {
                    n < 0 && ((n = 1), l(), (t.sticky = "after"));
                    break;
                }
                if ((g && (c = g), n > 0 && !l(!d))) break;
            }
        var v = Li(e, t, s, a, !0);
        return I(s, v) && (v.hitSide = !0), v;
    }
    function qo(e, t, n, r) {
        var i,
            o = e.doc,
            l = t.left;
        if ("page" == r) {
            var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
                a = Math.max(s - 0.5 * yn(e.display), 3);
            i = (n > 0 ? t.bottom : t.top) + n * a;
        } else "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3);
        for (var u; (u = pn(e, l, i)).outside; ) {
            if (n < 0 ? i <= 0 : i >= o.height) {
                u.hitSide = !0;
                break;
            }
            i += 5 * n;
        }
        return u;
    }
    function Zo(e, t) {
        var n = $t(e, t.line);
        if (!n || n.hidden) return null;
        var r = T(e.doc, t.line),
            i = Xt(n, r, t.line),
            o = Se(r, e.doc.direction),
            l = "left";
        o && (l = Ce(o, t.ch) % 2 ? "right" : "left");
        var s = Qt(i.map, t.ch, l);
        return (s.offset = "right" == s.collapse ? s.end : s.start), s;
    }
    function Qo(e) {
        for (var t = e; t; t = t.parentNode) if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
        return !1;
    }
    function Jo(e, t) {
        return t && (e.bad = !0), e;
    }
    function el(e, t, n, r, i) {
        function o(e) {
            return function (t) {
                return t.id == e;
            };
        }
        function l() {
            c && ((u += h), (c = !1));
        }
        function s(e) {
            e && (l(), (u += e));
        }
        function a(t) {
            if (1 == t.nodeType) {
                var n = t.getAttribute("cm-text");
                if (null != n) return void s(n || t.textContent.replace(/\u200b/g, ""));
                var u,
                    f = t.getAttribute("cm-marker");
                if (f) {
                    var d = e.findMarks(E(r, 0), E(i + 1, 0), o(+f));
                    return void (d.length && (u = d[0].find()) && s(N(e.doc, u.from, u.to).join(h)));
                }
                if ("false" == t.getAttribute("contenteditable")) return;
                var p = /^(pre|div|p)$/i.test(t.nodeName);
                p && l();
                for (var g = 0; g < t.childNodes.length; g++) a(t.childNodes[g]);
                p && (c = !0);
            } else 3 == t.nodeType && s(t.nodeValue);
        }
        for (var u = "", c = !1, h = e.doc.lineSeparator(); a(t), t != n; ) t = t.nextSibling;
        return u;
    }
    function tl(e, t, n) {
        var r;
        if (t == e.display.lineDiv) {
            if (!(r = e.display.lineDiv.childNodes[n])) return Jo(e.clipPos(E(e.display.viewTo - 1)), !0);
            (t = null), (n = 0);
        } else
            for (r = t; ; r = r.parentNode) {
                if (!r || r == e.display.lineDiv) return null;
                if (r.parentNode && r.parentNode == e.display.lineDiv) break;
            }
        for (var i = 0; i < e.display.view.length; i++) {
            var o = e.display.view[i];
            if (o.node == r) return nl(o, t, n);
        }
    }
    function nl(e, t, n) {
        function r(t, n, r) {
            for (var i = -1; i < (h ? h.length : 0); i++)
                for (var o = i < 0 ? c.map : h[i], l = 0; l < o.length; l += 3) {
                    var s = o[l + 2];
                    if (s == t || s == n) {
                        var a = W(i < 0 ? e.line : e.rest[i]),
                            u = o[l] + r;
                        return (r < 0 || s != t) && (u = o[l + (r ? 1 : 0)]), E(a, u);
                    }
                }
        }
        var i = e.text.firstChild,
            l = !1;
        if (!t || !o(i, t)) return Jo(E(W(e.line), 0), !0);
        if (t == i && ((l = !0), (t = i.childNodes[n]), (n = 0), !t)) {
            var s = e.rest ? g(e.rest) : e.line;
            return Jo(E(W(s), s.text.length), l);
        }
        var a = 3 == t.nodeType ? t : null,
            u = t;
        for (a || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || ((a = t.firstChild), n && (n = a.nodeValue.length)); u.parentNode != i; ) u = u.parentNode;
        var c = e.measure,
            h = c.maps,
            f = r(a, u, n);
        if (f) return Jo(f, l);
        for (var d = u.nextSibling, p = a ? a.nodeValue.length - n : 0; d; d = d.nextSibling) {
            if ((f = r(d, d.firstChild, 0))) return Jo(E(f.line, f.ch - p), l);
            p += d.textContent.length;
        }
        for (var v = u.previousSibling, m = n; v; v = v.previousSibling) {
            if ((f = r(v, v.firstChild, -1))) return Jo(E(f.line, f.ch + m), l);
            m += v.textContent.length;
        }
    }
    var rl = navigator.userAgent,
        il = navigator.platform,
        ol = /gecko\/\d/i.test(rl),
        ll = /MSIE \d/.test(rl),
        sl = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(rl),
        al = /Edge\/(\d+)/.exec(rl),
        ul = ll || sl || al,
        cl = ul && (ll ? document.documentMode || 6 : +(al || sl)[1]),
        hl = !al && /WebKit\//.test(rl),
        fl = hl && /Qt\/\d+\.\d+/.test(rl),
        dl = !al && /Chrome\//.test(rl),
        pl = /Opera\//.test(rl),
        gl = /Apple Computer/.test(navigator.vendor),
        vl = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(rl),
        ml = /PhantomJS/.test(rl),
        yl = !al && /AppleWebKit/.test(rl) && /Mobile\/\w+/.test(rl),
        bl = /Android/.test(rl),
        wl = yl || bl || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(rl),
        xl = yl || /Mac/.test(il),
        Cl = /\bCrOS\b/.test(rl),
        Sl = /win/i.test(il),
        Ll = pl && rl.match(/Version\/(\d*\.\d*)/);
    Ll && (Ll = Number(Ll[1])), Ll && Ll >= 15 && ((pl = !1), (hl = !0));
    var kl,
        Ml = xl && (fl || (pl && (null == Ll || Ll < 12.11))),
        Tl = ol || (ul && cl >= 9),
        Nl = function (t, n) {
            var r = t.className,
                i = e(n).exec(r);
            if (i) {
                var o = r.slice(i.index + i[0].length);
                t.className = r.slice(0, i.index) + (o ? i[1] + o : "");
            }
        };
    kl = document.createRange
        ? function (e, t, n, r) {
              var i = document.createRange();
              return i.setEnd(r || e, n), i.setStart(e, t), i;
          }
        : function (e, t, n) {
              var r = document.body.createTextRange();
              try {
                  r.moveToElementText(e.parentNode);
              } catch (e) {
                  return r;
              }
              return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r;
          };
    var Ol = function (e) {
        e.select();
    };
    yl
        ? (Ol = function (e) {
              (e.selectionStart = 0), (e.selectionEnd = e.value.length);
          })
        : ul &&
          (Ol = function (e) {
              try {
                  e.select();
              } catch (e) {}
          });
    var Al = function () {
        this.id = null;
    };
    Al.prototype.set = function (e, t) {
        clearTimeout(this.id), (this.id = setTimeout(t, e));
    };
    var Wl,
        Dl,
        Hl = 30,
        Fl = {
            toString: function () {
                return "CodeMirror.Pass";
            },
        },
        El = { scroll: !1 },
        Pl = { origin: "*mouse" },
        Il = { origin: "+move" },
        Rl = [""],
        zl = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
        Bl = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
        Gl = !1,
        Ul = !1,
        Vl = null,
        Kl = (function () {
            function e(e) {
                return e <= 247 ? n.charAt(e) : 1424 <= e && e <= 1524 ? "R" : 1536 <= e && e <= 1785 ? r.charAt(e - 1536) : 1774 <= e && e <= 2220 ? "r" : 8192 <= e && e <= 8203 ? "w" : 8204 == e ? "b" : "L";
            }
            function t(e, t, n) {
                (this.level = e), (this.from = t), (this.to = n);
            }
            var n =
                    "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
                r =
                    "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111",
                i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                o = /[stwN]/,
                l = /[LRr]/,
                s = /[Lb1n]/,
                a = /[1n]/;
            return function (n, r) {
                var u = "ltr" == r ? "L" : "R";
                if (0 == n.length || ("ltr" == r && !i.test(n))) return !1;
                for (var c = n.length, h = [], f = 0; f < c; ++f) h.push(e(n.charCodeAt(f)));
                for (var d = 0, p = u; d < c; ++d) {
                    var v = h[d];
                    "m" == v ? (h[d] = p) : (p = v);
                }
                for (var m = 0, y = u; m < c; ++m) {
                    var b = h[m];
                    "1" == b && "r" == y ? (h[m] = "n") : l.test(b) && ((y = b), "r" == b && (h[m] = "R"));
                }
                for (var w = 1, x = h[0]; w < c - 1; ++w) {
                    var C = h[w];
                    "+" == C && "1" == x && "1" == h[w + 1] ? (h[w] = "1") : "," != C || x != h[w + 1] || ("1" != x && "n" != x) || (h[w] = x), (x = C);
                }
                for (var S = 0; S < c; ++S) {
                    var L = h[S];
                    if ("," == L) h[S] = "N";
                    else if ("%" == L) {
                        var k = void 0;
                        for (k = S + 1; k < c && "%" == h[k]; ++k);
                        for (var M = (S && "!" == h[S - 1]) || (k < c && "1" == h[k]) ? "1" : "N", T = S; T < k; ++T) h[T] = M;
                        S = k - 1;
                    }
                }
                for (var N = 0, O = u; N < c; ++N) {
                    var A = h[N];
                    "L" == O && "1" == A ? (h[N] = "L") : l.test(A) && (O = A);
                }
                for (var W = 0; W < c; ++W)
                    if (o.test(h[W])) {
                        var D = void 0;
                        for (D = W + 1; D < c && o.test(h[D]); ++D);
                        for (var H = "L" == (W ? h[W - 1] : u), F = H == ("L" == (D < c ? h[D] : u)) ? (H ? "L" : "R") : u, E = W; E < D; ++E) h[E] = F;
                        W = D - 1;
                    }
                for (var P, I = [], R = 0; R < c; )
                    if (s.test(h[R])) {
                        var z = R;
                        for (++R; R < c && s.test(h[R]); ++R);
                        I.push(new t(0, z, R));
                    } else {
                        var B = R,
                            G = I.length;
                        for (++R; R < c && "L" != h[R]; ++R);
                        for (var U = B; U < R; )
                            if (a.test(h[U])) {
                                B < U && I.splice(G, 0, new t(1, B, U));
                                var V = U;
                                for (++U; U < R && a.test(h[U]); ++U);
                                I.splice(G, 0, new t(2, V, U)), (B = U);
                            } else ++U;
                        B < R && I.splice(G, 0, new t(1, B, R));
                    }
                return (
                    1 == I[0].level && (P = n.match(/^\s+/)) && ((I[0].from = P[0].length), I.unshift(new t(0, 0, P[0].length))),
                    1 == g(I).level && (P = n.match(/\s+$/)) && ((g(I).to -= P[0].length), I.push(new t(0, c - P[0].length, c))),
                    "rtl" == r ? I.reverse() : I
                );
            };
        })(),
        jl = [],
        Xl = function (e, t, n) {
            if (e.addEventListener) e.addEventListener(t, n, !1);
            else if (e.attachEvent) e.attachEvent("on" + t, n);
            else {
                var r = e._handlers || (e._handlers = {});
                r[t] = (r[t] || jl).concat(n);
            }
        },
        Yl = (function () {
            if (ul && cl < 9) return !1;
            var e = r("div");
            return "draggable" in e || "dragDrop" in e;
        })(),
        _l =
            3 != "\n\nb".split(/\n/).length
                ? function (e) {
                      for (var t = 0, n = [], r = e.length; t <= r; ) {
                          var i = e.indexOf("\n", t);
                          -1 == i && (i = e.length);
                          var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                              l = o.indexOf("\r");
                          -1 != l ? (n.push(o.slice(0, l)), (t += l + 1)) : (n.push(o), (t = i + 1));
                      }
                      return n;
                  }
                : function (e) {
                      return e.split(/\r\n?|\n/);
                  },
        $l = window.getSelection
            ? function (e) {
                  try {
                      return e.selectionStart != e.selectionEnd;
                  } catch (e) {
                      return !1;
                  }
              }
            : function (e) {
                  var t;
                  try {
                      t = e.ownerDocument.selection.createRange();
                  } catch (e) {}
                  return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t);
              },
        ql = (function () {
            var e = r("div");
            return "oncopy" in e || (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy);
        })(),
        Zl = null,
        Ql = {},
        Jl = {},
        es = {},
        ts = function (e, t, n) {
            (this.pos = this.start = 0), (this.string = e), (this.tabSize = t || 8), (this.lastColumnPos = this.lastColumnValue = 0), (this.lineStart = 0), (this.lineOracle = n);
        };
    (ts.prototype.eol = function () {
        return this.pos >= this.string.length;
    }),
        (ts.prototype.sol = function () {
            return this.pos == this.lineStart;
        }),
        (ts.prototype.peek = function () {
            return this.string.charAt(this.pos) || void 0;
        }),
        (ts.prototype.next = function () {
            if (this.pos < this.string.length) return this.string.charAt(this.pos++);
        }),
        (ts.prototype.eat = function (e) {
            var t = this.string.charAt(this.pos);
            if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t;
        }),
        (ts.prototype.eatWhile = function (e) {
            for (var t = this.pos; this.eat(e); );
            return this.pos > t;
        }),
        (ts.prototype.eatSpace = function () {
            for (var e = this, t = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); ) ++e.pos;
            return this.pos > t;
        }),
        (ts.prototype.skipToEnd = function () {
            this.pos = this.string.length;
        }),
        (ts.prototype.skipTo = function (e) {
            var t = this.string.indexOf(e, this.pos);
            if (t > -1) return (this.pos = t), !0;
        }),
        (ts.prototype.backUp = function (e) {
            this.pos -= e;
        }),
        (ts.prototype.column = function () {
            return (
                this.lastColumnPos < this.start && ((this.lastColumnValue = h(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue)), (this.lastColumnPos = this.start)),
                this.lastColumnValue - (this.lineStart ? h(this.string, this.lineStart, this.tabSize) : 0)
            );
        }),
        (ts.prototype.indentation = function () {
            return h(this.string, null, this.tabSize) - (this.lineStart ? h(this.string, this.lineStart, this.tabSize) : 0);
        }),
        (ts.prototype.match = function (e, t, n) {
            if ("string" != typeof e) {
                var r = this.string.slice(this.pos).match(e);
                return r && r.index > 0 ? null : (r && !1 !== t && (this.pos += r[0].length), r);
            }
            var i = function (e) {
                return n ? e.toLowerCase() : e;
            };
            if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0;
        }),
        (ts.prototype.current = function () {
            return this.string.slice(this.start, this.pos);
        }),
        (ts.prototype.hideFirstChars = function (e, t) {
            this.lineStart += e;
            try {
                return t();
            } finally {
                this.lineStart -= e;
            }
        }),
        (ts.prototype.lookAhead = function (e) {
            var t = this.lineOracle;
            return t && t.lookAhead(e);
        });
    var ns = function (e, t) {
            (this.state = e), (this.lookAhead = t);
        },
        rs = function (e, t, n, r) {
            (this.state = t), (this.doc = e), (this.line = n), (this.maxLookAhead = r || 0);
        };
    (rs.prototype.lookAhead = function (e) {
        var t = this.doc.getLine(this.line + e);
        return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t;
    }),
        (rs.prototype.nextLine = function () {
            this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
        }),
        (rs.fromSaved = function (e, t, n) {
            return t instanceof ns ? new rs(e, _e(e.mode, t.state), n, t.lookAhead) : new rs(e, _e(e.mode, t), n);
        }),
        (rs.prototype.save = function (e) {
            var t = !1 !== e ? _e(this.doc.mode, this.state) : this.state;
            return this.maxLookAhead > 0 ? new ns(t, this.maxLookAhead) : t;
        });
    var is = function (e, t, n) {
            (this.start = e.start), (this.end = e.pos), (this.string = e.current()), (this.type = t || null), (this.state = n);
        },
        os = function (e, t, n) {
            (this.text = e), re(this, t), (this.height = n ? n(this) : 1);
        };
    (os.prototype.lineNo = function () {
        return W(this);
    }),
        Fe(os);
    var ls,
        ss = {},
        as = {},
        us = null,
        cs = null,
        hs = { left: 0, right: 0, top: 0, bottom: 0 },
        fs = function (e, t, n) {
            this.cm = n;
            var i = (this.vert = r("div", [r("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar")),
                o = (this.horiz = r("div", [r("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar"));
            e(i),
                e(o),
                Xl(i, "scroll", function () {
                    i.clientHeight && t(i.scrollTop, "vertical");
                }),
                Xl(o, "scroll", function () {
                    o.clientWidth && t(o.scrollLeft, "horizontal");
                }),
                (this.checkedZeroWidth = !1),
                ul && cl < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
        };
    (fs.prototype.update = function (e) {
        var t = e.scrollWidth > e.clientWidth + 1,
            n = e.scrollHeight > e.clientHeight + 1,
            r = e.nativeBarWidth;
        if (n) {
            (this.vert.style.display = "block"), (this.vert.style.bottom = t ? r + "px" : "0");
            var i = e.viewHeight - (t ? r : 0);
            this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
        } else (this.vert.style.display = ""), (this.vert.firstChild.style.height = "0");
        if (t) {
            (this.horiz.style.display = "block"), (this.horiz.style.right = n ? r + "px" : "0"), (this.horiz.style.left = e.barLeft + "px");
            var o = e.viewWidth - e.barLeft - (n ? r : 0);
            this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
        } else (this.horiz.style.display = ""), (this.horiz.firstChild.style.width = "0");
        return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == r && this.zeroWidthHack(), (this.checkedZeroWidth = !0)), { right: n ? r : 0, bottom: t ? r : 0 };
    }),
        (fs.prototype.setScrollLeft = function (e) {
            this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
        }),
        (fs.prototype.setScrollTop = function (e) {
            this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
        }),
        (fs.prototype.zeroWidthHack = function () {
            var e = xl && !vl ? "12px" : "18px";
            (this.horiz.style.height = this.vert.style.width = e), (this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none"), (this.disableHoriz = new Al()), (this.disableVert = new Al());
        }),
        (fs.prototype.enableZeroWidthBar = function (e, t, n) {
            function r() {
                var i = e.getBoundingClientRect();
                ("vert" == n ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? (e.style.pointerEvents = "none") : t.set(1e3, r);
            }
            (e.style.pointerEvents = "auto"), t.set(1e3, r);
        }),
        (fs.prototype.clear = function () {
            var e = this.horiz.parentNode;
            e.removeChild(this.horiz), e.removeChild(this.vert);
        });
    var ds = function () {};
    (ds.prototype.update = function () {
        return { bottom: 0, right: 0 };
    }),
        (ds.prototype.setScrollLeft = function () {}),
        (ds.prototype.setScrollTop = function () {}),
        (ds.prototype.clear = function () {});
    var ps = { native: fs, null: ds },
        gs = 0,
        vs = function (e, t, n) {
            var r = e.display;
            (this.viewport = t),
                (this.visible = In(r, e.doc, t)),
                (this.editorIsHidden = !r.wrapper.offsetWidth),
                (this.wrapperHeight = r.wrapper.clientHeight),
                (this.wrapperWidth = r.wrapper.clientWidth),
                (this.oldDisplayWidth = Vt(e)),
                (this.force = n),
                (this.dims = wn(e)),
                (this.events = []);
        };
    (vs.prototype.signal = function (e, t) {
        He(e, t) && this.events.push(arguments);
    }),
        (vs.prototype.finish = function () {
            for (var e = this, t = 0; t < this.events.length; t++) Ae.apply(null, e.events[t]);
        });
    var ms = 0,
        ys = null;
    ul ? (ys = -0.53) : ol ? (ys = 15) : dl ? (ys = -0.7) : gl && (ys = -1 / 3);
    var bs = function (e, t) {
        (this.ranges = e), (this.primIndex = t);
    };
    (bs.prototype.primary = function () {
        return this.ranges[this.primIndex];
    }),
        (bs.prototype.equals = function (e) {
            var t = this;
            if (e == this) return !0;
            if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
            for (var n = 0; n < this.ranges.length; n++) {
                var r = t.ranges[n],
                    i = e.ranges[n];
                if (!I(r.anchor, i.anchor) || !I(r.head, i.head)) return !1;
            }
            return !0;
        }),
        (bs.prototype.deepCopy = function () {
            for (var e = this, t = [], n = 0; n < this.ranges.length; n++) t[n] = new ws(R(e.ranges[n].anchor), R(e.ranges[n].head));
            return new bs(t, this.primIndex);
        }),
        (bs.prototype.somethingSelected = function () {
            for (var e = this, t = 0; t < this.ranges.length; t++) if (!e.ranges[t].empty()) return !0;
            return !1;
        }),
        (bs.prototype.contains = function (e, t) {
            var n = this;
            t || (t = e);
            for (var r = 0; r < this.ranges.length; r++) {
                var i = n.ranges[r];
                if (P(t, i.from()) >= 0 && P(e, i.to()) <= 0) return r;
            }
            return -1;
        });
    var ws = function (e, t) {
        (this.anchor = e), (this.head = t);
    };
    (ws.prototype.from = function () {
        return B(this.anchor, this.head);
    }),
        (ws.prototype.to = function () {
            return z(this.anchor, this.head);
        }),
        (ws.prototype.empty = function () {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
        }),
        (zi.prototype = {
            chunkSize: function () {
                return this.lines.length;
            },
            removeInner: function (e, t) {
                for (var n = this, r = e, i = e + t; r < i; ++r) {
                    var o = n.lines[r];
                    (n.height -= o.height), ut(o), St(o, "delete");
                }
                this.lines.splice(e, t);
            },
            collapse: function (e) {
                e.push.apply(e, this.lines);
            },
            insertInner: function (e, t, n) {
                var r = this;
                (this.height += n), (this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e)));
                for (var i = 0; i < t.length; ++i) t[i].parent = r;
            },
            iterN: function (e, t, n) {
                for (var r = this, i = e + t; e < i; ++e) if (n(r.lines[e])) return !0;
            },
        }),
        (Bi.prototype = {
            chunkSize: function () {
                return this.size;
            },
            removeInner: function (e, t) {
                var n = this;
                this.size -= t;
                for (var r = 0; r < this.children.length; ++r) {
                    var i = n.children[r],
                        o = i.chunkSize();
                    if (e < o) {
                        var l = Math.min(t, o - e),
                            s = i.height;
                        if ((i.removeInner(e, l), (n.height -= s - i.height), o == l && (n.children.splice(r--, 1), (i.parent = null)), 0 == (t -= l))) break;
                        e = 0;
                    } else e -= o;
                }
                if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof zi))) {
                    var a = [];
                    this.collapse(a), (this.children = [new zi(a)]), (this.children[0].parent = this);
                }
            },
            collapse: function (e) {
                for (var t = this, n = 0; n < this.children.length; ++n) t.children[n].collapse(e);
            },
            insertInner: function (e, t, n) {
                var r = this;
                (this.size += t.length), (this.height += n);
                for (var i = 0; i < this.children.length; ++i) {
                    var o = r.children[i],
                        l = o.chunkSize();
                    if (e <= l) {
                        if ((o.insertInner(e, t, n), o.lines && o.lines.length > 50)) {
                            for (var s = (o.lines.length % 25) + 25, a = s; a < o.lines.length; ) {
                                var u = new zi(o.lines.slice(a, (a += 25)));
                                (o.height -= u.height), r.children.splice(++i, 0, u), (u.parent = r);
                            }
                            (o.lines = o.lines.slice(0, s)), r.maybeSpill();
                        }
                        break;
                    }
                    e -= l;
                }
            },
            maybeSpill: function () {
                if (!(this.children.length <= 10)) {
                    var e = this;
                    do {
                        var t = new Bi(e.children.splice(e.children.length - 5, 5));
                        if (e.parent) {
                            (e.size -= t.size), (e.height -= t.height);
                            var n = f(e.parent.children, e);
                            e.parent.children.splice(n + 1, 0, t);
                        } else {
                            var r = new Bi(e.children);
                            (r.parent = e), (e.children = [r, t]), (e = r);
                        }
                        t.parent = e.parent;
                    } while (e.children.length > 10);
                    e.parent.maybeSpill();
                }
            },
            iterN: function (e, t, n) {
                for (var r = this, i = 0; i < this.children.length; ++i) {
                    var o = r.children[i],
                        l = o.chunkSize();
                    if (e < l) {
                        var s = Math.min(t, l - e);
                        if (o.iterN(e, s, n)) return !0;
                        if (0 == (t -= s)) break;
                        e = 0;
                    } else e -= l;
                }
            },
        });
    var xs = function (e, t, n) {
        var r = this;
        if (n) for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
        (this.doc = e), (this.node = t);
    };
    (xs.prototype.clear = function () {
        var e = this,
            t = this.doc.cm,
            n = this.line.widgets,
            r = this.line,
            i = W(r);
        if (null != i && n) {
            for (var o = 0; o < n.length; ++o) n[o] == e && n.splice(o--, 1);
            n.length || (r.widgets = null);
            var l = It(this);
            A(r, Math.max(0, r.height - l)),
                t &&
                    (hr(t, function () {
                        Gi(t, r, -l), vr(t, i, "widget");
                    }),
                    St(t, "lineWidgetCleared", t, this, i));
        }
    }),
        (xs.prototype.changed = function () {
            var e = this,
                t = this.height,
                n = this.doc.cm,
                r = this.line;
            this.height = null;
            var i = It(this) - t;
            i &&
                (A(r, r.height + i),
                n &&
                    hr(n, function () {
                        (n.curOp.forceUpdate = !0), Gi(n, r, i), St(n, "lineWidgetChanged", n, e, W(r));
                    }));
        }),
        Fe(xs);
    var Cs = 0,
        Ss = function (e, t) {
            (this.lines = []), (this.type = t), (this.doc = e), (this.id = ++Cs);
        };
    (Ss.prototype.clear = function () {
        var e = this;
        if (!this.explicitlyCleared) {
            var t = this.doc.cm,
                n = t && !t.curOp;
            if ((n && rr(t), He(this, "clear"))) {
                var r = this.find();
                r && St(this, "clear", r.from, r.to);
            }
            for (var i = null, o = null, l = 0; l < this.lines.length; ++l) {
                var s = e.lines[l],
                    a = _(s.markedSpans, e);
                t && !e.collapsed ? vr(t, W(s), "text") : t && (null != a.to && (o = W(s)), null != a.from && (i = W(s))), (s.markedSpans = $(s.markedSpans, a)), null == a.from && e.collapsed && !ve(e.doc, s) && t && A(s, yn(t.display));
            }
            if (t && this.collapsed && !t.options.lineWrapping)
                for (var u = 0; u < this.lines.length; ++u) {
                    var c = he(e.lines[u]),
                        h = be(c);
                    h > t.display.maxLineLength && ((t.display.maxLine = c), (t.display.maxLineLength = h), (t.display.maxLineChanged = !0));
                }
            null != i && t && this.collapsed && gr(t, i, o + 1),
                (this.lines.length = 0),
                (this.explicitlyCleared = !0),
                this.atomic && this.doc.cantEdit && ((this.doc.cantEdit = !1), t && xi(t.doc)),
                t && St(t, "markerCleared", t, this, i, o),
                n && ir(t),
                this.parent && this.parent.clear();
        }
    }),
        (Ss.prototype.find = function (e, t) {
            var n = this;
            null == e && "bookmark" == this.type && (e = 1);
            for (var r, i, o = 0; o < this.lines.length; ++o) {
                var l = n.lines[o],
                    s = _(l.markedSpans, n);
                if (null != s.from && ((r = E(t ? l : W(l), s.from)), -1 == e)) return r;
                if (null != s.to && ((i = E(t ? l : W(l), s.to)), 1 == e)) return i;
            }
            return r && { from: r, to: i };
        }),
        (Ss.prototype.changed = function () {
            var e = this,
                t = this.find(-1, !0),
                n = this,
                r = this.doc.cm;
            t &&
                r &&
                hr(r, function () {
                    var i = t.line,
                        o = W(t.line),
                        l = $t(r, o);
                    if ((l && (nn(l), (r.curOp.selectionChanged = r.curOp.forceUpdate = !0)), (r.curOp.updateMaxLine = !0), !ve(n.doc, i) && null != n.height)) {
                        var s = n.height;
                        n.height = null;
                        var a = It(n) - s;
                        a && A(i, i.height + a);
                    }
                    St(r, "markerChanged", r, e);
                });
        }),
        (Ss.prototype.attachLine = function (e) {
            if (!this.lines.length && this.doc.cm) {
                var t = this.doc.cm.curOp;
                (t.maybeHiddenMarkers && -1 != f(t.maybeHiddenMarkers, this)) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
            }
            this.lines.push(e);
        }),
        (Ss.prototype.detachLine = function (e) {
            if ((this.lines.splice(f(this.lines, e), 1), !this.lines.length && this.doc.cm)) {
                var t = this.doc.cm.curOp;
                (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
            }
        }),
        Fe(Ss);
    var Ls = function (e, t) {
        var n = this;
        (this.markers = e), (this.primary = t);
        for (var r = 0; r < e.length; ++r) e[r].parent = n;
    };
    (Ls.prototype.clear = function () {
        var e = this;
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var t = 0; t < this.markers.length; ++t) e.markers[t].clear();
            St(this, "clear");
        }
    }),
        (Ls.prototype.find = function (e, t) {
            return this.primary.find(e, t);
        }),
        Fe(Ls);
    var ks = 0,
        Ms = function (e, t, n, r, i) {
            if (!(this instanceof Ms)) return new Ms(e, t, n, r, i);
            null == n && (n = 0), Bi.call(this, [new zi([new os("", null)])]), (this.first = n), (this.scrollTop = this.scrollLeft = 0), (this.cantEdit = !1), (this.cleanGeneration = 1), (this.modeFrontier = this.highlightFrontier = n);
            var o = E(n, 0);
            (this.sel = Rr(o)),
                (this.history = new Qr(null)),
                (this.id = ++ks),
                (this.modeOption = t),
                (this.lineSep = r),
                (this.direction = "rtl" == i ? "rtl" : "ltr"),
                (this.extend = !1),
                "string" == typeof e && (e = this.splitLines(e)),
                Yr(this, { from: o, to: o, text: e }),
                yi(this, Rr(o), El);
        };
    (Ms.prototype = b(Bi.prototype, {
        constructor: Ms,
        iter: function (e, t, n) {
            n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e);
        },
        insert: function (e, t) {
            for (var n = 0, r = 0; r < t.length; ++r) n += t[r].height;
            this.insertInner(e - this.first, t, n);
        },
        remove: function (e, t) {
            this.removeInner(e - this.first, t);
        },
        getValue: function (e) {
            var t = O(this, this.first, this.first + this.size);
            return !1 === e ? t : t.join(e || this.lineSeparator());
        },
        setValue: pr(function (e) {
            var t = E(this.first, 0),
                n = this.first + this.size - 1;
            Ni(this, { from: t, to: E(n, T(this, n).text.length), text: this.splitLines(e), origin: "setValue", full: !0 }, !0), this.cm && Xn(this.cm, 0, 0), yi(this, Rr(t), El);
        }),
        replaceRange: function (e, t, n, r) {
            Fi(this, e, (t = U(this, t)), (n = n ? U(this, n) : t), r);
        },
        getRange: function (e, t, n) {
            var r = N(this, U(this, e), U(this, t));
            return !1 === n ? r : r.join(n || this.lineSeparator());
        },
        getLine: function (e) {
            var t = this.getLineHandle(e);
            return t && t.text;
        },
        getLineHandle: function (e) {
            if (H(this, e)) return T(this, e);
        },
        getLineNumber: function (e) {
            return W(e);
        },
        getLineHandleVisualStart: function (e) {
            return "number" == typeof e && (e = T(this, e)), he(e);
        },
        lineCount: function () {
            return this.size;
        },
        firstLine: function () {
            return this.first;
        },
        lastLine: function () {
            return this.first + this.size - 1;
        },
        clipPos: function (e) {
            return U(this, e);
        },
        getCursor: function (e) {
            var t = this.sel.primary();
            return null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from();
        },
        listSelections: function () {
            return this.sel.ranges;
        },
        somethingSelected: function () {
            return this.sel.somethingSelected();
        },
        setCursor: pr(function (e, t, n) {
            gi(this, U(this, "number" == typeof e ? E(e, t || 0) : e), null, n);
        }),
        setSelection: pr(function (e, t, n) {
            gi(this, U(this, e), U(this, t || e), n);
        }),
        extendSelection: pr(function (e, t, n) {
            fi(this, U(this, e), t && U(this, t), n);
        }),
        extendSelections: pr(function (e, t) {
            di(this, K(this, e), t);
        }),
        extendSelectionsBy: pr(function (e, t) {
            di(this, K(this, v(this.sel.ranges, e)), t);
        }),
        setSelections: pr(function (e, t, n) {
            var r = this;
            if (e.length) {
                for (var i = [], o = 0; o < e.length; o++) i[o] = new ws(U(r, e[o].anchor), U(r, e[o].head));
                null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), yi(this, Ir(i, t), n);
            }
        }),
        addSelection: pr(function (e, t, n) {
            var r = this.sel.ranges.slice(0);
            r.push(new ws(U(this, e), U(this, t || e))), yi(this, Ir(r, r.length - 1), n);
        }),
        getSelection: function (e) {
            for (var t, n = this, r = this.sel.ranges, i = 0; i < r.length; i++) {
                var o = N(n, r[i].from(), r[i].to());
                t = t ? t.concat(o) : o;
            }
            return !1 === e ? t : t.join(e || this.lineSeparator());
        },
        getSelections: function (e) {
            for (var t = this, n = [], r = this.sel.ranges, i = 0; i < r.length; i++) {
                var o = N(t, r[i].from(), r[i].to());
                !1 !== e && (o = o.join(e || t.lineSeparator())), (n[i] = o);
            }
            return n;
        },
        replaceSelection: function (e, t, n) {
            for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e;
            this.replaceSelections(r, t, n || "+input");
        },
        replaceSelections: pr(function (e, t, n) {
            for (var r = this, i = [], o = this.sel, l = 0; l < o.ranges.length; l++) {
                var s = o.ranges[l];
                i[l] = { from: s.from(), to: s.to(), text: r.splitLines(e[l]), origin: n };
            }
            for (var a = t && "end" != t && Vr(this, i, t), u = i.length - 1; u >= 0; u--) Ni(r, i[u]);
            a ? mi(this, a) : this.cm && jn(this.cm);
        }),
        undo: pr(function () {
            Ai(this, "undo");
        }),
        redo: pr(function () {
            Ai(this, "redo");
        }),
        undoSelection: pr(function () {
            Ai(this, "undo", !0);
        }),
        redoSelection: pr(function () {
            Ai(this, "redo", !0);
        }),
        setExtending: function (e) {
            this.extend = e;
        },
        getExtending: function () {
            return this.extend;
        },
        historySize: function () {
            for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++) e.done[r].ranges || ++t;
            for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++n;
            return { undo: t, redo: n };
        },
        clearHistory: function () {
            this.history = new Qr(this.history.maxGeneration);
        },
        markClean: function () {
            this.cleanGeneration = this.changeGeneration(!0);
        },
        changeGeneration: function (e) {
            return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation;
        },
        isClean: function (e) {
            return this.history.generation == (e || this.cleanGeneration);
        },
        getHistory: function () {
            return { done: ci(this.history.done), undone: ci(this.history.undone) };
        },
        setHistory: function (e) {
            var t = (this.history = new Qr(this.history.maxGeneration));
            (t.done = ci(e.done.slice(0), null, !0)), (t.undone = ci(e.undone.slice(0), null, !0));
        },
        setGutterMarker: pr(function (e, t, n) {
            return Ri(this, e, "gutter", function (e) {
                var r = e.gutterMarkers || (e.gutterMarkers = {});
                return (r[t] = n), !n && C(r) && (e.gutterMarkers = null), !0;
            });
        }),
        clearGutter: pr(function (e) {
            var t = this;
            this.iter(function (n) {
                n.gutterMarkers &&
                    n.gutterMarkers[e] &&
                    Ri(t, n, "gutter", function () {
                        return (n.gutterMarkers[e] = null), C(n.gutterMarkers) && (n.gutterMarkers = null), !0;
                    });
            });
        }),
        lineInfo: function (e) {
            var t;
            if ("number" == typeof e) {
                if (!H(this, e)) return null;
                if (((t = e), !(e = T(this, e)))) return null;
            } else if (null == (t = W(e))) return null;
            return { line: t, handle: e, text: e.text, gutterMarkers: e.gutterMarkers, textClass: e.textClass, bgClass: e.bgClass, wrapClass: e.wrapClass, widgets: e.widgets };
        },
        addLineClass: pr(function (t, n, r) {
            return Ri(this, t, "gutter" == n ? "gutter" : "class", function (t) {
                var i = "text" == n ? "textClass" : "background" == n ? "bgClass" : "gutter" == n ? "gutterClass" : "wrapClass";
                if (t[i]) {
                    if (e(r).test(t[i])) return !1;
                    t[i] += " " + r;
                } else t[i] = r;
                return !0;
            });
        }),
        removeLineClass: pr(function (t, n, r) {
            return Ri(this, t, "gutter" == n ? "gutter" : "class", function (t) {
                var i = "text" == n ? "textClass" : "background" == n ? "bgClass" : "gutter" == n ? "gutterClass" : "wrapClass",
                    o = t[i];
                if (!o) return !1;
                if (null == r) t[i] = null;
                else {
                    var l = o.match(e(r));
                    if (!l) return !1;
                    var s = l.index + l[0].length;
                    t[i] = o.slice(0, l.index) + (l.index && s != o.length ? " " : "") + o.slice(s) || null;
                }
                return !0;
            });
        }),
        addLineWidget: pr(function (e, t, n) {
            return Ui(this, e, t, n);
        }),
        removeLineWidget: function (e) {
            e.clear();
        },
        markText: function (e, t, n) {
            return Vi(this, U(this, e), U(this, t), n, (n && n.type) || "range");
        },
        setBookmark: function (e, t) {
            var n = { replacedWith: t && (null == t.nodeType ? t.widget : t), insertLeft: t && t.insertLeft, clearWhenEmpty: !1, shared: t && t.shared, handleMouseEvents: t && t.handleMouseEvents };
            return (e = U(this, e)), Vi(this, e, e, n, "bookmark");
        },
        findMarksAt: function (e) {
            var t = [],
                n = T(this, (e = U(this, e)).line).markedSpans;
            if (n)
                for (var r = 0; r < n.length; ++r) {
                    var i = n[r];
                    (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
                }
            return t;
        },
        findMarks: function (e, t, n) {
            (e = U(this, e)), (t = U(this, t));
            var r = [],
                i = e.line;
            return (
                this.iter(e.line, t.line + 1, function (o) {
                    var l = o.markedSpans;
                    if (l)
                        for (var s = 0; s < l.length; s++) {
                            var a = l[s];
                            (null != a.to && i == e.line && e.ch >= a.to) || (null == a.from && i != e.line) || (null != a.from && i == t.line && a.from >= t.ch) || (n && !n(a.marker)) || r.push(a.marker.parent || a.marker);
                        }
                    ++i;
                }),
                r
            );
        },
        getAllMarks: function () {
            var e = [];
            return (
                this.iter(function (t) {
                    var n = t.markedSpans;
                    if (n) for (var r = 0; r < n.length; ++r) null != n[r].from && e.push(n[r].marker);
                }),
                e
            );
        },
        posFromIndex: function (e) {
            var t,
                n = this.first,
                r = this.lineSeparator().length;
            return (
                this.iter(function (i) {
                    var o = i.text.length + r;
                    if (o > e) return (t = e), !0;
                    (e -= o), ++n;
                }),
                U(this, E(n, t))
            );
        },
        indexFromPos: function (e) {
            var t = (e = U(this, e)).ch;
            if (e.line < this.first || e.ch < 0) return 0;
            var n = this.lineSeparator().length;
            return (
                this.iter(this.first, e.line, function (e) {
                    t += e.text.length + n;
                }),
                t
            );
        },
        copy: function (e) {
            var t = new Ms(O(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
            return (t.scrollTop = this.scrollTop), (t.scrollLeft = this.scrollLeft), (t.sel = this.sel), (t.extend = !1), e && ((t.history.undoDepth = this.history.undoDepth), t.setHistory(this.getHistory())), t;
        },
        linkedDoc: function (e) {
            e || (e = {});
            var t = this.first,
                n = this.first + this.size;
            null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);
            var r = new Ms(O(this, t, n), e.mode || this.modeOption, t, this.lineSep, this.direction);
            return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({ doc: r, sharedHist: e.sharedHist }), (r.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }]), Xi(r, ji(this)), r;
        },
        unlinkDoc: function (e) {
            var t = this;
            if ((e instanceof zo && (e = e.doc), this.linked))
                for (var n = 0; n < this.linked.length; ++n)
                    if (t.linked[n].doc == e) {
                        t.linked.splice(n, 1), e.unlinkDoc(t), Yi(ji(t));
                        break;
                    }
            if (e.history == this.history) {
                var r = [e.id];
                _r(
                    e,
                    function (e) {
                        return r.push(e.id);
                    },
                    !0
                ),
                    (e.history = new Qr(null)),
                    (e.history.done = ci(this.history.done, r)),
                    (e.history.undone = ci(this.history.undone, r));
            }
        },
        iterLinkedDocs: function (e) {
            _r(this, e);
        },
        getMode: function () {
            return this.mode;
        },
        getEditor: function () {
            return this.cm;
        },
        splitLines: function (e) {
            return this.lineSep ? e.split(this.lineSep) : _l(e);
        },
        lineSeparator: function () {
            return this.lineSep || "\n";
        },
        setDirection: pr(function (e) {
            "rtl" != e && (e = "ltr"),
                e != this.direction &&
                    ((this.direction = e),
                    this.iter(function (e) {
                        return (e.order = null);
                    }),
                    this.cm && Zr(this.cm));
        }),
    })),
        (Ms.prototype.eachLine = Ms.prototype.iter);
    for (
        var Ts = 0,
            Ns = !1,
            Os = {
                3: "Enter",
                8: "Backspace",
                9: "Tab",
                13: "Enter",
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                19: "Pause",
                20: "CapsLock",
                27: "Esc",
                32: "Space",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                44: "PrintScrn",
                45: "Insert",
                46: "Delete",
                59: ";",
                61: "=",
                91: "Mod",
                92: "Mod",
                93: "Mod",
                106: "*",
                107: "=",
                109: "-",
                110: ".",
                111: "/",
                127: "Delete",
                173: "-",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'",
                63232: "Up",
                63233: "Down",
                63234: "Left",
                63235: "Right",
                63272: "Delete",
                63273: "Home",
                63275: "End",
                63276: "PageUp",
                63277: "PageDown",
                63302: "Insert",
            },
            As = 0;
        As < 10;
        As++
    )
        Os[As + 48] = Os[As + 96] = String(As);
    for (var Ws = 65; Ws <= 90; Ws++) Os[Ws] = String.fromCharCode(Ws);
    for (var Ds = 1; Ds <= 12; Ds++) Os[Ds + 111] = Os[Ds + 63235] = "F" + Ds;
    var Hs = {};
    (Hs.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection",
    }),
        (Hs.pcDefault = {
            "Ctrl-A": "selectAll",
            "Ctrl-D": "deleteLine",
            "Ctrl-Z": "undo",
            "Shift-Ctrl-Z": "redo",
            "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart",
            "Ctrl-End": "goDocEnd",
            "Ctrl-Up": "goLineUp",
            "Ctrl-Down": "goLineDown",
            "Ctrl-Left": "goGroupLeft",
            "Ctrl-Right": "goGroupRight",
            "Alt-Left": "goLineStart",
            "Alt-Right": "goLineEnd",
            "Ctrl-Backspace": "delGroupBefore",
            "Ctrl-Delete": "delGroupAfter",
            "Ctrl-S": "save",
            "Ctrl-F": "find",
            "Ctrl-G": "findNext",
            "Shift-Ctrl-G": "findPrev",
            "Shift-Ctrl-F": "replace",
            "Shift-Ctrl-R": "replaceAll",
            "Ctrl-[": "indentLess",
            "Ctrl-]": "indentMore",
            "Ctrl-U": "undoSelection",
            "Shift-Ctrl-U": "redoSelection",
            "Alt-U": "redoSelection",
            fallthrough: "basic",
        }),
        (Hs.emacsy = {
            "Ctrl-F": "goCharRight",
            "Ctrl-B": "goCharLeft",
            "Ctrl-P": "goLineUp",
            "Ctrl-N": "goLineDown",
            "Alt-F": "goWordRight",
            "Alt-B": "goWordLeft",
            "Ctrl-A": "goLineStart",
            "Ctrl-E": "goLineEnd",
            "Ctrl-V": "goPageDown",
            "Shift-Ctrl-V": "goPageUp",
            "Ctrl-D": "delCharAfter",
            "Ctrl-H": "delCharBefore",
            "Alt-D": "delWordAfter",
            "Alt-Backspace": "delWordBefore",
            "Ctrl-K": "killLine",
            "Ctrl-T": "transposeChars",
            "Ctrl-O": "openLine",
        }),
        (Hs.macDefault = {
            "Cmd-A": "selectAll",
            "Cmd-D": "deleteLine",
            "Cmd-Z": "undo",
            "Shift-Cmd-Z": "redo",
            "Cmd-Y": "redo",
            "Cmd-Home": "goDocStart",
            "Cmd-Up": "goDocStart",
            "Cmd-End": "goDocEnd",
            "Cmd-Down": "goDocEnd",
            "Alt-Left": "goGroupLeft",
            "Alt-Right": "goGroupRight",
            "Cmd-Left": "goLineLeft",
            "Cmd-Right": "goLineRight",
            "Alt-Backspace": "delGroupBefore",
            "Ctrl-Alt-Backspace": "delGroupAfter",
            "Alt-Delete": "delGroupAfter",
            "Cmd-S": "save",
            "Cmd-F": "find",
            "Cmd-G": "findNext",
            "Shift-Cmd-G": "findPrev",
            "Cmd-Alt-F": "replace",
            "Shift-Cmd-Alt-F": "replaceAll",
            "Cmd-[": "indentLess",
            "Cmd-]": "indentMore",
            "Cmd-Backspace": "delWrappedLineLeft",
            "Cmd-Delete": "delWrappedLineRight",
            "Cmd-U": "undoSelection",
            "Shift-Cmd-U": "redoSelection",
            "Ctrl-Up": "goDocStart",
            "Ctrl-Down": "goDocEnd",
            fallthrough: ["basic", "emacsy"],
        }),
        (Hs.default = xl ? Hs.macDefault : Hs.pcDefault);
    var Fs = {
            selectAll: Mi,
            singleSelection: function (e) {
                return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), El);
            },
            killLine: function (e) {
                return uo(e, function (t) {
                    if (t.empty()) {
                        var n = T(e.doc, t.head.line).text.length;
                        return t.head.ch == n && t.head.line < e.lastLine() ? { from: t.head, to: E(t.head.line + 1, 0) } : { from: t.head, to: E(t.head.line, n) };
                    }
                    return { from: t.from(), to: t.to() };
                });
            },
            deleteLine: function (e) {
                return uo(e, function (t) {
                    return { from: E(t.from().line, 0), to: U(e.doc, E(t.to().line + 1, 0)) };
                });
            },
            delLineLeft: function (e) {
                return uo(e, function (e) {
                    return { from: E(e.from().line, 0), to: e.from() };
                });
            },
            delWrappedLineLeft: function (e) {
                return uo(e, function (t) {
                    var n = e.charCoords(t.head, "div").top + 5;
                    return { from: e.coordsChar({ left: 0, top: n }, "div"), to: t.from() };
                });
            },
            delWrappedLineRight: function (e) {
                return uo(e, function (t) {
                    var n = e.charCoords(t.head, "div").top + 5,
                        r = e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div");
                    return { from: t.from(), to: r };
                });
            },
            undo: function (e) {
                return e.undo();
            },
            redo: function (e) {
                return e.redo();
            },
            undoSelection: function (e) {
                return e.undoSelection();
            },
            redoSelection: function (e) {
                return e.redoSelection();
            },
            goDocStart: function (e) {
                return e.extendSelection(E(e.firstLine(), 0));
            },
            goDocEnd: function (e) {
                return e.extendSelection(E(e.lastLine()));
            },
            goLineStart: function (e) {
                return e.extendSelectionsBy(
                    function (t) {
                        return co(e, t.head.line);
                    },
                    { origin: "+move", bias: 1 }
                );
            },
            goLineStartSmart: function (e) {
                return e.extendSelectionsBy(
                    function (t) {
                        return fo(e, t.head);
                    },
                    { origin: "+move", bias: 1 }
                );
            },
            goLineEnd: function (e) {
                return e.extendSelectionsBy(
                    function (t) {
                        return ho(e, t.head.line);
                    },
                    { origin: "+move", bias: -1 }
                );
            },
            goLineRight: function (e) {
                return e.extendSelectionsBy(function (t) {
                    var n = e.charCoords(t.head, "div").top + 5;
                    return e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div");
                }, Il);
            },
            goLineLeft: function (e) {
                return e.extendSelectionsBy(function (t) {
                    var n = e.charCoords(t.head, "div").top + 5;
                    return e.coordsChar({ left: 0, top: n }, "div");
                }, Il);
            },
            goLineLeftSmart: function (e) {
                return e.extendSelectionsBy(function (t) {
                    var n = e.charCoords(t.head, "div").top + 5,
                        r = e.coordsChar({ left: 0, top: n }, "div");
                    return r.ch < e.getLine(r.line).search(/\S/) ? fo(e, t.head) : r;
                }, Il);
            },
            goLineUp: function (e) {
                return e.moveV(-1, "line");
            },
            goLineDown: function (e) {
                return e.moveV(1, "line");
            },
            goPageUp: function (e) {
                return e.moveV(-1, "page");
            },
            goPageDown: function (e) {
                return e.moveV(1, "page");
            },
            goCharLeft: function (e) {
                return e.moveH(-1, "char");
            },
            goCharRight: function (e) {
                return e.moveH(1, "char");
            },
            goColumnLeft: function (e) {
                return e.moveH(-1, "column");
            },
            goColumnRight: function (e) {
                return e.moveH(1, "column");
            },
            goWordLeft: function (e) {
                return e.moveH(-1, "word");
            },
            goGroupRight: function (e) {
                return e.moveH(1, "group");
            },
            goGroupLeft: function (e) {
                return e.moveH(-1, "group");
            },
            goWordRight: function (e) {
                return e.moveH(1, "word");
            },
            delCharBefore: function (e) {
                return e.deleteH(-1, "char");
            },
            delCharAfter: function (e) {
                return e.deleteH(1, "char");
            },
            delWordBefore: function (e) {
                return e.deleteH(-1, "word");
            },
            delWordAfter: function (e) {
                return e.deleteH(1, "word");
            },
            delGroupBefore: function (e) {
                return e.deleteH(-1, "group");
            },
            delGroupAfter: function (e) {
                return e.deleteH(1, "group");
            },
            indentAuto: function (e) {
                return e.indentSelection("smart");
            },
            indentMore: function (e) {
                return e.indentSelection("add");
            },
            indentLess: function (e) {
                return e.indentSelection("subtract");
            },
            insertTab: function (e) {
                return e.replaceSelection("\t");
            },
            insertSoftTab: function (e) {
                for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
                    var o = n[i].from(),
                        l = h(e.getLine(o.line), o.ch, r);
                    t.push(p(r - (l % r)));
                }
                e.replaceSelections(t);
            },
            defaultTab: function (e) {
                e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
            },
            transposeChars: function (e) {
                return hr(e, function () {
                    for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
                        if (t[r].empty()) {
                            var i = t[r].head,
                                o = T(e.doc, i.line).text;
                            if (o)
                                if ((i.ch == o.length && (i = new E(i.line, i.ch - 1)), i.ch > 0)) (i = new E(i.line, i.ch + 1)), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), E(i.line, i.ch - 2), i, "+transpose");
                                else if (i.line > e.doc.first) {
                                    var l = T(e.doc, i.line - 1).text;
                                    l && ((i = new E(i.line, 1)), e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + l.charAt(l.length - 1), E(i.line - 1, l.length - 1), i, "+transpose"));
                                }
                            n.push(new ws(i, i));
                        }
                    e.setSelections(n);
                });
            },
            newlineAndIndent: function (e) {
                return hr(e, function () {
                    for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--) e.replaceRange(e.doc.lineSeparator(), t[n].anchor, t[n].head, "+input");
                    t = e.listSelections();
                    for (var r = 0; r < t.length; r++) e.indentLine(t[r].from().line, null, !0);
                    jn(e);
                });
            },
            openLine: function (e) {
                return e.replaceSelection("\n", "start");
            },
            toggleOverwrite: function (e) {
                return e.toggleOverwrite();
            },
        },
        Es = new Al(),
        Ps = null,
        Is = function (e, t, n) {
            (this.time = e), (this.pos = t), (this.button = n);
        };
    Is.prototype.compare = function (e, t, n) {
        return this.time + 400 > e && 0 == P(t, this.pos) && n == this.button;
    };
    var Rs,
        zs,
        Bs = {
            toString: function () {
                return "CodeMirror.Init";
            },
        },
        Gs = {},
        Us = {};
    (zo.defaults = Gs), (zo.optionHandlers = Us);
    var Vs = [];
    zo.defineInitHook = function (e) {
        return Vs.push(e);
    };
    var Ks = null,
        js = function (e) {
            (this.cm = e), (this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null), (this.polling = new Al()), (this.composing = null), (this.gracePeriod = !1), (this.readDOMTimeout = null);
        };
    (js.prototype.init = function (e) {
        function t(e) {
            if (!We(i, e)) {
                if (i.somethingSelected()) Uo({ lineWise: !1, text: i.getSelections() }), "cut" == e.type && i.replaceSelection("", null, "cut");
                else {
                    if (!i.options.lineWiseCopyCut) return;
                    var t = Xo(i);
                    Uo({ lineWise: !0, text: t.text }),
                        "cut" == e.type &&
                            i.operation(function () {
                                i.setSelections(t.ranges, 0, El), i.replaceSelection("", null, "cut");
                            });
                }
                if (e.clipboardData) {
                    e.clipboardData.clearData();
                    var n = Ks.text.join("\n");
                    if ((e.clipboardData.setData("Text", n), e.clipboardData.getData("Text") == n)) return void e.preventDefault();
                }
                var l = _o(),
                    s = l.firstChild;
                i.display.lineSpace.insertBefore(l, i.display.lineSpace.firstChild), (s.value = Ks.text.join("\n"));
                var a = document.activeElement;
                Ol(s),
                    setTimeout(function () {
                        i.display.lineSpace.removeChild(l), a.focus(), a == o && r.showPrimarySelection();
                    }, 50);
            }
        }
        var n = this,
            r = this,
            i = r.cm,
            o = (r.div = e.lineDiv);
        Yo(o, i.options.spellcheck),
            Xl(o, "paste", function (e) {
                We(i, e) ||
                    Ko(e, i) ||
                    (cl <= 11 &&
                        setTimeout(
                            fr(i, function () {
                                return n.updateFromDOM();
                            }),
                            20
                        ));
            }),
            Xl(o, "compositionstart", function (e) {
                n.composing = { data: e.data, done: !1 };
            }),
            Xl(o, "compositionupdate", function (e) {
                n.composing || (n.composing = { data: e.data, done: !1 });
            }),
            Xl(o, "compositionend", function (e) {
                n.composing && (e.data != n.composing.data && n.readFromDOMSoon(), (n.composing.done = !0));
            }),
            Xl(o, "touchstart", function () {
                return r.forceCompositionEnd();
            }),
            Xl(o, "input", function () {
                n.composing || n.readFromDOMSoon();
            }),
            Xl(o, "copy", t),
            Xl(o, "cut", t);
    }),
        (js.prototype.prepareSelection = function () {
            var e = Tn(this.cm, !1);
            return (e.focus = this.cm.state.focused), e;
        }),
        (js.prototype.showSelection = function (e, t) {
            e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
        }),
        (js.prototype.showPrimarySelection = function () {
            var e = window.getSelection(),
                t = this.cm,
                n = t.doc.sel.primary(),
                r = n.from(),
                i = n.to();
            if (t.display.viewTo == t.display.viewFrom || r.line >= t.display.viewTo || i.line < t.display.viewFrom) e.removeAllRanges();
            else {
                var o = tl(t, e.anchorNode, e.anchorOffset),
                    l = tl(t, e.focusNode, e.focusOffset);
                if (!o || o.bad || !l || l.bad || 0 != P(B(o, l), r) || 0 != P(z(o, l), i)) {
                    var s = t.display.view,
                        a = (r.line >= t.display.viewFrom && Zo(t, r)) || { node: s[0].measure.map[2], offset: 0 },
                        u = i.line < t.display.viewTo && Zo(t, i);
                    if (!u) {
                        var c = s[s.length - 1].measure,
                            h = c.maps ? c.maps[c.maps.length - 1] : c.map;
                        u = { node: h[h.length - 1], offset: h[h.length - 2] - h[h.length - 3] };
                    }
                    if (a && u) {
                        var f,
                            d = e.rangeCount && e.getRangeAt(0);
                        try {
                            f = kl(a.node, a.offset, u.offset, u.node);
                        } catch (e) {}
                        f &&
                            (!ol && t.state.focused ? (e.collapse(a.node, a.offset), f.collapsed || (e.removeAllRanges(), e.addRange(f))) : (e.removeAllRanges(), e.addRange(f)),
                            d && null == e.anchorNode ? e.addRange(d) : ol && this.startGracePeriod()),
                            this.rememberSelection();
                    } else e.removeAllRanges();
                }
            }
        }),
        (js.prototype.startGracePeriod = function () {
            var e = this;
            clearTimeout(this.gracePeriod),
                (this.gracePeriod = setTimeout(function () {
                    (e.gracePeriod = !1),
                        e.selectionChanged() &&
                            e.cm.operation(function () {
                                return (e.cm.curOp.selectionChanged = !0);
                            });
                }, 20));
        }),
        (js.prototype.showMultipleSelections = function (e) {
            n(this.cm.display.cursorDiv, e.cursors), n(this.cm.display.selectionDiv, e.selection);
        }),
        (js.prototype.rememberSelection = function () {
            var e = window.getSelection();
            (this.lastAnchorNode = e.anchorNode), (this.lastAnchorOffset = e.anchorOffset), (this.lastFocusNode = e.focusNode), (this.lastFocusOffset = e.focusOffset);
        }),
        (js.prototype.selectionInEditor = function () {
            var e = window.getSelection();
            if (!e.rangeCount) return !1;
            var t = e.getRangeAt(0).commonAncestorContainer;
            return o(this.div, t);
        }),
        (js.prototype.focus = function () {
            "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() || this.showSelection(this.prepareSelection(), !0), this.div.focus());
        }),
        (js.prototype.blur = function () {
            this.div.blur();
        }),
        (js.prototype.getField = function () {
            return this.div;
        }),
        (js.prototype.supportsTouch = function () {
            return !0;
        }),
        (js.prototype.receivedFocus = function () {
            function e() {
                t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e));
            }
            var t = this;
            this.selectionInEditor()
                ? this.pollSelection()
                : hr(this.cm, function () {
                      return (t.cm.curOp.selectionChanged = !0);
                  }),
                this.polling.set(this.cm.options.pollInterval, e);
        }),
        (js.prototype.selectionChanged = function () {
            var e = window.getSelection();
            return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
        }),
        (js.prototype.pollSelection = function () {
            if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
                var e = window.getSelection(),
                    t = this.cm;
                if (bl && dl && this.cm.options.gutters.length && Qo(e.anchorNode)) return this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), void this.focus();
                if (!this.composing) {
                    this.rememberSelection();
                    var n = tl(t, e.anchorNode, e.anchorOffset),
                        r = tl(t, e.focusNode, e.focusOffset);
                    n &&
                        r &&
                        hr(t, function () {
                            yi(t.doc, Rr(n, r), El), (n.bad || r.bad) && (t.curOp.selectionChanged = !0);
                        });
                }
            }
        }),
        (js.prototype.pollContent = function () {
            null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), (this.readDOMTimeout = null));
            var e = this.cm,
                t = e.display,
                n = e.doc.sel.primary(),
                r = n.from(),
                i = n.to();
            if (
                (0 == r.ch && r.line > e.firstLine() && (r = E(r.line - 1, T(e.doc, r.line - 1).length)), i.ch == T(e.doc, i.line).text.length && i.line < e.lastLine() && (i = E(i.line + 1, 0)), r.line < t.viewFrom || i.line > t.viewTo - 1)
            )
                return !1;
            var o, l, s;
            r.line == t.viewFrom || 0 == (o = kn(e, r.line)) ? ((l = W(t.view[0].line)), (s = t.view[0].node)) : ((l = W(t.view[o].line)), (s = t.view[o - 1].node.nextSibling));
            var a,
                u,
                c = kn(e, i.line);
            if ((c == t.view.length - 1 ? ((a = t.viewTo - 1), (u = t.lineDiv.lastChild)) : ((a = W(t.view[c + 1].line) - 1), (u = t.view[c + 1].node.previousSibling)), !s)) return !1;
            for (var h = e.doc.splitLines(el(e, s, u, l, a)), f = N(e.doc, E(l, 0), E(a, T(e.doc, a).text.length)); h.length > 1 && f.length > 1; )
                if (g(h) == g(f)) h.pop(), f.pop(), a--;
                else {
                    if (h[0] != f[0]) break;
                    h.shift(), f.shift(), l++;
                }
            for (var d = 0, p = 0, v = h[0], m = f[0], y = Math.min(v.length, m.length); d < y && v.charCodeAt(d) == m.charCodeAt(d); ) ++d;
            for (var b = g(h), w = g(f), x = Math.min(b.length - (1 == h.length ? d : 0), w.length - (1 == f.length ? d : 0)); p < x && b.charCodeAt(b.length - p - 1) == w.charCodeAt(w.length - p - 1); ) ++p;
            if (1 == h.length && 1 == f.length && l == r.line) for (; d && d > r.ch && b.charCodeAt(b.length - p - 1) == w.charCodeAt(w.length - p - 1); ) d--, p++;
            (h[h.length - 1] = b.slice(0, b.length - p).replace(/^\u200b+/, "")), (h[0] = h[0].slice(d).replace(/\u200b+$/, ""));
            var C = E(l, d),
                S = E(a, f.length ? g(f).length - p : 0);
            return h.length > 1 || h[0] || P(C, S) ? (Fi(e.doc, h, C, S, "+input"), !0) : void 0;
        }),
        (js.prototype.ensurePolled = function () {
            this.forceCompositionEnd();
        }),
        (js.prototype.reset = function () {
            this.forceCompositionEnd();
        }),
        (js.prototype.forceCompositionEnd = function () {
            this.composing && (clearTimeout(this.readDOMTimeout), (this.composing = null), this.updateFromDOM(), this.div.blur(), this.div.focus());
        }),
        (js.prototype.readFromDOMSoon = function () {
            var e = this;
            null == this.readDOMTimeout &&
                (this.readDOMTimeout = setTimeout(function () {
                    if (((e.readDOMTimeout = null), e.composing)) {
                        if (!e.composing.done) return;
                        e.composing = null;
                    }
                    e.updateFromDOM();
                }, 80));
        }),
        (js.prototype.updateFromDOM = function () {
            var e = this;
            (!this.cm.isReadOnly() && this.pollContent()) ||
                hr(this.cm, function () {
                    return gr(e.cm);
                });
        }),
        (js.prototype.setUneditable = function (e) {
            e.contentEditable = "false";
        }),
        (js.prototype.onKeyPress = function (e) {
            0 != e.charCode && (e.preventDefault(), this.cm.isReadOnly() || fr(this.cm, Vo)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0));
        }),
        (js.prototype.readOnlyChanged = function (e) {
            this.div.contentEditable = String("nocursor" != e);
        }),
        (js.prototype.onContextMenu = function () {}),
        (js.prototype.resetPosition = function () {}),
        (js.prototype.needsContentAttribute = !0);
    var Xs = function (e) {
        (this.cm = e), (this.prevInput = ""), (this.pollingFast = !1), (this.polling = new Al()), (this.inaccurateSelection = !1), (this.hasSelection = !1), (this.composing = null);
    };
    (Xs.prototype.init = function (e) {
        function t(e) {
            if (!We(i, e)) {
                if (i.somethingSelected()) Uo({ lineWise: !1, text: i.getSelections() }), r.inaccurateSelection && ((r.prevInput = ""), (r.inaccurateSelection = !1), (l.value = Ks.text.join("\n")), Ol(l));
                else {
                    if (!i.options.lineWiseCopyCut) return;
                    var t = Xo(i);
                    Uo({ lineWise: !0, text: t.text }), "cut" == e.type ? i.setSelections(t.ranges, null, El) : ((r.prevInput = ""), (l.value = t.text.join("\n")), Ol(l));
                }
                "cut" == e.type && (i.state.cutIncoming = !0);
            }
        }
        var n = this,
            r = this,
            i = this.cm,
            o = (this.wrapper = _o()),
            l = (this.textarea = o.firstChild);
        e.wrapper.insertBefore(o, e.wrapper.firstChild),
            yl && (l.style.width = "0px"),
            Xl(l, "input", function () {
                ul && cl >= 9 && n.hasSelection && (n.hasSelection = null), r.poll();
            }),
            Xl(l, "paste", function (e) {
                We(i, e) || Ko(e, i) || ((i.state.pasteIncoming = !0), r.fastPoll());
            }),
            Xl(l, "cut", t),
            Xl(l, "copy", t),
            Xl(e.scroller, "paste", function (t) {
                Rt(e, t) || We(i, t) || ((i.state.pasteIncoming = !0), r.focus());
            }),
            Xl(e.lineSpace, "selectstart", function (t) {
                Rt(e, t) || Ee(t);
            }),
            Xl(l, "compositionstart", function () {
                var e = i.getCursor("from");
                r.composing && r.composing.range.clear(), (r.composing = { start: e, range: i.markText(e, i.getCursor("to"), { className: "CodeMirror-composing" }) });
            }),
            Xl(l, "compositionend", function () {
                r.composing && (r.poll(), r.composing.range.clear(), (r.composing = null));
            });
    }),
        (Xs.prototype.prepareSelection = function () {
            var e = this.cm,
                t = e.display,
                n = e.doc,
                r = Tn(e);
            if (e.options.moveInputWithCursor) {
                var i = hn(e, n.sel.primary().head, "div"),
                    o = t.wrapper.getBoundingClientRect(),
                    l = t.lineDiv.getBoundingClientRect();
                (r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top))), (r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left)));
            }
            return r;
        }),
        (Xs.prototype.showSelection = function (e) {
            var t = this.cm.display;
            n(t.cursorDiv, e.cursors), n(t.selectionDiv, e.selection), null != e.teTop && ((this.wrapper.style.top = e.teTop + "px"), (this.wrapper.style.left = e.teLeft + "px"));
        }),
        (Xs.prototype.reset = function (e) {
            if (!this.contextMenuPending && !this.composing) {
                var t,
                    n,
                    r = this.cm,
                    i = r.doc;
                if (r.somethingSelected()) {
                    this.prevInput = "";
                    var o = i.sel.primary(),
                        l = (t = ql && (o.to().line - o.from().line > 100 || (n = r.getSelection()).length > 1e3)) ? "-" : n || r.getSelection();
                    (this.textarea.value = l), r.state.focused && Ol(this.textarea), ul && cl >= 9 && (this.hasSelection = l);
                } else e || ((this.prevInput = this.textarea.value = ""), ul && cl >= 9 && (this.hasSelection = null));
                this.inaccurateSelection = t;
            }
        }),
        (Xs.prototype.getField = function () {
            return this.textarea;
        }),
        (Xs.prototype.supportsTouch = function () {
            return !1;
        }),
        (Xs.prototype.focus = function () {
            if ("nocursor" != this.cm.options.readOnly && (!wl || l() != this.textarea))
                try {
                    this.textarea.focus();
                } catch (e) {}
        }),
        (Xs.prototype.blur = function () {
            this.textarea.blur();
        }),
        (Xs.prototype.resetPosition = function () {
            this.wrapper.style.top = this.wrapper.style.left = 0;
        }),
        (Xs.prototype.receivedFocus = function () {
            this.slowPoll();
        }),
        (Xs.prototype.slowPoll = function () {
            var e = this;
            this.pollingFast ||
                this.polling.set(this.cm.options.pollInterval, function () {
                    e.poll(), e.cm.state.focused && e.slowPoll();
                });
        }),
        (Xs.prototype.fastPoll = function () {
            function e() {
                n.poll() || t ? ((n.pollingFast = !1), n.slowPoll()) : ((t = !0), n.polling.set(60, e));
            }
            var t = !1,
                n = this;
            (n.pollingFast = !0), n.polling.set(20, e);
        }),
        (Xs.prototype.poll = function () {
            var e = this,
                t = this.cm,
                n = this.textarea,
                r = this.prevInput;
            if (this.contextMenuPending || !t.state.focused || ($l(n) && !r && !this.composing) || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;
            var i = n.value;
            if (i == r && !t.somethingSelected()) return !1;
            if ((ul && cl >= 9 && this.hasSelection === i) || (xl && /[\uf700-\uf7ff]/.test(i))) return t.display.input.reset(), !1;
            if (t.doc.sel == t.display.selForContextMenu) {
                var o = i.charCodeAt(0);
                if ((8203 != o || r || (r = "​"), 8666 == o)) return this.reset(), this.cm.execCommand("undo");
            }
            for (var l = 0, s = Math.min(r.length, i.length); l < s && r.charCodeAt(l) == i.charCodeAt(l); ) ++l;
            return (
                hr(t, function () {
                    Vo(t, i.slice(l), r.length - l, null, e.composing ? "*compose" : null),
                        i.length > 1e3 || i.indexOf("\n") > -1 ? (n.value = e.prevInput = "") : (e.prevInput = i),
                        e.composing && (e.composing.range.clear(), (e.composing.range = t.markText(e.composing.start, t.getCursor("to"), { className: "CodeMirror-composing" })));
                }),
                !0
            );
        }),
        (Xs.prototype.ensurePolled = function () {
            this.pollingFast && this.poll() && (this.pollingFast = !1);
        }),
        (Xs.prototype.onKeyPress = function () {
            ul && cl >= 9 && (this.hasSelection = null), this.fastPoll();
        }),
        (Xs.prototype.onContextMenu = function (e) {
            function t() {
                if (null != l.selectionStart) {
                    var e = i.somethingSelected(),
                        t = "​" + (e ? l.value : "");
                    (l.value = "⇚"), (l.value = t), (r.prevInput = e ? "" : "​"), (l.selectionStart = 1), (l.selectionEnd = t.length), (o.selForContextMenu = i.doc.sel);
                }
            }
            function n() {
                if (((r.contextMenuPending = !1), (r.wrapper.style.cssText = c), (l.style.cssText = u), ul && cl < 9 && o.scrollbars.setScrollTop((o.scroller.scrollTop = a)), null != l.selectionStart)) {
                    (!ul || (ul && cl < 9)) && t();
                    var e = 0,
                        n = function () {
                            o.selForContextMenu == i.doc.sel && 0 == l.selectionStart && l.selectionEnd > 0 && "​" == r.prevInput
                                ? fr(i, Mi)(i)
                                : e++ < 10
                                ? (o.detectingSelectAll = setTimeout(n, 500))
                                : ((o.selForContextMenu = null), o.input.reset());
                        };
                    o.detectingSelectAll = setTimeout(n, 200);
                }
            }
            var r = this,
                i = r.cm,
                o = i.display,
                l = r.textarea,
                s = Ln(i, e),
                a = o.scroller.scrollTop;
            if (s && !pl) {
                i.options.resetSelectionOnContextMenu && -1 == i.doc.sel.contains(s) && fr(i, yi)(i.doc, Rr(s), El);
                var u = l.style.cssText,
                    c = r.wrapper.style.cssText;
                r.wrapper.style.cssText = "position: absolute";
                var h = r.wrapper.getBoundingClientRect();
                l.style.cssText =
                    "position: absolute; width: 30px; height: 30px;\n      top: " +
                    (e.clientY - h.top - 5) +
                    "px; left: " +
                    (e.clientX - h.left - 5) +
                    "px;\n      z-index: 1000; background: " +
                    (ul ? "rgba(255, 255, 255, .05)" : "transparent") +
                    ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
                var f;
                if (
                    (hl && (f = window.scrollY),
                    o.input.focus(),
                    hl && window.scrollTo(null, f),
                    o.input.reset(),
                    i.somethingSelected() || (l.value = r.prevInput = " "),
                    (r.contextMenuPending = !0),
                    (o.selForContextMenu = i.doc.sel),
                    clearTimeout(o.detectingSelectAll),
                    ul && cl >= 9 && t(),
                    Tl)
                ) {
                    Re(e);
                    var d = function () {
                        Oe(window, "mouseup", d), setTimeout(n, 20);
                    };
                    Xl(window, "mouseup", d);
                } else setTimeout(n, 50);
            }
        }),
        (Xs.prototype.readOnlyChanged = function (e) {
            e || this.reset(), (this.textarea.disabled = "nocursor" == e);
        }),
        (Xs.prototype.setUneditable = function () {}),
        (Xs.prototype.needsContentAttribute = !1),
        (function (e) {
            function t(t, r, i, o) {
                (e.defaults[t] = r),
                    i &&
                        (n[t] = o
                            ? function (e, t, n) {
                                  n != Bs && i(e, t, n);
                              }
                            : i);
            }
            var n = e.optionHandlers;
            (e.defineOption = t),
                (e.Init = Bs),
                t(
                    "value",
                    "",
                    function (e, t) {
                        return e.setValue(t);
                    },
                    !0
                ),
                t(
                    "mode",
                    null,
                    function (e, t) {
                        (e.doc.modeOption = t), Kr(e);
                    },
                    !0
                ),
                t("indentUnit", 2, Kr, !0),
                t("indentWithTabs", !1),
                t("smartIndent", !0),
                t(
                    "tabSize",
                    4,
                    function (e) {
                        jr(e), on(e), gr(e);
                    },
                    !0
                ),
                t("lineSeparator", null, function (e, t) {
                    if (((e.doc.lineSep = t), t)) {
                        var n = [],
                            r = e.doc.first;
                        e.doc.iter(function (e) {
                            for (var i = 0; ; ) {
                                var o = e.text.indexOf(t, i);
                                if (-1 == o) break;
                                (i = o + t.length), n.push(E(r, o));
                            }
                            r++;
                        });
                        for (var i = n.length - 1; i >= 0; i--) Fi(e.doc, t, n[i], E(n[i].line, n[i].ch + t.length));
                    }
                }),
                t("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function (e, t, n) {
                    (e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g")), n != Bs && e.refresh();
                }),
                t(
                    "specialCharPlaceholder",
                    ft,
                    function (e) {
                        return e.refresh();
                    },
                    !0
                ),
                t("electricChars", !0),
                t(
                    "inputStyle",
                    wl ? "contenteditable" : "textarea",
                    function () {
                        throw new Error("inputStyle can not (yet) be changed in a running editor");
                    },
                    !0
                ),
                t(
                    "spellcheck",
                    !1,
                    function (e, t) {
                        return (e.getInputField().spellcheck = t);
                    },
                    !0
                ),
                t("rtlMoveVisually", !Sl),
                t("wholeLineUpdateBefore", !0),
                t(
                    "theme",
                    "default",
                    function (e) {
                        Eo(e), Po(e);
                    },
                    !0
                ),
                t("keyMap", "default", function (e, t, n) {
                    var r = ao(t),
                        i = n != Bs && ao(n);
                    i && i.detach && i.detach(e, r), r.attach && r.attach(e, i || null);
                }),
                t("extraKeys", null),
                t("configureMouse", null),
                t("lineWrapping", !1, Ro, !0),
                t(
                    "gutters",
                    [],
                    function (e) {
                        Hr(e.options), Po(e);
                    },
                    !0
                ),
                t(
                    "fixedGutter",
                    !0,
                    function (e, t) {
                        (e.display.gutters.style.left = t ? xn(e.display) + "px" : "0"), e.refresh();
                    },
                    !0
                ),
                t(
                    "coverGutterNextToScrollbar",
                    !1,
                    function (e) {
                        return er(e);
                    },
                    !0
                ),
                t(
                    "scrollbarStyle",
                    "native",
                    function (e) {
                        nr(e), er(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
                    },
                    !0
                ),
                t(
                    "lineNumbers",
                    !1,
                    function (e) {
                        Hr(e.options), Po(e);
                    },
                    !0
                ),
                t("firstLineNumber", 1, Po, !0),
                t(
                    "lineNumberFormatter",
                    function (e) {
                        return e;
                    },
                    Po,
                    !0
                ),
                t("showCursorWhenSelecting", !1, Mn, !0),
                t("resetSelectionOnContextMenu", !0),
                t("lineWiseCopyCut", !0),
                t("pasteLinesPerSelection", !0),
                t("readOnly", !1, function (e, t) {
                    "nocursor" == t && (Fn(e), e.display.input.blur()), e.display.input.readOnlyChanged(t);
                }),
                t(
                    "disableInput",
                    !1,
                    function (e, t) {
                        t || e.display.input.reset();
                    },
                    !0
                ),
                t("dragDrop", !0, Io),
                t("allowDropFileTypes", null),
                t("cursorBlinkRate", 530),
                t("cursorScrollMargin", 0),
                t("cursorHeight", 1, Mn, !0),
                t("singleCursorHeightPerLine", !0, Mn, !0),
                t("workTime", 100),
                t("workDelay", 100),
                t("flattenSpans", !0, jr, !0),
                t("addModeClass", !1, jr, !0),
                t("pollInterval", 100),
                t("undoDepth", 200, function (e, t) {
                    return (e.doc.history.undoDepth = t);
                }),
                t("historyEventDelay", 1250),
                t(
                    "viewportMargin",
                    10,
                    function (e) {
                        return e.refresh();
                    },
                    !0
                ),
                t("maxHighlightLength", 1e4, jr, !0),
                t("moveInputWithCursor", !0, function (e, t) {
                    t || e.display.input.resetPosition();
                }),
                t("tabindex", null, function (e, t) {
                    return (e.display.input.getField().tabIndex = t || "");
                }),
                t("autofocus", null),
                t(
                    "direction",
                    "ltr",
                    function (e, t) {
                        return e.doc.setDirection(t);
                    },
                    !0
                );
        })(zo),
        (function (e) {
            var t = e.optionHandlers,
                n = (e.helpers = {});
            (e.prototype = {
                constructor: e,
                focus: function () {
                    window.focus(), this.display.input.focus();
                },
                setOption: function (e, n) {
                    var r = this.options,
                        i = r[e];
                    (r[e] == n && "mode" != e) || ((r[e] = n), t.hasOwnProperty(e) && fr(this, t[e])(this, n, i), Ae(this, "optionChange", this, e));
                },
                getOption: function (e) {
                    return this.options[e];
                },
                getDoc: function () {
                    return this.doc;
                },
                addKeyMap: function (e, t) {
                    this.state.keyMaps[t ? "push" : "unshift"](ao(e));
                },
                removeKeyMap: function (e) {
                    for (var t = this.state.keyMaps, n = 0; n < t.length; ++n) if (t[n] == e || t[n].name == e) return t.splice(n, 1), !0;
                },
                addOverlay: dr(function (t, n) {
                    var r = t.token ? t : e.getMode(this.options, t);
                    if (r.startState) throw new Error("Overlays may not be stateful.");
                    m(this.state.overlays, { mode: r, modeSpec: t, opaque: n && n.opaque, priority: (n && n.priority) || 0 }, function (e) {
                        return e.priority;
                    }),
                        this.state.modeGen++,
                        gr(this);
                }),
                removeOverlay: dr(function (e) {
                    for (var t = this, n = this.state.overlays, r = 0; r < n.length; ++r) {
                        var i = n[r].modeSpec;
                        if (i == e || ("string" == typeof e && i.name == e)) return n.splice(r, 1), t.state.modeGen++, void gr(t);
                    }
                }),
                indentLine: dr(function (e, t, n) {
                    "string" != typeof t && "number" != typeof t && (t = null == t ? (this.options.smartIndent ? "smart" : "prev") : t ? "add" : "subtract"), H(this.doc, e) && Go(this, e, t, n);
                }),
                indentSelection: dr(function (e) {
                    for (var t = this, n = this.doc.sel.ranges, r = -1, i = 0; i < n.length; i++) {
                        var o = n[i];
                        if (o.empty()) o.head.line > r && (Go(t, o.head.line, e, !0), (r = o.head.line), i == t.doc.sel.primIndex && jn(t));
                        else {
                            var l = o.from(),
                                s = o.to(),
                                a = Math.max(r, l.line);
                            r = Math.min(t.lastLine(), s.line - (s.ch ? 0 : 1)) + 1;
                            for (var u = a; u < r; ++u) Go(t, u, e);
                            var c = t.doc.sel.ranges;
                            0 == l.ch && n.length == c.length && c[i].from().ch > 0 && pi(t.doc, i, new ws(l, c[i].to()), El);
                        }
                    }
                }),
                getTokenAt: function (e, t) {
                    return rt(this, e, t);
                },
                getLineTokens: function (e, t) {
                    return rt(this, E(e), t, !0);
                },
                getTokenTypeAt: function (e) {
                    e = U(this.doc, e);
                    var t,
                        n = Qe(this, T(this.doc, e.line)),
                        r = 0,
                        i = (n.length - 1) / 2,
                        o = e.ch;
                    if (0 == o) t = n[2];
                    else
                        for (;;) {
                            var l = (r + i) >> 1;
                            if ((l ? n[2 * l - 1] : 0) >= o) i = l;
                            else {
                                if (!(n[2 * l + 1] < o)) {
                                    t = n[2 * l + 2];
                                    break;
                                }
                                r = l + 1;
                            }
                        }
                    var s = t ? t.indexOf("overlay ") : -1;
                    return s < 0 ? t : 0 == s ? null : t.slice(0, s - 1);
                },
                getModeAt: function (t) {
                    var n = this.doc.mode;
                    return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n;
                },
                getHelper: function (e, t) {
                    return this.getHelpers(e, t)[0];
                },
                getHelpers: function (e, t) {
                    var r = this,
                        i = [];
                    if (!n.hasOwnProperty(t)) return i;
                    var o = n[t],
                        l = this.getModeAt(e);
                    if ("string" == typeof l[t]) o[l[t]] && i.push(o[l[t]]);
                    else if (l[t])
                        for (var s = 0; s < l[t].length; s++) {
                            var a = o[l[t][s]];
                            a && i.push(a);
                        }
                    else l.helperType && o[l.helperType] ? i.push(o[l.helperType]) : o[l.name] && i.push(o[l.name]);
                    for (var u = 0; u < o._global.length; u++) {
                        var c = o._global[u];
                        c.pred(l, r) && -1 == f(i, c.val) && i.push(c.val);
                    }
                    return i;
                },
                getStateAfter: function (e, t) {
                    var n = this.doc;
                    return (e = G(n, null == e ? n.first + n.size - 1 : e)), Je(this, e + 1, t).state;
                },
                cursorCoords: function (e, t) {
                    var n,
                        r = this.doc.sel.primary();
                    return (n = null == e ? r.head : "object" == typeof e ? U(this.doc, e) : e ? r.from() : r.to()), hn(this, n, t || "page");
                },
                charCoords: function (e, t) {
                    return cn(this, U(this.doc, e), t || "page");
                },
                coordsChar: function (e, t) {
                    return (e = un(this, e, t || "page")), pn(this, e.left, e.top);
                },
                lineAtHeight: function (e, t) {
                    return (e = un(this, { top: e, left: 0 }, t || "page").top), D(this.doc, e + this.display.viewOffset);
                },
                heightAtLine: function (e, t, n) {
                    var r,
                        i = !1;
                    if ("number" == typeof e) {
                        var o = this.doc.first + this.doc.size - 1;
                        e < this.doc.first ? (e = this.doc.first) : e > o && ((e = o), (i = !0)), (r = T(this.doc, e));
                    } else r = e;
                    return an(this, r, { top: 0, left: 0 }, t || "page", n || i).top + (i ? this.doc.height - ye(r) : 0);
                },
                defaultTextHeight: function () {
                    return yn(this.display);
                },
                defaultCharWidth: function () {
                    return bn(this.display);
                },
                getViewport: function () {
                    return { from: this.display.viewFrom, to: this.display.viewTo };
                },
                addWidget: function (e, t, n, r, i) {
                    var o = this.display,
                        l = (e = hn(this, U(this.doc, e))).bottom,
                        s = e.left;
                    if (((t.style.position = "absolute"), t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), o.sizer.appendChild(t), "over" == r)) l = e.top;
                    else if ("above" == r || "near" == r) {
                        var a = Math.max(o.wrapper.clientHeight, this.doc.height),
                            u = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                        ("above" == r || e.bottom + t.offsetHeight > a) && e.top > t.offsetHeight ? (l = e.top - t.offsetHeight) : e.bottom + t.offsetHeight <= a && (l = e.bottom), s + t.offsetWidth > u && (s = u - t.offsetWidth);
                    }
                    (t.style.top = l + "px"),
                        (t.style.left = t.style.right = ""),
                        "right" == i ? ((s = o.sizer.clientWidth - t.offsetWidth), (t.style.right = "0px")) : ("left" == i ? (s = 0) : "middle" == i && (s = (o.sizer.clientWidth - t.offsetWidth) / 2), (t.style.left = s + "px")),
                        n && Un(this, { left: s, top: l, right: s + t.offsetWidth, bottom: l + t.offsetHeight });
                },
                triggerOnKeyDown: dr(bo),
                triggerOnKeyPress: dr(Co),
                triggerOnKeyUp: xo,
                triggerOnMouseDown: dr(Lo),
                execCommand: function (e) {
                    if (Fs.hasOwnProperty(e)) return Fs[e].call(null, this);
                },
                triggerElectric: dr(function (e) {
                    jo(this, e);
                }),
                findPosH: function (e, t, n, r) {
                    var i = this,
                        o = 1;
                    t < 0 && ((o = -1), (t = -t));
                    for (var l = U(this.doc, e), s = 0; s < t && !(l = $o(i.doc, l, o, n, r)).hitSide; ++s);
                    return l;
                },
                moveH: dr(function (e, t) {
                    var n = this;
                    this.extendSelectionsBy(function (r) {
                        return n.display.shift || n.doc.extend || r.empty() ? $o(n.doc, r.head, e, t, n.options.rtlMoveVisually) : e < 0 ? r.from() : r.to();
                    }, Il);
                }),
                deleteH: dr(function (e, t) {
                    var n = this.doc.sel,
                        r = this.doc;
                    n.somethingSelected()
                        ? r.replaceSelection("", null, "+delete")
                        : uo(this, function (n) {
                              var i = $o(r, n.head, e, t, !1);
                              return e < 0 ? { from: i, to: n.head } : { from: n.head, to: i };
                          });
                }),
                findPosV: function (e, t, n, r) {
                    var i = this,
                        o = 1,
                        l = r;
                    t < 0 && ((o = -1), (t = -t));
                    for (var s = U(this.doc, e), a = 0; a < t; ++a) {
                        var u = hn(i, s, "div");
                        if ((null == l ? (l = u.left) : (u.left = l), (s = qo(i, u, o, n)).hitSide)) break;
                    }
                    return s;
                },
                moveV: dr(function (e, t) {
                    var n = this,
                        r = this.doc,
                        i = [],
                        o = !this.display.shift && !r.extend && r.sel.somethingSelected();
                    if (
                        (r.extendSelectionsBy(function (l) {
                            if (o) return e < 0 ? l.from() : l.to();
                            var s = hn(n, l.head, "div");
                            null != l.goalColumn && (s.left = l.goalColumn), i.push(s.left);
                            var a = qo(n, s, e, t);
                            return "page" == t && l == r.sel.primary() && Kn(n, cn(n, a, "div").top - s.top), a;
                        }, Il),
                        i.length)
                    )
                        for (var l = 0; l < r.sel.ranges.length; l++) r.sel.ranges[l].goalColumn = i[l];
                }),
                findWordAt: function (e) {
                    var t = T(this.doc, e.line).text,
                        n = e.ch,
                        r = e.ch;
                    if (t) {
                        var i = this.getHelper(e, "wordChars");
                        ("before" != e.sticky && r != t.length) || !n ? ++r : --n;
                        for (
                            var o = t.charAt(n),
                                l = x(o, i)
                                    ? function (e) {
                                          return x(e, i);
                                      }
                                    : /\s/.test(o)
                                    ? function (e) {
                                          return /\s/.test(e);
                                      }
                                    : function (e) {
                                          return !/\s/.test(e) && !x(e);
                                      };
                            n > 0 && l(t.charAt(n - 1));

                        )
                            --n;
                        for (; r < t.length && l(t.charAt(r)); ) ++r;
                    }
                    return new ws(E(e.line, n), E(e.line, r));
                },
                toggleOverwrite: function (e) {
                    (null != e && e == this.state.overwrite) ||
                        ((this.state.overwrite = !this.state.overwrite) ? s(this.display.cursorDiv, "CodeMirror-overwrite") : Nl(this.display.cursorDiv, "CodeMirror-overwrite"), Ae(this, "overwriteToggle", this, this.state.overwrite));
                },
                hasFocus: function () {
                    return this.display.input.getField() == l();
                },
                isReadOnly: function () {
                    return !(!this.options.readOnly && !this.doc.cantEdit);
                },
                scrollTo: dr(function (e, t) {
                    Xn(this, e, t);
                }),
                getScrollInfo: function () {
                    var e = this.display.scroller;
                    return { left: e.scrollLeft, top: e.scrollTop, height: e.scrollHeight - Ut(this) - this.display.barHeight, width: e.scrollWidth - Ut(this) - this.display.barWidth, clientHeight: Kt(this), clientWidth: Vt(this) };
                },
                scrollIntoView: dr(function (e, t) {
                    null == e
                        ? ((e = { from: this.doc.sel.primary().head, to: null }), null == t && (t = this.options.cursorScrollMargin))
                        : "number" == typeof e
                        ? (e = { from: E(e, 0), to: null })
                        : null == e.from && (e = { from: e, to: null }),
                        e.to || (e.to = e.from),
                        (e.margin = t || 0),
                        null != e.from.line ? Yn(this, e) : $n(this, e.from, e.to, e.margin);
                }),
                setSize: dr(function (e, t) {
                    var n = this,
                        r = function (e) {
                            return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e;
                        };
                    null != e && (this.display.wrapper.style.width = r(e)), null != t && (this.display.wrapper.style.height = r(t)), this.options.lineWrapping && rn(this);
                    var i = this.display.viewFrom;
                    this.doc.iter(i, this.display.viewTo, function (e) {
                        if (e.widgets)
                            for (var t = 0; t < e.widgets.length; t++)
                                if (e.widgets[t].noHScroll) {
                                    vr(n, i, "widget");
                                    break;
                                }
                        ++i;
                    }),
                        (this.curOp.forceUpdate = !0),
                        Ae(this, "refresh", this);
                }),
                operation: function (e) {
                    return hr(this, e);
                },
                refresh: dr(function () {
                    var e = this.display.cachedTextHeight;
                    gr(this), (this.curOp.forceUpdate = !0), on(this), Xn(this, this.doc.scrollLeft, this.doc.scrollTop), Ar(this), (null == e || Math.abs(e - yn(this.display)) > 0.5) && Sn(this), Ae(this, "refresh", this);
                }),
                swapDoc: dr(function (e) {
                    var t = this.doc;
                    return (t.cm = null), $r(this, e), on(this), this.display.input.reset(), Xn(this, e.scrollLeft, e.scrollTop), (this.curOp.forceScroll = !0), St(this, "swapDoc", this, t), t;
                }),
                getInputField: function () {
                    return this.display.input.getField();
                },
                getWrapperElement: function () {
                    return this.display.wrapper;
                },
                getScrollerElement: function () {
                    return this.display.scroller;
                },
                getGutterElement: function () {
                    return this.display.gutters;
                },
            }),
                Fe(e),
                (e.registerHelper = function (t, r, i) {
                    n.hasOwnProperty(t) || (n[t] = e[t] = { _global: [] }), (n[t][r] = i);
                }),
                (e.registerGlobalHelper = function (t, r, i, o) {
                    e.registerHelper(t, r, o), n[t]._global.push({ pred: i, val: o });
                });
        })(zo);
    var Ys = "iter insert remove copy getEditor constructor".split(" ");
    for (var _s in Ms.prototype)
        Ms.prototype.hasOwnProperty(_s) &&
            f(Ys, _s) < 0 &&
            (zo.prototype[_s] = (function (e) {
                return function () {
                    return e.apply(this.doc, arguments);
                };
            })(Ms.prototype[_s]));
    return (
        Fe(Ms),
        (zo.inputStyles = { textarea: Xs, contenteditable: js }),
        (zo.defineMode = function (e) {
            zo.defaults.mode || "null" == e || (zo.defaults.mode = e), Ke.apply(this, arguments);
        }),
        (zo.defineMIME = function (e, t) {
            Jl[e] = t;
        }),
        zo.defineMode("null", function () {
            return {
                token: function (e) {
                    return e.skipToEnd();
                },
            };
        }),
        zo.defineMIME("text/plain", "null"),
        (zo.defineExtension = function (e, t) {
            zo.prototype[e] = t;
        }),
        (zo.defineDocExtension = function (e, t) {
            Ms.prototype[e] = t;
        }),
        (zo.fromTextArea = function (e, t) {
            function n() {
                e.value = a.getValue();
            }
            if (((t = t ? c(t) : {}), (t.value = e.value), !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus)) {
                var r = l();
                t.autofocus = r == e || (null != e.getAttribute("autofocus") && r == document.body);
            }
            var i;
            if (e.form && (Xl(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
                var o = e.form;
                i = o.submit;
                try {
                    var s = (o.submit = function () {
                        n(), (o.submit = i), o.submit(), (o.submit = s);
                    });
                } catch (e) {}
            }
            (t.finishInit = function (t) {
                (t.save = n),
                    (t.getTextArea = function () {
                        return e;
                    }),
                    (t.toTextArea = function () {
                        (t.toTextArea = isNaN), n(), e.parentNode.removeChild(t.getWrapperElement()), (e.style.display = ""), e.form && (Oe(e.form, "submit", n), "function" == typeof e.form.submit && (e.form.submit = i));
                    });
            }),
                (e.style.display = "none");
            var a = zo(function (t) {
                return e.parentNode.insertBefore(t, e.nextSibling);
            }, t);
            return a;
        }),
        (function (e) {
            (e.off = Oe),
                (e.on = Xl),
                (e.wheelEventPixels = Er),
                (e.Doc = Ms),
                (e.splitLines = _l),
                (e.countColumn = h),
                (e.findColumn = d),
                (e.isWordChar = w),
                (e.Pass = Fl),
                (e.signal = Ae),
                (e.Line = os),
                (e.changeEnd = zr),
                (e.scrollbarModel = ps),
                (e.Pos = E),
                (e.cmpPos = P),
                (e.modes = Ql),
                (e.mimeModes = Jl),
                (e.resolveMode = je),
                (e.getMode = Xe),
                (e.modeExtensions = es),
                (e.extendMode = Ye),
                (e.copyState = _e),
                (e.startState = qe),
                (e.innerMode = $e),
                (e.commands = Fs),
                (e.keyMap = Hs),
                (e.keyName = so),
                (e.isModifierKey = oo),
                (e.lookupKey = io),
                (e.normalizeKeyMap = ro),
                (e.StringStream = ts),
                (e.SharedTextMarker = Ls),
                (e.TextMarker = Ss),
                (e.LineWidget = xs),
                (e.e_preventDefault = Ee),
                (e.e_stopPropagation = Pe),
                (e.e_stop = Re),
                (e.addClass = s),
                (e.contains = o),
                (e.rmClass = Nl),
                (e.keyNames = Os);
        })(zo),
        (zo.version = "5.27.4"),
        zo
    );
});
