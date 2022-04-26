import axios from 'axios'
enum Api {
  userRoleList = '/api/sys/user/userRoleList',
  deleteBatch = '/api/sys/user/deleteUserRoleBatch'
}
//请求头
const headers = {
  authorization: 'Bearer ' + localStorage.getItem('token')
}

/**
 *  获取角色用户列表
 */
export const queryRoleUserList = (params) => {
  return new Promise((resolve) => {
    axios.get(Api.userRoleList, { params, headers }).then((res) => {
      resolve(res.data)
    })
  })
}
/**
 * 批量删除角色用户（取消关联）
 */
export const deleteBatchUser = (data) => {
  return new Promise((resolve) => {
    axios.delete(Api.deleteBatch, { data, headers }).then((res) => {
      resolve(res.data)
    })
  })
}
