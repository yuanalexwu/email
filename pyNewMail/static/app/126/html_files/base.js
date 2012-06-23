//自动登录失败处理
function fCheckAutoLogin(){
	return;
	//if(window.location.href.indexOf('#return') != -1){
	//	fSetCookie('ntes_mail_firstpage','normal');
	//}
}

//两周自动登录
function fAutoLogin(){
	try{
		var sSInfo = fGetCookie("S_INFO");
		var sPInfo = fGetCookie("P_INFO");
		var sEmail = "",sTime = "",sState = "",nTimeDiff = 0;
		if(sPInfo){
			var aInfo = sPInfo.split("|");
			sEmail = aInfo[0];
			sTime = aInfo[1];
			sState = aInfo[2];
			nTimeDiff = (new Date()).getTime()-(sTime+"000");
		}
		if(!location.hash && sEmail.indexOf("@"+gOption["sDomain"])>-1 && sState=="1" && nTimeDiff<14*24*60*60*1000){
			window.location.href= gOption["sAutoLoginUrl"];
		}
	}catch(exp){}
}

//浏览器判断跳转
var gbForcepc;
var oAndroidRedirect = {
	sPhoneUrl	:	'',
	sPadUrl		:	''
};
function fCheckBrowser(){
	gbForcepc = fGetQuery("dv") == "pc";
	if(!gbForcepc){
		var sUserAgent = navigator.userAgent.toLowerCase();
		var sUrlRedirect;
		var oUrlRedirect = {
			"ipad" : "http://ipad.mail." + gOption["sDomain"] + "/?dv=ipad",
			"pad"	: "http://pad.mail." + gOption["sDomain"] + "/",
			"smart" : "http://smart.mail." + gOption["sDomain"] + "/?dv=smart",
			"m" : "http://m.mail." + gOption["sDomain"] + "/"
		};
		var aClient = ["ipad","iphone os","android","ucweb","rv:1.2.3.4","windows ce","windows mobile","midp"];
		for(var i=0;i<aClient.length;i++){
			if(sUserAgent.indexOf(aClient[i]) != -1){
				switch(aClient[i]){
					case "ipad" : 
						sUrlRedirect = oUrlRedirect["ipad"];
						break;
					case "iphone os" :
						sUrlRedirect = oUrlRedirect["smart"];
						break;
					case "android" :
						oAndroidRedirect = {
							sPhoneUrl	:	oUrlRedirect["smart"],
							sPadUrl		:	oUrlRedirect["pad"]
						};
						DOMREADY(
							function(){
								fGetScript('http://mimg.127.net/index/lib/scripts/android.js');
							}
						);
						return false;
						break;
					default :
						sUrlRedirect = oUrlRedirect["m"];
				}
			window.location.href = sUrlRedirect;
			}
		}
	}
}

//Html5标签支持
function fHtml5Tag(){
	var aTag = ["aside","figcaption","figure","footer","header","hgroup","nav","section"],i = 0;
	for(i in aTag){document.createElement(aTag[i]);}
}

//COOKIE功能检查
function fCheckCookie(){
	if(!navigator.cookieEnabled){
		alert("您好，您的浏览器设置禁止使用cookie\n请设置您的浏览器，启用cookie功能，再重新登录。");
	}
}

//////////////////////////////////////////////////////////////
//基础功能
//////////////////////////////////////////////////////////////

//获取参数值
function fGetQuery(name){
	var sUrl = window.location.search.substr(1);
	var r = sUrl.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
	return (r == null ? null : unescape(r[2]));
}

//获取#参数值
function fGetQueryHash(name){
	var sUrl = window.location.hash.substr(1);
	var r = sUrl.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
	return (r == null ? null : unescape(r[2]));
}

//GetElementById
function $id(sId){
	return document.getElementById(sId);
}

//过滤帐号
function fTrim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "").replace(/(^　*)|(　*$)/g, "");
}

//过滤手机号
function fParseMNum(sNum){
	var sTmpNum = fTrim(sNum);
	return /^0?(13|14|15|18)\d{9}$/.test(sTmpNum);
}

