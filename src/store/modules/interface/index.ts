import type { HosPitalDetail, DeparmentArr, UserInfo } from '@/api/hospital/type';
//定义仓库内部存储数据state的ts类型
export interface DetailState {
    hospitalInfo: HosPitalDetail,
    deparmentArr: DeparmentArr
}


//用户仓库相关state数据的ts类型定义
export interface UserState {
    visiable: boolean,//用于控制登录组件的dialog显示与隐藏
    code: string,//存储用户的验证码
    userInfo: UserInfo
}