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
})({"node_modules/axino/core.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.getNodesByClass = exports.getNodeByID = exports.root = exports.log = exports.html = void 0;
// Constants:
var log = console.log;
exports.log = log;
var root = { base: document, node: document.body };
exports.root = root;
// Utilities:
function html(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var str = '';
    strings.forEach(function (string, i) {
        str += string + (values[i] || '');
    });
    return str;
}
exports.html = html;
// class Component(text: string = '',  props : object = null, htmlString: string) {
var Component = /** @class */ (function () {
    // Constructor:
    function Component(props) {
        if (props === void 0) { props = {}; }
        // Data members:
        this.text = '';
        this.props = {};
        this.htmlString = '';
        if (props || this.htmlString) {
            this.props = props;
            if (props.text) {
                this.text = props.text;
            }
            if (props.htmlString) {
                this.htmlString = props.htmlString;
                this.createNode();
            }
            if (this.htmlString.length > 0) {
                this.createNode();
            }
            if (props.parent) {
                this.parent = props.parent;
            }
        }
    }
    // Node:
    Component.prototype.createNode = function () {
        this.node = document.createElement('div');
        this.node.innerHTML = this.htmlString;
    };
    Component.prototype.delete = function () {
        var temp = this.node;
        var parent = this.node.parentNode;
        parent.removeChild(temp);
    };
    Component.prototype.appendTo = function (other) {
        other.node.appendChild(this.node);
    };
    Component.prototype.appendToApp = function () {
        this.appendTo(root);
    };
    Component.prototype.replaceBy = function (other) {
        var temp = this.node;
        //log({temp: temp});
        var parent = temp.parentNode;
        //log({parent: parent});
        parent.replaceChild(other.node, temp);
    };
    // Node attributes:
    Component.prototype.setBackgroundColor = function (color) {
        this.node.style.backgroundColor = color;
    };
    Component.prototype.setColor = function (color) {
        this.node.style.color = color;
    };
    Component.prototype.getStyle = function () {
        return this.node.style;
    };
    Component.prototype.setStyle = function (property, style) {
        this.node.style.setProperty(property, style);
    };
    Component.prototype.setId = function (id) {
        this.node.id = id;
    };
    Component.prototype.getID = function () {
        return this.node.id;
    };
    // basic element styling:
    Component.prototype.Width = function (value) {
        this.node.style.width = value;
    };
    Component.prototype.Height = function (value) {
        this.node.style.height = value;
    };
    Component.prototype.Padding = function (value) {
        this.node.style.padding = value;
    };
    Component.prototype.Margin = function (value) {
        this.node.style.margin = value;
    };
    Component.prototype.Border = function () {
        this.node.style.borderWitdh = "1px";
        this.node.style.borderStyle = "solid";
        this.node.style.borderColor = "lightgrey";
    };
    Component.prototype.BorderLeft = function () {
        this.node.style.borderLeft = "1px";
        this.node.style.borderStyle = "solid";
        this.node.style.borderColor = "white";
    };
    Component.prototype.BorderRight = function () {
        this.node.style.borderRight = "1px";
        this.node.style.borderStyle = "solid";
        this.node.style.borderColor = "white";
    };
    Component.prototype.BorderWidth = function (value) {
        this.node.style.borderWidth = value;
    };
    Component.prototype.BorderRadius = function (value) {
        this.node.style.borderRadius = value;
    };
    Component.prototype.Attribute = function (key, value) {
        this.node.setAttribute(key, value);
    };
    // Hints / tips:
    Component.prototype.Tip = function (text) {
        this.Attribute("data-tooltip", text);
        this.Attribute("class", "tooltip-top");
    };
    Component.prototype.TipLeft = function (text) {
        this.Attribute("data-tooltip", text);
        this.Attribute("class", "tooltip-left");
    };
    Component.prototype.TipRight = function (text) {
        this.Attribute("data-tooltip", text);
        this.Attribute("class", "tooltip-right");
    };
    Component.prototype.TipBottom = function (text) {
        this.Attribute("data-tooltip", text);
        this.Attribute("class", "tooltip-bottom");
    };
    // Listeners
    Component.prototype.onClick = function (clickFN) {
        this.node.addEventListener("click", clickFN);
    };
    // Generic listeners ("hover", "blur", "modified" etc):
    Component.prototype.onEvent = function (event, clickFN) {
        this.node.addEventListener(event, clickFN);
    };
    return Component;
}());
exports.Component = Component;
// Utility functions:
function getNodeByID(id) {
    return document.getElementById(id);
}
exports.getNodeByID = getNodeByID;
function getNodesByClass(cls) {
    return document.getElementsByClassName(cls);
}
exports.getNodesByClass = getNodesByClass;

},{}],"node_modules/axino/div.ts":[function(require,module,exports) {
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
exports.Div = void 0;
var core_1 = require("./core");
var Div = /** @class */ (function (_super) {
    __extends(Div, _super);
    function Div(props) {
        var _this = _super.call(this, props) || this;
        _this.htmlString = /*html*/ "<div></div>";
        _this.createNode();
        _this.node.style.display = "flex";
        ///
        if (props) {
            if (props.parent) {
                _this.appendTo(props.parent);
            }
        }
        return _this;
    }
    Div.prototype.vertical = function () {
        this.node.style.display = "flex";
        this.node.style.flexDirection = "column";
    };
    Div.prototype.verticalReverse = function () {
        this.node.style.display = "flex";
        this.node.style.flexDirection = "column-reverse";
    };
    Div.prototype.horizontal = function () {
        this.node.style.display = "flex";
        this.node.style.flexDirection = "row";
    };
    Div.prototype.horizontalReverse = function () {
        this.node.style.display = "flex";
        this.node.style.flexDirection = "row-reverse";
    };
    Div.prototype.alignCenter = function () {
        this.node.style.display = "flex";
        this.node.style.justifyContent = "center";
    };
    Div.prototype.alignStretch = function () {
        this.node.style.display = "flex";
        this.node.style.alignContent = "stretch";
    };
    Div.prototype.alignCenterSpaceBetween = function () {
        this.node.style.display = "flex";
        this.node.style.justifyContent = "space-between";
    };
    Div.prototype.alignCenterSpaceAround = function () {
        this.node.style.display = "flex";
        this.node.style.justifyContent = "space-around";
    };
    Div.prototype.alignCenterSpaceEvenly = function () {
        this.node.style.display = "flex";
        this.node.style.justifyContent = "space-evenly";
    };
    Div.prototype.alignLeft = function () {
        this.node.style.display = "flex";
        this.node.style.justifyContent = "flex-start";
    };
    Div.prototype.alignRight = function () {
        this.node.style.display = "flex";
        this.node.style.justifyContent = "flex-end";
    };
    return Div;
}(core_1.Component));
exports.Div = Div;

},{"./core":"node_modules/axino/core.ts"}],"node_modules/axino/constants.ts":[function(require,module,exports) {
"use strict";
// Constants:
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsDragDrop = exports.eventsMouse = exports.eventsKeyBoard = exports.eventsFocus = exports.colors = void 0;
//colors: 
var colors = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
exports.colors = colors;
// Events
var eventsMouse = {
    auxclick: "auxclick",
    click: "click",
    contextmenu: "contextmenu",
    dblclick: "dblclick",
    mousedown: "mousedown",
    mouseenter: "mouseenter",
    mousemove: "mousemove",
    mouseover: "mouseover",
    mouseout: "mouseout",
    mouseup: "mouseup",
    pointerlockchange: "pointerlockchange",
    pointerlockerror: "pointerlockerror",
    select: "select",
    wheel: "wheel"
};
exports.eventsMouse = eventsMouse;
var eventsDragDrop = {
    drag: "drag",
    dragend: "dragend",
    dragenter: "dragenter",
    dragstart: "dragstart",
    dragleave: "dragleave",
    dragover: "dragover",
    drop: "drop"
};
exports.eventsDragDrop = eventsDragDrop;
var eventsKeyBoard = {
    keydown: "keydown",
    keypress: "keypress",
    keyup: "keyup"
};
exports.eventsKeyBoard = eventsKeyBoard;
var eventsFocus = {
    focus: "focus",
    blur: "blur",
    focusin: "focusin",
    focusout: "focusout"
};
exports.eventsFocus = eventsFocus;

},{}],"node_modules/axino/button.ts":[function(require,module,exports) {
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
exports.Button = void 0;
var core_1 = require("./core");
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(text, props) {
        if (props === void 0) { props = null; }
        var _this = _super.call(this, props) || this;
        _this.htmlString = /*html*/ "<button>" + text + "</button>";
        _this.createNode();
        ///
        if (props) {
            if (props.parent) {
                _this.appendTo(props.parent);
            }
            if (props.tip) {
                _this.Tip(props.tip);
            }
        }
        return _this;
    }
    return Button;
}(core_1.Component));
exports.Button = Button;

},{"./core":"node_modules/axino/core.ts"}],"node_modules/axino/widget.ts":[function(require,module,exports) {
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
exports.Widget = void 0;
var div_1 = require("./div");
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(text, props) {
        if (text === void 0) { text = ""; }
        if (props === void 0) { props = null; }
        var _this = _super.call(this, props) || this;
        _this.createNode();
        ///
        if (props) {
            if (props.parent) {
                _this.appendTo(props.parent);
            }
            if (props.tip) {
                _this.Tip(props.tip);
            }
        }
        return _this;
    }
    Widget.prototype.children = function () {
        // Return array of children nodes.
        return this.node.childNodes;
    };
    Widget.prototype.appendChild = function (child) {
        // Delete a specific child node from the widget
        child.appendTo(this);
    };
    Widget.prototype.deleteChild = function (child) {
        // Delete a specific child node from the widget
        //this.node.removeChild(child.node);
        child.delete();
    };
    Widget.prototype.deleteChildren = function (list) {
        // Delete all children from the current widget which are in a given list: 
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            item.delete();
        }
    };
    Widget.prototype.appendChildren = function (list) {
        // Append children from a givent "Component" list to the current "Widget".
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var item = list_2[_i];
            item.appendTo(this);
        }
    };
    Widget.prototype.show = function () {
        // Cancel hide(). Make current widget visible.
    };
    Widget.prototype.hide = function () {
        // Make current Widget invisible.
    };
    Widget.htmlString = "<div></div>";
    return Widget;
}(div_1.Div));
exports.Widget = Widget;

},{"./div":"node_modules/axino/div.ts"}],"tasklist.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskList = void 0;

