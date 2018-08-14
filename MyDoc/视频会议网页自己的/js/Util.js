
//Json2插件
this.JSON || (this.JSON = {}), function () {
    function f(t) {
        return 10 > t ? "0" + t : t
    }

    function quote(t) {
        return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function (t) {
            var e = meta[t];
            return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + t + '"'
    }

    function str(t, e) {
        var n, r, f, o, u, i = gap, a = e[t];
        switch (a && "object" == typeof a && "function" == typeof a.toJSON && (a = a.toJSON(t)), "function" == typeof rep && (a = rep.call(e, t, a)), typeof a) {
            case "string":
                return quote(a);
            case "number":
                return isFinite(a) ? String(a) : "null";
            case "boolean":
            case "null":
                return String(a);
            case "object":
                if (!a) return "null";
                if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(a)) {
                    for (o = a.length, n = 0; o > n; n += 1) u[n] = str(n, a) || "null";
                    return f = 0 === u.length ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + i + "]" : "[" + u.join(",") + "]", gap = i, f
                }
                if (rep && "object" == typeof rep) for (o = rep.length, n = 0; o > n; n += 1) r = rep[n], "string" == typeof r && (f = str(r, a), f && u.push(quote(r) + (gap ? ": " : ":") + f)); else for (r in a) Object.hasOwnProperty.call(a, r) && (f = str(r, a), f && u.push(quote(r) + (gap ? ": " : ":") + f));
                return f = 0 === u.length ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + i + "}" : "{" + u.join(",") + "}", gap = i, f
        }
    }

    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function (t, e, n) {
        var r;
        if (gap = "", indent = "", "number" == typeof n) for (r = 0; n > r; r += 1) indent += " "; else "string" == typeof n && (indent = n);
        if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
        return str("", {"": t})
    }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
        function walk(t, e) {
            var n, r, f = t[e];
            if (f && "object" == typeof f) for (n in f) Object.hasOwnProperty.call(f, n) && (r = walk(f, n), void 0 !== r ? f[n] = r : delete f[n]);
            return reviver.call(t, e, f)
        }

        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (t) {
                return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}();
//Date格式化扩展    实例↓
//var time1 = new Date().Format("yyyy-MM-dd hh:mm:ss");
//var time2 = new Date().Format("yyyy-MM-dd");
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt
};
(function (m, g) {
    var A = "0.7.7", C = "", B = "?", t = "function", i = "undefined", e = "object", r = "string", f = "major", v = "model", h = "name", p = "type", l = "vendor", x = "version", a = "architecture", j = "console", s = "mobile", y = "tablet", o = "smarttv", z = "wearable", u = "embedded";
    var b = {
        extend: function (D, F) {
            for (var E in F) {
                if ("browser cpu device engine os".indexOf(E) !== -1 && F[E].length % 2 === 0) {
                    D[E] = F[E].concat(D[E])
                }
            }
            return D
        }, has: function (E, D) {
            if (typeof E === "string") {
                return D.toLowerCase().indexOf(E.toLowerCase()) !== -1
            } else {
                return false
            }
        }, lowerize: function (D) {
            return D.toLowerCase()
        }, major: function (D) {
            return typeof(D) === r ? D.split(".")[0] : g
        }
    };
    var w = {
        rgx: function () {
            var N, H = 0, G, F, E, D, I, J, K = arguments;
            while (H < K.length && !I) {
                var M = K[H], L = K[H + 1];
                if (typeof N === i) {
                    N = {};
                    for (E in L) {
                        D = L[E];
                        if (typeof D === e) {
                            N[D[0]] = g
                        } else {
                            N[D] = g
                        }
                    }
                }
                G = F = 0;
                while (G < M.length && !I) {
                    I = M[G++].exec(this.getUA());
                    if (!!I) {
                        for (E = 0; E < L.length; E++) {
                            J = I[++F];
                            D = L[E];
                            if (typeof D === e && D.length > 0) {
                                if (D.length == 2) {
                                    if (typeof D[1] == t) {
                                        N[D[0]] = D[1].call(this, J)
                                    } else {
                                        N[D[0]] = D[1]
                                    }
                                } else {
                                    if (D.length == 3) {
                                        if (typeof D[1] === t && !(D[1].exec && D[1].test)) {
                                            N[D[0]] = J ? D[1].call(this, J, D[2]) : g
                                        } else {
                                            N[D[0]] = J ? J.replace(D[1], D[2]) : g
                                        }
                                    } else {
                                        if (D.length == 4) {
                                            N[D[0]] = J ? D[3].call(this, J.replace(D[1], D[2])) : g
                                        }
                                    }
                                }
                            } else {
                                N[D] = J ? J : g
                            }
                        }
                    }
                }
                H += 2
            }
            return N
        }, str: function (G, F) {
            for (var E in F) {
                if (typeof F[E] === e && F[E].length > 0) {
                    for (var D = 0; D < F[E].length; D++) {
                        if (b.has(F[E][D], G)) {
                            return (E === B) ? g : E
                        }
                    }
                } else {
                    if (b.has(F[E], G)) {
                        return (E === B) ? g : E
                    }
                }
            }
            return G
        }
    };
    var q = {
        browser: {
            oldsafari: {
                version: {
                    "1.0": "/8",
                    "1.2": "/1",
                    "1.3": "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }
            }
        },
        device: {
            amazon: {model: {"Fire Phone": ["SD", "KF"]}},
            sprint: {model: {"Evo Shift 4G": "7373KT"}, vendor: {HTC: "APA", Sprint: "Sprint"}}
        },
        os: {
            windows: {
                version: {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    "2000": "NT 5.0",
                    XP: ["NT 5.1", "NT 5.2"],
                    Vista: "NT 6.0",
                    "7": "NT 6.1",
                    "8": "NT 6.2",
                    "8.1": "NT 6.3",
                    "10": ["NT 6.4", "NT 10.0"],
                    RT: "ARM"
                }
            }
        }
    };
    var n = {
        browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], [h, x], [/\s(opr)\/([\w\.]+)/i], [[h, "Opera"], x], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi)\/([\w\.-]+)/i], [h, x], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i, /(Edge)\/((\d+)?[\w\.]+)/i], [[h, "IE"], x], [/(yabrowser)\/([\w\.]+)/i], [[h, "Yandex"], x], [/(comodo_dragon)\/([\w\.]+)/i], [[h, /_/g, " "], x], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i], [h, x], [/(dolfin)\/([\w\.]+)/i], [[h, "Dolphin"], x], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [[h, "Chrome"], x], [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i], [x, [h, "MIUI Browser"]], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i], [x, [h, "Android Browser"]], [/FBAV\/([\w\.]+);/i], [x, [h, "Facebook"]], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], [x, [h, "Mobile Safari"]], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], [x, h], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [h, [x, w.str, q.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i], [h, x], [/(navigator|netscape)\/([\w\.-]+)/i], [[h, "Netscape"], x], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [h, x]],
        cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[a, "amd64"]], [/(ia32(?=;))/i], [[a, b.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[a, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[a, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[a, /ower/, "", b.lowerize]], [/(sun4\w)[;\)]/i], [[a, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [[a, b.lowerize]]],
        device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [v, l, [p, y]], [/applecoremedia\/[\w\.]+ \((ipad)/], [v, [l, "Apple"], [p, y]], [/(apple\s{0,1}tv)/i], [[v, "Apple TV"], [l, "Apple"]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [l, v, [p, y]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i], [v, [l, "Amazon"], [p, y]], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i], [[v, w.str, q.device.amazon.model], [l, "Amazon"], [p, s]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [v, l, [p, s]], [/\((ip[honed|\s\w*]+);/i], [v, [l, "Apple"], [p, s]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [l, v, [p, s]], [/\(bb10;\s(\w+)/i], [v, [l, "BlackBerry"], [p, s]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i], [v, [l, "Asus"], [p, y]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [[l, "Sony"], [v, "Xperia Tablet"], [p, y]], [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i], [[l, "Sony"], [v, "Xperia Phone"], [p, s]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], [l, v, [p, j]], [/android.+;\s(shield)\sbuild/i], [v, [l, "Nvidia"], [p, j]], [/(playstation\s[3portablevi]+)/i], [v, [l, "Sony"], [p, j]], [/(sprint\s(\w+))/i], [[l, w.str, q.device.sprint.vendor], [v, w.str, q.device.sprint.model], [p, s]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], [l, v, [p, y]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], [l, [v, /_/g, " "], [p, s]], [/(nexus\s9)/i], [v, [l, "HTC"], [p, y]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], [v, [l, "Microsoft"], [p, j]], [/(kin\.[onetw]{3})/i], [[v, /\./g, " "], [l, "Microsoft"], [p, s]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i], [v, [l, "Motorola"], [p, s]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [v, [l, "Motorola"], [p, y]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[l, "Samsung"], v, [p, y]], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[l, "Samsung"], v, [p, s]], [/(samsung);smarttv/i], [l, v, [p, o]], [/\(dtv[\);].+(aquos)/i], [v, [l, "Sharp"], [p, o]], [/sie-(\w+)*/i], [v, [l, "Siemens"], [p, s]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i], [[l, "Nokia"], v, [p, s]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i], [v, [l, "Acer"], [p, y]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [[l, "LG"], v, [p, y]], [/(lg) netcast\.tv/i], [l, v, [p, o]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i], [v, [l, "LG"], [p, s]], [/android.+(ideatab[a-z0-9\-\s]+)/i], [v, [l, "Lenovo"], [p, y]], [/linux;.+((jolla));/i], [l, v, [p, s]], [/((pebble))app\/[\d\.]+\s/i], [l, v, [p, z]], [/android.+;\s(glass)\s\d/i], [v, [l, "Google"], [p, z]], [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i], [[v, /_/g, " "], [l, "Xiaomi"], [p, s]], [/(mobile|tablet);.+rv\:.+gecko\//i], [[p, b.lowerize], l, v]],
        engine: [[/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [h, x], [/rv\:([\w\.]+).*(gecko)/i], [x, h]],
        os: [[/microsoft\s(windows)\s(vista|xp)/i], [h, x], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [h, [x, w.str, q.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[h, "Windows"], [x, w.str, q.os.windows.version]], [/\((bb)(10);/i], [[h, "BlackBerry"], x], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i], [h, x], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[h, "Symbian"], x], [/\((series40);/i], [h], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[h, "Firefox OS"], x], [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [h, x], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[h, "Chromium OS"], x], [/(sunos)\s?([\w\.]+\d)*/i], [[h, "Solaris"], x], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [h, x], [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i], [[h, "iOS"], [x, /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i], [[h, "Mac OS"], [x, /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i], [h, x]]
    };
    var k = function (E, G) {
        if (!(this instanceof k)) {
            return new k(E, G).getResult()
        }
        var F = E || ((m && m.navigator && m.navigator.userAgent) ? m.navigator.userAgent : C);
        var D = G ? b.extend(n, G) : n;
        this.getBrowser = function () {
            var H = w.rgx.apply(this, D.browser);
            H.major = b.major(H.version);
            return H
        };
        this.getCPU = function () {
            return w.rgx.apply(this, D.cpu)
        };
        this.getDevice = function () {
            return w.rgx.apply(this, D.device)
        };
        this.getEngine = function () {
            return w.rgx.apply(this, D.engine)
        };
        this.getOS = function () {
            return w.rgx.apply(this, D.os)
        };
        this.getResult = function () {
            return {
                ua: this.getUA(),
                browser: this.getBrowser(),
                engine: this.getEngine(),
                os: this.getOS(),
                device: this.getDevice(),
                cpu: this.getCPU()
            }
        };
        this.getUA = function () {
            return F
        };
        this.setUA = function (H) {
            F = H;
            return this
        };
        this.setUA(F);
        return this
    };
    k.VERSION = A;
    k.BROWSER = {NAME: h, MAJOR: f, VERSION: x};
    k.CPU = {ARCHITECTURE: a};
    k.DEVICE = {MODEL: v, VENDOR: l, TYPE: p, CONSOLE: j, MOBILE: s, SMARTTV: o, TABLET: y, WEARABLE: z, EMBEDDED: u};
    k.ENGINE = {NAME: h, VERSION: x};
    k.OS = {NAME: h, VERSION: x};
    if (typeof(exports) !== i) {
        if (typeof module !== i && module.exports) {
            exports = module.exports = k
        }
        exports.UAParser = k
    } else {
        if (typeof(define) === t && define.amd) {
            define(function () {
                return k
            })
        } else {
            m.UAParser = k
        }
    }
    var d = m.jQuery || m.Zepto;
    if (typeof d !== i) {
        var c = new k();
        d.ua = c.getResult();
        d.ua.get = function () {
            return c.getUA()
        };
        d.ua.set = function (E) {
            c.setUA(E);
            var D = c.getResult();
            for (var F in D) {
                d.ua[F] = D[F]
            }
        }
    }
})(this);
/**
 * Created by Spx on 2016/1/18.
 */
//模板初始化回调功能
(function (window) {
    function TemplateConfig() {
        this.configHandler = {
            imageChange: function () {
            },
            audioChange: function () {
            },
            cssChange: function () {
            },
            divChange: function () {
            },
            ingChangeInfo: function () {
            },
            bodyChange: function () {
            }
        }
    }

    TemplateConfig.prototype = {
        subscribe: function (type, callback) {
            var self = this;
            if (typeof callback === "function") {
                self.configHandler[type] = callback;
            }
        },
        publish: function (type, params) {
            var self = this;
            if (self.configHandler.hasOwnProperty(type)) {
                self.configHandler[type].call(self, params);
            }
        }
    };
    window.TemplateHandler = new TemplateConfig();
}(window));

(function ($) {
    var webConfigs = {
            swcbUrl: window.configs.swcbUrl + "index.php",
            apiUrl: window.configs.swcbUrl + "api.php",
            sBaseUrl: window.configs.sbaseUrl + "index.php",
            sContentUrl: window.configs.sbaseUrl,
            stoolUrl: window.configs.toolsbUrl + "index.php",
            sTemplateUrl: window.configs.templatebUrl,
            getEventInfoUrl: window.configs.webinarbUrl,
            adminbUrl: window.configs.adminbUrl,
            seminarbUrl: window.configs.seminarbUrl,
            componentAppId: window.configs.componentAppId,
            smarketMember: 'smarketMember',
            smarketCustomForm: 'smarketCustomForm',//为了标识表单cookie唯一
            swfUrl: "/easyxdm/Plugin/xdm/easyxdm.swf",
            remoteUrl: "/easyxdm/Cors/index.html",
            remoteHelperUrl: "/easyxdm/Cors/name.html"
        },
        browserInfo = $.ua,
        contactInfo = {
            //匿名用户相关
            globalUserId: "",
            //微信用户相关
            city: "",
            country: "",
            gender: "",
            groupId: "",
            groupid: "",
            headImgUrl: "",
            headimgurl: "",
            language: "",
            nickname: "--",
            openId: "",
            openid: "",
            authCode: "",
            province: "",
            remark: "",
            sex: "",
            subscribe: "",
            subscribeTime: "",
            subscribe_time: "",
            //登陆用户相关
            name: "",
            memberId: "",
            unique: "",
            uniqueType: "",
            session: ""
        },
        globalUserId = "",
        smarketMember = {},
        openId = "",
        code = "",
        configId = "",
        defaultOption = {
            extraConfig: {
                init: {
                    url: "",
                    cmd: ""
                },
                post: {
                    url: "",
                    cmd: ""
                }
            },
            identity: 1,
            formId: 0,
            trackId: 0,
            schemaId: 0,
            type: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/) ? "mobile" : "pc",
            isWeChatBrowser: navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger",
            weChatId: 0,
            attentionWeChat: "0",//是否关注后参与
            instanceId: 0,
            isSilentAuthorise: false
        };
    $.extend({
        //获取webConfigs的配置项
        Configs: function () {
            if (arguments.length > 0) {
                if (typeof arguments[0] == "string") {
                    return webConfigs[arguments[0]] || "";
                } else if (typeof arguments[0] == "object") {
                    $.extend(webConfigs, arguments[0]);
                }
            }
        },
        //获取url中指定参数名的值
        queryString: function (name, url) {
            var queryUrl = url || document.URL;
            var reg = new RegExp("[?|&]" + name + "=([^&#/]*)", "i");
            if (queryUrl.indexOf('?') > -1) {
                var search = queryUrl.substr(queryUrl.indexOf('?'));
                var r = search.match(reg);
                if (r != null) return decodeURIComponent(r[1]);
                return null;
            }
            return null;
        },
        //验证是否为url
        isUrl: function (url) {
            var strRegex = "^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$";
            return new RegExp(strRegex).test(url);
        },
        //获取url中的域名（不包含http://或者https://）
        matchLinkDomain: function (url) {
            var domainRegex = /([A-Za-z0-9]+(-[A-Za-z0-9]+)*\.)+[A-Za-z]{2,}/g,
                result = url.match(domainRegex);
            return result.length > 0 ? result[0] : "";
        },
        //移除url中指定名字的参数，第一个参数为url，后面为任意多个参数名 例：$.removeParam(window.location.href, "code", "appid", "state")
        removeParam: function (sourceURL) {
            var rtn = decodeURIComponent(sourceURL).split("?")[0],
                param,
                params_arr = [],
                queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
            if (queryString !== "") {
                params_arr = queryString.split("&");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    param = params_arr[i].split("=")[0];
                    for (var x = arguments.length - 1; x >= 1; x -= 1) {
                        if (param === arguments[x]) {
                            params_arr.splice(i, 1);
                        }
                    }
                }
                rtn = rtn + "?" + params_arr.join("&");
            }
            return rtn;
        },
        //是否为微信浏览器返回boolean
        isWeChatBrowser: navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
    });
    code = $.queryString("code");
    configId = $.queryString("configId");
    //初始化页面 验证模板地址是否正确，生成匿名用户ID
    $["initPage"] = function (callback) {
        if (configId && configId != undefined) {
            $.ajax({
                type: "POST",
                url: $.Configs("sTemplateUrl"),
                dataType: 'json',
                data: {
                    "command": {
                        "size": 0,
                        "orn": "02-0001-00000001",
                        "dst": "01-0100-00000001",
                        "type": 2,
                        "sess": '',
                        "cmd": "template.template.getConfig",
                        "seq": 0,
                        "ver": 1000,
                        "body": {
                            configId: configId
                        }
                    }
                }
            }).then(function (config) {
                var isSubPage = false;
                //验证访问地址和设置的模板地址是否相同
                if ($.isUrl(config["body"]["content"]["configInfo"]["formalUrl"]) && window.location.href.indexOf(config["body"]["content"]["configInfo"]["formalUrl"]) < 0) {
                    for (var i = 0; i < config["body"]["content"]["configInfo"]["html"].length; i++) {
                        if (window.location.href.indexOf(config["body"]["content"]["configInfo"]["html"][i]["formalUrl"]) > -1) {
                            isSubPage = true;
                            break;
                        }
                    }
                    if (!isSubPage) {
                        window.location.href = config["body"]["content"]["configInfo"]["formalUrl"] + "?" + window.location.href.split('?')[1];
                        return;
                    }
                }
                $.initAnonymous(callback);
            });
        } else {
            $.initAnonymous(callback);
        }
    };
    //初始化匿名用户ID
    $["initAnonymous"] = function (callback) {
        globalUserId = $.cookie("globalUserId");
        if (!globalUserId) {
            $.getScript(
                "http://pv.sohu.com/cityjson?ie=utf-8",
                function () {
                    $.ajax({
                        type: "POST",
                        url: $.Configs("sBaseUrl"),
                        dataType: 'json',
                        data: {
                            "command": {
                                "size": 0,
                                "orn": "02-0001-00000001",
                                "dst": "01-0100-00000001",
                                "type": 2,
                                "sess": '',
                                "cmd": "anonymous.getId",
                                "seq": 0,
                                "ver": 1000,
                                "body": {
                                    'clientIP': window["returnCitySN"] ? window["returnCitySN"]['cip'] : '127.0.0.1',
                                    'clientVersion': browserInfo.browser ? browserInfo.browser.version : '',
                                    'clientBrand': browserInfo.browser ? browserInfo.browser.name : '',
                                    'clientType': browserInfo.os ? browserInfo.os.name : ''
                                }
                            }
                        },
                        success: function (data) {
                            if (data && data["body"]["result"] == 0) {
                                $.cookie('globalUserId', data["body"]["content"], {path: '/', expires: 3650});
                                contactInfo["globalUserId"] = data["body"]["content"];
                                if (typeof callback === "function") {
                                    callback(data["body"]["content"]);
                                }
                            }
                        }
                    });
                }
            );
        } else {
            contactInfo["globalUserId"] = globalUserId;
            if (typeof callback === "function") {
                callback(globalUserId);
            }
        }
    };
    //获取前调数据  返回参数第一个为用户身份信息 第二个为前调返回的数据
    $["initForm"] = function (option, callback) {
        option["extraConfig"] = option["extraConfig"] || {};
        $.extend(true, defaultOption, option);
        smarketMember = typeof $.cookie(webConfigs["smarketMember"] + "_" + defaultOption["schemaId"]) == "string" ? JSON.parse($.cookie(webConfigs["smarketMember"] + "_" + defaultOption["schemaId"])) : $.cookie(webConfigs["smarketMember"] + "_" + defaultOption["schemaId"]) || {};
        openId = $.cookie("openId" + defaultOption["weChatId"]);
        if (defaultOption["identity"] == "1") {
            if (defaultOption["attentionWeChat"] == "1" && defaultOption["weChatId"] && defaultOption["type"] == "mobile" && defaultOption["isWeChatBrowser"]) {
                $.initWeChat(defaultOption["weChatId"], "", defaultOption["isSilentAuthorise"]).then(function () {
                    initPre();
                }, function (result) {
                    if (result) {
                        callback(contactInfo, {result: -1, desc: result});
                    }
                });
            } else {
                initPre();
            }
        } else if (defaultOption["identity"] == "2") {
            if (defaultOption["type"] == "mobile") {
                if (defaultOption["weChatId"]) {
                    $.initWeChat(defaultOption["weChatId"], "", defaultOption["isSilentAuthorise"]).then(function () {
                        initPre();
                    }, function (result) {
                        if (result) {
                            callback(contactInfo, {result: -1, desc: result});
                        }
                    });
                } else {
                    alert("请传入weChatId");
                }
            } else {
                initPre();
            }
        } else if (defaultOption["identity"] == "3") {
            if (smarketMember && !$.isEmptyObject(smarketMember)) {
                contactInfo["name"] = smarketMember["name"];
                contactInfo["memberId"] = smarketMember["memberId"];
                contactInfo["unique"] = smarketMember["unique"];
                contactInfo["uniqueType"] = smarketMember["uniqueType"];
                contactInfo["session"] = smarketMember["session"];
                initPre();
            } else {
                if (defaultOption["weChatId"] && defaultOption["weChatId"] != "0" && defaultOption["type"] == "mobile" && defaultOption["isWeChatBrowser"]) {//如果有微信可走自动登录
                    $.initWeChat(defaultOption["weChatId"], defaultOption["schemaId"], defaultOption["isSilentAuthorise"]).then(function () {
                        if (smarketMember && !$.isEmptyObject(smarketMember)) {
                            initPre();
                        } else {
                            $.initRegister(defaultOption["formId"], defaultOption["trackId"], defaultOption["schemaId"], defaultOption["type"]).then(function () {
                                initPre();
                            }, function (result) {
                                if (result) {
                                    callback(contactInfo, {result: -1, desc: result});
                                }
                            });
                        }
                    }, function () {
                        $.initRegister(defaultOption["formId"], defaultOption["trackId"], defaultOption["schemaId"], defaultOption["type"]).then(function () {
                            initPre();
                        }, function (result) {
                            if (result) {
                                callback(contactInfo, {result: -1, desc: result});
                            }
                        });
                    });
                } else {
                    $.initRegister(defaultOption["formId"], defaultOption["trackId"], defaultOption["schemaId"], defaultOption["type"]).then(function () {
                        initPre();
                    }, function (result) {
                        if (result) {
                            callback(contactInfo, {result: -1, desc: result});
                        }
                    });
                }
            }
        }
        function initPre() {
            if (defaultOption["extraConfig"]["init"]["url"] && defaultOption["extraConfig"]["init"]["cmd"]) {
                if (defaultOption["instanceId"]) {
                    $.ajax({
                        type: "POST",
                        url: defaultOption["extraConfig"]["init"]["url"],
                        dataType: 'json',
                        data: {
                            "command": {
                                "size": 0,
                                "orn": "02-0001-00000001",
                                "dst": "01-0100-00000001",
                                "type": 2,
                                "cmd": defaultOption["extraConfig"]["init"]["cmd"],
                                "sess": smarketMember.session || "",
                                "seq": 0,
                                "ver": 1000,
                                "body": {
                                    session: smarketMember.session || "",
                                    instanceId: defaultOption.instanceId
                                }
                            }
                        },
                        success: function (content) {
                            if (typeof callback == "function") {
                                callback(contactInfo, content["body"]);
                            }
                        },
                        error: function () {
                            if (typeof callback == "function") {
                                callback(contactInfo, {result: -1, desc: "通讯错误"});
                            }
                        }
                    });
                } else {
                    callback(contactInfo, {result: -1, desc: "前调方法需要传入instanceId参数"});
                }
            } else {
                callback(contactInfo, {result: 0, desc: ""});
            }
        }
    };
    //提交回调数据
    $["postForm"] = function (data, callback) {
        if (defaultOption["extraConfig"] && defaultOption["extraConfig"]["post"]["url"] && defaultOption["extraConfig"]["post"]["cmd"]) {
            $.ajax({
                type: "POST",
                url: defaultOption["extraConfig"]["post"]["url"],
                dataType: 'json',
                data: {
                    "command": {
                        "size": 0,
                        "orn": "02-0001-00000001",
                        "dst": "01-0100-00000001",
                        "type": 2,
                        "cmd": defaultOption["extraConfig"]["post"]["cmd"],
                        "sess": smarketMember.session || "",
                        "seq": 0,
                        "ver": 1000,
                        "body": $.extend(contactInfo, data)
                    }
                },
                success: function (data) {
                    if (data && data.body.result == 0) {
                        if (typeof callback == "function") {
                            callback(data);
                        }
                    } else {
                        callback(data.body);
                    }
                }
            });
        } else {
            if (typeof callback == "function") {
                callback();
            }
        }
    };
    //显示需要在微信浏览器打开页面
    $["browseInWeChat"] = function () {
        $("<div style='position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 100;background-color: rgba(0,0,0,.7);'>" +
            "<div style='position:absolute;top:18%;left:50%;margin-left:-9em;width:16em;padding:1.5em 1em;background: #fff;border-radius: 6px;text-align: center;font-size:16px;'>" +
            "<h1 style='font-size:1.1em;color:#1584b7;line-height: 2em;margin-bottom: .5em;'>您需要在微信中打开才能参与</h1>" +
            "<p style='line-height:1.5em;margin-bottom: .75em;'><img src='http://cdn.smarket.net.cn/images/icon-b-wechat.png' alt='' style='vertical-align: middle'/>用微信扫一扫下面二维码</p>" +
            "<div style='width:11em;margin:0 auto .5em;background: url('http://cdn.smarket.net.cn/images/bg-wechatcode.png') no-repeat;padding:.75em .3em;background-size:100% 100%;'>" +
            "<img src='http://qr.liantu.com/api.php?text=" + window.location.href + "' alt='' style='display:inline-block;width: 10em;height:10em;'/></div></div></div>").appendTo("body");
    };
    $["showErrorMessage"] = function (message) {
        $("<div style=\"position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 100;background-color: rgba(0,0,0,.7);\">" +
            "<div style=\"position:absolute;top:18%;left:50%;margin-left:-9em;width:16em;padding:1.5em 1em;background: #fff;border-radius: 6px;text-align: center;font-size:16px;\">" +
            "<h1 style=\"font-size:1.1em;color:#1584b7;line-height: 2em;margin-bottom: .5em;\">" + message + "</h1></div></div>").appendTo("body");
    };
    //初始化微信身份
    $["initWeChat"] = function (weChatId, schemaId, isSilentAuthorise) {
        var deferred = $.Deferred(),
            weChatInfo = {},
            openId = $.cookie("openId" + weChatId),
            scope = isSilentAuthorise ? "snsapi_base" : "snsapi_userinfo";
        if (defaultOption["type"] == "mobile") {
            if (defaultOption["isWeChatBrowser"]) {
                if (!openId) {
                    if (!code) {
                        weChatAuthorize();
                    } else {
                        $.ajax({
                            type: "POST",
                            url: $.Configs("swcbUrl"),
                            dataType: 'json',
                            data: {
                                "command": {
                                    "size": 0,
                                    "orn": "02-0001-00000001",
                                    "dst": "01-0100-00000001",
                                    "type": 2,
                                    "sess": '',
                                    "cmd": "contact.getByCode",
                                    "seq": 0,
                                    "ver": 1000,
                                    "body": {
                                        weChatId: weChatId,
                                        code: code,
                                        schemaId: schemaId || ""
                                    }
                                }
                            },
                            success: function (data) {
                                if (data && data["body"]["result"] == 0) {
                                    $.cookie('openId' + weChatId, data["body"]["content"]["openId"], {path: '/'});
                                    contactInfo["city"] = data["body"]["content"]["city"];
                                    contactInfo["country"] = data["body"]["content"]["country"];
                                    contactInfo["gender"] = data["body"]["content"]["gender"];
                                    contactInfo["groupId"] = data["body"]["content"]["groupId"];
                                    contactInfo["groupid"] = data["body"]["content"]["groupid"];
                                    contactInfo["headImgUrl"] = data["body"]["content"]["headImgUrl"];
                                    contactInfo["headimgurl"] = data["body"]["content"]["headimgurl"];
                                    contactInfo["language"] = data["body"]["content"]["language"];
                                    contactInfo["nickname"] = data["body"]["content"]["nickname"];
                                    contactInfo["openId"] = data["body"]["content"]["openId"];
                                    contactInfo["openid"] = data["body"]["content"]["openid"];
                                    contactInfo["authCode"] = data["body"]["content"]["authCode"];
                                    contactInfo["province"] = data["body"]["content"]["province"];
                                    contactInfo["remark"] = data["body"]["content"]["remark"];
                                    contactInfo["sex"] = data["body"]["content"]["sex"];
                                    contactInfo["subscribe"] = data["body"]["content"]["subscribe"];
                                    contactInfo["subscribeTime"] = data["body"]["content"]["subscribeTime"];
                                    contactInfo["subscribe_time"] = data["body"]["content"]["subscribe_time"];
                                    if (data["body"]["content"]["memberId"] && data["body"]["content"]["session"] && schemaId) {
                                        contactInfo["name"] = data["body"]["content"]["name"];
                                        contactInfo["memberId"] = data["body"]["content"]["memberId"];
                                        contactInfo["unique"] = data["body"]["content"]["unique"];
                                        contactInfo["uniqueType"] = data["body"]["content"]["uniqueField"];
                                        contactInfo["session"] = data["body"]["content"]["session"];
                                        smarketMember["name"] = contactInfo["name"];
                                        smarketMember["memberId"] = contactInfo["memberId"];
                                        smarketMember["unique"] = contactInfo["unique"];
                                        smarketMember["uniqueType"] = contactInfo["uniqueType"];
                                        smarketMember["session"] = contactInfo["session"];
                                        $.cookie(webConfigs["smarketMember"] + '_' + schemaId, smarketMember, {
                                            path: '/'
                                        });
                                    }
                                    if (contactInfo["subscribe"] != "1" && defaultOption["attentionWeChat"] == "1" && defaultOption["type"] == "mobile") {
                                        $.showWeChatQrCode(weChatId);
                                    }
                                    deferred.resolve(contactInfo);
                                } else if (data && data["body"]["result"] == 40029) {
                                    weChatAuthorize();
                                } else {
                                    deferred.reject(data["body"]["desc"]);
                                }
                            },
                            error: function () {
                                deferred.reject("通讯错误");
                            }
                        });
                    }
                } else {
                    $.ajax({
                        type: "POST",
                        url: $.Configs("swcbUrl"),
                        dataType: 'json',
                        data: {
                            "command": {
                                "size": 0,
                                "orn": "02-0001-00000001",
                                "dst": "01-0100-00000001",
                                "type": 2,
                                "sess": '',
                                "cmd": "contact.getByOpenId",
                                "seq": 0,
                                "ver": 1000,
                                "body": {
                                    weChatId: weChatId,
                                    openId: openId,
                                    schemaId: schemaId || ""
                                }
                            }
                        },
                        success: function (data) {
                            if (data && data["body"]["result"] == 0) {
                                contactInfo["city"] = data["body"]["content"]["city"];
                                contactInfo["country"] = data["body"]["content"]["country"];
                                contactInfo["gender"] = data["body"]["content"]["gender"];
                                contactInfo["groupId"] = data["body"]["content"]["groupId"];
                                contactInfo["groupid"] = data["body"]["content"]["groupid"];
                                contactInfo["headImgUrl"] = data["body"]["content"]["headImgUrl"];
                                contactInfo["headimgurl"] = data["body"]["content"]["headimgurl"];
                                contactInfo["language"] = data["body"]["content"]["language"];
                                contactInfo["nickname"] = data["body"]["content"]["nickname"];
                                contactInfo["openId"] = data["body"]["content"]["openId"];
                                contactInfo["openid"] = data["body"]["content"]["openid"];
                                contactInfo["authCode"] = data["body"]["content"]["authCode"];
                                contactInfo["province"] = data["body"]["content"]["province"];
                                contactInfo["remark"] = data["body"]["content"]["remark"];
                                contactInfo["sex"] = data["body"]["content"]["sex"];
                                contactInfo["subscribe"] = data["body"]["content"]["subscribe"];
                                contactInfo["subscribeTime"] = data["body"]["content"]["subscribeTime"];
                                contactInfo["subscribe_time"] = data["body"]["content"]["subscribe_time"];
                                if (data["body"]["content"]["session"] && data["body"]["content"]["memberId"] && schemaId) {
                                    contactInfo["name"] = data["body"]["content"]["name"];
                                    contactInfo["memberId"] = data["body"]["content"]["memberId"];
                                    contactInfo["unique"] = data["body"]["content"]["unique"];
                                    contactInfo["uniqueType"] = data["body"]["content"]["uniqueField"];
                                    contactInfo["session"] = data["body"]["content"]["session"];
                                    smarketMember["name"] = contactInfo["name"];
                                    smarketMember["memberId"] = contactInfo["memberId"];
                                    smarketMember["unique"] = contactInfo["unique"];
                                    smarketMember["uniqueType"] = contactInfo["uniqueType"];
                                    smarketMember["session"] = contactInfo["session"];
                                    $.cookie(webConfigs["smarketMember"] + '_' + schemaId, smarketMember, {
                                        path: '/'
                                    });
                                }
                                if (contactInfo["subscribe"] != "1" && defaultOption["attentionWeChat"] == "1" && defaultOption["type"] == "mobile") {
                                    $.showWeChatQrCode();
                                }
                                deferred.resolve(contactInfo);
                            } else {
                                deferred.reject(data["body"]["desc"]);
                            }
                        },
                        error: function () {
                            deferred.reject("通讯错误");
                        }
                    });
                }
            } else {
                $.browseInWeChat();
            }
        } else {
            deferred.resolve(contactInfo);
        }
        function weChatAuthorize() {
            $.ajax({
                type: "POST",
                url: $.Configs("swcbUrl"),
                dataType: 'json',
                data: {
                    "command": {
                        "size": 0,
                        "orn": "02-0001-00000001",
                        "dst": "01-0100-00000001",
                        "type": 2,
                        "sess": '',
                        "cmd": "weChat.getAppId",
                        "seq": 0,
                        "ver": 1000,
                        "body": {
                            weChatId: weChatId
                        }
                    }
                },
                success: function (data) {
                    if (data && data["body"]["result"] == 0) {
                        weChatInfo = data["body"]["content"];
                        //当为已认证服务号时走服务号自己的静默授权
                        //当为未认证的服务号时不进行授权，因为未认证的服务号变为已认证会影响数据准确性
                        //当为已认证和未认证的订阅号时走赛诺贝斯产品演示的非静默授权
                        //accountType 		<1-服务号；2-订阅号>
                        //isCertified 		<0-未认证；1-已认证>
                        //authType          <授权类型 0-绑定方式 1-授权方式>
                        //authStatus        <授权状态 0-未联通 1-已联通>
                        if (weChatInfo["accountType"] == 1) {
                            if (weChatInfo["isCertified"] == 1) {
                                if (weChatInfo["authType"] == 1) {
                                    if (weChatInfo["authStatus"] == 1) {
                                        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + weChatInfo["appId"]
                                            + "&redirect_uri=" + encodeURIComponent($.removeParam(window.location.href.replace('#rd', ''), "code", "appid", "state"))
                                            + "&response_type=code&scope=" + scope + "&state=&component_appid=" + $.Configs("componentAppId")
                                            + "#wechat_redirect";
                                    } else {
                                        deferred.reject("该公众号状态为未接通，请先授权");
                                    }
                                } else {
                                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + weChatInfo["appId"]
                                        + "&redirect_uri=" + encodeURIComponent($.removeParam(window.location.href.replace('#rd', ''), "code", "appid", "state"))
                                        + "&response_type=code&scope=" + scope + "&state=#wechat_redirect";
                                }
                            } else {
                                deferred.resolve(contactInfo);
                            }
                        } else {
                            deferred.resolve(contactInfo);
                        }
                    } else {
                        deferred.reject(data["body"]["desc"]);
                    }
                },
                error: function () {
                    deferred.reject("通讯错误");
                }
            });
        }

        return deferred.promise();
    };
    //显示公众号二维码
    $["showWeChatQrCode"] = function () {
        $.ajax({
            type: "POST",
            url: $.Configs("swcbUrl"),
            dataType: 'json',
            data: {
                "command": {
                    "size": 0,
                    "orn": "02-0001-00000001",
                    "dst": "01-0100-00000001",
                    "type": 2,
                    "sess": '',
                    "cmd": "weChat.getAppId",
                    "seq": 0,
                    "ver": 1000,
                    "body": {
                        weChatId: defaultOption["weChatId"]
                    }
                }
            },
            success: function (data) {
                if (data && data["body"]["result"] == 0) {
                    $("<div style='position: fixed;top:0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,.5);z-index:1000'>" +
                        "<div style='display: block;width: 200px;height: 200px;position: absolute;top:46%;left: 50%;margin-top: -125px;margin-left:-100px;border: 1px solid #ccc;'>" +
                        "<img src=" + data["body"]["content"]["qrCodeUrl"] + " style='display: block;width: 100%;height: 100%;padding:200px 0 0 180px;position: absolute;right: 0;bottom:0;' alt=''/>" +
                        "<p style='width:200px;color:#fff;font-size:28px;position: absolute;right:0;bottom:-70px;text-align: center;'>请先关注公众号 长按识别二维码</p> </div></div>").appendTo("body");
                }
            }
        });
    };
    //formId:表单ID，trackId：渠道ID，schemaId：体系ID，type：类型 "pc" "mobile"
    $["initRegister"] = function (formId, trackId, schemaId, type) {
        var deferred = $.Deferred();
        if (smarketMember && !$.isEmptyObject(smarketMember)) {
            contactInfo["name"] = smarketMember["name"];
            contactInfo["memberId"] = smarketMember["memberId"];
            contactInfo["unique"] = smarketMember["unique"];
            contactInfo["uniqueType"] = smarketMember["uniqueType"];
            contactInfo["session"] = smarketMember["session"];
            deferred.resolve(contactInfo);
        } else {
            $.ajax({
                type: "POST",
                url: $.Configs("stoolUrl"),
                dataType: 'json',
                data: {
                    "command": {
                        "size": 0,
                        "orn": "02-0001-00000001",
                        "dst": "01-0100-00000001",
                        "type": 2,
                        "sess": '',
                        "cmd": "member.form.search",
                        "seq": 0,
                        "ver": 1000,
                        "body": {
                            tenantId: "",
                            schemaId: schemaId,
                            trackId: trackId,
                            formId: formId,
                            keyword: "",
                            start: 0,
                            num: 999
                        }
                    }
                },
                success: function (data) {
                    if (data && data["body"]["result"] == 0) {
                        if (data["body"]["content"]["items"].length > 0) {
                            var reg = new RegExp("(^|&)weChatId=([^&]*)(&|$)");
                            var r = window.location.search.substr(1).match(reg);
                            if (r != null) {
                                window.location.href = data["body"]["content"]["items"][0]["link"][type] + "&weChatId=" + unescape(r[2]) + "&authCode=" + contactInfo["authCode"] + "&returnUrl=" + encodeURIComponent(window.location.href) + (defaultOption["isWeChatBrowser"] ? "#wechat_redirect" : "");
                            } else {
                                window.location.href = data["body"]["content"]["items"][0]["link"][type] + "&authCode=" + contactInfo["authCode"] + "&returnUrl=" + encodeURIComponent(window.location.href) + (defaultOption["isWeChatBrowser"] ? "#wechat_redirect" : "");
                            }

                        }
                    }
                }
            });
        }
        return deferred.promise();
    };
    //初始化微信分享
    $["initWeChatShare"] = function (option, callback, shareSuccessCallback) {
        $.ajax({
            url: $.Configs("swcbUrl"),
            type: "POST",
            data: {
                "command": {
                    "size": 0,
                    "orn": "02-0001-00000001",
                    "dst": "02-0001-00000001",
                    "type": 2,
                    "cmd": "article.share",
                    "sess": "",
                    "seq": 0,
                    "ver": 1000,
                    "body": {
                        "weChatId": option.weChatId,
                        "url": window.location.href
                    }
                }
            },
            success: function (result) {
                result = JSON.parse(result);
                var config = result["body"]["content"];
                config.jsApiList = [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'scanQRCode',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage'
                ];
                if (window.wx) {
                    wx.config(config);
                    wx.ready(function () {
                        if (option.wxHide) {
                            wx["hideOptionMenu"]();
                            return;
                        }
                        wx["onMenuShareAppMessage"]({
                            title: option.title, // 分享标题
                            desc: option.summary, // 分享描述
                            link: option.url, // 分享链接
                            imgUrl: option.coverImageUrl, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                if (typeof shareSuccessCallback == "function") {
                                    shareSuccessCallback();
                                }
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx["onMenuShareTimeline"]({
                            title: option.title, // 分享标题
                            link: option.url, // 分享链接
                            imgUrl: option.coverImageUrl, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                if (typeof shareSuccessCallback == "function") {
                                    shareSuccessCallback();
                                }
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    });
                    wx.error(function (res) {
                        //for (var item in res) {
                        //    alert(res[item]);
                        //}
                    });
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    alert("请在微信客户端中打开本网页");
                }
            }
        });
    };
    //在微信中上传图片
    $["uploadWeChatImage"] = function () {
        var deferred = $.Deferred(),
            fileInfo = {
                fileName: "",
                mappingId: "",
                url: ""
            };
        wx["chooseImage"]({
            count: 1, // 不传默认为9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res["localIds"]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                window.setTimeout(function () {
                    wx["uploadImage"]({
                        localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res1) {
                            var serverId = res1.serverId; // 返回图片的服务器端ID
                            $.ajax({
                                type: "POST",
                                url: $.Configs("swcbUrl"),
                                dataType: 'json',
                                data: {
                                    "command": {
                                        "size": 0,
                                        "orn": "02-0001-00000001",
                                        "dst": "01-0100-00000001",
                                        "type": 2,
                                        "cmd": "media.getMapIdByMediaId",
                                        "sess": "",
                                        "seq": 0,
                                        "ver": 1000,
                                        "body": {
                                            mediaId: serverId
                                        }
                                    }
                                },
                                success: function (result) {
                                    result = result['body'];
                                    if (result["result"] == 0) {
                                        fileInfo["mappingId"] = result["content"]["mappingId"];
                                        fileInfo["url"] = result["content"]["url"];
                                        fileInfo["fileName"] = result["content"]["fileName"];
                                        deferred.resolve(fileInfo);
                                    } else {
                                        deferred.reject("上传失败：" + result['desc']);
                                    }
                                },
                                error: function (data) {
                                    console.log(data.desc);
                                }
                            });
                        }
                    });
                }, 100);
            }
        });
        return deferred.promise();
    };
    //初始化模板信息
    $["initTemplate"] = function (config, callback) {
        var handler = {
                image: function (option) {
                    if (option["extra"]["isUse"] == "true" || option["extra"]["isUse"] === true || option["extra"]["isUse"] == 1) {
                        option["element"].show().attr("src", option["url"]);
                    } else {
                        option["element"].hide().attr("src", "");
                    }
                    TemplateHandler.publish("imageChange", option["extra"]["replaceUrl"] != "");
                    TemplateHandler.publish("ingChangeInfo", {name: option["extra"]["attrName"], url: option["url"]});
                },
                css: function (option) {
                    if (option["element"].length > 0) {
                        option["element"].attr("href", option["url"]);
                    } else {
                        var fileRef = document.createElement('link');
                        fileRef.setAttribute("rel", "stylesheet");
                        fileRef.setAttribute("type", "text/css");
                        fileRef.setAttribute("href", option["url"]);
                        document.getElementsByTagName("head")[0].appendChild(fileRef);
                    }
                    TemplateHandler.publish("cssChange");
                    TemplateHandler.configHandler.imageChange();
                },
                audio: function (option) {
                    option["element"].attr("src", option["url"]);
                    TemplateHandler.publish("audioChange", option["extra"]["replaceUrl"] != "");
                },
                div: function (option) {
                    TemplateHandler.publish("divChange", {
                        name: option["extra"]["attrName"],
                        show: option["extra"]['isShow']
                    });
                },
                p: function (option) {
                    option["element"].html(option["url"] || option["text"]);
                    TemplateHandler.publish("pChange", {
                        name: option["extra"]["attrName"],
                        show: option["extra"]['isShow']
                    });
                },
                a: function (option) {
                    option["element"].attr("href", option["url"]);
                    option["element"].html(option["text"]);
                    TemplateHandler.publish("aChange", {
                        name: option["extra"]["attrName"],
                        show: option["extra"]['isShow']
                    });
                },
                aimage: function (option) {
                    option["element"].attr("href", option["url"]);
                    option["element"].find("img").attr("href", option["extra"]["url"]);
                    TemplateHandler.publish("aimageChange", {
                        name: option["extra"]["attrName"],
                        show: option["extra"]['isShow']
                    });
                },
                ap: function (option) {
                    option["element"].attr("href", option["url"]);
                    option["element"].find("p").html(option["text"]);
                    TemplateHandler.publish("apChange", {
                        name: option["extra"]["attrName"],
                        show: option["extra"]['isShow']
                    });
                },
                body: function (option) {
                    TemplateHandler.publish("bodyChange", {
                        name: option["extra"]["attrName"],
                        show: option["extra"]['isShow']
                    });
                }
            },
            hs = 'h1,h2,h3,h4,h5,h6'.split(',');
        for (var i = 0; i < hs.length; i++) {
            handler[hs[i]] = function (option) {
                option["element"].html(option["text"]);
                TemplateHandler.publish(option["extra"]["type"] + "Change", {
                    name: option["extra"]["attrName"],
                    show: option["extra"]['isShow']
                });
            };
        }
        if (config["extra"]) {
            $.each(config["extra"], function (index, e) {
                var $el = $("[data-smarket='" + e["attrName"] + "']"),
                    url = e["replaceUrl"] == "" ? e["defaultUrl"] : e["replaceUrl"],
                    text = e["replaceText"] == "" ? e["defaultText"] : e["replaceText"];
                if (e.hasOwnProperty("replaceStyle") || e.hasOwnProperty("style")) {
                    $el.css(e["replaceStyle"] || e["style"]);
                }
                if (e['isShow']) {
                    $el.show();
                } else {
                    $el.hide();
                }
                if (handler.hasOwnProperty(e["type"])) {
                    handler[e["type"]].call(this, {
                        element: $el,
                        extra: e,
                        url: url,
                        text: text
                    });
                }
            });
        }
        if (typeof callback === "function") {
            callback();
        }
    }
}(jQuery));