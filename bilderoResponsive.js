/*! Copyright Bildero(c) 2014 
 * Required: Bootstrap 3.0
 * Version : 1.0.0
 * 
 */
 
 $(function(){
	$.fn.bilderoResponsive = function(options){
		// settings
		var settings = $.extend(true, $.fn.bilderoResponsive.options, options);
		var _paddingL = settings['marginLeft'];
		var _paddingR = settings['marginRight'];
		var OFFSET = settings['xsOffset'];
		var domainArr = settings.domains;
		if(domainArr.indexOf('bildero.com')==-1) domainArr.push("bildero.com"); 
		var thrshld = settings.screenThresholds;
		var cSize   = settings.columnsSize;
		var rSize = {};
		rSize['xs'] = {c:1, r: $(document).innerWidth()}
		rSize['sm'] = {c:parseInt(cSize['sm']) , r:parseInt(thrshld['sm'])};
		rSize['md'] = {c:parseInt(cSize['md']) , r:parseInt(thrshld['md'])};
		rSize['lg'] = {c:parseInt(cSize['lg']) , r:parseInt(thrshld['lg'])};
		var _r = getRes();
		$.fn.bilderoResponsive.screenSize = $(document).innerWidth();
		if(!settings.noAdd){
			$.fn.bilderoResponsive.els.push($(this));
		}
		
		
		// onResize
		if($.fn.bilderoResponsive.onresize && settings.resize){
			$(window).on('resize', function(){
				var res = ['xs','sm','md','lg'];
				var _r = getRes();
				var _settings = $.extend(settings, {noAdd:true});
				if(res.indexOf(_r) > res.indexOf($.fn.bilderoResponsive.size)){
					for(var i=0;i<$.fn.bilderoResponsive.els.length;i++){
						$($.fn.bilderoResponsive.els[i]).bilderoResponsive(_settings);
					}
				}else if(/*res.indexOf(_r)==0 &&*/  $(document).innerWidth()>=OFFSET+$.fn.bilderoResponsive.screenSize){
						for(var i=0;i<$.fn.bilderoResponsive.els.length;i++){
							$($.fn.bilderoResponsive.els[i]).bilderoResponsive(_settings);
						}
				}
			});
		}
		$.fn.bilderoResponsive.onresize   = false;
		$.fn.bilderoResponsive.size       = _r;
		
		
		return this.each(function(){
			var _domainOk = false;
			var _bSrc = $(this).data("src") || false;
			if(_bSrc)
				for(var i=0; i<domainArr.length; i++){
					if(_bSrc.indexOf(domainArr[i]))
						_domainOk = true;
				}
			if(_domainOk){
			
				var _o = getColClass($(this));
	
				
				if(_o.length==0) return false;
				var _c = colSize(_o,_r);
				

				var _w = null;
				
				if(!getContainerClass($(this)) || _r=="xs"){ //width 100%
					_w = $(document).innerWidth()/12 * _c; 
				}else{	//fixed-width
					
					_w = (rSize[_r].c * _c);//colSizeFirst(_o,_r);
				}
				_w -= ((_paddingR+_paddingL));//PADDINGS
				var _u = prepareUrl(_bSrc,_w);
				if(settings.dev){
					var me = this;
					var img = new Image();
					
					img.onload = function(){
						var _ww = $(me).get(0).naturalWidth;//.width;
						var _hh = $(me).get(0).naturalHeight;///].height;
						$(me).attr("alt",_ww+"x"+_hh);
						if($.fn.capty){
							$(me).closest('.capty-wrapper').find(".capty-caption:first").html(_ww+"x"+_hh);
						}
						
					}
					img.src = _u;
				}
				$(this).attr("src",_u);
				
				
			}
		});
		
	}
	
	// global
	$.fn.bilderoResponsive.size = "xs";
	$.fn.bilderoResponsive.els  = [];
	$.fn.bilderoResponsive.onresize = true;
	$.fn.bilderoResponsive.screenSize = 0;
	// opts 
	$.fn.bilderoResponsive.options = {
		resize : true,
		marginLeft : 15,
		marginRight : 15,
		columnsSize : {"sm":64, "md":81, "lg":97},
		screenThresholds : {"sm":750, "md":970, "lg":1170},
		xsOffset: 50,
		domains : [],
		dev : false
	};
	
	//----------------
	function prepareUrl(u,w){
			var _url = "";
			h = "VarHeight";
			a = true;
			var hasW = false;
			var hasH = false;
			var _w = parseInt(w);
			var _h = parseInt(h);
			var _a;
			_a = u.split("?");
			_url = _a[0]+"?";
			if(_a.length>1){
				var prop = _a[1].split("&");
				for(var i=0;i<prop.length;i++){
					_url+=(i>0)? "&":"";
					var vals = prop[i].split("=");
					if(vals.length>1){
						if(vals[0]!='type'){
							if(vals[0]=='height') {
								vals[1] = _h;
								hasH = true;
							
							}
							if(vals[0]=='width'){
								vals[1] = _w;
								hasW = true;
								
							}
							_url+=vals[0]+"="+vals[1];
						}
					}else{
						_url+=prop[i];
					}
				}
				if(!hasW) _url+=((prop.length>0)? "&" : "")+"width=" +_w;
				if(!hasH && !a) _url+=((prop.length>0)? "&" : "")+"height="+_h;
				if(a) _url+=((prop.length>0)? "&" : "")+"type=VarHeight";
			}else{
				_url+="width=" +_w;
				if(!a) _url+="&height="+_h;
				else _url+="&type=VarHeight";
			}
			return _url;
		}
	//----------------
	function colSizeFirst(_o,_r){
		var _i = 1;
		var _f = false;
		var res = ['xs','sm','md','lg'];
		var _rr = null;
		var _ri = res.indexOf(_r);
		
		for(var j=_ri;j>=0;j--){
			_rr = res[j];
			
			for(var i=0; i<_o.length;i++){
				
				
				if(res.indexOf(_o[i].res)<=res.indexOf(_rr)){
					console.log("%s %s",_rr,_o[i].res)
					_f = true;
					_i = _o[i].col;
					break;
				}
			}
			if(_f) break;
		}
		return _i;
	}		
	//----------------
	function colSize(_o,_r){
		var _i = 12;
		var _f = false;
		var res = ['xs','sm','md','lg'];
		var _rr = null;
		var _ri = res.indexOf(_r);
		var _a  = [];
		var _v  = 0;
		
		//for(var j=res.length-1;j>=0;j--){
			_rr = res[_ri];//res[j];
			
			for(var i=0; i<_o.length;i++){
				if(res.indexOf(_o[i].res)<=res.indexOf(_rr)){
					_i = _o[i].col;
					_a.push(_o[i]);
				}
			}
		//FIXING STEEPS
		_b = [];
		for(var _w = 0; _w<_a.length;_w++){
			var _step = _a[_w].s;
			var _ssss = -1;
			var _iiii = -1;
			for(var _ww = 0; _ww<_a.length;_ww++){
				if(_step == _a[_ww].s && !_a[_ww].ch){
					if(_ssss < res.indexOf(_a[_ww].res));{
						_a[_ww].ch = true;
						_ssss = res.indexOf(_a[_ww].res);
						_iiii = _ww;
					}
				}
			}
			if(_iiii>-1)
				_b.push(_a[_iiii].col);
		}
		
		_a = _b;
		// --------------
		if(_a.length>1){ 
			_v = _a[_a.length-1];
			for(var i = _a.length-2; i>=0; i--){
				_v *= _a[i]/12;
			}
			return _v;
		}
		return _i;
	}
	//----------------
	function compare(a,b) {
	  if (a.s < b.s)
	     return -1;
	  if (a.s > b.s)
	    return 1;
	  return 0;
	}
	//----------------
	function getRes(){
		var envs = ['xs', 'sm', 'md', 'lg'];
		var $el = $('<div>');
		$el.appendTo($('body'));
		var _found = false;
		var env = envs[0];
		for (var i = envs.length - 1; i >= 0; i--) {
			env = envs[i];
			$el.addClass('hidden-'+env);
			if ($el.is(':hidden')) {
				$el.remove();
				//break;
				return env;
			}
		}
		return env;
	}
	//----------------
	function getContainerClass(el){
		var fixed = true;
		var quit  = false;
		var patt1, patt2;
		patt1 = /\bcontainer\b/i;
		patt2 = /\bcontainer-fluid\b/i;
		var classList = [];
		if(el.get(0) && el.get(0).className)
			classList = el.get(0).className.split(/\s+/);
	
		//console.log("WAT %o", el);
		for(var i = 0; i<classList.length; i++){
			//.container (fixed-width) or 
			if(classList[i].match(patt2)){
				fixed = false;
				quit  = true;
				console.log("CONTAINER-FLUID");
			//.container-fluid 100%
			}else if(classList[i].match(patt1)){
				console.log("CONTAINER");
				fixed = true;
				quit  = true;
			}
		}
		var _p = el.parent() || false
		if(_p && !quit) fixed = getContainerClass($(_p));
		return fixed;
	}
	//----------------
	function getColClass(el,arr,step){
		var quit = false;
		var _obj = [];
		var __i  = 0;
		if(arguments.length==3){
			_obj = arr;
			__i  = step;
		}
		var classList = [];
		if($(el.get(0)).attr("class")){
			//console.log($(el.get(0)).attr("class"));
			classList = el.get(0).className.split(/\s+/);
		}
		var patt = /\bcol-(xs|sm|md|lg)-\d+\b/i;
		var patt1, patt2;
		patt1 = /\bcontainer\b/i;
		patt2 = /\bcontainer-fluid\b/i;
		
		for(var i = 0; i<classList.length; i++){
			if(classList[i].match(patt1)){
				quit = true;
			}
			else if(classList[i].match(patt2)){
				quit = true;
			}
			if(classList[i].match(patt)){
				var _a = classList[i].split("-");
				_obj.push({res:_a[1], col:parseInt(_a[2]), s:parseInt(__i)});
				//quit = true;
			}
		}
		
		
		var _p = el.parent() || false;
		if(!quit && _p){ ///*_obj.length==0*/
			_obj = getColClass($(_p),_obj,__i+1);
		}
		//console.log(_obj);
		return _obj;
	}
});