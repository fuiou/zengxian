/**
 * Created by user on 2017/11/22.
 */
//环境
let localhostDev = false;//是否是生产,false是,true否
let isUat = false;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
let _host = localhostDev ? 'http://192.168.8.29:29030/kdy/courier-pre/courierAction' : 'https://sjbkdy.fuiou.com/kdy/courier-pre/courierAction';
if(isUat){
  _host = 'http://211.147.68.196:10640/kdy/courierAction';
}
var ajaxAsync = function(options){/*url,params,success,fail,spinner*/
    if(options.obj){
        options.obj.showLoadingFlag = true;
    }
    return $.ajax({
        type:"POST",
            url:_host,
            data:"reqData="+options.params,
            datatype: "xml",//"xml", "html", "script", "json", "jsonp", "text".
            //在请求之前调用的函数
            //beforeSend:function(){$("#msg").html("logining");},
            //成功返回之后调用的函数
            success:options.success,
            //调用执行后调用的函数
            complete: function(XMLHttpRequest, textStatus){
              if(options.obj){
                options.obj.showLoadingFlag = false;
              }
                // alert(XMLHttpRequest.responseText);
                // alert(textStatus);
                // HideLoading();
                // if(options.obj){
                //     setTimeout(function(){
                //         options.obj.$vux.loading.hide();
                //     },200)
                // }
            },
            //调用出错执行的函数
            error: function(){
                //请求出错处理
            }
        });
};
var updateTitle = function(title) {
    document.title = title
    var mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
      var iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      // 替换成站标favicon路径或者任意存在的较小的图片即可
      //iframe.setAttribute('src', 'static/user.png')
      iframe.setAttribute('src', 'static/images/icon1.png');
      var iframeCallback = function () {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback)
          document.body.removeChild(iframe)
        }, 0)
      }
      iframe.addEventListener('load', iframeCallback)
      document.body.appendChild(iframe)
    }
}
var isWeiXin = function(){
  var ua = window.navigator.userAgent.toLowerCase();  /QQ/gi.test
  //console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
  if (ua.match(/MicroMessenger/i) == 'micromessenger' || /QQ/gi.test(ua)) {
    return true;
  } else {
    return false;
  }
}

export { ajaxAsync,updateTitle,isWeiXin }