//自动截断对应域email地址
function fCheckAccount(sEmail){
	var sAccount = sEmail;
	var bAt;
	bAt = sAccount.indexOf("@" + gOption["sDomain"]) == -1;
	if(!bAt){
		var aAccountSplit;
		aAccountSplit=sEmail.split("@");
		sEmail=aAccountSplit[0];
	}
	return sEmail;
}

//跨域调用方法
function fGetScript(sUrl){
	var oScript = document.createElement("script");
	oScript.setAttribute("type", "text/javascript");
	oScript.setAttribute("src", sUrl);
	try{oScript.setAttribute("defer", "defer");}catch(e){}
	window.document.body.appendChild(oScript);
}

//获取Cookie
function fGetCookie(sName){
   var sSearch = sName + "=";
   if(document.cookie.length > 0){
      offset = document.cookie.indexOf(sSearch)
      if(offset != -1){
         offset += sSearch.length;
         end = document.cookie.indexOf(";", offset)
         if(end == -1) end = document.cookie.length;
         return unescape(document.cookie.substring(offset, end))
      }
      else return ""
   }
}

//设置Cookie
function fSetCookie(name, value, isForever, domain){
	var sDomain = ";domain=" + (domain || gOption["sCookieDomain"] );
	document.cookie = name + "=" + escape(value) + sDomain + (isForever?";expires="+  (new Date(2099,12,31)).toGMTString():"");
}

//绑定事件监听
function fEventListen(oElement, sName, fObserver, bUseCapture){
	bUseCapture = !!bUseCapture;
	if (oElement.addEventListener){
		oElement.addEventListener(sName, fObserver, bUseCapture);
	}else if(oElement.attachEvent){
		oElement.attachEvent('on' + sName, fObserver);
	}
}

//删除事件监听
function fEventUnlisten(oElement, sName, fObserver, bUseCapture){
	bUseCapture = !!bUseCapture;
	if(oElement.removeEventListener){
		oElement.removeEventListener(sName, fObserver, bUseCapture);
	}else if(oElement.detachEvent){
		oElement.detachEvent('on' + sName, fObserver);
	}
}

//限定范围随机数
function fRandom(nLength){
	return Math.floor(nLength * Math.random());
}

//url参数
function fUrlP(sName,sValue,bIsFirst){
	if(!arguments[2]){bIsFirst = false;}
	if(bIsFirst){		
		return sName + '=' + sValue;
	}else{
		return '&' + sName + '=' + sValue;
	}
}

//同步改变窗口大小与遮罩
function fResize(){
	var nBodyHeight = document.body.offsetHeight,
		nWindowHeight = document.documentElement.clientHeight,
		nResult;
	if(nBodyHeight > nWindowHeight){
		nResult = nBodyHeight;
	}else{
		nResult = nWindowHeight;
	}
	$id("mask").style.height = nResult + "px"
}

//////////////////////////////////////////////////////////////
//具体功能
//////////////////////////////////////////////////////////////

//fFQ
function fFQ(){
	var sFqLf = fGetQuery("fq");
	var bEnableFQ = (/^[0-9]/).test(sFqLf);
	var sFQuid = fGetQuery("uid");
	var bTestMail = (new RegExp("(@"+ gOption["sDomain"] +")$")).test(sFQuid);
	if(bEnableFQ && bTestMail){
		var nFQrandom = (new Date()).getTime();
		fSetCookie("fq",sFqLf+"_"+nFQrandom,false);
		var oImg = document.createElement("img");
		var sImgUrl = "http://count.mail.163.com/beacon/login.gif?uid=" + sFQuid + "&fq=" + nFQrandom + "&lf=" + fGetQuery("fq");
		oImg.setAttribute("src", sImgUrl);
		oImg.setAttribute("alt", "");
		oImg.style.display = "none";
		document.body.appendChild(oImg);
	}
}

//设置starttime的Cookie
function fStartTime(){
	var sSt = fGetCookie("starttime");
	if( sSt == "" ){
		sSt = (new Date()).getTime();
		fSetCookie("starttime",sSt,false);
	}
}

