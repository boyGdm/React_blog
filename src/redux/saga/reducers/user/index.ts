/***
 * @auth: dmx
 * @time: 2020/6/15
 * @func: 公共reducer数据 比如 超时提示，公共的数据接口之类的
 ***/
import { userAction } from '../../actions/user';
import logo from '../../../../assets/img/logo.jpg'

const initialStateSetter:IUserState = {
    list: {
        avata: logo,
        nickname: 'admin',
        name: 'salmontech',
        logo: logo
    }
}

export default ( state = initialStateSetter, action: ActionParams ) => {
    switch (action.type) {
        // TRIGGER ==> 发起请求的时候
        // SUCCESS ==> 成功的时候
        // FAILURE ==> 失败的时候
        // FULFILL ==> 完成的时候
        // REQUEST ==> 一般不在这里使用
        case userAction.TRIGGER: {
            return {
                ...state,
                ...action.payload
            }
        }
    }
    return state;
};