var button_1 = require("axino/button");

var div_1 = require("axino/div");

var widget_1 = require("axino/widget");

var TaskList =
/** @class */
function (_super) {
  __extends(TaskList, _super); // Constructor:


  function TaskList(props) {
    if (props === void 0) {
      props = null;
    }

    var _this = _super.call(this) || this;

    _this.list = new Array(); //this.vertical();

    _this.setBackgroundColor("lightblue");

    _this.Border();

    _this.Padding("50px");

    _this.Width("100%");

    _this.addButtonWrapper = new div_1.Div(null);

    _this.addButtonWrapper.appendTo(_this);

    _this.addButtonWrapper.alignCenter();

    _this.addButtonWrapper.Width("100%");

    _this.addButton = new button_1.Button("+");

    _this.addButton.onClick(function () {
      //log("addButton clicked");
      if (props != null) {
        if (props.add != null) {
          props.add.send("add");
        }
      }
    });

    _this.addButton.appendTo(_this.addButtonWrapper);

    _this.addButtonWrapper.Width("100%");

    _this.addButton.Padding("5px");

    return _this;
  }

  return TaskList;
}(widget_1.Widget);

exports.TaskList = TaskList;
},{"axino/button":"node_modules/axino/button.ts","axino/div":"node_modules/axino/div.ts","axino/widget":"node_modules/axino/widget.ts"}],"node_modules/axino/checkbox.ts":[function(require,module,exports) {
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
exports.CheckBox = void 0;
var core_1 = require("./core");
var CheckBox = /** @class */ (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox(props) {
        if (props === void 0) { props = null; }
        var _this = _super.call(this, props) || this;
        _this.checked = false;
        _this.text = "[&nbsp;]";
        _this.htmlString = /*html*/ "<button>" + _this.text + "</button>";
        _this.createNode();
        //console.log(this.htmlString);
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
    CheckBox.prototype.isChecked = function () {
        return this.checked;
    };
    CheckBox.prototype.setChecked = function (choice) {
        this.checked = choice;
        if (choice === true) {
            this.node.innerHTML = /*html*/ "<button>[x]</button>";
        }
        else {
            this.node.innerHTML = /*html*/ "<button>[&nbsp;]</button>";
        }
    };
    return CheckBox;
}(core_1.Component));
exports.CheckBox = CheckBox;

},{"./core":"node_modules/axino/core.ts"}],"task.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = void 0;

