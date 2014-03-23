(function () {
var root = this, exports = {};

// The jade runtime:
var jade = exports.jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});


// create our folder objects
exports["includes"] = {};
exports["pages"] = {};

// body.jade compiled template
exports["body"] = function tmpl_body() {
    return '<body><div class="navbar"><div class="navbar-inner"><a href="#" class="brand">Flickr Images</a><ul class="nav"><li><a href="/">Home</a></li><li><a href="/info">Info</a></li></ul></div></div><main id="pages" role="page-container"></main></body>';
};

// head.jade compiled template
exports["head"] = function tmpl_head() {
    return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
};

// includes\photo.jade compiled template
exports["includes"]["photo"] = function tmpl_includes_photo() {
    return '<div class="photo-item"><img width="100" height="100" class="photo"/></div>';
};

// includes\photoAggregator.jade compiled template
exports["includes"]["photoAggregator"] = function tmpl_includes_photoAggregator() {
    return '<div><div class="form-horizontal"><div class="control-group"><label for="queryString" class="control-label">Search for something:</label><div class="controls"><input type="text" name="queryString" placeholder="search for something..." class="search-box gap"/><input type="button" value="Search" class="search-btn btn"/></div></div></div><div><span class="aggregatedPhotos"></span></div></div>';
};

// includes\photoList.jade compiled template
exports["includes"]["photoList"] = function tmpl_includes_photoList() {
    return '<div class="itemContainer"></div>';
};

// pages\home.jade compiled template
exports["pages"]["home"] = function tmpl_pages_home() {
    return '<section class="page home container"><h2>Welcome to Flickr Aggregator!</h2><div class="photoAggregator"></div></section>';
};

// pages\info.jade compiled template
exports["pages"]["info"] = function tmpl_pages_info() {
    return '<section class="page pageTwo container"><h2>Info</h2><p>Zsolt Zsigmondi, 2014.</p></section>';
};


// attach to window or export with commonJS
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = exports;
} else if (typeof define === "function" && define.amd) {
    define(exports);
} else {
    root.templatizer = exports;
}

})();