//处理nts_mail_user的Cookie
var gUserInfo = {
	"username" : null,
	"style"    : null,
	"safe"     : null
}
var gVisitorCookie = (function(){
	var _fGetNtsMailUser = function(){
		var sUserInfo = fGetCookie("nts_mail_user");
		if( sUserInfo != undefined ){
			var aTmp = sUserInfo.split(":");			
			if( aTmp.length == 3 ){
				gUserInfo["username"] = aTmp[0];
				gUserInfo["style"] = aTmp[1];
				gUserInfo["safe"] = aTmp[2];
			}
		}
		return;
	},
	_fSetNtsMailUser = function(){
		var sUserInfo = gUserInfo.username + ":" + gUserInfo.style + ":" + gUserInfo.safe;
		_fSetNtsMailCookie("nts_mail_user",sUserInfo,true);
		return;
	},
	_fSetNtsMailCookie = function(name, value, isForever, domain){
		var sDomain = ";domain=" + (domain || gOption["sCookieDomain"] );
		document.cookie = name + "=" + value + sDomain + (isForever?";expires="+  (new Date(2099,12,31)).toGMTString():"");
	};
	return {
		"init" : function(){
			_fGetNtsMailUser();
			return this;
		},
		"saveInfo" : function(){
			_fSetNtsMailUser();
		},
		"loadInfo" : function(){
			_fGetNtsMailUser();
		}
	};
})().init();

