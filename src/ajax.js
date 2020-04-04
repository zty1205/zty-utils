//创建xhr对象
export function createXMLHTTPRequest(success, error) {
    // 兼容处理
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
    // 先监听好ajax对象状态变化
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (typeof success == "function") success(xhr.response);
            } else {
                if (typeof error == "function") error(xhr.status);
            }
        }
    };
    return xhr;
}

//jsonp
export function doJsonp(success) {

    // 获取随机数
    function getRandom() {
        return Math.floor(Math.random() * 10000 + 500);
    }
    //创建script标签
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    head.appendChild(script);
    //设置传递给后台的回调参数名
    var callbackName = ("jsonp_" + getRandom()).replace(".", "");
    url += url.indexOf('?') == -1 ? "?callback=" + callbackName : "&callback=" + callbackName;

    //创建jsonp回调函数
    window[callbackName] = function (res) {
        head.removeChild(script);
        window[callbackName] = null;
        if (typeof success == "function") success(res);
    };
    //发送请求
    script.src = url;
}

//格式化参数
export function formatParams(params) {
    var paramStr = '';
    for(var key in params) {
        paramStr += '&' + key + '=' + params[key];
    }
    if(url.indexOf('?') == -1 && paramStr.length) {
        paramStr = "?" + paramStr.substr(1, paramStr.length - 1);
    }
    url += paramStr;
}

export function request(config = {}) {
    var url = config.url;
    var type = config.type && config.type.toLowerCase();
    var contentType = config.contentType || 'application/x-www-form-urlencoded; charset=gbk;' // 请求头content-type
    var params = config.params; // url参数
    var data = config.data; // body参数
    var success = config.success;
    var error = config.error;
    
    if(typeof params === 'object') {
        formatParams(params);
    }
    if (type == "get")  doGet();
    else if (type == "post") doPost();
    else if (type == "jsonp") doJsonp(success);

    //get请求
    function doGet() {
        var xhr = createXMLHTTPRequest(success, error);
        if (xhr) {
            xhr.open("GET", url, true);
            xhr.send(null);
        }
    }

    //post请求
    function doPost() {
        var xhr = createXMLHTTPRequest(success, error);
        if (xhr) {
            xhr.open("POST", url, true);
            // 设置请求头
            xhr.setRequestHeader(
                "Content-Type", contentType
            );
            xhr.send(data);
        }
    }
}