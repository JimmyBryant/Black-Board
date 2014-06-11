

function field_check(name, rule, field){
	
   
  	if(rule.indexOf("cpwd")>-1){
		strTmp = rule.split("#");
		if(strTmp[0].inc("cpwd","/") == true && field.value != $(strTmp[1]).value){
			return "The two passwords you entered don’t match. Please try again.";
		
			//return "The "+name+" must match your " +name.split(" Confirmation")[0];
		}
	}	
	if(rule.inc("eml","/")==true && !/(\,|^)([\w+._]+@\w+\.(\w+\.){0,3}\w{2,4})/.test(field.value.replace(/-|\//g,"")) && !isNone(field.value)){
		return "Are you sure your " + name + " is correct? E-mail address should be similar as: yourname@gmail.com ";
	}	
	if(rule.inc("tel","/")==true && !/(^[0-9+-]{3,30}$)/.test(field.value) && !isNone(field.value)){
		return "Is your "+name+" correct? Sorry, my system does not understand your telephone format.";
	}	
	size = rule.sub("min","/");
	if(size > 0 ){			
		if(field.value.trim().length < size && field.value.trim().length>0){
			return "Your "+ name +" must contain a minimum of "+size+" characters.";
		}
	}		
	size = rule.sub("max","/");		
	if(size > 0 ){
		if(field.value.trim().length > size){
			return "Is your "+ name +" correct? Our system requires a maximum of "+size+" characters."
		}
	}	
	if(rule.inc("nnull","/") == true && isNone(field.value)){
		return "对不起, "+name+" 是必须填写的.";		
	}	
	if(rule.inc("ischeck","/") == true && ! field.checked ){
		return name;
	}
	if(rule.inc("isselect","/") == true && field.value == '-1' ){
		return 'Please Choose "' + name + '"';
	}
	return "";
};

/*#表单验证#*/
function fmChk(fm){
	var name , rule , tmp , msgStr , size;
	if(fm == null || fm.tagName != "FORM"){
		alert("", null , "error");
	    return;
	}	
	for(i=0;i<fm.length;i++){		
		var msgStr = chkInput(fm[i]);				
		if(msgStr != "success"){
			efocu(fm[i]);
			msg(msgStr);
			return false;
		}
	}
	return true;
};
/*#表单验证#*加上某些不需要验证的情况*/
function fmChk_Reason(fm,whichone){
	var name , rule , tmp , msgStr , size;
	if(fm == null || fm.tagName != "FORM"){
		alert("", null , "error");
	    return;
	}	

	for(i=0;i<fm.length;i++){	

		
		var msgStr = chkInput_Reason(fm[i],whichone);				
		if(msgStr != "success"){
			efocu(fm[i]);
			msg(msgStr);
			return false;
		}
	}
	return true;
};
function chkInput(obj){
	var name , rule , msgStr;
	name=obj.getAttribute("chkName");
	rule=obj.getAttribute("chkRule");
	if(isNone(rule) || isNone(name))  return "success";	
	msgStr = field_check(name, rule, obj);
	if(msgStr != ""){
		return msgStr;
	}
	else{
		return "success";
	}
};
/*#表单验证#*加上某些不需要验证的情况*/
function chkInput_Reason(obj,whichone){
	var name , rule , msgStr;
	name=obj.getAttribute("chkName");
	rule=obj.getAttribute("chkRule");
	if(isNone(rule) || isNone(name))  return "success";	
	if(name==whichone) return "success";

	if(name==whichone) {
		alert(name);
		return "success";
	}
	msgStr = field_check(name, rule, obj);
	
	if(msgStr != ""){
		return msgStr;
	}
	else{
		return "success";
	}
};

function msg(key){
	alert(key);
};

function initForm(el, func){	
	var img_path =  "/images";
	(new Image(10,10)).src = img_path + "/ico_F.gif";
	var error_bg = "#FEDFDF", blur_bg = "" , focus_bg = "#FFFEE1";
	var formId = $(el);
	if(formId == null || formId.tagName != "FORM"){
		alert("", null , "error");
	    return;
	}
	var addImage = '<img src="'+ img_path + "/ico_T.gif" +'" width="10" height="10" style="display:none;" class="pad_l"/>';
	var addDiv = '<div style="display:none;" class="red line_120"></div>';
	var elArr = formId.elements;
	var elLen = elArr.length;
	for(i=0; i<elLen; i++) {
		//insert the img and div
		var addHtml = elArr[i].getAttribute("chkRule");
		if(addHtml){
			insHtm(elArr[i],addImage);
			insHtm(elArr[i],addDiv);
			
			//add the mouse style have check;
			elArr[i].onfocus = function(){
					if((this.tagName === "INPUT" && (this.type === "text" || this.type === "password"))||this.tagName === "TEXTAREA")
					{this.style.backgroundColor = focus_bg;}
			}
			elArr[i].onblur = function(){
				this.style.backgroundColor = blur_bg;	
				var out_img = this.parentNode.getElementsByTagName("img")[0];
				var out_text = this.parentNode.getElementsByTagName("div")[0];
				var msg = chkInput(this);
				if(msg === "success") {
					out_img.src = img_path + "/ico_T.gif";
					out_img.style.display="inline";
					out_text.style.display="none";
				}else{
					out_img.src = img_path + "/ico_F.gif";						
					out_img.style.display="inline";
					out_text.innerHTML = msg;
					out_text.style.display="block";
					if((this.tagName === "INPUT" && (this.type === "text" || this.type === "password"))||this.tagName === "TEXTAREA"){
						this.style.backgroundColor = error_bg;
					}
				}
				if(func != null) {try{eval(func);}catch(e){}}						
			}
		}else{
				//add the mouse style not check;
			if((elArr[i].tagName === "INPUT" && (elArr[i].type === "text" || elArr[i].type === "password"))||elArr[i].tagName === "TEXTAREA"){
				elArr[i].onfocus = function(){this.style.backgroundColor = focus_bg;}
				elArr[i].onblur = function(){this.style.backgroundColor = blur_bg; if(func != null) {try{eval(func);}catch(e){}}}
			}
		}
	}
}
function deletereview(){
	var a=confirm("Are you sure you want to delete reviews?");
	if(a)
	{
		document.delete_review.submit();
	}
}
function deletereviewone(id,se){
var a=confirm("Are you sure you want to delete reviews?");
	if(a)
	{
	document.location.href="index.php?main_page=manage_reviews&yy="+id+"&se="+se;
	}
}