//手机号码帐号提示
var gMobileNumMailIsForbidden,
	gMobileNumMailResult,
	gMobileNumMail= (function(){
	var sInterFaceFromMail = "http://mbind.mail.126.com/mbind/qn.do?uid=",
		sInterFaceFromNum = "http://mbind.mail.126.com/mbind/qu.do?pn=",
		sCurAddr,
		sCurNum,
		P_INFO = {},
		sNum,
		sTel, //保存上次查询结果
		sEmail, //保存上次查询结果
		SECSTR = ["xxxxx","xxx"],
		sTimestamp =  Math.round((new Date()).getTime() / 86400000) + "",
		
		//检测是否关闭此手机功能
		_fIsForbidden = function(){ 
			var nTmp = fGetCookie("MTip");
			if( nTmp == 1 ){
				return true;
			}else{
				return false;
			}
		},
		
		//设置关闭手机号码功能
		_fSetForbidden = function(){ 
			fSetCookie("MTip","1",true);
			$id("mobtips").style.display = 'none';
		},
		
		//使用邮箱地址获取手机号码
		_fGetNumFromMail = function(sMail){
			var sUid, nCheckResult;
			sUid = sMail + "@" + gOption["sDomain"];
			nCheckResult = _fCheckAddr(sMail, sUid);
			if(nCheckResult === -1){
				MobCallback({
					"nCode" : "private",
					"sNum" : "invalidMail"
				});
				return;
			}
			if(nCheckResult === 0){
				if(sTel === undefined){
					MobCallback({
						"nCode" : "404"
					});
				}
				else{			
					MobCallback({
						"nCode" : "200",
						"sNum" : sTel
					});
				}
				return;
			}
			sCurAddr = sUid;
			P_INFO["all"] = fGetCookie("P_INFO");
			if(P_INFO["all"] && P_INFO["all"].length > 0){
				P_INFO["uid"] = P_INFO["all"].split("|")[0];
				P_INFO["num"] = P_INFO["all"].split("|")[6];
			}
			if(P_INFO.uid && P_INFO.uid !== sUid){
				_fGetNumFromMailInterFace(sUid);
				return;
			}
			if(P_INFO.num && P_INFO.num.indexOf("&") > -1){
				sNum = P_INFO.num.split("&")[0];
				if( sNum == '' ){			
					MobCallback({
						"nCode" : "404"
					});				
				}else{
					MobCallback({
						"nCode" : "200",
						"sNum" : sNum
					});
				}
				return;
			}
			_fGetNumFromMailInterFace(sUid);
			return;
		},
		
		//新旧手机号码拼装
		_fEncodeNum = function(sMobile){
			var sEnTel = "", sUnEnTel = sMobile;
			if(sUnEnTel.length === 6){ // 前3后3 旧
				sEnTel = sUnEnTel.substr(0, 3) + SECSTR[0] + sUnEnTel.substr(3, 3);
			}
			if(sUnEnTel.length === 8){ // 前4后4 新
				sEnTel = sUnEnTel.substr(0, 4) + SECSTR[1] + sUnEnTel.substr(4, 4);
			}
			return sEnTel;
		},
		
		//使用手机号码获取邮箱地址
		_fGetMailFromNum = function(sMobile){
			var sMobileNum = fTrim(sMobile);
			if(sMobileNum == sCurNum){
				if(sEmail == undefined){
					MobCallback({
						"nCode" : "404"
					});
				}else{
					MobCallback({
						"nCode" : "200",
						"sNum" : sEmail
					});
				}
				return;
			}
			if(fParseMNum(sMobileNum)){
				sCurNum = sMobileNum;
				_fGetMailFromNumInterFace(sMobileNum);
				return;
			}else{
				MobCallback({
					"nCode" : "private",
					"sNum" : "invalidNum"
				});		
			}
		},
		
		//使用邮箱地址获取手机号码接口调用
		_fGetNumFromMailInterFace = function(sUid){
			fGetScript(sInterFaceFromMail + sUid + "&t=" + sTimestamp);
		},
		
		//使用手机地址获取邮箱帐号接口调用
		_fGetMailFromNumInterFace = function(sNum){
			fGetScript(sInterFaceFromNum + sNum + "&t=" + sTimestamp);
		},
		
		//校验帐号
		_fCheckAddr = function(uName, sAddr){
			var rPattern1 = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(!rPattern1.test(sAddr) || fParseMNum(uName)){
				return -1;//地址无效
			}
			if(typeof sCurAddr === "string" && sCurAddr === sAddr){
				return 0;//旧地址
			}
			return 1;
		};
		
		//手机帐号服务回调函数
		window.MobCallback = function(oMobObj){
			var sHtml,
				sMailDomain,
				oMobT = $id("mobtips"),
				oMob_txt = $id("mobtips_txt"),
				oMob_close = $id("mobtips_close");
			try{
				var oMob = oMobObj;
				if(oMob.nCode == "private"){
					gMobileNumMailResult = oMob.sNum;
					if(gMobileNumMailResult == "invalidMail" || gMobileNumMailResult == "invalidNum"){
						oMobT.style.display = 'none';
					}
				}
				if(oMob.nCode == 200){
					if(oMob.sNum && oMob.sNum.length >8){
						sEmail = oMob.sNum;
						gMobileNumMailResult = sEmail;
						sMailDomain = gMobileNumMailResult.split('@')[1];
						if(sMailDomain != gOption.sDomain){
							var sTmpMobMail = sCurNum + '@' + sMailDomain;
							oMobT.style.height = "auto";
							sHtml = '此手机号码的邮箱是<br/><em>' + sTmpMobMail + '</em>，<a style="text-decoration:none;" href="http://email.163.com/index.htm#uid=' + sTmpMobMail + '">点此登录</a>';
						}else{
							sHtml = '此号码已与帐号：<em>' + gMobileNumMailResult + '</em> 绑定';
						}
					}else{
						sTel = oMob.sNum;
						gMobileNumMailResult = _fEncodeNum(sTel);
						sHtml = '用你的手机号 <em>' + gMobileNumMailResult + '</em> 也可登录';
					}
					oMob_txt.innerHTML = sHtml;
					oMobT.style.display = 'block';
				}
				if(oMob.nCode == 404){
					if(ntabOn == 1){
						sHtml = '手机号码也可登录，<a href="http://e.mail.163.com/mobilemail/home.do?from=mail163">免费激活</a>';
						sTel = undefined;
					}else{
						sHtml = '此号码还未手机号登录';				
						sEmail = undefined;
					}
					oMob_txt.innerHTML = sHtml;
					oMobT.style.display = 'block';
				}
			}catch(e){
				oMobT.style.display = 'none';
			}
			return;
		};
		
		return {
			"init" : function(){
				return this;
			},
			"forbidden" : function(){
				gMobileNumMailIsForbidden = _fIsForbidden();
				if(gMobileNumMailIsForbidden){
					return false;
				}else{
					_fSetForbidden();
				}
			},
			"getNumFromMail" : function(sMail){
				gMobileNumMailIsForbidden = _fIsForbidden();
				if(gMobileNumMailIsForbidden){
					return false;
				}else{
					_fGetNumFromMail(sMail);
				}
			},
			"getMailFromNum" : function(sMobile){
				gMobileNumMailIsForbidden = _fIsForbidden();
				if(gMobileNumMailIsForbidden){
					return false;
				}else{
					_fGetMailFromNum(sMobile);
				}
			}
		};
})().init();

