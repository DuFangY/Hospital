//axios二次进行封装
//对于axios函数库进行二次封装?
//你工作的时候是否axios进行二次封装?二次封装的目的是什么那?
//目的:1,利用axios请求、响应拦截器功能
//目的2:请求拦截器,一般可以在请求头中携带公共的参数:token
//目的3:响应拦截器,可以简化服务器返回的数据,处理http网络错误
import axios from 'axios';
//引入用户相关的仓库
import useUserStore from '@/store/modules/user';
//@ts-ignore
import { ElMessage,ElLoading } from 'element-plus'
let loadingInstance1:any
//利用axios.create方法创建一个axios实例:可以设置基础路径、超时的时间的设置
const request = axios.create({
    baseURL: '/api',//请求的基础路径的设置
    timeout: 8000//超时的时间的设置,超出五秒请求就是失败的
});


//请求拦截器
request.interceptors.request.use((config) => {
    let objectUrl:string = config.url as string
    let searchString1:string = 'order/weixin/queryPayStatus/'
    let searchString2:string = '/cmn/dict/findByDictCode'
    let searchString3:string = '/hosp/hospital/findByHosname/'
    if(!objectUrl.includes(searchString1) && !objectUrl.includes(searchString2) && !objectUrl.includes(searchString3))
        loadingInstance1 = ElLoading.service({ fullscreen: true,text:"loading..." })
    //获取用户仓库
    let userStore = useUserStore();
    //token:公共参数,如果用户登录了需要携带
    if (userStore.userInfo.token) {
          config.headers.token = userStore.userInfo.token;
    }
    //config:请求拦截器回调注入的对象(配置对象),配置对象的身上最终要的一件事情headers属性
    //可以通过请求头携带公共参数-token
    return config;
});

//响应拦截器
request.interceptors.response.use((response) => {
    //响应拦截器成功的回调,一般会进行简化数据
    let objectUrl:string = response.config.url as string
    let searchString1:string = 'order/weixin/queryPayStatus/'
    let searchString2:string = '/cmn/dict/findByDictCode'
    let searchString3:string = '/hosp/hospital/findByHosname/'
    if(!objectUrl.includes(searchString1) && !objectUrl.includes(searchString2) && !objectUrl.includes(searchString3))
        loadingInstance1.close()
    return response.data;
}, (error) => {
    //处理http网络错误
    if(loadingInstance1)
        loadingInstance1.close()
    let status = error.response.status
    switch (status) {
        case 404: {
            ElMessage({
                type: 'error',
                message: '请求失败路径出现问题!'
            })
            break;
        }
        //错误提示信息
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
            {
                ElMessage({
                    type: 'error',
                    message: '服务器挂了!'
                })
                break;
            }

        case 401:
            {
                ElMessage({
                    type: 'error',
                    message: '参数有误!'
                })
                break;
            }

    }
    return Promise.reject(new Error(error.message))
});

//务必对外暴露axios
export default request;