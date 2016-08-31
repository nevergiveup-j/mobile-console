/**
 * @Description: 发送console
 * @Author: wangjun
 * @Update: 2016-08-31 14:00
 * @version: 1.0
 * @Github URL: https://github.com/nevergiveup-j/mobile-console
 */

!function(win, doc){
  var userAgent = navigator.userAgent.toLowerCase();

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
    }
  }

  var Consoles = {
    init: function() {
      console.log(1111);
    }
  }

  Consoles.init();

}(window, document);

