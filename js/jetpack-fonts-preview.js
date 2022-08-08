!function r(o,i,s){function a(t,e){if(!i[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=i[t]={exports:{}},o[t][0].call(n.exports,function(e){return a(o[t][1][e]||e)},n,n.exports,r,o,i,s)}return i[t].exports}for(var c="function"==typeof require&&require,e=0;e<s.length;e++)a(s[e]);return a}({1:[function(n,o,r){!function(t){!function(){r.formatArgs=function(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+o.exports.humanize(this.diff),this.useColors){var r="color: "+this.color;e.splice(1,0,r,"color: inherit");let t=0,n=0;e[0].replace(/%[a-zA-Z%]/g,e=>{"%%"!==e&&(t++,"%c"===e&&(n=t))}),e.splice(n,0,r)}},r.save=function(e){try{e?r.storage.setItem("debug",e):r.storage.removeItem("debug")}catch(e){}},r.load=function(){let e;try{e=r.storage.getItem("debug")}catch(e){}!e&&void 0!==t&&"env"in t&&(e=t.env.DEBUG);return e},r.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&31<=parseInt(RegExp.$1,10)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},r.storage=function(){try{return localStorage}catch(e){}}(),r.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),r.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],r.log=console.debug||console.log||(()=>{}),o.exports=n("./common")(r);const e=o.exports["formatters"];e.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}}.call(this)}.call(this,n("_process"))},{"./common":2,_process:9}],2:[function(e,t,n){t.exports=function(t){function c(e){let s,t=null,n,r;function a(...o){if(a.enabled){const i=a;var e=Number(new Date),t=e-(s||e);i.diff=t,i.prev=s,i.curr=e,s=e,o[0]=c.coerce(o[0]),"string"!=typeof o[0]&&o.unshift("%O");let r=0;o[0]=o[0].replace(/%([a-zA-Z%])/g,(e,t)=>{if("%%"===e)return"%";r++;const n=c.formatters[t];return"function"==typeof n&&(t=o[r],e=n.call(i,t),o.splice(r,1),r--),e}),c.formatArgs.call(i,o);const n=i.log||c.log;n.apply(i,o)}}return a.namespace=e,a.useColors=c.useColors(),a.color=c.selectColor(e),a.extend=o,a.destroy=c.destroy,Object.defineProperty(a,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==t?t:(n!==c.namespaces&&(n=c.namespaces,r=c.enabled(e)),r),set:e=>{t=e}}),"function"==typeof c.init&&c.init(a),a}function o(e,t){const n=c(this.namespace+(void 0===t?":":t)+e);return n.log=this.log,n}function n(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return((c.debug=c).default=c).coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},c.disable=function(){var e=[...c.names.map(n),...c.skips.map(n).map(e=>"-"+e)].join(",");return c.enable(""),e},c.enable=function(e){c.save(e),c.namespaces=e,c.names=[],c.skips=[];let t;const n=("string"==typeof e?e:"").split(/[\s,]+/),r=n.length;for(t=0;t<r;t++)n[t]&&("-"===(e=n[t].replace(/\*/g,".*?"))[0]?c.skips.push(new RegExp("^"+e.slice(1)+"$")):c.names.push(new RegExp("^"+e+"$")))},c.enabled=function(e){if("*"===e[e.length-1])return!0;let t,n;for(t=0,n=c.skips.length;t<n;t++)if(c.skips[t].test(e))return!1;for(t=0,n=c.names.length;t<n;t++)if(c.names[t].test(e))return!0;return!1},c.humanize=e("ms"),c.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(t).forEach(e=>{c[e]=t[e]}),c.names=[],c.skips=[],c.formatters={},c.selectColor=function(t){let n=0;for(let e=0;e<t.length;e++)n=(n<<5)-n+t.charCodeAt(e),n|=0;return c.colors[Math.abs(n)%c.colors.length]},c.enable(c.load()),c}},{ms:7}],3:[function(e,t,n){var r=e("own"),u=/\s+/g,o={compact:function(e){for(var t,n,r,o,i=["n","4"],s=(e||"").split(";"),a=0;a<s.length;a++)if(2===(t=s[a].replace(u,"").split(":")).length&&(n=t[0],r=t[1],o=this.values[n]))for(var c=0;c<o.length;c++)o[c][1]===r&&(i[this.properties.indexOf(n)]=o[c][0]);return i.join("")}};n.create=function(e,t){return Object.create(o,r({properties:e,values:t}))}},{own:8}],4:[function(e,t,n){var r=e("own"),o={expand:function(e){if("string"!=typeof e||2!==e.length)return null;for(var t,n,r,o,i=[null,null],s=0;s<this.properties.length;s++)for(t=e[s],n=this.properties[s],r=this.values[n],j=0;j<r.length;j++)(o=r[j])[0]===t&&(i[s]=[this.properties[s],o[1]].join(":"));return i.indexOf(null)<0?i.join(";")+";":null}};n.create=function(e,t){return Object.create(o,r({properties:e,values:t}))}},{own:8}],5:[function(e,t,n){var r,o,i,s=e("./compactor"),a=e("./expander"),c=e("./parser"),u=["font-style","font-weight"],l={"font-style":[["n","normal"],["i","italic"],["o","oblique"]],"font-weight":[["4","normal"],["7","bold"],["1","100"],["2","200"],["3","300"],["4","400"],["5","500"],["6","600"],["7","700"],["8","800"],["9","900"]]};n.compact=function(e){r=r||s.create(u,l);return r.compact(e)},n.expand=function(e){o=o||a.create(u,l);return o.expand(e)},n.parse=function(e){i=i||c.create(u,l);return i.parse(e)}},{"./compactor":3,"./expander":4,"./parser":6}],6:[function(e,t,n){var r=e("own"),o={parse:function(e){if("string"!=typeof e||2!==e.length)return null;for(var t,n,r,o,i={},s=0;s<this.properties.length;s++)for(t=e[s],n=this.properties[s],r=this.values[n],j=0;j<r.length;j++)(o=r[j])[0]===t&&(i[this.properties[s]]=o[1]);return i[this.properties[0]]&&i[this.properties[1]]?i:null}};n.create=function(e,t){return Object.create(o,r({properties:e,values:t}))}},{own:8}],7:[function(e,t,n){var o=36e5,i=864e5;function s(e,t,n,r){t=1.5*n<=t;return Math.round(e/n)+" "+r+(t?"s":"")}t.exports=function(e,t){t=t||{};var n=typeof e;if(!("string"==n&&0<e.length)){if("number"==n&&isFinite(e))return(t.long?function(e){var t=Math.abs(e);if(i<=t)return s(e,t,i,"day");if(o<=t)return s(e,t,o,"hour");if(6e4<=t)return s(e,t,6e4,"minute");if(1e3<=t)return s(e,t,1e3,"second");return e+" ms"}:function(e){var t=Math.abs(e);if(i<=t)return Math.round(e/i)+"d";if(o<=t)return Math.round(e/o)+"h";if(6e4<=t)return Math.round(e/6e4)+"m";if(1e3<=t)return Math.round(e/1e3)+"s";return e+"ms"})(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}n=e;if(!(100<(n=String(n)).length)){n=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(n);if(n){var r=parseFloat(n[1]);switch((n[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*r;case"weeks":case"week":case"w":return 6048e5*r;case"days":case"day":case"d":return r*i;case"hours":case"hour":case"hrs":case"hr":case"h":return r*o;case"minutes":case"minute":case"mins":case"min":case"m":return 6e4*r;case"seconds":case"second":case"secs":case"sec":case"s":return 1e3*r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}},{}],8:[function(e,t,n){function r(e,t,n){if(e===Object(e)){var r,o={};for(r in e)e.hasOwnProperty(r)&&(o[r]=Object.getOwnPropertyDescriptor(e,r),"boolean"==typeof t&&(o[r].writable=t),"boolean"==typeof n&&(o[r].configurable=n));return o}}r.readonly=function(e){return r(e,!1,!1)},t.exports=r},{}],9:[function(e,t,n){var r,o,t=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}try{r="function"==typeof setTimeout?setTimeout:i}catch(e){r=i}try{o="function"==typeof clearTimeout?clearTimeout:s}catch(e){o=s}function a(t){if(r===setTimeout)return setTimeout(t,0);if((r===i||!r)&&setTimeout)return(r=setTimeout)(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}var c,u=[],l=!1,f=-1;function p(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&d())}function d(){if(!l){for(var e=a(p),t=(l=!0,u.length);t;){for(c=u,u=[];++f<t;)c&&c[f].run();f=-1,t=u.length}c=null,l=!1,!function(t){if(o===clearTimeout)return clearTimeout(t);if((o===s||!o)&&clearTimeout)return(o=clearTimeout)(t);try{o(t)}catch(e){try{return o.call(null,t)}catch(e){return o.call(this,t)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function g(){}t.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new h(e,t)),1!==u.length||l||a(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},t.title="browser",t.browser=!0,t.env={},t.argv=[],t.version="",t.versions={},t.on=g,t.addListener=g,t.once=g,t.off=g,t.removeListener=g,t.removeAllListeners=g,t.emit=g,t.prependListener=g,t.prependOnceListener=g,t.listeners=function(e){return[]},t.binding=function(e){throw new Error("process.binding is not supported")},t.cwd=function(){return"/"},t.chdir=function(e){throw new Error("process.chdir is not supported")},t.umask=function(){return 0}},{}],10:[function(e,t,n){t.exports=e("./bootstrap").annotations},{"./bootstrap":14}],11:[function(e,t,n){t.exports=window.wp.customize},{}],12:[function(e,t,n){e=e("../helpers/bootstrap");var r=[];e&&e.types&&(r=(r=e.types.sort(function(e,t){return"headings"===e.id?-1:"headings"===t.id?1:0})).reduce(function(e,t){return"site-title"!==t.id&&e.push(t),e},[])),t.exports=r},{"../helpers/bootstrap":14}],13:[function(e,t,n){t.exports=Backbone},{}],14:[function(e,t,n){var r=window._JetpackFonts;t.exports=r},{}],15:[function(e,t,n){var r=e("../helpers/backbone"),e=e("../helpers/underscore");t.exports=e.extend(r.Events)},{"../helpers/backbone":13,"../helpers/underscore":19}],16:[function(e,t,n){var r=e("../helpers/api"),o=e("debug")("jetpack-fonts:live-update"),i=e("../helpers/preview-styles"),s=e("../helpers/provider-views").getViewForProvider;function a(e){var t=s(e.provider);t?t.addFontToPreview(e):o("live update failed because no provider could be found for",e)}function c(e){e=function(n){if(n.length)return n;o("warning: selectedFonts is not an array. trying to convert",n);var e=Object.keys(n);return e&&e.length?e.reduce(function(e,t){return n[t]&&n[t].provider&&e.push(n[t]),e},[]):[]}(e),o("rendering live update for new styles",e),e&&e.forEach(a),i.writeFontStyles(e)}e("../providers/google"),t.exports={liveUpdateFontsInPreview:c},r.bind("preview-ready",function(){o("binding live updates for custom-fonts"),r("jetpack_fonts[selected_fonts]",function(e){e.bind(function(e){c(e)})}),c(r("jetpack_fonts[selected_fonts]").get())})},{"../helpers/api":11,"../helpers/preview-styles":17,"../helpers/provider-views":18,"../providers/google":21,debug:1}],17:[function(e,t,n){var r=e("../helpers/backbone").$,o=e("debug")("jetpack-fonts:preview-css"),i=e("fvd"),s=e("../helpers/available-types"),a=e("../helpers/annotations");function c(e){return a?(o("generating css for style type",e.type,"using these annotations:",a[e.type]),!a[e.type]||a[e.type].length<1?(o("no annotations found for style type",e.type,"; existing annotations:",a),""):a[e.type].map(function(e,t){if(!t.selector)return"";o("generateCssForAnnotation for style",e.cssName,"and annotation",t);var n="";e.cssName&&function(e){var t=!1;return u(e).forEach(function(e){e.value&&"font-family"===e.property&&"inherit"!==e.value&&(t=!0)}),t}(t)&&((r=function(e){return e.fontFamilies||e.cssName}(e))&&0<r.length&&(n+="font-family:"+r+";"));!function(n){if(s.length<1)return void o("cannot tell if ",n," is adjustable: no availableTypes");return s.reduce(function(e,t){return t.id===n&&!0===t.fvdAdjust||e},!1)}(e.type)||(n=(n+="font-weight:"+function(e,t){if(e){e=i.parse(e);if(e&&e["font-weight"])return e["font-weight"]}e=function(e){var t;return u(e).forEach(function(e){e.value&&"font-weight"===e.property&&(t=e.value)}),t}(t);if(e)return e;return"400"}(e.currentFvd,t)+";")+"font-style:"+function(e,t){if(e){e=i.parse(e);if(e&&e["font-style"])return e["font-style"]}e=function(e){var t;return u(e).forEach(function(e){e.value&&"font-style"===e.property&&(t=e.value)}),t}(t);if(e)return e;return"normal"}(e.currentFvd,t)+";");{var r;!e.size||(r=function(e,t){t=function(e){var t;return u(e).forEach(function(e){e.value&&"font-size"===e.property&&!/^inherit/.test(e.value)&&(t=e.value)}),t}(t);if(t){var n=function(e){e=e.match(/[\d\.]+([A-Za-z]{2,3}|%)/);if(e&&e[1])return e[1]}(t),r=function(e){var t,e=e.match(/((\d*\.(\d+))|(\d+))([A-Za-z]{2,3}|%)/);if(e)return e=e[4]?9<(t=parseInt(e[4],10))?1:3:(t=parseFloat(e[2]),e[3].length+1),t.toFixed(e)}(t);if(n&&r)return((.06*parseInt(e,10)+1)*r).toFixed(1)+n;o("unable to parse size annotation",t)}}(e.size,t))&&0<r.length&&(n+="font-size:"+r+";")}return n.length&&(n=function(e){return e.split(/,\s*/).reduce(function(e,t){return e.push(".wf-active "+t),e},[]).join(", ")}(t.selector)+" {"+n+"}",o("generated css for",e,"is",n)),n}.bind(null,e)).join(" ")):(o("no annotations found at all; cannot generate css"),"")}function u(e){return e.rules&&e.rules.length?e.rules:(o("no annotation rules found for",e),[])}var l={getFontStyleElement:function(){return r("#jetpack-custom-fonts-css")[0]},writeFontStyles:function(e){l.removeFontStyleElement(),a=l.maybeMergeAnnotationsForStyles(a,e);e=l.generateCssFromStyles(e);o("css generation complete:",e),l.addStyleElementToPage(l.createStyleElementWith(e))},maybeMergeAnnotationsForStyles:function(e,t){if(e)return e["site-title"]&&e.headings&&(t.length&&t.some(function(e){return"site-title"===e.type})||(o("merging site-title annotations into headings"),e.headings=e.headings.concat(e["site-title"]),delete e["site-title"])),e},generateCssFromStyles:function(e){return e?(o("generating css for styles",e),e.reduce(function(e,t){t=c(t);return t&&(e+=" "+t),e},".wf-active > body { font-weight: 400; }")):(o("generating empty css because there are no styles"),"")},createStyleElementWith:function(e){return r('<style id="jetpack-custom-fonts-css">'+e+"</style>")},removeFontStyleElement:function(){var e=l.getFontStyleElement();e&&r(e).remove()},addStyleElementToPage:function(e){r("head").prepend(e)}};t.exports=l},{"../helpers/annotations":10,"../helpers/available-types":12,"../helpers/backbone":13,debug:1,fvd:5}],18:[function(e,t,n){var r=e("../helpers/api"),o=e("debug")("jetpack-fonts:provider-views"),e=e("../views/dropdown-item"),i=(r.JetpackFonts||(r.JetpackFonts={}),r.JetpackFonts.providerViews||(r.JetpackFonts.providerViews={}),r.JetpackFonts.ProviderView=e.extend({mouseenter:function(){},mouseleave:function(){}}),{});t.exports={getViewForProvider:function(e){return o("importing provider views from",r.JetpackFonts.providerViews),r.JetpackFonts.providerViews&&Object.keys(r.JetpackFonts.providerViews).forEach(function(e){i[e]=r.JetpackFonts.providerViews[e]}),i[e]?(o("found view for provider",e),i[e]):(o("no view found for provider",e),null)}}},{"../helpers/api":11,"../views/dropdown-item":22,debug:1}],19:[function(e,t,n){t.exports=_},{}],20:[function(e,t,n){t.exports=WebFont},{}],21:[function(e,t,n){var r=e("../helpers/api"),o=e("../helpers/bootstrap"),i=e("../helpers/webfont"),s=[];e=r.JetpackFonts.ProviderView.extend({render:function(){var e,t;return this.$el.html(this.model.get("displayName")),this.$el.css("font-family",'"'+this.model.get("cssName")+'"'),this.currentFont&&this.currentFont.get("id")===this.model.get("id")?this.$el.addClass("active"):this.$el.removeClass("active"),this.disableFocus||this.$el.attr("tabindex","0"),e=this.model.toJSON(),t=this.model.get("id"),~s.indexOf(e.id)||(s.push(e.id),i.load({google:{families:[e.id],text:t},classes:!1,events:!1})),this}});e.addFontToPreview=function(e){var t;~s.indexOf(e.id)||(s.push(e.id),e=e.id+":100,200,300,400,500,600,700,800,900,100italic,200italic,300italic,400italic,500italic,600italic,700italic,800italic,900italic",o.providerData&&o.providerData.googleSubsetString&&((t=o.providerData.googleSubsetString)&&0<t.length&&(e+=":"+t)),i.load({google:{families:[e]}}))},r.JetpackFonts.providerViews.google=e,t.exports=e},{"../helpers/api":11,"../helpers/bootstrap":14,"../helpers/webfont":20}],22:[function(e,t,n){var r=e("../helpers/backbone"),o=e("../helpers/emitter"),e=r.View.extend({className:"jetpack-fonts__option",events:{click:"fontChanged",keydown:"checkKeyboardSelect"},initialize:function(e){this.type=e.type,this.currentFont=e.currentFont,this.disableFocus=Boolean(e.disableFocus),this.currentFont&&this.listenTo(this.currentFont,"change",this.render)},checkKeyboardSelect:function(e){"Enter"===e.key&&this.$el.click()},render:function(){return this.$el.html(this.model.get("displayName")),this},fontChanged:function(){this.currentFont&&this.currentFont!==this.model&&o.trigger("change-font",{font:this.model,type:this.type.id})}});e.addFontToControls=function(){},t.exports=e},{"../helpers/backbone":13,"../helpers/emitter":15}]},{},[16]);