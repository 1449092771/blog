/**axios库 */
/**
 * 支持功能
 * 1，支持全局默认配置项 _ajax.defalts.xxx=xxx
 * 2，发送请求_ajax.get/post
 * 3，每一次请求都会返回promise实例，基于pormise设计模式进行管理
 * 4，支持_ajax.all
 * 
 * 
 */
~function(){
  //=>发送ajax请求，且基于promise进行管理
  class MyAjax{
    constructor(url,options){
      this.url=url;
      this.options=options;
      return this.init();
    }
    //发送ajax请求（基于promise来管理）
    init(){
      let {
        url,
        options:{
          baseURL,
          widhCredentials,
          headers,
          transformRequest,
          transformRequest,
          validateStatus,
          params,
          data,
          cache
        }
      }=this;

      return new Promise((resolve,reject)=>{
        let xhr=new XMLHttpRequest;
        //=>url的处理
            url=baseURL+url;
            if(params){
              let result=``
              for(let attr in params){
                if(!params.hasOwnProperty(attr)) break;
                str+=`&${attr}=${params[attr]}`
              }
              return result.substring(1);
              url+=`${url.indexOf('?')===-1?'?':'&'}${result}`;
            }

            xhr.open(method,url)
            xhr.onreadystatechange=()=>{

            }
            //请求拦截器：主体传递信息的拦截
            if(typeof transformRequest==='function'){
              data=transformRequest(data);
            }
            xhr.send(data);
      })
    }
  }




  //=>创建_ajax管理调用
  function _init(options={}){
    //实现参数初始化:headers需要特殊处理（把用户options中传递的headers和options中的headers进行合并，而不是整体替换）
    //其余的配置项直接用options中的替换defaults中的即可；
    let optionsHeaders=options.headers;
    _ajax.defaults.headers=Object.assign(_ajax.defaults.headers,optionsHeaders);
    delete options.headers;
    return Object.assign(_ajax.defaults,options);
    

  }
  function _ajax(){}

  _ajax.defaults={
    baseURL:'',
    widhCredentials:false,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    transformRequest:function(data){
      if(!data) return data;
      let str=``
      for(let key in data){
        if(!data.hasOwnProperty(key)) break;
        str+=`&${key}=${data[key]}`
      }
      return str.substring(1)
    },
    transformRequest:[function onFulfilled(response){
      return response.data
    },function onRejected(reason){ 
      //这里可以不处理
      return Promise.reject(reason)
    }],
    validateStatus:function(status){
      //return status>=200 && status <400
      return /^(2|3)\d{2}$/.test(status)
    },
    //请求配置项
    params:{},
    data:{},
    cache:true
  };

  _ajax.all=function(promiseArr=[]){
    return Promise.all(promiseArr)
  };
  ['get','delete','head','options'].forEach(item=>{
    _ajax[item]=function(url,options={}){
      options.method=item;
      return new MyAjax(url,_init(options))
    }
  })
  ['put','post'].forEach(item=>{
    _ajax[item]=function(url,data={},options={}){
      options.method=item;
      //=>把Data也放到配置项目
      options.data=data;
      return new MyAjax(url,_init(options));
    }
  })
  _ajax.get=function(url,options){

    return new MyAjax(url,_init(options));
  }
  _ajax.post=function(url,data={},options={}){
    //=>把Data也放到配置项目
    options.method=item;
    options.data=data;
    return new MyAjax(url,_init(options));
  }

 
  _ajax.get=function anonymous(){
    return new Ajax();
  }

  window._ajax=_ajax;
}();




