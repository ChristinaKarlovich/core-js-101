/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.height = height;
  this.width = width;
  this.getArea = function getArea() {
    return this.height * this.width;
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  return Object.setPrototypeOf(obj, proto);
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

function MyCssSelectorBuilder() {
  this.str = '';
  this.hasElement = false;
  this.stringify = function stringify() {
    const result = this.str;
    this.str = '';
    return result;
  };

  this.element = function element(value) {
    if (this.hasElement) {
      let e = 'Element, id and pseudo-element should';
      e += ' not occur more then one time inside the selector';
      throw new Error(e);
    }
    if (this.str) {
      let e = 'Selector parts should be arranged in the following order: ';
      e += 'element, id, class, attribute, pseudo-class, pseudo-element';
      throw new Error(e);
    }
    this.hasElement = true;
    this.str += value;
    return this;
  };

  this.id = function id(value) {
    if (this.str.includes('#')) {
      let e = 'Element, id and pseudo-element should';
      e += ' not occur more then one time inside the selector';
      throw new Error(e);
    }
    if (this.str.includes('.')) {
      let e = 'Selector parts should be arranged in the following order: ';
      e += 'element, id, class, attribute, pseudo-class, pseudo-element';
      throw new Error(e);
    }
    if (this.str.includes('[')) {
      let e = 'Selector parts should be arranged in the following order: ';
      e += 'element, id, class, attribute, pseudo-class, pseudo-element';
      throw new Error(e);
    }
    if (this.str.includes(':')) {
      let e = 'Selector parts should be arranged in the following order: ';
      e += 'element, id, class, attribute, pseudo-class, pseudo-element';
      throw new Error(e);
    }
    if (this.str.includes('::')) {
      let e = 'Selector parts should be arranged in the following order: ';
      e += 'element, id, class, attribute, pseudo-class, pseudo-element';
      throw new Error(e);
    }
    this.str += `#${value}`;
    return this;
  };

  this.class = function classfn(value) {
    if (this.str.includes('[')) {
      let e = 'Selector parts should be arranged in the following order: ';
      e += 'element, id, class, attribute, pseudo-class, pseudo-element';
      throw new Error(e);
    }
    if (this.str.includes(':')) {
      let e = 'Selector parts should be arranged in the following order: ';
      e += 'element, id, class, attribute, pseudo-class, pseudo-element';
      throw new Error(e);
    }
    if (this.str.includes('::')) {
      let e = 'Selector parts should be arranged in the following order: ';
      e += 'element, id, class, attribute, pseudo-class, pseudo-element';
      throw new Error(e);
    }
    this.str += `.${value}`;
    return this;
  };

  this.attr = function attr(value) {
    if (this.str.includes(':') || this.str.includes('::')) {
      let e = 'Selector parts should be arranged in the following order: ';
      e += 'element, id, class, attribute, pseudo-class, pseudo-element';
      throw new Error(e);
    }
    this.str += `[${value}]`;
    return this;
  };

  this.pseudoClass = function pseudoClass(value) {
    if (this.str.includes('::')) {
      let e = 'Selector parts should be arranged in the following order: ';
      e += 'element, id, class, attribute, pseudo-class, pseudo-element';
      throw new Error(e);
    }
    this.str += `:${value}`;
    return this;
  };

  this.pseudoElement = function pseudoElement(value) {
    if (this.str.includes('::')) {
      let e = 'Element, id and pseudo-element should';
      e += ' not occur more then one time inside the selector';
      throw new Error(e);
    }
    this.str += `::${value}`;
    return this;
  };
}

const cssSelectorBuilder = {
  str: '',
  stringify() {
    const result = this.str;
    this.str = '';
    return result;
  },

  element(value) {
    return new MyCssSelectorBuilder().element(value);
  },

  id(value) {
    return new MyCssSelectorBuilder().id(value);
  },

  class(value) {
    return new MyCssSelectorBuilder().class(value);
  },

  attr(value) {
    return new MyCssSelectorBuilder().attr(value);
  },

  pseudoClass(value) {
    return new MyCssSelectorBuilder().pseudoClass(value);
  },

  pseudoElement(value) {
    return new MyCssSelectorBuilder().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    const a = selector1.stringify();
    const b = selector2.stringify();
    this.str += `${a} ${combinator} ${b}`;
    return this;
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
