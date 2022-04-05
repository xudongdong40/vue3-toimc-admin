import axios from 'axios'
enum Api {
  GetMenuList = '/api/sys/permission/getUserPermissionByToken'
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  console.log('================')

  return new Promise((resolve) => {
    const headers = {
      authorization: 'Bearer ' + localStorage.getItem('token')
    }
    axios.get(Api.GetMenuList, { headers }).then((res) => {
      console.log('================', res.data)
      resolve(res.data)
    })

    //为了兼容mock和接口数据
    // defHttp.request({
    //   method: 'get',
    //   baseURL:'/api',
    //   url: Api.GetMenuList
    // }).then((res) => {
    //   if(Array.isArray(res)){
    //     resolve(res)
    //   }else{
    //     resolve(res['menu'])
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // });
  })
}
