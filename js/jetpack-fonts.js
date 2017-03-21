!function e(t,n,i){function o(r,a){if(!n[r]){if(!t[r]){var l="function"==typeof require&&require;if(!a&&l)return l(r,!0);if(s)return s(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[r]={exports:{}};t[r][0].call(u.exports,function(e){var n=t[r][1][e];return o(n?n:e)},u,u.exports,e,t,n,i)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<i.length;r++)o(i[r]);return o}({1:[function(e,t,n){function i(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return e;var i="color: "+this.color;e=[e[0],i,"color: inherit"].concat(Array.prototype.slice.call(e,1));var o=0,s=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(s=o))}),e.splice(s,0,i),e}function s(){return"object"==typeof console&&"function"==typeof console.log&&Function.prototype.apply.call(console.log,console,arguments)}function r(e){try{null==e?localStorage.removeItem("debug"):localStorage.debug=e}catch(t){}}function a(){var e;try{e=localStorage.debug}catch(t){}return e}n=t.exports=e("./debug"),n.log=s,n.formatArgs=o,n.save=r,n.load=a,n.useColors=i,n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(a())},{"./debug":2}],2:[function(e,t,n){function i(){return n.colors[u++%n.colors.length]}function o(e){function t(){}function o(){var e=o,t=+new Date,s=t-(c||t);e.diff=s,e.prev=c,e.curr=t,c=t,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=i());var r=Array.prototype.slice.call(arguments);r[0]=n.coerce(r[0]),"string"!=typeof r[0]&&(r=["%o"].concat(r));var a=0;r[0]=r[0].replace(/%([a-z%])/g,function(t,i){if("%%"===t)return t;a++;var o=n.formatters[i];if("function"==typeof o){var s=r[a];t=o.call(e,s),r.splice(a,1),a--}return t}),"function"==typeof n.formatArgs&&(r=n.formatArgs.apply(e,r));var l=o.log||n.log||console.log.bind(console);l.apply(e,r)}t.enabled=!1,o.enabled=!0;var s=n.enabled(e)?o:t;return s.namespace=e,s}function s(e){n.save(e);for(var t=(e||"").split(/[\s,]+/),i=t.length,o=0;i>o;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function r(){n.enable("")}function a(e){var t,i;for(t=0,i=n.skips.length;i>t;t++)if(n.skips[t].test(e))return!1;for(t=0,i=n.names.length;i>t;t++)if(n.names[t].test(e))return!0;return!1}function l(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=o,n.coerce=l,n.disable=r,n.enable=s,n.enabled=a,n.humanize=e("ms"),n.names=[],n.skips=[],n.formatters={};var c,u=0},{ms:3}],3:[function(e,t){function n(e){var t=/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),i=(t[2]||"ms").toLowerCase();switch(i){case"years":case"year":case"y":return n*u;case"days":case"day":case"d":return n*c;case"hours":case"hour":case"h":return n*l;case"minutes":case"minute":case"m":return n*a;case"seconds":case"second":case"s":return n*r;case"ms":return n}}}function i(e){return e>=c?Math.round(e/c)+"d":e>=l?Math.round(e/l)+"h":e>=a?Math.round(e/a)+"m":e>=r?Math.round(e/r)+"s":e+"ms"}function o(e){return s(e,c,"day")||s(e,l,"hour")||s(e,a,"minute")||s(e,r,"second")||e+" ms"}function s(e,t,n){return t>e?void 0:1.5*t>e?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var r=1e3,a=60*r,l=60*a,c=24*l,u=365.25*c;t.exports=function(e,t){return t=t||{},"string"==typeof e?n(e):t["long"]?o(e):i(e)}},{}],4:[function(e,t){var n=e("../helpers/backbone"),i=e("../models/available-font");t.exports=n.Collection.extend({model:i})},{"../helpers/backbone":8,"../models/available-font":18}],5:[function(e,t){t.exports=window.wp.customize},{}],6:[function(e,t){var n=e("../helpers/bootstrap"),i=[];n&&n.fonts&&(i=n.fonts),t.exports=i},{"../helpers/bootstrap":9}],7:[function(e,t){function n(e,t){return"headings"===e.id?-1:"headings"===t.id?1:0}function i(e){return e.reduce(function(e,t){return"site-title"!==t.id&&e.push(t),e},[])}var o=e("../helpers/bootstrap"),s=[];o&&o.types&&(s=o.types.sort(n),s=i(s)),t.exports=s},{"../helpers/bootstrap":9}],8:[function(e,t){t.exports=Backbone},{}],9:[function(e,t){var n=window._JetpackFonts;t.exports=n},{}],10:[function(e,t){var n=e("../helpers/backbone"),i=e("../helpers/underscore");t.exports=i.extend(n.Events)},{"../helpers/backbone":8,"../helpers/underscore":14}],11:[function(e,t){var n="undefined"!=typeof window?window._JetpackFonts.fvdMap:{n1:"Thin",i1:"Thin Italic",o1:"Thin Oblique",n2:"Extra Light",i2:"Extra Light Italic",o2:"Extra Light Oblique",n3:"Light",i3:"Light Italic",o3:"Light Oblique",n4:"Regular",i4:"Italic",o4:"Oblique",n5:"Medium",i5:"Medium Italic",o5:"Medium Oblique",n6:"Semibold",i6:"Semibold Italic",o6:"Semibold Oblique",n7:"Bold",i7:"Bold Italic",o7:"Bold Oblique",n8:"Extra Bold",i8:"Extra Bold Italic",o8:"Extra Bold Oblique",n9:"Ultra Bold",i9:"Ultra Bold Italic",o9:"Ultra Bold Oblique"};t.exports={getFontVariantNameFromId:function(e){var t=n[e];return t?t:"Regular"}}},{}],12:[function(e,t){function n(){s("importing provider views from",o.JetpackFonts.providerViews),o.JetpackFonts.providerViews&&Object.keys(o.JetpackFonts.providerViews).forEach(function(e){a[e]=o.JetpackFonts.providerViews[e]})}function i(e){return n(),a[e]?(s("found view for provider",e),a[e]):(s("no view found for provider",e),null)}var o=e("../helpers/api"),s=e("debug")("jetpack-fonts:provider-views"),r=e("../views/dropdown-item");o.JetpackFonts||(o.JetpackFonts={}),o.JetpackFonts.providerViews||(o.JetpackFonts.providerViews={}),o.JetpackFonts.ProviderView=r.extend({mouseenter:function(){},mouseleave:function(){}});var a={};t.exports={getViewForProvider:i}},{"../helpers/api":5,"../views/dropdown-item":28,debug:1}],13:[function(e,t){var n="undefined"!=typeof window?window._JetpackFonts.i18n:{};t.exports=function(e){return n[e]?n[e]:e}},{}],14:[function(e,t){t.exports=_},{}],15:[function(e,t){t.exports=WebFont},{}],16:[function(e){var t=e("./helpers/api"),n=e("./views/master"),i=e("./models/selected-fonts");t.controlConstructor.jetpackFonts=t.Control.extend({ready:function(){this.selectedFonts=new i(this.setting()),this.selectedFonts.on("change",function(){this.setting(this.selectedFonts.toJSON())}.bind(this)),this.view=new n({selectedFonts:this.selectedFonts,el:this.container}).render(),t.section(this.section()).container.one("expanded",function(){setTimeout(this.view.loadFonts,200)}.bind(this)),t.section(this.section()).container.on("collapsed",function(){this.view.closeAllMenus()}.bind(this))}})},{"./helpers/api":5,"./models/selected-fonts":21,"./views/master":39}],17:[function(e,t){function n(e){return e.type&&e.type.id&&e.menu&&(e=e.type.id+":"+e.menu),e!==this.menuKey?this.closeMenu():void this.openMenu()}function i(){r("opening menu",this.menuKey),this.menuStatus.set({isOpen:!0})}function o(){r("closing menu",this.menuKey),this.menuStatus.set({isOpen:!1})}var s=e("../helpers/backbone"),r=e("debug")("jetpack-fonts:menu-view"),a=e("../helpers/emitter"),l=function(e){if(!e.listenTo)throw"menuViewMixin requires a Backbone View with the `listenTo` method";if(!e.menuKey)throw"menuViewMixin requires a View with a `menuKey` string property to identify the menu";return e.menuStatus||(e.menuStatus=new s.Model({isOpen:!1})),e.maybeOpenMenu=n,e.openMenu=i,e.closeMenu=o,e.listenTo(a,"open-menu",e.maybeOpenMenu),e.listenTo(a,"close-open-menus",e.closeMenu),r("added menu capability to the View",e.menuKey),e.menuStatus};t.exports=l},{"../helpers/backbone":8,"../helpers/emitter":10,debug:1}],18:[function(e,t){var n=e("../helpers/backbone"),i=e("../helpers/underscore"),o=e("../helpers/translate"),s=[{id:-10,name:o("Tiny")},{id:-5,name:o("Small")},{id:0,name:o("Normal")},{id:5,name:o("Large")},{id:10,name:o("Huge")}];t.exports=n.Model.extend({getFontVariantOptions:function(){return this.get("fvds")?this.get("fvds"):[]},getFontSizeOptions:function(){return s},getFontSizeNameFromId:function(e){var t=i.findWhere(s,{id:e});return t?t.name:!1}})},{"../helpers/backbone":8,"../helpers/translate":13,"../helpers/underscore":14}],19:[function(e,t){var n=e("../models/selected-font"),i=e("../helpers/translate");t.exports=n.extend({initialize:function(){this.set({id:"",displayName:i("Default Theme Font"),provider:""})}})},{"../helpers/translate":13,"../models/selected-font":20}],20:[function(e,t){var n=e("../helpers/backbone"),i=e("../helpers/translate"),o=e("../helpers/available-types"),s=e("../helpers/underscore"),r=e("debug")("jetpack_fonts:selected-font");t.exports=n.Model.extend({initialize:function(){this.maybeSetCurrentFvd()},defaults:{displayName:i("Default Theme Font")},set:function(){n.Model.prototype.set.apply(this,arguments),this.maybeSetCurrentFvd()},maybeSetCurrentFvd:function(){var e;return this.get("currentFvd")?void r("Font already has an fvd",this.get("currentFvd")):void(this.get("id")&&(e=s.findWhere(o,{id:this.get("type")}),e&&e.fvdAdjust&&this.get("fvds")&&(this.set("currentFvd",this.pickFvd()),r("Fvd now set to: ",this.get("currentFvd")))))},pickFvd:function(){var e=this.get("fvds"),t=4;if(this.hasVariation("n"+t,e))return"n"+t;if(t=5,this.hasVariation("n"+t,e))return"n"+t;for(t=3;t>=1;t--)if(this.hasVariation("n"+t,e))return"n"+t;for(t=6;9>=t;t++)if(this.hasVariation("n"+t,e))return"n"+t;return"n4"},hasVariation:function(e,t){return s.contains(t,e)}})},{"../helpers/available-types":7,"../helpers/backbone":8,"../helpers/translate":13,"../helpers/underscore":14,debug:1}],21:[function(e,t){var n=e("../helpers/backbone"),i=e("debug")("jetpack-fonts:selected-fonts"),o=e("../helpers/translate"),s=e("../models/selected-font");t.exports=n.Model.extend({initialize:function(e){e||(e=[]);var t=e.map(function(e){return new s(e)});this.set("fonts",t)},getFontByType:function(e){var t=this.get("fonts").reduce(function(t,n){return n.get("type")===e?n:t},null);return t||(t=new s({type:e,displayName:o("Default Theme Font")}),this.get("fonts").push(t)),t},size:function(){return this.get("fonts").length},setSelectedFont:function(e){if(i("setting selected font to",e),!e.type)return void i("Cannot set selected font because it has no type",e);var t=this.getFontByType(e.type);t.clear({silent:!0}),t?t.set(e):this.get("fonts").push(new s(e)),this.trigger("change")},toJSON:function(){return this.get("fonts").reduce(function(e,t){return t.get("id")&&e.push(t.toJSON()),e},[])}})},{"../helpers/backbone":8,"../helpers/translate":13,"../models/selected-font":20,debug:1}],22:[function(e,t){function n(e,t){~a.indexOf(e.id)||(a.push(e.id),r.load({google:{families:[e.id],text:t},classes:!1,events:!1}))}function i(e){if(!~a.indexOf(e.id)){a.push(e.id);var t=e.id+":100,200,300,400,500,600,700,800,900,100italic,200italic,300italic,400italic,500italic,600italic,700italic,800italic,900italic";if(s.providerData&&s.providerData.googleSubsetString){var n=s.providerData.googleSubsetString;n&&n.length>0&&(t+=":"+n)}r.load({google:{families:[t]}})}}var o=e("../helpers/api"),s=e("../helpers/bootstrap"),r=e("../helpers/webfont"),a=[],l=o.JetpackFonts.ProviderView.extend({render:function(){return this.$el.html(this.model.get("displayName")),this.$el.css("font-family",'"'+this.model.get("cssName")+'"'),this.currentFont&&this.currentFont.get("id")===this.model.get("id")?this.$el.addClass("active"):this.$el.removeClass("active"),n(this.model.toJSON(),this.model.get("id")),this}});l.addFontToPreview=i,o.JetpackFonts.providerViews.google=l,t.exports=l},{"../helpers/api":5,"../helpers/bootstrap":9,"../helpers/webfont":15}],23:[function(e,t){var n=e("../views/dropdown-current-template");t.exports=n.extend({className:"jetpack-fonts__current-font-size font-property-control-current",initialize:function(e){n.prototype.initialize.call(this,e),this.currentFontSize=e.currentFontSize},render:function(){return this.$el.html(this.currentFontSize),this}})},{"../views/dropdown-current-template":27}],24:[function(e,t){var n=e("../views/dropdown-current-template"),i=e("../helpers/fvd-to-readable").getFontVariantNameFromId,o=n.extend({className:"jetpack-fonts__current-font-variant font-property-control-current",initialize:function(e){n.prototype.initialize.call(this,e),this.currentFontVariant=e.currentFontVariant,this.multiOptions=e.multiOptions},render:function(){return this.$el.html(i(this.currentFontVariant)),this.multiOptions===!1?this.$el.addClass("inactive"):this.$el.removeClass("inactive"),this}});t.exports=o},{"../helpers/fvd-to-readable":11,"../views/dropdown-current-template":27}],25:[function(e,t){var n=e("debug")("jetpack-fonts:CurrentFontView"),i=e("../helpers/provider-views").getViewForProvider,o=e("../views/dropdown-current-template"),s=o.extend({className:"jetpack-fonts__current-font",events:{mouseenter:"dispatchHover",mouseleave:"dispatchHover",click:"toggleDropdown"},dispatchHover:function(e){("mouseenter"===e.type||"mouseleave"===e.type)&&this.providerView&&this.providerView[e.type](e)},initialize:function(e){o.prototype.initialize.call(this,e),this.currentFont=e.currentFont,this.active=e.active,this.listenTo(this.currentFont,"change",this.render),this.listenTo(this.menuStatus,"change",this.render)},render:function(){this.active?this.$el.addClass("active"):this.$el.removeClass("active"),this.menuStatus.get("isOpen")?this.$el.addClass("jetpack-fonts__current-font--open"):this.$el.removeClass("jetpack-fonts__current-font--open"),n("rendering currentFont:",this.currentFont.toJSON()),this.currentFont.get("id")?this.$el.removeClass("jetpack-fonts__current-font--default"):this.$el.addClass("jetpack-fonts__current-font--default"),this.providerView&&this.providerView.remove(),this.$el.text("");var e=i(this.currentFont.get("provider"));return e?(n("rendering currentFont providerView for",this.currentFont.toJSON()),this.providerView=new e({model:this.currentFont,type:this.type}),this.$el.append(this.providerView.render().el),this):(n("rendering currentFont with no providerView for",this.currentFont.toJSON()),this.currentFont.get("displayName")?this.$el.html(this.currentFont.get("displayName")):(n("error rendering currentFont because it has no displayName!",this.currentFont.toJSON()),this.$el.html("Unknown")),this)}});t.exports=s},{"../helpers/provider-views":12,"../views/dropdown-current-template":27,debug:1}],26:[function(e,t){var n=e("../helpers/backbone"),i=e("../helpers/emitter"),o=e("../models/default-font"),s=n.View.extend({className:"jetpack-fonts__default-button",tagName:"span",events:{click:"resetToDefault"},initialize:function(e){if(this.currentFont=e.currentFont,this.type=e.type,!this.type)throw"Error: cannot create DefaultFontButton without a type";this.menuStatus=e.menuStatus,this.listenTo(this.currentFont,"change",this.render),this.listenTo(this.menuStatus,"change",this.render)},render:function(){return this.$el.html(""),this.currentFont.id&&!this.menuStatus.get("isOpen")?(this.$el.addClass("active-button"),this.$el.show()):(this.$el.removeClass("active-button"),this.$el.hide()),this},resetToDefault:function(){i.trigger("change-font",{font:new o,type:this.type.id})}});t.exports=s},{"../helpers/backbone":8,"../helpers/emitter":10,"../models/default-font":19}],27:[function(e,t){var n=e("../helpers/backbone"),i=e("debug")("jetpack-fonts:DropdownCurrentTemplate"),o=e("../helpers/emitter"),s=n.View.extend({events:{click:"toggleDropdown"},initialize:function(e){this.type=e.type,this.menu=e.menu,this.menuStatus=e.menuStatus,this.active=!0},toggleDropdown:function(e){return e&&e.stopPropagation(),this.active?void(this.menuStatus.get("isOpen")?(i("menu is open; closing menus",this.menu,this.type),o.trigger("close-open-menus")):(i("menu is closed; opening menu",this.menu,this.type),o.trigger("open-menu",{type:this.type,menu:this.menu}))):void i("menu is inactive; ignoring click",this.menu,this.type)}});t.exports=s},{"../helpers/backbone":8,"../helpers/emitter":10,debug:1}],28:[function(e,t){var n=e("../helpers/backbone"),i=e("../helpers/emitter"),o=n.View.extend({className:"jetpack-fonts__option",events:{click:"fontChanged"},initialize:function(e){this.type=e.type,this.currentFont=e.currentFont,this.currentFont&&this.listenTo(this.currentFont,"change",this.render)},render:function(){return this.$el.html(this.model.get("displayName")),this},fontChanged:function(){this.currentFont&&this.currentFont!==this.model&&i.trigger("change-font",{font:this.model,type:this.type.id})}});o.addFontToControls=function(){},t.exports=o},{"../helpers/backbone":8,"../helpers/emitter":10}],29:[function(e,t){var n=e("../helpers/backbone"),i=n.View.extend({initialize:function(e){this.type=e.type,this.menu=e.menu,this.menuStatus=e.menuStatus,this.listenTo(this.menuStatus,"change",this.updateStatus)},updateStatus:function(){this.menuStatus.get("isOpen")?this.open():this.close()},open:function(){this.$el.addClass("open"),this.isOpen=!0},close:function(){this.$el.removeClass("open"),this.isOpen=!1}});t.exports=i},{"../helpers/backbone":8}],30:[function(e,t){var n=e("../helpers/backbone"),i=e("../mixins/menu-view-mixin"),o=e("../views/font-dropdown"),s=e("../views/current-font"),r=e("../views/default-font-button"),a=n.View.extend({className:"jetpack-fonts__menu-container",initialize:function(e){this.fontData=e.fontData,this.type=e.type,this.menu="fontFamily",this.menuKey=this.type.id+":"+this.menu,this.menuStatus=i(this)},render:function(){var e=new s({type:this.type,menu:this.menu,menuStatus:this.menuStatus,currentFont:this.model,active:this.fontData.length>0});return this.$el.append(e.render().el),this.$el.append(new o({type:this.type,menu:this.menu,menuStatus:this.menuStatus,currentFont:this.model,currentFontView:e,fontData:this.fontData}).render().el),this.$el.append(new r({type:this.type,menuStatus:this.menuStatus,currentFont:this.model}).render().el),this}});t.exports=a},{"../helpers/backbone":8,"../mixins/menu-view-mixin":17,"../views/current-font":25,"../views/default-font-button":26,"../views/font-dropdown":31}],31:[function(e,t){var n=e("debug")("jetpack-fonts:FontDropdown"),i=e("../helpers/emitter"),o=e("../helpers/provider-views").getViewForProvider,s=e("../views/dropdown-template"),r=e("../helpers/backbone").$,a=s.extend({className:"jetpack-fonts__menu",id:"font-select",events:{"mouseenter > .jetpack-fonts__option":"dispatchHover","mouseleave > .jetpack-fonts__option":"dispatchHover"},initialize:function(e){s.prototype.initialize.call(this,e),this.fontData=e.fontData,this.availableFonts=[],this.subViews={},this.currentFont=e.currentFont,this.currentFontView=e.currentFontView,this.listenTo(i,"load-menu-fonts",this.loadFonts)},loadFonts:function(){this.availableFonts.length>0||(this.availableFonts=this.fontData,this.render())},dispatchHover:function(e){var t;("mouseenter"===e.type||"mouseleave"===e.type)&&(t=e.currentTarget,t.cid&&this.subViews[t.cid]&&this.subViews[t.cid][e.type](e))},render:function(){return Object.keys(this.subViews).forEach(function(e){this.subViews[e].remove()}.bind(this)),n("rendering",this.availableFonts.length,"availableFonts for",this.type),this.availableFonts.forEach(function(e){var t=o(e.get("provider"));if(t){n("rendering providerView in",this.type,"font list for",e.toJSON());var i=new t({model:e,type:this.type,currentFont:this.currentFont}).render();i.el.cid=i.cid,this.subViews[i.cid]=i,this.$el.append(i.el)}},this),this},open:function(){s.prototype.open.call(this),this.adjustPosition()},adjustPosition:function(){var e=this.currentFontView.$el.offset(),t=this.currentFontView.$el.height(),i=r(".wp-full-overlay-sidebar-content").height(),o=i/2;n("adjusting position of menu; offset.top",e.top,"middle",o,"calc",e.top-t/2),e.top-t/2>=o?(n("menu: closer to bottom"),this.$el.removeClass("open-down").css({height:e.top-t-10})):(n("menu: closer to top"),n("offset.top",e.top,"availableHeight",i,"myHeight",t),this.$el.addClass("open-down").css({height:i-e.top-10}))}});t.exports=a},{"../helpers/backbone":8,"../helpers/emitter":10,"../helpers/provider-views":12,"../views/dropdown-template":29,debug:1}],32:[function(e,t){var n=e("../helpers/backbone"),i=e("../mixins/menu-view-mixin"),o=e("../views/font-size-dropdown"),s=e("../views/current-font-size"),r=e("../helpers/translate"),a=n.View.extend({className:"jetpack-fonts__font-size-control font-property-control",initialize:function(e){this.menu="fontSize",this.type=e.type,this.fontData=e.fontData,this.currentFont=e.currentFont,this.listenTo(this.currentFont,"change",this.render),this.menuKey=this.type.id+":"+this.menu,this.menuStatus=i(this)},getSelectedAvailableFont:function(){var e=this.fontData.findWhere({id:this.currentFont.get("id")});return e?e:!1},getCurrentFontSize:function(){var e=this.getSelectedAvailableFont();if(e){var t=this.currentFont.get("size");return t&&e.getFontSizeNameFromId(t)?e.getFontSizeNameFromId(t):r("Normal Size")}},isDefaultFont:function(){return!(this.currentFont.has("id")&&this.currentFont.get("id").length>0)},render:function(){return this.$el.html(""),this.isDefaultFont()?this.$el.addClass("jetpack-fonts__font-property-control--inactive"):this.$el.removeClass("jetpack-fonts__font-property-control--inactive"),this.$el.append(new s({type:this.type,menu:this.menu,menuStatus:this.menuStatus,currentFontSize:this.getCurrentFontSize()}).render().el),this.$el.append(new o({type:this.type,menu:this.menu,menuStatus:this.menuStatus,selectedAvailableFont:this.getSelectedAvailableFont(),currentFontSize:this.getCurrentFontSize()}).render().el),this}});t.exports=a},{"../helpers/backbone":8,"../helpers/translate":13,"../mixins/menu-view-mixin":17,"../views/current-font-size":23,"../views/font-size-dropdown":33}],33:[function(e,t){var n=e("../views/font-size-option"),i=e("../views/dropdown-template"),o=i.extend({className:"jetpack-fonts__font-size-dropdown font-property-control-dropdown",initialize:function(e){i.prototype.initialize.call(this,e),this.selectedAvailableFont=e.selectedAvailableFont,this.currentFontSize=e.currentFontSize},render:function(){if(this.$el.html(""),this.selectedAvailableFont){var e=this.selectedAvailableFont.getFontSizeOptions();e.forEach(function(e){this.$el.append(new n({type:this.type,id:e.id,name:e.name,currentFontSize:this.currentFontSize}).render().el)}.bind(this))}return this}});t.exports=o},{"../views/dropdown-template":29,"../views/font-size-option":34}],34:[function(e,t){var n=e("../helpers/backbone"),i=e("../helpers/emitter");t.exports=n.View.extend({className:"jetpack-fonts__font-size-option jetpack-fonts__font-property-option",events:{click:"setSizeOption"},initialize:function(e){this.type=e.type,this.id=e.id,this.name=e.name,this.currentFontSize=e.currentFontSize},render:function(){return this.$el.html(this.name),this.$el.attr("data-name",this.name),this.currentFontSize===this.name&&this.$el.addClass("current"),this},setSizeOption:function(){i.trigger("set-size",{size:this.id,type:this.type.id})}})},{"../helpers/backbone":8,"../helpers/emitter":10}],35:[function(e,t){var n=e("../helpers/backbone"),i=e("debug")("jetpack-fonts:FontTypeView"),o=e("../helpers/emitter"),s=e("../views/font-control"),r=e("../views/font-variant-control"),a=e("../views/font-size-control"),l=n.View.extend({className:"jetpack-fonts__type",events:{click:"closeMenus"},initialize:function(e){this.type=e.type,this.fontData=e.fontData,this.currentFont=e.currentFont},render:function(){this.$el.append('<div class="jetpack-fonts__type" data-font-type="'+this.type.id+'"><h3 class="jetpack-fonts__type-header">'+this.type.name+"</h3></div>"),this.$el.append(new s({type:this.type,model:this.currentFont,fontData:this.fontData}).render().el);var e=n.$('<div class="jetpack-fonts__type-options"></div>');return e.append(new r({type:this.type,currentFont:this.currentFont,fontData:this.fontData}).render().el),e.append(new a({type:this.type,currentFont:this.currentFont,fontData:this.fontData}).render().el),this.$el.append(e),this},closeMenus:function(){i("type clicked; closing menus",this.type),o.trigger("close-open-menus")}});t.exports=l},{"../helpers/backbone":8,"../helpers/emitter":10,"../views/font-control":30,"../views/font-size-control":32,"../views/font-variant-control":36,debug:1}],36:[function(e,t){var n=e("../helpers/backbone"),i=e("../mixins/menu-view-mixin"),o=e("../views/font-variant-dropdown"),s=e("../views/current-font-variant"),r=n.View.extend({className:"jetpack-fonts__font-variant-control font-property-control",initialize:function(e){this.menu="fontVariant",this.type=e.type,this.fontData=e.fontData,this.currentFont=e.currentFont,this.listenTo(this.currentFont,"change",this.render),this.menuKey=this.type.id+":"+this.menu,this.menuStatus=i(this)},getSelectedAvailableFont:function(){var e=this.fontData.findWhere({id:this.currentFont.get("id")});return e?e:!1},getCurrentFontVariant:function(){var e=this.getSelectedAvailableFont();return e&&this.type.fvdAdjust?this.currentFont.get("currentFvd"):void 0},render:function(){var e,t=this.getSelectedAvailableFont();return e=t&&t.getFontVariantOptions().length>1?!0:!1,this.currentFontView&&this.currentFontView.remove(),this.dropDownView&&this.dropDownView.remove(),e&&this.type.fvdAdjust&&(this.currentFontView=new s({type:this.type,menu:this.menu,menuStatus:this.menuStatus,currentFontVariant:this.getCurrentFontVariant(),multiOptions:e}),this.$el.append(this.currentFontView.render().el),this.dropDownView=new o({type:this.type,menu:this.menu,menuStatus:this.menuStatus,selectedAvailableFont:this.getSelectedAvailableFont(),currentFontVariant:this.getCurrentFontVariant()}),this.$el.append(this.dropDownView.render().el)),this}});t.exports=r},{"../helpers/backbone":8,"../mixins/menu-view-mixin":17,"../views/current-font-variant":24,"../views/font-variant-dropdown":37}],37:[function(e,t){var n=e("../views/font-variant-option"),i=e("../views/dropdown-template");t.exports=i.extend({className:"jetpack-fonts__font-variant-dropdown font-property-control-dropdown",initialize:function(e){i.prototype.initialize.call(this,e),this.selectedAvailableFont=e.selectedAvailableFont,this.currentFontVariant=e.currentFontVariant},render:function(){if(this.$el.html(""),this.selectedAvailableFont&&this.type.fvdAdjust){var e=this.selectedAvailableFont.getFontVariantOptions();e.forEach(function(e){this.$el.append(new n({type:this.type,id:e,currentFontVariant:this.currentFontVariant}).render().el)}.bind(this))}return this}})},{"../views/dropdown-template":29,"../views/font-variant-option":38}],38:[function(e,t){var n=e("../helpers/backbone"),i=e("../helpers/emitter"),o=e("../helpers/fvd-to-readable").getFontVariantNameFromId;t.exports=n.View.extend({className:"jetpack-fonts__font-variant-option jetpack-fonts__font-property-option",events:{click:"setVariantOption"},initialize:function(e){this.type=e.type,this.id=e.id,this.currentFontVariant=e.currentFontVariant},render:function(){return this.$el.html(o(this.id)),this.$el.data("id",this.id),this.currentFontVariant===this.id&&this.$el.addClass("current"),this},setVariantOption:function(){i.trigger("set-variant",{variant:this.id,type:this.type.id})}})},{"../helpers/backbone":8,"../helpers/emitter":10,"../helpers/fvd-to-readable":11}],39:[function(e,t){var n=e("../helpers/backbone"),i=e("../helpers/emitter"),o=e("debug")("jetpack-fonts:MasterView"),s=e("../helpers/available-fonts"),r=e("../helpers/available-types"),a=e("../views/font-type"),l=e("../collections/available-fonts"),c=e("../models/default-font");e("../providers/google"),t.exports=n.View.extend({initialize:function(e){this.selectedFonts=e.selectedFonts,o("init with currently selected fonts:",this.selectedFonts.toJSON()),this.typeViews=[],this.headingFonts=new l(s),this.bodyFonts=new l(this.headingFonts.where({bodyText:!0})),this.listenTo(i,"change-font",this.updateCurrentFont),this.listenTo(i,"set-variant",this.setFontVariant),this.listenTo(i,"set-size",this.setFontSize)},closeAllMenus:function(){i.trigger("close-open-menus")},setFontVariant:function(e){o("font variant changed",e);var t=this.selectedFonts.getFontByType(e.type);t.set("currentFvd",e.variant),this.selectedFonts.setSelectedFont(t.toJSON()),i.trigger("close-open-menus")},setFontSize:function(e){o("font size changed",e);var t=this.selectedFonts.getFontByType(e.type);t.set("size",e.size),this.selectedFonts.setSelectedFont(t.toJSON()),i.trigger("close-open-menus")},updateCurrentFont:function(e){e.font.set({type:e.type}),this.selectedFonts.setSelectedFont(e.font.toJSON()),o("updateCurrentFont with",e.font.toJSON(),"to",this.selectedFonts.getFontByType(e.type).toJSON()),"headings"===e.type&&this.updateCurrentFont({font:new c,type:"site-title"}),i.trigger("close-open-menus")},render:function(){return this.typeViews.forEach(function(e){e.remove()}),this.$el.text(""),o("rendering controls for font types",r),this.typeViews=r.map(this.renderTypeControl.bind(this)),this},renderTypeControl:function(e){var t;t=e.bodyText===!0?this.bodyFonts:this.headingFonts;var n=new a({type:e,currentFont:this.selectedFonts.getFontByType(e.id),fontData:t});return this.$el.append(n.render().el),n},loadFonts:function(){i.trigger("load-menu-fonts")}})},{"../collections/available-fonts":4,"../helpers/available-fonts":6,"../helpers/available-types":7,"../helpers/backbone":8,"../helpers/emitter":10,"../models/default-font":19,"../providers/google":22,"../views/font-type":35,debug:1}]},{},[16]);