//简单http加密登录
var rnd;
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
　　52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
　　-1,　0,　1,　2,　3,  4,　5,　6,　7,　8,　9, 10, 11, 12, 13, 14,
　　15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
　　-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
　　41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		c1 = str.charCodeAt(i++) & 255;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 3) << 4);
			out += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 3) << 4) | ((c2 & 240) >> 4));
			out += base64EncodeChars.charAt((c2 & 15) << 2);
			out += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 3) << 4) | ((c2 & 240) >> 4));
		out += base64EncodeChars.charAt(((c2 & 15) << 2) | ((c3 & 192) >> 6));
		out += base64EncodeChars.charAt(c3 & 63);
	}
	return out;
}
function base64decode(str) {
	var c1, c2, c3, c4;
	var i, len, out;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 255];
		} while (i < len && c1 == -1);
		if (c1 == -1) {
			break;
		}
		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 255];
		} while (i < len && c2 == -1);
		if (c2 == -1) {
			break;
		}
		out += String.fromCharCode((c1 << 2) | ((c2 & 48) >> 4));
		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 255;
			if (c3 == 61) {
				return out;
			}
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1) {
			break;
		}
		out += String.fromCharCode(((c2 & 15) << 4) | ((c3 & 60) >> 2));
		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 255;
			if (c4 == 61) {
				return out;
			}
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1) {
			break;
		}
		out += String.fromCharCode(((c3 & 3) << 6) | c4);
	}
	return out;
}
function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 1) && (c <= 127)) {
			out += str.charAt(i);
		} else {
			if (c > 2047) {
				out += String.fromCharCode(224 | ((c >> 12) & 15));
				out += String.fromCharCode(128 | ((c >> 6) & 63));
				out += String.fromCharCode(128 | ((c >> 0) & 63));
			} else {
				out += String.fromCharCode(192 | ((c >> 6) & 31));
				out += String.fromCharCode(128 | ((c >> 0) & 63));
			}
		}
	}
	return out;
}
function utf8to16(str) {
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
		  case 0:
		  case 1:
		  case 2:
		  case 3:
		  case 4:
		  case 5:
		  case 6:
		  case 7: // 0xxxxxxx
			out += str.charAt(i - 1);
			break;
		  case 12:
		  case 13: // 110x xxxx　 10xx xxxx
			char2 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 31) << 6) | (char2 & 63));
			break;
		  case 14: // 1110 xxxx　10xx xxxx　10xx xxxx
			char2 = str.charCodeAt(i++);
			char3 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 15) << 12) | ((char2 & 63) << 6) | ((char3 & 63) << 0));
			break;
		}
	}
	return out;
}
function doit() {
	var f = document.f;
	f.output.value = base64encode(utf16to8(f.source.value));
	f.decode.value = utf8to16(base64decode(f.output.value));
}

// MD5 SHA1 共用 
function add(x, y) {
	return ((x & 2147483647) + (y & 2147483647)) ^ (x & 2147483648) ^ (y & 2147483648);
} 