var button_1 = require("axino/button");

var div_1 = require("axino/div");

var constants_1 = require("axino/constants");

var checkbox_1 = require("axino/checkbox");

var widget_1 = require("axino/widget"); //==================
// Task Widget     :
//==================
// Task Widget:


var Task =
/** @class */
function (_super) {
  __extends(Task, _super); // Constructor:


  function Task(text, checked, props) {
    if (checked === void 0) {
      checked = false;
    }

    if (props === void 0) {
      props = null;
    }

    var _this = _super.call(this) || this;

    _this.checked = checked;
    _this.text = text; // Create wrapper Div:

    _this.wrapperDiv = new div_1.Div(null);

    _this.wrapperDiv.Margin("5px");

    _this.wrapperDiv.Width("90%");

    _this.wrapperDiv.Border();

    _this.wrapperDiv.setBackgroundColor("white");

    _this.wrapperDiv.appendTo(_this); // Create inner Div:


    _this.taskDiv = new div_1.Div(text);
    _this.checked = _this.checked; // Styling the Div:

    _this.taskDiv.vertical();

    _this.taskDiv.alignCenter();

    _this.taskDiv.Border();

    _this.taskDiv.Width("90%");

    _this.taskDiv.Height("50px");

    _this.taskDiv.Attribute("contenteditable", "true");

    _this.taskDiv.Margin("10px");

    _this.taskDiv.Padding("20px"); // Text attribute of TaskDiv:


    _this.taskDiv.node.innerHTML = text;

    _this.taskDiv.appendTo(_this.wrapperDiv); // CheckButton:


    _this.checkButton = new checkbox_1.CheckBox();

    _this.checkButton.Margin("10px");

    _this.checkButton.appendTo(_this.wrapperDiv); // Initially checked :


    _this.refresh(); // Delete task button:


    _this.deleteButton = new button_1.Button("-");

    _this.deleteButton.Margin("10px");

    _this.deleteButton.appendTo(_this.wrapperDiv);

    return _this;
  }

  Task.prototype.clone = function () {
    return new Task(this.text, this.checked);
  };

  Task.prototype.refresh = function () {
    if (this.checked) {
      this.taskDiv.setBackgroundColor(constants_1.colors.lightgrey);
      this.checkButton.setChecked(true);
    } else {
      this.taskDiv.setBackgroundColor(constants_1.colors.lightgoldenrodyellow);
      this.checkButton.setChecked(false);
    }
  };

  return Task;
}(widget_1.Widget);

