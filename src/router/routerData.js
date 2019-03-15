import { Group } from '@/constants'

// weight越高 侧边栏同组位置越靠下
const routerData = [
  {
    path: 'index',
    name: 'index',
    component: resolve => require(['../pages/Home/Index'], resolve),
    icon: 'el-icon-document',
    group: Group.HOME,
  },
  {
    path: 'daily_data',
    name: 'daily_data',
    component: resolve => require(['../pages/Data/DailyData'], resolve),
    icon: 'el-icon-document',
    group: Group.DATA,
    weight: 10,
    routeName: '日常数据',
  },
  {
    path: 'user_data',
    name: 'user_data',
    component: resolve => require(['../pages/Data/UserData'], resolve),
    icon: 'el-icon-document',
    group: Group.DATA,
    weight: 20,
    routeName: '用户数据',
  },
  {
    path: 'account_settings',
    name: 'account_settings',
    component: resolve => require(['../pages/Settings/AccountSettingsPage'], resolve),
    icon: 'el-icon-document',
    group: Group.SETTINGS,
    weight: 10,
    routeName: '账号设置',
  },
  {
    path: 'employee_settings',
    name: 'employee_settings',
    component: resolve => require(['../pages/Settings/EmployeeSettingsPage'], resolve),
    icon: 'el-icon-document',
    group: Group.SETTINGS,
    weight: 20,
    routeName: '员工设置',
  },
]

export default routerData

export function getMenu() {
  const obj = {}
  // 将没有二级导航的过滤掉
  routerData.forEach(r => {
    if (!obj[r.group]) obj[r.group] = []
    obj[r.group].push(r)
  })
  // 排序
  Object.keys(obj).forEach(group => {
    obj[group] = obj[group].sort((a, b) => a.weight - b.weight)
  })
  return obj
}

export const menus = getMenu()
