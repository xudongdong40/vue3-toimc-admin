export interface UserItem {
  id: string //主键id
  username: string //账号
  realname: string //真实姓名
  departIds: string //所属部门id 以逗号分隔
  avatar: string //头像
  birthday: string //生日
  sex: 2
  sex_dictText: string
  email: string //邮箱
  phone: string //手机号
  telephone: string //座机
  workNo: string //工号

  status: 1
  status_dictText: string

  createBy: string //创建人
  createTime: string //创建时间
  updateBy: string
  updateTime: string
}
export type getUserListModel = UserItem[]