exports.Task = Task;
},{"axino/button":"node_modules/axino/button.ts","axino/div":"node_modules/axino/div.ts","axino/constants":"node_modules/axino/constants.ts","axino/checkbox":"node_modules/axino/checkbox.ts","axino/widget":"node_modules/axino/widget.ts"}],"task_action.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskAction = void 0;

var constants_1 = require("axino/constants"); // local imports:


var task_1 = require("./task");

var TaskAction =
/** @class */
function (_super) {
  __extends(TaskAction, _super); // Constructor:


  function TaskAction(text, checked, props) {
    if (checked === void 0) {
      checked = false;
    }

    if (props === void 0) {
      props = null;
    }

    var _this = _super.call(this, text) || this;

    _this.checked = checked;

    _this.refresh(); // CheckButton action:


    _this.checkButton.onClick(function () {
      //log("CheckButton clicked (from TaskAction)");
      if (props != null) {
        if (props.check != null) {
          props.check.send(_this);
        }
      }
    }); // DeleteButton action:


    _this.deleteButton.onClick(function () {
      if (props != null) {
        if (props.delete != null) {
          props.delete.send(_this);
        }
      }
    }); // eventsFocus action:


    _this.taskDiv.onEvent(constants_1.eventsFocus.blur, function () {
      _this.text = _this.taskDiv.node.innerHTML;
    });

    return _this;
  }

  return TaskAction;
}(task_1.Task);

