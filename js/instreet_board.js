/*******尚街网广告推送插件***********/
/*******css3版本 只支持moz、webkit内核浏览器以及ie9+和opera***********/



(function(window,undefined){
        
		
		/******判断页面是否已经存在instreetWidget对象******/
		if (window.InstreetWidget!=undefined||window.InstreetWidget != null){
			return null;
		} else {
			window.InstreetWidget = new Object();
			window.InstreetWidget.version = "1.0.0";
			window.InstreetWidget.name = "InstreetWidget";
		}
		/********结束判断*********/


	   var document = window.document,
		   location = window.location,
		   imgs=[],
		   boardsArr=[],
		   outFlag,
           readylist=[],
           config = {
						redurl	:	"http://www.instreet.cn/click.action",
					widgetSid	:	"5D6FZL6a13wcmpgBnoVWsU",
					//widgetSid   :   "77WCO3MnOq5GgvoFH0fbH2",
						cssurl 	:	"http://static.instreet.cn/widgets/push/css/instreet_board.css",
					callbackurl	:	"http://ts.instreet.cn:90/push.action",
						murl	:	"http://ts.instreet.cn:90/tracker.action",
						iurl    :	"http://ts.instreet.cn:90/tracker8.action",
						ourl	:	"http://ts.instreet.cn:90/loadImage.action",
						imih	:	300,
						imiw	:	300,
		    },			
			ev = {                  
				bind : function(element,type,handler){
					if(element.addEventListener){
						element.addEventListener(type,handler,false);
					}else if(element.attachEvent){
						element.attachEvent("on"+type,handler);
					}else{
						element["on"+type] = handler;
					}
				},
				remove : function(element,type,handler){
					if(element.removeEventListener){
						element.removeEventListener(type,handler,false);
					}else if(element.datachEvent){
						element.datachEvent("on"+type,handler);
					}else{
						element["on"+type] = null;
					}
				},
				getEvent : function(event){
					return event ? event : window.event;
				},
				getTarget : function(event){
					return event.target || event.srcElement;
				},
				stopPropagation : function(event){
					if(event.stopPropagation){
						event.stopPropagation();
					}else{
						event.cancelBubble = true;
					}
				},
				getRelatedTarget : function(event){
					if(event.relatedTarget){
						return event.relatedTarget;
					}else if(event.type == "mouseover"){
						return event.fromElement;
					}else if(event.type == "mouseout"){
						return event.toElement;
					}else{
						return null;
					}
				},
				getXY : function (obj){
						var x = 0, y = 0;
						if (obj.getBoundingClientRect) {
							var box = obj.getBoundingClientRect();
							var D = document.documentElement;
							x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
							y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop;
						} else {
							for (; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent) {  }
						};
						return {  x: x,  y: y };
				},
				aTrim          :function(arr){	       
					   var array=new Array();
					   arr.sort(sortNum);
					   var len=arr.length,flag=0;
					   for(var i=0;i<len;i++){
						   if(arr[i]!=arr[i+1]){
							 array[flag]=arr[i];
							 flag++;
						  }
					   }
					   return array;
					   function sortNum(a,b){return a-b;}
				},
			    $:  function(parentNode,tagName,className){  		   
					   var parent=parentNode||document;
					   if(document.getElementsByClassName) return parent.getElementsByClassName(className);
					   var arr=[];
					   var tag=tagName||'*';
					   tag=tag.toUpperCase();
					   var elements=parent.getElementsByTagName(tag);
					   for(var l=elements.length,i=l;i--;){
						   var ele=elements[i];
						   if(ele.className){
							 var cn=ele.className.replace(/\s/g,'|').split('|');
							 for(var len=cn.length,j=len;j--;){
								if(cn[j]==className){arr.push(ele);break;}
							 }
						   }
					   }
					   return arr;
				},
			   importFile  :function(type,name){
					 var ele;
					 switch(type){
					   case "js": 
					   ele=document.createElement('script');ele.src=name;ele.charset="utf-8";ele.type="text/javascript";
					   break;
					   case "css":
					   ele = document.createElement("link");ele.type = "text/css";ele.rel = "stylesheet";ele.href=name;
					   break;					   
					 }
					 var head=document.getElementsByTagName('head')[0];
					 head.appendChild(ele);
				},
				findByAttr:function(arr,attr,val){
				    var res=[];
				    if(arr){
					   for(var i=0,len=arr.length;i<len;i++){
					      var item=arr[i];
						  if(item.getAttribute(attr)==val.toString()){
						      res.push(item);
						  }
					   
					   }
					   
					}
					return res;				
				},
				show   :function(ele){
				    ele.style.display='block';
				},
				hide   :function(ele){
				   ele.style.display='none';
				},
				hasClass:function(obj,c){
				   if(obj&&obj.className){
				      var reg=new RegExp(c);

				      return reg.test(obj.className);
				   }
				   return false;
				}
		    },
			$=function(id){return document.getElementById(id);};
        
        
        var readylist=[],
			run = function () {   
				for (var i = 0; i < readylist.length; i++) readylist[i]&&readylist[i]();   
			},
		    doScrollCheck=function(){
			  try {   
					document.documentElement.doScroll('left');   
					 
			  }catch (err){   
					setTimeout(doScrollCheck, 1); 
                    return;					
			  }  
			  run();  
			};	
			
		document.ready = function (fn){  
                var isIE = !!window.ActiveXObject;
                if(document.readyState==="complete") {readylist.push(fn);run();return;}				
				if (readylist.push(fn) > 1) return; 	
				if (document.addEventListener)  			
				return document.addEventListener('DOMContentLoaded', run, false);   

				if (isIE) {   
                     doScrollCheck();
			    }  
						  

		}; 

		   

		var imgReady = (function () {

			var list = [], intervalId = null,

		 

			// 用来执行队列

			tick = function () {

				var i = 0;

				for (; i < list.length; i++) {

					list[i].end ? list.splice(i--, 1) : list[i]();

				};

				!list.length && stop();

			},

		 

			// 停止所有定时器队列

			stop = function () {

				clearInterval(intervalId);

				intervalId = null;

			};

		 

			return function (img, ready, load, error) {

				var onready, width, height, newWidth, newHeight;

		
				// 如果图片被缓存，则直接返回缓存数据

				if (img.complete) {

					ready.call(img);

					load && load.call(img);

					return;

				};

		 

				width = img.width;

				height = img.height;

		 

				// 加载错误后的事件

				img.onerror = function () {

					error && error.call(img);

					onready.end = true;

					img = img.onload = img.onerror = null;

				};

		 

				// 图片尺寸就绪

				onready = function () {

					newWidth = img.width;

					newHeight = img.height;

					if (newWidth !== width || newHeight !== height ||

						// 如果图片已经在其他地方加载可使用面积检测

						newWidth * newHeight > 1024

					) {

						ready.call(img);

						onready.end = true;

					};

				};

				onready();

		 

				// 完全加载完毕的事件

				img.onload = function () {

					// onload在定时器时间差范围内可能比onready快

					// 这里进行检查并保证onready优先执行

					!onready.end && onready();

		 

					load && load.call(img);

		 

					// IE gif动画会循环执行onload，置空onload即可

					img = img.onload = img.onerror = null;

				};

		 

				// 加入队列中定期执行

				if (!onready.end) {

					list.push(onready);

					// 无论何时只允许出现一个定时器，减少浏览器性能损耗

					if (intervalId === null) intervalId = setInterval(tick, 40);

				};

			};

		})();

		
       // cache对象 用于请求并且存储广告数据
	   
		var cache={
		    dataArray  :[],
			avaImages  :[],     //存储有广告数据返回的图片对象
	        getData   :function(){

			   for(var i=0,len=imgs.length;i<len;i++){
			    
			     var index=i,img=new Image();
                 img.src=imgs[index].src;				 
				 img.setAttribute('instreet_img_id',index);
				 imgReady(img,this.ready,this.loadData);
                
				}

		    },
			ready     :function(){
			    if(this.width<config.imiw||this.height<config.imih){
				
				    this.onload=this.onerror=null;
				}
			},
			loadData  :function(){
			   
			   var index=this.getAttribute('instreet_img_id'),clientImg=imgs[index];
               if(clientImg){			   
				   if(clientImg.width>=config.imiw&&clientImg.height>=config.imih){				   
					   cache.createJsonp(index);
					   instreet.recordImage(clientImg);
				   }
			   }
			},
			createJsonp  :function(index){
			   var iu=encodeURIComponent(encodeURIComponent(imgs[index].src)),url=config.callbackurl+"?index="+index+"&pd="+config.widgetSid+"&iu="+iu+"&callback=insjsonp";
			   ev.importFile('js',url);
			}
		
		};
		
	   //instreet对象用于生成插件相关dom元素以及为其绑定事件	
	   var	instreet={
	        container:null,
			getImgs:function(){		       
			
				  var images=document.getElementsByTagName('img'),img;
				  for(var i=0,len=images.length;i<len;i++){
					img=images[i];
					//if(img.style.display!='none'&&img.style.visibility!='hidden'){
					  img.setAttribute('instreet_img_id',i.toString());
					  imgs[i]=img;
					//}
				  }		   
			},
		    recordImage:function(img){                                //页面加载的时候向服务器发送页面中的所有图片
		       var iu=encodeURIComponent(encodeURIComponent(img.src)),
			       pd=config.widgetSid,
				   pu=encodeURIComponent(encodeURIComponent(location.href)),
				   t=encodeURIComponent(encodeURIComponent(document.title)),
				   ul=config.ourl;

				  ul+="?iu="+iu+"&pd="+pd+"&pu="+pu+"&t="+t;
				  ev.importFile('js',ul);
			   
		    },
		    recordImgAction:function(index){                           //记录鼠标移动到图片上的行为
		       var data=cache.dataArray[index],img=imgs[index],
				   ul=config.iurl,pd=data.widgetSid,muh=data.imageUrlHash,
				   iu=encodeURIComponent(encodeURIComponent(img.src));
				   
				ul+="?pd="+pd+"&muh="+muh+"&iu="+iu;
				ev.importFile('js',ul);
		   
		    },
			dataReady:function(data){                                   //数据获取成功后回调的方法
			
		   		if(data.adsSpot.length<1){
					return;
				}else{
				var index=data.index,c=$('instreet_plugin_container'),bc=c.firstChild,
					board=instreet.createBoard(data),sc=c.lastChild,swi=instreet.createSwitch(data);
				bc.appendChild(board);
				sc.appendChild(swi);
				
				boardsArr[index]=new blackBoard(board,swi);
				
				}
				
			},
			createHolder:function(){                                 //创建插件容器
			   var c=document.createElement("div"),str;
				c.id="instreet_plugin_container";
				str="<div id='board_holder'></div><div id='buttons_holder'></div>";
				c.innerHTML=str;
				document.body.appendChild(c);
				this.container=c;
			
			},
			createBoard :function(data){                           //创建black board
			    
				var ad=data.adsSpot[0],src=ad.adsPicUrl,url=ad.adsLinkUrl,
					title=ad.adsTitle,price=ad.adsDiscount||ad.adsPrice,index=data.index,
					rdu=config.redurl+"?tty=0&mid="+ad.imageNumId+"&muh="+data.imageUrlHash+"&pd="+ad.widgetSid+"&ift=&tg=&at="+ad.adsType+"&ad="+ad.adsId+"&rurl="+encodeURIComponent(encodeURIComponent(url));
				var b=document.createElement('div'),str="";
				b.className="black_board";b.setAttribute("instreet_img_id",index);
				str="<dl><dt><em class='adhesive'></em><a href='"+rdu+"' target='_blank'><img src='"+src+"' alt=''/></a></dt><dd><p class='p_name'><a href='"+rdu+"'>"+title+"</a></p><p class='p_price'><label><span>￥";
				str+=price+"</span></label></p><p class='buttons'><a href='"+rdu+"' target='_blank'>购买</a></p></dd><dd class='clearfix'></dd></dl>";
				b.innerHTML=str;
				
				var pos=instreet.getPosition(index),left=pos.x+"px",top=(pos.y+126)+"px";
				b.style.cssText="left:"+left+";top:"+top+";";
				return b;
				
				
			
			},
			createSwitch:function(data){

				var s=document.createElement("a"),index=data.index,pos=instreet.getPosition(index),left=(pos.x+imgs[index].width)+"px",top=(pos.y+10)+"px";
				s.className="button_switch";
				s.innerHTML="open";s.href="javascript:;";
				s.setAttribute("state","close");s.setAttribute("instreet_img_id",index);
				s.style.cssText="left:"+left+";top:"+top;
				return s;
			},
			getPosition: function(index){
			   var img=imgs[index],pos=ev.getXY(img);
			   return {x:pos.x,y:pos.y};			   
			   			   			
			},
			bodyEvents  :function(e){                     //绑定在document.body上的事件 
               var event=ev.getEvent(e),
				   tar=ev.getTarget(event);
				if(tar.tagName=="IMG"&&tar.getAttribute("instreet_data_ready")=="true"){
				   var index=tar.getAttribute("instreet_img_id"),c=instreet.container,buttons=ev.$(c,null,'button_switch');
				   for(var i=buttons.length;i--;){
				   
				       if(buttons[i].getAttribute('instreet_img_id')==index){
					     boardsArr[index].showBoard(buttons[i]);
						 return;
					   }
				   
				   }
				
				}
			
			},
			eventDelegate :function(){
			
			  ev.bind(document.body,'mouseover',function(e){
			   
			      instreet.bodyEvents(e);
			   });
			}
			

		};

		
		
        /*********black board对象**********/
        var blackBoard=function(b,btn){
		
		    this.board=b;
			this.button=btn;
			
			var _this=this;
			function init(){
			   btn.onclick=function(){
			     var state=this.getAttribute("state");
				 if(state==="close"){
					_this.showBoard(this);
				 }
				 else if(state==="open"){
					_this.hideBoard(this);
				 }
			   }
			};
			init();
		
		};
        blackBoard.prototype={
		    name : "black_board",
			showBoard : function(btn){
			  var _this=this,b=_this.board,
				  animation=["bounceInLeft","bounceInRight"],ran=Math.floor(Math.random()*2),
				  state=btn.getAttribute("state");
			  if(state==="close"){
			  
				  if(b.className===_this.name||b.className===_this.name+" hinge"){
					b.style.display="block";
					b.className=_this.name+" "+animation[ran];
					btn.innerHTML="Close";
					setTimeout(function(){btn.setAttribute("state","open");},1000);
				  }  
			  }
		    },
			hideBoard : function(btn){

			  var _this=this,b=_this.board,
				  name=_this.name+" hinge", state=btn.getAttribute("state");;
			  if(b.className===name||state==="close"){
				return;
			  }
			  b.className=name;
			  btn.innerHTML="Open";
			  setTimeout(function(){btn.setAttribute("state","close");b.style.display="none";},1200);

			  
			
			}
		
		};  

	    /**********jsonp的callback方法**********/	
		window['insjsonp']=function(data){
			if(data){
			  var id=data.index,img=imgs[id];
			  cache.dataArray[id]=data;
			  cache.avaImages.push(img);
			  img.setAttribute('instreet_data_ready',true);
			  instreet.dataReady(data);
			}
				
		};
		
        /*******插件初始化******/
		var init=function(){
		
				instreet.getImgs();   //先遍历页面的图片，后开始请求数据
				cache.getData();
				
			    //var cssUrl=config.cssurl;
				var cssUrl='css/instreet_board.css';
				ev.importFile('css',cssUrl);
				instreet.eventDelegate();
				instreet.createHolder();
				
		};
		
		
		/*******DOM 加载完毕后开始执行插件初始化事件********/
		document.ready(function(){
           init();
		});
		


 })(window);	
		
	