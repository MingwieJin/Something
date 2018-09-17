(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("knockout"));
	else if(typeof define === 'function' && define.amd)
		define("smarket", ["jquery", "knockout"], factory);
	else if(typeof exports === 'object')
		exports["smarket"] = factory(require("jquery"), require("knockout"));
	else
		root["smarket"] = factory(root["jQuery"], root["ko"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by xuyanru on 2017/2/10.
	 */
	__webpack_require__(15);
	//require('../infrastructure/cookie');
	__webpack_require__(88);
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(60);
	__webpack_require__(75);
	__webpack_require__(91);
	module.exports = __webpack_require__(2);


/***/ },

/***/ 2:
/***/ function(module, exports) {

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

	                // TODO: regex should be able to handle this.
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

/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * smarket支持api网关
	 */
	;
	'use strict';
	(function (smarket, $) {
	    if (!smarket) {
	        throw new Error("Require the smarket module.");
	    }
	    var api = smarket.api = smarket.api || {},
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
	        },
	        convertSignUrl = smarket.Config('convertSignUrl') || function (url) {
	                return url;
	            };
	    $.ajaxSetup({
	        beforeSend: function (jqXHR, settings) {
	            if (settings.isSignApi) {
	                settings.url = convertSignUrl(settings.url);
	            }
	        }
	    });

	    api.ajax = function(url, data, success, type,contentType){
	        var request = {
	            url: url,
	            type: type,
	            dataType: 'json',
	            data: data,
                contentType:contentType,
	            success: success
	        };
	        if ((data || {})['__GATEWAY_SIGN_API__'] == 1) {
	            request.isSignApi = true;
	            delete data.__GATEWAY_SIGN_API__;
	        }
	        //支持跨域
            if (!$.support.cors) {
                var regUrl = request.url.match(/(http[s]?:\/\/[\-\w\.]+)(\/.*)/);
                request.url = regUrl[1] + '/x' + regUrl[2];
                request.data = JSON.stringify(request.data);
            }
	        var defer = $.Deferred();
	        $.ajax(request).then(function (data) {
	            ((data && data.body && data.body.result == 0) ? defer.resolve : defer.reject)(data.body);
	        }, function (XMLHttpRequest) {
	            defer.reject({
	                result: XMLHttpRequest.status,
	                desc: errors.hasOwnProperty(XMLHttpRequest.status) ? errors[XMLHttpRequest.status] : '未知网络错误'
	            });
	        });
	        return defer.promise();
	    };

		api.s3gajax = function (request) {
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
	        return api.ajax(url, data, success, 'get');
	    };
	    //api的post方法
	    api.postJSON = function (url, data, success) {
	        return api.ajax(url, data, success, 'post');
	    };

		api.s3g = function (url, data, success, type) {
			type = type || "post";
			return api.s3gajax({
				url: smarket.Config().api.gateway.general + url,
				type: type,
				contentType: (type === "get" ? undefined : "text/plain"),
				dataType: 'json',
				data: (type === "get" ? data : JSON.stringify(data)),
				success: success
			});
		};
	})(__webpack_require__(2), __webpack_require__(3));

/***/ },

/***/ 10:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by bantenio on 2016/12/5.
	 * 基础model
	 */
	;
	'use strict';
	var ko = __webpack_require__(10);
	var smarket = __webpack_require__(2);
	module.exports = (function (smarket, ko) {
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
	})(smarket, ko);

	(function (ko) {
	    ko.bindingHandlers.element = {
	        init: function (element, valueAccessor) {
	            var target = valueAccessor();
	            target(element);
	        }
	    };
	})(ko);

/***/ },