exports.TaskAction = TaskAction;
},{"axino/constants":"node_modules/axino/constants.ts","./task":"task.ts"}],"node_modules/axino/channel.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
var Channel = /** @class */ (function () {
    function Channel(id) {
        this.id = id;
        this.value = null;
    }
    Channel.prototype.send = function (value) {
        this.value = value;
        var event = new CustomEvent(this.id, {
            detail: {
                value: value
            }
        });
        document.dispatchEvent(event);
    };
    Channel.prototype.listen = function (callback) {
        document.addEventListener(this.id, callback);
    };
    return Channel;
}());
exports.Channel = Channel;

},{}],"node_modules/axino/vector.ts":[function(require,module,exports) {
"use strict";
/**
 * Vector : Convenience class Wrapper around Array()
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatVectors = exports.Vector = void 0;
var Vector = /** @class */ (function () {
    function Vector() {
        this.a = new Array();
    }
    /**
     *
     * @param item : Item to be appended into current Vector
     */
    Vector.prototype.append = function (item) {
        this.a.push(item);
    };
    /**
     * @param item : Item to be deleted from current Vector
     */
    Vector.prototype.delete = function (item) {
        var pos = this.a.indexOf(item);
        if (pos > -1) {
            this.a.splice(pos, 1);
        }
        else {
            throw ("Item " + item + " not found");
        }
    };
    /**
     * @param index : Index of item to be deleted from current Vector
     */
    Vector.prototype.deleteAt = function (index) {
        if (index < this.a.length) {
            this.a.splice(index, 1);
        }
        else {
            throw ("Index " + index + " not in range");
        }
    };
    /**
     *
     * @param index : Index of item to be inserted into current Vector
     * @param item : Item to be inserted
     */
    Vector.prototype.insertAt = function (index, item) {
        if (index < this.a.length) {
            this.a.splice(index, 0, item);
        }
        else {
            throw ("Index " + index + " not in range");
        }
    };
    /**
     * Delete last item from current Vector
     */
    Vector.prototype.deleteAtEnd = function () {
        this.a.splice(this.a.length - 1, 1);
    };
    /**
     *
     * @param item : Item to be inserted at the end of current Vector
     */
    Vector.prototype.insertAtEnd = function (item) {
        this.a.splice(this.a.length, 0, item);
    };
    /**
     * Delete 1st Item of current Vector
     */
    Vector.prototype.deleteAtStart = function () {
        this.a.splice(0, 1);
    };
    /**
     *
     * @param item : Item to be inserted at start of current Vector
     */
    Vector.prototype.insertAtStart = function (item) {
        this.a.splice(0, 0, item);
    };
    /**
     *
     * @param index : Index of item to be substituted,
     * @param item : Substitute item.
     */
    Vector.prototype.substituteAt = function (index, item) {
        if (index < this.a.length) {
            this.a.splice(index, 1, item);
        }
        else {
            throw ("Index " + index + " not in range");
        }
    };
    /**
     *
     * @param item : Item to be prepended to Vector.
     */
    Vector.prototype.prepend = function (item) {
        this.a.splice(0, 0, item);
    };
    /**
     *
     * @param oldItem : item to be substituted.
     * @param newItem : Substitute
     */
    Vector.prototype.substitute = function (oldItem, newItem) {
        var pos = this.a.indexOf(oldItem);
        if (pos > -1) {
            this.a.splice(pos, 1, newItem);
        }
        else {
            throw ("Item " + oldItem + " not found");
        }
    };
    /**
     *
     * @param v : Vector to be concatenated to current Vector.
     */
    Vector.prototype.concat = function (v) {
        var w = new Vector();
        var temp = __spreadArrays(this.a);
        w.a = temp.concat(__spreadArrays(v.a));
        return w;
    };
    /**
     * Delete all elements from current Vector.
     */
    Vector.prototype.clear = function () {
        this.a.splice(0, this.a.length);
    };
    /**
     * Return the underlying array from current Vector.
     */
    Vector.prototype.toArray = function () {
        return this.a;
    };
    /**
     *
     * @param v Build vector from Array v.
     */
    Vector.prototype.fromArray = function (v) {
        this.a = __spreadArrays(v);
    };
    /**
     *
     * @param item : item which is checked for inclusion.
     */
    Vector.prototype.includes = function (item) {
        return this.a.includes(item);
    };
    Vector.prototype.forEach = function (fn) {
        this.a.forEach(fn);
    };
    /**
     * @param fn: Sorting function
     */
    Vector.prototype.sort = function (fn) {
        if (fn === void 0) { fn = undefined; }
        this.a.sort(fn);
    };
    /**
     *
     * @param i fist position for swap.
     * @param j second position for swap.
     */
    Vector.prototype.swapAt = function (i, j) {
        var tmp = this.a[i];
        this.substituteAt(i, this.a[j]);
        this.substituteAt(j, tmp);
    };
    /**
     *
     * @param i Index of item whose value is returned
     */
    Vector.prototype.getValue = function (i) {
        return this.a[i];
    };
    /**
     *
     * @param i Index of value to be set
     * @param value value to be set
     */
    Vector.prototype.setValue = function (i, value) {
        if (i < this.a.length) {
            this.a[i] = value;
        }
        else {
            throw ("Index " + i + " not in range");
        }
    };
    /**
     * Returns vector length
     */
    Vector.prototype.length = function () {
        return this.a.length;
    };
    return Vector;
}());
exports.Vector = Vector;
function concatVectors(v1, v2) {
    var w = new Vector();
    w.fromArray(__spreadArrays(v1.a).concat(__spreadArrays(v2.a)));
    return w;
}
exports.concatVectors = concatVectors;

},{}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Axino lib importa:

var div_1 = require("axino/div");

var constants_1 = require("axino/constants"); // Local (custom) widgets imports:


var tasklist_1 = require("./tasklist");

var task_action_1 = require("./task_action");

var channel_1 = require("axino/channel");

var core_1 = require("axino/core");

var vector_1 = require("axino/vector");

function logState() {
  core_1.log({
    all_tasks: all_tasks
  });
  core_1.log({
    todo_tasks: todo_tasks
  });
  core_1.log({
    checkded_tasks: checked_tasks
  });
} //===================
// State            :
//===================


var all_tasks = new vector_1.Vector();
var checked_tasks = new vector_1.Vector();
var todo_tasks = new vector_1.Vector(); //=====================
// To-do-Div: main Div:
//=====================

var todoDiv = new div_1.Div(null);
todoDiv.appendToApp();
todoDiv.Width("100%");
todoDiv.setBackgroundColor(constants_1.colors.lightcyan);
todoDiv.Padding("30px");
todoDiv.appendToApp(); //=================================================
// Channels for transmitting events between widgets:
//==================================================

var channel_checked = new channel_1.Channel("check");
var channel_delete = new channel_1.Channel("delete");
var channel_add = new channel_1.Channel("add"); //==================================
// Adding TaskListWidget to todoDiv:
//==================================

var taskListWidget = new tasklist_1.TaskList({
  add: channel_add
});
taskListWidget.appendTo(todoDiv); //========================
// Populate list_of_tasks:
//========================

all_tasks.append(new task_action_1.TaskAction("Task 1", false, {
  add: channel_add,
  delete: channel_delete,
  check: channel_checked
}));
all_tasks.append(new task_action_1.TaskAction("Task 2", true, {
  add: channel_add,
  delete: channel_delete,
  check: channel_checked
}));
logState(); //==============================
// Display initial list_of_tasks:
//==============================

all_tasks.forEach(function (tsk) {
  if (tsk.checked) {
    checked_tasks.append(tsk);
  } else {
    todo_tasks.append(tsk);
  }
});
taskListWidget.appendChildren(all_tasks.toArray()); //=========================================================
// Listen to the events triggered by the TakAction Widgets:
//=========================================================
// Check:

channel_checked.listen(function (message) {
  //log(message.detail);
  logState(); // Toggle task check status:

  message.detail.value.checked = !message.detail.value.checked; // Refresh task for new check status:

  message.detail.value.refresh(); // Move current task around depending on status:

  if (message.detail.value.checked) {
    checked_tasks.append(message.detail.value);
    todo_tasks.delete(message.detail.value);
  } else {
    todo_tasks.append(message.detail.value);
    checked_tasks.delete(message.detail.value);
  }

  all_tasks = todo_tasks.concat(checked_tasks); // Refresh TaskList display:

  taskListWidget.deleteChildren(all_tasks.toArray());
  taskListWidget.appendChildren(all_tasks.toArray());
  logState();
}); // Delete:

channel_delete.listen(function (message) {
  core_1.log(message.detail);
  all_tasks.delete(message.detail.value);

  if (message.detail.value.checked) {
    checked_tasks.delete(message.detail.value);
  } else {
    todo_tasks.delete(message.detail.value);
  }

  taskListWidget.deleteChild(message.detail.value);
  logState();
}); // Add:

channel_add.listen(function (message) {
  taskListWidget.deleteChildren(all_tasks.toArray());
  core_1.log(message.detail.value);
  var temp = new task_action_1.TaskAction("", false, {
    add: channel_add,
    delete: channel_delete,
    check: channel_checked
  });
  todo_tasks.append(temp);
  all_tasks = todo_tasks.concat(checked_tasks);
  taskListWidget.appendChildren(all_tasks.toArray());
  logState();
});
},{"axino/div":"node_modules/axino/div.ts","axino/constants":"node_modules/axino/constants.ts","./tasklist":"tasklist.ts","./task_action":"task_action.ts","axino/channel":"node_modules/axino/channel.ts","axino/core":"node_modules/axino/core.ts","axino/vector":"node_modules/axino/vector.ts"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56349" + '/');

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
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map