// MD5 
function MD5hex(i) {
	var sHex = "0123456789abcdef";
	h = "";
	for (j = 0; j <= 3; j++) {
		h += sHex.charAt((i >> (j * 8 + 4)) & 15) + sHex.charAt((i >> (j * 8)) & 15);
	}
	return h;
}
function R1(A, B, C, D, X, S, T) {
	q = add(add(A, (B & C) | (~B & D)), add(X, T));
	return add((q << S) | ((q >> (32 - S)) & (Math.pow(2, S) - 1)), B);
}
function R2(A, B, C, D, X, S, T) {
	q = add(add(A, (B & D) | (C & ~D)), add(X, T));
	return add((q << S) | ((q >> (32 - S)) & (Math.pow(2, S) - 1)), B);
}
function R3(A, B, C, D, X, S, T) {
	q = add(add(A, B ^ C ^ D), add(X, T));
	return add((q << S) | ((q >> (32 - S)) & (Math.pow(2, S) - 1)), B);
}
function R4(A, B, C, D, X, S, T) {
	q = add(add(A, C ^ (B | ~D)), add(X, T));
	return add((q << S) | ((q >> (32 - S)) & (Math.pow(2, S) - 1)), B);
}
function MD5(sInp) {
	var sAscii = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
	wLen = (((sInp.length + 8) >> 6) + 1) << 4;
	var X = new Array(wLen);
	j = 4;
	for (i = 0; (i * 4) < sInp.length; i++) {
		X[i] = 0;
		for (j = 0; (j < 4) && ((j + i * 4) < sInp.length); j++) {
			X[i] += (sAscii.indexOf(sInp.charAt((i * 4) + j)) + 32) << (j * 8);
		}
	}
	if (j == 4) {
		X[i++] = 128;
	} else {
		X[i - 1] += 128 << (j * 8);
	}
	for (; i < wLen; i++) {
		X[i] = 0;
	}
	X[wLen - 2] = sInp.length * 8;
	a = 1732584193;
	b = 4023233417;
	c = 2562383102;
	d = 271733878;
	for (i = 0; i < wLen; i += 16) {
		aO = a;
		bO = b;
		cO = c;
		dO = d;
		a = R1(a, b, c, d, X[i + 0], 7, 3614090360);
		d = R1(d, a, b, c, X[i + 1], 12, 3905402710);
		c = R1(c, d, a, b, X[i + 2], 17, 606105819);
		b = R1(b, c, d, a, X[i + 3], 22, 3250441966);
		a = R1(a, b, c, d, X[i + 4], 7, 4118548399);
		d = R1(d, a, b, c, X[i + 5], 12, 1200080426);
		c = R1(c, d, a, b, X[i + 6], 17, 2821735955);
		b = R1(b, c, d, a, X[i + 7], 22, 4249261313);
		a = R1(a, b, c, d, X[i + 8], 7, 1770035416);
		d = R1(d, a, b, c, X[i + 9], 12, 2336552879);
		c = R1(c, d, a, b, X[i + 10], 17, 4294925233);
		b = R1(b, c, d, a, X[i + 11], 22, 2304563134);
		a = R1(a, b, c, d, X[i + 12], 7, 1804603682);
		d = R1(d, a, b, c, X[i + 13], 12, 4254626195);
		c = R1(c, d, a, b, X[i + 14], 17, 2792965006);
		b = R1(b, c, d, a, X[i + 15], 22, 1236535329);
		a = R2(a, b, c, d, X[i + 1], 5, 4129170786);
		d = R2(d, a, b, c, X[i + 6], 9, 3225465664);
		c = R2(c, d, a, b, X[i + 11], 14, 643717713);
		b = R2(b, c, d, a, X[i + 0], 20, 3921069994);
		a = R2(a, b, c, d, X[i + 5], 5, 3593408605);
		d = R2(d, a, b, c, X[i + 10], 9, 38016083);
		c = R2(c, d, a, b, X[i + 15], 14, 3634488961);
		b = R2(b, c, d, a, X[i + 4], 20, 3889429448);
		a = R2(a, b, c, d, X[i + 9], 5, 568446438);
		d = R2(d, a, b, c, X[i + 14], 9, 3275163606);
		c = R2(c, d, a, b, X[i + 3], 14, 4107603335);
		b = R2(b, c, d, a, X[i + 8], 20, 1163531501);
		a = R2(a, b, c, d, X[i + 13], 5, 2850285829);
		d = R2(d, a, b, c, X[i + 2], 9, 4243563512);
		c = R2(c, d, a, b, X[i + 7], 14, 1735328473);
		b = R2(b, c, d, a, X[i + 12], 20, 2368359562);
		a = R3(a, b, c, d, X[i + 5], 4, 4294588738);
		d = R3(d, a, b, c, X[i + 8], 11, 2272392833);
		c = R3(c, d, a, b, X[i + 11], 16, 1839030562);
		b = R3(b, c, d, a, X[i + 14], 23, 4259657740);
		a = R3(a, b, c, d, X[i + 1], 4, 2763975236);
		d = R3(d, a, b, c, X[i + 4], 11, 1272893353);
		c = R3(c, d, a, b, X[i + 7], 16, 4139469664);
		b = R3(b, c, d, a, X[i + 10], 23, 3200236656);
		a = R3(a, b, c, d, X[i + 13], 4, 681279174);
		d = R3(d, a, b, c, X[i + 0], 11, 3936430074);
		c = R3(c, d, a, b, X[i + 3], 16, 3572445317);
		b = R3(b, c, d, a, X[i + 6], 23, 76029189);
		a = R3(a, b, c, d, X[i + 9], 4, 3654602809);
		d = R3(d, a, b, c, X[i + 12], 11, 3873151461);
		c = R3(c, d, a, b, X[i + 15], 16, 530742520);
		b = R3(b, c, d, a, X[i + 2], 23, 3299628645);
		a = R4(a, b, c, d, X[i + 0], 6, 4096336452);
		d = R4(d, a, b, c, X[i + 7], 10, 1126891415);
		c = R4(c, d, a, b, X[i + 14], 15, 2878612391);
		b = R4(b, c, d, a, X[i + 5], 21, 4237533241);
		a = R4(a, b, c, d, X[i + 12], 6, 1700485571);
		d = R4(d, a, b, c, X[i + 3], 10, 2399980690);
		c = R4(c, d, a, b, X[i + 10], 15, 4293915773);
		b = R4(b, c, d, a, X[i + 1], 21, 2240044497);
		a = R4(a, b, c, d, X[i + 8], 6, 1873313359);
		d = R4(d, a, b, c, X[i + 15], 10, 4264355552);
		c = R4(c, d, a, b, X[i + 6], 15, 2734768916);
		b = R4(b, c, d, a, X[i + 13], 21, 1309151649);
		a = R4(a, b, c, d, X[i + 4], 6, 4149444226);
		d = R4(d, a, b, c, X[i + 11], 10, 3174756917);
		c = R4(c, d, a, b, X[i + 2], 15, 718787259);
		b = R4(b, c, d, a, X[i + 9], 21, 3951481745);
		a = add(a, aO);
		b = add(b, bO);
		c = add(c, cO);
		d = add(d, dO);
	}
	MD5Value = MD5hex(a) + MD5hex(b) + MD5hex(c) + MD5hex(d);
	return MD5Value;
}