/***/ 15:
/***/ function(module, exports) {

	/**
	 * Created by bantenio on 2016/12/5.
	 */
	(function() {
	    Date.prototype.Format = function(mask) {
	        var d = this;
	        var zeroize = function(value, length) {
	            if (!length) length = 2;
	            value = String(value);
	            for (var i = 0, zeros = ''; i < (length - value.length); i++) {
	                zeros += '0';
	            }
	            return zeros + value;
	        };
	        return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {
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
	    String.prototype.FormatTimeStamp = function(val, fmt) {
	        var newDate = new Date();
	        newDate.setTime(val * 1000);
	        return newDate.Format(fmt);
	    };
	})();

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

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
	    file.getList = function (folderId,start,num,tenantId,sortType,name,type,fileIds,fileTypes,instanceId,moduleType,isShowSys) {
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
	    file.downloadWithEmail = function (email,fileList,globalUserId,openId,articleId) {
	        return postJSON('/file/downloadWithEmail', {
	            articleId: articleId,
	            openId: openId,
	            globalUserId: globalUserId,
	            fileList: JSON.stringify(fileList),
	            email: email
	        });
	    };

	    function getJSON(url, data, success) {
	        return api.getJSON(gateway + url, data, success);
	    }

	    function postJSON(url, data, success) {
	        return api.postJSON(gateway + url, data, success);
	    }
	})(__webpack_require__(2), __webpack_require__(3), __webpack_require__(6));


/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

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
	        return getJSON('/questionary', {
	            questionaryId: questionaryId
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
            return  smarket.api.s3g("/questionary/view", {
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
	        request.options = JSON.stringify(request.options || []);
	        return postJSON("/questionary/answer", request);
	    };


	    function getJSON(url, data, success) {
	        return api.getJSON(gateway + url, data, success);
	    }

	    function postJSON(url, data, success) {
	        return api.postJSON(gateway + url, data, success);
	    }

	})(__webpack_require__(2), __webpack_require__(6));

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by xuyanru on 2017/2/10.
	 */
	'use strict';
	(function (smarket, ko, $) {
	    if (!smarket || !smarket.api || !smarket.viewModel) {
	        throw new Error("Require the smarket module, the smarket.api module, the smarket.template module and the smarket.viewModel module.");
	    }

	    var viewModel = smarket.viewModel,
	        BaseViewModel = viewModel.BaseViewModel;

	    var liveModel = function () {
	        var self = this;
	        self.basicInfo = new basicInfoModel();
	        self.tips = new tipsModel();
	        self.video = new videoModel();
	        self.doc = new docModel();
	        self.qa = new qaModel();
	        self.user = new userModel();
	        self.resource = new resourceModel();
	        self.agenda = new agendaModel();
	        self.speaker = new speakModel();
	        self.message = new messageModel();
	        self.vote = new voteModel();
	        self.lottery = new lotteryModel;
	        self.questionnaire = new questionnaireModel();
	        self.chapter = new chapterModel();
           // self.branch = new branchModel();//分会场
	    };

	    function basicInfoModel() {
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
	        self.meetingClosed = ko.observable(true);
            //会议属于分会场、主会场
            self.conference = ko.observable();
	    }

	    function tipsModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.visible = ko.observable(false);
	        self.icon = ko.observable(0);//0:失败 1:成功
	        self.content = ko.observable('');
	    }
	    //分会场
        function branchModel() {
            var self = this;
            BaseViewModel.apply(self);
            self.list = ko.observableArray([]);
        }

	    function videoModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.html = ko.observable('');
	        self.visible = ko.observable(true);
	    }

	    function docModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.html = ko.observable('');
	        self.visible = ko.observable(true);
	    }

	    //互动问答
	    function qaModel() {
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
                    if (qaList[i].submitor.indexOf("(")>-1) {
                        qaList[i].submitor = qaList[i].submitor.substring(0, qaList[i].submitor.indexOf("("));
                    }
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
	    }

	    //在线用户
	    function userModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.visible = ko.observable(false);
            self.status = ko.observable(0);
	        self.list = ko.observableArray([]);
	    }

	    //资源列表
	    function resourceModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.visible = ko.observable(false);
	        self.list = ko.observableArray([]);
	    }

	    //会议日程
	    function agendaModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.visible = ko.observable(true);
	        self.list = ko.observableArray([]);
	    }

	    //演讲嘉宾
	    function speakModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.visible = ko.observable(true);
	        self.list = ko.observableArray([]);
	        self.detail = ko.observable({});
	        self.detailVisible = ko.observable(false);
	        self.detailShowMore = ko.observable(false);
	        self.detailIntroLength = ko.observable(0);
	    }

	    //系统消息
	    function messageModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.visible = ko.observable(false);
	        self.content = ko.observable('')
	    }

	    //投票
	    function voteModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.visible = ko.observable(false);
	        self.voteIds = [];
	        self.currentVoteId = '';
	        self.closeVoteIds = [];
	        self.src = ko.observable('');
	        self.require = ko.observable(false);
	        self.list = [];
	    }

	    //抽奖
	    function lotteryModel() {
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
	    }

	    //问卷
	    function questionnaireModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.visible = ko.observable(false);
	        //是否有问卷
	        self.has = ko.observable(false);
	        //问卷地址
	        self.src = ko.observable('javascript:void(0);');
	        //问卷ID
	        self.id = ko.observable('');
	    }

	    //章节
	    function chapterModel() {
	        var self = this;
	        BaseViewModel.apply(self);
	        self.chapterList = ko.observableArray([]);
	        self.timestamp = ko.observable(0)
	    }

	    viewModel.liveModel = liveModel;


	})(__webpack_require__(2), __webpack_require__(10), __webpack_require__(3), __webpack_require__(89), __webpack_require__(13));


