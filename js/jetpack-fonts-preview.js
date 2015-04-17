!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){var d=[{type:"body-text",rules:[{property:"font-size",value:"16px"}],selector:"body, button, input, select, textarea"},{type:"headings",rules:[{property:"font-size",value:"33px"}],selector:".entry-title"},{type:"headings",rules:[{property:"font-size",value:"18px"}],selector:".site-title"}];b.exports=d},{}],2:[function(a,b,c){b.exports=window.wp.customize},{}],3:[function(a,b,c){b.exports=Backbone},{}],4:[function(a,b,c){var d=a("../helpers/backbone"),e=a("../helpers/underscore");b.exports=e.extend(d.Events)},{"../helpers/backbone":3,"../helpers/underscore":8}],5:[function(a,b,c){function d(a){var b=j(a.provider);return b?void b.addFontToPage(a):void h("live update failed because no provider could be found for",a)}function e(a){h("rendering live update for new styles",a),a.forEach(d),i.writeFontStyles(a)}function f(){h("binding live updates for custom-fonts"),g("jetpack_fonts[selected_fonts]",function(a){a.bind(function(a){e(a)})})}var g=a("../helpers/api"),h=a("debug")("jetpack-fonts"),i=a("../helpers/preview-styles"),j=a("../helpers/provider-views").getViewForProvider;a("../providers/google"),b.exports={liveUpdateFontsInPreview:e},f()},{"../helpers/api":2,"../helpers/preview-styles":6,"../helpers/provider-views":7,"../providers/google":9,debug:11}],6:[function(a,b,c){function d(a){return n.filter(function(b){return b.type===a})}function e(a){return d(a.type).map(f.bind(null,a)).join(" ")}function f(a,b){if(!b.selector)return"";var c=b.selector+" {";if(a.name&&(c+="font-family:"+a.name+";"),a.fvds&&Array.isArray(a.fvds)&&1===a.fvds.length){var d=a.fvds[0],e=m.expand(d);e?c+=e:l("unable to parse fvd",d,"for style",a)}else c+=m.expand("n4");return a.size&&(c+="font-size: "+g(a.size,b)+";"),c+="}"}function g(a,b){var c=h(b)||"16px",d=i(c),e=j(c),f=.06*parseInt(a,10)+1;return(f*e).toFixed(1)+d}function h(a){if(a.rules){var b;return a.rules.forEach(function(a){a.value&&"font-size"===a.property&&(b=a.value)}),b}}function i(a){var b=a.match(/((\d*\.(\d+))|(\d+))([A-Za-z]{2,3}|%)/);return b[5]}function j(a){var b,c,d=a.match(/((\d*\.(\d+))|(\d+))([A-Za-z]{2,3}|%)/);return d[4]?(b=parseInt(d[4],10),c=b>9?1:3):(b=parseFloat(d[2]),c=d[3].length+1),b.toFixed(c)}var k=a("../helpers/backbone").$,l=a("debug")("jetpack-fonts"),m=a("fvd"),n=a("../helpers/annotations"),o={getFontStyleElement:function(){return k("#jetpack-custom-fonts-css")[0]},writeFontStyles:function(a){o.removeFontStyleElement(),o.addStyleElementToPage(o.createStyleElementWith(o.generateCssFromStyles(a)))},generateCssFromStyles:function(a){return a?a.reduce(function(a,b){return a+=e(b)},""):""},createStyleElementWith:function(a){return k('<style id="jetpack-custom-fonts-css">'+a+"</style>")},removeFontStyleElement:function(){var a=o.getFontStyleElement();a&&k(a).remove()},addStyleElementToPage:function(a){k("head").append(a)}};b.exports=o},{"../helpers/annotations":1,"../helpers/backbone":3,debug:11,fvd:16}],7:[function(a,b,c){function d(){g("importing provider views from",f.JetpackFonts.providerViews),f.JetpackFonts.providerViews&&Object.keys(f.JetpackFonts.providerViews).forEach(function(a){i[a]=f.JetpackFonts.providerViews[a]})}function e(a){return d(),i[a]?(g("found view for provider",a,":",i[a]),i[a]):(g("no view found for provider",a),null)}var f=a("../helpers/api"),g=a("debug")("jetpack-fonts"),h=a("../views/dropdown-item");f.JetpackFonts||(f.JetpackFonts={}),f.JetpackFonts.providerViews||(f.JetpackFonts.providerViews={}),f.JetpackFonts.ProviderView=h;var i={};b.exports={getViewForProvider:e}},{"../helpers/api":2,"../views/dropdown-item":10,debug:11}],8:[function(a,b,c){b.exports=_},{}],9:[function(a,b,c){function d(a,b){~f.indexOf(a.id)||(f.push(a.id),WebFont.load({google:{families:[a.id],text:b}}))}var e=a("../helpers/api"),f=[],g=e.JetpackFonts.ProviderView.extend({render:function(){return this.$el.html(this.model.get("name")),this.$el.css("font-family",'"'+this.model.get("name")+'"'),this.currentFont&&this.currentFont.get("name")===this.model.get("name")?this.$el.addClass("active"):this.$el.removeClass("active"),d(this.model.toJSON(),this.model.get("id")),this}});g.addFontToPage=d,e.JetpackFonts.providerViews.google=g,b.exports=g},{"../helpers/api":2}],10:[function(a,b,c){var d=a("../helpers/backbone"),e=a("../helpers/emitter"),f=d.View.extend({className:"jetpack-fonts__option",events:{click:"fontChanged"},initialize:function(a){this.type=a.type,this.currentFont=a.currentFont,this.currentFont&&this.listenTo(this.currentFont,"change",this.render)},render:function(){return this.$el.html(this.model.get("name")),this},fontChanged:function(){e.trigger("change-font",{font:this.model,type:this.type})}});f.addFontToPage=function(){},b.exports=f},{"../helpers/backbone":3,"../helpers/emitter":4}],11:[function(a,b,c){function d(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function e(){var a=arguments,b=this.useColors;if(a[0]=(b?"%c":"")+this.namespace+(b?" %c":" ")+a[0]+(b?"%c ":" ")+"+"+c.humanize(this.diff),!b)return a;var d="color: "+this.color;a=[a[0],d,"color: inherit"].concat(Array.prototype.slice.call(a,1));var e=0,f=0;return a[0].replace(/%[a-z%]/g,function(a){"%%"!==a&&(e++,"%c"===a&&(f=e))}),a.splice(f,0,d),a}function f(){return"object"==typeof console&&"function"==typeof console.log&&Function.prototype.apply.call(console.log,console,arguments)}function g(a){try{null==a?localStorage.removeItem("debug"):localStorage.debug=a}catch(b){}}function h(){var a;try{a=localStorage.debug}catch(b){}return a}c=b.exports=a("./debug"),c.log=f,c.formatArgs=e,c.save=g,c.load=h,c.useColors=d,c.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],c.formatters.j=function(a){return JSON.stringify(a)},c.enable(h())},{"./debug":12}],12:[function(a,b,c){function d(){return c.colors[k++%c.colors.length]}function e(a){function b(){}function e(){var a=e,b=+new Date,f=b-(j||b);a.diff=f,a.prev=j,a.curr=b,j=b,null==a.useColors&&(a.useColors=c.useColors()),null==a.color&&a.useColors&&(a.color=d());var g=Array.prototype.slice.call(arguments);g[0]=c.coerce(g[0]),"string"!=typeof g[0]&&(g=["%o"].concat(g));var h=0;g[0]=g[0].replace(/%([a-z%])/g,function(b,d){if("%%"===b)return b;h++;var e=c.formatters[d];if("function"==typeof e){var f=g[h];b=e.call(a,f),g.splice(h,1),h--}return b}),"function"==typeof c.formatArgs&&(g=c.formatArgs.apply(a,g));var i=e.log||c.log||console.log.bind(console);i.apply(a,g)}b.enabled=!1,e.enabled=!0;var f=c.enabled(a)?e:b;return f.namespace=a,f}function f(a){c.save(a);for(var b=(a||"").split(/[\s,]+/),d=b.length,e=0;d>e;e++)b[e]&&(a=b[e].replace(/\*/g,".*?"),"-"===a[0]?c.skips.push(new RegExp("^"+a.substr(1)+"$")):c.names.push(new RegExp("^"+a+"$")))}function g(){c.enable("")}function h(a){var b,d;for(b=0,d=c.skips.length;d>b;b++)if(c.skips[b].test(a))return!1;for(b=0,d=c.names.length;d>b;b++)if(c.names[b].test(a))return!0;return!1}function i(a){return a instanceof Error?a.stack||a.message:a}c=b.exports=e,c.coerce=i,c.disable=g,c.enable=f,c.enabled=h,c.humanize=a("ms"),c.names=[],c.skips=[],c.formatters={};var j,k=0},{ms:13}],13:[function(a,b,c){function d(a){var b=/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(a);if(b){var c=parseFloat(b[1]),d=(b[2]||"ms").toLowerCase();switch(d){case"years":case"year":case"y":return c*l;case"days":case"day":case"d":return c*k;case"hours":case"hour":case"h":return c*j;case"minutes":case"minute":case"m":return c*i;case"seconds":case"second":case"s":return c*h;case"ms":return c}}}function e(a){return a>=k?Math.round(a/k)+"d":a>=j?Math.round(a/j)+"h":a>=i?Math.round(a/i)+"m":a>=h?Math.round(a/h)+"s":a+"ms"}function f(a){return g(a,k,"day")||g(a,j,"hour")||g(a,i,"minute")||g(a,h,"second")||a+" ms"}function g(a,b,c){return b>a?void 0:1.5*b>a?Math.floor(a/b)+" "+c:Math.ceil(a/b)+" "+c+"s"}var h=1e3,i=60*h,j=60*i,k=24*j,l=365.25*k;b.exports=function(a,b){return b=b||{},"string"==typeof a?d(a):b["long"]?f(a):e(a)}},{}],14:[function(a,b,c){function d(a,b){return Object.create(g,e({properties:a,values:b}))}var e=a("own"),f=/\s+/g,g={compact:function(a){for(var b,c,d,e,g=["n","4"],h=(a||"").split(";"),i=0;i<h.length;i++)if(b=h[i].replace(f,"").split(":"),2===b.length&&(c=b[0],d=b[1],e=this.values[c]))for(var j=0;j<e.length;j++)e[j][1]===d&&(g[this.properties.indexOf(c)]=e[j][0]);return g.join("")}};c.create=d},{own:18}],15:[function(a,b,c){function d(a,b){return Object.create(f,e({properties:a,values:b}))}var e=a("own"),f={expand:function(a){if("string"!=typeof a||2!==a.length)return null;for(var b,c,d,e,f=[null,null],g=0;g<this.properties.length;g++)for(b=a[g],c=this.properties[g],d=this.values[c],j=0;j<d.length;j++)e=d[j],e[0]===b&&(f[g]=[this.properties[g],e[1]].join(":"));return f.indexOf(null)<0?f.join(";")+";":null}};c.create=d},{own:18}],16:[function(a,b,c){function d(a){return g||(g=j.create(m,n)),g.compact(a)}function e(a){return h||(h=k.create(m,n)),h.expand(a)}function f(a){return i||(i=l.create(m,n)),i.parse(a)}var g,h,i,j=a("./compactor"),k=a("./expander"),l=a("./parser"),m=["font-style","font-weight"],n={"font-style":[["n","normal"],["i","italic"],["o","oblique"]],"font-weight":[["4","normal"],["7","bold"],["1","100"],["2","200"],["3","300"],["4","400"],["5","500"],["6","600"],["7","700"],["8","800"],["9","900"]]};c.compact=d,c.expand=e,c.parse=f},{"./compactor":14,"./expander":15,"./parser":17}],17:[function(a,b,c){function d(a,b){return Object.create(f,e({properties:a,values:b}))}var e=a("own"),f={parse:function(a){if("string"!=typeof a||2!==a.length)return null;for(var b,c,d,e,f={},g=0;g<this.properties.length;g++)for(b=a[g],c=this.properties[g],d=this.values[c],j=0;j<d.length;j++)e=d[j],e[0]===b&&(f[this.properties[g]]=e[1]);return f[this.properties[0]]&&f[this.properties[1]]?f:null}};c.create=d},{own:18}],18:[function(a,b,c){function d(a,b,c){if(a!==Object(a))return void 0;var d,e={};for(d in a)a.hasOwnProperty(d)&&(e[d]=Object.getOwnPropertyDescriptor(a,d),"boolean"==typeof b&&(e[d].writable=b),"boolean"==typeof c&&(e[d].configurable=c));return e}function e(a){return d(a,!1,!1)}d.readonly=e,b.exports=d},{}]},{},[5]);