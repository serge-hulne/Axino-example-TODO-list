// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/axino/label.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
var core_1 = require("./core");
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label(text, props) {
        if (props === void 0) { props = null; }
        var _this = _super.call(this, props) || this;
        _this.htmlString = /*html*/ "<span>" + text + "</span>";
        _this.createNode();
        ///
        if (props) {
            if (props.parent) {
                _this.appendTo(props.parent);
            }
        }
        return _this;
    }
    Label.prototype.setText = function (text) {
        this.node.innerHTML = text;
    };
    Label.prototype.getText = function () {
        return this.node.innerHTML;
    };
    return Label;
}(core_1.Component));
exports.Label = Label;

},{"./core":"node_modules/axino/core.ts"}],"node_modules/axino/textarea.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArea = void 0;
var core_1 = require("./core");
var TextArea = /** @class */ (function (_super) {
    __extends(TextArea, _super);
    function TextArea(props) {
        var _this = this;
        if (props) {
            _this = _super.call(this, props) || this;
            _this.htmlString = /*html*/ "<textarea type=\"text\" class=\"form-TextArea\"></textarea>";
            _this.createNode();
            if (props.parent) {
                _this.appendTo(props.parent);
            }
            if (props.hint) {
                _this.setPlaceholder(props.hint);
            }
        }
        return _this;
    }
    TextArea.prototype.setText = function (text) {
        this.node.value = text;
    };
    TextArea.prototype.getText = function () {
        return this.node.value;
    };
    TextArea.prototype.setPlaceholder = function (text) {
        this.node.placeholder = text;
    };
    TextArea.prototype.setRow = function (r) {
        this.node.rows = r;
    };
    TextArea.prototype.setCols = function (c) {
        this.node.cols = c;
    };
    TextArea.prototype.setWidth = function (w) {
        this.node.style.width = w;
    };
    TextArea.prototype.setHeight = function (h) {
        this.node.style.height = h;
    };
    return TextArea;
}(core_1.Component));
exports.TextArea = TextArea;

},{"./core":"node_modules/axino/core.ts"}],"node_modules/axino/olist.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Olist = void 0;
var div_1 = require("./div");
var Olist = /** @class */ (function (_super) {
    __extends(Olist, _super);
    function Olist(props) {
        var _this = _super.call(this, props) || this;
        var items = [];
        if (props) {
            if (props.items) {
                items = props.items;
                _this.items = "";
                items.forEach(function (item) {
                    _this.items += "\t<li>" + item + "</li>\n";
                });
                _this.htmlString = "<ol>\n" + _this.items + "</ol>";
                //console.log(this.htmlString);
                _this.createNode();
            }
            if (props.parent) {
                _this.appendTo(props.parent);
            }
        }
        return _this;
    }
    return Olist;
}(div_1.Div));
exports.Olist = Olist;

},{"./div":"node_modules/axino/div.ts"}],"node_modules/axino/select.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
var div_1 = require("./div");
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select(props) {
        var _this = _super.call(this, props) || this;
        var items = [];
        if (props) {
            if (props.items) {
                items = props.items;
                _this.items = "";
                items.forEach(function (item) {
                    _this.items += "\t<option value=\"" + item + "\">" + item + "</option>";
                });
                _this.htmlString = "<select>\n" + _this.items + "</select>";
                //console.log(this.htmlString);
                _this.createNode();
            }
            if (props.parent) {
                _this.appendTo(props.parent);
            }
        }
        return _this;
    }
    Select.prototype.getChecked = function () {
        return this.node.options[this.node.selectedIndex].value;
    };
    Select.prototype.setChecked = function (choice) {
        this.node.options[this.node.selectedIndex].value = choice;
    };
    Select.prototype.click = function (clickFN) {
        this.node.addEventListener("click", clickFN);
    };
    return Select;
}(div_1.Div));
exports.Select = Select;

},{"./div":"node_modules/axino/div.ts"}],"node_modules/axino/radio.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioButton = void 0;
var core_1 = require("./core");
var RadioButton = /** @class */ (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton(props) {
        var _this = _super.call(this, props) || this;
        _this.htmlString = /*html*/ "<label>\n          <input type='radio'>\n          <span class=\"checkable\">" + _this.text + "</span>\n        </label>";
        //console.log(this.htmlString);
        _this.createNode();
        ///
        if (props) {
            if (props.parent) {
                _this.appendTo(props.parent);
            }
            if (props.text) {
                _this.text = props.text;
            }
        }
        return _this;
    }
    RadioButton.prototype.getChecked = function () {
        return this.node.options[this.node.RadioButtonedIndex].value;
    };
    RadioButton.prototype.setChecked = function (choice) {
        this.node.options[this.node.RadioButtonedIndex].value = choice;
    };
    RadioButton.prototype.click = function (clickFN) {
        this.node.addEventListener("click", clickFN);
    };
    return RadioButton;
}(core_1.Component));
exports.RadioButton = RadioButton;

},{"./core":"node_modules/axino/core.ts"}],"node_modules/axino/form.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
var div_1 = require("./div");
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = this;
        if (props) {
            _this = _super.call(this, props) || this;
            var items = [];
            _this.htmlString = "<form></form>";
            _this.createNode();
            if (props.parent) {
                _this.appendTo(props.parent);
            }
            _this.node.style.borderWitdh = "1px";
            _this.node.style.borderStyle = "solid";
            _this.node.style.borderColor = "lightgrey";
            _this.node.style.padding = "5px";
        }
        return _this;
    }
    return Form;
}(div_1.Div));
exports.Form = Form;

},{"./div":"node_modules/axino/div.ts"}],"node_modules/axino/canvas.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
var Canvas = /** @class */ (function () {
    function Canvas(props) {
        if (props === void 0) { props = null; }
        this.node = document.createElement("CANVAS");
        this.context = this.node.getContext("2d");
        ///
        if (props) {
            if (props.parent) {
                props.parent.node.appendChild(this.node);
            }
            if (props.width) {
                this.node.setAttribute("width", props.width);
            }
            if (props.height) {
                this.node.setAttribute("height", props.height);
            }
        }
    }
    return Canvas;
}());
exports.Canvas = Canvas;

},{}],"node_modules/axino/table.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
var div_1 = require("./div");
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        var _this = this;
        if (props) {
            _this = _super.call(this, props) || this;
            _this.props = props;
            if (props.rows) {
                _this.getHTMLfromJSON(props.rows);
                _this.createNode();
            }
            if (props.parent) {
                _this.appendTo(props.parent);
            }
        }
        return _this;
    }
    Table.prototype.getHTMLfromJSON = function (lines) {
        var tableHeader = "";
        var tableBody = "";
        Object.entries(lines[0]).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            tableHeader = tableHeader.concat("<th>" + key + "</th>");
        });
        var headNode = "<thead>" + tableHeader + "</thead>\n";
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var lineString = "";
            Object.entries(line).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                lineString = lineString.concat("<td>" + value + "</td>");
            });
            tableBody = tableBody.concat("<tr>" + lineString + "</tr>\n");
        }
        var bodyNode = "<tbody>" + tableBody + "</tbody>";
        if (this.props.header) {
            this.htmlString = "<table class=\"primary\">" + headNode + "\n" + bodyNode + "</table>";
        }
        else {
            this.htmlString = "<table class=\"primary\">" + bodyNode + "</table>";
        }
        //console.log(this.htmlString);
    };
    return Table;
}(div_1.Div));
exports.Table = Table;

},{"./div":"node_modules/axino/div.ts"}],"node_modules/axino/testing.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = require("./button");
var core_1 = require("./core");
var label_1 = require("./label");
var div_1 = require("./div");
var textarea_1 = require("./textarea");
var olist_1 = require("./olist");
var select_1 = require("./select");
var checkbox_1 = require("./checkbox");
var radio_1 = require("./radio");
var form_1 = require("./form");
var canvas_1 = require("./canvas");
var constants_1 = require("./constants");
var constants_2 = require("./constants");
var core_2 = require("./core");
var table_1 = require("./table");
function display() {
    var b1 = new button_1.Button("B1");
    b1.appendToApp();
    b1.onClick(function () {
        core_1.log("clicked");
        b1.setBackgroundColor("orange");
        core_1.log(tex.getText());
        //v1.setStyle("width", "200px");
        v1.Width("25%");
    });
    var v = new div_1.Div(null);
    v.appendToApp();
    //v.verticalReverse();
    v.horizontal();
    v.setBackgroundColor(constants_2.colors.lightseagreen);
    v.alignCenter();
    var b = new Array(10);
    for (var i = 0; i < 10; i++) {
        var bt = new button_1.Button("B" + i, { parent: v });
        bt.setBackgroundColor("white");
        bt.setColor(constants_2.colors.lightseagreen);
        bt.BorderRadius("0px");
        bt.BorderRight();
        bt.TipBottom("A simple hint");
        b.push(bt);
    }
    ;
    var v1 = new div_1.Div(null);
    v1.appendToApp();
    v1.setBackgroundColor(constants_2.colors.lightcyan);
    v1.horizontal;
    v1.Border();
    var l = new label_1.Label("AAA");
    l.appendToApp();
    var tex = new textarea_1.TextArea({ parent: v1, hint: "This is a hint" });
    var li2 = new olist_1.Olist({ parent: v1, items: ["item 1", "item 2", "item 3"] });
    //log({ li2: li2 });
    var can = new canvas_1.Canvas({ parent: core_2.root, width: "200", height: "200" });
    var ctx = can.context;
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
    var l1 = new label_1.Label("BBB");
    l1.appendToApp();
    //log({ l1: l1 });
    var s2 = new select_1.Select({ items: ["one", "two"] });
    s2.appendTo(v1);
    var f = new form_1.Form({ parent: core_2.root });
    var cx = new checkbox_1.CheckBox({ parent: f, text: "xxx" });
    var bx = new radio_1.RadioButton({ parent: f, text: "yyy" });
    var bb = new button_1.Button("BB", { parent: core_2.root, tip: "BB tip" });
    var bb1 = new button_1.Button("BB1");
    bb1.appendToApp();
    bb1.onEvent(constants_1.eventsMouse.mouseover, function () {
        //log("hovering");
        bb1.setBackgroundColor(constants_2.colors.aquamarine);
    });
    bb1.onEvent(constants_1.eventsMouse.mouseout, function () {
        bb1.setBackgroundColor(null);
    });
    var records = [{ "name": "Bond", "surname": "James" }, { "name": "Hari", "surname": "Mata" }];
    var t = new table_1.Table({ parent: core_2.root, rows: records, header: true });
}
display();
exports = { display: display };

},{"./button":"node_modules/axino/button.ts","./core":"node_modules/axino/core.ts","./label":"node_modules/axino/label.ts","./div":"node_modules/axino/div.ts","./textarea":"node_modules/axino/textarea.ts","./olist":"node_modules/axino/olist.ts","./select":"node_modules/axino/select.ts","./checkbox":"node_modules/axino/checkbox.ts","./radio":"node_modules/axino/radio.ts","./form":"node_modules/axino/form.ts","./canvas":"node_modules/axino/canvas.ts","./constants":"node_modules/axino/constants.ts","./table":"node_modules/axino/table.ts"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64785" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("js",require("../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js"));b.load([]).then(function(){require("node_modules/axino/testing.ts");});
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/testing.468732b7.js.map