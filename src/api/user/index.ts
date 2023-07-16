//引入二次封装的axios
import request from "@/utils/request";
import type { AddOrUpdateUser, AllOrderStateResponseData, AllUserResponseData, UserOrderInfoResponseData, UserParams, CertationTypeResponseData, UseringoResponseData, PayReslt, QrCode, SubmitOrder, OrderResponseData } from './type';
//枚举地址
enum API {
    //提交订单,获取订单号码接口
    SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
    //获取订单详情的数据
    GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
    //取消订单的接口
    ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
    //获取支付订单二维码接口
    QRCODE_URL = '/order/weixin/createNative/',
    //查询订单支付的结果
    PAYRESULT_URL = '/order/weixin/queryPayStatus/',
    //获取当前账号用户信息
    USERINFO_URL = '/user/auth/getUserInfo',
    //获取证件的类型的接口地址
    CERTIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/',
    //用户认证的结构
    USERCERTATION_URL = '/user/auth/userAuah',
    //获取用户订单号的数据
    USERORDERINFO_URL = '/order/orderInfo/auth/',
    //获取全部就诊人的信息
    ALLUSER_URL = '/user/patient/auth/findAll',
    //获取订单的状态
    ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList',
    //获取城市的数据
    CITY_URL = '/cmn/dict/findByParentId/',
    //新增就诊人接口
    ADDUSER_URL = '/user/patient/auth/save',
    //更新已有的就诊人接口
    UPDATEUSER_URL = '/user/patient/auth/update',
    //删除已有的就诊人
    DELETEUSER_URL='/user/patient/auth/remove/'
}
//提交订单
export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, SubmitOrder>(API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`);
//获取订单详情的方法
export const reqOrderInfo = (id: string) => request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id);
//取消订单
export const reqCancelOrder = (id: string) => request.get<any, any>(API.ORDERCANCEL_URL + id);
//获取支付二维码接口
export const reqQrcode = (orderId: string) => request.get<any, QrCode>(API.QRCODE_URL + orderId);
//查询订单支付的结果
export const reqQueryPayState = (orderId: string) => request.get<any, PayReslt>(API.PAYRESULT_URL + orderId);
//获取当前用户信息的接口
export const reqUserInfo = () => request.get<any, UseringoResponseData>(API.USERINFO_URL);
//获取证件类型的方法
export const reqCertationType = (CertificatesType = 'CertificatesType') => request.get<any, CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL + CertificatesType);
//用户认证接口
export const reqUserCertation = (data: UserParams) => request.post<any, any>(API.USERCERTATION_URL, data);
//获取订单数据接口
export const reqUserOrderInfo = (page: number, limit: number, patientId: string, orderStatus: string) => request.get<any, UserOrderInfoResponseData>(API.USERORDERINFO_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
//获取全部就诊人的信息
export const reqAllUser = () => request.get<any, AllUserResponseData>(API.ALLUSER_URL);
//获取全部订单的接口
export const reqOrderState = () => request.get<any, AllOrderStateResponseData>(API.ORDERSTATE_URL);
//获取城市的数据
export const reqCity = (parentId: string) => request.get<any, any>(API.CITY_URL + parentId);

//新增与修改已有的就诊人接口方法
export const reqAddOrUpdateUser = (data: AddOrUpdateUser) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data);
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data);
    }
}

//删除某一个就诊人的信息
export const reqRemoveUser = (id:number)=>request.delete<any,any>(API.DELETEUSER_URL+id)