/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by xuyanru on 2017/2/9.
	 */
	'use strict';
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
	         // return postJSON("/open/getWebinarInfo", {
	         //     instanceId: instanceId
	         // });
            return smarket.api.s3g("/webinar/open/getWebinarInfo", {
                instanceId: instanceId,
                webinarId: webinarId,
                includeCustomField: 1,
                tenantId: tenantId
            });
	    };
	    /*
	     * 得到报名者基本信息
	     * @param instanceId    实例Id
	     * @param session  当前登录者的登录的 session
	     * @returns {*}
	     * **/
	    webinar.getApplicantInfo = function (instanceId, session) {
	        return postJSON("/open/getApplicantInfo", {
	            instanceId: instanceId,
	            sess: session
	        })
	    };
	    /*
	     * 报名信息 写入到 webinar系统
	     * @param instanceId    实例Id
	     * @param session  当前登录者的登录的 session必填
	     * @returns {*}
	     * **/
	    webinar.registration = function(info){
			return  smarket.api.s3g("/webinar/open/registration",info);
	    };

        /*
           * 更改参会状态
           * @param instanceId    实例Id
           * @param jointype     1登录用户 2 cookie用户 3 openid 4其它用户（不支持）
           * @param tenantId      租户Id  非必填
           * @returns {*}
           * **/
        webinar.join = function(info) {
            return api.s3g('/webinar/open/join', info);
        };

        /*
           * 新的线上会报名
           * @param instanceId    实例Id
           * @param session  当前登录者的登录的 session必填
           * @param tenantId      租户Id  必填
           * @returns {*}
           * **/
        webinar.newRegistration = function(info) {
            return api.s3g('/webinar/open/newRegistration', info);
        };
	    /*
	     * 得到中奖信息
	     * @param instanceId    实例Id
	     * @param webinarId     会议Id
	     * @param tenantId      租户Id  非必填
	     * @returns {*}
	     * **/
	    webinar.getLotteryRecord = function(webinarId,instanceId,tenantId){
	        return postJSON("/open/getLuckyDrawRoster",{
	            webinarId:webinarId,
	            instanceId:instanceId,
	            tenantId:tenantId
	        })
	    };
		/*
		 * 获取直播会议列表（高级查询功能）
		 * @param tenantId      租户Id  必填
		 *  @param fieldName    自定义字段名
		 *  @param keyword    主会场/分会场
		 * @returns {*}
		 * **/
        webinar.getWebinarListAdvanced = function(data){
          return  smarket.api.s3g("/webinar/open/getWebinarListAdvanced",data);
        };
        /**
         * 根据 instanceId  得到点播会议信息
         * @param instanceId     实例Id
         * @returns {*}
         **/
        webinar.request_GetMeetingInfo = function (webinarId) {
            return postJSON("/open/getDemandInfo", {
                webinarId: webinarId
            })
        };
        webinar.request_AddAttend=function(session,instanceId){
            return postJSON("/open/attend", {
                session : session,
                instanceId:instanceId
            })
        };
        /**
         * 根据当前时间视频获取时间轴
         * @param videoId
         * @returns {*}
         **/
        webinar.getTimePoints = function (videoId) {
            return postJSON("/open/getVideoTimeLine", {
                videoId : videoId
            })
        };
        webinar.request_AddAttend=function(session,instanceId){
            return postJSON("/open/attend", {
                session : session,
                instanceId:instanceId
            })
        };

	    function getJSON(url, data, success) {
	        return api.getJSON(gateway + url, data, success);
	    }

	    function postJSON(url, data, success) {
	        return api.postJSON(gateway + url, data, success);
	    }

	})(__webpack_require__(2), __webpack_require__(6));

/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by xuyanru on 2017/2/9.
	 */
	'use strict';
	(function (smarket) {
	    if (!smarket || !smarket.api) {
	        throw new Error("Require the smarket module and the smarket.api module.");
	    }

	    var api = smarket.api,
	        template = api.template = api.template || {},
	        gateway = template.gateway = smarket.Config("api.gateway.template");

	    /*
	     * 根据 configId  得到 configInfo
	     * @param configId 模板配置Id
	     * @returns {*}
	     * **/
	    template.getConfigInfoByConfigId = function (configId) {
	        return postJSON("/template/template/getConfig", {
                "configId": configId
	        });
	    };


	    function getJSON(url, data, success) {
	        return api.getJSON(gateway + url, data, success);
	    }

	    function postJSON(url, data, success) {
	        return api.postJSON(gateway + url, data, success);
	    }
	})(__webpack_require__(2), __webpack_require__(6));

/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by xuyanru on 2017/2/13.
	 */
	'use strict';
	(function (smarket) {
	    if (!smarket || !smarket.api) {
	        throw new Error("Require the smarket module and the smarket.api module.");
	    }

	    var api = smarket.api,
	        poll = api.poll = api.poll || {},
	        gateway = poll.gateway = smarket.Config().api.gateway.tools;

	    /**
	     * 根据 pollId  得到投票信息
	     * @param pollId     投票Id
	     * @returns {*}
	     **/
	    poll.getPollInfo = function (pollId) {
	        return postJSON("/poll/get", {
	            pollId: pollId
	        })
	    };

	    function getJSON(url, data, success) {
	        return api.getJSON(gateway + url, data, success);
	    }

	    function postJSON(url, data, success) {
	        return api.postJSON(gateway + url, data, success);
	    }
	})(__webpack_require__(2), __webpack_require__(6));

/***/ }

/******/ })
});
;