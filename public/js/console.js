/**
 * @Description: 发送console
 * @Author: wangjun
 * @Update: 2016-08-31 14:00
 * @version: 1.0
 * @Github URL: https://github.com/nevergiveup-j/mobile-console
 */

!function(win, doc){
  var docEl = doc.documentElement,
    userAgent = navigator.userAgent.toLowerCase(),
    domainUrl = /^https/i.test(location.href) ? 'https://127.0.0.1:3002' : 'http://127.0.0.1:3002';

  var Util = {
    /**
     * 元素绑定事件
     * @name util.bind
     * @param {object}    elem      目标元素
     * @param {string}    type      事件类型
     * @param {function}  handler   处理函数
     */
    bind: function(elem,type,handler) {
      var guid = 1;
      if(win.addEventListener){ 
        elem.addEventListener(type, handler, false);
        return false; 
      }
      if (!guid) handler.guid = guid++;
      if (!elem.events) elem.events = {};
      var handlers = elem.events[type];
      if (!handlers) {
        handlers = elem.events[type] = {};
        if (elem["on" + type]) {
          handlers[0] = elem["on" + type];
        }
      }

      handlers[handler.guid] = handler;
      elem["on" + type] = _handleEvent;
      
      /** 
       * 执行事件 
       * @param {Object} event 
       */ 
      function _handleEvent(event) { 
        var event = event || win.event; 
        var handles = this.events[event.type]; 
        for(var i in handles){ 
          handles[i].call(this,event); 
        } 
      }
    },
    /**
     * 元素删除事件
     * @name util.unbind
     * @param {object}     elem       目标元素
     * @param {string}     type     事件类型
     * @param {function}   handler    处理函数
     */
    unbind: function(elem,type,handler) {
      if(win.removeEventListener){ 
        elem.removeEventListener(type, handler); 
        return; 
      }
      if(elem.events){
        var fns = elem.events[type];
        if(fns){
          delete fns[handler._id]
        }
      } 
    },
    /**
     * DOM就绪时执行的函数
     * @name Util.ready
     * @param {object} func
     */
    ready: function(func) {
      var _readyList = [];
      _readyList.push(func);

      if(Util.browser.msie){
        Util.unbind(_doc,"readystatechange",_DOMContentLoaded);
        Util.bind(_doc,"readystatechange",_DOMContentLoaded);
      }else{
        Util.bind(_win,"DOMContentLoaded",_DOMContentLoaded);
      }

      function _DOMContentLoaded(){
        if(Util.browser.msie){
          if( _doc.readyState ==="complete"||_doc.readyState==="interactive"){
            Util.unbind(_doc,"readystatechange",_DOMContentLoaded);
            _startReady();
          }
        }else{
          Util.unbind(_win,"DOMContentLoaded",_DOMContentLoaded);
          _startReady();
        };
      }

      function _startReady(){
        for(var i=0,len=_readyList.length;i<len;i++){
          setTimeout(_readyList[i],25);
        };
      };

    },
    /**
     * 判断浏览器类型和版本
     * @name util.browser
     *
     */ 
    browser: {
      version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
      chrome: /chrome/.test( userAgent ), 
      safari: /webkit/.test( userAgent ),
      opera: /opera/.test( userAgent ),
      msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
      mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ),
      mobile: /Mobile/i.test( userAgent ) || 'ontouchstart' in doc.documentElement,
      ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test( userAgent ),
      iphone: /iphone/i.test( userAgent ),
      ipad: /ipad/i.test( userAgent ),
      android: /android/i.test( userAgent ) || /Linux/i.test( userAgent )
    },
    /**
     * 根据 id 获取元素
     * @name util.byId
     * @param {string}   elem   目标元素
     * @param {object}   doc      可选，上下文
     */
    byId: function(elem, _doc) {
      return ((typeof elem =="string") ? (_doc || doc).getElementById(elem) : elem) || null;
    },
    /**
     * 获取和设置元素特的值
     * @name util.attr
     * @param {object}   elem   目标元素
     * @param {string}   attr       事件类型
     * @param {string}   value      事件值
     */
    attr: function(elem, attr, value) {
      if(arguments.length == 2) {
        return elem.attributes[attr] ? elem.attributes[attr].nodeValue : undefined  
      }
      else if(arguments.length == 3) {
        elem.setAttribute(attr, value)  
      }
    }
  }

  var Match = {
    /**
     * 获取ID
     * @return {[type]} [description]
     */
    getId: function() {
      var script = Util.byId('consolesscript'),
        id = Util.attr(script, 'data-channel') || 0;

      return id;
    },
    /**
     * 窗口尺寸
     * @return {[type]} [description]
     */
    screenSize: function() {
      var screen = window.screen;

      return screen.width + 'x' + screen.height;
    },
    /**
     * 获取参数
     * @return {[type]} [description]
     */
    getParam: function(value) {
      var id = Match.getId(),
        screenSize = Match.screenSize();

      return '?id=' + id + '&body=' + value + '&screen=' + screenSize;
    },
    /**
     * log
     * @return {[type]} [description]
     */
    log: function(value) {
      var param = this.getParam(value);  

      // console.log(userAgent); 

      this.createImage(param);   
    },
    /**
     * 创建图片
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    createImage: function(param) {
      var url = domainUrl + '/log.gif',
        img = new Image(1, 1);

      img.src = url + param;
      img.onload = function(){}

      console.log(url);
    }
  }

  /**
   * console
   * @type {Object}
   */
  var consoles = {
    log: function(value) {
      Match.log(value);
    }
  }

  win.consoles = consoles;
}(window, document);