// SHA1 
function SHA1hex(num) {
	var sHEXChars = "0123456789abcdef";
	var str = "";
	for (var j = 7; j >= 0; j--) {
		str += sHEXChars.charAt((num >> (j * 4)) & 15);
	}
	return str;
}
function AlignSHA1(sIn) {
	var nblk = ((sIn.length + 8) >> 6) + 1, blks = new Array(nblk * 16);
	for (var i = 0; i < nblk * 16; i++) {
		blks[i] = 0;
	}
	for (i = 0; i < sIn.length; i++) {
		blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);
	}
	blks[i >> 2] |= 128 << (24 - (i & 3) * 8);
	blks[nblk * 16 - 1] = sIn.length * 8;
	return blks;
}
function rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
}
function ft(t, b, c, d) {
	if (t < 20) {
		return (b & c) | ((~b) & d);
	}
	if (t < 40) {
		return b ^ c ^ d;
	}
	if (t < 60) {
		return (b & c) | (b & d) | (c & d);
	}
	return b ^ c ^ d;
}
function kt(t) {
	return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
}
function SHA1(sIn) {
	var x = AlignSHA1(sIn);
	var w = new Array(80);
	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;
	var e = -1009589776;
	for (var i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		var olde = e;
		for (var j = 0; j < 80; j++) {
			if (j < 16) {
				w[j] = x[i + j];
			} else {
				w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
			}
			t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));
			e = d;
			d = c;
			c = rol(b, 30);
			b = a;
			a = t;
		}
		a = add(a, olda);
		b = add(b, oldb);
		c = add(c, oldc);
		d = add(d, oldd);
		e = add(e, olde);
	}
	SHA1Value = SHA1hex(a) + SHA1hex(b) + SHA1hex(c) + SHA1hex(d) + SHA1hex(e);
	return SHA1Value;
}

