/**
 * 有效的值
 * @param {*} val 
 */
export function isDef(val) {
  return val !== '' && val !== null && val !== undefined
}

/**
 * 无效值
 * @param {*} val 
 */
export function isUndef(val) {
  return val === '' || val === null || val === undefined
}

const _toString = Object.prototype.toString;

/**
 * get the raw type string of a value, e.g., [object Object].
 * @param {*} value 
 */
export function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

/**
 * Strict Object type check.
 * @param {*} obj 
 */
export function isPlainObject(obj) {
  return _toString.call(obj) === "[object Object]";
}

/**
 * Strict RegExp type check.
 * @param {*} v 
 */
export function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}

/**
 * Promise check
 * @param {*} val 
 */
export function isPromise(val) {
  return (
    isDef(val) &&
    typeof val.then === "function" &&
    typeof val.catch === "function"
  );
}

/**
 * Convert a value to a string that is actually rendered.
 * @param {*} val 
 */
export function toString(val) {
  return val == null
    ? ""
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val);
}

/**
 * deep clone obj
 * @param {*} obj 
 * @param {*} hash 
 */
export function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj === "null" || typeof obj !== "object") {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let o = new obj.constructor();
  hash.set(obj, o);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      o[key] = deepClone(obj[key], hash);
    }
  }
  return o;
}

/**
 * deep clone obj by JSON function
 * @param {*} obj 
 */
export function jsonCopy(obj) {
  if (isDef(obj)) {
    return JSON.parse(JSON.stringify(obj));
  }
  return obj;
}

/**
 * Check if two values are loosely equal - that is, if they are plain objects, do they have the same shape?
 * @param {*} a 
 * @param {*} b 
 */
export function looseEqual(a, b) {
  if (a === b) return true;
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i]);
          })
        );
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return (
          keysA.length === keysB.length &&
          keysA.every(key => {
            return looseEqual(a[key], b[key]);
          })
        );
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

/**
 * 防抖函数 - debounce
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 
 */
export function debounce(func, wait, immediate = true) {
  let timeout, result;
  const later = (context, args) =>
    setTimeout(() => {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }, wait);
  let debounced = function (...params) {
    if (!timeout) {
      timeout = later(this, params);
      if (immediate) {
        // 立即执行
        result = func.apply(this, params);
      }
    } else {
      clearTimeout(timeout);
      // 函数在每个等待时延的结束被调用
      timeout = later(this, params);
    }
    return result;
  };
  // 提供外部清空定时器的方法
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}

/**
 * 节流函数 - throttle
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options 
 */
export function throttle(func, wait, options = {}) {
  let timeout, context, args, result;
  let previous = 0;
  const later = () => {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };

  let throttled = function (...params) {
    let now = Date.now();
    if (!previous && options.leading === false) {
      previous = now;
    }
    // remain 为距离下次执行 func 的时间
    let remain = wait - (now - previous);
    context = this;
    args = params;
    // remain > wait 表示客户端时间被调整过
    if (remain <= 0 || remain > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(this, params);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remain);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };
}


/**
 * return GUID
 */
export function GUID() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * Object Array duplicate
 * @param {*} arr 
 * @param {*} key 
 */
export function hexDuplicate(arr, key) {
  let set = new Set()
  return arr.filter((a) => !set.has(a[key]) && set.add(a[key]))
}

/**
 * curry
 * @param {*} fn 
 * @param  {...any} args 
 */
export function curry(fn, ...args) {
  return args.length < fn.length ? (...arr) => curry(fn, ...args, ...arr) : fn(...args)
}
