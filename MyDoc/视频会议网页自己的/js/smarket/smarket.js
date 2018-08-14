(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("knockout"), require("blueimp-md5"), require("jweixin-bower"));
	else if(typeof define === 'function' && define.amd)
		define("smarket", ["jquery", "knockout", "blueimp-md5", "jweixin-bower"], factory);
	else if(typeof exports === 'object')
		exports["smarket"] = factory(require("jquery"), require("knockout"), require("blueimp-md5"), require("jweixin-bower"));
	else
		root["smarket"] = factory(root["jQuery"], root["ko"], root["md5"], root["wx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_40__, __WEBPACK_EXTERNAL_MODULE_132__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 81);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * 定义smarket命名空间
 */
;
'use strict';
module.exports = (function () {
    //smarket命名空间
    var smarket = {},
        slice = Array.prototype.slice,
    //类转类型
        class2type = {},
        core_hasOwn = class2type.hasOwnProperty,
    //配置字典
        configDict = {};

    //定义基础方法
    (function () {
        //空方法
        smarket.noop = function () {
        };
        //获取对象类型
        smarket.type = function (obj) {
            if (obj == null) {
                return String(obj);
            }
            return typeof obj === "object" || typeof obj === "function" ?
            class2type[class2type.toString.call(obj)] || "object" :
                typeof obj;
        };
        //判断对象是否是window
        smarket.isWindow = function (obj) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        };
        //判断对象是否是空对象
        smarket.isEmptyObject = function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        };
        //对象是否是方法类型
        smarket.isFunction = function (obj) {
            return smarket.type(obj) === "function";
        };
        //对象是否是数组
        smarket.isArray = Array.isArray || function (obj) {
                return smarket.type(obj) === "array";
            };
        //判断对象是否是数值
        smarket.isNumeric = function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        };
        //判断是否普通对象
        smarket.isPlainObject = function (obj) {

            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || smarket.type(obj) !== "object" || obj.nodeType || smarket.isWindow(obj)) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for (key in obj) {
            }

            return key === undefined || core_hasOwn.call(obj, key);
        };
        //扩展对象
        smarket.extend = function () {
            var src, copyIsArray, copy, name, options, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            // Handle a deep copy situation
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== "object" && !smarket.isFunction(target)) {
                target = {};
            }

            // extend smarket itself if only one argument is passed
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];

                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && (smarket.isPlainObject(copy) || (copyIsArray = smarket.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && smarket.isArray(src) ? src : [];

                            } else {
                                clone = src && smarket.isPlainObject(src) ? src : {};
                            }

                            // Never move original objects, clone them
                            target[name] = smarket.extend(deep, clone, copy);

                            // Don't bring in undefined values
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }

            // Return the modified object
            return target;
        };
        //遍历方法
        smarket.each = function (obj, callback, args) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike(obj);

            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        };
        //浏览器类型
        smarket.browerType = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/) ? "mobile" : "pc";

        smarket.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
    })();

    //smarket全局字典配置
    (function () {

        //读取/设置配置字典信息
        var Config = smarket.Config = function (key, val) {
            var argsLen = arguments.length;
            if (argsLen > 1) {
                setValueByExpression(key, val);
            } else {
                return argsLen == 0 ? configDict : getValueByExpression(key);
            }
        };

        function getValueByExpression(expression) {
            try {
                return Function("__withObj__", "with(__withObj__) { return " + expression + "; }")(configDict);
            } catch (e) {
            }
        }

        function setValueByExpression(expression, val) {
            try {
                Function("__withObj__", "__setVal__", "with(__withObj__) { " + expression + " = __setVal__; }")(configDict, val);
            } catch (e) {
            }
        }

        //扩展配置信息
        Config.extend = function () {
            var args = slice.call(arguments);
            args.splice(0, 0, configDict);
            smarket.extend.apply(null, args);
        };

        //设置指定值为undefined
        Config.remove = function (key) {
            configDict[key] = undefined;
        };

        //加载特定配置，先获取匹配域名的配置
        Config.extend(window[location.hostname] || window.config || {});
    })();

    //处理url扩展
    (function () {
        //正则
        function _t() {
            return new RegExp(/(.*?)\.?([^\.]*?)\.?(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/);
        }

        //解码
        function _d(s) {
            return decodeURIComponent(s.replace(/\+/g, ' '));
        }

        function _i(arg, str) {
            var sptr = arg.charAt(0),
                split = str.split(sptr);

            if (sptr === arg) {
                return split;
            }

            arg = parseInt(arg.substring(1), 10);

            return split[arg < 0 ? split.length + arg : arg - 1];
        }

        function _f(arg, str) {
            var sptr = arg.charAt(0),
                split = str.split('&'),
                field = [],
                params = {},
                tmp = [],
                arg2 = arg.substring(1);

            for (var i = 0, ii = split.length; i < ii; i++) {
                field = split[i].match(/(.*?)=(.*)/);

                if (!field) {
                    field = [split[i], split[i], ''];
                }

                if (field[1].replace(/\s/g, '') !== '') {
                    field[2] = _d(field[2] || '');

                    // If we have a match just return it right away.
                    if (arg2 === field[1]) {
                        return field[2];
                    }

                    // Check for array pattern.
                    tmp = field[1].match(/(.*)\[([0-9]+)\]/);

                    if (tmp) {
                        params[tmp[1]] = params[tmp[1]] || [];

                        params[tmp[1]][tmp[2]] = field[2];
                    } else {
                        params[field[1]] = field[2];
                    }
                }
            }

            if (sptr === arg) {
                return params;
            }

            return params[arg2];
        }

        //解析url信息
        smarket.parseUrl = function (arg, url) {
            var _l = {},
                tmp, tmp2;

            if (arg === 'tld?') {
                return _t();
            }

            url = url || window.location.toString();

            if (!arg) {
                return url;
            }

            arg = arg.toString();

            if (tmp = url.match(/^mailto:([^\/].+)/)) {
                _l.protocol = 'mailto';
                _l.email = tmp[1];
            } else {

                // Ignore Hashbangs.
                if (tmp = url.match(/(.*?)\/#\!(.*)/)) {
                    url = tmp[1] + tmp[2];
                }

                // Hash.
                if (tmp = url.match(/(.*?)#(.*)/)) {
                    _l.hash = tmp[2];
                    url = tmp[1];
                }

                // Return hash parts.
                if (_l.hash && arg.match(/^#/)) {
                    return _f(arg, _l.hash);
                }

                // Query
                if (tmp = url.match(/(.*?)\?(.*)/)) {
                    _l.query = tmp[2];
                    url = tmp[1];
                }

                // Return query parts.
                if (_l.query && arg.match(/^\?/)) {
                    return _f(arg, _l.query);
                }

                // Protocol.
                if (tmp = url.match(/(.*?)\:?\/\/(.*)/)) {
                    _l.protocol = tmp[1].toLowerCase();
                    url = tmp[2];
                }

                // Path.
                if (tmp = url.match(/(.*?)(\/.*)/)) {
                    _l.path = tmp[2];
                    url = tmp[1];
                }

                // Clean up path.
                _l.path = (_l.path || '').replace(/^([^\/])/, '/$1').replace(/\/$/, '');

                // Return path parts.
                if (arg.match(/^[\-0-9]+$/)) {
                    arg = arg.replace(/^([^\/])/, '/$1');
                }
                if (arg.match(/^\//)) {
                    return _i(arg, _l.path.substring(1));
                }

                // File.
                tmp = _i('/-1', _l.path.substring(1));

                if (tmp && (tmp = tmp.match(/(.*?)\.(.*)/))) {
                    _l.file = tmp[0];
                    _l.filename = tmp[1];
                    _l.fileext = tmp[2];
                }

                // Port.
                if (tmp = url.match(/(.*)\:([0-9]+)$/)) {
                    _l.port = tmp[2];
                    url = tmp[1];
                }

                // Auth.
                if (tmp = url.match(/(.*?)@(.*)/)) {
                    _l.auth = tmp[1];
                    url = tmp[2];
                }

                // User and pass.
                if (_l.auth) {
                    tmp = _l.auth.match(/(.*)\:(.*)/);

                    _l.user = tmp ? tmp[1] : _l.auth;
                    _l.pass = tmp ? tmp[2] : undefined;
                }

                // Hostname.
                _l.hostname = url.toLowerCase();

                // Return hostname parts.
                if (arg.charAt(0) === '.') {
                    return _i(arg, _l.hostname);
                }

                // Domain, tld and sub domain.
                if (_t()) {
                    tmp = _l.hostname.match(_t());

                    if (tmp) {
                        _l.tld = tmp[3];
                        _l.domain = tmp[2] ? tmp[2] + '.' + tmp[3] : undefined;
                        _l.sub = tmp[1] || undefined;
                    }
                }

                // Set port and protocol defaults if not set.
                _l.port = _l.port || (_l.protocol === 'https' ? '443' : '80');
                _l.protocol = _l.protocol || (_l.port === '443' ? 'https' : 'http');
            }

            // Return arg.
            if (arg in _l) {
                return _l[arg];
            }

            // Return everything.
            if (arg === '{}') {
                return _l;
            }

            // Default to undefined for no match.
            return undefined;
        };
        //获取当前url查询字符串参数
        smarket.urlParams = smarket.parseUrl('?') || {};
        //当前地址hash
        smarket.urlHash = smarket.parseUrl('hash') || {};
        //获取地址hash值
        smarket.getUrlHash = function (query) {
            query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var expr = "[\\?#&]" + query + "=([^&#]*)";
            var regex = new RegExp(expr);
            var results = regex.exec(window.location.href);
            if (results !== null) {
                return results[1];
            } else {
                return false;
            }
        };
        //添加或者更新uri中的参数
        smarket.updateParam = function (key, value, uri) {

            // Use window URL if no query string is provided
            if (!uri) {
                uri = window.location.href;
            }

            // Create a dummy element to parse the URI with
            var a = document.createElement('a'),

            // match the key, optional square bracktes, an equals sign or end of string, the optional value
                reg_ex = new RegExp(key + '((?:\\[[^\\]]*\\])?)(=|$)(.*)'),

            // Setup some additional variables
                qs,
                qs_len,
                key_found = false;

            // Use the JS API to parse the URI
            a.href = uri;

            // If the URI doesn't have a query string, add it and return
            if (!a.search) {

                a.search = '?' + key + '=' + value;

                return a.href;
            }

            // Split the query string by ampersands
            qs = a.search.replace(/^\?/, '').split(/&(?:amp;)?/);
            qs_len = qs.length;

            // Loop through each query string part
            while (qs_len > 0) {

                qs_len--;

                // Check if the current part matches our key
                if (reg_ex.test(qs[qs_len])) {

                    // Replace the current value
                    qs[qs_len] = qs[qs_len].replace(reg_ex, key + '$1') + '=' + value;

                    key_found = true;
                }
            }

            // If we haven't replaced any occurences above, add the new parameter and value
            if (!key_found) {
                qs.push(key + '=' + value);
            }

            // Set the new query string
            a.search = '?' + qs.join('&');

            return a.href;
        };
        //url中删除指定参数
        smarket.removeParam = function (sourceURL) {
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
        };

        var strRegex = "^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$";
        smarket.urlRegex = new RegExp(strRegex);
        smarket.isUrl = function (url) {
            return smarket.urlRegex.test(url);
        }
        //TODO add parameter into url
    })();

    //判断对象是否为类数组类型
    function isArraylike(obj) {
        var length = obj.length,
            type = smarket.type(obj);

        if (smarket.isWindow(obj)) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || type !== "function" &&
            (length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj);
    }

    return smarket;
})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 * 基础model
 */
;
'use strict';
(function (smarket, ko) {
    if (!smarket) {
        throw new Error("Require the smarket module.");
    }

    var viewModel = smarket.viewModel = smarket.viewModel || {},
        cookie = smarket.cookie;

    function BaseViewModel() {
        var self = this;
        //体系ID
        self.schemaId = null;
        //是否在微信
        self.inWeChat = ko.observable(smarket.inWeChat);
        //Url参数
        self.urlParams = smarket.urlParams;
    }

    var proto = BaseViewModel.prototype;
    //判断是否登录
    proto.isLogin = function () {
        var self = this,
            isLogin = false;
        if (self.schemaId) {
            isLogin = !!cookie.smarketMember(self.schemaId);
        }
        return isLogin;
    };

    viewModel.BaseViewModel = BaseViewModel;
    return viewModel;
})(__webpack_require__(0), __webpack_require__(2));

(function (ko) {
    ko.bindingHandlers.element = {
        init: function (element, valueAccessor) {
            var target = valueAccessor();
            target(element);
        }
    };
})(ko);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/5/10.
 */
module.exports = __webpack_require__(73);
__webpack_require__(75);
__webpack_require__(74);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket3 STool的api网关接口模块
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        seminar = api.seminar = api.seminar || {},
        gateway = seminar.gateway = smarket.Config("api.gateway.seminar"),
        sdebUrl = seminar.gateway = smarket.Config("api.ungateway.sdebUrl");

    /**
     * 获取大屏信息
     * @param id         大屏id
     * @returns {*}
     */
    seminar.bigScreenGet = function (id) {
        return getJSON("/seminar/bigScreen/get", {
            id: id
        });
    };

    /**
     * 根据分组获取大屏组的信息
     * @param groupId           分组的id
     * @param seminarId         会议id
     * @returns {*}
     */
    seminar.bigScreenGetListByGroup = function (groupId, seminarId) {
        return postJSON("/seminar/bigScreen/getListByGroup", {
            groupId: groupId,
            seminarId: seminarId
        });
    };

    /**
     * 获取大屏签到墙信息
     * @param id                大屏id
     * @param signingPointId    签到点id
     * @returns {*}
     */
    seminar.bigScreenGetCheckInDataForWall = function (id, signingPointId) {
        return postJSON("/seminar/bigScreen/forBigScreenWall/getCheckInData", {
            id: id,
            signingPointId: signingPointId
        });
    };

    /**
     * 微信签到（安全认证）
     * @param openId        微信openId
     * @param nickName      昵称
     * @param headImgUrl    头像url
     * @param bigScreenId   大屏id
     * @param contactId     联系人id
     * @param sess          用户session
     * @returns {*}
     */
    seminar.checkInForWall = function (openId, nickName, headImgUrl, bigScreenId, contactId, sess) {
        return postJSON("/seminar/bigScreen/forBigScreenWall/checkIn", {
            openId: openId,
            nickName: nickName,
            headImgUrl: headImgUrl,
            bigScreenId: bigScreenId,
            contactId: contactId,
            sess: sess
        });
    };

    /**
     * 更新签到大屏
     * @param status        状态
     * @param seminarId     会议id
     * @param name          大屏名称
     * @param scale         大屏规模
     * @param groupId       分组id
     * @param signingPointId    签到点id
     * @param signingPoint      签到点类型
     * @param checkInByWeChat   微信签到
     * @param checkInStatus     签到状态
     * @param id            大屏id
     * @param onTheWallField
     * @param regOnSite
     * @param regFormId     表单id
     * @param regFormName   表单名称
     * @param interval      间隔
     * @param loop          循环
     * @param isControl     是否控制
     * @param url           签到地址
     * @param sess          用户session
     * @returns {*}
     */
    seminar.updateCheckIn = function (status, seminarId, name, scale, groupId, signingPointId, signingPoint, checkInByWeChat, checkInStatus, id, onTheWallField, regOnSite, regFormId, regFormName, interval, loop, isControl, url, sess) {
        return postJSON("/seminar/bigScreen/updateCheckIn", {
            status: status,
            seminarId: seminarId,
            name: name,
            scale: scale,
            groupId: groupId,
            signingPointId: signingPointId,
            signingPoint: signingPoint,
            checkInByWeChat: checkInByWeChat,
            checkInStatus: checkInStatus,
            id: id,
            onTheWallField: onTheWallField,
            regOnSite: regOnSite,
            regFormId: regFormId,
            regFormName: regFormName,
            interval: interval,
            loop: loop,
            isControl: isControl,
            url: url,
            sess: sess
        });
    };

    /**
     * 创建手机签到点
     * @param items     签到点
     * @param sess      用户session
     * @returns {*}
     */
    seminar.createCheckInPoint = function (items, sess) {
        return postJSON("/app/seminar/signingPoint/checkIn/create", {
            items: items,
            sess: sess
        });
    };

    /**
     * 获取de报名签到记录(安全认证)
     * @param skip          开始索引
     * @param tenantId      租户id
     * @param endDate       结束时间
     * @param startDate     开始时间
     * @param take          提取个数
     * @param sort          排序
     * @param type          类型,如： ["报名","签到"]
     * @returns {*}
     */
    seminar.getInteractions = function (skip, tenantId, endDate, startDate, take, sort, type) {
        return postJSON("/de/contact/front/getInteractions", {
            skip: skip,
            tenantId: tenantId,
            endDate: endDate,
            startDate: startDate,
            take: take,
            sort: sort,
            type: type
        });
    };

    /**
     * 获取某场会议下手机端签到点分类列表
     * @param seminarId     会议ID
     * @returns {*}
     */
    seminar.getCheckInPointGroupList = function (seminarId) {
        return getJSON("/app/seminar/signingPoint/getGroupList", {
            seminarId: seminarId
        });
    };

    /**
     * 获取手机端签到点签到列表
     * @param seminarId     会议ID
     * @param lastModify    最后更新时间
     * @param start         开始索引
     * @param num           个数
     * @param sess          用户session
     * @returns {*}
     */
    seminar.getCheckInPointList = function (seminarId, lastModify, start, num, sess) {
        return postJSON("/app/seminar/signingPoint/checkIn/getList", {
            seminarId: seminarId,
            lastModify: lastModify,
            start: start,
            num: num,
            sess: sess
        });
    };

    /**
     * 获取参与过的会议
     * @param tenantId     租户ID
     * @param start         开始索引
     * @param num           个数
     * @param sess          前台用户 session
     * @param withTag       是否包含标签
     * @returns {*}
     */
    seminar.getLastSeminarsBySess = function (tenantId, start, num, sess, withTag) {
        return postJSON("/de/contact/getLastSeminarsBySess", {
            tenantId: tenantId,
            start: start,
            num: num,
            sess: sess,
            withTag: withTag
        });
    };

    /**
     * 获取签到记录 (安全认证)
     * @param seminarId         会议id
     * @param signingPointId    签到点id
     * @param passageId         通道id
     * @param start             开始索引
     * @param num               个数
     * @param sess              用户session
     * @returns {*}
     */
    seminar.getCheckInRecord = function (seminarId, signingPointId, passageId, start, num, sess) {
        return postJSON("/seminar/signingPoint/checkIn/getList", {
            seminarId: seminarId,
            signingPointId: signingPointId,
            passageId: passageId,
            start: start,
            num: num,
            sess: sess
        });
    };

    /**
     * wap端获取大屏信息
     * @param bigScreenId
     * @param uniqueValue
     * @param contactId
     */
    seminar.getWapCheckInfo = function (bigScreenId, uniqueValue, contactId) {
        return api.getJSON(sdebUrl, {
            command: {
                size: 0,
                dst: "01-0401-00000001",
                orn: "02-0001-00000001",
                type: 0x0002,
                cmd: "seminar.bigScreen.forBigScreenWall.getWapCheckInfo",
                seq: 0,
                ver: 1000,
                body: {
                    bigScreenId: bigScreenId,
                    uniqueValue: uniqueValue,
                    contactId: contactId
                }
            }
        });
    };

    /**
     * 获取短地址列表
     * @param withCreate
     * @param realUrlList
     * @returns {*}
     */
    seminar.getShortUrlList = function (withCreate, realUrlList) {
        return postJSON("/shortUrl/getList", {
            withCreate: withCreate,
            realUrlList: realUrlList
        });
    };

    /**
     * 获取会议详情
     * @param tenantId          租户id
     * @param seminarId         会议id
     * @returns {*}
     */
    seminar.getDetail = function (tenantId, seminarId) {
        return postJSON("/seminar/get", {
            tenantId: tenantId, seminarId: seminarId
        });
    };

    /**
     * 获取分会场列表
     * @param seminarId     会议id
     * @param sess          用户session
     * @returns {*}
     */
    seminar.subSeminarGetList = function (seminarId, sess) {
        return postJSON("/seminar/subSeminar/getList", {
            seminarId: seminarId, sess: sess
        });
    };

    /**
     * 获取会议列表
     * @param tenantId      租户id
     * @param key
     * @param sceneName
     * @param sortName
     * @param start
     * @param num
     * @param conditions
     * @param status
     * @param sess
     */
    seminar.getList = function (tenantId, key, sceneName, sortName, start, num, conditions, status, sess) {
        return postJSON("/seminar/getList", {
            tenantId: tenantId,
            key: key,
            sceneName: sceneName,
            sortName: sortName,
            start: start,
            num: num,
            conditions: conditions,
            status: status,
            sess: sess
        });
    };
    /**
     * 根据会议ids获取会议列表
     * @param tenantId      租户Id
     * @param seminarIds    会议Id(数组)
     * @returns {*}
     */
    seminar.getListByIds = function (tenantId, seminarIds) {
        return postJSON("/seminar/frontGetListByIds", {
            tenantId: tenantId,
            ids: seminarIds
        });
    };
    /**
     * 获取会议日程按天分组
     * @param seminarId     会议id
     * @param sess          用户session
     * @returns {*}
     */
    seminar.getSeminarAgenda = function (seminarId, sess) {
        return postJSON("/seminar/agenda/getGroupList", {
            seminarId: seminarId,
            sess: sess
        });
    };
    //regCount传值会返回参会人数
    seminar.frontGet = function (seminarId, regCount) {
        return postJSON("/seminar/frontGet", {
            seminarId: seminarId,
            regCount: regCount
        });
    };

    /**
     * 获取会议列表（非sess）
     * @param tenantId      租户id
     * @param key           会议名称/id
     * @param sceneName     场景名称
     * @param sortName      排序字段
     * @param start         开始索引
     * @param num           数量
     * @param conditions    自定义
     * @param status        会议状态
     * @param needagenda        会议扩展信息，是否需要会议日程
     * @param needguest         会议扩展信息，是否需要嘉宾
     * @param needsubSeminar    会议扩展信息，是否需要分会信息
     */
    seminar.frontGetList = function (tenantId, key, sceneName, sortName, start, num, conditions, status, needagenda, needguest, needsubSeminar) {
        var expandInfo = [];
        if (needagenda) {
            expandInfo.push("agenda");
        }
        if (needguest) {
            expandInfo.push("guest");
        }
        if (needsubSeminar) {
            expandInfo.push("subSeminar");
        }

        return postJSON("/seminar/frontGetList", {
            tenantId: tenantId,
            key: key,
            sceneName: sceneName,
            sortName: sortName,
            start: start,
            num: num,
            conditions: conditions,
            status: status,
            expandInfo: expandInfo
        });
    };

    seminar.register = function (formData) {
        return postJSON("/seminar/contact/front/regSeminar", formData);
    };

    seminar.addQuestionaire = function (questionaryId, instanceId, title, unique) {
        return postJSON("/seminar/signingPoint/passage/addQuestionaire", {
            questionaryId: questionaryId,
            instanceId: instanceId,
            title: title,
            unique: unique
        });
    };
    seminar.addPoll = function (pollId, instanceId, title, unique) {
        return postJSON("/seminar/addPoll", {
            pollId: pollId,
            instanceId: instanceId,
            title: title,
            unique: unique
        });
    };

    /**
     * 注册且报名
     * @param options
     * @returns {*}
     */
    seminar.signUpAndRegister = function (options) {
        return postJSON("/seminar/contact/regAndSign", options);
    };

    /**
     * 获取登录人信息
     * @param updateInfo
     * @returns {*}
     */
    seminar.update = function (updateInfo) {
        return postJSON("/seminar/contact/front/editRegContact", updateInfo);
    };

    /**
     * 获取报名信息
     * @param seminarId 线下会Id
     * @param unique    报名唯一字段
     * @returns {*}
     */
    seminar.getCommonContactInfo = function (seminarId, unique) {
        return postJSON("/seminar/contact/front/getCommonContactInfo", {
            "seminarId": seminarId,
            "unique": unique
        });
    };

    /**
     * 更改个人报名信息
     * @param userInfo
     * @returns {*}
     */
    seminar.updateSef = function (userInfo) {
        return postJSON("/seminar/contact/front/updateSelf", userInfo);
    };

    /**
     * 更改个人报名信息
     * @param userInfo
     * @returns {*}
     */
    seminar.updateContactInfo = function (userInfo) {
        return postJSON("/seminar/contact/update", userInfo);
    };

    /**
     * 获取报名信息(array格式)
     * @param tenantId     租户Id
     * @param sess         session
     * @returns {*}
     */
    seminar.getContactInfo = function (tenantId, sess) {
        return postJSON("/seminar/contact/front/getRegContact", {
            tenantId: tenantId,
            sess: sess
        });
    };

    /**
     * 获取参会人员信息
     * @param seminarId 会议Id
     * @param unique    报名唯一字段Id
     * @returns {*}
     */
    seminar.contactInfo = function (seminarId, unique) {
        return postJSON("/seminar/contact/front/getContactInfo", {
            "seminarId": seminarId,
            "unique": unique
        });
    };
    /**
     * 获取报名信息(object格式)
     * @param seminarId     会议Id
     * @param sess         session
     * @param unique         唯一值
     * @returns {*}
     */
    seminar.getContactInfoMap = function (seminarId, sess, unique) {
        return s3g("/seminar/contact/front/getContactInfo", {
            seminarId: seminarId,
            sess: sess,
            unique: unique
        });
    };
    /**
     * 获取登录人报名状态
     * @param seminarId    会议Id
     * @param session      session
     * @returns {*}
     */
    seminar.getRegisterStatus = function (seminarId, session) {
        return getJSON("/seminar/contact/front/getRegisterStatus", {
            seminarId: seminarId,
            sess: session
        });
    };
    /**
     * 前台sess删除报名信息
     * @param seminarIds     会议id列表
     * @param sess          前台用户 session
     * @returns {*}
     */
    seminar.deleteSelf = function (seminarIds, sess) {
        return postJSON("/seminar/contact/deleteSelf", {
            seminarIds: seminarIds,
            sess: sess
        });
    };
    /**
     * 通过前台sess报名会议
     * @param seminarId     会议id
     * @param instanceId    会议实例id
     * @param regIds        需要报名会议的id列表
     * @param sess          前台用户 session
     * @returns {*}
     */
    seminar.regSelf = function (seminarId, instanceId, regIds, sess) {
        return postJSON("/seminar/contact/regSelf", {
            seminarId: seminarId,
            instanceId: instanceId,
            regIds: regIds,
            sess: sess
        });
    };
    /**
     * 判断是否能报名
     * @param sess          用户session
     * @param instanceId    实例Id
     */
    seminar.canRegister = function (sess, instanceId) {
        return postJSON("/seminar/register/canRegister", {
            instanceId: instanceId,
            sess: sess
        });
    };
    /**
     * 获取会议列表（非sess） 用 option 包装一下参数
     * @param option      选项
     *
     */
    seminar.frontGetListByOption = function (option) {
        return postJSON("/seminar/frontGetList", option);
    };

    /**
     * 会议联系人绑定openId
     * @param option
     * {
     *    "seminarId": "会议id",
     *    "contactId": "联系人id",
     *    "wechatId": "微信id",
     *    "openId": "微信openid"
     * }
     */
    seminar.setContactToWechat = function (option) {
        return s3g("/seminar/contact/setContactToWechat", option);
    };

    /**
     * 获取当前用户联系人信息
     * @param tenantId 租户Id
     * @param session 前台用户sess
     */
    seminar.getFrontContact = function (tenantId, session) {
        return postJSON("/de/contact/front/get", {
            tId: tenantId,
            sess: session
        });
    };

    /**
     * 获取某会议下签到点的签到数
     * @param request
     * {
     *    "seminarId": "会议ID",
     *    "signPoints": "签到点ID数组，签到点必须在该会议下"
     * }
     */
    seminar.getCheckInCountBySigningPoint = function (request) {
        return s3g("/seminar/signingPoint/checkIn/getCheckInCount", request);
    };

    /**
     * 获取映射关系
     * @param tenantId
     * @returns {*}
     */
    seminar.getFieldList = function (tenantId, type) {
        return postJSON("/field/getList", {
            tenantId: tenantId,
            fieldType: type
        });
    };
    /**
     * 通过签到码获取参会人员信息
     * @param seminarId 会议ID
     * @param qrCode 签到码
     * @param session 后台sess
     * @returns {*}
     */
    seminar.getContactInfoByQrCode = function (seminarId, qrCode, session) {
        return postJSON("/seminar/contact/getCommonContactInfo", {
            seminarId: seminarId,
            qrCode: qrCode,
            sess: session
        });
    };


    seminar.bigScreenUpdatePoll = function (request) {
        return postJSON("/seminar/bigScreen/updatePoll", request);
    };

    seminar.bigScreenUpdatePoll = function (request) {
        return postJSON("/seminar/bigScreen/updateMessage", request);
    };

    seminar.bigScreenWapMessageInfo = function (request) {
        return postJSON("/seminar/bigScreen/forBigScreenWall/getWapMessageInfo", request);
    };

    seminar.getTopicTemplateContact = function (request) {
        return postJSON("/seminar/topicTemplate/contact/get", request);
    };

    /**
     * 更新大屏信息
     * @param request
     * @returns {*}
     */
    seminar.bigScreenUpdateLottery  = function (request) {
        return postJSON("/seminar/bigScreen/updateLottery ", request);
    };

    /**
     * 通过微信OpenId获取某会议下的联系人
     * @param request
     * @returns {*}
     */
    seminar.getTopicTemplateContact = function (request) {
        return postJSON("/seminar/topicTemplate/contact/getByOpenId", request);
    };

    /**
     * 通过sess获取某会议下的联系人
     * @param request
     * @returns {*}
     */
    seminar.getTopicTemplateContact = function (request) {
        return postJSON("/seminar/topicTemplate/contact/getBySess", request);
    };

    seminar.getTopicTemplateSeminar = function (request) {
        return postJSON("/seminar/topicTemplate/seminar/get	", request);
    };

    /**
     * 根据openID获取会中联系人信息
     * @param seminarId 会议ID
     * @param wechatId 微信ID
     * @param openId 微信openId
     * @param contactId 会议联系人ID
     * @returns {*}
     */
    seminar.getContactInfoByQrCode = function (seminarId, wechatId, openId, contactId) {
        return postJSON("/seminar/contact/getContactToWechat", {
            seminarId: seminarId,
            wechatId: wechatId,
            openId: openId,
            contactId: contactId
        });
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    var s3g = api.s3g;
})(__webpack_require__(0), __webpack_require__(4), __webpack_require__(23));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/9.
 * 模板渲染功能
 */
;
'use strict';
module.exports = (function (smarket, $) {
    if (!smarket) {
        throw new Error("Require the smarket module.");
    }
    var template = smarket.template = smarket.template || {},
        service = smarket.api.template,
        extraMapping = {};
    //渲染页面
    template.render = function (config, dom) {
        var $root = $(dom || document);
        return $.Deferred(function (defer) {
            if (config.extra) {
                $.each(config.extra, function (index, e) {
                    var $el = $root.find("[data-smarket='" + e.attrName + "']"),
                        url = e.replaceUrl || e.defaultUrl,
                        text = e.replaceText || e.defaultText,
                        imgUrl;
                    if (e.hasOwnProperty("replaceStyle") || e.hasOwnProperty("style")) {
                        $el.css(e.replaceStyle || e.style);
                    }
                    if (e.isShow) {
                        $el.show();
                    } else {
                        $el.hide();
                    }
                    if (e.hasOwnProperty("replaceImageUrl") || e.hasOwnProperty("defaultImageUrl")) {
                        imgUrl = e.replaceImageUrl || e.defaultImageUrl;
                    }
                    if (extraMapping.hasOwnProperty(e.type)) {
                        template.callExtraHandle(e.type, {
                            element: $el,
                            extra: e,
                            url: url,
                            imgUrl: imgUrl,
                            text: text
                        });
                    }
                });
            }
            defer.resolve();
        }).promise();
    };
    //添加模板设计监听
    template.addRenderListener = function () {
        var FALSE = !1,
            postMessage = 'postMessage',
            addEventListener = 'addEventListener',

            // I couldn't get window.postMessage to actually work in Opera 9.64!
            has_postMessage = window[postMessage] && navigator.userAgent.indexOf('Opera') < 0;

        if (has_postMessage) {
            if (window[addEventListener]) {
                window[callRender ? addEventListener : 'removeEventListener']('message', callRender, FALSE);
            } else {
                window[callRender ? 'attachEvent' : 'detachEvent']('onmessage', callRender);
            }
        }

        function callRender(e) {
            var config = e.data;
            template.render(config);
        }
    };

    //根据configId渲染页面
    template.renderByConfigId = function (name, configId) {
        configId = configId || smarket.urlParams.configId;
        return service.getConfig(configId).done(function (data) {
            var content = data.content;
            if (content && 'configInfo' in content) {
                return template.renderByConfig(name, content.configInfo);
            }
        });
    };

    //根据配置对象渲染页面
    template.renderByConfig = function (name, config) {
        if (config && $.isArray(config.html)) {
            smarket.Config("authType", config.authType);
            var useHtmlConfig, needJumpUrl = true, currentUrl = location.href;

            $.each(config.html, function (idx, htmlConfig) {
                if (htmlConfig.name == name) {
                    useHtmlConfig = htmlConfig;
                }
                if (currentUrl.indexOf(htmlConfig.formalUrl) > -1) {
                    template.render(htmlConfig);
                    needJumpUrl = false;
                }
            });
            //当前地址与配置对象的地址不一致时跳转
            if (smarket.isUrl(config.formalUrl) && window.location.href.indexOf(config.formalUrl) < 0) {
                if (needJumpUrl) {
                    var link = document.createElement('a');
                    link.href = currentUrl;
                    window.location.href = config.formalUrl + link.search;
                }
            }
        }
        return config;
    };

    //注册extra处理器
    template.registerExtraHandle = function (type, handle) {
        extraMapping[type] = handle;
    };

    //获取extra处理器
    template.getExtraHandle = function (type) {
        if (type in extraMapping) {
            return extraMapping[type];
        }
    };
    //调用extra处理器
    template.callExtraHandle = function (type, option) {
        if (type in extraMapping) {
            extraMapping[type](option);
        }
    };

    return template;
})(__webpack_require__(0), __webpack_require__(1), __webpack_require__(4), __webpack_require__(128));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel;

    function Field() {
        var self = this;

        BaseViewModel.apply(self);

        //字段所属表单Id
        self.formId = ko.observable();
        //字段编号
        self.fieldId = ko.observable();
        //字段键名
        self.key = ko.observable();
        //字段名称
        self.fieldName = ko.observable();
        //是否为必填
        self.isRequired = ko.observable();
        //是否可重复
        self.isUnique = ko.observable();
        //是否显示
        self.isDisplay = ko.observable();
        //是否可以重复
        self.unrepeatable = ko.observable();
        //是否正则验证
        self.regex = ko.observable();
        //字段类型
        self.type = ko.observable();
        //字段值
        self.value = ko.observable();
        //字段是否只读
        self.readonly = ko.observable();
        //错误提示信息
        self.errorMsg = ko.observable();
        //字段验证
        self.errors = null;
    }

    Field.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = Field.prototype;
    proto.constructor = Field;

    proto.baseInit = function (options) {
        var self = this, field = options['field'];

        self.formId(options['formId']);
        self.fieldId(field.fieldId);
        self.isRequired(field['necessary'] == "1");
        self.isUnique((field['isUnique'] === '1' || field['isUnique'] === 'true'));
        self.isDisplay((field['isDisplay'] === '1' || field['isDisplay'] === 'true' || field['isDisplay'] === true || field['isDisplay'] === null || field['isDisplay'] === undefined));
        self.unrepeatable((field['unrepeatable'] === '1' || field['unrepeatable'] === 'true'));
        self.regex(field.regex);
        self.key(field.key);
        self.type(field.type);
        self.fieldName(field.fieldName);
        self.errorMsg(field.errorMsg);
        self.messages = {
            required: self.errorMsg() || (field.options && field.options.length > 0 ? '请选择' : '请填写') + self.fieldName(),
            pattern: '请输入正确的格式',
            unique: self.fieldName() + "已存在",
            repeat: self.fieldName() + "已存在"
        };
    };

    //初始化验证 需要构建字段手动调用
    proto.initValidation = function () {
        var self = this,
            validation = {};

        if (self.isRequired()) {
            validation['required'] = {
                message: function () {
                    return self.messages.required;
                }
            };
        }

        if (self.regex()) {
            validation['pattern'] = {
                onlyIf: function () {
                    if (typeof self.value() === "string") {
                        return self.value() !== "" && self.value() !== undefined;
                    }
                    return false;
                },
                params: self.regex(),
                message: self.messages.pattern
            };
        }
        //可以方便扩展自定义验证
        self.extendValidators(validation);

        self.extendValidations(validation);

        self.postExtendValidations();

        self.errors = ko.validation.group(self);
    };

    //添加字段验证(如果是异步验证增加延迟验证,防止重复提交)
    proto.extendValidations = function (validation) {
        var self = this;

        if (!smarket.isEmptyObject(validation)) {
            for (var prop in validation) {
                if (validation.hasOwnProperty(prop)) {
                    if (prop === 'validation') {
                        $.each(validation[prop], function (i, item) {
                            (function (item) {
                                var writeTimeoutInstance = null;
                                item['_validator'] = item['validator'];
                                if (item['async']) {
                                    item['validator'] = function (value, params, callback) {
                                        clearTimeout(writeTimeoutInstance);
                                        writeTimeoutInstance = ko.utils.setTimeout(function () {
                                            item['_validator'](value, params, callback);
                                        }, 500);
                                    };
                                }
                            }(item));
                        });
                    }
                }
            }
            self.value.extend(validation);
        }
    };

    //重写Field
    Field.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    Field.extend({
        extendValidators : smarket.noop,
        postExtendValidations: smarket.noop
    });

    viewModel.Field = Field
})(__webpack_require__(0), __webpack_require__(3), __webpack_require__(10));


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Created by bantenio on 2016/12/5.
 */
(function () {
    /*扩展Date方法*/
    Date.prototype.Format = function (mask) {
        var d = this;
        var zeroize = function (value, length) {
            if (!length) length = 2;
            value = String(value);
            for (var i = 0, zeros = ''; i < (length - value.length); i++) {
                zeros += '0';
            }
            return zeros + value;
        };
        if(!mask){
            return '';
        }
        return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
            switch ($0) {
                case 'd':
                    return d.getDate();
                case 'dd':
                    return zeroize(d.getDate());
                case 'ddd':
                    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
                case 'dddd':
                    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
                case 'M':
                    return d.getMonth() + 1;
                case 'MM':
                    return zeroize(d.getMonth() + 1);
                case 'MMM':
                    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
                case 'MMMM':
                    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
                case 'yy':
                    return String(d.getFullYear()).substr(2);
                case 'yyyy':
                    return d.getFullYear();
                case 'h':
                    return d.getHours() % 12 || 12;
                case 'hh':
                    return zeroize(d.getHours() % 12 || 12);
                case 'H':
                    return d.getHours();
                case 'HH':
                    return zeroize(d.getHours());
                case 'm':
                    return d.getMinutes();
                case 'mm':
                    return zeroize(d.getMinutes());
                case 's':
                    return d.getSeconds();
                case 'ss':
                    return zeroize(d.getSeconds());
                case 'l':
                    return zeroize(d.getMilliseconds(), 3);
                case 'L':
                    var m = d.getMilliseconds();
                    if (m > 99) m = Math.round(m / 10);
                    return zeroize(m);
                case 'tt':
                    return d.getHours() < 12 ? 'am' : 'pm';
                case 't':
                    return d.getHours() < 12 ? 'a' : 'p';
                case 'TT':
                    return d.getHours() < 12 ? 'AM' : 'PM';
                case 'T':
                    return d.getHours() < 12 ? 'A' : 'P';
                case 'Z':
                    return d.toUTCString().match(/[A-Z]+$/);
                // Return quoted strings with the surrounding quotes removed
                default:
                    return $0.substr(1, $0.length - 2);
            }
        });
    };

    //扩展String方法 时间戳转换
    String.prototype.FormatTimeStamp = function (val, fmt) {
        var newDate = new Date();
        newDate.setTime(val * 1000);
        return newDate.Format(fmt);
    };

    //处理数字
    Number.prototype.Format = function(index , num){
        if(index > 10){
            return index;
        }else{
            if((index + '').length < num)
            var zero = '';
            for(var i = 0 ; i < num - (index + '').length ; i ++){
                zero += '0';
            }
            return zero  + index;
        }
    };

    //Array.indexOf的Polyfill
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement, fromIndex) {

            var k;

            // 1. Let O be the result of calling ToObject passing
            //    the this value as the argument.
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get
            //    internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If len is 0, return -1.
            if (len === 0) {
                return -1;
            }

            // 5. If argument fromIndex was passed let n be
            //    ToInteger(fromIndex); else let n be 0.
            var n = +fromIndex || 0;

            if (Math.abs(n) === Infinity) {
                n = 0;
            }

            // 6. If n >= len, return -1.
            if (n >= len) {
                return -1;
            }

            // 7. If n >= 0, then Let k be n.
            // 8. Else, n<0, Let k be len - abs(n).
            //    If k is less than 0, then let k be 0.
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            // 9. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the
                //    HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                //    i.  Let elementK be the result of calling the Get
                //        internal method of O with the argument ToString(k).
                //   ii.  Let same be the result of applying the
                //        Strict Equality Comparison Algorithm to
                //        searchElement and elementK.
                //  iii.  If same is true, return k.
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }
})();


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/5.
 */
;'use strict';
module.exports = (function (ko, smarket) {

    function Question(questionInfo) {
        var self = this;
        self.questionInfo = questionInfo;
        self.id = questionInfo.itemId;
        self.type = questionInfo.type;
        self.title = ko.observable(questionInfo["question"]);
        self.isRequired = ko.observable(questionInfo["necessary"] == 1);
        self.isDisplay = ko.observable(false);
        self.isAnswered = ko.observable(false);
        self.value = '';
        self.errorMsgs = {
            required: "请回答",
            pattern: "请输入正确的格式"
        }
    }

    var proto = Question.prototype,
        typeMapping = [];

    proto.init = function (value) {
        var self = this;
        self.initValue(value);
        self.initField();
        self.initValidation(self.value);
        //错误消息
        self.errors = ko.validation.group(self);
    };
    //初始化Value字段
    proto.initValue = function (initValue) {
        this.value = ko.observable(initValue || '');
    };
    //初始化字段状态
    proto.initField = smarket.noop;
    //初始化验证
    proto.initValidation = function (value) {
        var self = this,
            validations = {},
            regex = self.questionInfo.regularExpression;
        if (self.isRequired()) {
            validations.required = {
                params: true,
                message: self.errorMsgs.required
            };
        }
        if (regex) {
            validations.pattern = {
                onlyIf: function () {
                    var val = value();
                    if (typeof val == "string") {
                        return val !== "" && val !== undefined;
                    }
                    return false;
                },
                params: regex,
                message: self.errorMsgs.pattern
            };
        }
        value.extend(validations);
    };
    //添加字段验证
    proto.addValidations = function (validations) {
        var self = this;
        if (smarket.isEmptyObject(validations)) {
            return;
        }
        self.value.extend(validations);
    };
    //返回字段提交数据
    proto.answer = function () {
        var self = this;
        return {
            itemId: self.id,
            answer: self.value()
        };
    };
    //从全局创建问题
    Question.create = function (questionInfo) {
        var field = null;
        $.each(typeMapping, function (idx, type) {
            if (type.isMe(questionInfo)) {
                field = type.build(questionInfo);
                return false;
            }
        });
        return field;
    };
    //全局注册问卷类型
    Question.register = function (type) {
        type.isMe = Question.isMe;
        type.build = Question.build;
        typeMapping.push(type);
    };

    Question.build = function (questionInfo) {
        var type = this;
        return new type(questionInfo);
    };

    Question.isMe = function (questionInfo) {
        return this.type == questionInfo.type;
    };

    return Question;
})(__webpack_require__(2), __webpack_require__(0));

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket3 STool的api网关接口模块
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        contactmanage = api.contactmanage = api.contactmanage || {},
        gateway = contactmanage.gateway = smarket.Config("api.gateway.tools");

    //获取表单信息
    contactmanage.get = function (memberFormId, trackId) {
        return getJSON("/member/form/get", {
            memberFormId: memberFormId,
            trackId: trackId
        });
    };
    //验证唯一
    contactmanage.checkUnique = function (schemaId, value) {
        return getJSON("/member/checkUnique", {
            memberSchemaId: schemaId,
            schemaId: schemaId,
            unique: value
        });
    };
    //验证唯一并发送验证码
    contactmanage.checkUniqueAndSendCheckCode = function (memberSchemaId, unique, cookieId, code) {
        return postJSON("/member/checkUniqueAndSendCheckCode", {
            memberSchemaId: memberSchemaId,
            unique: unique,
            cookieId: cookieId,
            code: code
        });
    };
    //验证重复
    contactmanage.checkRepeatable = function (memberSchemaId, fieldId, fieldValue) {
        return postJSON("/member/schema/checkRepeatable", {
            schemaId: memberSchemaId,
            fieldId: fieldId,
            fieldValue: fieldValue
        });
    };
    //发送手机验证码
    contactmanage.sendVerificationCode = function (key, memberFormId, content, smsSign) {
        return postJSON("/member/sendVerificationCode", {
            key: key,
            memberFormId: memberFormId,
            content: content,
            smsSign: smsSign
        });
    };
    //发送手机验证码
    contactmanage.sendCheckCodeToMobile = function (key, memberSchemaId) {
        return postJSON("/member/sendCheckCodeToMobile", {
            key: key,
            memberSchemaId: memberSchemaId
        });
    };
    //发送验证码到邮箱，请求验证码
    contactmanage.sendCheckCodeToMail = function (schemaId, uniqueId) {
        return postJSON("/member/sendVerificationCodeToMail", {
            memberFormId: schemaId,
            unique: uniqueId
        });
    };

    contactmanage.signInDynamic = function (signInInfo) {
        return postJSON("/member/loginByMobile", signInInfo);
    };
    //提交表单
    contactmanage.signIn = contactmanage.login = function (loginInfo) {
        return postJSON("/member/login", loginInfo);
    };
    //绑定会员
    contactmanage.bindMember = function (memberSchemaId, weChatId, openId, sess) {
        return postJSON("/contact/bindMember", {
            "schemaId": memberSchemaId,
            "weChatId": weChatId,
            "openId": openId,
            "sess": sess
        });
    };
    //提交注册表单
    contactmanage.signUp = contactmanage.register = function (registerInfo) {
        registerInfo.formData = registerInfo.items;
        return postJSON("/member/geneRegister", registerInfo);
    };
    //通过OpenId获取用户信息
    contactmanage.getByOpenId = function (weChatId, openId, schemaId) {
        return postJSON("/member/loginByOpenId", {
            wechatId: weChatId,
            openId: openId,
            memberSchemaId: schemaId
        });
    };
    //获取登录人信息
    contactmanage.getMember = function (sess) {
        return postJSON("/member/geneGet", {
            sess: sess,
            placeHolder: ""
        });
    };

    //发送验证码到手机/邮箱，请求修改密码
    contactmanage.sendCheckCode = function (schemaId, uniqueId) {
        return postJSON("/member/sendCheckCode", {
            memberSchemaId: schemaId,
            unique: uniqueId
        });
    };

    //验证请求修改密码验证码
    contactmanage.checkCode = function (schemaId, uniqueId, checkCode) {
        return postJSON('/member/checkCode', {
            memberSchemaId: schemaId,
            unique: uniqueId,
            checkCode: checkCode
        });
    };

    //重新设置密码
    contactmanage.forgetPwd = function (schemaId, uniqueId, checkCode, newPassword, globalUserId, openId, url, referenceUrl) {
        return postJSON('/member/forgetPwd', {
            memberSchemaId: schemaId,
            unique: uniqueId,
            checkCode: checkCode,
            password: newPassword,
            globalUserId: globalUserId,
            openId: openId || "",
            url: url || location.href,
            referenceUrl: referenceUrl || document.referrer || ''
        });
    };
    //手机动态密码登陆
    contactmanage.signInDynamic = function (signInInfo) {
        return postJSON("/member/loginByMobile", signInInfo);
    };

    //获取图片验证码
    contactmanage.getImageCode = function (cookieId, len, width, height) {
        return getJSON("/member/getImageCode", {
            cookieId: cookieId,
            len: len,
            width: width,
            height: height
        });
    };

    /**
     * 更新登录人信息
     * @param updateInfo
     * @returns {*}
     */
    contactmanage.update = function (updateInfo) {
        updateInfo.formData = updateInfo.items;
        return postJSON("/member/geneUpdate", updateInfo);
    };

    /**
     * 查询符合条件的表单
     * @param searchData
     * {
     *    "tenantId": "租户id",
     *    "schemaId": "体系id",
     *    "formId": "表单id",
     *    "trackId": "渠道id",
     *    "keyword": "查询字",
     *    "start": "分页开始行号",
     *    "num": "本次查询返回多少行数据"
     *  }
     */
    contactmanage.formSearch = function (searchData) {
        return s3g("/member/form/search", searchData);
    };

    /**
     * 获取体系下的注册表单列表
     * @param tenantId 租户Id
     * @param memberSchemaId 体系Id
     */
    contactmanage.getFormList = function (tenantId, memberSchemaId) {
        postJSON("/member/form/getList", {
            "tenantId": tenantId,
            "memberSchemaId": memberSchemaId
        });
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    var s3g = api.s3g;
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

;(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field,
        FieldFactory = {
            types: {},
            fieldIds: {}
        };

    //根据类型注册
    FieldFactory.registerType = function (type, factory) {
        FieldFactory['types'][type.toString()] = factory;
    };
    //根据字段Id注册
    FieldFactory.registerFieldId = function (fieldId, factory) {
        FieldFactory['fieldIds'][fieldId.toString()] = factory;
    };
    //当根据type取到的是function时直接实例化,否则如果是工厂object再由工厂方法创建
    FieldFactory.create = function (type, fieldId) {
        var fieldInstance;

        if (smarket.isFunction(FieldFactory['fieldIds'][fieldId])) {
            fieldInstance = new FieldFactory['fieldIds'][fieldId]();
        } else if (smarket.isFunction(FieldFactory['types'][type])) {
            fieldInstance = new FieldFactory['types'][type]();
        } else {
            throw new Error("Undefined field type");
        }
        return fieldInstance;
    };

    for (var item in Field) {
        if (Field.hasOwnProperty(item)) {
            if (Field[item]['type']) {
                FieldFactory.registerType(Field[item]['type'], Field[item]);
            }
            if (Field[item]['fieldId']) {
                FieldFactory.registerFieldId(Field[item]['fieldId'], Field[item]);
            }
        }
    }

    viewModel.FieldFactory = FieldFactory;

})(__webpack_require__(0),
    __webpack_require__(105),
    __webpack_require__(104),
    __webpack_require__(97),
    __webpack_require__(93),
    __webpack_require__(98),
    __webpack_require__(96),
    __webpack_require__(94),
    __webpack_require__(95),
    __webpack_require__(101)
);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/5/4.
 */
;
'use strict';
(function (smarket) {

    //判断API是否存在
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    //定义API
    var api = smarket.api,
        forum = api.forum = api.forum || {};

    /**
     * 得到该租户的微讨论模块的所有讨论版
     * @param type          讨论版的类型 1留言板 2微论坛 3评论区
     * @param tenantId      租户ID
     * @param moduleId      模块ID
     * @param instanceId    实例ID
     * @param start         开始位置
     * @param num           取值数量
     * @param isHide        显示/隐藏关闭的微讨论。 默认显示
     * @returns {*}
     */
    forum.getAllTopics = function (type, tenantId, moduleId, instanceId, start, num, isHide) {
        return postJSON("/topic/stat/homePage", {
            type: type,
            tenantId: tenantId,
            moduleId: moduleId,
            instanceId: instanceId,
            start: start,
            num: num,
            isHide: isHide
        });
    };

    /**
     * 获取微讨论详情
     * @param topicId   微论坛ID
     * @param tenantId  可不传
     * @returns {*}
     */
    forum.getTopic = function (topicId, tenantId) {
        return postJSON("/forum/getForumInfo", {
            topicId: topicId,
            tenantId: tenantId || smarket.Config("tenantId") || ""
        });
    };

    /**
     * 获取某讨论版的一级回复并带上其下面的所有回复
     * 1、不传sess代表获取所有    2、传sess代表获取该人员的回复信息
     * @param topicId   微讨论Id
     * @param openId    微信粉丝id 可不传
     * @param cookieId  匿名用户id 可不传
     * @param start     起始取值
     * @param num       每页数量
     * @param sess      sess
     * @returns {*}
     */
    forum.getReplyList = function (topicId, openId, cookieId, start, num, isAll, sess) {
        return postJSON("/forum/getReplyList", {
            topicId: topicId,
            openId: openId,
            cookieId: cookieId,
            start: start,
            num: num,
            isAll: isAll,
            sess: sess
        });
    };

    /**
     * 提交评论
     * @param topicId       微论坛ID
     * @param tenantId      租户id
     * @param nodeId        节点id
     * @param moduleId      模块id
     * @param instanceId    实例id
     * @param sectionId     子版id
     * @param enableReply   能否回贴,0-否 1-是
     * @param isAnonymous   是否匿名发贴,0-否 1-是
     * @param title         微论坛标题
     * @param attachements  上传的图片附件
     * @param content       帖子的内容
     * @param postId        回复的帖子id，如果为主帖则传0
     * @param openId        微信粉丝id
     * @param cookieId      匿名用户id
     * @param nickname      微信昵称
     * @param createrPic    微信头像
     * @returns {*}
     */
    forum.createReply = function (topicId, tenantId, nodeId, moduleId, instanceId, sectionId, enableReply, isAnonymous, title, attachements, content, postId, openId, cookieId, nickname, createrPic, sess) {
        return postJSON("/forum/post/create", {
            topicId: topicId,
            tenantId: tenantId,
            nodeId: nodeId,
            moduleId: moduleId,
            instanceId: instanceId,
            sectionId: sectionId,
            enableReply: enableReply,
            isAnonymous: isAnonymous,
            title: title,
            attachements: attachements,
            content: content,
            postId: postId,
            openId: openId,
            cookieId: cookieId,
            nickname: nickname,
            createrPic: createrPic,
            sess: sess
        });
    };

    /**
     获取评论列表
     @param tenantId  租户ID
     @param subVersionId 子版ID,即文章ID或文件ID
     @param commentId 评论ID等于0获取所有主评论列表,大于0获取某评论的所有回复评论列表
     @param start 开始标识
     @param num 一页条数
     @param topicId 评论区ID
     */
    forum.getComment = function (tenantId, subVersionId, commentId, start, num, topicId) {
        return postJSON("/comment/getList", {
            tenantId: tenantId,
            subVersionId: subVersionId,
            commentId: commentId,
            start: start,
            num: num,
            topicId: topicId
        });
    };

    /**
     * 提交点赞
     * @param postIds   帖子讨论Id，支持数组
     * @param openId    微信openID
     * @param cookieId  匿名用户Id
     * @param memberId  会员Id
     * @param createTime 创建时间戳
     * @returns {*}
     */
    forum.postLike = function (postIds, openId, cookieId, memberId, createTime) {
        return postJSON("/forum/post/like", {
            postIds: postIds,
            openId: openId,
            cookieId: cookieId,
            memberId: memberId,
            createTime: createTime
        });
    };

    /**
     * 得到子版信息
     * @param topicId   微讨论Id
     * @param keyword   keyword
     * @param sess      用户sess
     * @returns {*}
     */
    forum.getSections = function (topicId, keyword, sess) {
        return postJSON("/forum/section/getList", {
            topicId: topicId,
            keyword: keyword,
            sess: sess
        });
    };

    /**
     *
     * @param topicIds 主题Id，数组形式，但只查询第1个
     * @returns {*}
     */
    forum.get = function (topicIds) {
        return getJSON("/topic/get", {
            topicIds: topicIds
        });
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/7.
 */
module.exports = (function (ko, $) {
    function Option(optionInfo, question) {
        var self = this;
        self.optionInfo = optionInfo;
        self.question = question;
        self.id = optionInfo.optionId;
        self.imageUrl = optionInfo["picUrl"];
        self.hasJoin = false;
        self.hasAnswer = optionInfo["isFillIn"] == 1;
        self.content = optionInfo.title;
        self.answer = ko.observable('');
        self.isDefault = ko.observable(optionInfo.isDefault || false);
        if (self.hasAnswer) {
            self.answer.extend({
                required: {
                    onlyIf: function () {
                        var answer = [].concat(question.value());
                        for (var i = 0; i < answer.length; i++) {
                            if (answer[i] == self.id) {
                                return true;
                            }
                        }
                    },
                    message: "请填写"
                }
            });
        }
        self.errors = ko.validation.group(self);
    }

    Option.prototype = {
        choose: function () {
            var self = this;
            self.question.value(self.id);
        }
    };

    return Option;
})(__webpack_require__(2), __webpack_require__(1));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket3 STool的api网关接口模块
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        agenda = api.agenda = api.agenda || {},
        gateway = agenda.gateway = smarket.Config("api.gateway.seminar");

    /**
     * 获取日程根据组
     * @param seminarId         线下会id
     * @returns {*}
     */
    agenda.getGroupList = function (seminarId) {
        return postJSON("/seminar/agenda/getGroupList", {
            seminarId: seminarId
        });
    };
    /**
     * 获取日程根据组
     * @param seminarId         线下会id
     * @param agendaId         日程id
     * @returns {*}
     */
    agenda.get = function (seminarId,agendaId) {
        return getJSON("/seminar/agenda/get", {
            seminarId: seminarId,
            agendaId:agendaId
        });
    };



    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(4),__webpack_require__(23));

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket3 STool的api网关接口模块
 */
;
'use strict';
(function(smarket) {
  if (!smarket || !smarket.api) {
    throw new Error('Require the smarket module and the smarket.api module.');
  }

  var api = smarket.api,
      article = api.article = api.article || {},
      gateway = article.gateway = smarket.Config('api.gateway.article');

  /**
   * 获取文章信息
   * @param articleId        文章ID
   * @param withStat         是否包含统计
   * @params isScroll        是否需要上下翻页
   * @returns {*}
   */
  article.get = function(articleId, withStat, isScroll, withTag) {
    return getJSON('/article/getDetail', {
      articleId: articleId,
      withStat: withStat,
      isScroll: isScroll,
      withTag: withTag || 0,
    });
  };

  /**
   * 获取文章信息
   * @param articleId        文章ID
   * @param withTemplate     是否需要模板, 1是需要 0 是不需要
   * @param withStat         是否包含统计
   * @params isScroll        是否需要上下翻页
   * @returns {*}
   */
  article.getByproject = function(articleId, withTemplate, withStat, isScroll) {
    return postJSON('/article/getDetail', {
      articleId: articleId,
      withTemplate: withTemplate,
      withStat: withStat,
      isScroll: isScroll,
    });
  };

  /**
   * 获取文章列表
   * @param moduleId         模块id，可空
   * @param isRecommend      是否推荐
   * @param instanceId       实例id，可空
   * @param articleCategoryId    栏目id，-1代表所有栏目
   * @param title            标题模糊查询
   * @param tenantId         租户id
   * @param isStick          是否置顶
   * @param start            开始索引
   * @param num              个数,-1代表全部
   * @param withStat         是否需要统计
   * @param typeId           文章类型id，可为空
   * @returns {*}
   */
  article.getList = function(
      moduleId, isRecommend, instanceId, articleCategoryId, title, tenantId,
      isStick, start, num, withStat, typeId) {
    return postJSON('/article/getList', {
      moduleId: moduleId,
      isRecommend: isRecommend,
      instanceId: instanceId,
      articleCategoryId: articleCategoryId,
      title: title,
      tenantId: tenantId,
      isStick: isStick,
      start: start,
      num: num,
      withStat: withStat,
      typeId: typeId,
    });
  };

  /**
   * 获取文章列表
   * @param moduleId          模块id，可空
   * @param isRecommend       是否推荐
   * @param instanceId        实例id，可空
   * @param articleCategoryId 栏目id，-1代表所有栏目
   * @param title             标题模糊查询
   * @param tenantId          租户id
   * @param isStick           是否置顶
   * @param start             开始索引
   * @param num               个数,-1代表全部
   * @param withStat          是否需要统计
   * @param typeId            文章类型id，可为空
   * @param orderField        按某字段排序
   * @param withTemplate      是否需要模板信息
   * @param getAll            是否拉取全部文章包括子栏目下的所有
   * @param searchColumns     筛选字段，数组
   * @returns {*}
   */
  article.getListByProject = function(
      moduleId, isRecommend, instanceId, articleCategoryId, title, tenantId,
      isStick, start, num, withStat, typeId, orderField, withTemplate, getAll,
      searchColumns) {
    if (!orderField) {
      orderField = -1;
    }
    return getJSON('/article/getListByProject', {
      moduleId: moduleId,
      isRecommend: isRecommend,
      instanceId: instanceId,
      articleCategoryId: articleCategoryId,
      title: title,
      tenantId: tenantId,
      isStick: isStick,
      start: start,
      num: num,
      withStat: withStat,
      typeId: typeId,
      orderField: orderField,
      withTemplate: withTemplate,
      getAll: getAll,
      searchColumns: searchColumns,
    });
  };

  /**
   * 文章浏览
   * @param articleId     文章id
   * @param sess          用户session
   * @param globalUserId
   * @param openId        微信openId
   * @param url           页面url
   * @param referenceUrl 页面的referenceUrl
   * @param equipment     浏览器信息
   * @returns {*}
   */
  article.browse = function(
      articleId, sess, globalUserId, openId, url, referenceUrl, equipment) {
    return getJSON('/article/browse', {
      articleId: articleId,
      sess: sess,
      globalUserId: globalUserId,
      openId: openId,
      url: url,
      referenceUrl: referenceUrl,
      equipment: equipment,
    });
  };

  /**
   * 获取收藏列表
   * @param start     开始索引
   * @param num       个数
   * @param sess      用户session
   * @returns {*}
   */
  article.getCollectionList = function(start, num, sess) {
    return postJSON('/article/getCollectionList', {
      start: start,
      num: num,
      sess: sess,
    });
  };

  /**
   * 批量获取文章
   * @param articleIds    文章id数组
   * @param withStat      否包含统计，0 不计统计 1 显示统计信息
   * @returns {*}
   */
  article.getListByIds = function(articleIds, withStat) {
    return getJSON('/article/getListByIds', {
      articleIds: articleIds,
      withStat: withStat,
    });
  };

  /**
   * 文章分享记录
   * @param referenceUrl      页面的referenceUrl
   * @param articleId         文章id
   * @param globalUserId      全局用户id
   * @param openId            微信openId
   * @param url               页面url
   * @param tick              图文标示
   * @param mediaId           素材Id
   * @param sess              用户sess
   * @returns {*}
   */
  article.shareRecord = function(
      referenceUrl, articleId, globalUserId, openId, url, tick, mediaId, sess) {
    return postJSON('/article/shareRecord', {
      referenceUrl: referenceUrl,
      articleId: articleId,
      globalUserId: globalUserId,
      openId: openId,
      url: url,
      tick: tick,
      mediaId: mediaId,
      sess: sess,
    });
  };

  /**
   * 获取单个栏目
   * @param tenantId      租户id
   * @param id            栏目id
   * @param withTemplate  是否需要模板，1是需要 0 是不需要，默认1
   * @returns {*}
   */
  article.getArticleCategory = function(tenantId, id, withTemplate) {
    return getJSON('/articleCategory/get', {
      tenantId: tenantId,
      id: id,
      withTemplate: withTemplate,
    });
  };

  /**
   * 获取栏目列表
   * @param tenantId      租户id
   * @param moduleId      模块id
   * @param instanceId    实例id
   * @param isEnabled     是否启用
   * @param articleCategoryId     栏目id
   * @returns {*}
   */
  article.getArticleCategoryList = function(
      tenantId, moduleId, instanceId, isEnabled, articleCategoryId) {
    return getJSON('/articleCategory/getList', {
      tenantId: tenantId,
      moduleId: moduleId,
      instanceId: instanceId,
      isEnabled: isEnabled,
      articleCategoryId: articleCategoryId,
    });
  };

  /**
   * 获取文章分组列表
   * @param tenantId          租户id
   * @param isEnabled         是否启用
   * @param articleCategoryId     栏目id
   * @param nodeId
   * @param sess              用户session
   * @returns {*}
   */
  article.getArticleCategorySubList = function(
      tenantId, isEnabled, articleCategoryId, nodeId, sess) {
    return getJSON('/articleCategory/getSubList', {
      tenantId: tenantId,
      isEnabled: isEnabled,
      articleCategoryId: articleCategoryId,
      nodeId: nodeId,
      sess: sess,
    });
  };

  /**
   *
   * @param articleCategoryId 栏目Id 必填
   * @param start             开始索引 默认0
   * @param end               步长 默认5
   */
  article.getRecommendedList = function(articleCategoryId, start, end) {
    return postJSON('/article/getRecommendedList', {
      'articleCategoryId': articleCategoryId,
      'start': start || 0,
      'num': end || 5,
    });
  };

  /**
   * 点赞，globalUserId、openId和sess至少填一个
   * @param request
   * {
   *   "articleId": "文章Id 必填",
   *   "globalUserId": "用户全局Id 记录行为日志如果有请传递",
   *   "openId": "微信粉丝标识 记录行为日志如果有请传递",
   *   "url": "页面地址",
   *   "referenceUrl": "跳转地址",
   *   "sess": "可选sess 登录状态传sess，会记录行为到sess对应的member"
   * }
   */
  article.like = function(request) {
    if (!('url' in request)) {
      request.url = location.href;
    }
    if (!('referenceUrl' in request)) {
      request.referenceUrl = document.referrer;
    }
    return postJSON('/article/like', request);
  };

  /**
   * 获取此用户是否允许继续点赞,articleId和cookieId是必填字段,openId不传就以cookieId查询用户身份,传openId则cookieId和openId满足其一即可返回此用户的点赞状态
   * @param request
   * {
      "articleId": "文章Id 必填",
      "globalUserId": "cookieId 必填",
      "openId": "粉丝标识"
    }
   * @returns {*}
   */
  article.getLikeStatus = function(request) {
    return postJSON('/article/getLikeStatus', request);
  };

  function getJSON(url, data, success) {
    return api.s3g(url, data, success);
  }

  function postJSON(url, data, success) {
    return api.s3g(url, data, success);
  }
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 留言板service
 * Siler-shen 2017-01-05
 */
;
'use strict';
(function (smarket) {

    //判断API是否存在
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    //定义API
    var api = smarket.api,
        topic = api.topic = api.topic || {},
        gateway = topic.gateway = smarket.Config("api.gateway.topic");

    //获取帖子信息
    topic.get = function (topicIds) {
        return getJSON("/topic/get", {
            topicIds: topicIds
        });
    };
    //创建微讨论
    topic.create = function (postData) {
        return postJSON("/topic/create", postData);
    };
    //创建留言
    topic.createPost = function (postData) {
        return postJSON("/post/create", postData);
    };
    //获取我的留言列表
    topic.getMyPost = function (postData) {
        return getJSON("/post/getMyPost", postData);
    };
    //获取我的留言列表(大屏专用)
    topic.getMyPostBigScreen = function (postData) {
        return s3g("/post/getListByUser", postData);
    };
    //获取主帖和回帖列表
    topic.getMainAndReplyList = function (postData) {
        return postJSON("/post/getMainAndReplyList", postData);
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    var s3g = api.s3g;

})(__webpack_require__(0), __webpack_require__(4));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/9.
 */
;
'use strict';
module.exports = (function (template) {
    return template;
})(__webpack_require__(6),
    __webpack_require__(85),
    __webpack_require__(90),
    __webpack_require__(82),
    __webpack_require__(84),
    __webpack_require__(89),
    __webpack_require__(86),
    __webpack_require__(87),
    __webpack_require__(88),
    __webpack_require__(83));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/7.
 * 微信相关方法
 */
(function (smarket, $, weixin) {
  if (!smarket || !smarket.api && !smarket.api.wechat && !smarket.cookie) {
    throw new Error("Require the smarket module, the smarket.api.wechat module and the smarket.cookie module.");
  }
  var cookie = smarket.cookie,
      wx = smarket.wx = smarket.wx || {},
      urlParams = smarket.urlParams,
      wechat = smarket.api.wechat;

  smarket.inWeChat = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';

  //通过openId登陆
  wx.loginByOpenId = function (weChatId, schemaId, openId, isSlientAuthorise, jumpUrl) {
    //判断是否已经登录
    var memberInfo = cookie.smarketMember(schemaId);
    if (memberInfo && memberInfo.memberId && memberInfo.session) {
      return $.Deferred(function (defer) {
        defer.resolve({
          result: 0,
          desc: 'successful',
          content: memberInfo
        });
      }).promise();
    }
    //判断是否含有openId
    openId = openId || cookie.openId(weChatId);
    if (openId) {
      //通过openId获取登陆信息
      return wechat.getByOpenId(weChatId, openId, schemaId).then(function (data) {
        return $.Deferred(function (defer) {
          if (data["content"]["session"] && data["content"]["memberId"]) {
            if (schemaId) {
              cookie.smarketMember(schemaId, {
                name: data["content"]["name"],
                memberId: data["content"]["memberId"],
                unique: data["content"]["unique"],
                uniqueType: data["content"]["uniqueField"],
                session: data["content"]["session"]
              });
            }
          }
          defer.resolve(data);
        }).promise();
      }, function (data) {
        return data;
      });
    }
    //判断url参数中是否包含微信授权的code参数
    if (urlParams.code) {
      //通过授权code获取登陆信息
      return wechat.getByCode(weChatId, urlParams.code, schemaId).then(function (data) {
        var defer = $.Deferred();
        var openId = data["content"]["openId"];
        if (openId) {
          cookie.openId(weChatId, openId);
        }
        if (data["content"]["session"] && data["content"]["memberId"]) {
          if (schemaId) {
            cookie.smarketMember(schemaId, {
              name: data["content"]["name"],
              memberId: data["content"]["memberId"],
              unique: data["content"]["unique"],
              uniqueType: data["content"]["uniqueField"],
              session: data["content"]["session"]
            });
          }
        }
        defer.resolve(data);
        return defer.promise();
      }, function (data) {
        if (data.result == 40029 || data.result == 40163) {
          return wx.authorizeByWeChatId(weChatId, isSlientAuthorise, jumpUrl);
        } else {
          return data;
        }
      });
    }
    return wx.authorizeByWeChatId(weChatId, isSlientAuthorise, jumpUrl);
  };

  //通过weChatId获取openId
  wx.getOpenId = function (weChatId, schemaId, isSilentAuthorise, jumpUrl, needContent) {
    var openId = cookie.openId(weChatId);
    if (openId) {
      //通过openId获取登陆信息
      return wechat.getByOpenId(weChatId, openId, schemaId).then(function (data) {
        if (data["content"]["session"] && data["content"]["memberId"] && schemaId) {
          cookie.smarketMember(schemaId, {
            name: data["content"]["name"],
            memberId: data["content"]["memberId"],
            unique: data["content"]["unique"],
            uniqueType: data["content"]["uniqueField"],
            session: data["content"]["session"]
          });
        }
        return data;
      }, function (data) {
        return data;
      });
    }
    if (urlParams.code) {
      return wechat.getByCode(weChatId, urlParams.code, schemaId).then(function (data) {
        var openId = data["content"]["openId"];
        cookie.openId(weChatId, openId);
        return needContent ? data : {
          content: openId,
          result: 0,
          desc: 'successful'
        };
      }, function (data) {
        if (data.result == 40029 || data.result == 40163) {
          return wx.authorizeByWeChatId(weChatId, isSilentAuthorise, jumpUrl);
        } else {
          return data;
        }
      });
    }
    return wx.authorizeByWeChatId(weChatId, isSilentAuthorise, jumpUrl);
  };

  //使用weChatId获取授权Code
  wx.authorizeByWeChatId = function (weChatId, isSilentAuthorise, jumpUrl) {
    return wechat.getAppId(weChatId).then(function (weChatInfo) {
      return $.Deferred(function (defer) {
        weChatInfo = weChatInfo["content"];
        if (weChatInfo["accountType"] == 1 && weChatInfo["isCertified"] == 1 && weChatInfo["authStatus"] == 1) {
          wx.authorize(weChatInfo["appId"], (weChatInfo["authType"] == 1 ? smarket.Config("componentAppId") : ""), isSilentAuthorise, jumpUrl);
        } else {
          defer.reject({
            result: -1,
            desc: "微信号不是认证的服务号"
          });
        }
      }).promise();
    }, function (data) {
      return data;
    });
  };

  //获取微信授权Code
  wx.authorize = function (appId, componentAppId, isSilentAuthorise, jumpUrl) {
    jumpUrl = jumpUrl || window.location.href;
    var authType = smarket.Config("authType") || "auto";
    isSilentAuthorise = (undefined === isSilentAuthorise || null === isSilentAuthorise || '' === isSilentAuthorise) ? ("auto" === authType) : isSilentAuthorise;
    var scope = isSilentAuthorise ? "snsapi_base" : "snsapi_userinfo",
        href = ["https://open.weixin.qq.com/connect/oauth2/authorize?appid=", appId, "&redirect_uri=",
          encodeURIComponent(smarket.removeParam(jumpUrl.replace('#rd', ''), "code", "appid", "state")),
          "&response_type=code&scope=", scope, "&state="];
    if (componentAppId) {
      href.push("&component_appid=");
      href.push(componentAppId);
    }
    href.push("#wechat_redirect");
    window.location.href = href.join('');
  };
  //初始化微信JSSDK
  wx.init = function (weChatId, onDebug) {
    return wechat.getConfig({
      weChatId: weChatId,
      url: window.location.href,
      onDebug: onDebug || false,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'scanQRCode',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'hideAllNonBaseMenuItem',
        'checkJsApi'
      ]
    }).then(function (data) {
      return $.Deferred(function (defer) {
        if (weixin) {
          weixin.config(data["content"]);
          weixin.ready(function () {
            defer.resolve();
          });
          weixin.error(function (res) {
            defer.reject(res);
            for (var item in res) {
              if (res.hasOwnProperty(item)) {
                console.log(res[item]);
              }
            }
          });
        } else {
          defer.reject({
            result: 500,
            desc: "请在微信客户端中打开本网页"
          });
        }
      }).promise();
    });
  };

  //微信上传
  wx.uploadInWeChat = function (count) {
    count = count || 1;
    return $.Deferred(function (defer) {
      weixin.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        success: function (res) {
          var localIds = res["localIds"];
          upload(localIds, defer);
        }
      });
    }).promise();
    function upload(localIds, defer) {
      weixin.uploadImage({
        localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          var serverId = res.serverId;
          wechat.getMapIdByMediaId(serverId).then(function (data) {
            defer.resolve(data.content);
          }, function () {
            defer.reject("上传失败");
          });
        }
      })
    }
  };

  wx.initWeChatShare = function (options) {
    var shareUrl = options.url;

    options = smarket.extend({
      weChatId: options.weChatId || smarket.Config('weChatId'),
      title: document.title,
      summary: "",
      url: window.location.href,
      coverImageUrl: "",
      shareSuccessCallback: smarket.noop,
      shareCancelCallback: smarket.noop
    }, options);
    wx.init(options.weChatId).always(function () {
      //设置分享hideShare:true,调用hideOptionMenu()方法隐藏菜单
      if (options['hideShare']) {
        weixin.hideOptionMenu();
      } else {
        weixin.showOptionMenu();
      }
      weixin["onMenuShareAppMessage"]({
        title: options.title, // 分享标题
        desc: options.summary, // 分享描述
        link: shareUrl, // 分享链接
        imgUrl: options.coverImageUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
          options["shareSuccessCallback"]();
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          options["shareCancelCallback"]();
        }
      });
      weixin["onMenuShareTimeline"]({
        title: options.title, // 分享标题
        link: shareUrl, // 分享链接
        imgUrl: options.coverImageUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          options["shareSuccessCallback"]();
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          options["shareCancelCallback"]();
        }
      });
    }).fail(function (data) {
      console.log(data['desc']);
    });
  };
})(__webpack_require__(0), __webpack_require__(1), __webpack_require__(132), __webpack_require__(131), __webpack_require__(76));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        GuestViewModel = viewModel.GuestViewModel,
        agenda = smarket.api.agenda;

    function AgendaViewModel(seminarId,agendaId) {
        var self = this;
        BaseViewModel.apply(self);
        self.seminarId = seminarId;
        self.agendaId = agendaId;
        self.guests = ko.observableArray();
        self.endTime = ko.observable();
        self.createTime = ko.observable();
        self.agendaDate = ko.observable();
        self.address = ko.observable();
        self.name = ko.observable();
        self.remark = ko.observable();
        self.startTime = ko.observable();
        self.status = ko.observable();
    }

    AgendaViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = AgendaViewModel.prototype;
    proto.constructor = AgendaViewModel;

    //前置空方法
    proto.preLoad = function(){
        return true;
    };
    //加载数据
    proto.load = function () {
        var self = this;
        if(!self.preLoad()){
            return false;
        }
        return agenda.get(self.seminarId,self.agendaId).then(function(data){
            self.init(data.content);
            return data;
        },function(data){
            return data;
        });
    };
    //数据绑定
    proto.init = function (data) {
        var self = this;
        self.endTime(data.endTime);
        self.createTime(data.createTime);
        self.agendaDate(data.agendaDate);
        self.address(data.address);
        self.name(data.name);
        self.remark(data.remark);
        self.startTime(data.startTime);
        self.status(data.status);
        var guests = data.guests;
        if(guests){
            var guestList = [],
                i = 0;
            for(; i < guests.length;i++){
                var guestObj = new GuestViewModel(guests[i].seminarGuestId);
                guestObj.init(guests[i]);
                guestList.push(guestObj);
            }
            self.guests(guestList);
        }

    };


    //重写AgendaViewModel
    AgendaViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.AgendaViewModel = AgendaViewModel;
})(__webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(14),
    __webpack_require__(3),
    __webpack_require__(20),
    __webpack_require__(8)
);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel;

    function GuestViewModel(seminarGuestId) {
        var self = this;
        BaseViewModel.apply(self);
        self.seminarGuestId = seminarGuestId;
        self.createTime = ko.observable();
        self.demartment = ko.observable();
        self.duty = ko.observable();
        self.email = ko.observable();
        self.enterprise = ko.observable();
        self.fd = ko.observable();
        self.gender = ko.observable();
        self.global = ko.observable();
        self.guest = ko.observable();
        self.guestId = ko.observable();
        self.guestTypeId = ko.observable();
        self.happy = ko.observable();
        self.imageMapId = ko.observable();
        self.intro = ko.observable();
        self.isPublic = ko.observable();
        self.moduleType = ko.observable();
        self.name = ko.observable();
        self.phone = ko.observable();
        self.seminarGuestTypeId = ko.observable();
        self.seminarId = ko.observable();
        self.smile = ko.observable();
        self.tenantId = ko.observable();
        self.way = ko.observable();
        self.xinma = ko.observable();
        self.guestType = ko.observable();
    }

    GuestViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = GuestViewModel.prototype;
    proto.constructor = GuestViewModel;

    //数据绑定
    proto.init = function (data) {
        var self = this;
        self.createTime(data.createTime);
        self.demartment(data.demartment);
        self.duty(data.duty);
        self.email(data.email);
        self.enterprise(data.enterprise);
        self.fd(data.fd);
        self.gender(data.gender);
        self.global(data.global);
        self.guest(data.guest);
        self.guestId(data.guestId);
        self.guestTypeId(data.guestTypeId);
        self.happy(data.happy);
        self.imageMapId(data.imageMapId);
        self.intro(data.intro);
        self.isPublic(data.isPublic);
        self.moduleType(data.moduleType);
        self.name(data.name);
        self.phone(data.phone);
        self.seminarGuestTypeId(data.seminarGuestTypeId);
        self.seminarId(data.seminarId);
        self.smile(data.smile);
        self.tenantId(data.tenantId);
        self.way(data.way);
        self.xinma(data.xinma);
        self.guestType(data.guestType);
    };

    //获取文章信息
    proto.get = function () {
        var self = this,
            defer = $.Deferred();
        guest.get(self.seminarGuestId, 1, 1).then(function (data) {
            var result = data,
                content = result.content;
            if (result.result == 0) {
                self.init(content);
                defer.resolve(data);
            }
            else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise();
    };

    //重写GuestViewModel
    GuestViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.GuestViewModel = GuestViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(14),__webpack_require__(3),__webpack_require__(8));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        AgendaListViewModel = viewModel.AgendaListViewModel,
        GuestViewModel = viewModel.GuestViewModel,
        seminar = smarket.api.seminar;

    function SeminarDetailViewModel(tenantId, seminarId) {
        var self = this;
        BaseViewModel.apply(self);
        self.tenantId = tenantId;
        self.seminarId = seminarId;

        //会议名称
        self.eventName = ko.observable();
        self.sceneName = ko.observable();
        self.sceneDisplayName = ko.observable();
        //会议简介
        self.introduction = ko.observable();
        //会议开始日期
        self.startDate = ko.observable();
        //会议开始时间
        self.startTime = ko.observable();
        //会议结束日期
        self.endDate = ko.observable();
        //会议结束时间
        self.endTime = ko.observable();
        self.city = ko.observable();
        self.country = ko.observable();
        self.province = ko.observable();
        //会议地址
        self.address = ko.observable();
        //微信服务号二维码
        self.weChatQrcodeUrl = ko.observable();
        self.weChatId = ko.observable();
        self.memberFormId = ko.observable();
        self.memberTrackId = ko.observable();
        self.instanceId = ko.observable();
        self.showTime = ko.observable();
        self.openMember = ko.observable();
        self.tagName = ko.observable();//标签
        self.tags = ko.observable();
        self.status = ko.observable();
        self.agendaList = ko.observableArray();
        self.guests = ko.observableArray();
    }

    SeminarDetailViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = SeminarDetailViewModel.prototype;
    proto.constructor = SeminarDetailViewModel;

    //加载前模板方法
    proto.preLoad = smarket.noop;
    //加载完成模板方法
    proto.afterLoad = smarket.noop;
    //初始化前模板方法
    proto.preInit = smarket.noop;
    //初始化完成后模板方法
    proto.afterInit = smarket.noop;
    //加载数据
    proto.load = function () {
        var self = this;
        self.preLoad();
        return self.get().then(function (data) {
            var content = data.content.values;
            if (data.result == 0 && content) {
                self.preInit();
                self.init(content);
                self.afterInit(1);
            }
            self.afterLoad(1);
        }, function () {
            self.afterLoad();
        });
    };
    //初始化数据
    proto.init = function (data) {
        var self = this;
        self.eventName(data.name);
        self.startTime(data.startTime);
        self.endTime(data.endTime);

        self.address(data.address);
        self.sceneName(data.sceneName);
        self.sceneDisplayName(data.sceneDisplayName);
        self.introduction(data.introduction);
        if (data.region)
        {
            self.city(data.region.city);
            self.country(data.region.country);
            self.province(data.region.province);
        }
        self.weChatQrcodeUrl(data.weChatQrcodeUrl);
        self.weChatId(data.weChatId);
        self.memberFormId(data.memberFormId);
        self.memberTrackId(data.memberTrackId);
        self.instanceId(data.instanceId);
        self.showTime(data.showTime);
        self.openMember(data.openMember);
        self.tagName(data.tagName);
        self.tags(data.tags);
        self.status(data.status);
        var agendas = data.agendas;
        if( agendas && agendas.length>0){
            if (agendas[0].agendas)//兼容会议列表返回的议程数据格式
            {
                var list = [];
                for (var i =0; i <agendas.length; i++)
                {
                    list = list.concat(agendas[i].agendas)
                }
                agendas = list;
            }
            var agendaList = new AgendaListViewModel(self.seminarId);
            agendaList.init(agendas);
            self.agendaList(agendaList.agendaList());
        }
        var guests = data.guests;
        if(guests && guests.length>0) {
            if (guests[0].guests)//兼容会议列表返回的嘉宾数据格式
            {
                guests = guests[0].guests;
            }
            var guestList = [],
                i = 0;
            for (; i < guests.length; i++) {
                var guestObj = new GuestViewModel(guests[i].seminarGuestId);
                guestObj.init(guests[i]);
                guestList.push(guestObj);
            }
            self.guests(guestList);
        }
    };

    /**
     * 获取会议详情
     * @returns {*}
     */
    proto.get = function () {
        var self = this;
        return seminar.getDetail(self.tenantId, self.seminarId);
    };


    //加载数据 包含日程/嘉宾/表单信息
    //regCount传值会返回参会人数
    proto.frontLoad = function (regCount) {
        var self = this;
        self.preLoad();
        return seminar.frontGet(self.seminarId,regCount).then(function (data) {
            var content = data.content;
            if (data.result == 0 && content) {
                self.preInit();
                self.init(content);
                self.afterInit(1);
            }
            self.afterLoad(1);
            return data;
        }, function (data) {
            self.afterLoad();
            return data;
        });
    };

    proto.addQuestionaire = function(questionaryId,title,unique){
        var self = this;
        return seminar.addQuestionaire(questionaryId,self.instanceId,title,unique);
    };
    proto.addPoll = function(pollId,title,unique){
        var self = this;
        return seminar.addPoll(pollId,self.instanceId,title,unique);
    };

    //重写SeminarViewModel
    SeminarDetailViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.SeminarDetailViewModel = SeminarDetailViewModel;
})(__webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(5),
    __webpack_require__(3),
    __webpack_require__(8),
    __webpack_require__(30),
    __webpack_require__(20)
);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        topic = smarket.api.topic,
        isSubmitting = false;

    function PostViewModel() {
        var self = this;

        BaseViewModel.apply(self);

        //讨论版Id
        self.topicId = ko.observable();
        //帖子Id
        self.postId = ko.observable();
        //帖子内容
        self.content = ko.observable();
        //楼层
        self.floor = ko.observable();
        //昵称
        self.nickname = ko.observable();
        //创建时间
        self.createTime = ko.observable();
        //是否是匿名
        self.isAnonymous = ko.observable();
        //创建人
        self.creater = ko.observable();
        //创建人名
        self.createrName = ko.observable();
        //创建人头像
        self.createrPic = ko.observable();
        //创建人ip
        self.createrLocation = ko.observable();
        //会员Id
        self.memberId = ko.observable();
        //微信openId
        self.openId = ko.observable();
        //globalUserId(全局匿名用户Id)
        self.cookieId = ko.observable();
        //ip地址
        self.ip = ko.observable();
        //最后更新时间
        self.lastUpdateTime = ko.observable();
        //最后更新时间Code
        self.lastUpdateTimeCode = ko.observable();
        //最后更新人Id
        self.lastUpdateUserId = ko.observable();
        //是否置顶
        self.isTop = ko.observable();
        //是否热帖
        self.isHot = ko.observable();
        //是否删除
        self.isDeleted = ko.observable();
        //是否预览
        self.isPreview = ko.observable();
        //时间戳
        self.timeStr = ko.observable();
        //是否允许回复
        self.enableReply = ko.observable();
        //回复数
        self.replyNum = ko.observable();
        //能否点赞
        self.canLike = ko.observable();
        //点攒数
        self.likeNum = ko.observable();
        //能否编辑
        self.canModify = ko.observable();
        //所属主贴Id
        self.parentId = ko.observable();
        //租户Id
        self.tenantId = ko.observable();
        //节点Id
        self.nodeId = ko.observable();
        //实例Id
        self.instanceId = ko.observable();
        //模块Id
        self.moduleId = ko.observable();
        //提交人身份
        self.session = ko.observable();

        self.messages = {
            required: "请填写内容"
        };
    }

    PostViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = PostViewModel.prototype;
    proto.constructor = PostViewModel;

    proto.init = function (post) {
        var self = this;

        self.topicId(post.topicId);
        self.postId(post.postId);
        self.content(post.content);
        self.floor(post.floor);
        self.nickname(post.nickname);
        self.createTime(post.createTime);
        self.lastUpdateTime(post.lastUpdateTime);
        self.lastUpdateTimeCode(post.lastUpdateTimeCode);
        self.lastUpdateUserId(post.lastUpdateUserId);
        self.isAnonymous(post.isAnonymous == '1' || post.isAnonymous == 'true');
        self.creater(post.creater);
        self.createrName(post.createrName);
        self.createrPic(post.createrPic);
        self.createrLocation(post.createrLocation);
        self.memberId(post.memberId);
        self.openId(post.openId);
        self.cookieId(post.cookieId);
        self.ip(post.ip);
        self.isTop(post.isTop == '1' || post.isTop == 'true');
        self.isHot(post.isHot == '1' || post.isHot == 'true');
        self.isDeleted(post.isDeleted == '1' || post.isDeleted == 'true');
        self.isPreview(post.isPreview == '1' || post.isPreview == 'true');
        self.timeStr(post.timeStr);
        self.enableReply(post.enableReply == '1' || post.enableReply == 'true');
        self.replyNum(post.replyNum);
        self.canLike(post.canLike == '1' || post.canLike == 'true');
        self.likeNum(post.likeNum);
        self.canModify(post.canModify == '1' || post.canModify == 'true');
        self.parentId(post.parentId);
        self.tenantId(post.tenantId);
        self.moduleId(post.moduleId);
        self.nodeId(post.nodeId);
        self.instanceId(post.instanceId);
        self.session(post.session);

        self.content.extend({
            required: {
                message: function () {
                    return self.messages.required;
                }
            }
        });

        self.errors = ko.validation.group(self);
    };

    proto.load = function () {
        var self = this;

        return topic.get([self.topicId()]).then(function (data) {
            self.init(data.content);
            return data;
        }, function (data) {
            return data;
        });
    };
    //创建帖子
    proto.create = function () {
        var self = this, isValid = true,
            submitData = {
                "topicId": self.topicId(),
                "postId": self.postId(),
                "content": self.content(),
                "isAnonymous": self.isAnonymous() ? 1 : 0,
                "enableReply": self.enableReply() ? 1 : 0,
                "sess": self.session(),
                "openId": self.openId(),
                "memberId": self.memberId(),
                "cookieId": self.cookieId(),
                "nickname": self.nickname(),
                "createrPic": self.createrPic(),
                "instanceId": self.instanceId(),
                "tenantId": self.tenantId(),
                "moduleId": self.moduleId(),
                "nodeId": self.nodeId()
            };

        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        if (self.errors().length > 0) {
            isValid = false;
            self.errors.showAllMessages();
        }

        if (isValid) {
            self.beforeCreateHandler(submitData);

            return topic.createPost(submitData).then(function (data) {
                self.afterCreateHandler(data);
                isSubmitting = false;
            }, function (data) {
                self.afterCreateHandler(data);
                isSubmitting = false;
            });
        } else {
            self.validationErrorHandler();
            isSubmitting = false;
        }
    };

    //重写PostViewModel
    PostViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    PostViewModel.extend({
        beforeCreateHandler: smarket.noop,
        afterCreateHandler: smarket.noop,
        validationErrorHandler: smarket.noop
    });

    viewModel.PostViewModel = PostViewModel;
})(
    __webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(3),
    __webpack_require__(16),
    __webpack_require__(5)
);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket支持sbase协议
 */
;
'use strict';
(function (smarket, $) {
    if (!smarket) {
        throw new Error("Require the smarket module.");
    }
    var sbase = smarket.sbase = smarket.sbase || {};

    //创建sbase协议请求
    sbase.buildRequestParam = function (cmd, params, sess, ver) {
        return {
            "command": {
                "size": 0,
                "orn": "02-0001-00000001",
                "dst": "01-0401-00000001",
                "type": "0x0002",
                "cmd": cmd,
                "sess": sess || "",
                "seq": 0,
                "ver": ver || 1000,
                "body": params || {}
            }
        };
    };
    //发送请求数据
    sbase.post = function (url, cmd, params, sess, ver) {
        return $.post(url, sbase.buildRequestParam(cmd, params, sess, ver), smarket.noop, 'json');
    };
})(__webpack_require__(0), __webpack_require__(1));

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel;

    function Option() {
        var self = this;
        BaseViewModel.apply(self);

        //选项ID
        self.optionId = ko.observable();
        //标题
        self.text = ko.observable();
        //是否默认选中
        self.isDefault = ko.observable();
        //字段验证初始化
        self.errors = ko.validation.group(self);
    }

    Option.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = Option.prototype;
    proto.constructor = Option;

    proto.init = function (option) {
        var self = this;

        self.optionId(option.optionId);
        self.text(option.option);
        self.isDefault(option.isDefault == 1);
    };

    //重写Option
    Option.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    viewModel.Option = Option;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1));


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/10.
 * 用户相关服务 TODO 这个不应该叫account 需要改名
 */

;
'use strict';//严格约束
(function (smarket, $) {
    //如果没有引用smarket 和api 抛出错误
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        browserInfo = $.ua || {//浏览器信息
                browser: {
                    version: '',
                    name: ''
                },
                os: {
                    name: ''
                }
            },
        account = api.account = api.account || {},//赋到主命名空间
        gateway = account.gateway = smarket.Config("api.gateway.account");//获取用户相关的api请求地址

    //获取globalUserId
    account.getGlobalUserId = function (ip) {
        return getJSON('/anonymous/getId', {
            clientVersion: browserInfo.browser.version,
            clientBrand: browserInfo.browser.name,
            clientType: browserInfo.os.name,
            clientIP: ip || ""
        }).done(function (data) {
            smarket.cookie.globalUserId(data['content']);
            return data;
        });
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(4), __webpack_require__(1));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket3 STool的api网关接口模块
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        customform = api.customform = api.customform || {},
        gateway = customform.gateway = smarket.Config("api.gateway.tools");

    //获取表单信息
    customform.get = function (formId) {
        return postJSON("/customForm/get", {
            customFormId: formId
        });
    };
    //浏览记录
    customform.view = function (formId, linkId, trackingCode, globalUserId, openId, memberId, url, referenceUrl) {
        return getJSON("/customForm/view", {
            'customFormId': formId,
            'linkId': linkId,
            'trackingCode': trackingCode,
            'globalUserId': globalUserId,
            'openId': openId,
            'memberId': memberId,
            "url": url,
            "referenceUrl": referenceUrl
        });
    };
    //提交表单
    customform.submit = function (postData) {
        return postJSON("/customForm/action", postData);
    };
    //发送验证码
    customform.sendCheckCode = function (formId, mobile) {
        return postJSON("/customForm/sendCheckCode", {
            customFormId: formId,
            mobile: mobile
        });
    };
    //验证是否重复
    customform.checkRepeatable = function (formId, fieldId, value) {
        return postJSON("/customForm/checkRepeatable", {
            customFormId: formId,
            fieldId: fieldId,
            fieldValue: value
        });
    };
    //剪切图片
    customform.cropImage = function (mapId, croods) {
        return getJSON("/file/cutImage", {
            mapId: mapId,
            croods: croods
        });
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 投票大屏Service层
 * qilongjie 20170105
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        vote = api.vote = api.vote || {},
        gateway = vote.gateway = smarket.Config("api.gateway.tools");

    //获取
    vote.get = function (tenantId, pollId) {
        return postJSON("/poll/get", {
            tenantId: tenantId,
            pollId: pollId
        });
    };

    //开始
    vote.start = function (tenantId, pollId, instanceId, sess) {
        return postJSON("/poll/start", {
            "tenantId": tenantId,
            "pollId": pollId,
            "instanceId": instanceId,
            sess: sess
        });
    };
    vote.action = function (actionInfo) {
        return postJSON("/poll/action", actionInfo);
    };

    vote.getResult = function (tenantId, pollId, itemId) {
        return postJSON("/poll/stat/getResult", {
            tenantId: tenantId,
            pollId: pollId,
            itemId: itemId
        });
    };

    vote.getTotal = function (tenantId, pollId) {
        return postJSON("/poll/stat/getTotal", {
            "tenantId": tenantId,
            "pollId": pollId
        });
    };
    vote.view = function (pollId,openId,globalUserId,sess, referenceUrl, url) {
        return postJSON("/poll/view", {
            "pollId": pollId,
            "globalUserId": globalUserId,
            "openId": openId,
            "sess":sess,
            "url": url,
            "referenceUrl": referenceUrl
        });
    };

    //封装get和post请求
    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

})(__webpack_require__(0), __webpack_require__(4));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created on 2017/2/15
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel;

    /**
     * ArticleCategoryViewModel 创建栏目实例
     * @param articleCategoryId     栏目id
     * @constructor
     */
    function ArticleCategoryViewModel(articleCategoryId) {
        var self = this;
        BaseViewModel.apply(self);
        self.articleCategoryId = articleCategoryId;         //栏目id
        self.tenantId = smarket.Config("tenantId");     //租户id
        self.coverImageMappingId = ko.observable();     //封面图mappingid
        self.coverImageUrl = ko.observable();           //封面图url
        self.createTime = ko.observable('');            //创建时间
        self.description = ko.observable('');           //描述
        self.instanceId = ko.observable();              //实例id
        self.isDeleted = ko.observable();               //是否删除，1为删除
        self.isEnabled = ko.observable();               //是否可用，1为可用
        self.isShared = ko.observable('');              //是否分享，1为分享
        self.modifyTime = ko.observable('');            //修改时间戳
        self.moduleId = ko.observable('');              //模块id
        self.parentArticleCategoryId = ko.observable('');//上级栏目id
        self.subCategories = ko.observable();            //子栏目
        self.title = ko.observable();                    //标题
        self.url = ko.observable('');                    //栏目的文章列表url
    }

    ArticleCategoryViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = ArticleCategoryViewModel.prototype;
    proto.constructor = ArticleCategoryViewModel;

    //数据绑定
    proto.init = function (data) {
        var self = this;
        self.coverImageMappingId(data.coverImageMappingId);
        self.coverImageUrl(data.coverImageUrl);
        self.createTime(data.createTime);
        self.description(data.description);
        self.instanceId(data.instanceId);
        self.isDeleted(data.isDeleted);
        self.isEnabled(data.isEnabled);
        self.isShared(data.isShared);
        self.modifyTime(data.modifyTime);
        self.moduleId(data.moduleId);
        self.parentArticleCategoryId(data.parentArticleCategoryId);
        self.subCategories(data.subCategories);
        self.title(data.title);
        self.url(data.url);

    };

    //重写ArticleCategoryViewModel
    ArticleCategoryViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.ArticleCategoryViewModel = ArticleCategoryViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(15),__webpack_require__(3));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }
    //TODO find new solution to fix the view issue
    var officePrefix = "https://view.officeapps.live.com/op/view.aspx",
        pdfPrefix = "http://mozilla.github.io/pdf.js/web/viewer.html",
        extentionMap = [{
            type: "doc",
            iconSrc: "../images/file-doc.png",
            extentions: "docx,docm,dotm,dotx"
        }, {
            type: "excel",
            iconSrc: "../images/file-xlsx.png",
            extentions: "xlsx,xlsb,xls,xlsm"
        }, {
            type: "powerpoint",
            iconSrc: "../images/file-pptx.png",
            extentions: "pptx,ppsx,ppt,pps,pptm,potm,ppam,potx,ppsm"
        }, {
            type: "image",
            iconSrc: "../images/file-jpg.png",
            extentions: "jpg,jpeg,gif,png,bmp,tiff,psd,svg"
        }, {
            type: "pdf",
            iconSrc: "../images/file-pdf.png",
            extentions: "pdf"
        }, {
            type: "rar",
            iconSrc: "../images/file-zip.png",
            extentions: "7z,rar,zip,gz,bz,ace,uha,uda,zpaq"
        }];
    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        interactionrecordservice = smarket.api.interactionrecord,
        file = smarket.api.file;

    /**
     * FileViewModel 创建实例
     * @param fileId     文件id
     * @param previewContainer
     * @constructor
     */
    function FileViewModel(fileId, previewContainer) {
        var self = this;
        BaseViewModel.apply(self);
        self.previewContainer = previewContainer;
        self.fileId = fileId;
        self.name = ko.observable("");
        self.ext = ko.observable("");
        self.descInfo = ko.observable("");
        self.createTime = ko.observable("");
        self.modifyTime = ko.observable("");
        self.fileUrl = ko.observable("");
        self.isShowEmailBox = ko.observable(0);
        self.folderName = ko.observable("");
        self.type = ko.observable("");
        self.iconSrc = ko.observable("../images/file-other.png");
        self.size = ko.observable();
        self.isLoading = ko.observable(false);
        self.canPreview = ko.observable(true);
        self.email = ko.observable("");
        self.checked = ko.observable(false);
        self.globalUserId = ko.observable("");
        self.openId = ko.observable("");
        self.articleId = ko.observable("");
        self.mapId = ko.observable();
        self.transformedSize = ko.computed(function () {
            if (!self.size()) return '0 B';
            var k = 1024,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(self.size()) / Math.log(k));
            i = i < 0 ? 0 : i;
            return (self.size() / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        });
    }

    FileViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = FileViewModel.prototype;
    proto.constructor = FileViewModel;
    //设置显示email
    proto.showEmailBox = function(){
        var self = this;
        self.isShowEmailBox(1);
    };
    //设置隐藏email
    proto.hideEmailBox = function(){
        var self = this;
        self.isShowEmailBox(0);
    };

    /**
     * 发送邮件。如果option其中一个有值，同时记录到互动记录
     * @param email 收件人邮箱
     * @param option 互动记录
     * @param forEmailTemp 用于配置是否使用内容模板(新增参数)
     * @returns {*}
     */
    proto.sendEmail = function(email,option,forEmailTemp){
        var self = this;
        return file.downloadWithEmail(email,
            [self.fileId],
            self.globalUserId(),
            self.openId(),
            self.articleId(),
            forEmailTemp
        ).then(function(data){
            self.hideEmailBox();
            if(option){
                interactionrecordservice.record(option);
            }
            return data;
        },function(data){
            return data;
        });
    };
    //TODO view document solution
    //文件预览
    proto.renderPreview = function (type, src) {
        var self = this;
        if (self.previewContainer) {
            if ("doc,excel,powerpoint".indexOf(type) > -1) {
                $("<iframe height='640px' width='100%' src=" + officePrefix + "?src=" + src + " frameborder='0'></iframe>").appendTo();
            } else if (type === "image") {
                $("<img style='width:100%' src=" + src + " />").appendTo(self.previewContainer);
            } else if (type === "pdf") {
                $("<iframe height='640px' width='100%' src=" + pdfPrefix + "?file=" + encodeURIComponent(src) + " frameborder='0'></iframe>").appendTo(self.previewContainer);
            } else {
                self.canPreview(false);
            }
        }
    };
    proto.postInit = smarket.noop;
    proto.preInit = function(){
        return true;
    };
    //数据绑定
    proto.init = function (file) {
        var self = this;
        self.name(file.name);
        self.ext(file.ext);
        self.descInfo(file.descInfo);
        self.createTime(file.createTime);
        self.modifyTime(file.modifyTime);
        self.fileUrl(file.fileUrl);
        self.folderName(file.folderName);
        self.size(file.size);
        self.mapId(file.mapId);
        self.canPreview(file.canPreview);
        for(var i = 0 ; i < extentionMap.length ; i ++){
            if (!!self.ext() && extentionMap[i]["extentions"].indexOf(self.ext()) > -1) {
                self.iconSrc(extentionMap[i]["iconSrc"]);
                self.type(extentionMap[i]["type"]);
            }
        }

        proto.renderPreview(self.type(), self.fileUrl());
    };


    //重写FileViewModel
    FileViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.FileViewModel = FileViewModel;
})(__webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(36),
    __webpack_require__(25),
    __webpack_require__(37),
    __webpack_require__(3));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        AgendaViewModel = viewModel.AgendaViewModel,
        agenda = smarket.api.agenda;

    function AgendaListViewModel(seminarId) {
        var self = this;
        BaseViewModel.apply(self);
        self.seminarId = seminarId;
        //已成列表
        self.agendaList = ko.observableArray();
    }

    AgendaListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = AgendaListViewModel.prototype;
    proto.constructor = AgendaListViewModel;

    //前置空方法
    proto.preLoad = function(){
        return true;
    };
    //加载后方法
    proto.afterLoad = smarket.noop;

    //加载数据
    proto.load = function () {
        var self = this;
        if(!self.preLoad()){
            return false;
        }
        return agenda.getGroupList(self.seminarId).then(function(data){
            self.init(data.content);
            self.afterLoad(1);
            return data;
        },function(data){
            self.afterLoad();
            return data;
        });
    };
    //数据绑定
    proto.init = function (data) {
        var self = this,
            agendaList = [];
        for (var i = 0; i < data.length; i++) {
            var agendaObj = new AgendaViewModel(self.seminarId, data[i].agendaId);
            agendaObj.init(data[i]);
            agendaList.push(agendaObj);
        }
        self.agendaList(agendaList);
    };


    //重写AgendaListViewModel
    AgendaListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.AgendaListViewModel = AgendaListViewModel;
})(__webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(14),
    __webpack_require__(3),
    __webpack_require__(8),
    __webpack_require__(19)
);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by qilongie on 2017/1/4.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        VoteOptionViewModel = viewModel.VoteOptionViewModel;

    //创建投票实体
    function VoteQuestionViewModel(Id) {
        var self = this;
        BaseViewModel.apply(self);
        self.itemId = Id;
        self.type = '';
        self.question = ko.observable();
        self.showTitle = 1;
        self.isRequired = ko.observable(false);
        self.options = ko.observableArray();
        self.answer = ko.observableArray("").extend({
            required: {
                onlyIf: function () {
                    return !!self.isRequired();
                },
                message: '请选择'
            }
        });
        self.errors = ko.validation.group(self);
    }

    VoteQuestionViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = VoteQuestionViewModel.prototype;
    proto.constructor = VoteQuestionViewModel;
    //初始化数据
    proto.init = function (question) {
        var self = this;
        self.itemId = question.itemId;
        self.type = question.type;
        self.question(question["question"]);
        self.showTitle = question.showTitle == "1";
        self.isRequired(question["necessary"] == 1);
        if (question.options instanceof Array) {
            var options = [];
            for (var i = 0; i < question.options.length; i++) {
                var option = new VoteOptionViewModel(question.options[i].optionId);
                option.init(question.options[i]);
                options.push(option);
            }
            self.options(options);
        }
    };

    //重写QuestionViewModel
    VoteQuestionViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.VoteQuestionViewModel = VoteQuestionViewModel;

})(__webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(3),
    __webpack_require__(120)
);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by qilongie on 2017/1/4.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel;

    //创建投票实体
    function VoteResultQuestionViewModel(optionId){
        var self = this;
        self.optionId = optionId;
        self.count = ko.observable('');
        self.percent = ko.observable();
        self.title = ko.observable('');
        BaseViewModel.apply(self);
    }

    VoteResultQuestionViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = VoteResultQuestionViewModel.prototype;
    proto.constructor = VoteResultQuestionViewModel;
    proto.init = function(result){
        var self = this;
        self.count(result.count);
        self.percent(result.percent);
        self.title(result.title);
    };

    //重写VoteResultQuestionViewModel
    VoteResultQuestionViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.VoteResultQuestionViewModel = VoteResultQuestionViewModel;

})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(3));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by qilongie on 2017/1/4.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        VoteQuestionViewModel = viewModel.VoteQuestionViewModel,
        vote = smarket.api.vote;

    //创建投票实体
    function VoteViewModel(pollId, tenantId) {
        var self = this;
        BaseViewModel.apply(self);
        self.pollId = pollId;
        self.tenantId = tenantId;
        self.attachId = ko.observable();
        self.extraConfig = ko.observableArray();
        self.attachWXAccount = ko.observable();
        self.attentionWeChat = ko.observable();
        self.completeAction = ko.observable();
        self.completeActionType = ko.observable();
        self.createTime = ko.observable();
        self.desc = ko.observable();
        self.endTime = ko.observable();
        self.followTip = ko.observable();
        self.freq = ko.observable();
        self.identity = ko.observable();
        self.instanceId = ko.observable();
        self.instanceId2 = ko.observable();
        self.isPermanent = ko.observable();
        self.isPublicCopy = ko.observable();
        self.isPublicRef = ko.observable();
        self.isShared = ko.observable();
        self.manualEndTime = ko.observable();
        self.manualStartTime = ko.observable();
        self.maxItemId = ko.observable();
        self.maxSelectOptionId = ko.observable();
        self.moduleType = ko.observable();
        self.publicCopyCount = ko.observable();
        self.referenceCount = ko.observable();
        self.registerFormId = ko.observable();
        self.schemaId = ko.observable();
        self.shareCopyCount = ko.observable();
        self.shareCover = ko.observable();
        self.shareCoverUrl = ko.observable();
        self.shareDesc = ko.observable();
        self.shareTitle = ko.observable();
        self.showTitle = ko.observable();
        self.startTime = ko.observable();
        self.status = ko.observable();
        self.title = ko.observable();
        self.trackId = ko.observable();
        self.items = ko.observableArray();
        self.answers = ko.pureComputed(function () {
            var answers = [], questions = self.items();
            for (var i = 0; i < questions.length; i++) {
                var questionAnswer = {
                    itemId: questions[i].itemId,
                    options: [].concat(questions[i].answer())
                };
                answers.push(questionAnswer);
            }
            return answers;
        }, this);
    }

    VoteViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = VoteViewModel.prototype;
    proto.constructor = VoteViewModel;
    //初始化数据
    proto.init = function (voteInfo) {
        var self = this;
        self.attachId(voteInfo.attachId);
        self.attachWXAccount(voteInfo.attachWXAccount);
        self.attentionWeChat(voteInfo.attentionWeChat);
        self.completeAction(voteInfo.completeAction);
        self.completeActionType(voteInfo.completeActionType);
        self.createTime(voteInfo.createTime);
        self.desc(voteInfo.desc);
        self.endTime(voteInfo.endTime);
        self.followTip(voteInfo.followTip);
        self.freq(voteInfo.freq);
        self.identity(voteInfo.identity);
        self.instanceId(voteInfo.instanceId);
        self.instanceId2(voteInfo.instanceId2);
        self.isPermanent(voteInfo.isPermanent);
        self.isPublicCopy(voteInfo.isPublicCopy);
        self.isPublicRef(voteInfo.isPublicRef);
        self.isShared(voteInfo.isShared);
        self.manualEndTime(voteInfo.manualEndTime);
        self.manualStartTime(voteInfo.manualStartTime);
        self.maxItemId(voteInfo.maxItemId);
        self.maxSelectOptionId(voteInfo.maxSelectOptionId);
        self.moduleType(voteInfo.moduleType);
        self.publicCopyCount(voteInfo.publicCopyCount);
        self.referenceCount(voteInfo.referenceCount);
        self.registerFormId(voteInfo.registerFormId);
        self.schemaId(voteInfo.schemaId);
        self.shareCopyCount(voteInfo.shareCopyCount);
        self.shareCover(voteInfo.shareCover);
        self.shareCoverUrl(voteInfo.shareCoverUrl);
        self.shareDesc(voteInfo.shareDesc);
        self.shareTitle(voteInfo.shareTitle);
        self.showTitle(voteInfo.showTitle);
        self.startTime(voteInfo.startTime);
        self.status(voteInfo.status);
        self.title(voteInfo.title);
        self.trackId(voteInfo.trackId);
        self.extraConfig(voteInfo.extraConfig);
        if (voteInfo.items instanceof Array) {
            var questions = [];
            for (var i = 0; i < voteInfo.items.length; i++) {
                var question = new VoteQuestionViewModel(voteInfo.items[i].itemId);
                question.init(voteInfo.items[i]);
                questions.push(question);
            }
            self.items(questions);
        }
    };
    proto.start = function (sess) {
        var self = this;
        return vote.start(self.tenantId, this.pollId, self.instanceId, sess).then(function (data) {
            self.init(data.content);
            return data;
        });
    };
    proto.preSubmit = function () {
        return true;
    };

    proto.postSubmit = function() {};

    proto.submit = function () {
        var self = this,
            defer = $.Deferred(),
            isValid = true,
            param = null;
        for (var i = 0; i < self.items().length; i++) {
            if (self.items()[i].errors().length > 0) {
                isValid = false;
                self.items()[i].errors.showAllMessages();
            }
        }
        if (!isValid || (!self.preSubmit((param = {
                'pollId': self.pollId,
                'options': self.answers()
            })))) {
            defer.reject({
                result: 1,
                content: '提交错误'
            });
            return defer.promise();
        }
        return vote.action(param).then(function (data) {
            self.postSubmit(data);
            return data;
        }, function (data) {
            self.postSubmit(data);
            return data;
        });
    };
    proto.action = function (session, globalUserId, referenceUrl) {
        var self = this;
        self.preSubmit = function (request) {
            request.globalUserId = globalUserId;
            request.sess = session;
            request.referenceUrl = referenceUrl || document.referrer;
            return true;
        };
        return self.submit();
    };

    proto.load = function () {
        var self = this;
        return vote.get(self.tenantId, this.pollId).then(function (data) {
            self.init(data.content);
            return data;
        });
    };
    proto.view = function (openId, globalUserId, sess, referenceUrl, url) {
        var self = this;
        return vote.view(self.pollId, openId, globalUserId, sess, referenceUrl, url);
    };
    //重写VoteViewModel
    VoteViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.VoteViewModel = VoteViewModel;

})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(27), __webpack_require__(3), __webpack_require__(31));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/9.
 */
;
'use strict';
var question = __webpack_require__(9),
    $ = __webpack_require__(1),
    ko = __webpack_require__(2),
    smarket = __webpack_require__(0),
    fileUploadCommand = encodeURI(JSON.stringify({
        "size": 0,
        "dst": "01-0300",
        "orn": "01-0300",
        "sess": '',
        "type": 0x0002,
        "cmd": "file.upload",
        "seq": 0,
        "ver": 1000,
        "body": ''
    }));
__webpack_require__(3);

module.exports = (function (smarket, ko, $, question) {
    function UploadQuestionModel(questionInfo) {
        var self = this;
        question.call(self, questionInfo);
        //文件名称
        self.fileName = ko.observable();
        //文件url
        self.url = ko.observable();
        self._uploadEl = ko.observable();
        self._uploadEl.subscribe(function (newVal) {
            initElement.call(self, newVal);
        });
        self._reUploadEl = ko.observable();
        self._reUploadEl.subscribe(function (newVal) {
            initElement.call(self, newVal);
        });
        self.isAnswered = ko.observable(false);
        self.fileTypeChecker = function (file) {
            return /(.gif|.jpg|.png|.jpeg|.docx|.docm|.dotm|.dotx|.xlsx|.xlsb|.xls|.xlsm|.pptx|.ppsx|.ppt|.pps|.pptm|.potm|.ppam|.potx|.ppsm|.pdf)$/.test(file.name.toLowerCase());
        };
    }

    function initElement(newVal) {
        var self = this,
            $upload = $(newVal);
        $upload.fileupload({
            url: 'http://content.smarket.net.cn/index.php?command=' + fileUploadCommand,
            dataType: 'json',
            add: function (e, data) {
                var file = data.files[0];
                if (self.fileTypeChecker(file)) {
                    self.fileName(file["name"]);
                    data.submit();
                }
            },
            change: function (e, data) {
                $.each(data.files, function (index, file) {
                    if (!self.fileTypeChecker(file)) {
                        alert('不支持上传该类型文件');
                        return false;
                    }
                });
            },
            success: function (result) {
                if (result["body"]["result"] == 0) {
                    self.url(result["body"]["content"]["url"]);
                    self.value(result["body"]["content"]["mappingId"]);
                    self.isAnswered(true);
                    self.onUploaded(result);
                } else {
                    alert(result["body"]['desc']);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
            complete: function (result, textStatus, jqXHR) {
            }
        });
    }

    var proto = UploadQuestionModel.prototype = $.extend(true, {}, question.prototype);
    proto.constructor = UploadQuestionModel;

    proto.answer = function () {
        var self = this;
        return {
            itemId: self.id,
            fileName: self.fileName(),
            mapId: self.value()
        }
    };

    proto.remove = function () {
        var self = this;
        self.url('');
        self.value('');
        self.fileName('');
        self.isAnswered(false);
    };

    proto.onUploaded = $.noop;

    UploadQuestionModel.type = 7;

    question.register(UploadQuestionModel);

    return UploadQuestionModel;

})(smarket, ko, $, question);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket3 STool的api网关接口模块
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        collect = api.collect = api.collect || {},
        gateway = collect.gateway = smarket.Config("api.gateway.account");

    /**
     * 添加收藏
     * @param session       前台用户session
     * @param referer       来源地址
     * @param origin        原始地址
     * @param instanceId    实例Id
     * @param moduleId      模块Id
     * @param r             收藏列表
     * @returns {*}
     */
    collect.add = function (session, referer, origin, instanceId, moduleId, r) {
        return postJSON("/collect/add", {
            sess: session,
            referer: referer,
            origin: origin,
            instanceId: instanceId,
            moduleId: moduleId,
            r: r
        });
    };

    /**
     * 取消收藏
     * @param session       前台用户session
     * @param r             收藏列表
     * @returns {*}
     */
    collect.cancel = function (session, r) {
        return postJSON("/collect/cancel", {
            sess: session,
            r: r
        });
    };

    /**
     * 获取收藏
     * @param session       前台用户session
     * @param start         分页起始值
     * @param num           分页获取数量
     * @param sort          分页排序
     * @param r             收藏列表
     * @returns {*}
     */
    collect.search = function (session, start, num, sort, r) {
        return postJSON("/collect/search", {
            sess: session,
            start: start,
            num: num,
            r:r,
            sort: sort
        });
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/10.
 * 文件相关服务
 */

;
'use strict';//严格约束
(function (smarket, $) {
    //如果没有引用smarket 和api 抛出错误
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        file = api.file = api.file || {},//赋到主命名空间
        gateway = file.gateway = smarket.Config("api.gateway.file");//获取用户相关的api请求地址

    //获取文件列表
    file.getList = function (folderId,start,num,tenantId,fileIds,sortType,name,type,fileTypes,instanceId,moduleType,isShowSys) {
        return postJSON('/file/getList', {
            folderId:folderId,
            start:start,
            num:num,
            sortType:sortType,
            name:name,
            fileIds:fileIds,
            type:type,
            fileTypes:fileTypes,
            instanceId:instanceId,
            moduleType:moduleType,
            isShowSys:isShowSys,
            tenantId:tenantId
        });
    };
    //获取文件列表
    file.downloadWithEmail = function (email,fileList,globalUserId,openId,articleId,forEmailTemp) {
        return postJSON('/file/downloadWithEmail', {
            articleId: articleId,
            openId: openId,
            globalUserId: globalUserId,
            fileList: fileList,
            email: email,
            forEmailTemp: forEmailTemp
        });
    };
    /**
     * 获取微信下的文件列表
     * @param fileIds 邮件内容
     * @returns {*}
     * @constructor
     */
    file.getListForWeChat = function (fileIds) {
        return postJSON('/file/getListForWeChat', {
            fileIds: fileIds,
        });
    };
    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(1), __webpack_require__(4));


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by v-george_zhang on 2017/1/10.
 * smarket3 Core的api网关接口模块 互动记录等接口
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        interactionrecord = api.interactionrecord = api.interactionrecord || {},
        gateway = interactionrecord.gateway = smarket.Config("api.gateway.core");

    /**
     * 记录一个互动
     * @param obj     互动对象名称
     * @param tenantId         tenantId
     * @param instanceId           instanceId
     * @param contactId          联系人Id
     * @param cookieId
     * @param openId
     * @param actionKey    互动记录的类型
     * @param objId    互动对象Id
     * @param moduleId
     * @param result   互动结果
     * @param source   来源
     * @param detail   详情
     * @param objResultId  resultId
     * @param url  地址链接
     * @param referenceUrl 地址链接
     * @param sess
     * @returns {*}
     */
    interactionrecord.record = function (option) {
        return postJSON("/interaction/record", option);
    };

    /**
     * 获取用户在实例中的某类型的互动记录
     * @param tenantId  租户Id
     * @param moduleId  模块Id
     * @param instanceId 实例Id
     * @param memberId 会员Id
     * @param actionKey 互动类型    file_download:文件下载,project_share:产品分享,project_browse:产品浏览
     * @param start
     * @param num
     * @param sess
     * @returns {*}
     */
    interactionrecord.getDetailList = function (tenantId, moduleId, instanceId, memberId, actionKey, start, num, sess) {
        //TODO sess param
        return getJSON("/interaction/getDetailList", {
            tenantId: tenantId,
            moduleId: moduleId,
            moduleType: moduleId,
            instanceId: instanceId,
            memberId: memberId,
            actionKey: actionKey,
            type: actionKey,
            start: start,
            num: num,
            sess: sess
        });
    };

    /**
     * 获取用户在实例中的某类型的互动记录(POST版本)
     * @param tenantId  租户Id
     * @param moduleId  模块Id
     * @param instanceId 实例Id
     * @param memberId 会员Id
     * @param actionKey 互动类型    file_download:文件下载,project_share:产品分享,project_browse:产品浏览
     * @param start
     * @param num
     * @param sess
     * @returns {*}
     */
    interactionrecord.postDetailList = function (tenantId, moduleId, instanceId, memberId, actionKey, start, num, sess) {
        //TODO sess param
        return api.ajax({
            url: gateway + '/interaction/postDetailList',
            type: "POST",
            dataType: 'json',
            data: {
                tenantId: tenantId,
                moduleId: moduleId,
                instanceId: instanceId,
                memberId: memberId,
                actionKey: actionKey,
                start: start,
                num: num,
                sess: sess
            }
        });
        /*return postJSON("/interaction/postDetailList", {
            tenantId: tenantId,
            moduleId: moduleId,
            instanceId: instanceId,
            memberId: memberId,
            actionKey: actionKey,
            start: start,
            num: num,
            sess: sess
        });*/
    };

    //interactionrecord.postDetailList = interactionrecord.getDetailList;

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(4), __webpack_require__(23));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/3.
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        questionaire = api.questionaire = api.questionaire || {},
        gateway = questionaire.gateway = smarket.Config("api.gateway.tools");

    /**
     * 获取问卷信息
     * @param questionaryId
     * @returns {*}
     */
    questionaire.get = function (questionaryId) {
        return getJSON('/questionary/get', {
            questionaryId: questionaryId
        });
    };
    //获取问卷答题排行
    questionaire.statGetRank = function (questionaryId, start, num, tenantId) {
        return postJSON('/questionary/stat/getRank', {
            tenantId: tenantId,
            start: start,
            num: num,
            questionaryId: questionaryId
        });
    };

    //获取问卷答题排行
    questionaire.StatGetMultipleRank = function (questionaryIds, start, num, tenantId) {
        return postJSON('/questionary/stat/getMultipleRank', {
            tenantId: tenantId,
            start: start,
            num: num,
            questionaryIds: questionaryIds
        });
    };


    //获取用户是否参与过问卷
    questionaire.userIsBatchParticipate = function(questionIdArr,globalUserId,openId,sess){
        return postJSON('/questionary/user/isBatchParticipate', {
            questionIdArr: questionIdArr,
            globalUserId: globalUserId,
            openId: openId,
            sess: sess
        });
    };
    /**
     * 浏览问卷访问记录
     * @param questionaryId
     * @param instanceId
     * @param openId
     * @param globalUserId
     * @param session
     * @returns {*}
     */
    questionaire.view = function (questionaryId, instanceId, openId, globalUserId, session) {
        return postJSON('/questionary/view', {
            questionaryId: questionaryId,
            instanceId: instanceId,
            openId: openId,
            globalUserId: globalUserId,
            sess: session,
            url: window.location.href,
            referenceUrl: document.referrer
        });
    };

    /**
     * 提交问卷
     * @param request
     * @returns {*}
     */
    questionaire.action = function (request) {
        request.options = request.options || [];
        return postJSON("/questionary/action", request);
    };


    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by xuyanru on 2017/2/9.
 */

(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        webinar = api.webinar = api.webinar || {},
        gateway = webinar.gateway = smarket.Config().api.gateway.webinar;

    /**
     * 根据 instanceId  得到会议信息
     * @param instanceId     实例Id
     * @returns {*}
     **/
    webinar.getMeetingInfoByInstanceId = function (instanceId, webinarId, includeCustomField, tenantId) {
        return api.s3g("/webinar/open/getWebinarInfo", {
            instanceId: instanceId,
            webinarId: webinarId,
            includeCustomField: includeCustomField,
            tenantId: tenantId
        })
    };
    /*
     * 得到报名者基本信息
     * @param instanceId    实例Id
     * @param session  当前登录者的登录的 session
     * @returns {*}
     * **/
    webinar.getApplicantInfo = function (instanceId, session) {
        return api.s3g("/webinar/open/getApplicantInfo", {
            instanceId: instanceId,
            sess: session
        })
    };
    /*
     * 报名信息 写入到 webinar系统
     * @param instanceId    实例Id
     * @param session  当前登录者的登录的 session
     * @returns {*}
     * **/
    webinar.registration = function (info) {
        return api.s3g("/webinar/open/registration", info)
    };
    /*
     * 得到中奖信息
     * @param instanceId    实例Id
     * @param webinarId     会议Id
     * @param tenantId      租户Id  非必填
     * @returns {*}
     * **/
    webinar.getLotteryRecord = function (webinarId, instanceId, tenantId) {
        return api.s3g("/webinar/open/getLuckyDrawRoster", {
            webinarId: webinarId,
            instanceId: instanceId,
            tenantId: tenantId
        })
    };
    /*
     * 得到报名表单设置的  短信或是邮件通知
     * @param instanceId    实例Id
     * @param webinarId     会议Id
     * @param tenantId      租户Id  非必填
     * @returns {*}
     * **/
    webinar.getNotifyTaskId = function (instanceId, customFormId, tenantId) {
        return api.s3g("/webinar/open/getCustomFormInfo", {
            customFormId: customFormId,
            instanceId: instanceId,
            tenantId: tenantId
        })
    };

    webinar.getAttendList = function (request) {
        return api.s3g("/webinar/open/getAttendList", request);
    };

    /**
     * 根据 instanceId  得到点播会议信息
     * @param instanceId     实例Id
     * @returns {*}
     **/
    webinar.request_GetMeetingInfo = function (webinarId, instanceId, tenantId) {
        return api.s3g("/webinar/open/getDemandInfo", {
            webinarId: webinarId,
            instanceId: instanceId,
            tenantId: tenantId
        })
    };
    /**
     * 根据当前时间视频获取时间轴
     * @param videoId
     * @returns {*}
     **/
    webinar.getTimePoints = function (videoId) {
        return api.s3g("/webinar/open/getVideoTimeLine", {
            videoId: videoId
        })
    };

    webinar.request_AddAttend = function (session, instanceId) {
        return api.s3g("/webinar/open/attend", {
            session: session,
            instanceId: instanceId
        })
    };

    webinar.checkInteractionEvent = function (request) {
        return api.s3g("/webinar/event/interaction/check", request);
    };

    webinar.getWebinarList = function (request) {
        return api.s3g("/webinar/open/getWebinarList", request);
    };

    webinar.getWebinarListAdvanced = function (request) {
        return api.s3g("/webinar/open/getWebinarListAdvanced", request);
    };

    webinar.trackingCodeList = function (request) {
        return api.s3g("/webinar/open/trackingCode/getList", request);
    };

    function getJSON(url, data, success) {
        return api.ajax({
            url: gateway + url,
            type: "get",
            dataType: 'json',
            data: data,
            success: success
        });
    }

    function postJSON(url, data, success) {
        return api.ajax({
            url: gateway + url,
            type: "post",
            dataType: 'json',
            data: data,
            success: success
        });
    }
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_40__;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/5.
 */
;
'use strict';
module.exports = (function (smarket) {
    if (!smarket) {
        throw new Error("Require the smarket module.");
    }
    var slice = [].slice;

    function concat(array1, array2, index) {
        return array1.concat(slice.call(array2, index));
    }

    var Event = smarket.Event = function () {
        this.$$listeners = {};
        this.$$listenerCount = {};
    }, proto = Event.prototype;

    proto.$on = function (name, listener) {
        var self = this,
            namedListeners = self.$$listeners[name];
        if (!namedListeners) {
            self.$$listeners[name] = namedListeners = [];
        }
        namedListeners.push(listener);

        if (!self.$$listenerCount[name]) {
            self.$$listenerCount[name] = 0;
        }

        return function () {
            var indexOfListener = namedListeners.indexOf(listener);
            if (indexOfListener !== -1) {
                namedListeners[indexOfListener] = null;
                self.$$listenerCount[name] -= 1;
            }
        };
    };

    proto.$emit = function (name, args) {
        var empty = [],
            namedListeners,
            self = this,
            stopPropagation = false,
            event = {
                name: name,
                target: self,
                stopPropagation: function () {
                    stopPropagation = true;
                },
                preventDefault: function () {
                    event.defaultPrevented = true;
                },
                defaultPrevented: false
            },
            listenerArgs = concat([event], arguments, 1),
            i, length;

        namedListeners = self.$$listeners[name] || empty;
        for (i = 0, length = namedListeners.length; i < length; i++) {

            // if listeners were deregistered, defragment the array
            if (!namedListeners[i]) {
                namedListeners.splice(i, 1);
                i--;
                length--;
                continue;
            }
            try {
                //allow all listeners attached to the current scope to run
                namedListeners[i].apply(null, listenerArgs);
            } catch (e) {
                console.error(e);
            }
        }
        //if any listener on the current scope stops propagation, prevent bubbling
        if (stopPropagation) {
            event.currentScope = null;
            return event;
        }

        event.currentScope = null;

        return event;
    };
    return Event;

})(__webpack_require__(0));

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

;(function (smarket) {
    smarket.extend({
        initPage: function (callback) {
            var weChatId = smarket.Config('weChatId'),
                schemaId = smarket.Config('schemaId'),
                seminarId = smarket.Config('seminarId'),
                href = smarket.Config('api.weChatAuthProxy') + "?proUrl=" + encodeURIComponent(smarket.removeParam(window.location.href.replace("#" + smarket.parseUrl('hash'), ''), "code", "appid", "state")),
                contactInfo = smarket.cookie.smarketMember(schemaId) || {};

            ko.validation.init({
                registerExtenders: true,
                messagesOnModified: true,
                insertMessages: false,
                parseInputAttributes: true,
                messageTemplate: null
            }, true);

            // if (!smarket.inWeChat) {
            //     return callback(contactInfo);
            // }

            return smarket.initGlobalUserId().then(function () {
                return smarket.wx.loginByOpenId(weChatId, schemaId, false, false, href);
            }).then(function (data) {
                var weChatInfo = data['content'];

                smarket.extend(contactInfo, smarket.cookie.smarketMember(schemaId));

                contactInfo['headImgUrl'] = weChatInfo['headImgUrl'] || "";
                contactInfo['nickname'] = weChatInfo['nickname'] || "";
                contactInfo['email'] = weChatInfo['email'] || "";

                smarket.cookie.smarketMember(schemaId, contactInfo);
                if (typeof callback === 'function') {
                    callback(contactInfo);
                }
            }, function () {
                smarket.cookie.smarketMember(schemaId, contactInfo);
                if (typeof callback === 'function') {
                    callback(contactInfo);
                }
            });
        },
        initGlobalUserId: function () {
            var defer = $.Deferred(),
                globalUserId = smarket.cookie.globalUserId(),
                account = smarket.api.account;

            if (globalUserId) {
                defer.resolve({
                    result: 0,
                    desc: "successful",
                    content: globalUserId
                });
            } else {
                return account.getGlobalUserId().then(function (data) {
                    smarket.cookie.globalUserId(data['content']);
                });
            }
            return defer.promise();
        }
    });
})(
    __webpack_require__(0),
    __webpack_require__(18),
    __webpack_require__(5),
    __webpack_require__(25)
);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bante on 2017/4/18.
 */
(function (smarket) {
    var api = smarket.api,
        account = api.account,
        contactmanage = api.contactmanage,
        wx = smarket.wx,
        cookie = smarket.cookie,
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
            session: "",
            needWechat: false
        },
        defaultOption = {
            extraConfig: {
                init: {
                    url: "",
                    cmd: "",
                    aliUrl:"",
                    aliPath:""
                },
                post: {
                    url: "",
                    cmd: "",
                    aliUrl:"",
                    aliPath:""
                }
            },
            identity: 1,
            formId: 0,
            trackId: 0,
            schemaId: 0,
            type: smarket.browerType,
            isWeChatBrowser: smarket.inWeChat,
            weChatId: 0,
            attentionWeChat: "0",//是否关注后参与
            instanceId: 0,
            isSilentAuthorise: undefined,
            needAuth: true
        },
        smarketMember = {},
        openId = '',
        initAnonymous = account.getGlobalUserId;

    function initForm(option, callback) {
        option["extraConfig"] = option["extraConfig"] || {};
        $.extend(true, defaultOption, option);
        defaultOption["weChatId"] = defaultOption["weChatId"] ? defaultOption["weChatId"] : smarket.urlParams.weChatId ? smarket.urlParams.weChatId : '';
        smarketMember = cookie.smarketMember(defaultOption["schemaId"]) || {};
        openId = cookie.openId(defaultOption["weChatId"]);
        if (defaultOption["identity"] == "1") {
            if (defaultOption["attentionWeChat"] == "1" && defaultOption["weChatId"] && defaultOption["type"] == "mobile" && defaultOption["isWeChatBrowser"]) {
                initWeChat(defaultOption["weChatId"], "", defaultOption["isSilentAuthorise"], defaultOption["needAuth"]).then(function () {
                    initPre(callback);
                }, function (result) {
                    if (result) {
                        callback(contactInfo, {result: -1, desc: result});
                    }
                });
            } else {
                initPre(callback);
            }
        } else if (defaultOption["identity"] == "2") {
            if (defaultOption["type"] == "mobile") {
                if (defaultOption["weChatId"]) {
                    initWeChat(defaultOption["weChatId"], "", defaultOption["isSilentAuthorise"], defaultOption["needAuth"]).then(function () {
                        initPre(callback);
                    }, function (result) {
                        if (result) {
                            callback(contactInfo, {result: -1, desc: result});
                        }
                    });
                } else {
                    alert("请传入weChatId");
                }
            } else {
                initPre(callback);
            }
        } else if (defaultOption["identity"] == "3") {
            if (defaultOption["weChatId"] && defaultOption["weChatId"] != "0" && defaultOption["type"] == "mobile" && defaultOption["isWeChatBrowser"]) {//如果有微信可走自动登录
                initWeChat(defaultOption["weChatId"], defaultOption["schemaId"], defaultOption["isSilentAuthorise"], defaultOption["needAuth"]).then(function () {
                    initWeChatRegister(defaultOption["formId"], defaultOption["trackId"], defaultOption["schemaId"], defaultOption["weChatId"]).then(function () {
                        initPre(callback);
                    }, function (result) {
                        if (result) {
                            callback(contactInfo, {result: -1, desc: result});
                        }
                    });
                }, function () {
                    initRegister(defaultOption["formId"], defaultOption["trackId"], defaultOption["schemaId"], defaultOption["type"], defaultOption["needAuth"]).then(function () {
                        initPre(callback);
                    }, function (result) {
                        if (result) {
                            callback(contactInfo, {result: -1, desc: result});
                        }
                    });
                });
            }
            else if (smarketMember && !smarket.isEmptyObject(smarketMember)) {
                contactInfo["name"] = smarketMember["name"];
                contactInfo["memberId"] = smarketMember["memberId"];
                contactInfo["unique"] = smarketMember["unique"];
                contactInfo["uniqueType"] = smarketMember["uniqueType"];
                contactInfo["session"] = smarketMember["session"];
                initPre(callback);
            }
            else {
                initRegister(defaultOption["formId"], defaultOption["trackId"], defaultOption["schemaId"], defaultOption["type"], defaultOption["needAuth"]).then(function () {
                    initPre(callback);
                }, function (result) {
                    if (result) {
                        callback(contactInfo, {result: -1, desc: result});
                    }
                });
            }
        }
    }

    function initWeChat(weChatId, schemaId, isSilentAuthorise, needAuth) {
        var deferred = $.Deferred(),
            type = smarket.browerType;
        if (type != "mobile" || !smarket.inWeChat) {
            contactInfo.needWechat = true;
            deferred.resolve(contactInfo);
            return deferred.promise();
        }
        wx.getOpenId(weChatId, schemaId, isSilentAuthorise, '', true).then(function (data) {
            var content = data.content;
            if (data && data["result"] == 0) {
                $.cookie('openId' + weChatId, content["openId"], {path: '/'});
                contactInfo["city"] = content["city"];
                contactInfo["country"] = content["country"];
                contactInfo["gender"] = content["gender"];
                contactInfo["groupId"] = content["groupId"];
                contactInfo["groupid"] = content["groupid"];
                contactInfo["headImgUrl"] = content["headImgUrl"];
                contactInfo["headimgurl"] = content["headimgurl"];
                contactInfo["language"] = content["language"];
                contactInfo["nickname"] = content["nickname"];
                contactInfo["openId"] = content["openId"];
                contactInfo["openid"] = content["openid"];
                contactInfo["authCode"] = content["authCode"];
                contactInfo["province"] = content["province"];
                contactInfo["remark"] = content["remark"];
                contactInfo["sex"] = content["sex"];
                contactInfo["subscribe"] = content["subscribe"];
                contactInfo["subscribeTime"] = content["subscribeTime"];
                contactInfo["subscribe_time"] = content["subscribe_time"];
                if (content["memberId"] && content["session"] && schemaId) {
                    contactInfo["name"] = content["name"];
                    contactInfo["memberId"] = content["memberId"];
                    contactInfo["unique"] = content["unique"];
                    contactInfo["uniqueType"] = content["uniqueField"];
                    contactInfo["session"] = content["session"];
                    smarketMember["name"] = contactInfo["name"];
                    smarketMember["memberId"] = contactInfo["memberId"];
                    smarketMember["unique"] = contactInfo["unique"];
                    smarketMember["uniqueType"] = contactInfo["uniqueType"];
                    smarketMember["session"] = contactInfo["session"];
                    cookie.smarketMember(schemaId, smarketMember);
                }
                if (contactInfo["subscribe"] != "1" && defaultOption["attentionWeChat"] == "1" && defaultOption["type"] == "mobile" && needAuth) {
                    contactInfo.needAttentionWeChat = true;
                }
                deferred.resolve(contactInfo);
            }
        }, function (data) {
            deferred.reject(data["desc"]);
        });
        return deferred.promise();
    }

    function initRegister(formId, trackId, schemaId, type, needAuth) {
        var deferred = $.Deferred();
        if (smarketMember && !$.isEmptyObject(smarketMember)) {
            contactInfo["name"] = smarketMember["name"];
            contactInfo["memberId"] = smarketMember["memberId"];
            contactInfo["unique"] = smarketMember["unique"];
            contactInfo["uniqueType"] = smarketMember["uniqueType"];
            contactInfo["session"] = smarketMember["session"];
            deferred.resolve(contactInfo);
        } else {
            if (needAuth) {
                contactmanage.formSearch({
                    tenantId: "",
                    schemaId: schemaId,
                    trackId: trackId,
                    formId: formId,
                    keyword: "",
                    start: 0,
                    num: 999
                }).then(function (data) {
                    var content = data.content;
                    if (data && content["result"] == 0) {
                        if (content["items"].length > 0) {
                            var reg = new RegExp("(^|&)weChatId=([^&]*)(&|$)");
                            var r = window.location.search.substr(1).match(reg);
                            if (r != null) {
                                window.location.href = content["items"][0]["link"][type] + "&weChatId=" + unescape(r[2]) + "&authCode=" + contactInfo["authCode"] + "&returnUrl=" + encodeURIComponent(window.location.href) + (defaultOption["isWeChatBrowser"] ? "#wechat_redirect" : "");
                            } else {
                                window.location.href = content["items"][0]["link"][type] + "&authCode=" + contactInfo["authCode"] + "&returnUrl=" + encodeURIComponent(window.location.href) + (defaultOption["isWeChatBrowser"] ? "#wechat_redirect" : "");
                            }

                        }
                    }
                });

            } else {
                deferred.resolve(contactInfo);
            }
        }
        return deferred.promise();
    }

    //微信跳转登录 formId:表单ID，trackId：渠道ID，schemaId：体系ID
    function initWeChatRegister(formId, trackId, schemaId, weChatId) {
        var deferred = $.Deferred();
        if (smarketMember && !$.isEmptyObject(smarketMember)) {
            contactInfo["name"] = smarketMember["name"];
            contactInfo["memberId"] = smarketMember["memberId"];
            contactInfo["unique"] = smarketMember["unique"];
            contactInfo["uniqueType"] = smarketMember["uniqueType"];
            contactInfo["session"] = smarketMember["session"];
            deferred.resolve(contactInfo);
        } else {
            contactmanage.formSearch({
                tenantId: "",
                schemaId: schemaId,
                trackId: trackId,
                formId: formId,
                keyword: "",
                start: 0,
                num: 999
            }).then(function (data) {
                var content = data.content;
                if (content["items"].length > 0) {
                    window.location.href = content["items"][0]["link"]["mobile"] + "&weChatId=" + weChatId + "&returnUrl=" + encodeURIComponent(window.location.href) + (defaultOption["isWeChatBrowser"] ? "#wechat_redirect" : "");
                }
            });
        }
        return deferred.promise();
    }

    function postForm(request, callback) {
        var extraConfig = defaultOption["extraConfig"];
        if (extraConfig && extraConfig["post"]["url"] && extraConfig["post"]["cmd"]) {
            api.s3g(extraConfig["post"]["aliPath"], $.extend(contactInfo, request))
                .then(function (data) {
                    if (data && data.body.result == 0) {
                        if (typeof callback == "function") {
                            callback(data);
                        }
                    } else {
                        callback(data);
                    }
                });
        } else {
            if (typeof callback == "function") {
                callback();
            }
        }
    }

    function initPre(callback) {
        if (defaultOption["extraConfig"]["init"]["url"] && defaultOption["extraConfig"]["init"]["cmd"]) {
            if (defaultOption["instanceId"]) {
                api.s3g(defaultOption["extraConfig"]["init"]["aliPath"], {
                    session: smarketMember.session || "",
                    instanceId: defaultOption.instanceId
                }).then(function (data) {
                    if (typeof callback == "function") {
                        callback(contactInfo, data);
                    }
                }, function () {
                    if (typeof callback == "function") {
                        callback(contactInfo, {result: -1, desc: "数据加载失败"});
                    }
                });
            } else {
                callback(contactInfo, {result: -1, desc: "前调方法需要传入instanceId参数"});
            }
        } else {
            callback(contactInfo, {result: 0, desc: ""});
        }
    }

    function initPage(callback) {
        smarket.template.renderByConfigId().then(function (data) {
            var isSubPage = false,
                configInfo = data.content.configInfo;
            //验证访问地址和设置的模板地址是否相同
            if (smarket.isUrl(configInfo["formalUrl"]) && window.location.href.indexOf(configInfo["formalUrl"]) < 0) {
                for (var i = 0; i < configInfo["html"].length; i++) {
                    if (window.location.href.indexOf(configInfo["html"][i]["formalUrl"]) > -1) {
                        isSubPage = true;
                        break;
                    }
                }
                if (!isSubPage) {
                    window.location.href = configInfo["formalUrl"] + "?" + window.location.href.split('?')[1];
                    return;
                }
            }
            return initAnonymous();
        }).then(function (data) {
            if (data && data["result"] == 0) {
                var cookieId = data.content;
                cookie.globalUserId(cookieId, {path: '/', expires: 3650});
                contactInfo["globalUserId"] = cookieId;
                if (typeof callback === "function") {
                    callback(cookieId);
                }
            }
        });
    }

    smarket.extend({
        initForm: initForm,
        initWeChat: initWeChat,
        initRegister: initRegister,
        initWeChatRegister: initWeChatRegister,
        postForm: postForm,
        initPre: initPre,
        initPage: initPage,
        getContactInfo:function () {
            return contactInfo;
        }
    });
})(
    __webpack_require__(0),
    __webpack_require__(17),
    __webpack_require__(18),
    __webpack_require__(25),
    __webpack_require__(10)
);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created on 2017/2/15
 */

(function (smarket, ko, $) {

    //判断框架js是否存在
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    //定义article相关的API
    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        ArticleCategoryViewModel = viewModel.ArticleCategoryViewModel,
        article = smarket.api.article;

    /**
     * ArticleCategoryListViewModel创建栏目列表实例
     * @param articleCategoryId     栏目id
     * @constructor
     */
    function ArticleCategoryListViewModel(articleCategoryId, tenantId) {
        var self = this;
        BaseViewModel.apply(self);
        self.articleCategoryId = articleCategoryId; //栏目id

        self.tenantId = tenantId;     //租户id
        self.isEnabled = 1; //是否可用 1为可用，-1为全部

        self.articleCategoryList = ko.observableArray();    //栏目列表
    }

    ArticleCategoryListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = ArticleCategoryListViewModel.prototype;
    proto.constructor = ArticleCategoryListViewModel;
    //前置空方法
    proto.preLoad = function () {
        return true;
    };
    //加载后方法
    proto.afterLoad = smarket.noop;

    //加载数据
    proto.load = function () {
        var self = this;
        self.preLoad();
        return self.getArticleCategoryList(self.isEnabled).then(function (data) {
            self.init(data.content);
            self.afterLoad(1);
            return data;
        }, function (data) {
            self.afterLoad();
            return data;
        });
    };

    //数据绑定
    proto.init = function (content) {
        var self = this;
        if (content && content.length > 0) {
            var items = content;
            //var key in item的方法IE8不兼容，会出现多一条空数据
            for (var i = 0; i < items.length; i++) {
                var object = new ArticleCategoryViewModel(items[i]["articleCategoryId"]);
                object.init(items[i]);
                self.articleCategoryList.push(object);
            }
        }
    };

    /**
     * 获取栏目列表
     * @param isEnabled         获取是否可用的栏目列表，-1为全部，1为可用
     * @returns {*}
     */
    proto.getArticleCategoryList = function (isEnabled) {
        var self = this,
            defer = $.Deferred();
        article.getArticleCategoryList(self.tenantId, '', '', isEnabled, self.articleCategoryId).then(function (data) {
            var result = data;
            if (result.result == 0) {
                defer.resolve(data);
            }
            else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise();
    };

    //重写ArticleCategoryListViewModel
    ArticleCategoryListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.ArticleCategoryListViewModel = ArticleCategoryListViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(15),__webpack_require__(3),__webpack_require__(28));

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        article = smarket.api.article;

    /**
     * ArticleViewModel 创建实例
     * @param articleId     文章id
     * @constructor
     */
    function ArticleViewModel(articleId) {
        var self = this;
        BaseViewModel.apply(self);
        self.articleId = articleId;         //文章id
        self.instanceId = ko.observable();     //实例id
        self.moduleId = ko.observable();       //模块id
        self.pushTime = ko.observable('');
        self.showImages = ko.observable('');
        self.templateConfigId = ko.observable();
        self.tenantId = ko.observable();
        self.typeId = ko.observable();
        self.title = ko.observable('');     //文章标题
        self.content = ko.observable('');   //文章内容
        self.coverImageMappingId = ko.observable('');   //封面图mappingId
        self.coverImageUrl = ko.observable(''); //封面图url
        self.createTime = ko.observable('');     //创建时间
        self.fileIds = ko.observable();     //资料下载的id数组
        self.isEnabled = ko.observable(true);   //是否启用
        self.isRecommend = ko.observable();     //是否推荐
        self.isShared = ko.observable();    //是否分享
        self.isStick = ko.observable();     //是否置顶
        self.linkUrl = ko.observable('');   //文章链接
        self.useLinkUrl = ko.observable();  //是否使用外链
        self.modifyTime = ko.observable('');    //最后修改时间
        self.nextArticleId = ko.observable();   //下一篇文章id
        self.articleCategoryId = ko.observable();   //栏目id
        self.order = ko.observable();       //排序权值
        self.summary = ko.observable('');   //摘要
        self.browseCount = ko.observable(0);    //浏览数
        self.type = ko.observable();        //文章来源
    }

    ArticleViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = ArticleViewModel.prototype;
    proto.constructor = ArticleViewModel;

    //前置空方法
    proto.preGet = function () {
        return true;
    };
    //加载数据
    proto.load = function () {
        var self = this;
        self.preGet();
        return self.get();
    };
    //数据绑定
    proto.init = function (article) {
        var self = this;
        self.instanceId(article.instanceId);
        self.moduleId(article.moduleId);
        self.pushTime(article.pushTime);
        self.showImages(article.showImages);
        self.templateConfigId(article.templateConfigId);
        self.tenantId(article.tenantId);
        self.typeId(article.typeId);
        self.title(article.title);
        self.content(article.content);
        self.coverImageMappingId(article.coverImageMappingId);
        self.coverImageUrl(article.coverImageUrl);
        self.createTime(article.createTime);
        self.fileIds(article.fileIds);
        self.isEnabled(article.isEnabled);
        self.isRecommend(article.isRecommend);
        self.isShared(article.isShared);
        self.isStick(article.isStick);
        self.linkUrl(article.linkUrl);
        self.useLinkUrl(article.useLinkUrl);
        self.modifyTime(article.modifyTime);
        self.nextArticleId(article.nextArticleId);
        self.articleCategoryId(article.articleCategoryId);
        self.order(article.order);
        self.summary(article.summary);
        self.browseCount(article.statInfo.browseCount);
        self.type(article.type);
    };

    //获取文章信息
    proto.get = function () {
        var self = this,
            defer = $.Deferred();
        article.get(self.articleId, 1, 1).then(function (data) {
            var result = data,
                content = result.content;
            if (result.result == 0) {
                self.init(content);
                defer.resolve(data);
            }
            else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise();
    };

    //重写ArticleViewModel
    ArticleViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.ArticleViewModel = ArticleViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(15),__webpack_require__(3));


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by bantenio on 2016/12/5.
 */

(function (smarket, ko, $) {

    //判断框架js是否存在
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    //定义article相关的API
    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        article = smarket.api.article;

    /**
     * ArticleListViewModel创建实例
     * @param articleCategoryId     栏目id
     * @param tenantId              租户id
     * @constructor
     */
    function ArticleListViewModel(articleCategoryId, tenantId) {
        var self = this;
        BaseViewModel.apply(self);
        self.articleCategoryId = articleCategoryId; //栏目id
        //TODO need?
        // self.articleCategoryName =ko.observable();
        // self.shareDescription =ko.observable();
        // self.shareLogo =ko.observable();
        self.tenantId = tenantId;     //租户id
        self.title = "";
        self.isRecommend = -1;
        self.isStick = -1;
        self.start = 0;
        self.num = -1;
        self.withStat = -1;
        self.typeId = "";
        self.orderField = "";
        self.articleList = ko.observableArray();    //文章列表
        //TODO const value?
        self.articleBaseUrl = "info.html";          //文章详情地址
        self.total = ko.observable();   //The total of articles
        //TODO need?
        // self.withTemplate=1;   //带有模板
        // self.getAll=ko.observable(0);   //是否拉取全部文章包括子栏目下的所有
        // self.searchColumns=ko.observableArray();  //筛选字段，数组
    }

    ArticleListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = ArticleListViewModel.prototype;
    proto.constructor = ArticleListViewModel;
    proto.preGet = function () {
        return true;
    };

    //加载数据
    proto.load = function () {
        var self = this;
        self.preGet();
        //TODO all and query parameters
        return self.getArticleList(self.title, self.isRecommend, self.isStick, self.start, self.num, self.withStat, self.typeId, self.orderField);
    };

    //数据绑定
    proto.init = function (content) {
        var self = this;
        if (content && content.total > 0) {
            var items = content.items;
            self.total = content.total;
            //var key in item的方法IE8不兼容，会出现多一条空数据
            for (var key = 0; key < items.length; key++) {
                items[key]['articalBaseUrl'] = self.articleBaseUrl;
                var artical = new Article(items[key]);
                self.articleList.push(artical);
            }
        }
    }

    /**
     * 获取文章列表
     * @param title         标题模糊查询
     * @param isRecommend   是否推荐
     * @param isStick       是否置顶
     * @param start         开始索引
     * @param num           个数,-1代表全部
     * @param withStat          是否需要统计
     * @param typeId            文章类型id，可为空
     * @param orderField        按某字段排序
     * @returns {*}
     */
    //TODO all and query parameters
    proto.getArticleList = function (title, isRecommend, isStick, start, num, withStat, typeId, orderField, withTemplate, getAll, searchColumns) {
        var self = this,
            defer = $.Deferred();
        article.getListByProject('', isRecommend, '', self.articleCategoryId, title, self.tenantId, isStick, start, num, withStat, typeId, orderField, withTemplate, getAll, searchColumns).then(function (data) {
            var result = data,
                content = result.content;
            if (result.result == 0) {
                self.init(content);
                defer.resolve(data);
            }
            else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise();
    };

    /**
     * 对象属性绑定
     * @param item         article对象
     * @returns {*}
     */
    function Article(item) {
        var self = this;
        self.articleCategoryId = item.articleCategoryId;
        self.articleId = item.articleId;
        self.pushTime = ko.observable(item.pushTime);
        self.showImages = ko.observable(item.showImages);
        self.typeId = ko.observable(item.typeId);
        self.title = ko.observable(item.title);
        self.content = ko.observable(item.content);
        self.coverImageMappingId = ko.observable(item.coverImageMappingId);
        self.coverImageUrl = ko.observable(item.coverImageUrl);
        self.createTime = ko.observable(item.createTime);
        self.fileIds = ko.observable(item.fileIds);
        self.isEnabled = ko.observable(item.isEnabled);
        self.isRecommend = ko.observable(item.isRecommend);
        self.isShared = ko.observable(item.isShared);
        self.isStick = ko.observable(item.isStick);
        self.linkUrl = ko.observable(item.linkUrl);
        self.useLinkUrl = ko.observable(item.useLinkUrl);
        self.order = ko.observable(item.order);
        self.summary = ko.observable(item.summary);
        self.articleUrl = ko.observable(item.url);
        if (item.statInfo) {
            self.browseCount = ko.observable(item.statInfo.browseCount);
        }
    }

    //重写ArticleViewModel
    ArticleListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.ArticleListViewModel = ArticleListViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(15),__webpack_require__(3));


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $, validator) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        FieldFactory = viewModel.FieldFactory,
        Field = viewModel.Field,
        PhoneField = Field.PhoneField,
        PasswordField = Field.PasswordField,
        contactmanage = smarket.api.contactmanage,
        isSubmitting = false;

    function ContactManageViewModel(options) {
        var self = this;

        BaseViewModel.apply(self);

        //身份认证体系Id
        self.schemaId = ko.observable(options['schemaId']);
        //注册表单Id
        self.memberFormId = ko.observable(options['memberFormId']);
        //追踪代码Id
        self.trackId = ko.observable(options['trackId']);
        //前台用户session
        self.session = ko.observable(options['session']);
        //认证代码(用于注册绑定openId)
        self.authCode = ko.observable(options['authCode']);
        //标题
        self.title = ko.observable();
        //表单字段
        self.fields = ko.observableArray();
        //创建时间
        self.createTime = ko.observable();
        //表单状态
        self.status = ko.observable();
        //字段命名空间
        self.field = Field;
    }

    ContactManageViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = ContactManageViewModel.prototype;
    proto.constructor = ContactManageViewModel;

    proto.init = function (formInfo) {
        var self = this;

        self.title(formInfo.title);
        self.status(formInfo.status);
        self.createTime(formInfo.createTime);

        for (var i = 0; i < formInfo["items"].length; i++) {
            var field = FieldFactory.create(formInfo["items"][i]['type'], formInfo["items"][i]['fieldId']);
            field.init({
                field: smarket.extend(true, {isDisplay: true}, formInfo["items"][i]),
                formId: self.memberFormId(),
                value: formInfo["items"][i]['value']
            });
            field.schemaId = self.schemaId();
            self.initField(field);
            validator(field);
            field.initValidation();
            self.fields.push(field);
        }
    };
    //加载表单
    proto.load = function () {
        var self = this;

        self.beforeLoadHandler();

        return contactmanage.get(self.memberFormId(), self.trackId()).then(function (data) {
            self.init(data.content);
            self.afterLoadHandler(data);
            return data;
        }, function (data) {
            self.afterLoadHandler(data);
            return data;
        });
    };
    //提交注册信息
    proto.signUp = function () {
        var self = this, fields = self.fields(), isValid = true, answers = [], verificationCode = '',
            defer = $.Deferred(),
            submitData = {
                "memberFormId": self.memberFormId(),
                "track": self.trackId(),
                "url": window.location.href,
                "referenceUrl": (self.inWeChat() ? "微信" : (document.referrer || window.location.href))
            };

        //获取表单数据
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                answers.push(fields[i].answer());

                if (fields[i].isUnique()) {
                    submitData['verificationCode'] = fields[i].answer()['checkCode'];
                }
            }
        }
        if (!isValid) {
            self.validationErrorHandler();
            defer.reject({
                result: -1,
                desc: "表单验证失败",
                content: null
            });
            return defer.promise();
        }
        submitData["items"] = answers;

        self.beforeSignUpHandler(submitData);

        return contactmanage.signUp(submitData).then(function (data) {
            smarket.cookie.smarketMember(self.schemaId(), smarket.extend({}, data['content']));
            self.afterSignUpHandler(data);
            return data;
        }, function (data) {
            self.afterSignUpHandler(data);
            return data;
        });
    };
    //更新个人信息
    proto.update = function () {
        var self = this, fields = self.fields(), isValid = true, answers = [], defer = $.Deferred(),
            submitData = {
                items: answers,
                formData: answers,
                sess: self.session()
            };

        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                answers.push(fields[i].answer());
            }
        }

        if (!isValid) {
            self.validationErrorHandler();
            defer.reject({
                result: -1,
                desc: "表单验证失败",
                content: null
            });
            return defer.promise();
        }

        submitData['items'] = answers;
        self.beforeUpdateHandler(submitData);

        return contactmanage.update(submitData).then(function (data) {
            self.afterUpdateHandler(data);
            return data;
        }, function (data) {
            self.afterUpdateHandler(data);
            return data;
        });
    };
    //普通登录
    proto.signIn = function () {
        var self = this, fields = self.fields(), isValid = true, defer = $.Deferred(), field = null,
            obtainFields = [{
                matchFunc: function (field) {
                    return field.isUnique();
                },
                submitFieldName: "unique"
            }, {
                matchFunc: function (field) {
                    return (field instanceof PasswordField);
                },
                submitFieldName: "password"
            }],
            submitData = {
                clientType: '1',
                clientBrand: '1',
                clientVersion: '1',
                memberSchemaId: self.schemaId(),
                url: window.location.href,
                authCode: self.authCode(),
                referenceUrl: (self.inWeChat() ? "微信" : (document.referrer || window.location.href))
            };

        //获取表单数据
        for (var i = 0; i < fields.length; i++) {
            field = fields[i];
            smarket.each(obtainFields, function (idx, handle) {
                if (handle.matchFunc(field)) {
                    if (field.errors().length > 0) {
                        isValid = false;
                        field.errors.showAllMessages();
                    } else {
                        submitData[handle.submitFieldName] = field.answer()['text'];
                    }
                    return false;
                }
            });
        }

        if (!isValid) {
            self.validationErrorHandler();
            defer.reject({
                result: -1,
                desc: "表单验证失败",
                content: null
            });
            return defer.promise();
        }
        self.beforeSignInHandler(submitData);

        return contactmanage.signIn(submitData).then(function (data) {
            var contactInfo = smarket.cookie.smarketMember(self.schemaId());

            smarket.cookie.smarketMember(self.schemaId(), smarket.extend(true, contactInfo, {
                name: data["content"]["info"]["name"],
                memberId: data["content"]["info"]["memberId"],
                unique: data["content"]["info"]["unique"],
                uniqueType: data["content"]["info"]["uniqueField"],
                session: data["content"]["session"]
            }));
            self.afterSignInHandler(data);
            return data;
        }, function (data) {
            self.afterSignInHandler(data);
            return data;
        });
    };
    //手机验证码动态登录
    proto.signInDynamic = function () {
        var self = this, fields = self.fields(), isValid = true, unique, checkCode, defer = $.Deferred(), field = null,
            postData = {
                memberSchemaId: self.schemaId()
            };

        //获取表单提交数据
        for (var i = 0; i < fields.length; i++) {
            field = fields[i];
            if (field instanceof PhoneField) {
                if (field.errors().length > 0) {
                    isValid = false;
                    field.errors.showAllMessages();
                } else {
                    postData['unique'] = field.answer()['text'];
                    postData['checkCode'] = field.answer()['checkCode'];
                }
                break;
            }
        }

        if (!isValid) {
            self.validationErrorHandler();
            defer.reject({
                result: -1,
                desc: "表单验证失败",
                content: null
            });
            return defer.promise();
        }
        self.beforeSignInHandler(postData);

        return contactmanage.signInDynamic(postData).then(function (data) {
            self.afterSignInHandler(data);
            return data;
        }, function (data) {
            self.afterSignInHandler(data);
            return data;
        });

    };
    //重写ContactManageViewModel
    ContactManageViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    //扩展基础事件
    ContactManageViewModel.extend({
        beforeLoadHandler: smarket.noop,
        afterLoadHandler: smarket.noop,
        beforeSignUpHandler: smarket.noop,
        afterSignUpHandler: smarket.noop,
        beforeSignInHandler: smarket.noop,
        afterSignInHandler: smarket.noop,
        beforeUpdateHandler: smarket.noop,
        afterUpdateHandler: smarket.noop,
        validationErrorHandler: smarket.noop,
        initField: smarket.noop
    });

    viewModel.ContactManageViewModel = ContactManageViewModel;
})(
    __webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(91),
    __webpack_require__(11),
    __webpack_require__(10),
    __webpack_require__(5)
);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket, ko, $, validators) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        FieldFactory = viewModel.FieldFactory,
        Field = viewModel.Field,
        customform = smarket.api.customform,
        isSubmitting = false;

    function CustomFormViewModel(options) {
        var self = this;

        BaseViewModel.apply(self);

        //自定义表单Id
        self.formId = ko.observable(options['customFormId']);
        //追踪渠道
        self.linkId = ko.observable(options['linkId']);
        //前台用户session
        self.session = ko.observable(options['session']);
        //DE用的追踪渠道
        self.tc = ko.observable(options['tc']);
        //实例Id
        self.instanceId = ko.observable();
        //标题
        self.title = ko.observable();
        //表单字段
        self.fields = ko.observableArray([]);
        //创建时间
        self.createTime = ko.observable();
        //字段命名空间
        self.field = Field;
    }

    CustomFormViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = CustomFormViewModel.prototype;
    proto.constructor = CustomFormViewModel;

    proto.init = function (formInfo) {
        var self = this;

        self.instanceId(formInfo.instanceId);
        self.title(formInfo.title);
        self.createTime(formInfo.createTime);

        for (var i = 0; i < formInfo["items"].length; i++) {
            var field = FieldFactory.create(formInfo["items"][i]['type'], formInfo["items"][i]['fieldId']);
            field.init({
                field: formInfo["items"][i],
                formId: self.formId(),
                value: formInfo["items"][i]['value']
            });
            self.initField(field);
            validators(field);
            field.initValidation();
            self.fields.push(field);
        }

        self.afterLoadHandler();
    };

    proto.load = function () {
        var self = this;

        self.beforeLoadHandler();

        return customform.get(self.formId()).then(function (data) {
            self.init(data.content);
            return data;
        }, function (data) {
            return data;
        });
    };

    proto.register = function () {
        var self = this, fields = self.fields(), isValid = true, answers = [],
            submitData = {
                sess: self.session(),
                customFormId: self.formId(),
                linkId: self.linkId(),
                instanceId: self.instanceId(),
                globalUserId: smarket.cookie.globalUserId(),
                url: window.location.href,
                referenceUrl: smarket.inWeChat ? '微信' : document.referrer
            };

        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                answers.push(fields[i].answer());
            }
        }

        submitData['items'] = answers;

        if (isValid) {
            self.beforeRegisterHandler(submitData);

            return customform.submit(submitData).then(function (data) {
                self.afterRegisterHandler(data);
                isSubmitting = false;
            }, function (data) {
                self.afterRegisterHandler(data);
                isSubmitting = false;
            });
        } else {
            self.validationErrorHandler();
            isSubmitting = false;
        }
    };

    //重写CustomFormViewModel
    CustomFormViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    CustomFormViewModel.extend({
        beforeLoadHandler: smarket.noop,
        afterLoadHandler: smarket.noop,
        beforeRegisterHandler: smarket.noop,
        afterRegisterHandler: smarket.noop,
        validationErrorHandler: smarket.noop,
        initField: smarket.noop
    });

    viewModel.CustomFormViewModel = CustomFormViewModel;
})(
    __webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(92),
    __webpack_require__(11),
    __webpack_require__(26)
);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        FileViewModel = viewModel.FileViewModel,
        file = smarket.api.file;

    function FileListViewModel(folderId) {
        var self = this;
        BaseViewModel.apply(self);
        self.folderId = folderId;
        self.total = ko.observable();

        //已成列表
        self.items = ko.observableArray();
    }

    FileListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = FileListViewModel.prototype;
    proto.constructor = FileListViewModel;


    //加载数据
    proto.load = function (start, num, tenantId, fileIds, sortType) {
        var self = this;
        return file.getList(self.folderId, start, num, tenantId, fileIds, sortType).then(function (data) {
            self.init(data.content);
            return data;
        }, function (data) {
            return data;
        });
    };
    proto.postInit = smarket.noop;
    proto.preInit = function (items) {
        return true;
    };
    //数据绑定
    proto.init = function (data) {
        var self = this,
            fileList = [];
        self.total = data.total;
        var items = data.items;
        if (!self.preInit(items)) {
            return false;
        }
        for (var i = 0; i < items.length; i++) {
            var fileObj = new FileViewModel(items[i].fileId);
            fileObj.init(items[i]);
            fileList.push(fileObj);
        }
        self.postInit(fileList);
        self.items(fileList);
    };


    //重写FileListViewModel
    FileListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.FileListViewModel = FileListViewModel;
})(__webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(36),
    __webpack_require__(3),
    __webpack_require__(8),
    __webpack_require__(29)
);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/5/10.
 */

__webpack_require__(106);
__webpack_require__(107);
__webpack_require__(108);
__webpack_require__(109);
__webpack_require__(110);
__webpack_require__(111);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Administrator on 2017/1/10.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        interactionrecordservice = smarket.api.interactionrecord;

    /**
     * 我的下载记录 viewmodel
     * @param tenantId  租户Id
     * @param moduleId  模块Id
     * @param instanceId 实例Id
     * @param memberId 会员Id
     * @param actionKey 互动类型    file_download:文件下载,project_share:产品分享,project_browse:产品浏览
     * @param start
     * @param num
     * @param session
     * @constructor
     */
    function DownloadRecordViewModel(tenantId, moduleId, instanceId, memberId, actionKey, start, num, session) {
        var self = this;
        BaseViewModel.apply(self);
        //租户Id
        self.tenantId = tenantId;
        //模块Id
        self.moduleId = moduleId;
        //实例Id
        self.instanceId = instanceId;
        //会员Id
        self.memberId = memberId;
        //互动类型    file_download:文件下载,project_share:产品分享,project_browse:产品浏览
        self.actionKey = actionKey;
        self.start = start || 0;
        self.num = num || 1000;
        self.session = session;
        self.downloadRecodeList = ko.observableArray();
    }

    DownloadRecordViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = DownloadRecordViewModel.prototype;
    proto.constructor = DownloadRecordViewModel;
    /**
     * load 前置方法，预留给controller扩展
     * @returns {boolean}
     */
    proto.preLoad = function () {
        return true;
    };
    /**
     * 从service加载数据，存入ko监控
     * @returns {*}
     */
    proto.load = function () {
        var self = this;
        self.preLoad();
        return interactionrecordservice.postDetailList(self.tenantId, self.moduleId, self.instanceId, self.memberId,
            self.actionKey, self.start, self.num, self.session).then(
            function (body) {
                self.init(body.content);
                return body;
            },
            function (body) {
                return body;
            }
        );
    };

    /**
     * 从已有数据初始化当前model，不从service数据，用于controller组装很多小model为一个大model时使用。
     * @param content
     */
    proto.init = function (content) {
        var self = this;
        if (content && content.total > 0) {
            var items = content.items;
        }
        for (var key in items) {
            var recordItem = new RecordItem(items[key]);
            self.downloadRecodeList.push(recordItem);
        }
    };
    function RecordItem(item) {
        var self = this;
        //实例id
        self.instanceId = ko.observable(item.instanceId);
        //实例名称
        self.instanceName = ko.observable(item.instanceName);
        //明细
        self.detail = ko.observable(item.detail);
        //最后时间
        self.lastTime = ko.observable(item.lastTime);
    }


    /**
     * 重写DownloadRecordViewModel，不知道什么用途，每个model都要有这个方法
     * @param _proto
     */
    DownloadRecordViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.DownloadRecordViewModel = DownloadRecordViewModel;
})(__webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(37),
    __webpack_require__(3));



/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        luckydraw = smarket.api.luckydraw;

    function LuckyDrawViewModel(luckyDrawId) {
        var self = this;
        BaseViewModel.apply(self);
        self.luckyDrawId = luckyDrawId;//抽奖ID
        self.title = ko.observable('');
        self.createTime = ko.observable('');
        self.needUserInfo = ko.observable(false);//是否需要用户信息

        self.luckyDrawInfo = null;//抽奖信息
        self.canRunOther = false;
        self.status = false;
        self.isWin = ko.observable(false);
        self.prizes = ko.observableArray();
        //奖项内容
        self.prizeName = ko.observable("");
        self.awardsName = ko.observable("");
        self.awardsDesc = ko.observable("砸开金蛋，试试手气！");
        self.loginData = '';
        self.resultId = "";
        self.luckyArr = [];
        self.noLuckyArr = [];
    }

    LuckyDrawViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = LuckyDrawViewModel.prototype;
    proto.constructor = LuckyDrawViewModel;

    proto.init = function (luckyDrawInfo) {
        var self = this;
        luckyDrawInfo.luckyDrawId = self.luckyDrawId;
        self.luckyDrawInfo = luckyDrawInfo;
        self.title(luckyDrawInfo.title);
        self.createTime(new Date(luckyDrawInfo.createTime * 1000).Format('yyyy-MM-dd HH:ss:mm'));
        self.needUserInfo(luckyDrawInfo.needUserInfo == 'true' || luckyDrawInfo.needUserInfo == '1');
        self.canRunOther = true;
    };

    proto.load = function () {
        var self = this;

        return $.when(luckydraw.get({
            luckyDrawId: self.luckyDrawId,
            hasVirtualAward: false
        }), self.getPrize()).then(function (data) {
            self.init(data.content);
            return data;
        });
    };

    proto.preSubmit = function () {
        return true;
    };

    proto.postSubmit = smarket.noop;
    //获取得奖结果
    proto.submit = function () {
        var self = this,
            request = {
                luckyDrawId: self.luckyDrawId,
                cookieId: smarket.cookie.globalUserId(),
                url: window.location.href,
                referenceUrl: smarket.inWeChat ? '微信' : document.referrer
            };
        if (!self.canRunOther) return;

        if (self.status) {
            return;
        }

        if (!self.preSubmit(request)) {
            return false;
        }

        self.status = true;

        return luckydraw.clientAction(request).then(function (data) {
            self.status = false;
            self.resultId = data.content.resultId;
            var luckyIndex = 0,
                noLuckyArr = self.noLuckyArr,
                luckyArr = self.luckyArr,
                luckyObj = data.content;
            if (luckyObj.award == undefined) {
                luckyIndex = Math.floor(noLuckyArr[0] + Math.random() * (noLuckyArr[noLuckyArr.length - 1] - noLuckyArr[0] + 1));
            } else {
                $.each(luckyArr, function (index, data) {
                    if (data.name == luckyObj.award.name) {
                        self.awardsName(luckyObj.award.name);
                        if (luckyObj.needUserInfo == "true") {
                            self.isWin(true);
                        }
                        luckyIndex = data.index;
                        return false;
                    }
                });
            }
            self.awardsDesc(luckyObj.detail.desc);
            self.postSubmit(data);
            return data;
        }, function (data) {
            self.status = false;
            self.postSubmit(data);
            return data;
        });
    };

    proto.preGetPrize = smarket.noop;
    proto.postGetPrize = smarket.noop;
    //获取奖品信息
    proto.getPrize = function () {
        var self = this;
        self.preGetPrize();
        return luckydraw.getAwardDetailList({
            luckyDrawId: self.luckyDrawId
        }).then(function (data) {
            var content = data.content,
                noLuckyArr = self.noLuckyArr,
                luckyArr = self.luckyArr;
            if (content.length > 0) {
                content = content[0].type ? content : content.reverse();
            }

            self.prizes().concat(content);
            for (var i = 0; i < 6; i++) {
                if (i < content.length) {
                    if (content[i].type == "") {
                        noLuckyArr.push((i + 1));
                    } else if (content[i].type == "1") {
                        luckyArr.push({"index": (i + 1), "name": content[i].awardDetail["name"]});
                    } else if (content[i].type == "2") {
                        luckyArr.push({"index": (i + 1), "name": content[i].awardDetail["name"]});
                    }
                }
                else {
                    noLuckyArr.push((i + 1));
                }
            }
            self.postGetPrize(data);
            return data;
        });
    };

    //重写LuckyDrawViewModel
    LuckyDrawViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    viewModel.LuckyDrawViewModel = LuckyDrawViewModel;
})(
    __webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(17),
    __webpack_require__(126)
);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/3.
 */
;
'use strict';
(function (smarket, ko, $, question) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        questionaire = smarket.api.questionaire;

    function QuestionaireViewModel(questionaryId) {
        var self = this;
        self.questionaryInfo = null;
        self.questionaryId = questionaryId;
        self.title = ko.observable('');
        self.createTime = ko.observable();
        self.instanceId = ko.observable();
        self.attachId = ko.observable();
        self.attachWXAccount = ko.observable();
        self.attentionWeChat = ko.observable();
        self.completeAction = ko.observable();
        self.completeActionType = ko.observable();
        self.endTime = ko.observable();
        self.firstSubmitTime = ko.observable();
        self.identity = ko.observable();
        self.instanceId2 = ko.observable();
        self.isPermanent = ko.observable();
        self.manualEndTime = ko.observable();
        self.manualStartTime = ko.observable();
        self.maxItemId = ko.observable();
        self.maxOptionId = ko.observable();
        self.moduleType = ko.observable();
        self.publicCopyCount = ko.observable();
        self.questionTimeStat = ko.observable();
        self.referenceCount = ko.observable();
        self.registerFormId = ko.observable();
        self.schemaId = ko.observable();
        self.shareCopyCount = ko.observable();
        self.shareCover = ko.observable();
        self.shareCoverUrl = ko.observable();
        self.shareDesc = ko.observable();
        self.shareTitle = ko.observable();
        self.shortUrl = ko.observable();
        self.startTime = ko.observable();
        self.status = ko.observable();
        self.tenantId = ko.observable();
        self.trackId = ko.observable();
        self.type = ko.observable();
        self.updateTime = ko.observable();
        self.description = ko.observable();
        self.isDescription = ko.observable(true);
        self.questions = ko.observableArray();
        self.status = ko.observable('');
        self.frep = ko.observable('');
    }

    var proto = QuestionaireViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    proto.constructor = QuestionaireViewModel;

    proto.load = function () {
        var self = this,
            loadedQuestionary = false;
        self.preLoadQuestionary();
        return self.loadQuestionary().then(function (data) {
            loadedQuestionary = true;
            return self.postLoadQuestionary(data);
        }, function (data) {
            self.postLoadQuestionary(data);
            return data;
        }).then(function (postLoadQuestionaryResult) {
            if (postLoadQuestionaryResult) {
                self.preInitQuestionary();
                return self.initQuestionary();
            }
            self.postInitQuestionary();
        }).then(function () {
            self.postInitQuestionary(1);
        }, function () {
            if (loadedQuestionary) {
                self.postInitQuestionary();
            }
        });
    };

    proto.preLoadQuestionary = smarket.noop;

    proto.postLoadQuestionary = function () {
        return true;
    };

    proto.loadQuestionary = function () {
        var self = this;
        return questionaire.get(self.questionaryId).then(function (data) {
            var content = {};
            $.extend(true, content, data.content);
            self.questionaryInfo = content;
            self.frep(content.frep);
            self.title(content.title);
            self.instanceId(content.instanceId);
            self.status(content.status);
            self.createTime(content.createTime);
            self.attachId(content.attachId);
            self.attachWXAccount(content.attachWXAccount);
            self.attentionWeChat(content.attentionWeChat);
            self.completeAction(content.completeAction);
            self.completeActionType(content.completeActionType);
            self.endTime(content.endTime);
            self.firstSubmitTime(content.firstSubmitTime);
            self.identity(content.identity);
            self.instanceId2(content.instanceId2);
            self.isPermanent(content.isPermanent);
            self.manualEndTime(content.manualEndTime);
            self.manualStartTime(content.manualStartTime);
            self.maxItemId(content.maxItemId);
            self.maxOptionId(content.maxOptionId);
            self.moduleType(content.moduleType);
            self.publicCopyCount(content.publicCopyCount);
            self.questionTimeStat(content.questionTimeStat);
            self.referenceCount(content.referenceCount);
            self.registerFormId(content.registerFormId);
            self.schemaId(content.schemaId);
            self.shareCopyCount(content.shareCopyCount);
            self.shareCover(content.shareCover);
            self.shareCoverUrl(content.shareCoverUrl);
            self.shareDesc(content.shareDesc);
            self.shareTitle(content.shareTitle);
            self.shortUrl(content.shortUrl);
            self.startTime(content.startTime);
            self.status(content.status);
            self.tenantId(content.tenantId);
            self.trackId(content.trackId);
            self.type(content.type);
            self.updateTime(content.updateTime);
            self.description(content.desc);
            return data;
        });
    };

    proto.preInitQuestionary = smarket.noop;

    proto.postInitQuestionary = smarket.noop;

    proto.initQuestionary = function () {
        var self = this,
            item = null,
            items = self.questionaryInfo.items;

        return $.Deferred(function (defer) {
            for (var i = 0; i < items.length; i++) {
                item = items[i];
                var q = question.create(item);
                if (q) {
                    self.initQuestion(q);
                    self.questions.push(q);
                }
            }
            defer.resolve();
        }).promise();
    };

    proto.initQuestion = function (question) {
        if (question) {
            question.init();
        }
    };

    proto.preSubmit = function () {
        return true;
    };
    proto.validationErrorHandler = smarket.noop;

    proto.postSubmit = smarket.noop;
    proto.valid = function () {
        var self = this,
            questions = self.questions(),
            isValid = true;
        $.each(questions, function (idx, question) {
            if (question.errors().length > 0) {
                isValid = false;
                question.errors.showAllMessages();
            }
            if (question.options) {
                $.each(question.options(), function (idx, option) {
                    if (option.errors().length > 0) {
                        isValid = false;
                        option.errors.showAllMessages();
                    }
                });
            }
        });
        return isValid;
    };
    proto.submit = function () {
        var self = this,
            isValid = true,
            options = [],
            defer = $.Deferred(),
            request = {
                "questionaryId": self.questionaryId,
                "referenceUrl": document.referrer,
                "url": window.location.href,
                "instanceId": self.instanceId()
            };
        $.each(self.questions(), function (idx, question) {
            if (question.errors().length > 0) {
                isValid = false;
                question.errors.showAllMessages();
            }
            if (question.options) {
                $.each(question.options(), function (idx, option) {
                    if (option.errors().length > 0) {
                        isValid = false;
                        option.errors.showAllMessages();
                    }
                });
            }
            if (isValid) {
                options.push(question.answer());
            }
        });

        if (!isValid) {
            defer.reject({
                result: 1,
                content: '验证错误'
            });
            self.validationErrorHandler();
            return defer.promise();
        }
        request['options'] = options;

        if (!self.preSubmit(request)) {
            defer.reject({
                result: 1,
                content: '提交错误'
            });
            return defer.promise();
        }

        self.submitQuestionary(request).then(function (data) {
            self.postSubmit(data);
            defer.resolve(data);
        }, function (data) {
            self.postSubmit(data);
            defer.reject(data);
        });
        return defer.promise();
    };
    proto.view = function (openId, globalUserId, session) {
        var self = this;
        return questionaire.view(self.questionaryId, self.instanceId(), openId, globalUserId, session);
    };
    proto.submitQuestionary = function (request) {
        return questionaire.action(request);
    };

    viewModel.QuestionaireViewModel = QuestionaireViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(116), __webpack_require__(38), __webpack_require__(38), __webpack_require__(3));


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        AgendaViewModel = viewModel.AgendaViewModel,
        agenda = smarket.api.agenda;

    function AgendaGroupListViewModel(seminarId) {
        var self = this;
        BaseViewModel.apply(self);
        self.seminarId = seminarId;
        //会议日程按日期分组列表
        self.agendaGroupList = [];
        self.agendaDateList = ko.observableArray();
        self.agendaDate = ko.observable();
        self.agendaList = ko.observableArray();

        self.switchDate = function (date) {
            for (var i = 0; i < self.agendaGroupList.length; i++) {
                var agendaDate = new Date(self.agendaGroupList[i].agendaDate * 1000);
                if (agendaDate.Format("M-d") == date.Format("M-d")) {
                    self.initAgendaGroup(date, self.agendaGroupList[i].agendas);
                    return;
                }
            }
        };
    }

    AgendaGroupListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = AgendaGroupListViewModel.prototype;
    proto.constructor = AgendaGroupListViewModel;

    //前置空方法
    proto.preLoad = function () {
        return true;
    };
    //加载后方法
    proto.afterLoad = smarket.noop;

    //加载数据
    proto.load = function () {
        var self = this;
        if (!self.preLoad()) {
            return false;
        }
        return agenda.getGroupList(self.seminarId).then(function (data) {
            self.init(data.content);
            self.afterLoad(1);
            return data;
        }, function (data) {
            self.afterLoad();
            return data;
        });
    };
    //数据绑定
    proto.init = function (data) {
        var self = this;
        self.agendaGroupList = data;
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                self.agendaDateList.push(new Date(data[i].agendaDate * 1000));
            }
            self.initAgendaGroup(new Date(data[0].agendaDate * 1000), data[0].agendas);
        }
    };

    proto.initAgendaGroup = function (date, data) {
        var self = this;
        self.agendaList.removeAll();
        self.agendaDate(date);
        for (var i = 0; i < data.length; i++) {
            var agendaObj = new AgendaViewModel(self.seminarId, data[i].agendaId);
            agendaObj.init(data[i]);
            self.agendaList.push(agendaObj);
        }
    };

    //重写AgendaGroupListViewModel
    AgendaGroupListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.AgendaGroupListViewModel = AgendaGroupListViewModel;
})(__webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(14),
    __webpack_require__(3),
    __webpack_require__(8),
    __webpack_require__(19)
);


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Administrator on 2017/1/9.
 * 我报名的会议列表，调用service层 调用网关 collect.search 获取参与过的会议
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        seminarService = smarket.api.seminar,
        collectService = smarket.api.collect;

    /**
     * EnrolledListViewModel 创建实例
     * @param tenantId 租户id
     * @param session 前台用户session
     * @constructor
     */
    function EnrolledListViewModel(tenantId, session) {
        var self = this;
        // 登录用户（我的）租户id
        self.tenantId = tenantId;
        // 登录用户（我的）前台session
        self.session = session;
        // 从第0页开始
        self.start = 0;
        // 取1000行数据回来
        self.num = 1000;

        BaseViewModel.apply(self);

        // 报名的会议列表
        self.enrolledList = ko.observableArray();
        // 收藏id与会议id对应关系
        self.enrolledIds = ko.observableArray();
    }

    EnrolledListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = EnrolledListViewModel.prototype;
    proto.constructor = EnrolledListViewModel;
    /**
     * load 前置方法，预留给controller扩展
     * @returns {boolean}
     */
    proto.preLoad = function () {
        return true;
    };

    /**
     * 从service加载数据，存入ko监控
     * @returns {*}
     */
    proto.load = function () {
        var self = this;
        self.preLoad();
        return collectService.search(self.session, self.start, self.num, "").then(function (body) {
            self.collectinit(body.content);
            // 根据会议ids获取会议列表
            var ids = [];
            for (var i in self.enrolledIds()) {
                ids.push(self.enrolledIds()[i].seminarId);
            }

            if (ids && ids.length > 0) {
                return seminarService.getListByIds(self.tenantId, ids).then(function (data) {
                    self.init(data.content, self.session);
                    return data;
                }, function (data) {
                    return data;
                });
            } else {
                return {};
            }
        }, function (body) {
            return body;
        });
    };

    /**
     * 获取收藏会议id
     * @param content
     */
    proto.collectinit = function (content) {
        var self = this;
        if (content && content.total > 0) {
            var items = content.items;
        }
        //循环获取收藏会议id
        for (var key in items) {
            var idsobj =
            {
                id: items[key].id,
                seminarId: items[key].objectId
            };
            self.enrolledIds.push(idsobj);
        }
    };
    /**
     * 从已有数据初始化当前model，不从service数据，用于controller组装很多小model为一个大model时使用。
     * @param content
     */
    proto.init = function (content, session) {
        var self = this;
        if (content && content.length > 0) {
            var items = content;
            for (var key in items) {
                //---收藏的id获取开始
                var collectid = "";
                for (var i in self.enrolledIds()) {
                    if (self.enrolledIds()[i].seminarId == items[key].seminarId) {
                        collectid = self.enrolledIds()[i].id;
                        break;
                    }
                }
                items[key].collectid = collectid;
                //----收藏的id获取结束id
                var enrolled = new Enrolled(items[key], session);
                self.enrolledList.push(enrolled);
            }
        }
    };
    function Region(item) {
        var self = this;
        //国家id
        self.countryId = ko.observable(item.countryId);
        //国家名称
        self.country = ko.observable(item.country);
        //省id
        self.provinceId = ko.observable(item.provinceId);
        //省名称
        self.province = ko.observable(item.province);
        //市id
        self.cityId = ko.observable(item.cityId);
        //市名称
        self.city = ko.observable(item.city);
    }

    function Enrolled(item, session) {
        var self = this;
        //会议Id
        self.seminarId = ko.observable(item.seminarId);
        //---收藏的id获取开始
        self.collectid = ko.observable(item.collectid);
        //----收藏的id获取结束id
        //会议名称
        self.name = ko.observable(item.name);
        //会议开始时间
        self.startTime = ko.observable(item.startTime);
        //会议结束时间
        self.endTime = ko.observable(item.endTime);
        //地址
        self.address = ko.observable(item.address);
        //会议状态
        self.status = ko.observable(item.status);
        //标签
        self.tag = ko.observable(item.tag);
        /**
         * 取消报名会议
         */
        self.cancelEnrolled = function () {
            var collectids = [];
            var id = parseInt(self.collectid());
            collectids.push(id);
            return collectService.cancel(session, collectids).then(function (body) {
                return body;
            }, function (body) {
                return body;
            });
        };
    }

    /**
     * 重写SeminarListViewModel，不知道什么用途，每个model都要有这个方法
     * @param _proto
     */
    EnrolledListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.EnrolledListViewModel = EnrolledListViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(5), __webpack_require__(35), __webpack_require__(3));




/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by qilongjie on 2017/1/6
 */

(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        guest = smarket.api.guest;

    /**
     * 创建实例
     * @param tenantId     租户ID
     * @param seminarId    会议ID
     * @param seminarGuestTypeId    //嘉宾类型，用于多个分组获取嘉宾
     * @constructor
     */
    function GuestListViewModel(tenantId, seminarId, seminarGuestTypeId) {
        var self = this;
        BaseViewModel.apply(self);
        self.tenantId = tenantId;                   //租户ID
        self.seminarId = seminarId;                 //会议ID
        self.seminarGuestTypeId = seminarGuestTypeId;
        self.guestList = ko.observableArray();      //讲师列表
    }

    GuestListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = GuestListViewModel.prototype;
    proto.constructor = GuestListViewModel;
    proto.preGet = function () {
        return true;
    };

    // 加载数据
    proto.load = function () {
        var self = this;
        self.preGet();
        return self.getList(self.tenantId, self.seminarId, self.seminarGuestTypeId);
    };

    //数据绑定
    proto.init = function (content) {
        var self = this;
        if (content.length > 0) {
            for (var key in content) {
                var guest = new Guest(content[key]);
                self.guestList.push(guest);
            }
        }
    };

    /**
     * 获取会议内嘉宾列表
     * @param tenantId      租户ID
     * @param seminarId     会议ID
     * @returns {*}
     */
    proto.getList = function (tenantId, seminarId, seminarGuestTypeId) {
        var self = this,
            defer = $.Deferred();

        guest.getList(tenantId, seminarId).then(function (data) {
            //var result = data.body,
            var result = data,
                content = result.content;
            if (result.result == 0) {

                //是否取特定组嘉宾
                var tempContent = [];
                if (!!!seminarGuestTypeId) {
                    tempContent = Array.prototype.slice.call(content);
                } else {
                    for (var i = 0; i < content.length; i++) {
                        if (content[i].seminarGuestTypeId == seminarGuestTypeId) {
                            tempContent.push(content[i]);
                        }
                    }
                }
                content = tempContent;

                self.init(content);
                defer.resolve(data);
            } else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise();
    };

    /**
     * 获取该租户嘉宾库嘉宾列表
     * @param tenantId      租户ID
     * @returns {*}
     */
    proto.getAll = function (tenantId, seminarId, key, orderType, guestTypeId, start, num) {
        var self = this,
            defer = $.Deferred();

        guest.getAll(tenantId, seminarId, key, orderType, guestTypeId, start, num).then(function (data) {
            //var result = data.body,
            var result = data,
                content = result.content;
            if (result.result == 0) {
                self.init(content);
                defer.resolve(data);
            }
            else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise();
    };

    function Guest(item) {
        var self = this;
        self.seminarGuestId = item.seminarGuestId;                  //线下会嘉宾ID
        self.createTime = ko.observable(item.createTime);           //创建时间
        self.demartment = ko.observable(item.demartment);           //部门
        self.duty = ko.observable(item.duty);                       //职务
        self.email = ko.observable(item.email);                     //邮箱
        self.enterprise = ko.observable(item.enterprise);           //公司
        self.gender = ko.observable(item.gender);                   //性别
        self.global = ko.observable(item.global);                   //是否存嘉宾库中选择。"" 是；"0"
        self.guestId = ko.observable(item.guestId);                 //全局ID（嘉宾库内）
        self.guestTypeId = ko.observable(item.guestTypeId);         //只有从库里选的有
        self.imageMapId = ko.observable(item.imageMapId);           //图片对应ID
        self.intro = ko.observable(item.intro);                     //简介
        self.isPublic = ko.observable(item.isPublic);               //是否公开
        self.moduleType = ko.observable(item.moduleType);           //只有从嘉宾库里选择的有
        self.name = ko.observable(item.name);                       //姓名
        self.phone = ko.observable(item.phone);                     //手机
        self.seminarGuestTypeId = ko.observable(item.seminarGuestTypeId);  //
        self.seminarId = ko.observable(item.seminarId);             //会议ID
        self.tenantId = ko.observable(item.tenantId);               //租户ID
    }

    //GuestListViewModel
    GuestListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.GuestListViewModel = GuestListViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(124), __webpack_require__(3));


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        SeminarDetailViewModel = viewModel.SeminarDetailViewModel,
        seminar = smarket.api.seminar;

    function SeminarGroupListViewModel(tenantId, tagName) {
        var self = this;
        BaseViewModel.apply(self);
        self.tenantId = tenantId;
        self.tagName = tagName;
        self.tagNameInput = ko.observable(tagName);
        //会议列表
        self.tenantSeminars = [];
        self.seminarsByTagName = [];
        self.seminarDateList = ko.observableArray([]);
        self.seminarDate = ko.observable();
        self.seminarList = ko.observableArray();

        self.switchDate = function (date) {
            self.initSeminarGroup(date,self.seminarsByTagName);
        };

        self.switchTagName = function ()
        {
            self.tagName = self.tagNameInput();
            self.init(self.tenantSeminars);
        };
    }

    SeminarGroupListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = SeminarGroupListViewModel.prototype;
    proto.constructor = SeminarGroupListViewModel;

    //加载前模板方法
    proto.preLoad = smarket.noop;
    //加载完成模板方法
    proto.afterLoad = smarket.noop;
    //初始化前模板方法
    proto.preInit = smarket.noop;
    //初始化完成后模板方法
    proto.afterInit = smarket.noop;
    //加载数据
    proto.load = function () {
        var self = this;
        self.preLoad();
        return self.get().then(function (data) {
            var content = data.content.items;
            if (data.result == 0 && content) {
                self.preInit();
                self.init(content);
                self.afterInit(1);
            }
            self.afterLoad(1);
            return data;
        }, function (data) {
            self.afterLoad();
            return data;
        });
    };
    //初始化数据
    proto.init = function (data) {
        var self = this;
        self.seminarDateList([]);
        self.tenantSeminars = data;
        if (data && data.length > 0) {
            var tagName = self.tagName;
            if (tagName) {
                self.seminarsByTagName = self.getSeminarsByTagName(tagName);
            }
            else {
                self.seminarsByTagName = data;
            }
            if (self.seminarsByTagName && self.seminarsByTagName.length>0) {
                //遍历日期
                for (var i = 0; i < self.seminarsByTagName.length; i++) {
                    var date = self.seminarsByTagName[i].startTime;
                    if (self.seminarDateList.indexOf(date) < 0) {
                        self.seminarDateList.push(date);
                    }
                }
                //日期排序
                self.seminarDateList.sort();
                //初始化按日期显示的会议列表
                self.initSeminarGroup(self.seminarDateList()[0], self.seminarsByTagName);
            }


        }
    };
    /**
     * 初始化按日期显示的会议列表
     * @param date  日期
     * @param seminars  会议列表数组
     */
    proto.initSeminarGroup = function (date , seminars) {
        var self = this;
        self.seminarDate(date);
        self.seminarList.removeAll();
        if (seminars && seminars.length > 0) {
            for (var i = 0; i < seminars.length; i++) {
                var seminarDate = seminars[i].startTime;
                if (new Date(seminarDate*1000).Format('yyyy-M-d') == new Date(date*1000).Format('yyyy-M-d')) {
                    var seminarObj = new SeminarDetailViewModel(self.tenantId, seminars[i].seminarId);
                    seminarObj.init(seminars[i]);
                    self.seminarList.push(seminarObj);
                }
            }
        }
    };

    //根据标签提取当前会议列表中的会议
    proto.getSeminarsByTagName = function(tagname) {
        var self = this;
        return $.grep(self.tenantSeminars, function (value) {
            var tagNameList = value.tagName.split(',');
            return tagNameList.indexOf(tagname)>-1 ;
        });
    };

    proto.getDateList = function (data) {

    };

    /**
     * 获取会议列表
     * @param key           会议名称/id
     * @param sceneName     场景名称
     * @param sortName      排序字段
     * @param start         开始索引
     * @param num           数量
     * @param conditions    自定义
     * @param status        会议状态
     * @param needagenda        会议扩展信息，是否需要会议日程
     * @param needguest         会议扩展信息，是否需要嘉宾
     * @param needsubSeminar    会议扩展信息，是否需要分会信息
     * @returns {*}
     */
    proto.get = function (key, sceneName, sortName, start, num, conditions, status, needagenda,needguest,needsubSeminar) {
        var self = this;
        return seminar.frontGetList(self.tenantId, key, sceneName, sortName, start, num, conditions, status, needagenda, needguest, needsubSeminar);
    };

    //重写SeminarListViewModel
    SeminarGroupListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.SeminarGroupListViewModel = SeminarGroupListViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(5),__webpack_require__(3),__webpack_require__(8),__webpack_require__(21));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Siler on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        FieldFactory = viewModel.FieldFactory,
        Field = viewModel.Field,
        PhoneField = Field.PhoneField,
        PasswordField = Field.PasswordField,
        contactmanage = smarket.api.contactmanage,
        seminar = smarket.api.seminar,
        isSubmitting = false;

    function SeminarPassportViewModel(options) {
        var self = this;

        BaseViewModel.apply(self);

        //身份认证体系Id
        self.schemaId = ko.observable(options['schemaId']);
        //实例Id
        self.instanceId = ko.observable(options['instanceId']);
        //注册表单Id
        self.memberFormId = ko.observable(options['memberFormId']);
        //追踪代码Id
        self.trackId = ko.observable(options['trackId']);
        //自定义表单Id
        self.customFormId = ko.observable(options['customFormId']);
        //自定义表单追踪Id
        self.linkId = ko.observable(options['linkId']);
        //会议Id
        self.seminarId = ko.observable(options['seminarId']);
        //认证代码(用于注册绑定openId)
        self.authCode = ko.observable(options['authCode']);
        //标题
        self.title = ko.observable();
        //表单字段
        self.fields = ko.observableArray();
        //创建时间
        self.createTime = ko.observable();
        //表单状态
        self.status = ko.observable();
        //字段命名空间
        self.field = Field;
    }

    SeminarPassportViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = SeminarPassportViewModel.prototype;
    proto.constructor = SeminarPassportViewModel;

    proto.init = function (formInfo) {
        var self = this;

        self.title(formInfo.title);
        self.status(formInfo.status);
        self.createTime(formInfo.createTime);

        for (var i = 0; i < formInfo["items"].length; i++) {
            var field = FieldFactory.create(formInfo["items"][i]['type'], formInfo["items"][i]['fieldId']);
            field.init({
                field: smarket.extend(true, {isDisplay: true}, formInfo["items"][i]),
                formId: self.memberFormId(),
                value: formInfo["items"][i]['value']
            });
            self.initField(field);
            field.initValidation();
            self.fields.push(field);
        }
        self.afterLoadHandler();
    };
    //加载表单
    proto.load = function () {
        var self = this;

        self.beforeLoadHandler();

        return contactmanage.get(self.memberFormId(), self.trackId()).then(function (data) {
            self.init(data.content);
            return data;
        }, function (data) {
            return data;
        });
    };
    //提交注册且报名
    proto.signUp = function () {
        var self = this, fields = self.fields(), isValid = true, answers = [], verificationCode = '',
            submitData = {
                "memberFormId": self.memberFormId(),
                "track": self.trackId(),
                "customFormId": self.customFormId(),
                "linkId": self.linkId(),
                "seminarId": self.seminarId(),
                "instanceId": self.instanceId(),
                "url": window.location.href,
                "referenceUrl": (self.inWeChat() ? "微信" : (document.referrer || window.location.href))
            };

        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        //获取表单数据
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                answers.push(fields[i].answer());

                if (fields[i] instanceof PhoneField) {
                    submitData['verificationCode'] = fields[i].answer()['checkCode'];
                }
            }
        }

        submitData["items"] = answers;

        if (isValid) {
            self.beforeSignUpHandler(submitData);

            return seminar.signUpAndRegister(submitData).then(function (data) {
                var contact = smarket.cookie.smarketMember(self.schemaId());

                smarket.cookie.smarketMember(self.schemaId(), smarket.extend(contact, data['content']));
                self.afterSignUpHandler(data);
                isSubmitting = false;
            }, function (data) {
                self.afterSignUpHandler(data);
                isSubmitting = false;
            });
        } else {
            self.validationErrorHandler();
            isSubmitting = false;
        }
    };
    //更新个人信息
    proto.update = function () {
        var self = this, fields = self.fields(), isValid = true, answers = [],
            contactInfo = smarket.cookie.smarketMember(self.schemaId()),
            submitData = {
                items: answers,
                instanceId: self.instanceId(),
                seminarId: self.seminarId()
            };

        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                answers.push(fields[i].answer());
            }
        }

        if (contactInfo && contactInfo['session']) {
            submitData['sess'] = contactInfo['session'];
        }

        submitData['items'] = answers;

        if (isValid) {
            self.beforeUpdateHandler(submitData);

            return seminar.update(submitData).then(function (data) {
                self.afterUpdateHandler(data);
                isSubmitting = false;
            }, function (data) {
                self.afterUpdateHandler(data);
                isSubmitting = false;
            });
        } else {
            self.validationErrorHandler();
            isSubmitting = false;
        }
    };
    //普通登录
    proto.signIn = function () {
        var self = this, fields = self.fields(), isValid = true,
            submitData = {
                clientType: '1',
                clientBrand: '1',
                clientVersion: '1',
                memberSchemaId: self.schemaId(),
                url: window.location.href,
                authCode: self.authCode(),
                referenceUrl: (self.inWeChat() ? "微信" : (document.referrer || window.location.href))
            };

        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        //获取表单数据
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                if (fields[i] instanceof PhoneField) {
                    submitData['unique'] = fields[i].answer()['text'];
                }

                if (fields[i] instanceof PasswordField) {
                    submitData['password'] = fields[i].answer()['text'];
                }
            }
        }

        if (isValid) {
            self.beforeSignInHandler(submitData);

            return contactmanage.signIn(submitData).then(function (data) {
                self.afterSignInHandler(data);
                isSubmitting = false;
            }, function (data) {
                self.afterSignInHandler(data);
                isSubmitting = false;
            });
        } else {
            self.validationErrorHandler();
            isSubmitting = false;
        }
    };
    //手机验证码动态登录
    proto.signInDynamic = function () {
        var self = this, fields = self.fields(), isValid = true, unique, checkCode,
            postData = {
                memberSchemaId: self.schemaId()
            };

        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        //获取表单数据
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                if (fields[i] instanceof PhoneField) {
                    postData['unique'] = fields[i].answer()['text'];
                    postData['checkCode'] = fields[i].answer()['checkCode'];
                }
            }
        }

        if (isValid) {
            self.beforeSignInHandler(postData);

            return contactmanage.signInDynamic(postData).then(function (data) {
                self.afterSignInHandler(data);
                isSubmitting = false;
            }, function (data) {
                self.afterSignInHandler(data);
                isSubmitting = false;
            });
        } else {
            self.validationErrorHandler();
            isSubmitting = false;
        }
    };
    //重写SeminarPassportViewModel
    SeminarPassportViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    SeminarPassportViewModel.extend({
        beforeLoadHandler: smarket.noop,
        afterLoadHandler: smarket.noop,
        beforeSignUpHandler: smarket.noop,
        afterSignUpHandler: smarket.noop,
        beforeSignInHandler: smarket.noop,
        afterSignInHandler: smarket.noop,
        beforeUpdateHandler: smarket.noop,
        afterUpdateHandler: smarket.noop,
        validationErrorHandler: smarket.noop,
        initField: smarket.noop
    });

    viewModel.SeminarPassportViewModel = SeminarPassportViewModel;
})(
    __webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(11),
    __webpack_require__(10),
    __webpack_require__(5),
    __webpack_require__(35)
);

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        FieldFactory = viewModel.FieldFactory,
        Field = viewModel.Field,
        contactmanage = smarket.api.contactmanage,
        customForm = smarket.api.customform,
        seminar = smarket.api.seminar;

    function SeminarProfileViewModel(customFormId, seminarId) {
        var self = this;

        BaseViewModel.apply(self);

        //自定义表单Id
        self.formId = customFormId;
        self.seminarId = seminarId;
        //追踪渠道
        self.linkId = null;
        //前台用户session
        self.session = null;
        //DE用的追踪渠道
        self.tc = null;
        //报名分会场Id
        self.subSeminarIds = [];
        //租户Id
        self.tenantId = null;
        //模块Id
        self.moduleId = null;
        //实例Id
        self.instanceId = null;
        //会中联系人Id
        self.contactId = null;
        //参会人员分类
        self.contactCategory = null;
        //注册表单Id
        self.memberFormId = null;
        //身份认证体系渠道Id
        self.trackId = null;
        //标题
        self.title = ko.observable("");
        //表单字段
        self.fields = ko.observableArray([]);
        //字段命名空间
        self.field = Field;
        //身份Id
        self.memberId = null;
        //cookieId
        self.globalUserId = null;

        self.formInfo = null;

        self.contactInfo = null;

        self.fieldMappings = null;

        self.validator = null;
        self.memberInfo = null;
    }

    SeminarProfileViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = SeminarProfileViewModel.prototype;
    proto.constructor = SeminarProfileViewModel;
    viewModel.SeminarProfileViewModel = SeminarProfileViewModel;

    SeminarProfileViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    /**
     * 初始化报名表单信息，如果会中联系人信息已加载，进行信息回绑
     * @param formInfo
     * @param fieldMappings
     */
    proto.initForm = function (formInfo, fieldMappings) {
        var self = this,
            fieldInfos = formInfo["items"],
            fieldInfo = null;
        self.formInfo = formInfo,
            self.fieldMappings = fieldMappings,
            self.instanceId = formInfo.instanceId,
            self.title(formInfo.title);
        if (self.contactInfo) {
            bindFormAndContact(formInfo, self.contactInfo);

            $.each(formInfo['items'], function (fi, form) {
                $.each(self.contactInfo, function (ci, item) {
                    if (form['fieldId'] == item['fieldId']) {
                        form['value'] = ("text" in item) ? item.text : item.values;
                    }
                });
            });
        }

        for (var i = 0; i < fieldInfos.length; i++) {
            fieldInfo = fieldInfos[i];
            var field = FieldFactory.create(fieldInfo.type, fieldInfo.fieldId);
            field.init({
                field: formInfo["items"][i],
                formId: self.memberFormId,
                value: formInfo["items"][i]['value']
            });
            self.initField(field);
            if (typeof self.validator === 'function') {
                self.validator(field);
            }
            field.initValidation();
            self.fields.push(field);
        }
        if(!!!self.contactInfo && self.memberInfo){

            bindFormByMember.call(self,self.memberInfo,formInfo);
        }
    };

    function bindFormAndContact(formInfo, contactInfo) {
        smarket.each(contactInfo, function (idx, field) {
            var mapped = false;
            smarket.each(formInfo.items, function (idx, info) {
                if (info.key == field.key) {
                    mapped = true;
                    field.fieldId = info.fieldId;
                    if ("options" in info) {
                        var values = field.values, options = [];
                        smarket.each(info.options, function (idx, option) {
                            if ($.inArray(option.option, values) > -1) {
                                options.push(option.optionId);
                            }
                        });
                        field.text = {
                            options: options
                        };
                    } else {
                        field.text = {
                            text: field.text
                        };
                    }
                    return false;
                }
            });
            if (!mapped) {
                field.fieldId = "";
            }
        });
    }

    /**
     * 初始化会中联系人信息，如果表单已加载，进行信息回绑
     * @param contactInfo
     */
    proto.initContact = function (contactInfo) {
        var self = this, formInfo = self.formInfo, values = null, options = null, optionText = null, itemTextOptions;
        self.contactInfo = $.extend(true, {}, contactInfo);
        if (formInfo) {
            bindFormAndContact(formInfo, self.contactInfo);
            $.each(self.fields(), function (fi, field) {
                $.each(self.contactInfo, function (ci, item) {
                    if (field.fieldId() == item.fieldId) {
                        values = item.values;
                        if (values && $.isArray(values)) {
                            item.text = {
                                options: []
                            },
                                options = field.options();
                            itemTextOptions = item.text.options;
                            $.each(values, function (idx, val) {
                                $.each(options, function (idx, option) {
                                    optionText = option.text();
                                    if (optionText && val && optionText === val) {
                                        itemTextOptions.push(option.optionId());
                                    }
                                });
                            });
                        }
                        field.value(("text" in item.text) ? item.text.text : item.text.options);
                    }
                });
            });
        }
        self.fields(self.fields());
    };

    /**
     * 加载报名表单信息
     */
    proto.loadForm = function () {
        var self = this;

        self.beforeLoadFormHandler();

        return $.when(customForm.get(self.formId), seminar.getFieldList(self.tenantId, "contact")).then(function (contantData, fieldData) {
            self.initForm(contantData.content, fieldData.content);
            self.afterLoadFormHandler(contantData);
            return contantData;
        }, function () {
            var data = {
                result: -1,
                desc: "获取报名表单信息失败"
            };
            self.afterLoadFormHandler(data);
            return data;
        });
    };
    /**
     * 加载会中联系人信息
     * @param unique    报名唯一字段
     */
    proto.loadContact = function (unique) {
        var self = this;
        self.beforeLoadContactHandler();

        return seminar.getCommonContactInfo(self.seminarId, unique).then(function (data) {
            self.afterLoadContactHandler(data);
            self.initContact(data.content);
            self.afterInitContactHandler(data);

            return data;
        }, function (data) {
            self.afterLoadContactHandler(data);
            return data;
        });
    };

    /**
     * 通过qrCode获取会中联系人信息
     * @param qrCode
     * @param session
     */
    proto.loadContactByQrCode = function (qrCode, session) {
        var self = this,
            request = {
                seminarId: self.seminarId,
                qrCode: qrCode,
                sess: session
            };
        self.beforeLoadContactByQrCodeHandler(request);
        return seminar.getContactInfoByQrCode(self.seminarId, qrCode, session).then(function (data) {
            self.initContact(data.content);
            self.afterLoadContactByQrCodeHandler(data);
            return data;
        }, function (data) {
            self.afterLoadContactByQrCodeHandler(data);
            return data;
        });
    };
    function bindFormByMember(memberInfo,formInfo){
        var self = this;
        smarket.each(memberInfo, function (idx, info) {
            var mapped = false;
            smarket.each(self.fieldMappings, function (idx, field) {
                if (field.mapId == info.fieldId) {
                    var name = field.name;
                    smarket.each(formInfo.items, function (idx, form) {
                        if (form.key == name) {
                            info.fieldId = form.fieldId;
                            info.mappingMe = true;
                            return false;
                        }
                    });
                    mapped = true;
                    return false;
                }
            });
            if (!mapped) {
                info.fieldId = '';
            }
        });
        smarket.each(self.fields(), function (idx, field) {
            smarket.each(memberInfo, function (idx, info) {
                if (field.fieldId() == info.fieldId && info.mappingMe) {
                    var vals = ("text" in info) ? info.text : info.values;
                    if($.isArray(vals) && vals.length > 0){
                        var arr = [];
                        $.each(field.options(),function(i,option){
                            $.each(vals,function(j,val){
                                if(option.text == val){
                                    arr.push(option.optionId());
                                }
                            });
                        });
                        if(arr && arr.length > 0){

                            field.value(arr);
                        }
                    }else{
                        if(vals && $.trim(vals)){
                            field.value(vals);
                        }

                    }
                    return false;
                }
            });
        });
    }
    /**
     * 根据session加载身份认证信息,如果报名表单已加载，进行信息回绑
     */
    proto.loadMember = function () {
        var self = this, formInfo = self.formInfo;
        self.beforeLoadMemberHandler();

        return contactmanage.getMember(self.session).then(function (data) {
            var memberInfo  = self.memberInfo =  data.content;
            if (formInfo) {
                bindFormByMember.call(self,memberInfo,formInfo);
            }
            self.afterLoadMemberHandler(data);
            return data;
        }, function (data) {
            self.afterLoadMemberHandler(data);
            return data;
        });
    };
    /**
     * 报名
     */
    proto.signUp = function () {
        var self = this, fields = self.fields(), isValid = true, answers = [], defer = $.Deferred(), mapped = false,
            answer = null,
            submitData = {
                session: self.session,
                customFormId: self.formId,
                seminarId: self.seminarId,
                linkId: self.linkId,
                channel: self.tc,
                instanceId: self.instanceId
            };

        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                answer = fields[i].answer(),
                    mapped = false,
                    smarket.each(self.fieldMappings, function (idx, fieldMapping) {
                        if (fieldMapping.name == answer.key) {
                            answer.fieldId = fieldMapping.mapId;
                            mapped = true;
                            return false;
                        }
                    });
                if (!mapped) {
                    answer.fieldId = "";
                }
                answers.push(answer);
            }
        }

        submitData['items'] = answers;

        if (isValid && self.beforeSignUpHandler(submitData)) {
            seminar.register(submitData).then(function (data) {
                submitCustomForm.call(self, submitData).always(function () {
                    self.afterSignUpHandler(data);
                    defer.resolve(data);
                });
            }, function (data) {
                self.afterSignUpHandler(data);
                defer.reject(data);
            });
        } else {
            defer.reject({
                result: 1,
                desc: isValid ? "取消发送" : '验证错误'
            });
            if (!isValid) {
                self.validationErrorHandler();
            }
        }
        return defer.promise();
    };

    function submitCustomForm(request) {
        var self = this;
        request.memberId = self.memberId,
            request.globalUserId = self.globalUserId,
            request.referenceUrl = document.referrer;
        return customForm.submit(request);
    }

    /**
     * 修改报名信息
     */
    proto.update = function () {
        var self = this, fields = self.fields(), isValid = true, answers = [], defer = $.Deferred(),
            answer = null, mapped = false,
            submitData = {
                tenantId: self.tenantId,
                seminarId: self.seminarId,
                contactId: self.contactId,
                subSeminars: self.subSeminarIds,
                category: self.contactCategory,
                sess: self.session
            };


        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                answer = fields[i].answer(),
                    mapped = false,
                    smarket.each(self.fieldMappings, function (idx, fieldMapping) {
                        if (fieldMapping.name == answer.key) {
                            answer.fieldId = fieldMapping.mapId;
                            mapped = true;
                            return false;
                        }
                    });
                if (!mapped) {
                    answer.fieldId = "";
                }
                answers.push(answer);
            }
        }

        submitData['items'] = answers;

        if (isValid && self.beforeUpdateHandler(submitData)) {
            seminar.updateSef(submitData).then(function (data) {
                self.afterUpdateHandler(data);
                defer.resolve(data);
            }, function (data) {
                self.afterUpdateHandler(data);
                defer.reject(data);
            });
        } else {
            defer.reject({
                result: 1,
                desc: isValid ? "取消发送" : '验证错误'
            });
            if (!isValid) {
                self.validationErrorHandler();
            }
        }
        return defer.promise();
    };
    /**
     * 注册加报名
     */
    proto.registerAndSignUp = function () {
        var self = this, fields = self.fields(), isValid = true, answers = [], defer = $.Deferred(),
            submitData = {
                "memberFormId": self.memberFormId,
                "track": self.trackId,
                "customFormId": self.formId,
                "linkId": self.linkId,
                "seminarId": self.seminarId,
                "instanceId": self.instanceId,
                "url": window.location.href,
                "referenceUrl": (self.inWeChat() ? "微信" : (document.referrer || window.location.href))
            };

        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                answers.push(fields[i].answer());
            }
        }

        submitData["items"] = answers;

        if (isValid && self.beforeRegisterAndSignUpHandler(submitData)) {
            seminar.signUpAndRegister(submitData).then(function (data) {
                self.afterRegisterAndSignUpHandler(data);
                defer.resolve(data);
            }, function (data) {
                self.afterRegisterAndSignUpHandler(data);
                defer.reject(data);
            });
        } else {
            defer.reject({
                result: 1,
                desc: isValid ? "取消发送" : '验证错误'
            });
            if (!isValid) {
                self.validationErrorHandler();
            }
        }
        return defer.promise();
    };
    /**
     * 注册
     */
    proto.register = function () {
        var self = this, fields = self.fields(), isValid = true, answers = [], defer = $.Deferred(),
            answer = null, mapped = false,
            submitData = {
                "memberFormId": self.memberFormId,
                "track": self.trackId,
                "url": window.location.href,
                "referenceUrl": (self.inWeChat() ? "微信" : (document.referrer || window.location.href)),
                "createTime": parseInt(new Date().getTime() / 1000)
            };

        for (var i = 0; i < fields.length; i++) {
            if (fields[i].errors().length > 0) {
                isValid = false;
                fields[i].errors.showAllMessages();
            } else {
                answer = fields[i].answer(),
                    mapped = false,
                    smarket.each(self.fieldMappings, function (idx, fieldMapping) {
                        if (fieldMapping.name == answer.key) {
                            answer.fieldId = fieldMapping.mapId;
                            mapped = true;
                            return false;
                        }
                    });
                if (!mapped) {
                    answer.fieldId = "";
                }
                answers.push(answer);
            }
        }

        submitData["items"] = answers;

        if (isValid && self.beforeRegisterHandler(submitData)) {
            contactmanage.register(submitData).then(function (data) {
                self.afterRegisterHandler(data);
                defer.resolve(data);
            }, function (data) {
                self.afterRegisterHandler(data);
                defer.reject(data);
            });
        } else {
            defer.reject({
                result: 1,
                desc: isValid ? "取消发送" : '验证错误'
            });
            if (!isValid) {
                self.validationErrorHandler();
            }
        }
        return defer.promise();
    };

    proto.registerThenSignUp = function () {
        var self = this, registerData = null, signUpData = null;
        return self.register().then(function (data) {
            registerData = data;
            return self.signUp();
        }, function (data) {
            registerData = data;
        }).then(function (data) {
            signUpData = data;
            return {
                registerData: registerData,
                signUpData: signUpData
            };
        }, function (data) {
            return {
                registerData: registerData,
                signUpData: data
            };
        });
    };

    SeminarProfileViewModel.extend({
        beforeLoadFormHandler: smarket.noop,
        afterLoadFormHandler: smarket.noop,
        beforeLoadContactHandler: smarket.noop,
        afterLoadContactHandler: smarket.noop,
        beforeLoadMemberHandler: smarket.noop,
        afterLoadMemberHandler: smarket.noop,
        afterInitContactHandler:smarket.noop,
        beforeSignUpHandler: function () {
            return true;
        },
        afterSignUpHandler: smarket.noop,
        beforeRegisterAndSignUpHandler: function () {
            return true;
        },
        afterRegisterAndSignUpHandler: smarket.noop,
        beforeRegisterHandler: function () {
            return true;
        },
        afterRegisterHandler: smarket.noop,

        beforeUpdateHandler: function () {
            return true;
        },
        afterUpdateHandler: smarket.noop,
        initField: smarket.noop,
        beforeLoadContactByQrCodeHandler: smarket.noop,
        afterLoadContactByQrCodeHandler: smarket.noop,
        validationErrorHandler: smarket.noop
    });
})(__webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(11),
    __webpack_require__(10),
    __webpack_require__(5),
    __webpack_require__(26));

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        seminar = smarket.api.seminar;

    function SeminarListViewModel(tenantId) {
        var self = this;
        BaseViewModel.apply(self);
        self.tenantId = tenantId;

        //会议列表
        self.seminarlist = ko.observableArray();
    }

    SeminarListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = SeminarListViewModel.prototype;
    proto.constructor = SeminarListViewModel;

    //加载前模板方法
    proto.preLoad = smarket.noop;
    //加载完成模板方法
    proto.afterLoad = smarket.noop;
    //初始化前模板方法
    proto.preInit = smarket.noop;
    //初始化完成后模板方法
    proto.afterInit = smarket.noop;
    //加载数据
    proto.load = function () {
        var self = this;
        self.preLoad();
        return self.get().then(function (data) {
            var content = data.content.items;
            if (data.result == 0 && content) {
                self.preInit();
                self.init(content);
                self.afterInit(1);
            }
            self.afterLoad(1);
        }, function () {
            self.afterLoad();
        });
    };
    //初始化数据
    proto.init = function (data) {
        var self = this;
        self.seminarlist(data);
    };

    //根据标签提取当前会议列表中的会议
    proto.getByTagName = function(tagname) {
        var self = this;
        return $.grep(self.seminarlist(), function (value) {
            return value.tagName = tagname;
        });
    };

    proto.getDateList = function (data) {

    };

    /**
     * 获取会议列表
     * @param key           会议名称/id
     * @param sceneName     场景名称
     * @param sortName      排序字段
     * @param start         开始索引
     * @param num           数量
     * @param conditions    自定义
     * @param status        会议状态
     * @returns {*}
     */
    proto.get = function (key, sceneName, sortName, start, num, conditions, status) {
        var self = this;
        return seminar.frontGetList(self.tenantId, key, sceneName, sortName, start, num, conditions, status);
    };

    //重写SeminarListViewModel
    SeminarListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.SeminarListViewModel = SeminarListViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(5),__webpack_require__(3),__webpack_require__(8),__webpack_require__(21));


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        seminar = smarket.api.seminar,
        wx = smarket.wx;

    function SignViewModel(schemaId, bigScreenId, formId, weChatId) {
        var self = this;
        BaseViewModel.apply(self);
        self.bigScreenId = bigScreenId;
        self.schemaId = schemaId;
        self.formId = formId;
        self.weChatId = weChatId;
        //大屏信息
        self.info = ko.observable();
        //会议名称
        self.eventName = ko.observable();
        //会议开始日期
        self.startDate = ko.observable();
        //会议开始时间
        self.startTime = ko.observable();
        //会议地址
        self.address = ko.observable();
        //微信签到是否开启
        self.checkinByWeChat = ko.observable();
        //是否启用身份认证
        self.isOpenMember = ko.observable();
        //wap登录页面地址
        self.loginWapUrl = ko.observable();
        //是否开启现场报名
        self.regOnSite = ko.observable();
        // 会议id
        self.seminarId = ko.observable();
        //用户身份标识
        self.contactId = 0;
        //微信id
        self.openId = '';
        //昵称
        self.nickName = '';
        //头像
        self.headImgUrl = '';
        //用户session
        self.sess = '';
        self.submitSignSum = 0;
    }

    SignViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = SignViewModel.prototype;
    proto.constructor = SignViewModel;

    //加载前模板方法
    proto.preLoad = smarket.noop;
    //加载完成模板方法
    proto.afterLoad = smarket.noop;
    //初始化前模板方法
    proto.preInit = smarket.noop;
    //初始化完成后模板方法
    proto.afterInit = smarket.noop;

    //加载数据
    proto.load = function () {
        var self = this;
        self.preLoad();
        if (self.weChatId) {
            self.getOpenId();
        }
        return self.getWapCheckInfo().then(function (data) {
            var content =data.content;
            if (data.result == 0 && content) {
                self.preInit();
                self.init(content);
                self.afterInit(1);

            }
            self.afterLoad(1);

        }, function () {
            self.afterLoad();
        });
    };
    //数据绑定
    proto.init = function (data) {
        var self = this;
        self.info(data);
        if (data.seminarInfo) {
            self.eventName(data.seminarInfo.name);
            self.startDate(data.seminarInfo.startTime ? new Date(data.seminarInfo.startTime * 1000).Format('yyyy-MM-dd') : "");
            self.startTime(data.seminarInfo.startTime ? new Date(data.seminarInfo.startTime * 1000).Format('hh:mm') : "");
            self.address(data.seminarInfo.address);
        }
        self.checkinByWeChat(data.checkinByWeChat);
        self.isOpenMember(data.isOpenMember);
        self.loginWapUrl(data.loginWapUrl);
        self.regOnSite(data.regOnSite);
        self.seminarId(data.seminarId);
    };

    /**
     * wap端获取大屏信息
     * @returns {*}
     */
    proto.getWapCheckInfo = function () {
        var self = this;
        return seminar.getWapCheckInfo(self.bigScreenId, "", self.contactId);
    };

    //提交前模板方法
    proto.preSubmit = function () {
        return true;
    };
    //提交完成模板方法
    proto.afterSubmit = smarket.noop;
    /**
     * 签到上墙
     * @returns {*}
     */
    proto.submitSign = function () {
        var self = this;
        self.preSubmit();
        if (self.openId || self.contactId) {
            return seminar.checkInForWall(self.openId, self.nickName, self.headImgUrl, self.bigScreenId, self.contactId, self.sess).then(function (data) {
                if (data.result == 0) {
                    self.afterSubmit(1);
                }
                else {
                    console.info(data);
                    self.afterSubmit();
                }
            }, function (error) {
                console.warn(error);
                self.afterSubmit();
            });
        }
        else {
            console.info("没有Openid或contactId");
            return false;
        }
    };

    //重写SignViewModel
    SignViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.SignViewModel = SignViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(5),__webpack_require__(3),__webpack_require__(8));


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        signbigscreen = smarket.api.signbigscreen;

    /**
     * 签到大屏ViewModel
     * @param seminarId 会议id
     * @param screenId  大屏id
     * @param groupId   分组id
     * @param signingPointId    签到点id
     * @constructor
     */
    function SignBigScreenViewModel(seminarId, screenId, groupId, signingPointId) {
        var self = this;
        BaseViewModel.apply(self);
        self.screenId = screenId;
        self.seminarId = seminarId;
        self.groupId = groupId;
        self.signingPointId = signingPointId;
        self.status = ko.observable(false);//大屏开启状态
        self.name = ko.observable();//大屏名称
        self.scale = ko.observable();//大屏比例（宽屏|窄屏）
        self.signingPoint = ko.observable();//签到点名称
        self.checkInByWeChat = ko.observable();//是否启用微信签到
        self.checkInStatus = ko.observable(false);//是否开始签到
        self.onTheWallField = ko.observable();//上墙字段（报名信息|微信信息）
        self.regOnSite = ko.observable(false);//是否启用现场报名
        self.regFormId = ko.observable();//报名表单id
        self.regFormName = ko.observable();//表单名称
        self.interval = ko.observable("3秒");//轮播间隔
        self.loop = ko.observable(false);//是否循环播放
        self.isControl = ko.observable(false);//是否是控制台
        self.url = ko.observable(window.location.href);//跳转地址
        self.sess = ko.observable();//会话
        self.bigScreenList = ko.observable();//大屏列表
        self.signList = ko.observable();//大屏签到墙信息
        self.signNum = ko.observable();//签到人数
        self.seminarName = ko.observable();//会议名称
        self.qrCodeUrl = ko.observable('');//微信扫码签到二维码
        self.onWall = ko.observableArray();//签到上墙数组
        self.sess = ko.observable();//会话
    }

    SignBigScreenViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = SignBigScreenViewModel.prototype;
    proto.constructor = SignBigScreenViewModel;

    //前置空方法
    proto.preGet = function () {
        return true;
    };
    //后置空方法
    proto.afterLoad = function () {
        return true;
    };
    //加载数据
    proto.load = function () {
        var self = this;
        self.preGet();
        self.get().then(function (data) {
            return self.afterLoad(1);
        },function () {
            return self.afterLoad();
        });
    };
    //大屏信息绑定
    proto.init = function (data) {
        var self = this;
        self.name(data.name);
        self.scale(data.scale);
        self.status(data.status);
        self.signingPoint(data.signingPoint);
        self.checkInByWeChat(data.checkInByWeChat);
        self.onTheWallField(data.onTheWallField);
        self.checkInStatus(data.checkInStatus);
        self.regOnSite(data.regOnSite);
        self.regFormId(data.regFormId);
        self.regFormName(data.regFormName);
        self.interval(data.interval);
        self.loop(data.loop);
        self.isControl(data.isControl);
        self.url(data.url);
    };

    //获取大屏信息
    proto.get = function () {
        var self = this,
            defer = $.Deferred();
        signbigscreen.get(self.screenId).then(function (data) {
            var result = data,
                content = result.content;
            if (result.result == 0) {
                self.init(content);
                defer.resolve(data);
            }
            else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });

        return defer.promise();
    };

    //大屏组的信息绑定
    proto.getListByGroupInit = function (data) {
        var self = this;
        self.bigScreenList(data);
        // 以下代码有疑问，暂时注释
        // for (var i = 0; i < data.length; i++) {//找到正在透屏的ID
        //     if (data[i].status == "on") {
        //         self.currentOnBigScreenId(data[i].id);
        //         self.currentOnBigScreenName(data[i].name);
        //     }
        // }
    };

    //根据分组获取大屏组的信息
    proto.getListByGroup = function () {
        var self = this,
        defer = $.Deferred();
        signbigscreen.getListByGroup(self.seminarId,self.groupId).then(function (data) {
            var result = data,
                content = result.content;
            if (result.result == 0) {
                self.getListByGroupInit(content);
                defer.resolve(data);
            }
            else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });

        return defer.promise();
    };

    //大屏签到墙信息绑定
    proto.checkInDataInit = function (list) {
        var self = this;
        self.signList(list);
        self.signNum(list.length);
    };

    //获取大屏签到墙信息
    proto.getCheckInData = function () {
        var self = this,
            defer = $.Deferred();
        signbigscreen.getCheckInData(self.screenId, self.signingPointId).then(function (data) {
            var result = data,
                content = result.content;
            if (result.result == 0) {
                self.checkInDataInit(content);
                defer.resolve(data);
            }
            else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });

        return defer.promise();
    };

    //获取大屏签到墙信息
    proto.updateCheckIn = function () {
        var self = this,
            bigScreenInfo = {
                id: self.screenId,
                status: self.status(),
                name: self.name(),
                scale: self.scale(),
                groupId: self.groupId,
                signingPointId: self.signingPointId,
                signingPoint: self.signingPoint(),
                checkInByWeChat: self.checkInByWeChat(),
                checkInStatus: self.checkInStatus(),
                seminarId: self.seminarId,
                onTheWallField: self.onTheWallField(),
                regOnSite: self.regOnSite(),
                regFormId: self.regFormId(),
                regFormName: self.regFormName(),
                interval: self.interval(),
                loop: self.loop(),
                isControl: self.isControl(),
                url: self.url(),
                sess: self.sess()
            };
        return signbigscreen.updateCheckIn(bigScreenInfo);
    };

    //监听签到信息推送
    proto.listenCheckIn = function () {

    };

    //重写SignBigScreenViewModel
    SignBigScreenViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.SignBigScreenViewModel = SignBigScreenViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(127),__webpack_require__(3));


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        sign = smarket.api.sign;

    function SignManagerViewModel(seminarId, bigScreenId, groupId) {
        var self = this;
        BaseViewModel.apply(self);
        self.bigScreenId = bigScreenId;
        self.seminarId = seminarId;
        self.groupId = groupId;
        self.isFullScreen = ko.observable("off");
        self.onTheWallField = ko.observable();
        self.times = ko.observable(1);//首次加载
        self.time = ko.observable((new Date()).getTime());
        self.checkInStatus = ko.observable(false);//手机端上墙
        self.status = ko.observable(false);
        self.loop = ko.observable(false);
        self.interval = ko.observable("3秒");
        self.checkInByWeChat = ko.observable();
        self.bigScreenList = ko.observable();
        self.signList = ko.observable();
        self.signNum = ko.observable();
        self.isShow = ko.observable(true);//大屏控制台的显示隐藏
        self.signingPointId = ko.observable();
        self.signPlaceNum = ko.observable(26);
        self.tempList = ko.observableArray();
        self.seminarName = ko.observable();
        self.num = ko.observable();
        self.timer2 = null;
        self.isControl = ko.observable(smarket.urlParams['isControl']);
        self.underWall = ko.observableArray();
        self.onWall = ko.observableArray();
        self.url = ko.observable(window.location.href);
        self.isVisible = ko.observable(true);
        self.headUrl = ko.observable($.Configs("sBaseUrl") + '?mappingId=');
        self.currentOnBigScreenId = ko.observable("");
        self.currentOnBigScreenName = ko.observable("");
        self.currentBigScreenName = ko.observable("");
        self.htmlInit = ko.observable();
        self.peapleNum = ko.observable(25);//设置不同样式的上墙的人数默认设置为25
        self.qrCodeUrl = ko.observable('');
        self.isShowList = ko.observable(true);
    }

    SignManagerViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = SignManagerViewModel.prototype;
    proto.constructor = SignManagerViewModel;

    //前置空方法
    proto.preGet = function () {
        return true;
    };
    //加载数据
    proto.load = function () {
        var self = this;
        self.preGet();
        return self.get();
    };
    //数据绑定
    proto.init = function (article) {
        var self = this;
        self.instanceId(article.instanceId);
        self.moduleId(article.moduleId);
        self.pushTime(article.pushTime);
        self.showImages(article.showImages);
        self.templateConfigId(article.templateConfigId);
        self.tenantId(article.tenantId);
        self.typeId(article.typeId);
        self.title(article.title);
        self.content(article.content);
        self.coverImageMappingId(article.coverImageMappingId);
        self.coverImageUrl(article.coverImageUrl);
        self.createTime(article.createTime);
        self.fileIds(article.fileIds);

    };

    //获取大屏信息
    proto.bigScreenGet = function () {
        var self = this,
            defer = $.Deferred();
        sign.bigScreenGet(self.seminarId).then(function (data) {
            var result = data,
                content = result.content;
            if (result.result == 0) {
                self.init(content);
                defer.resolve(data);
            }
            else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise();
    };

    //根据分组获取大屏组的信息
    proto.bigScreenGetListByGroup = function () {
        var self = this,
            defer = $.Deferred();
        sign.bigScreenGetListByGroup(self.groupId, self.seminarId).then(function (data) {
            var result = data,
                content = result.content;
            if (result.result == 0) {
                self.init(content);
                defer.resolve(data);
            }
            else {
                defer.reject(data);
            }
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise();
    };

    //重写SignManagerViewModel
    SignManagerViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.SignManagerViewModel = SignManagerViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(5),__webpack_require__(3));


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        PostViewModel = viewModel.PostViewModel,
        topic = smarket.api.topic;

    function MyPostViewModel(options) {
        var self = this;

        BaseViewModel.apply(self);

        //我的留言列表
        self.posts = ko.observableArray();
        //留言板Id
        self.topicId = ko.observable(options['topicId']);
        //分页起始
        self.start = ko.observable(options['start']);
        //每页数量
        self.num = ko.observable(options['num']);
        //openId
        self.openId = ko.observable(options['openId']);
        //全局用户Id
        self.cookieId = ko.observable(options['cookieId']);
        //前台用户session
        self.session = ko.observable(options['session']);
    }

    MyPostViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = MyPostViewModel.prototype;
    proto.constructor = MyPostViewModel;

    proto.init = function (posts) {
        var self = this;

        $.each(posts, function (i, item) {
            var post = new PostViewModel();

            post.init(item);
            self.posts.push(post);
        });
    };

    proto.load = function () {
        var self = this;

        return topic.getMyPostBigScreen({
            topicId: self.topicId(),
            start: self.start(),
            num: self.num(),
            openId: self.openId(),
            cookieId: self.cookieId(),
            sess: self.session()
        }).then(function (data) {
            self.init(data.content);
            return data;
        }, function (data) {
            return data;
        });
    };

    //重写PostViewModel
    MyPostViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    viewModel.MyPostViewModel = MyPostViewModel;
})(
    __webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(3),
    __webpack_require__(22),
    __webpack_require__(16),
    __webpack_require__(5)
);

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        topic = smarket.api.topic,
        isSubmitting = false;

    function TopicViewModel(options) {
        var self = this;

        BaseViewModel.apply(self);

        //讨论版ID
        self.topicId = ko.observable();
        //1-留言版 2-微讨论 3-评论区
        self.type = ko.observable();
        //标题
        self.title = ko.observable();
        //创建时间
        self.createTime = ko.observable();
        //状态
        self.status = ko.observable();
        //是否开启
        self.isOpen = ko.observable();
        //是否允许删除帖子
        self.enableDelete = ko.observable();
        //是否需要审核
        self.enableCheck = ko.observable();
        //允许点赞
        self.enableLike = ko.observable();
        //允许主帖附加图片
        self.enableAttachment = ko.observable();
        //发帖限制
        self.postIdentity = ko.observable();
        //发帖需登录的表单
        self.postIdentityExtra = ko.observable();
        //回帖限制
        self.replyIdentity = ko.observable();
        //是否可回复
        self.enableReply = ko.observable();
        //模块Id
        self.moduleId = ko.observable();
        //节点Id
        self.nodeId = ko.observable();
        //体系Id
        self.schemaId = ko.observable();
        //实例Id
        self.instanceId = ko.observable();
        //追踪渠道Id
        self.trackId = ko.observable();
    }

    TopicViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = TopicViewModel.prototype;
    proto.constructor = TopicViewModel;

    proto.init = function (topic) {
        var self = this;

        self.topicId(topic.topicId);
        self.type(topic.type);
        self.title(topic.title);
        self.createTime(topic.createTime);
        self.status(topic.status);
        self.isOpen(topic.isOpen);
        self.enableDelete(topic.enableDelete == 1 || topic.enableDelete == 'true');
        self.enableCheck(topic.enableCheck == '1' || topic.enableCheck == 'true');
        self.enableLike(topic.enableLike == '1' || topic.enableLike == 'true');
        self.postIdentity(topic.postIdentity);
        self.schemaId(topic.schemaId);
        self.trackId(topic.trackId);
        self.instanceId(topic.instanceId);
        self.postIdentityExtra(topic.postIdentityExtra);
        self.replyIdentity(topic.replyIdentity);
        self.enableReply(topic.enableReply == '1' || topic.enableReply == 'true');
        self.moduleId(topic.moduleId);
        self.nodeId(topic.nodeId);
        self.schemaId(topic.schemaId);
        self.instanceId(topic.instanceId);
        self.trackId(topic.trackId);
    };

    proto.load = function () {
        var self = this;

        return topic.get([self.topicId()]).then(function (data) {
            self.init(data.content);
            return data;
        }, function (data) {
            return data;
        });
    };
    //创建帖子
    proto.create = function () {
        var self = this, isValid = true,
            contactInfo = smarket.cookie.smarketMember(self.schemaId()),
            submitData = {
                "title": self.title(),
                "type": self.type(),
                "enableDelete": self.enableDelete() ? 1 : 0,
                "enableCheck": self.enableCheck() ? 1 : 0,
                "enableLike": self.enableLike() ? 1 : 0,
                "postIdentity": self.postIdentity(),
                "postIdentityExtra": self.postIdentityExtra(),
                "replyIdentity": self.replyIdentity(),
                "trackId": self.trackId(),
                "instanceId": self.instanceId(),
                "sess": contactInfo['session'],
                "moduleId": self.moduleId(),
                "nodeId": self.nodeId()
            };

        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        if (isValid) {
            self.beforeCreateHandler(submitData);

            return topic.create(submitData).then(function (data) {
                self.afterCreateHandler(data);
                isSubmitting = false;
            }, function (data) {
                self.afterCreateHandler(data);
                isSubmitting = false;
            });
        } else {
            isSubmitting = false;
        }
    };

    //重写TopicViewModel
    TopicViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    TopicViewModel.extend({
        beforeCreateHandler: smarket.noop,
        afterCreateHandler: smarket.noop
    });

    viewModel.TopicViewModel = TopicViewModel;
})(
    __webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(3),
    __webpack_require__(16),
    __webpack_require__(5)
);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        topicbigscreen = smarket.api.topicbigscreen;

    function TopicBigScreenViewModel(options) {
        var self = this;

        BaseViewModel.apply(self);

        //大屏Id
        self.screenId = ko.observable(options['screenId']);
        //会议Id
        self.seminarId = ko.observable();
        //野狗实例
        self.wilddog = wilddog.initializeApp(options['wilddogConfig']);
        //大屏节点
        self.ref = null;
        //留言页面列表
        self.pages = ko.observableArray();
        //留言信息映射列表{"message_110": "xxx"}
        self.messageMap = {};
        //每页显示的记录数
        self.pageSize = ko.observable(options['pageSize']);
        //当前页面页码
        self.pageIndex = ko.observable(0);
        //总页数
        self.pageCount = ko.observable(0);
        //帖子总数
        self.total = ko.observable(-1);

        ko.computed(function () {
            var pageIndex = self.pageIndex(),
                pageCount = self.pageCount();

            if (pageCount > 0 && pageIndex > -1 && pageIndex < pageCount) {
                $.each(self.pages(), function (i, item) {
                    item.isShow(pageIndex == i);
                });
            } else if (pageIndex >= pageCount) {
                self.pageIndex(pageCount - 1 > 0 ? pageCount - 1 : 0);
            }
        }, self);
    }

    TopicBigScreenViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = TopicBigScreenViewModel.prototype;
    proto.constructor = TopicBigScreenViewModel;

    proto.init = function (info) {
        var self = this;

        self.seminarId(info['seminarId']);
        self.pages([]);
        self.pageIndex(0);
        self.pageCount(0);
        self.total(-1);

        self.messageMap = {};
        self.ref = self.wilddog.sync().ref(info['refUrl']);

        self.ref.on('child_added', function (snapshot) {
            var key = snapshot.key(), message;

            //过滤掉重复的消息
            if (!self.messageMap.hasOwnProperty(key)) {
                message = smarket.extend(true, {key: snapshot.key()}, snapshot.val());

                if (key.indexOf('_') > -1) {
                    self.messageAddedHandler(snapshot.key().split('_')[1], message);
                }

                self.addMessage(message);
                self.total(self.total() + 1);
                self.pageCount(self.pages().length);
                self.messageMap[snapshot.key()] = snapshot.val();
            }
        });

        self.ref.on('child_removed', function (snapshot) {
            var key = snapshot.key();

            if (self.messageMap.hasOwnProperty(snapshot.key())) {
                self.removeMessage(snapshot.val(), snapshot.key());
                self.total(self.total() - 1);
                self.pageCount(self.pages().length);
                delete self.messageMap[snapshot.key()];

                if (key.indexOf('_') > -1) {
                    self.messageDeletedHandler(snapshot.key().split('_')[1]);
                }
            }
        });
    };

    proto.load = function () {
        var self = this;

        return topicbigscreen.getScreen(self.screenId(), self.seminarId()).then(function (data) {
            self.init(smarket.extend(true, {
                refUrl: "/de/message/seminar_" + data.content['seminarId'] + "/bigScreen_" + self.screenId()
            }, data.content));
            return data;
        }, function (data) {
            return data;
        });
    };

    proto.addMessage = function (message) {
        var self = this, pages = self.pages(), index = pages.length - 1, messages;

        if (message) {
            if (pages[index] === undefined) {
                messages = ko.observableArray([message]);
                self.pages.push({
                    isShow: ko.observable(false),
                    messages: messages
                });
            } else if (smarket.isArray(pages[index]['messages']())) {
                if (pages[index]['messages']().length < self.pageSize()) {
                    pages[index]['messages'].push(message);
                } else {
                    messages = ko.observableArray([message]);
                    self.pages.push({
                        isShow: ko.observable(false),
                        messages: messages
                    });
                }
            }
        }
    };
    //删除留言
    proto.removeMessage = function (data, key) {
        var self = this, pages = self.pages();

        self.pages([]);

        $.each(pages, function (i, page) {
            $.each(page['messages'](), function (z, message) {
                if (message['key'] != key) {
                    self.addMessage(message, message.key);
                }
            });
        });
    };
    //上一页
    proto.goToPrev = function () {
        var self = this, cur = self.pageIndex();

        if (cur > 0) {
            self.beforeGoPrevHandler();
            self.pageIndex(cur - 1);
            self.afterGoPrevHandler();
        }
    };
    //下一页
    proto.goToNext = function () {
        var self = this, cur = self.pageIndex() + 1;

        if (cur < self.pageCount()) {
            self.beforeGoNextHandler();
            self.pageIndex(cur);
            self.afterGoNextHandler();
        }
    };

    //重写TopicBigScreenViewModel
    TopicBigScreenViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    TopicBigScreenViewModel.extend({
        beforeGoPrevHandler: smarket.noop,
        afterGoPrevHandler: smarket.noop,
        beforeGoNextHandler: smarket.noop,
        afterGoNextHandler: smarket.noop,
        pageChangedHandler: smarket.noop,
        messageAddedHandler: smarket.noop,
        messageDeletedHandler: smarket.noop
    });

    viewModel.TopicBigScreenViewModel = TopicBigScreenViewModel;
})(
    __webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(3),
    __webpack_require__(22),
    __webpack_require__(16),
    __webpack_require__(129),
    __webpack_require__(5)
);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/5.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        MessageFactory = smarket.MessageFactory,
        votebigscreen = smarket.api.votebigscreen;

    /**
     * VoteBigScreenViewModel 创建实例
     * @param bigScreenId     文章id
     * @param pollId
     * @param seminarId
     * @param tenantId
     * @param key
     * @constructor
     */
    function VoteBigScreenViewModel(bigScreenId, pollId, seminarId, tenantId, key) {
        var self = this;

        BaseViewModel.apply(self);

        self.key = key;
        self.pollId = pollId;
        self.tenantId = tenantId;
        self.seminarId = seminarId;
        self.bigScreenId = bigScreenId;
        self.bigScreenUrl = '';
        self.bigScreenWapUrl = '';
        self.configId = '';
        self.groupId = '';
        self.interval = '';
        self.loop = '';
        self.name = '';
        self.scale = '';
        self.status = '';
        self.type = '';
        self.url = '';
        self.wapConfig = '';
        self.wapUrl = '';
        self.bigScreenConfig = {};
        self.message = {};
    }

    VoteBigScreenViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = VoteBigScreenViewModel.prototype;
    proto.constructor = VoteBigScreenViewModel;

    proto.init = function (bigScreenInfo) {
        var self = this;

        self.bigScreenUrl = bigScreenInfo.bigScreenUrl;
        self.bigScreenWapUrl = bigScreenInfo.bigScreenWapUrl;
        self.configId = bigScreenInfo.configId;
        self.groupId = bigScreenInfo.groupId;
        self.interval = bigScreenInfo.interval;
        self.loop = bigScreenInfo.loop;
        self.name = bigScreenInfo.name;
        self.scale = bigScreenInfo.scale;
        self.status = bigScreenInfo.status;
        self.type = bigScreenInfo.type;
        self.url = bigScreenInfo.url;
        self.wapConfig = bigScreenInfo.wapConfig;
        self.wapUrl = bigScreenInfo.wapUrl;
        self.bigScreenConfig = bigScreenInfo.bigScreenConfig;
    };
    proto.load = function () {
        var self = this;
        return votebigscreen.getScreen(self.bigScreenId).then(function (data) {
            if (data.result == 0) {
                self.init(data.content);
            }
            return data;
        }, function (data) {
            return data;
        });
    };
    proto.getPrep = function () {
        var self = this;
        return votebigscreen.getPrep(self.tenantId, self.seminarId, self.bigScreenId, self.pollId).then(function (data) {
            return data;
        }, function (data) {
            return data;
        });
    };
    proto.onMessage = function (callback) {
        var self = this;
        //defer = $.Deferred();
        self.message = MessageFactory.create('wilddog');
        self.message.init(self.key);
        self.message.onMessage(function (data) {
            callback({
                result: 1,
                content: data
            });
        });
    };
    proto.sendMessage = function (data, callback) {
        var self = this;
        //defer = $.Deferred();
        self.message = MessageFactory.create('wilddog');
        self.message.init(self.key);
        self.message.send(data);
    };

    //重写VoteBigScreenViewModel
    VoteBigScreenViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.VoteBigScreenViewModel = VoteBigScreenViewModel;
})(__webpack_require__(0),
    __webpack_require__(2),
    __webpack_require__(1),
    __webpack_require__(3),
    __webpack_require__(130),
    __webpack_require__(78),
    __webpack_require__(33)
);



/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by qilongie on 2017/1/4.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        VoteResultQuestionViewModel = viewModel.VoteResultQuestionViewModel,
        vote = smarket.api.vote;

    //创建投票实体
    function VoteResultViewModel(pollId, tenantId) {
        var self = this;
        self.pollId = pollId;
        self.tenantId = tenantId;
        self.count = ko.observable();
        self.itemId = ko.observable();
        self.options = ko.observableArray();
        self.question = ko.observable();
        BaseViewModel.apply(self);
    }

    VoteResultViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = VoteResultViewModel.prototype;
    proto.constructor = VoteResultViewModel;
    //初始化数据
    proto.init = function (voteInfo) {
        var self = this;
        self.count(voteInfo.count);
        self.itemId(voteInfo.itemId);
        self.question(voteInfo.question);
        if (voteInfo.options instanceof Array) {
            var questions = [];
            for (var i = 0; i < voteInfo.options.length; i++) {
                var question = new VoteResultQuestionViewModel(voteInfo.options[i].optionId);
                question.init(voteInfo.options[i]);
                questions.push(question);
            }
            self.options(questions);
        }
    };

    proto.getResult = function (itemId) {
        var self = this;
        return vote.getResult(itemId).then(function (data) {
            self.init(data.content);
            return data;
        });
    };

    //重写VoteResultViewModel
    VoteResultViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.VoteResultViewModel = VoteResultViewModel;

})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(27), __webpack_require__(3), __webpack_require__(32));


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by qilongie on 2017/1/4.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        vote = smarket.api.vote;

    //创建投票实体
    function VoteTotalViewModel(pollId, tenantId) {
        var self = this;
        self.pollId = pollId;
        self.tenantId = tenantId;
        self.today = ko.observable();
        self.total = ko.observable();
        BaseViewModel.apply(self);
    }

    VoteTotalViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = VoteTotalViewModel.prototype;
    proto.constructor = VoteTotalViewModel;
    //初始化数据
    proto.init = function (voteInfo) {
        var self = this;
        self.today(voteInfo.today);
        self.total(voteInfo.total);
    };


    proto.getTotal = function () {
        var self = this;
        return vote.getTotal(self.tenantId, this.pollId).then(function (data) {
            self.init(data.content);
            return data;
        });
    };
    //重写VoteTotalViewModel
    VoteTotalViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.VoteTotalViewModel = VoteTotalViewModel;

})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(27), __webpack_require__(3));


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/5/11.
 */
__webpack_require__(121);
__webpack_require__(122);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Administrator on 2017/2/12.
 */

;
'use strict';//严格约束
(function (smarket) {
    //如果没有引用smarket 和api 抛出错误
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        edm = api.edm = api.edm || {},//赋到主命名空间
        gateway = edm.gateway = smarket.Config("api.gateway.admintool");//获取用户相关的api请求地址
    /**
     * 发送Email方法
     * @param content 邮件内容
     * @param toEmails
     * @param subject
     * @returns {*}
     * @constructor
     */
    edm.SendEmail = function (content, toEmails, subject, fromEmail, fromName) {
        return api.ajax({
            url: gateway + '/edm/sendEmail',
            type: "post",
            dataType: "json",
            data: {
                content: content,
                toEmails: toEmails,
                subject: subject,
                fromEmail: fromEmail,
                fromName: fromName
            }
        });
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/5/8.
 */

;
'use strict';//严格约束
(function (smarket) {
    //如果没有引用smarket 和api 抛出错误
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        product = api.product = api.product || {},//赋到主命名空间
        gateway = product.gateway = smarket.Config("api.gateway.product");//获取用户相关的api请求地址

    /**
     * 获取产品线分类树
     * @param request
     * {
     *    "productLineId": 产品线Id
     * }
     */
    product.getProductLineCategoryTreeList = function (request) {
        return api.s3g("/productLine/category/getCategoryTreeList", request);
    };
    /**
     * 获取某产品线下具体某个字典值的配置信息
     * @param request
     * {
     *   "productLineId": 产品线ID,
     *   "dicId": 字典Id
     * }
     */
    product.getProductLineCategoryConfig = function (request) {
        return api.s3g("/productLine/category/getConfigInfo", request);
    };
    /**
     * 获取产品线分类详细列表
     * @param request
     * {
     *   "productLineId": 产品线ID,
     *   "dicId": 字典Id
     * }
     */
    product.getProductLineCategoryDetailList = function (request) {
        return api.s3g("/productLine/category/getDetailList", request);
    };
    /**
     * 获取产品分类信息
     * @param request
     * {
     *   "productLineId": 产品线ID,
     *   "dicId": 字典表Id
     * }
     */
    product.getProductLineCategoryList = function (request) {
        return api.s3g("/productLine/category/getList", request);
    };

    /**
     * 按照产品线搜索相关产品分类
     * @param request
     * {
     *   "productLineId": 1
     * }
     */
    product.getProductLine = function (request) {
        return api.s3g("/productLine/get", request);
    };

    /**
     * 获取租户下产品线列表
     * @param request
     * {
     *   "tenantId": "租户Id",
     *   "withDeleted": "是否包含删除数据",
     *   "start": "分页数据下标",
     *   "num": "分页数量"
     * }
     */
    product.getProductLineList = function (request) {
        return api.s3g("/productLine/getList", request);
    };

    /**
     * 跨产品线搜索产品列表
     * @param request
     * {
     *  "tenantId": "租户Id",
     *  "keyword": "搜索关键词",
     *  "start": "分页数据下标",
     *  "num": "分页数量",
     *  "isNew": "是否新产品",
     *  "categoryId": "产品分类Id",
     *   "withSoldOut": "是否包含下架字段"
     *  }
     */
    product.getProductCrossLine = function (request) {
        return api.s3g("/product/crossLine/getList", request);
    };

    /**
     * 获取多个相关产品列表
     * @param request
     *  {
     *      "productIdList": [
     *        "产品编号"
     *      ]
     *  }
     */
    product.getProductCrossLineByIds = function (request) {
        return api.s3g("/product/crossLine/getListByIdList", request);
    };
    /**
     * 获取产品详细信息
     * @param request
     * {
     *   "productId": "产品编号"
     * }
     */
    product.get = function (request) {
        return api.s3g("/product/get", request);
    };
    /**
     * 获取产品线下产品列表
     * @param request
     * {
     *   "tenantId": "租户Id",
     *   "productLineId": "产品线Id",
     *   "keyword": "搜索关键词",
     *   "start": "分页数据下标",
     *   "num": "分页数量",
     *   "isNew": "是否新产品",
     *   "categoryId": "产品分类Id",
     *   "withSoldOut": "是否包含下架字段",
     *   "forProject": "是否为项目定制"
     * }
     */
    product.getList = function (request) {
        return api.s3g("/product/getList", request);
    };
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/5/10.
 */
;
'use strict';
module.exports = (function (smarket, $) {
    if (!smarket) {
        throw new Error("Require the smarket module.");
    }
    var api = smarket.api = {},
        s3gUrl = smarket.Config("api.gateway.general"),
        errors = api.errors = {
            301: '永久重定向',
            400: '服务器不理解请求的语法。',
            401: '无效的身份信息',
            403: '服务器拒绝请求。',
            404: '服务器找不到请求的网页。',
            405: '禁用请求中指定的方法。 ',
            406: '无法使用请求的内容特性响应请求的网页。',
            410: '请求的资源已永久删除',
            500: '服务器遇到错误，无法完成请求。',
            502: '错误的网关',
            503: '服务器无法使用',
            504: '网关超时'
        };

    api.ajax = function (request) {
        var defer = $.Deferred();
        $.ajax(request).then(function (data) {
            ((data && data.body && data.body.result == 0) ? defer.resolve : defer.reject)(data.body);
        }, function (xhr) {
            var status = xhr.status;
            defer.reject({
                result: status,
                desc: errors.hasOwnProperty(status) ? errors[status] : '未知网络错误'
            });
        });
        return defer.promise();
    };

    //api的get方法
    api.getJSON = function (url, data, success) {
        return api.ajax({
            url: url,
            type: "get",
            dataType: 'json',
            data: data,
            success: success
        });
    };
    //api的post方法
    api.postJSON = function (url, data, success) {
        if (!$.support.cors) {
            var regUrl = url.match(/(http[s]?:\/\/[\-\w\.]+)(\/.*)/);
            url = regUrl[1] + '/x' + regUrl[2];
            data = JSON.stringify(data);
        }
        return api.ajax({
            url: url,
            type: "post",
            dataType: 'json',
            data: data,
            success: success
        });
    };

    //统一s3g网关
    api.getJSON = api.postJSON = function (url, data, success) {
        return api.s3g(url, data, success);
    };

    api.s3g = function (url, data, success, type) {
        type = type || "post";
        return api.ajax({
            url: s3gUrl + url,
            type: type,
            contentType: (type === "get" ? undefined : "text/plain"),
            dataType: 'json',
            data: (type === "get" ? data : JSON.stringify(data)),
            success: success
        });
    };

    return api;
})(__webpack_require__(0), __webpack_require__(1));

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/5/10.
 */
(function (smarket, $, md5) {
    var storage = smarket.localstorage,
        cacheInterfaces = smarket.Config('cacheSettings.interfaces') || [];

    /**
     *  本地缓存options可配置项
     * @param options.localCache 是否启用本地缓存
     * @param options.cacheExp 缓存超时时间(单位: 秒)
     * @param options.cacheRefresh 是否强制清除缓存
     */
    function needLocalCache(options) {
        var requestPath = smarket.parseUrl('path', options.url),
            localCache = false;

        if (options['localCache']) {
            return true;
        }

        $.each(cacheInterfaces, function (i, item) {
            if (requestPath && (item.toLowerCase() == requestPath.toLowerCase())) {
                localCache = true;
            }
        });

        return localCache;
    }

    function genCacheKey(options) {
        var param = "";

        if (options.data && smarket.isPlainObject(options.data)) {
            param = $.param(options.data)
        } else {
            param = options.data;
        }

        return md5(options.url + param);
    }

    $.ajaxPrefilter(function (options, originalOptions) {
        var exp = options['cacheExp'] || smarket.Config('cacheSettings.cacheExp'),
            cacheSwitch = smarket.Config('cacheSettings.cacheSwitch'),
            refresh = options['cacheRefresh'] || smarket.Config('cacheSettings.refresh'),
            localCache = needLocalCache(originalOptions),
            cacheKey = genCacheKey(originalOptions),
            value;

        if (!storage.enable) {
            return;
        }

        if (!localCache) {
            storage.removeItem(cacheKey);
        }

        if (cacheSwitch && localCache) {
            if(console && console.log){
                console.log(originalOptions);
            }
            if (smarket.isPlainObject(originalOptions.data)) {
                options.data = $.param(smarket.extend({}, originalOptions.data, {
                    _cache_with_cached: 1,
                    _cache_refresh: refresh ? 1 : 0,
                    _cache_timeout: exp
                }));
            } else if (typeof(originalOptions.data) === "string") {
                var data = JSON.parse(originalOptions.data);
                options.data = $.param(smarket.extend({}, data, {
                    _cache_with_cached: 1,
                    _cache_refresh: refresh ? 1 : 0,
                    _cache_timeout: exp
                }));
            }
            /*options.data = $.param(smarket.extend({}, originalOptions['data'], {
             _cache_with_cached: 1,
             _cache_refresh: refresh ? 1 : 0,
             _cache_timeout: exp
             }));*/

            value = storage.getItem(cacheKey);

            if (!value) {
                // If it not in the cache, we store the data, add success callback - normal callback will proceed
                if (options.success) {
                    options.realsuccess = options.success;
                }
                options.success = function (data, status, jqXHR) {
                    var dataType = this.dataType || jqXHR.getResponseHeader('Content-Type');

                    storage.setItem(cacheKey, data, {exp: exp, type: dataType});

                    if (options.realsuccess) options.realsuccess(data, status, jqXHR);
                };
            }
        }
    });

    $.ajaxTransport("+*", function (options, originalOptions) {
        var localCache = needLocalCache(originalOptions),
            cacheSwitch = smarket.Config('cacheSettings.cacheSwitch'),
            dataType = options.dataType || 'text',
            cacheKey, value;

        if (storage.enable && cacheSwitch && localCache) {
            cacheKey = genCacheKey(originalOptions);
            value = storage.getItem(cacheKey);

            if (value) {
                return {
                    send: function (headers, completeCallback) {
                        var response = {};
                        response[dataType] = value;
                        completeCallback(200, 'success', response, '');
                    },
                    abort: function () {
                        console.log("Aborted ajax transport for json cache.");
                    }
                };
            }
        }
    });

})(__webpack_require__(0), __webpack_require__(1), __webpack_require__(40), __webpack_require__(77));

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/5/10.
 */
;
'use strict';
(function (smarket, $) {
    var proxyInterfaces = smarket.Config('proxyInterfaces') || [];

    var needProxyAgent = function (options) {
        var requestPath = smarket.parseUrl('path', options.url),
            needProxy = false;

        $.each(proxyInterfaces, function (i, item) {
            if (requestPath && (item.toLowerCase() == requestPath.toLowerCase())) {
                needProxy = true;
            }
        });

        return needProxy;
    };

    $.ajaxSetup({
        beforeSend: function (jqXHR, settings) {
            if (needProxyAgent(settings)) {
                settings.url = smarket.Config('api.proxy') + encodeURIComponent(settings.url);
            }
        }
    });
})(__webpack_require__(0), __webpack_require__(1));

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket支持cookie操作
 */
;
'use strict';
(function (smarket, $) {
    if (!smarket) {
        throw new Error("Require the smarket module.");
    }
    var cookie = smarket.cookie = smarket.cookie || {},
        defaultDomain = smarket.Config("cookie.domain") || "",
        slice = Array.prototype.slice,
        $cookie = $.cookie;

    $cookie.json = smarket.Config("cookie.json");

    function setCookie(key, val, options){
        var defaultOp = {
            path: '/',
            domain: defaultDomain
        };
        $.extend(defaultOp, options);
        $cookie(key, val, defaultOp);
    }
    //操作smarketMember的cookie,该cookie表示登陆信息
    cookie.smarketMember = function (schemaId, smarketMember, options) {
        var args = slice.call(arguments),
            flag = (smarket.Config("cookie.flag.member") || "smarketMember") + '_' + schemaId;
        if (args.length > 1) {
            setCookie(flag, smarketMember, options);
            return;
        }
        return $cookie(flag);
    };
    cookie.smarketMember.remove = function (schemaId) {
        var flag = (smarket.Config("cookie.flag.member") || "smarketMember") + '_' + schemaId;
        $.removeCookie(flag, {
            path: '/'
        });
    };
    //操作openId的cookie,该cookie表示用户的微信openId信息
    cookie.openId = function (weChatId, openId, options) {
        var args = slice.call(arguments),
            flag = (smarket.Config("cookie.flag.openId") || "openId") + weChatId;
        if (args.length > 1) {
            setCookie(flag, openId, options);
            return;
        }
        return $cookie(flag);
    };
    cookie.openId.remove = function (weChatId) {
        var flag = (smarket.Config("cookie.flag.openId") || "openId") + weChatId;
        $.removeCookie(flag, {
            path: '/'
        });
    };
    //操作customForm的cookie,该cookie表示用户填写表单的状态
    cookie.smarketCustomForm = function (formId, smarketCustomForm, options) {
        var args = slice.call(arguments),
            flag = (smarket.Config("cookie.flag.customForm") || "smarketCustomForm") + '_' + formId;
        if (args.length > 1) {
            setCookie(flag, smarketCustomForm, options);
            return;
        }
        return $cookie(flag);
    };
    //删除customForm的cookie
    cookie.smarketCustomForm.remove = function (formId) {
        var flag = (smarket.Config("cookie.flag.customForm") || "smarketCustomForm") + '_' + formId;
        $.removeCookie(flag, {
            path: '/'
        });
    };
    //操作globalUserId
    cookie.globalUserId = function (globalUserId, options) {
        var args = slice.call(arguments),
            flag = smarket.Config('cookie.flag.globalUserId') || "globalUserId";
        if (args.length > 0) {
            setCookie(flag, globalUserId, options);
            return;
        }
        return $cookie(flag);
    };
    //清除匿名用户cookie
    cookie.globalUserId.remove = function () {
        var flag = (smarket.Config("cookie.flag.globalUserId") || "globalUserId");
        $.removeCookie(flag, {
            path: '/'
        });
    };
    //操作手机号的cookie,该cookie表示用户手机验证状态
    cookie.mobile = function (schemaId, mobile, options) {
        var args = slice.call(arguments),
            flag = (smarket.Config("cookie.flag.mobile") || "mobile") + '_' + schemaId;
        if (args.length > 1) {
            setCookie(flag, mobile, options);
            return;
        }
        return $cookie(flag);
    };
    //删除手机号
    cookie.mobile.remove = function (schemaId) {
        var flag = (smarket.Config("cookie.flag.mobile") || "mobile") + '_' + schemaId;
        $.removeCookie(flag, {
            path: '/'
        });
    };
})(__webpack_require__(0), __webpack_require__(1));

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket支持localstorage操作
 */
;
'use strict';
(function (smarket) {
    if (!smarket) {
        throw new Error("Require the smarket module.");
    }
    var localstorage = smarket.localstorage = smarket.localstorage || {},
        storage = window.localStorage;

    //本地存储是否可用
    localstorage.enable = !!storage;
    /**
     * 根据key获取值
     * @param key
     * @returns {null}
     */
    localstorage.getItem = function (key) {
        var timestamp = storage.getItem(key + 'exp') || 0,
            type = storage.getItem(key + 'type') || 'text',
            value = storage.getItem(key);

        if (timestamp && timestamp < +new Date()) {
            localstorage.removeItem(key);
            return null;
        }

        if (type.toLowerCase().indexOf('json') !== -1) {
            value = JSON.parse(value);
        }

        return value;
    };
    /**
     *  设置local storage
     * @param key
     * @param value
     * @param options 选项: {
     *     exp: 1,   过期时间(秒)
     *     type: json 存储格式
     * }
     */
    localstorage.setItem = function (key, value, options) {
        options = smarket.extend({exp: 1, type: 'text'}, options);

        if (options['type'].toLowerCase().indexOf('json') !== -1) {
            value = JSON.stringify(value);
        }
        try {
            storage.setItem(key, value);
            storage.setItem(key + 'exp', +new Date() + 1000 * options['exp']);
            storage.setItem(key + 'type', options['type']);
        } catch (e) {
            localstorage.removeItem(key);
            console.log('Cache Error:' + e, key, value);
        }
    };

    localstorage.removeItem = function (key) {
        storage.removeItem(key);
        storage.removeItem(key + 'exp');
        storage.removeItem(key + 'type');
    };

    localstorage.clear = function () {
        storage.clear();
    };
})
(__webpack_require__(0));

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

;(function (smarket) {
    if (!smarket) {
        throw new Error("Require the smarket module.");
    }
    var Message = smarket.Message;
    var MessageFactory = smarket.MessageFactory = smarket.MessageFactory || {
            types: {}
        };

    //根据类型注册
    MessageFactory.registerType = function (type, factory) {
        MessageFactory['types'][type.toString()] = factory;
    };

    //当根据type取到的是function时直接实例化,否则如果是工厂object再由工厂方法创建
    MessageFactory.create = function (type) {
        var messageInstance;
        if (smarket.isFunction(MessageFactory['types'][type])) {
            messageInstance = new MessageFactory['types'][type]();
        } else {
            throw new Error("Undefined message type");
        }
        return messageInstance;
    };

    for (var item in Message) {
        if (Message.hasOwnProperty(item)) {
            if (Message[item]['type']) {
                MessageFactory.registerType(Message[item]['type'], Message[item]);
            }
        }
    }
    smarket.MessageFactory = MessageFactory;

})(__webpack_require__(0),
    __webpack_require__(80)
);


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket支持sbase协议
 */
;
'use strict';
(function (smarket) {
    if (!smarket) {
        throw new Error("Require the smarket module.");
    }
    function Message(){
        //var self = this;
        //self.type = '';
    }
    Message.prototype = $.extend(true, {});
    var proto = Message.prototype;
    proto.constructor = Message;
    proto.init = function () {

    };
    proto.send = function () {

    };
    proto.onMessage = function (callback) {

    };
    smarket.Message = Message;
})(__webpack_require__(0));

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket支持sbase协议
 */
;
'use strict';
(function (smarket, $) {
    if (!smarket) {
        throw new Error("Require the smarket module.");
    }
    var Message = smarket.Message;

    function WilddogMessage() {
        var self = this;
        self.Wilddog = {};
        Message.apply(self);
    }

    var proto = WilddogMessage.prototype = $.extend(true, {}, Message.prototype);
    proto.constructor = WilddogMessage;
    proto.init = function (key) {
        var self = this;
        self.Wilddog = new Wilddog(smarket.Config('wilddog.url') + key);
        self.login();
    };
    proto.login = function () {
        var self = this;
        self.Wilddog.authWithPassword({email: smarket.Config('wilddog.email'), password: smarket.Config('wilddog.password')},
            function (err) {
                if (err != null) {
                    console.log("auth failed,msg:", err);
                }
            }
        );
    };
    proto.send = function (messageInfo) {
        self.Wilddog.set(messageInfo);
    };
    proto.onMessage = function (callback) {
        var self = this;
            //defer = $.Deferred();
        self.Wilddog.on('value', function (snapshot) {
            var authData = self.Wilddog.getAuth();
            if (!authData) {
                self.login();
            }
            callback({
                result :0,
                content:snapshot.val()
            }) ;
            //defer.resolve(snapshot.val());
        }, function (errorObject) {
            callback( {
                result :-1,
                content:errorObject
            });
        });
        //return defer.promise();
    };
    WilddogMessage.type = 'wilddog';
    Message.WilddogMessage = WilddogMessage;
})(__webpack_require__(0), __webpack_require__(1), __webpack_require__(79));

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/6.
 */
//加载不同的model
__webpack_require__(18);
__webpack_require__(41);

__webpack_require__(45);
__webpack_require__(46);
__webpack_require__(28);
__webpack_require__(44);

__webpack_require__(47);

__webpack_require__(48);

__webpack_require__(49);
__webpack_require__(29);


__webpack_require__(51);

__webpack_require__(52);

__webpack_require__(53);

__webpack_require__(33);
__webpack_require__(68);
__webpack_require__(69);
__webpack_require__(67);
__webpack_require__(31);
__webpack_require__(32);

__webpack_require__(19);
__webpack_require__(30);
__webpack_require__(54);
__webpack_require__(55);
__webpack_require__(20);
__webpack_require__(56);
__webpack_require__(57);
__webpack_require__(58);
__webpack_require__(21);
__webpack_require__(60);
__webpack_require__(61);
__webpack_require__(62);
__webpack_require__(63);
__webpack_require__(59);

__webpack_require__(64);
__webpack_require__(22);
__webpack_require__(65);
__webpack_require__(66);

__webpack_require__(50);

__webpack_require__(70);

__webpack_require__(71);
__webpack_require__(72);

__webpack_require__(42);
__webpack_require__(17);
__webpack_require__(43);

module.exports = __webpack_require__(0);


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/2/19.
 */
//渲染音效
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.template) {
        throw new Error("Require the smarket.template module.");
    }
    var template = smarket.template;
    template.registerExtraHandle("audio", function (option) {
        option["element"].attr("src", option["url"]);
    });
})(__webpack_require__(0), __webpack_require__(6));

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by sunkaihan on 2017/2/20.
 */
//样式渲染
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.template) {
        throw new Error("Require the smarket.template module.");
    }
    var template = smarket.template;
    template.registerExtraHandle("css", function (option) {
        if (option["element"].length > 0) {
            option["element"].attr("href", option["url"]);
        } else {
            var fileRef = document.createElement('link');
            fileRef.setAttribute("rel", "stylesheet");
            fileRef.setAttribute("type", "text/css");
            fileRef.setAttribute("href", option["url"]);
            document.getElementsByTagName("head")[0].appendChild(fileRef);
        }
    });
})(__webpack_require__(0), __webpack_require__(6));

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/2/19.
 */
//渲染DIV
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.template) {
        throw new Error("Require the smarket.template module.");
    }
    var template = smarket.template;
    template.registerExtraHandle("div", function (option) {
    });
})(__webpack_require__(0), __webpack_require__(6));

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/9.
 * 模板渲染图片
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.template) {
        throw new Error("Require the smarket.template module.");
    }
    var template = smarket.template;
    template.registerExtraHandle("image", function (option) {
        if (option["extra"]["isUse"] == "true" || option["extra"]["isUse"] === true || option["extra"]["isUse"] == 1) {
            option["element"].show().attr("src", option["url"]);
        } else {
            option["element"].hide().attr("src", "");
        }
    });
})(__webpack_require__(0), __webpack_require__(6));


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/2/19.
 */
//渲染链接
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.template) {
        throw new Error("Require the smarket.template module.");
    }
    var template = smarket.template;
    template.registerExtraHandle("a", function (option) {
        option["element"].attr("href", option["url"]);
        option["element"].html(option["text"]);
    });
})(__webpack_require__(0), __webpack_require__(6));

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/2/19.
 */
//渲染图片链接
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.template) {
        throw new Error("Require the smarket.template module.");
    }
    var template = smarket.template;
    template.registerExtraHandle("aimage", function (option) {
        option["element"].attr("href", option["url"]);
        option["element"].find("img").attr("src", option["imgUrl"]);
    });
})(__webpack_require__(0), __webpack_require__(6));

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/2/19.
 */
//渲染文字链接
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.template) {
        throw new Error("Require the smarket.template module.");
    }
    var template = smarket.template;
    template.registerExtraHandle("ap", function (option) {
        option["element"].attr("href", option["url"]);
        option["element"].find("p").html(option["text"]);
    });
})(__webpack_require__(0), __webpack_require__(6));

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/2/19.
 */
//渲染DIV
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.template) {
        throw new Error("Require the smarket.template module.");
    }
    var template = smarket.template;
    template.registerExtraHandle("p", function (option) {
        option["element"].html(option["url"] || option["text"]);
    });
})(__webpack_require__(0), __webpack_require__(6));

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/9.
 * 渲染h1 h2 h3 h4 h5 h6
 */
;
'use strict';
(function (smarket, $) {
    if (!smarket || !smarket.template) {
        throw new Error("Require the smarket.template module.");
    }
    var template = smarket.template;
    $.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], function (idx, item) {
        template.registerExtraHandle(item, function (option) {
            option["element"].html(option["text"]);
        });
    });
})(__webpack_require__(0), __webpack_require__(1), __webpack_require__(6));


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/5/13.
 */
;'use strict';
module.exports = (function (smarket) {
    var service = smarket.api.contactmanage,
        Field = smarket.viewModel.Field,
        validations = smarket.viewModel.validations = smarket.viewModel.validations || {},
        validators = function (field) {
            var formId = field.formId();
            field.extendValidators = function (validator) {
                var validation = [];
                if (field.isUnique()) {
                    validation.push(addCheckUnique(field, formId));
                }
                if (field.unrepeatable()) {
                    validation.push(addCheckRepeat(field, formId));
                }
                if (field instanceof Field.PhoneField) {
                    addSendCheckCodeToMobile(field);
                }
                if (field instanceof Field.EmailField) {
                    addSendCheckCodeToMail(field);
                }
                validator.validation = validation;
            };
        };

    function addCheckUnique(field) {
        return {
            async: true,
            validator: function (val, params, callback) {
                service.checkUnique(field.schemaId, val).then(function (data) {
                    callback(data.content.result)
                }, function () {
                    callback(false);
                });
            },
            message: field.messages.unique
        };
    }

    function addCheckRepeat(field, formId) {
        return {
            async: true,
            validator: function (val, params, callback) {
                service.checkRepeatable(formId, field.fieldId(), val).then(function (data) {
                    callback(data.content.result)
                }, function () {
                    callback(false);
                });
            },
            message: field.messages.unique
        };
    }

    function addSendCheckCodeToMobile(field) {
        field.sendCheckCodeToMobile = function (phoneNumber, formId) {
            return service.sendVerificationCode(phoneNumber, formId);
        };
    }

    function addSendCheckCodeToMail(field) {
        field.sendCheckCodeToMail = function (email, formId) {
            return service.sendVerificationCode(email, formId);
        };
    }
    validations.contactmanage = validators;
    return validators;
})(__webpack_require__(0), __webpack_require__(4), __webpack_require__(10), __webpack_require__(11));

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/5/13.
 */
;'use strict';
module.exports = (function (smarket) {
    var service = smarket.api.customform,
        Field = smarket.viewModel.Field,
        validations = smarket.viewModel.validations = smarket.viewModel.validations || {},
        validators = function (field) {
            var formId = field.formId();
            field.extendValidators = function (validator) {
                var validation = [];
                if (field.unrepeatable()) {
                    validation.push(addCheckRepeat(field, formId));
                }
                if (field instanceof Field.PhoneField) {
                    addSendCheckCodeToMobile(field);
                }
                validator.validation = validation;
            };
        };

    function addCheckRepeat(field, formId) {
        return {
            async: true,
            validator: function (val, params, callback) {
                service.checkRepeatable(formId, field.fieldId(), val).then(function (data) {
                    callback(data.content.result)
                }, function () {
                    callback(false);
                });
            },
            message: field.messages.repeat
        };
    }

    function addSendCheckCodeToMobile(field) {
        field.sendCheckCodeToMobile = function (phoneNumber, formId) {
            return service.sendCheckCode(formId, phoneNumber);
        };
    }
    validations.customform = validators;
    return validators;
})(__webpack_require__(0), __webpack_require__(4), __webpack_require__(26), __webpack_require__(11));

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field,
        Option = viewModel.Option;

    function CheckboxField() {
        var self = this;

        Field.apply(self);

        //多选选项
        self.options = ko.observableArray();
        //选中的值
        self.value = ko.observableArray();
        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            var value = self.value(), options = self.options(), values = [];

            if (value && value.length > 0) {
                for (var i = 0; i < options.length; i++) {
                    if (value.toString().split(',').indexOf(options[i].optionId().toString()) >= 0) {
                        values.push(options[i].text());
                    }
                }
            }

            return {
                fieldId: self.fieldId(),
                key: self.key(),
                options: self.value(),
                values: values
            };
        });
    }

    var proto = CheckboxField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = CheckboxField;

    proto.init = function (options) {
        var self = this, field = options['field'];

        self.baseInit(options);

        if (field.options && field.options.length > 0) {
            for (var i = 0; i < field.options.length; i++) {
                var option = new Option();
                option.init(field.options[i]);
                self.options.push(option);
            }
        }

        if (options['value'] && smarket.isPlainObject(options['value']) && options['value']['options'] && options['value']['options'].length > 0) {
            self.value(options['value']['options']);
        }
    };

    CheckboxField.type = '4';

    Field.CheckboxField = CheckboxField;

})(__webpack_require__(0), __webpack_require__(7), __webpack_require__(24));


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field;

    function FileUploadField() {
        var self = this;

        Field.apply(self);

        //图片名称
        self.fileName = ko.observable();
        //图片url
        self.url = ko.observable();

        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            return {
                fieldId: self.fieldId(),
                fileName: self.fileName(),
                mapId: self.value()
            };
        });
    }

    var proto = FileUploadField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = FileUploadField;

    proto.init = function (options) {
        var self = this, field = options['field'];

        self.baseInit(options);

        if (options['value']) {
            self.value(options['value']['text']['mapId']);
            self.fileName(options['value']['text']['fileName']);
            self.url("http://content.smarket.net.cn/index.php?mappingId=" + self.value());
        }

        window.setTimeout(function () {
            self.initUpload();
        }, 500);
    };

    proto.initUpload = function () {
        var self = this, $upload = $('.uploadify' + self.fieldId());

        if ($upload.length > 0) {
            $upload.each(function (i, item) {
                var command = encodeURI(JSON.stringify({
                    "size": 0,
                    "dst": "01-0300",
                    "orn": "01-0300",
                    "sess": '',
                    "type": 0x0002,
                    "cmd": "file.upload",
                    "seq": 0,
                    "ver": 1000,
                    "body": ''
                }));
                $(item).fileupload({
                    //TODO url prefix should use the var
                    // url: smarket.Config("api.gateway.account") + '/file/upload',
                    url: 'http://content.smarket.net.cn/index.php?command=' + command,
                    dataType: 'json',
                    add: function (e, data) {
                        self.fileName(data.files[0]["name"]);
                        data.submit();
                    },
                    change: function (e, data) {
                        $.each(data.files, function (index, file) {
                            if (!/(.gif|.jpg|.png|.jpeg|.docx|.docm|.dotm|.dotx|.xlsx|.xlsb|.xls|.xlsm|.pptx|.ppsx|.ppt|.pps|.pptm|.potm|.ppam|.potx|.ppsm)$/.test(file.name.toLowerCase())) {
                                alert('不支持上传该类型文件');
                                return false;
                            }
                        });
                    },
                    success: function (result) {
                        if (result["body"]["result"] == 0) {
                            self.url(result["body"]["content"]["url"]);
                            self.value(result["body"]["content"]["mappingId"]);
                        } else {
                            alert(result["body"]['desc']);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    },
                    complete: function (result, textStatus, jqXHR) {
                    }
                });
            });
        }
    };

    proto.remove = function () {
        var self = this;

        self.value('');
        self.fileName('');
    };

    FileUploadField.type = '7';

    Field.FileUploadField = FileUploadField;

})(__webpack_require__(0), __webpack_require__(7));


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field,
        customform = smarket.api.customform;

    function ImageUploadField() {
        var self = this;

        Field.apply(self);
        //图片名称
        self.fileName = ko.observable();
        //图片url
        self.url = ko.observable();
        //缩放比例
        self.ratio = ko.observable();
        //图片裁剪默认选择框尺寸
        self.width = ko.observable(500);
        self.height = ko.observable(500);
        //裁剪框坐标
        self.cropCoords = {
            x: 0,
            x2: self.width(),
            y: 0,
            y2: self.height()
        };
        //裁剪框实例
        self.crop = {};
        //消息提示
        self.message = ko.observable();
        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            return {
                fieldId: self.fieldId(),
                fileName: self.fileName(),
                mapId: self.value()
            };
        });
    }

    var proto = ImageUploadField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = ImageUploadField;

    proto.init = function (options) {
        var self = this, field = options['field'];

        self.baseInit(options);

        self.ratio(field["ratio"]);

        if (options['value']) {
            self.value(options['value']['text']['mapId']);
            self.fileName(options['value']['text']['fileName']);
            self.url("http://content.smarket.net.cn/index.php?mappingId=" + self.value());
        }

        window.setTimeout(function () {
            self.initUpload();
        }, 500);
    };

    proto.initUpload = function () {
        var self = this, $upload = $('.uploadify' + self.fieldId());

        if ($upload.length > 0) {
            $upload.each(function (i, item) {
                var command = encodeURIComponent(JSON.stringify({
                    "size": 0,
                    "dst": "01-0300",
                    "orn": "01-0300",
                    "sess": '',
                    "type": 0x0002,
                    "cmd": "file.upload",
                    "seq": 0,
                    "ver": 1000,
                    "body": ''
                }));
                $(item).fileupload({
                    // url: smarket.Config("api.gateway.account") + '/file/upload',
                    url: 'http://content.smarket.net.cn/index.php?command=' + command,
                    dataType: 'json',
                    add: function (e, data) {
                        var isImage = true;
                        $.each(data.files, function (index, file) {
                            if (!/(.jpg|.png|.gif|.ps|.jpeg)$/.test(file.name.toLowerCase())) {
                                isImage = false;
                            }
                        });
                        if (isImage) {
                            self.fileName(data.files[0]["name"]);
                            data.submit();
                        }
                    },
                    change: function (e, data) {
                        $.each(data.files, function (index, file) {
                            if (!/(.jpg|.png|.gif|.ps|.jpeg)$/.test(file.name.toLowerCase())) {
                                self.message('不支持上传该类型文件');
                                return false;
                            }
                        });
                    },
                    success: function (result) {
                        if (result["body"]["result"] == 0) {
                            self.url(result["body"]["content"]["url"]);
                            self.value(result["body"]["content"]["mappingId"]);
                        } else {
                            self.message(result["body"]['desc']);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    },
                    complete: function (result, textStatus, jqXHR) {
                    }
                });
            });
        }
    };

    proto.initCrop = function () {
        var self = this, $crop = $('#crop' + self.fieldId());

        if ($crop.length <= 0) {
            return;
        }

        if (self.crop && self.crop.destroy && typeof self.crop.destroy === "function") {
            self.crop.destroy();
        }
        self.cropCoords = {
            x: 0,
            x2: self.width(),
            y: 0,
            y2: Math.floor(self.width() / self.ratio())
        };
        $crop.Jcrop({
            aspectRatio: self.ratio(),
            boxWidth: 560,
            setSelect: [self.cropCoords['x'], self.cropCoords['y'], self.cropCoords['x2'], self.cropCoords['y2']],
            onSelect: function (coords) {
                self.cropCoords['x'] = coords['x'];
                self.cropCoords['x2'] = coords['x2'];
                self.cropCoords['y'] = coords['y'];
                self.cropCoords['y2'] = coords['y2'];
            }
        }, function () {
            self.crop = this;
        });
    };

    proto.remove = function () {
        var self = this;

        self.value('');
        self.url('');
    };

    proto.cropImage = function () {
        var self = this;
        customform.cropImage(self.value, self.cropCoords).then(function (data) {
            self.value(data["content"]["mappingId"]);
            self.url(data["content"]["url"]);
            self.initCrop();
        });
    };

    ImageUploadField.type = '8';

    Field.ImageUploadField = ImageUploadField;

})(__webpack_require__(0), __webpack_require__(7));


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field,
        location = smarket.api.location;

    function LocationField() {
        var self = this;

        Field.apply(self);

        //全部省份信息
        self.allProvinces = ko.observableArray();
        //全部城市信息
        self.allCityies = ko.observableArray();
        //省份下拉列表
        self.provinces = ko.observableArray();
        //城市下拉列表
        self.cities = ko.observableArray();
        //选中的省份
        self.selectedProvince = ko.observable();
        //选中的省份名称
        self.selectedProvinceName = ko.observable("请选择");
        //选中的城市
        self.selectedCity = ko.observable();
        //选中的城市名称
        self.selectedCityName = ko.observable("请选择");
        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            return {
                fieldId: self.fieldId(),
                key: self.key(),
                text: self.selectedProvince()['name'] + '-' + self.selectedCity()['name']
            };
        });
    }

    var proto = LocationField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = LocationField;

    proto.init = function (options) {
        var self = this, field = options['field'];

        self.baseInit(options);

        self.provinces([{id: '', name: '请选择'}]);
        self.cities([{id: '', name: '请选择'}]);

        $.when(location.getProvinces(), location.getCities()).done(function (provinces, cities) {
            self.allProvinces(provinces[0]);
            self.allCityies(cities[0]);

            //初始化加载省份列表
            $.each(provinces[0], function (i, item) {
                self.provinces.push({
                    id: item['Area_ID'],
                    name: item['province']
                });
            });

            //当省级下拉选择项变化时触发事件
            self.selectedProvince.subscribe(function (province) {
                self.cities([{id: '', name: '请选择'}]);
                self.selectedProvinceName(province['name']);
                if (province['id']) {
                    $.each(self.allCityies(), function (i, city) {
                        if (city['Area_ID'] != '') {
                            if (city['father_id'] == province['id']) {
                                self.cities.push({
                                    id: city['Area_ID'],
                                    name: city['allcity']
                                });
                            }
                        }
                    });
                    self.errors.showAllMessages(false);
                }
            });

            //当城市下拉选择项变化时触发事件
            self.selectedCity.subscribe(function (city) {
                self.value(!!city['id'] ? true : '');
                self.selectedCityName(city['name']);
            });

            self.afterInitHandler();

            if (options['value'] && smarket.isPlainObject(options['value']) && options['value']['options'].length > 0) {
                self.value(true);

                $.each(self.provinces(), function (i, province) {
                    if (province.id == options['value']['options'][0]) {
                        self.selectedProvince(province);
                    }
                });
                $.each(self.cities(), function (i, city) {
                    if (city.id == options['value']['options'][1]) {
                        self.selectedCity(city);
                    }
                });
            }
        });
    };

    LocationField.type = '6';

    //重写Field
    LocationField.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    LocationField.extend({
        afterInitHandler: smarket.noop
    });

    Field.LocationField = LocationField;

})(__webpack_require__(0), __webpack_require__(125), __webpack_require__(7));


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field,
        Option = viewModel.Option;

    function RadioField() {
        var self = this;

        Field.apply(self);
        //单选选项
        self.options = ko.observableArray();
        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            var value = self.value(), options = self.options(), values = [];

            if (value) {
                for (var i = 0; i < options.length; i++) {
                    if (options[i].optionId() && value.toString() == options[i].optionId().toString()) {
                        values.push(options[i].text());
                    }
                }
            }

            return {
                fieldId: self.fieldId(),
                key: self.key(),
                options: [self.value()],
                values: values
            };
        });
    }

    var proto = RadioField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = RadioField;

    proto.init = function (options) {
        var self = this, field = options['field'];

        self.baseInit(options);

        if (field.options && field.options.length > 0) {
            for (var i = 0; i < field.options.length; i++) {
                var option = new Option();
                option.init(field.options[i]);
                self.options.push(option);
            }
        }

        if (options['value'] && smarket.isPlainObject(options['value']) && options['value']['options'] && options['value']['options'].length > 0) {
            $.each(self.options(), function (i, item) {
                if (item.optionId() == options['value']['options'][0]) {
                    self.value(item.optionId().toString());
                }
            });
        }
    };

    RadioField.type = '3';

    Field.RadioField = RadioField;

})(__webpack_require__(0), __webpack_require__(7), __webpack_require__(24));


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field,
        Option = viewModel.Option;

    function SelectField() {
        var self = this;

        Field.apply(self);

        //下拉框选项
        self.options = ko.observableArray();
        //选中的文字
        self.selectedText = ko.observable("请选择");
        //更改选中的文字
        self.value.subscribe(function (value) {
            if (value) {
                $.each(self.options(), function (i, option) {
                    if (value == option.optionId()) {
                        self.selectedText(option.text());
                    }
                });
            }
        });
        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            var value = self.value(), options = self.options(), values = [];

            if (value) {
                for (var i = 0; i < options.length; i++) {
                    if (options[i].optionId() && value == options[i].optionId()) {
                        values.push(options[i].text());
                    }
                }
            }

            return {
                fieldId: self.fieldId(),
                key: self.key(),
                options: [self.value()],
                values: values
            };
        });
    }

    var proto = SelectField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = SelectField;

    proto.init = function (options) {
        var self = this, field = options['field'], option = new Option();

        self.baseInit(options);

        option.init({optionId: '', option: '请选择'});
        self.options.unshift(option);

        if (field.options && field.options.length > 0) {
            for (var i = 0; i < field.options.length; i++) {
                option = new Option();
                option.init(field.options[i]);
                self.options.push(option);
            }
        }

        if (options['value'] && smarket.isPlainObject(options['value']) && options['value']['options'] && options['value']['options'].length > 0) {
            $.each(self.options(), function (i, item) {
                if (item.optionId() == options['value']['options'][0]) {
                    self.value(item.optionId().toString());
                }
            });
        } else {
            self.value('');
        }
    };

    SelectField.type = '5';

    Field.SelectField = SelectField;

})(__webpack_require__(0), __webpack_require__(7), __webpack_require__(24));


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field,
        dictionary = smarket.api.dictionary;

    function CascadeField(options) {
        var self = this;

        Field.apply(self);

        //是否是特殊字段
        self.isSpecial = true;
        //字典表Id
        self.dicId = ko.observable(options['dicId']);
        //级联下拉树形结构
        self.cascadeTree = ko.observableArray();
        //存储选中的值
        self.values = ko.observableArray();
        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            var options = [], values = [];

            $.each(self.cascadeTree(), function (i, item) {
                var value = item.selectedValue();

                if (value) {
                    options.push(value.paramId());
                    values.push(value.name());
                }
            });

            return {
                fieldId: self.fieldId(),
                key: self.key(),
                options: options,
                values: values
            };
        });
    }

    var proto = CascadeField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = CascadeField;

    proto.init = function (options) {
        var self = this, field = options['field'], hasEmptyValue = true;

        self.baseInit(options);

        if (options['value'] && smarket.isPlainObject(options['value']) && options['value']['options']) {
            $.each(options['value']['options'], function (i, item) {
                if (!item) {
                    hasEmptyValue = false;
                }
            });

            if (hasEmptyValue) {
                self.value(true);
                self.values(options['value']['options']);
            }
        }

        dictionary.getParamTree(self.dicId()).then(function (data) {
            self.assembleTree(data['content'], 0);
        });
    };

    proto.assembleTree = function (options, index) {
        var self = this,
            selectField = new CascadeSelectField(),
            value = self.values()[index] || undefined;

        selectField.init(options);

        (function (index) {
            selectField.selectedValue.subscribe(function (selectedItem) {
                //清空选中下拉后面的下拉控件
                self.cascadeTree.splice(index + 1, self.cascadeTree().length);
                //更改选中的文字
                selectField.selectedText(selectedItem.name());

                if (selectedItem.childs().length > 0) {
                    self.value('');
                    self.assembleTree(selectedItem.childs(), index + 1);
                } else {
                    self.value(!!selectedItem.paramId() ? true : '');
                }
            });
        }(index));

        if (value) {
            $.each(selectField.options(), function (i, option) {
                if (option.paramId() == value) {
                    //触发selectedValue.subscribe监听回调,继续递归绑定值
                    selectField.selectedValue(option);
                    //当递归全部执行完成后将 self.values 依次出栈, 防止初始化完成后用户选择选项后再一次触发此流程
                    self.values.pop();
                }
            });
            self.cascadeTree.unshift(selectField);
        } else {
            self.cascadeTree.push(selectField);
        }
    };

    function CascadeSelectField() {
        var self = this;

        //选中的文字
        self.selectedText = ko.observable('请选择');
        //选中的选项
        self.selectedValue = ko.observable();
        //下拉框选项列表
        self.options = ko.observableArray();
    }

    CascadeSelectField.prototype.init = function (options) {
        var self = this, child = new CascadeOptionField();
        child.init({
            dicId: '',
            paramId: '',
            name: '请选择'
        });
        self.options([child]);
        if (options && options.length > 0) {
            $.each(options, function (i, childItem) {
                var child = new CascadeOptionField();
                child.init(childItem);
                self.options.push(child);
            });
        }
    };

    function CascadeOptionField() {
        var self = this;

        //所属字典表
        self.dicId = ko.observable();
        //字典值Id
        self.paramId = ko.observable();
        //字典值内容
        self.name = ko.observable();
        //下级级联
        self.childs = ko.observableArray();
    }

    CascadeOptionField.prototype.init = function (item) {
        var self = this;

        self.dicId(item['dicId']);
        self.paramId(item['paramId']);
        self.name(item['name']);

        if (item['child'] && item['child'].length) {
            $.each(item['child'], function (index, child) {
                self.childs.push(child);
            });
        }
    };
    //TODO fieldId or Type
    CascadeField.fieldId = 'xxx';

    Field.CascadeField = CascadeField;

})(__webpack_require__(0), __webpack_require__(123), __webpack_require__(7));


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by wzz on 2017.03.13.
 */
;
'use strict';
(function (smarket, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field,
        contactmanage = smarket.api.contactmanage;

    function EmailField() {
        var self = this;

        Field.apply(self);
        self.schemaId = ko.observable();
        //是否是特殊字段
        self.isSpecial = true;
        //是否验证邮箱
        self.isCheckEmail = ko.observable();
        //验证码
        self.checkCode = ko.observable();
        //计时器实例
        self.timer = 0;
        //发送验证码等待状态
        self.isRunning = ko.observable(false);
        //验证码计时器当前计数值
        self.elapsedNum = ko.observable(0);
        //验证码计时器初始值
        self.initialNum = ko.observable(60);
        //验证码计时器剩余时间
        self.remainingTime = ko.computed(function () {
            return self.initialNum() - self.elapsedNum();
        });
        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            return {
                fieldId: self.fieldId(),
                key: self.key(),
                text: $.trim(self.value()),
                checkCode: self.checkCode()
            };
        });
    }

    var proto = EmailField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = EmailField;

    proto.init = function (options) {
        var self = this, field = options['field'];
        self.schemaId = options['schemaId'];
        self.baseInit(options);

        self.isCheckEmail(field['isCheckEmail'] == 'true' || field['isCheckEmail'] == 1);

        if (options['value'] && smarket.isPlainObject(options['value']) && options['value']['text']) {
            self.value(options['value']['text']);
        }
    };


    proto.startCounter = function () {
        var self = this;

        self.elapsedNum(0);
        self.isRunning(true);
        self.timer = window.setInterval(function () {
            self.elapsedNum(self.elapsedNum() + 1);
            if (self.remainingTime() == 0) {
                clearInterval(self.timer);
                self.isRunning(false);
            }
        }, 1000);
    };

    proto.sendCheckCode = function () {
        var self = this,
            text = $.trim(self.value());
        if (self.value.error() != null) {
            self.errors.showAllMessages();
        } else {
            return self.sendCheckCodeToMail(text, self.schemaId).then(function (data) {
                self.startCounter();
                return data;
            }, function (data) {
                return data;
            });
            //return contactmanage.sendCheckCodeToMail(self.schemaId, text)
        }
    };

    proto.postExtendValidations = function(){
        var self = this;
        self.checkCode.extend({
            required: {
                onlyIf: function () {
                    return (self.isCheckEmail() && self.value.error() == null);
                },
                message: function () {
                    return '请输入验证码';
                }
            }
        });
    };

    EmailField.fieldId = '3';

    Field.EmailField = EmailField;

})(__webpack_require__(0), __webpack_require__(1), __webpack_require__(10));

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

;(function () {

})(
    __webpack_require__(99),
    __webpack_require__(102),
    __webpack_require__(103),
    __webpack_require__(100)
);


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket, md5) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field;

    function PasswordField() {
        var self = this;

        Field.apply(self);
        //是否是特殊字段
        self.isSpecial = true;
        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            return {
                fieldId: self.fieldId(),
                key: self.key(),
                text: md5(self.value()).toUpperCase()
            };
        });
    }

    var proto = PasswordField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = PasswordField;

    proto.init = function (options) {
        var self = this;

        self.baseInit(options);

        if (options['value'] && smarket.isPlainObject(options['value']) && options['value']['text']) {
            self.value(options['value']['text']);
        }
    };

    PasswordField.fieldId = '5';

    Field.PasswordField = PasswordField;

})(__webpack_require__(0), __webpack_require__(40), __webpack_require__(7));


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field,
        contactmanage = smarket.api.contactmanage;

    function PhoneField() {
        var self = this;

        Field.apply(self);
        //是否是特殊字段
        self.isSpecial = true;
        //是否验证手机
        self.isCheckMobile = ko.observable();
        //验证码
        self.checkCode = ko.observable();
        //计时器实例
        self.timer = 0;
        //发送验证码等待状态
        self.isRunning = ko.observable(false);
        //验证码计时器当前计数值
        self.elapsedNum = ko.observable(0);
        //验证码计时器初始值
        self.initialNum = ko.observable(60);
        //验证码计时器剩余时间
        self.remainingTime = ko.computed(function () {
            return self.initialNum() - self.elapsedNum();
        });
        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            return {
                fieldId: self.fieldId(),
                key: self.key(),
                text: self.value(),
                checkCode: self.checkCode()
            };
        });
    }

    var proto = PhoneField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = PhoneField;

    proto.init = function (options) {
        var self = this, field = options['field'];

        self.baseInit(options);

        self.isCheckMobile(field['isCheckMobile'] == 'true' || field['isCheckMobile'] == 1);

        if (options['value'] && smarket.isPlainObject(options['value']) && options['value']['text']) {
            self.value(options['value']['text']);
        }
    };

    proto.startCounter = function () {
        var self = this;

        self.elapsedNum(0);
        self.isRunning(true);
        self.timer = window.setInterval(function () {
            self.elapsedNum(self.elapsedNum() + 1);
            if (self.remainingTime() == 0) {
                clearInterval(self.timer);
                self.isRunning(false);
            }
        }, 1000);
    };

    proto.sendCheckCode = function () {
        var self = this;
        if (self.isRunning()) return false;
        if (self.value.error() != null) {
            self.errors.showAllMessages();
        } else {
            return self.sendCheckCodeToMobile(self.value(), self.formId()).then(function (data) {
                self.startCounter();
                return data;
            }, function (data) {
                self.startCounter();
                return data;
            });
            //return contactmanage.sendVerificationCode(self.value(), self.formId())
        }
    };

    proto.postExtendValidations = function () {
        var self = this;
        self.checkCode.extend({
            required: {
                onlyIf: function () {
                    return (self.isCheckMobile() && self.value.error() == null);
                },
                message: function () {
                    return '请输入验证码';
                }
            }
        });
    };

    PhoneField.fieldId = '4';

    Field.PhoneField = PhoneField;

})(__webpack_require__(0), __webpack_require__(10));


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field;

    function TextAreaField() {
        var self = this;

        Field.apply(self);

        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            return {
                fieldId: self.fieldId(),
                key: self.key(),
                text: self.value()
            };
        });
    }

    var proto = TextAreaField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = TextAreaField;

    proto.init = function (options) {
        var self = this;

        self.baseInit(options);

        if (options['value'] && smarket.isPlainObject(options['value']) && options['value']['text']) {
            self.value(options['value']['text']);
        }
    };

    TextAreaField.type = '2';

    Field.TextAreaField = TextAreaField;

})(__webpack_require__(0), __webpack_require__(7));


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        Field = viewModel.Field;

    function TextField() {
        var self = this;

        Field.apply(self);

        //字段答案（用于提交）
        self.answer = ko.pureComputed(function () {
            return {
                fieldId: self.fieldId(),
                key: self.key(),
                text: self.value()
            };
        });
    }

    var proto = TextField.prototype = $.extend(true, {}, Field.prototype);
    proto.constructor = TextField;

    proto.init = function (options) {
        var self = this, field = options['field'];

        self.baseInit(options);

        if (options['value'] && smarket.isPlainObject(options['value']) && options['value']['text']) {
            self.value(options['value']['text']);
        }
    };

    TextField.type = '1';

    Field.TextField = TextField;

})(__webpack_require__(0), __webpack_require__(7));


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 讨论版Model
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        forum = smarket.api.forum;

    function ForumInfoViewModel(topicId) {
        var self = this;

        BaseViewModel.apply(self);

        //讨论版ID
        self.topicId = ko.observable(topicId);
        //标题
        self.topicTitle = ko.observable();
        //主贴+回贴的总数
        self.totalNum = ko.observable(0);
        //发贴总人数
        self.postNum = ko.observable(0);
        //回贴总数
        self.replyNum = ko.observable(0);
        //主贴总数
        self.mainNum = ko.observable(0);
        //点赞总数
        self.likeNum = ko.observable(0);
        //版块富文本介绍
        self.Description = ko.observable();
        //定制注册表单的配置参数1
        self.memberId = ko.observable();
        //定制注册表单的配置参数2
        self.configId = ko.observable();
    }

    ForumInfoViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = ForumInfoViewModel.prototype;
    proto.constructor = ForumInfoViewModel;

    proto.init = function (topic) {
        var self = this;

        self.topicId(topic.topicId);
        self.topicTitle(topic.title);
        self.totalNum(topic.totalNum);
        self.postNum(topic.postNum);
        self.replyNum(topic.replyNum);
        self.mainNum(topic.mainNum);
        self.likeNum(topic.likeNum);
        self.Description(topic.intro);
    };

    proto.get = function (topicId) {
        return forum.getTopic(topicId);
    };

    proto.preLoad = smarket.noop;

    proto.afterLoad = function () {
        return true;
    };

    proto.load = function () {
        var self = this;
        self.preLoad();
        return self.get(self.topicId()).then(function (data) {
            if (data && data.content) {
                self.init(data.content);
            }
            self.afterLoad();
        });
    };

    //获取为论坛下的子版
    proto.getSection = function (topicId, keyword) {
        return forum.getSections(topicId,keyword);
    };
    

    //重写ForumInfoViewModel
    ForumInfoViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    viewModel.ForumInfoViewModel = ForumInfoViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(12),__webpack_require__(3));

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 点赞model
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        forum = smarket.api.forum;

    function LikeViewModel() {
        var self = this;
        BaseViewModel.apply(self);
        self.postIds = ko.observableArray();
        self.openId = ko.observable();
        self.cookieId = ko.observable();
        self.sess = ko.observable();
    }

    LikeViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = LikeViewModel.prototype;
    proto.constructor = LikeViewModel;

    proto.preLoad = smarket.noop;

    proto.afterLoad = function () {
        return true;
    };

    proto.like = function (postIds, openId, cookieId, sess) {
        return forum.postLike(postIds, openId, cookieId, sess);
    };

    LikeViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    LikeViewModel.extend({
        beforeCreateHandler: smarket.noop,
        afterCreateHandler: smarket.noop
    });

    viewModel.LikeViewModel = LikeViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(12),__webpack_require__(3));

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 帖子model
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        topic = smarket.api.topic,
        isSubmitting = false;

    function ReplyViewModel() {
        var self = this;
        BaseViewModel.apply(self);
        self.postId = ko.observable();
        self.createrPic = ko.observable();
        self.parentId = ko.observable();
        self.content = ko.observable();
        self.memberId = ko.observable();
        self.openId = ko.observable();
        self.nickname = ko.observable();
        self.likeNum = ko.observable();
        self.replyNum = ko.observable();
        self.name = ko.observable();
        self.unique = ko.observable();
        self.createTime = ko.observable();
        self.sectionId = ko.observable();
        self.canLike = ko.observable();
        self.sectionName = ko.observable();
        self.replyInfo = ko.observableArray();
    }

    ReplyViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = ReplyViewModel.prototype;
    proto.constructor = ReplyViewModel;

    proto.init = function (post) {
        var self = this;
        self.postId(post.postId);
        self.createrPic(post.createrPic);
        self.parentId(post.parentId);
        self.content(post.content);
        self.memberId(post.memberId);
        self.openId(post.openId);
        self.nickname(post.nickname);
        self.likeNum(post.likeNum);
        self.replyNum(post.replyNum);
        self.name(post.name);
        self.unique(post.unique);
        self.createTime(post.createTime);
        self.sectionId(post.sectionId);
        self.canLike(post.canLike);
        self.sectionName(post.sectionName);
        self.replyInfo(post.replyInfo);
    };

    proto.load = function () {
        var self = this;

        return topic.get([self.topicId()]).then(function (data) {
            self.init(data.content);
            return data;
        }, function (data) {
            return data;
        });
    };
    //创建帖子
    proto.create = function (sess) {
        var self = this, isValid = true,
            submitData = {
                "topicId": self.topicId,
                "tenantId": self.tenantId,
                "nodeId": self.nodeId,
                "moduleId": self.moduleId,
                "instanceId": self.instanceId,
                "sectionId": self.sectionId,
                "enableReply": self.enableReply,
                "isAnonymous": self.isAnonymous,
                "title": self.title,
                "attachements": self.attachements,
                "content": self.content,
                "postId": self.postId,
                "openId": self.openId,
                "cookieId": self.cookieId,
                "nickname": self.nickname,
                "createrPic": self.createrPic,
                "sess": sess
            };

        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        if (isValid) {
            self.beforeCreateHandler(submitData);

            return topic.createPost(submitData).then(function (data) {
                self.afterCreateHandler(data);
                isSubmitting = false;
            }, function (data) {
                self.afterCreateHandler(data);
                isSubmitting = false;
            });
        } else {
            isSubmitting = false;
        }
    };

    //重写PostViewModel
    ReplyViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    ReplyViewModel.extend({
        beforeCreateHandler: smarket.noop,
        afterCreateHandler: smarket.noop
    });

    viewModel.ReplyViewModel = ReplyViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(12), __webpack_require__(3));


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 微论坛Model
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        forum = smarket.api.forum;

    function ReplyListViewModel(topicId) {
        var self = this;
        BaseViewModel.apply(self);
        self.topicId = ko.observable(topicId);
        self.isAll = ko.observable();
        self.openId = ko.observable();
        self.start = ko.observable(0);
        self.num = ko.observable(0);
        self.cookieId = ko.observable();
        self.sess = ko.observable();

        self.total = ko.observable();
        self.replyList = ko.observableArray();
    }

    ReplyListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = ReplyListViewModel.prototype;
    proto.constructor = ReplyListViewModel;

    proto.init = function (data) {
        var self = this;
        var list = self.replyList() ,items = [];
        if (data.content)
        {
            var content = data.content;
            self.total (content.total);
            items = content.items;
            for (var i = 0; i <items.length; i ++)
            {
                var topicid = items[i].topicId;
                var item = new smarket.viewModel.ReplyViewModel(topicid);
                item.init(items[i]);
                list.push(item);
            }
            self.replyList(list);
        }
    };

    proto.preLoad = smarket.noop;

    proto.afterLoad = function () {
        return true;
    };

    proto.get = function (topicId, openId, cookieId, start, num, isAll, sess) {
        return forum.getReplyList(topicId, openId, cookieId, start, num, isAll, sess);
    };

    //加载数据
    proto.load = function () {
        var self = this;
        self.preLoad();
        return self.get(self.topicId(), self.openId(), self.cookieId(), self.start(), self.num(), self.isAll(), self.sess).then(function (data) {
            self.init(data);
            self.afterLoad();
        });

    };
    //ReplyListViewModel
    ReplyListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    ReplyListViewModel.extend({
        beforeCreateHandler: smarket.noop,
        afterCreateHandler: smarket.noop
    });

    viewModel.ReplyListViewModel = ReplyListViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(12),__webpack_require__(3));

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 讨论版Model
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel;

    function TopicItemViewModel(topicId) {
        var self = this;

        BaseViewModel.apply(self);

        //讨论版ID
        self.topicId = ko.observable(topicId);
        //1-留言版 2-微讨论 3-评论区
        self.type = ko.observable();
        //标题
        self.topicTitle = ko.observable();
        //创建时间
        self.createTime = ko.observable();
        //创建时间格式化字符串
        self.createTimeStr = ko.observable();
        //最后更新时间
        self.lastUpdateTime = ko.observable();
        //状态
        self.isDeleted = ko.observable();
        //是否开启
        self.isOpen = ko.observable();
        //是否允许删除帖子
        self.enableDelete = ko.observable();
        //是否需要审核
        self.enableCheck = ko.observable();
        //允许点赞
        self.enableLike = ko.observable();
        //允许主帖附加图片
        self.enableAttachment = ko.observable();
        //发帖限制
        self.postIdentity = ko.observable();
        //发帖需登录的表单
        self.postIdentityExtra = ko.observable();
        //回帖限制
        self.replyIdentity = ko.observable();
        //是否可回复
        self.enableReply = ko.observable();
        //模块Id
        self.moduleId = ko.observable();
        //节点Id
        self.nodeId = ko.observable();
        //体系Id
        self.schemaId = ko.observable();
        self.trackId = ko.observable();
        //实例Id
        self.instanceId = ko.observable();
        //租户Id
        self.tenantId = ko.observable();
        //帖子总数
        self.totalNum = ko.observable(0);
        //今日帖子数
        self.totalTodayNum = ko.observable(0);
        //一周帖子数
        self.totalWeekNum = ko.observable(0);
        //发帖人数
        self.totalPosterNum = ko.observable(0);
        //今日发帖人数
        self.totalPostTotalNum = ko.observable(0);
        //一周发贴人数
        self.totalPostWeekNum = ko.observable(0);
        //回帖总数
        self.totalReplyPostNum = ko.observable(0);
        //发布帖子列表
        self.postList =  ko.observableArray();

        //版块富文本介绍
        self.Description = ko.observable();
        self.sections = ko.observableArray();//子版块列表
        //注册表单的配置参数
        self.memberId = ko.observable();
        self.configId = ko.observable();
    }

    function PostViewModel(data) {
        var self = this;
        self.postId = ko.observable(data.postId);
        //帖子内容
        self.content = ko.observable(data.content);
        //点赞总数
        self.likeNum = ko.observable(data.likeNum);
        self.lastUpdateTime = ko.observable(data.lastUpdateTime);
        //回复总数
        self.replyNum = ko.observable(data.replyNum);
        //帖子标题
        self.title = ko.observable(data.title);
        self.timeStr = ko.observable(data.timeStr);
        //发帖人名称
        self.creator = ko.observable(data.creator);
        self.floor = ko.observable(data.floor);
        self.ip = ko.observable(data.ip);
        self.isHot = ko.observable(data.isHot);
        self.isTop = ko.observable(data.isTop);
        self.likeNum = ko.observable(data.likeNum);
        //发帖人昵称
        self.nickname = ko.observable(data.nickname);
        self.topicId = ko.observable(data.topicId);
    }
    function SectionViewModel(data) {
        var self = this;
        self.sectionId = ko.observable(data.sectionId);
        self.topicId = ko.observable(data.topicId);
        self.sectionName = ko.observable(data.sectionName);
        self.postNum = ko.observable(data.postNum);
        self.isOpen = ko.observable(data.isOpen);
        self.isDeleted = ko.observable(data.isDeleted);
        self.createTime = ko.observable(data.createTime);
        self.lastUpdateTime  = ko.observable(data.lastUpdateTime);
        self.creator  = ko.observable(data.creator);
        self.orderNum  = ko.observable(data.orderNum);
    }
    TopicItemViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = TopicItemViewModel.prototype;
    proto.constructor = TopicItemViewModel;

    proto.init = function (topic) {
        var self = this;

        self.topicId(topic.topicId);
        self.type(topic.type);
        self.topicTitle(topic.title);
        self.createTime(topic.createTime);
        self.createTimeStr(topic.createTimeStr);
        self.lastUpdateTime(topic.lastUpdateTime);
        self.isDeleted(topic.isDeleted);
        self.isOpen(topic.isOpen);
        self.enableDelete(topic.enableDelete == 1 || topic.enableDelete == 'true');
        self.enableCheck(topic.enableCheck == '1' || topic.enableCheck == 'true');
        self.enableLike(topic.enableLike == '1' || topic.enableLike == 'true');
        self.enableAttachment(topic.enableAttachment == '1' || topic.enableAttachment == 'true');
        self.postIdentity(topic.postIdentity);
        self.postIdentityExtra(topic.postIdentityExtra);
        self.replyIdentity(topic.replyIdentity);
        self.enableReply(topic.enableReply == '1' || topic.enableReply == 'true');
        self.moduleId(topic.moduleId);
        self.nodeId(topic.nodeId);
        self.schemaId(topic.schemaId);
        self.instanceId(topic.instanceId);
        self.trackId(topic.trackId);
        self.tenantId(topic.tenantId);
        self.totalNum(topic.totalNum);
        self.totalTodayNum(topic.totalTodayNum);
        self.totalWeekNum(topic.totalWeekNum);
        self.totalPosterNum(topic.totalPosterNum);
        self.totalPostTotalNum(topic.totalPostTotalNum);
        self.totalPostWeekNum(topic.totalPostWeekNum);
        self.totalReplyPostNum(topic.totalReplyPostNum);
        if (topic.postList) {
            var items = topic.postList;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                self.postList().push(new PostViewModel(item));
            }
        }
        self.Description(topic.intro);
        // self.Description("移动互联网的爆发式增长，加速了移动办公的实现，但这也给很多企业，尤其是中小企业提出了更高的要求！那么，搭建一套怎样的协作系统才能在提升客户满意度和企业自身生产力的同时，也能增强员工协同能力并控制企业成本呢？在本期思享家微话题中，思科资深技术顾问王棣，就为您解读和分享思科最新、最热的中小企业协作解决方案，为您打造一个强大的专属协作平台！快点击下方“发言”，开始与专家交流吧！" +
        //     "工程师介绍" +
        //     "<span data-bind=\"html:EngineerIntro()\"><p style=\"text-align:left;\">王棣，思科资深技术顾问，拥有近20年通信行业从业经验，涵盖语音业务，网真与个人视频通信在金融、医疗等行业的解决方案，现任思科协作产品研发部门的资深技术顾问。</p><p style=\"text-align:left;\"><img alt=\"\" src=\"http://ciscofile.uao-online.com/eventeditor/11.jpg\"></p></span>");

        if (topic.sections)
        {
            var items = topic.sections;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                self.sections().push(new SectionViewModel(item));
            }
        }
    };
    

    //重写TopicItemViewModel
    TopicItemViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    TopicItemViewModel.extend({
        beforeCreateHandler: smarket.noop,
        afterCreateHandler: smarket.noop
    });

    viewModel.TopicItemViewModel = TopicItemViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1),__webpack_require__(12),__webpack_require__(3));

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 微论坛Model
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel,
        forum = smarket.api.forum;

    function TopicListViewModel(tenantId) {
        var self = this;

        BaseViewModel.apply(self);

        var type = 0, moduleId = 0, instanceId = 0, start = 0,
            num = 10, isHide = 0;
        //1-留言版 2-微讨论 3-评论区
        self.type = ko.observable(type);
        //租户ID
        self.tenantId = ko.observable(tenantId);
        //模块ID
        self.moduleId = ko.observable(moduleId);
        //实例ID
        self.instanceId = ko.observable(instanceId);
        //开始位置
        self.start = ko.observable(start);
        //取值数量
        self.num = ko.observable(num);
        //是否隐藏
        self.isHide = ko.observable(isHide);
        //版块列表
        self.DiscussQuestions = ko.observableArray();
        //总版块数量
        self.TopicCount = ko.observable(0);
        //微论坛主帖数量
        self.totalForumPostNum = ko.observable(0);
        //微论坛回帖数量
        self.totalForumReplyPostNum = ko.observable(0);
    }

    TopicListViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = TopicListViewModel.prototype;
    proto.constructor = TopicListViewModel;

    proto.init = function (data) {
        var self = this;
        var list = self.DiscussQuestions(), items = [];
        if (data.content) {
            var content = data.content;
            self.TopicCount(content.total);
            self.totalForumPostNum(content.totalForumPostNum);
            self.totalForumReplyPostNum(content.totalForumReplyPostNum);
            items = content.items;
            for (var i = 0; i < items.length; i++) {
                var topicid = items[i].topicId;
                var item = new smarket.viewModel.TopicItemViewModel(topicid);
                item.init(items[i]);
                list.push(item);
            }
            self.DiscussQuestions(list);
        }
    };

    proto.preLoad = function () {
        return smarket.noop();
    };

    proto.afterLoad = function () {
        return true;
    };

    proto.get = function (type, tenantId, moduleId, instanceId, start, num, isHide) {
        return forum.getAllTopics(type, tenantId, moduleId, instanceId, start, num, isHide);
    };

    //加载数据
    proto.load = function () {
        var self = this;
        self.preLoad();
        return self.get(self.type(), self.tenantId(), self.moduleId(), self.instanceId(), self.start(), self.num(), self.isHide()).then(function (data) {
            self.init(data);
            self.afterLoad();
        });

    };
    //重写TopicListViewModel
    TopicListViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };

    TopicListViewModel.extend({
        beforeCreateHandler: smarket.noop,
        afterCreateHandler: smarket.noop
    });

    viewModel.TopicListViewModel = TopicListViewModel;
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(12), __webpack_require__(3));

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/8.
 */
;'use strict';
(function (question, $, Option) {
    function CheckBoxImageQuestionModel(questionInfo) {
        question.call(this, questionInfo);
        var self = this;
        self.options = ko.observableArray();
    }

    var proto = CheckBoxImageQuestionModel.prototype = $.extend(true, {}, question.prototype);
    proto.constructor = CheckBoxImageQuestionModel;
    //初始化Value字段
    proto.initValue = function (initValue) {
        var self = this;
        self.value = ko.observableArray(initValue || '');

        if (self.questionInfo.options) {
            $.each(self.questionInfo.options, function(idx, optionInfo){
                self.options.push(new Option(optionInfo, self));
                if(optionInfo.isDefault == 1){
                    self.value(optionInfo.optionId + '');
                }
            });
        }
    };

    proto.answer = function () {
        var self = this,
            options = self.options(),
            optionAnswer = [],
            result = question.prototype.answer.apply(self, arguments),
            oldAnswer = result.answer;
        delete result.answer;
        if($.isArray(oldAnswer)){
            $.each(oldAnswer, function(idx, oldOption){
                $.each(options, function (idx, option) {
                    var answer = {};
                    if (option.id == oldOption) {
                        if (option.hasAnswer) {
                            answer["text"] = option.answer();
                        }
                        answer["optionId"] = option.id;
                        optionAnswer.push(answer);
                    }
                });
            });
        }

        result.options = optionAnswer;
        return result;
    };

    CheckBoxImageQuestionModel.type = 10;
    question.register(CheckBoxImageQuestionModel);
})(__webpack_require__(9), __webpack_require__(1), __webpack_require__(13));

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/8.
 */
;'use strict';
(function (question, $, Option) {
    function CheckBoxQuestionModel(questionInfo) {
        question.call(this, questionInfo);
        var self = this;
        self.options = ko.observableArray();
    }

    var proto = CheckBoxQuestionModel.prototype = $.extend(true, {}, question.prototype);
    proto.constructor = CheckBoxQuestionModel;
    //初始化Value字段
    proto.initValue = function (initValue) {
        var self = this;
        self.value = ko.observableArray(initValue || '');

        if (self.questionInfo.options) {
            $.each(self.questionInfo.options, function(idx, optionInfo){
                self.options.push(new Option(optionInfo, self));
                if(optionInfo.isDefault == 1){
                    self.value(optionInfo.optionId + '');
                }
            });
        }
    };

    proto.answer = function () {
        var self = this,
            options = self.options(),
            optionAnswer = [],
            result = question.prototype.answer.apply(self, arguments),
            oldAnswer = result.answer;
        delete result.answer;
        if($.isArray(oldAnswer)){
            $.each(oldAnswer, function(idx, oldOption){
                $.each(options, function (idx, option) {
                    var answer = {};
                    if (option.id == oldOption) {
                        if (option.hasAnswer) {
                            answer["text"] = option.answer();
                        }
                        answer["optionId"] = option.id;
                        optionAnswer.push(answer);
                    }
                });
            });
        }

        result.options = optionAnswer;
        return result;
    };

    CheckBoxQuestionModel.type = 2;
    question.register(CheckBoxQuestionModel);
})(__webpack_require__(9), __webpack_require__(1), __webpack_require__(13));

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/8.
 */
/**
 * Created by bantenio on 2017/1/8.
 */
;'use strict';
(function (question, $, Option) {
    function DropDownQuestionModel(questionInfo) {
        question.call(this, questionInfo);
        var self = this;
        self.options = ko.observableArray();
        self.options.push(new Option({
            optionId: '',
            title: '请选择',
            isDefault: ko.observable(false)
        }, self));
    }

    var proto = DropDownQuestionModel.prototype = $.extend(true, {}, question.prototype);
    proto.constructor = DropDownQuestionModel;
    //初始化Value字段
    proto.initValue = function (initValue) {
        var self = this;
        self.chooseValue = self.value = ko.observableArray(initValue || '');
        if (self.questionInfo.options) {
            $.each(self.questionInfo.options, function (idx, optionInfo) {
                self.options.push(new Option(optionInfo, self));
                if (optionInfo.isDefault == 1) {
                    self.value(optionInfo.optionId + '');
                }
            });
        }
        self.selectedText = ko.computed({
            read: function () {
                if (self.chooseValue() != '' && self.chooseValue() != undefined) {
                    for (var i = 0; i < self.options().length; i++) {
                        if (self.options()[i].id == self.chooseValue()) {
                            return self.options()[i].content;
                        }
                    }
                } else {
                    for (var i = 0; i < self.options().length; i++) {
                        if (self.options()[i].isDefault()) {
                            self.chooseValue(self.options()[i].id);
                            return self.options()[i].content;
                        }
                    }
                }
                return "请选择";
            },
            write: function () {

            },
            owner: self
        });
    };

    proto.answer = function () {
        var self = this,
        options = self.options(),
        optionAnswer = [],
        result = question.prototype.answer.apply(self, arguments),
        oldAnswer = result.answer;
        delete result.answer;
        $.each(options, function (idx, option) {
            var answer = {};
            if (option.id == oldAnswer) {
                if (option.hasAnswer) {
                    answer["text"] = option.answer();
                }
                answer["optionId"] = option.id;
                optionAnswer.push(answer);
            }
        });
        result.options = optionAnswer;
        return result;
    };

    DropDownQuestionModel.type = 5;
    question.register(DropDownQuestionModel);
})(__webpack_require__(9), __webpack_require__(1), __webpack_require__(13));

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/9.
 */
;
'use strict';
var question = __webpack_require__(9),
    $ = __webpack_require__(1),
    ko = __webpack_require__(2),
    smarket = __webpack_require__(0),
    uploadQuestionModel = __webpack_require__(34),
    account = smarket.api.account;

(function (smarket, ko, $, question, uploadQuestionModel) {
    function ImageUploadQuestionModel(questionInfo) {
        var self = this;
        uploadQuestionModel.call(self, questionInfo);
        self.fileTypeChecker = function (file) {
            return /(.jpg|.png|.gif|.ps|.jpeg)$/.test(file.name.toLowerCase());
        };//缩放比例
        self.ratio = questionInfo["ratio"];
        self.mapId = '';
        self.cropUrl = ko.observable("");
        self.width = ko.observable(500);
        self.height = ko.observable(500);
        self.cropCoords = {
            x: 0,
            x2: self.width(),
            y: 0,
            y2: self.height()
        };
        self.crop = {};
        self._cropEl = ko.observable();
        self._cropDialogEl = ko.observable();
    }

    var proto = ImageUploadQuestionModel.prototype = $.extend(true, {}, uploadQuestionModel.prototype);
    proto.constructor = ImageUploadQuestionModel;

    proto.remove = function () {
        var self = this;
        uploadQuestionModel.prototype.remove.call(self);
        self.cropUrl("");
    };

    proto.onUploaded = function (result) {
        var self = this;
        self.loadCrop();

        if (self.ratio == 0) {
            self.cropUrl(result['body']["content"]["url"]);
            self.isAnswered(true);
        } else {
            self.cropUrl(result['body']["content"]["url"]);
            self.mapId(result['body']["content"]["mappingId"]);
            //计算图片高宽
            var img = new Image();
            img.src = result['body']["content"]["url"];
            img.onload = function () {
                if (self.ratio > 1) {
                    if (img.width > Math.floor(img.height * self.ratio)) {
                        self.width(Math.floor(img.height * self.ratio));
                        self.height(img.height);
                    } else {
                        self.width(img.width);
                        self.height(Math.floor(img.width / self.ratio));
                    }
                } else {
                    if (img.width > Math.floor(img.height * self.ratio)) {
                        self.width(Math.floor(img.height * self.ratio));
                        self.height(img.height);
                    } else {
                        self.width(img.width);
                        self.height(Math.floor(img.width / self.ratio));
                    }
                }
                self.loadCrop();
            };
            $(self._cropDialogEl()).modal('show');
        }
    };

    proto.loadCrop = function () {
        var self = this;
        if (self.crop && self.crop.destroy && typeof self.crop.destroy === "function") {
            self.crop.destroy();
        }
        self.cropCoords = {
            x: 0,
            x2: self.width(),
            y: 0,
            y2: Math.floor(self.width() / question["ratio"])
        };
        $(self._cropEl()).Jcrop({
            aspectRatio: question["ratio"],
            boxWidth: 560,
            setSelect: [self.cropCoords['x'], self.cropCoords['y'], self.cropCoords['x2'], self.cropCoords['y2']],
            onSelect: function (coords) {
                self.cropCoords['x'] = coords['x'];
                self.cropCoords['x2'] = coords['x2'];
                self.cropCoords['y'] = coords['y'];
                self.cropCoords['y2'] = coords['y2'];
            }
        }, function () {
            self.crop = this;
        });
    };

    proto.cropImage = function () {
        var self = this;
        account.cropImage(self.mapId, self.cropCoords).then(function (result) {
            if (result["result"] == 0) {
                self.value(result["content"]["mappingId"]);
                self.url(result["content"]["url"]);
                self.cropUrl(result["content"]["url"]);
                self.isAnswered(true);
                self.loadCrop();
            } else {
                alert("图片裁剪失败:" + result["desc"]);
            }
        }, function (result) {
            console.log(result.desc);
        });
    };

    ImageUploadQuestionModel.type = 8;
    question.register(ImageUploadQuestionModel);
})(smarket, ko, $, question, uploadQuestionModel);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/3.
 */
module.exports = (function (Question) {
    return Question;
})(__webpack_require__(9),
    __webpack_require__(119),
    __webpack_require__(118),
    __webpack_require__(113),
    __webpack_require__(114),
    __webpack_require__(117),
    __webpack_require__(112),
    __webpack_require__(34),
    __webpack_require__(115));

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/6.
 */
;'use strict';
(function (question, $, Option) {
    function RadioImageQuestionModel(questionInfo) {
        question.call(this, questionInfo);
        var self = this;
        self.options = ko.observableArray();
    }

    var proto = RadioImageQuestionModel.prototype = $.extend(true, {}, question.prototype);
    proto.constructor = RadioImageQuestionModel;
    //初始化Value字段
    proto.initValue = function (initValue) {
        var self = this;
        self.value = ko.observableArray(initValue || '');
        if (self.questionInfo.options) {
            $.each(self.questionInfo.options, function(idx, optionInfo){
                self.options.push(new Option(optionInfo, self));
                if(optionInfo.isDefault == 1){
                    self.value(optionInfo.optionId + '');
                }
            });
        }
    };

    proto.answer = function () {
        var self = this,
            options = self.options(),
            optionAnswer = [],
            result = question.prototype.answer.apply(self, arguments),
            oldAnswer = result.answer;
        delete result.answer;
        $.each(options, function (idx, option) {
            var answer = {};
            if (option.id == oldAnswer) {
                if (option.hasAnswer) {
                    answer["text"] = option.answer();
                }
                answer["optionId"] = option.id;
                optionAnswer.push(answer);
            }
        });
        result.options = optionAnswer;
        return result;
    };

    RadioImageQuestionModel.type = 9;
    question.register(RadioImageQuestionModel);
})(__webpack_require__(9), __webpack_require__(1), __webpack_require__(13));

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/6.
 */
;'use strict';
(function (question, $, Option) {
    function RadioQuestionModel(questionInfo) {
        question.call(this, questionInfo);
        var self = this;
        self.options = ko.observableArray();
    }

    var proto = RadioQuestionModel.prototype = $.extend(true, {}, question.prototype);
    proto.constructor = RadioQuestionModel;
    //初始化Value字段
    proto.initValue = function (initValue) {
        var self = this;
        self.value = ko.observableArray(initValue || '');
        if (self.questionInfo.options) {
            $.each(self.questionInfo.options, function(idx, optionInfo){
                self.options.push(new Option(optionInfo, self));
                if(optionInfo.isDefault == 1){
                    self.value(optionInfo.optionId + '');
                }
            });
        }
    };

    proto.answer = function () {
        var self = this,
            options = self.options(),
            optionAnswer = [],
            result = question.prototype.answer.apply(self, arguments),
            oldAnswer = result.answer;
        delete result.answer;
        $.each(options, function (idx, option) {
            var answer = {};
            if (option.id == oldAnswer) {
                if (option.hasAnswer) {
                    answer["text"] = option.answer();
                }
                answer["optionId"] = option.id;
                optionAnswer.push(answer);
            }
        });
        result.options = optionAnswer;
        return result;
    };

    RadioQuestionModel.type = 1;
    question.register(RadioQuestionModel);
})(__webpack_require__(9), __webpack_require__(1), __webpack_require__(13));

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2017/1/6.
 */
;'use strict';
(function (question, $) {
    //单行文本
    function TextQuestionModel(questionInfo) {
        question.call(this, questionInfo);
    }

    var proto = TextQuestionModel.prototype = $.extend(true, {}, question.prototype);
    proto.constructor = TextQuestionModel;
    TextQuestionModel.type = 4;
    question.register(TextQuestionModel);
    //文本域
    function TextAreaQuestionModel(questionInfo) {
        question.call(this, questionInfo);
    }

    proto = TextAreaQuestionModel.prototype = $.extend(true, {}, question.prototype);
    proto.constructor = TextAreaQuestionModel;
    TextAreaQuestionModel.type = 3;
    question.register(TextAreaQuestionModel);
})(__webpack_require__(9), __webpack_require__(1));


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by qilongie on 2017/1/4.
 */
;
'use strict';
(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel;

    //创建投票实体
    function VoteOptionViewModel(Id) {
        var self = this;
        BaseViewModel.apply(self);
        self.optionId = Id;
        self.title = ko.observable();
        self.picUrl = ko.observable();
        self.picMapId = ko.observable();
    }

    VoteOptionViewModel.prototype = $.extend(true, {}, BaseViewModel.prototype);
    var proto = VoteOptionViewModel.prototype;
    proto.constructor = VoteOptionViewModel;
    //初始化数据
    proto.init = function (question) {
        var self = this;
        self.title(question["title"]);
        self.picUrl(question["picUrl"]);
        self.picMapId(question["picMapId"]);
    };

    //重写QuestionViewModel
    VoteOptionViewModel.extend = function (_proto) {
        $.each(_proto, function (idx, val) {
            proto[idx] = val;
        });
    };
    viewModel.VoteOptionViewModel = VoteOptionViewModel;

})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(3));


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by xuyanru on 2017/2/10.
 */

(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel;
    var liveModel = viewModel.liveModel = {};

    liveModel.BasicInfo = function () {
        var self = this;
        BaseViewModel.apply(self);
        self.visible = ko.observable(false);
        self.title = ko.observable('会议标题');
        self.description = ko.observable('');
        self.descShowAll = ko.observable(false);
        self.sponsor = ko.observable('主办方');
        self.logoSrc = ko.observable('../images/default_logo.png');
        self.startTime = ko.observable('');
        self.endTime = ko.observable('');
        self.userOnline = ko.observable(0);
        //倒计时
        self.countdown = ko.observable('');
        //会议状态
        self.status = ko.observable(0);//0:未开始,1:会议中,2:已结束
        //是否可以参会
        self.canJoin = ko.observable(false);
        //是否可以报名
        self.canSignUp= ko.observable(true);
        //是否登录
        self.isLogin = ko.observable(false);
        //是否报名
        self.isSignUp = ko.observable(false);
        //已经结束
        self.meetingClosed = ko.observable(true)
    };

    liveModel.Tips = function() {
        var self = this;
        BaseViewModel.apply(self);
        self.visible = ko.observable(false);
        self.icon = ko.observable(0);//0:失败 1:成功
        self.content = ko.observable('');
    };

    liveModel.Video = function () {
        var self = this;
        BaseViewModel.apply(self);
        self.html = ko.observable('video');
        self.visible = ko.observable(true);
    };

    liveModel.Doc = function() {
        var self = this;
        BaseViewModel.apply(self);
        self.html = ko.observable('doc');
        self.visible = ko.observable(true);
    };

    //互动问答
    liveModel.Qa = function() {
        var self = this;
        BaseViewModel.apply(self);
        self.list = ko.observableArray([]);
        self.myList = ko.observableArray([]);
        self.remove = function (id) {
            var qaList = this.list();
            var index = -1;
            for (var i in qaList) {
                if (qaList[i].id == id) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                this.list.splice(index, 1);
            }
        };
        self.order = function () {
            //qaVM.qaList.sort(function (a, b) { return parseInt(a.submitTime) - parseInt(b.submitTime) });
            this.list.sort(function (a, b) {
                return parseInt(a.submitTime) - parseInt(b.submitTime);
            });
        };
        self.addQa = function (qa) {
            this.list.push(qa);
        };
        self.addMyQa = function (qa) {//添加自己的问题，分别填充到qaList和myQaList
            //qaList
            var qaList = this.list();
            var pushFlag = true;    //是否插入该条数据
            var index = -1;
            for (var i in qaList) {
                if ($.objectEqual(qa, qaList[i])) {
                    pushFlag = false;
                }
                if (qaList[i].submitor == qa.submitor && qaList[i].question == qa.question && !qaList[i].id) {//本地记录
                    index = parseInt(i);
                    break;
                }
            }
            if (index > -1) {
                this.list.splice(index, 1, qa);
            } else if (pushFlag) {
                this.list.push(qa);
            }
            //myQaList
            pushFlag = true;
            index = -1;
            var myQaList = this.myList();
            for (var i in myQaList) {
                if ($.objectEqual(qa, myQaList[i])) {
                    pushFlag = false;
                }
                if (myQaList[i].question == qa.question && !myQaList[i].id) {//本地记录
                    index = parseInt(i);
                    break;
                }
            }
            if (index > -1) {
                this.myList.splice(index, 1, qa);
            } else if (pushFlag) {
                this.myList.push(qa);
            }
        };
        self.addList = function (qaList, uid) {//获取qa列表后，填充到qaList和myQaList，并且避免了myQaList重复
            for (var i in qaList) {
                var allQaList = this.list();
                var flag = true;
                for (var j in allQaList) {
                    if ($.objectEqual(allQaList[j], qaList[i])) {
                        flag = false;
                    }
                }
                if (flag) {
                    this.list.push(qaList[i]);
                }
                if (qaList[i].qaownerId == uid) {
                    var myQaList = this.myList();
                    var flag = true;
                    for (var j in myQaList) {
                        if ($.objectEqual(myQaList[j], qaList[i])) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        this.myList.push(qaList[i]);
                    }
                }
            }
        };
        self.recoveryMyList = function (myQaList) {
            this.myList([]);
            for (var i in myQaList) {
                this.myList.push(myQaList[i]);
            }
        };
        //发送表情
        self.emoticonVisible = ko.observable(false);
        self.emoticonArray = ko.observableArray([]);
        self.pageIndex = ko.observable(0);
        self.pagePrev = function () {
            if (this.pageIndex() > 0) {
                this.pageIndex(this.pageIndex() - 1);
            }
        };
        self.pageNext = function () {
            if (this.pageIndex() < 3) {
                this.pageIndex(this.pageIndex() + 1);
            }
        };
        self.content = ko.observable('');
        self.gag = ko.observable(false);
        self.cursorIndex = ko.observable(0);
        self.insertEmoticon = function (data) {

            var beforeStr = self.content().substr(0, self.cursorIndex());
            var afterStr = self.content().substr(self.cursorIndex(), self.content().length);
            self.content(beforeStr + data + afterStr);
            self.cursorIndex((beforeStr + data).length);
        };
        self.backspace = function () {
            var content = this.content();
            if (content.length > 0) {
                if (content.length >= 6) {
                    var reg = new RegExp(/【#\d{3}】/);
                    var last6 = content.substr(content.length - 6);
                    if (reg.test(last6)) {
                        this.content(content.substr(0, content.length - 6));
                    } else {
                        this.content(content.substr(0, content.length - 1));
                    }
                }
                else {
                    this.content(content.substr(0, content.length - 1));
                }
            }
        }
    };

    //在线用户
    liveModel.User = function() {
        var self = this;
        BaseViewModel.apply(self);
        self.visible = ko.observable(true);
        self.list = ko.observableArray([]);
    };

    //资源列表
    liveModel.Resource = function() {
        var self = this;
        BaseViewModel.apply(self);
        self.visible = ko.observable(false);
        self.list = ko.observableArray([]);
    };

    //会议日程
    liveModel.Agenda = function () {
        var self = this;
        BaseViewModel.apply(self);
        self.visible = ko.observable(true);
        self.list = ko.observableArray([]);
    };

    //演讲嘉宾
    liveModel.Speaker = function() {
        var self = this;
        BaseViewModel.apply(self);
        self.visible = ko.observable(true);
        self.list = ko.observableArray([]);
        self.detail = ko.observable({});
        self.detailVisible = ko.observable(false);
        self.detailShowMore = ko.observable(false);
        self.detailIntroLength = ko.observable(0);
    };

    //系统消息
    liveModel.Message = function() {
        var self = this;
        BaseViewModel.apply(self);
        self.visible = ko.observable(false);
        self.content = ko.observable('')
    };

    //投票
    liveModel.Vote = function() {
        var self = this;
        BaseViewModel.apply(self);
        self.visible = ko.observable(false);
        self.voteIds = [];
        self.currentVoteId = '';
        self.closeVoteIds = [];
        self.src = ko.observable('');
        self.require = ko.observable(false);
        self.list = [];
    };

    //抽奖
    liveModel.Lottery = function() {
        var self = this;
        BaseViewModel.apply(self);
        //根据奖项分的组
        self.group = ko.observableArray([]);
        //当前抽奖状态 0:无状态 1:开始抽奖 2:结束抽奖
        self.status = ko.observable(0);
        //显示抽奖记录
        self.recordVisible = ko.observable(false);
        //当前奖项标识
        self.currentAwardId = ko.observable('');
        //当前奖项名称
        self.currentAwardName = ko.observable('');
        //当前获奖者ID数组
        self.currentLucker = ko.observableArray([]);
        //需要隐藏的获奖者ID数组
        self.hideLuckerIds = ko.observableArray([]);
        //所有获奖者的集合(已排重)
        self.allLucker = ko.observableArray([]);
        //我是否中奖
        self.iAmWinner = ko.observable(false);
    };

    //问卷
    liveModel.Questionnaire = function() {
        var self = this;
        BaseViewModel.apply(self);
        self.visible = ko.observable(false);
        //是否有问卷
        self.has = ko.observable(false);
        //问卷地址
        self.src = ko.observable('javascript:;');
        //问卷ID
        self.id = ko.observable('');
    };

    //viewModel.liveModel = liveModel;


})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(39), __webpack_require__(3));


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by Administrator on 2017/4/6.
 */

(function (smarket, ko, $) {
    if (!smarket || !smarket.api || !smarket.viewModel) {
        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
    }

    var viewModel = smarket.viewModel,
        BaseViewModel = viewModel.BaseViewModel;
    var onDemandModel = viewModel.onDemandModel = {};

    onDemandModel.BasicInfo = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(true);
        _this.title = ko.observable('会议标题');
        _this.description = ko.observable('');
        _this.descShowAll = ko.observable(false);
        _this.sponsor = ko.observable('主办方');
        _this.logoSrc = ko.observable('../images/default_logo.png');
        _this.userOnline = ko.observable(0);
        //是否登录
        _this.isLogin = ko.observable(false);
        //是否报名
        _this.isSignUp = ko.observable(false);
        //会场存在
        _this.publish = ko.observable(false);
        //必须登录
        _this.requireLogin = ko.observable(true);
        //可以试看
        _this.trailer = ko.observable(false);
        //可试看时长
        _this.trailerTime = 0;
        //是否在试看
        _this.trailFlag = false;
        //试看定时器
        _this.trailTimeout = {};
        //是否可以参会
        _this.canJoin = ko.pureComputed(function () {
            return (this.trailer() || this.isLogin() && this.isSignUp() || !this.requireLogin());
        }, this);
    };

    onDemandModel.Tips = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(false);
        _this.icon = ko.observable(0);  //0:失败 1:成功
        _this.content = ko.observable('');
    };

    onDemandModel.Video = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.html = ko.observable('');
        _this.visible = ko.observable(true);
    };

    onDemandModel.Doc = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.html = ko.observable('');
        _this.visible = ko.observable(true);
    };

    //在线用户
    onDemandModel.User = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(false);
        _this.list = ko.observableArray([]);
        //用户列表维护
    };

    //资源列表
    onDemandModel.Resource = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(false);
        _this.list = ko.observableArray([]);
    };

    //会议日程
    onDemandModel.Agenda = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(true);
        _this.group = ko.observableArray([]);
    };

    //演讲嘉宾
    onDemandModel.Speaker = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(true);
        _this.list = ko.observableArray([]);
        _this.detail = ko.observable({});
        _this.detailVisible = ko.observable(false);
        _this.detailShowMore = ko.observable(false);
        _this.detailIntroLength = ko.observable(0);
    };

    //投票
    onDemandModel.Vote = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(false);
        _this.id = ko.observable(0);
        _this.title = ko.observable('');
        _this.url = ko.observable('');
    };

    //信息展示
    onDemandModel.MessageBox = function(){
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(false);
        _this.content = ko.observable('');
    }

    //问卷
    onDemandModel.Questionnaire = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(false);
        //是否有问卷
        _this.has = ko.observable(false);
        //问卷地址
        _this.src = ko.observable('javascript:void(0);');
        //问卷ID
        _this.id = ko.observable('');
    };

    //章节
    onDemandModel.Chapter = function () {
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(true);
        _this.list = ko.observableArray([]);
        _this.timestamp = ko.observable(0);
    };

    //视频列表
    onDemandModel.VideoList = function (){
        var _this = this;
        BaseViewModel.apply(_this);
        _this.visible = ko.observable(false);
        _this.list = ko.observableArray([]);
        _this.currentVideoId = ko.observable(0);
    };

    //时间轴
    onDemandModel.TimePoint = function(){
        var _this = this;
        BaseViewModel.apply(_this);
        _this.list = ko.observableArray([]);
    };
})(__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(39), __webpack_require__(3));


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket3 SDict的api网关接口模块
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        dictionary = api.dictionary = api.dictionary || {},
        gateway = dictionary.gateway = smarket.Config("api.gateway.dict");

    //获取字典表列表
    dictionary.getList = function (keyword, type, isCascade, start, num) {
        return getJSON("/dic/getList", {
            tenantId: smarket.Config('tenantId'),
            keyword: keyword,
            type: type,
            isCascade: isCascade,
            start: start,
            num: num
        });
    };
    //获取字典值列表
    dictionary.getParamList = function (dicId) {
        return getJSON("/dic/params/getList", {
            tenantId: smarket.Config('tenantId'),
            dicId: dicId
        });
    };
    //获取字典值树形结构
    dictionary.getParamTree = function (dicId) {
        return getJSON("/dic/params/getTree", {
            tenantId: smarket.Config('tenantId'),
            dicId: dicId,
            format: 'arr'
        });
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket3 STool的api网关接口模块
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        guest = api.guest = api.guest || {},
        gateway = guest.gateway = smarket.Config("api.gateway.seminar");

    /**
     * 获取会议嘉宾列表
     * @param seminarId     会议Id
     * @param tenantId      租户Id
     * @returns {*}
     */
    guest.getList = function (tenantId, seminarId) {
        return postJSON("/seminar/guest/getList", {
            seminarId: seminarId,
            tenantId: tenantId
        });
    };

    /**
     * 获取嘉宾详情
     * @param seminarGuestId     嘉宾会内ID
     * @returns {*}
     */
    guest.get = function (seminarGuestId) {
        return postJSON("/seminar/guest/get", {
            seminarGuestId: seminarGuestId
        });
    };


    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

;
'use strict';
(function (smarket, $) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        location = api.location = api.location || {},
        cdnPrefix = smarket.Config("api.cdn");

    //获取省份列表
    location.getProvinces = function (success) {
        return $.getJSON(cdnPrefix + "/js/province.js", null, success);
    };
    //获取城市列表
    location.getCities = function (success) {
        return $.getJSON(cdnPrefix + "/js/city.js", null, success);
    };
})(__webpack_require__(0), __webpack_require__(1), __webpack_require__(4));


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bantenio on 2016/12/10.
 * 抽奖相关服务
 */

;
'use strict';//严格约束
(function (smarket, $) {
    //如果没有引用smarket 和api 抛出错误
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    var api = smarket.api,
        luckydraw = api.luckydraw = api.luckydraw || {},//赋到主命名空间
        gateway = luckydraw.gateway = smarket.Config("api.gateway.tools");//获取用户相关的api请求地址

    //获取抽奖
    luckydraw.get = function (luckyInfo) {
        return postJSON('/luckyDraw/get', luckyInfo);
    };
    //获取奖品
    luckydraw.getAwardDetailList = function (awardDetailListInfo) {
        return postJSON('/luckyDraw/getAwardDetailList', awardDetailListInfo);
    };
    luckydraw.clientHasParticipate  = function (info) {
        return postJSON('/luckyDraw/client/hasParticipate ', info);
    };
    luckydraw.clientShare = function (shareInfo) {
        return postJSON('/luckyDraw/client/share', shareInfo);
    };
    luckydraw.view = function (viewInfo) {
        return postJSON('/luckyDraw/view', viewInfo);
    };

    luckydraw.clientSaveUserInfo = function (userInfo) {
        return postJSON('/luckyDraw/client/saveUserInfo', userInfo);
    };
    luckydraw.clientAction = function (actionInfo) {
        actionInfo.referenceUrl = actionInfo.url = window.location.href;
        return postJSON('/luckyDraw/client/action', actionInfo);
    };

    /**
     * 获取轮次信息
     * @param luckyDrawId 抽奖Id
     * @param tenantId 租户Id
     * @param instanceId 实例Id
     * @returns {*}
     */
    luckydraw.getDrawOrder = function (luckyDrawId, tenantId, instanceId) {
        return postJSON('/luckyDraw/result/getState', {
            luckyDrawId: luckyDrawId,
            tenantId: tenantId,
            instanceId: instanceId
        });
    };
    /**
     * 获取轮次中奖人员信息
     * @param luckyDrawId 抽奖Id
     * @param tenantId 租户Id
     * @param instanceId 实例Id
     * @param awardDetailId 轮次Id
     * @param num 抽奖人数
     * @returns {*}
     */
    luckydraw.getDrawWinners = function (luckyDrawId, tenantId, instanceId, awardDetailId, num) {
        return postJSON('/luckyDraw/client/actionByBigScreen', {
            luckyDrawId: luckyDrawId,
            tenantId: tenantId,
            instanceId: instanceId,
            awardDetailId: awardDetailId,
            num: num
        });
    };



    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(1), __webpack_require__(4));


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 签到大屏Service层
 */
;
'use strict';
(function (smarket) {

    //判断API是否存在
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    //定义API
    var api = smarket.api,
        signbigscreen = api.signbigscreen = api.signbigscreen || {},
        gateway = signbigscreen.gateway = smarket.Config("api.gateway.seminar");

    /**
     * 根据分组获取大屏组的信息
     * @param seminarId     会议id
     * @param groupId   大屏分组id
     * @returns {*}
     */
    signbigscreen.getListByGroup = function (seminarId, groupId) {
        return postJSON("/seminar/bigScreen/getListByGroup", {
            seminarId: seminarId,
            groupId: groupId
        });
    };

    /**
     * 获取大屏信息
     * @param screenId  大屏id
     * @returns {*}
     */
    signbigscreen.get = function (screenId) {
        return getJSON("/seminar/bigScreen/get", {
            id: screenId
        });
    };
    /**
     * 更新签到大屏
     * @param bigScreenInfo 签到大屏信息的json
     * {
     *      id:大屏id,
     *      status:状态,eg:off
     *      name:大屏名称,
     *      scale:大屏比例（宽屏|窄屏）,eg:narrow
     *      groupId:大屏分组id,
     *      signingPointId:签到点id,
     *      signingPoint:签到点名称,
     *      checkInByWeChat:是否启用微信签到,
     *      checkInStatus:是否开始签到,
     *      seminarId:会议id,
     *      onTheWallField:上墙字段（报名信息|微信信息）,
     *      regOnSite:是否启用现场报名,
     *      regFormId:报名表单id,
     *      regFormName:表单名称,
     *      interval:轮播间隔,
     *      loop:循环播放,
     *      isControl:是否是控制台,
     *      url:跳转地址,
     *      sess:会话,
     * }
     * @returns {*}
     */
    signbigscreen.updateCheckIn = function (bigScreenInfo) {
        return postJSON("/seminar/bigScreen/updateCheckIn", bigScreenInfo);
    };

    /**
     * 获取大屏签到墙信息
     * @param screenId          大屏id
     * @param signingPointId    签到点id
     * @returns {*}
     */
    signbigscreen.getCheckInData = function (screenId,signingPointId) {
        return postJSON("/seminar/bigScreen/forBigScreenWall/getCheckInData", {
            id: screenId,
            signingPointId:signingPointId
        });
    };

    //封装get和post请求
    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

})(__webpack_require__(0), __webpack_require__(4));


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by bante on 2017/4/1.
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }


    var api = smarket.api,
        template = api.template = api.template || {},
        gateway = template.gateway = smarket.Config("api.gateway.template");

    template.getConfig = function (configId) {
        return postJSON("/template/template/getConfig", {
            configId: configId
        });
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 留言板大屏Service层
 * Siler-shen 20170105
 */
;
'use strict';
(function (smarket) {

    //判断API是否存在
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    //定义API
    var api = smarket.api,
        topicbigscreen = api.topicbigscreen = api.topicbigscreen || {},
        gateway = topicbigscreen.gateway = smarket.Config("api.gateway.seminar");

    //获取大屏列表
    topicbigscreen.getScreenList = function (tenantId, seminarId, groupId) {
        return postJSON("/seminar/bigScreen/getListByGroup", {
            tenantId: tenantId,
            seminarId: seminarId,
            groupId: groupId
        });
    };

    //得到大屏
    topicbigscreen.getScreen = function (screenId) {
        //TODO checked the parameters from api gateway
        return getJSON("/seminar/bigScreen/get", {
            id: screenId
        });
    };
    //大屏信息
    topicbigscreen.updateMessage = function (bigScreenInfo) {
        return postJSON("/seminar/bigScreen/updateMessage", bigScreenInfo);
    };
    //封装get和post请求
    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

})(__webpack_require__(0), __webpack_require__(4));


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 投票大屏Service层
 * qilongjie 20170105
 */
;
'use strict';
(function (smarket) {

    //判断API是否存在
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }

    //定义API
    var api = smarket.api,
        votebigscreen = api.votebigscreen = api.votebigscreen || {},
        gateway = votebigscreen.gateway = smarket.Config("api.gateway.seminar");

    //获取大屏列表
    votebigscreen.getScreenList = function (tenantId, seminarId, groupId) {
        return postJSON("/seminar/bigScreen/getListByGroup", {
            tenantId: tenantId,
            seminarId: seminarId,
            groupId: groupId
        });
    };

    //得到大屏
    votebigscreen.getScreen = function (screenId) {
        return getJSON("/seminar/bigScreen/get", {
            id: screenId
        });
    };
    /*
     * @bigScreenInfo大屏信息
     */
    votebigscreen.updatePoll = function (bigScreenInfo) {
        return postJSON("/seminar/bigScreen/updatePoll", bigScreenInfo);
    };
    //获取预设值
    votebigscreen.getPrep = function (tenantId, seminarId, screenId, pollId) {
        return postJSON("/seminar/bigScreen/getPollPreset", {
            tenantId: tenantId,
            seminarId: seminarId,
            screenId: screenId,
            pollId: pollId
        });
    };


    //封装get和post请求
    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

})(__webpack_require__(0), __webpack_require__(4));


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * smarket3微信的api网关接口模块
 */
;
'use strict';
(function (smarket) {
    if (!smarket || !smarket.api) {
        throw new Error("Require the smarket module and the smarket.api module.");
    }


    var api = smarket.api,
        wechat = api.wechat = api.wechat || {},
        gateway = wechat.gateway = smarket.Config("api.gateway.wechat");

    //通过微信授权code获取用户信息
    wechat.getByCode = function (weChatId, code, schemaId) {
        return getJSON("/contact/getByCode", {
            wechatId: weChatId,
            weChatId: weChatId,
            code: code,
            schemaId: schemaId
        });
    };

    wechat.getContactByCode = function (weChatId, code, schemaId) {
        return s3g("/contact/getByCode", {
            weChatId: weChatId,
            code: code,
            schemaId: schemaId
        });
    };

    wechat.getContactStatus = function (info) {
        return postJSON('/contact/getContactStatus', info);
    };

    //通过OpenId获取用户信息
    wechat.getByOpenId = function (weChatId, openId, schemaId) {
        return postJSON("/contact/getByOpenId", {
            weChatId: weChatId,
            openId: openId,
            schemaId: schemaId
        });
    };
    //绑定会员
    wechat.bindMember = function (memberSchemaId, weChatId, openId, sess) {
        return postJSON("/contact/bindMember", {
            "schemaId": memberSchemaId,
            "wechatId": weChatId,
            "weChatId": weChatId,
            "openId": openId,
            "sess": sess
        });
    };

    //获取weChatId的应用Id
    wechat.getAppId = function (weChatId) {
        return getJSON("/weChat/getAppId", {
            wechatId: weChatId,
            weChatId: weChatId
        });
    };

    //通过微信的mediaId获取上传的文件信息
    wechat.getMapIdByMediaId = function (mediaId) {
        return postJSON('/media/getMapIdByMediaId', {
            mediaId: mediaId
        });
    };

    wechat.getConfig = function (options) {
        var onDebug = options['onDebug'];
        if (typeof(onDebug) === "string" && (onDebug = onDebug.trim()).length > 0) {
            onDebug = onDebug.toLowerCase();
            onDebug = (onDebug === "true" || onDebug === '1');
        }
        return getJSON("/weChat/getConfig", {
            weChatId: options['weChatId'],
            url: options['url'],
            onDebug: String(!!options['onDebug']),
            jsApiList: options['jsApiList']
        });
    };

    //获取微信信息
    wechat.get = function (weChatId) {
        return getJSON("/weChat/get", {
            weChatId: weChatId
        });
    };

    function getJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    function postJSON(url, data, success) {
        return api.s3g(url, data, success);
    }

    var s3g = api.s3g;
})(__webpack_require__(0), __webpack_require__(4));

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_132__;

/***/ })
/******/ ]);
});