//简单模式登录
function fEnData(data){
	//对返回数据进行处理
	if(data == null || data.length == 0){
		alert("参数非法");
		return false;
	}
	var parts = new Array();
	parts = data.split("\n");
	var retcode = parts[0];
	if(retcode == "401"){
		alert("参数非法");
	}else if(retcode == "500"){
		alert("服务端异常");
	}else if(retcode == "200"){
		var uuid = parts[1];
		var password = $id("pwdInput").value;
		var rcode = SHA1(base64encode(utf16to8(uuid)) + base64encode(utf16to8(MD5(password))) + rnd);
		window.location.href = "http://reg.163.com/httpLoginVerifySHA1.jsp?"
		+ fUrlP('product', gOption.product, true)
		+ fUrlP('rcode', rcode)
		+ fUrlP('savelogin', $id("savelogin").value)
		+ fUrlP('url', encodeURIComponent(window.sHttpAction))
		+ fUrlP('url2', encodeURIComponent(gOption.url2))
		+ fUrlP('username', $id("idInput").value + "@" + gOption.sDomain)
		;
	}
}

function loginRequest(jsonp){
	rnd = getRnd();
	c_url = "http://reg.163.com/services/httpLoginExchgKey?rnd="+rnd;
	c_url += "&jsonp="+jsonp;
	fGetScript(c_url);
}

function getRnd(){
	var timestamp = new Date().getTime();
	var rnd = base64encode(utf16to8("\n" + timestamp));
	return rnd;
}

// documentReady事件支持
var DOMContentLoaded;
var DOMREADY = function(o){
	var DOMREADY = {
		isReady		:	false,
		ready		:	o,
		bindReady	:	function(){
			try{
				if ( document.readyState === "complete" ){
					DOMREADY.isReady = true;
					return setTimeout( DOMREADY.ready, 1 );
				}
				if ( document.addEventListener ){
					document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
				}else if( document.attachEvent ){
					document.attachEvent( "onreadystatechange", DOMContentLoaded );
					var toplevel = false;
					try {
						toplevel = window.frameElement == null;
					} catch(e) {}
					if( document.documentElement.doScroll && toplevel ){
						doScrollCheck();
					}
				}
			}catch(e){}
		}
	};
	if( document.addEventListener ){
		DOMContentLoaded = function(){
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			DOMREADY.ready();
		};

	}else if ( document.attachEvent ){
		DOMContentLoaded = function(){
			if ( document.readyState === "complete" ) {
				document.detachEvent( "onreadystatechange", DOMContentLoaded );
				if( DOMREADY.isReady ){
					return;
				}else{
					DOMREADY.isReady = true;
					DOMREADY.ready();
				}
			}
		};
	}
	function doScrollCheck(){
		if( DOMREADY.isReady ){
			return;
		}
		try {
			document.documentElement.doScroll("left");
		}catch(e){
			setTimeout( doScrollCheck, 1);
			return;
		}
		DOMREADY.isReady = true;
		DOMREADY.ready();
	}
	DOMREADY.bindReady();
};