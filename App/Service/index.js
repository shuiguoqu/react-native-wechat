import axios from 'axios';
import config from '../Config'


const create = ()=>{

  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 3000,
    headers: {}
  });

  //请求拦截处理
  instance.interceptors.request.use(async function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  //返回拦截处理
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });



  const setToken=(access_token)=>instance.defaults.headers.common['Authorization'] = 'Bearer '+access_token

  const login =(param)=> instance.post('api/user/login',{...param});
  const register =(param)=> instance.post('api/user/register',{...param});
  const searchFriend =(param)=>instance.post('api/friend/searchFriend',{...param});
  const addFriend=(param)=>instance.post('api/friend/addFriend',{...param});
  const deleteFriend=(param)=>instance.post('api/friend/deleteFriend',{...param});
  const getFriendList=(id)=>instance.get('api/friend/getFriendList?selfId='+id)
  const loginOut=(id)=>instance.get('api/user/loginOut?selfId='+id)
  const getMessageHistory=({roomId, messageId, page})=>instance.get('api/message/getMessageHistory?roomId='+roomId+'&messageId='+messageId+'&page='+page)
  const deleteMessageHistory=(id)=>instance.get('api/message/deleteMessageHistory?roomId='+id)

  const refreshToken=(refresh_token)=>instance.post('api/user/refreshToken',{refresh_token})

  return{
    login,
    register,
    searchFriend,
    addFriend,
    deleteFriend,
    getFriendList,
    loginOut,
    getMessageHistory,
    deleteMessageHistory,
    refreshToken,
    setToken
  }
}

export default {
  create
};








