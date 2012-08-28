/*******尚街网广告推送插件***********/
/*******css3版本 只支持moz、webkit内核浏览器以及opera***********/



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
		   timeId=null,            //定时器
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

		   



		
       // cache对象 用于请求并且存储广告数据
	   
		var cache={
		    dataArray  :[],
			avaImages  :[],     //存储有广告数据返回的图片对象
	        getData   :function(){

			   for(var i=0,len=imgs.length;i<len;i++){
			    
			     var img=new Image(),index=i;
                 img.src=imgs[index].src;				 
				 img.setAttribute('instreet_img_id',index);
				 if(img.complete){
				    cache.loadData(img);
				 }else{
					 img.onload=function(){					   
					   var obj=this;
					   obj.onload=null;      
					   cache.loadData(obj);  
					 }				 
			     }
                
				}

		    },
			loadData  :function(img){            //请求广告数据
			   
			   var index=img.getAttribute('instreet_img_id'),clientImg=imgs[index];
               if(clientImg){			   
				   if(img.width>=config.imiw&&img.height>=config.imih&&clientImg.clientWidth>=config.imiw&&clientImg.clientHeight>=config.imih){				   
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
			
		   		if(data.adsSpot.length>0||data.badsSpot.length>0){
				
					var index=data.index,
						board=new blackBoard(data);				
					boardsArr[index]=board;							
				
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
			getPosition: function(index){
			   var img=imgs[index],pos=ev.getXY(img);
			   return {x:pos.x,y:pos.y};			   
			   			   			
			},
			bodyEvents  :function(e){                             //绑定在document.body上的事件 
               var event=ev.getEvent(e),
				   tar=ev.getTarget(event),
				   type=event.type.toString();

				if(type==="mouseover"){
	
					if(tar.tagName=="IMG"&&tar.getAttribute("instreet_data_ready")=="true"){

					   var index=tar.getAttribute("instreet_img_id"),c=instreet.container,buttons=ev.$(c,null,'button_switch');
					   instreet.recordImgAction(index);
					   for(var i=buttons.length;i--;){
					   
						   if(buttons[i].getAttribute('instreet_img_id')==index&&boardsArr[index].supportOver===true){
							 timeId=setTimeout(function(){boardsArr[index].showBoard(buttons[i])},200);
							 return;
						   }
					   
					   }
					
					}
				
			    }else if(type==="mouseout"){
	
					if(tar.tagName=="IMG"&&tar.getAttribute("instreet_data_ready")=="true"){
					    if(timeId!=null){
						   clearTimeout(timeId);
						   timeId=null;
						}
					}
				}
				
			},
			eventDelegate :function(){
			
			  ev.bind(document.body,'mouseover',function(e){
			   
			      instreet.bodyEvents(e);
				  
			   });
			  ev.bind(document.body,'mouseout',function(e){
			   
			      instreet.bodyEvents(e);
				  
			   });
			}
			

		};

		
		
        /*********black board对象**********/
        var blackBoard=function(data){
		
			this.data=data;
            this.supportOver=true;
			var _this=this;
			function init(){
               _this.init();

			   
			};
			init();
		
		};
		blackBoard.boardName="black_board";
		blackBoard.prototype.recordAction=function(data){
		  var  index=data.index,m,spots,img=imgs[index],
			   iu=encodeURIComponent(encodeURIComponent(img.src)),
			   pd=data.widgetSid,
			   ul=config.murl,
			   mid=data.imageNumId||'',
			   muh=data.imageUrlHash,
			   adData,
			   ad='',
			   at='',
			   ift=0,
			   tty=1;
			if(this.type=="ad"){
			   ad=data.adsSpot[0].adsId;
			   at=1;
			}else if(this.type=="foot"){
			   ad=data.badsSpot[0].adsId;
			   at=data.badsSpot[0].adsType;
			}
											
			ul+="?iu="+iu+"&pd="+pd+"&muh="+muh+"&ad="+ad+"&mid="+mid+"&at="+at+"&tty="+tty+"&ift="+ift+"&tg=";				
			ev.importFile('js',ul);
		
		};
		blackBoard.prototype.init=function(){
			var c=$('instreet_plugin_container'),bc=c.firstChild,
				sc=c.lastChild;

			bc.appendChild(this.createBoard());
			sc.appendChild(this.createSwitch());
			this.bindEvents();
		
		};
		
		blackBoard.prototype.createBoard=function(){                           /*创建black board*/
			    
			var data=this.data,index=data.index,b=document.createElement('div'),str="";
				b.className="black_board";b.setAttribute("instreet_img_id",index);
			if(data.adsSpot.length>0){
			    this.type="ad";
				var ad=data.adsSpot[0],src=ad.adsPicUrl,url=ad.adsLinkUrl,
				title=ad.adsTitle,price=ad.adsDiscount||ad.adsPrice,
				rdu=config.redurl+"?tty=0&mid="+ad.imageNumId+"&muh="+data.imageUrlHash+"&pd="+ad.widgetSid+"&ift=&tg=&at="+ad.adsType+"&ad="+ad.adsId+"&rurl="+encodeURIComponent(encodeURIComponent(url));
				str="<dl><dt><em class='adhesive'></em><a href='"+rdu+"' target='_blank'><img src='"+src+"' alt=''/></a></dt><dd><p class='p_name'><a href='"+rdu+"'>"+title+"</a></p><p class='p_price'><label><span>￥";
				str+=price+"</span></label></p><p class='buttons'><a href='"+rdu+"' target='_blank'>购买</a></p></dd><dd class='clearfix'></dd></dl>";
			
			}else if(data.badsSpot.length>0){
			    this.type="foot";
			    var footAd=data.badsSpot[0];
			    str+="<div class='foot_ad'>";
			    if(footAd.adsPicUrl){
				  var redUrl=config.redurl+"?tty=0&mid="+data.imageNumId+"&muh="+data.imageUrlHash+"&pd="+data.widgetSid+"&ift=&at="+(footAd.adsType||'')+"&ad="+(footAd.adsId||'')+"&tg=&rurl="+encodeURIComponent(encodeURIComponent(footAd.adsLinkUrl));
				  str+="<a href='"+redUrl+"'><img src='"+footAd.adsPicUrl+"' alt=''/></a>";
			    }else if(!footAd.adsLinkUrl&&footAd.description){
				 var fra=footAd.description;
				 str+=fra.slice(0,-2)+'></iframe>';
			    }
			    str+="</div><div class='foot_desc'><p>Ads by</p><p><a target='_blank' href='http://www.instreet.cn'>尚街网</a></p></div>";

			}
			b.innerHTML=str;
			var pos=instreet.getPosition(index),left=pos.x+"px",top=(pos.y+126)+"px";
			b.style.cssText="left:"+left+";top:"+top+";";
			this.board=b;
			return b;											
		};
		
		blackBoard.prototype.createSwitch=function(){                         /*创建switch*/

				var data=this.data,s=document.createElement("a"),index=data.index,pos=instreet.getPosition(index),left=(pos.x+imgs[index].width)+"px",top=(pos.y+60)+"px";
				s.className="button_switch";
				s.innerHTML="Instreet";s.href="javascript:;";
				s.setAttribute("state","close");s.setAttribute("instreet_img_id",index);
				s.style.cssText="left:"+left+";top:"+top;
				this.switch=s;
				return s;
	    };
		
        blackBoard.prototype.showBoard=function(){                    /*显示board*/

			  var _this=this,b=_this.board,btn=_this.switch;
				  animation=["bounceInLeft","bounceInRight","bounceInDown"],ran=Math.floor(Math.random()*3),
				  state=btn.getAttribute("state");
			  if(state==="close"){
                  var name=blackBoard.boardName;
				  if(b.className===name||b.className===name+" hinge"){
					b.style.display="block";
					b.className=name+" "+animation[ran];
					btn.innerHTML="Close Ad";
					setTimeout(function(){btn.setAttribute("state","open");},1000);
				  }  
				  this.recordAction(_this.data);
			  }
		};
			
		blackBoard.prototype.hideBoard=function(btn){                 /*隐藏board*/

			  var _this=this,b=_this.board,btn=_this.switch;
				  name=blackBoard.boardName+" hinge", state=btn.getAttribute("state");;
			  if(b.className===name||state==="close"){
				return;
			  }
			  b.className=name;
			  btn.innerHTML="Instreet";
			  _this.supportOver=false;
			  setTimeout(function(){btn.setAttribute("state","close");b.style.display="none";},1200);
		
		}; 
      
        blackBoard.prototype.bindEvents=function(){					/*进行事件绑定*/
              var _this=this,btn=_this.switch,b=_this.board;
			   btn.onclick=function(){
			     var state=this.getAttribute("state");
				 if(state==="close"){
					_this.showBoard(this);
				 }
				 else if(state==="open"){
					_this.hideBoard(this);
				 }
			   };
			   ev.bind(window,"resize",function(){    //窗口大小发生变化后进行重定位
					var index=b.getAttribute("instreet_img_id"),pos=instreet.getPosition(index);
					btn.style.cssText="left:"+(pos.x+imgs[index].width)+"px;top:"+(pos.y+60)+"px;";
					b.style.left=pos.x+"px";b.style.top=(pos.y+126)+"px";
			        
			   });
		
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
		
	