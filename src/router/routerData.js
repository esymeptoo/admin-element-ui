import _ from 'lodash'
import { Group } from '@/constants'

// weight越高 侧边栏同组位置越靠下
// 侧边栏组件暂时只能接受两层导航
const routerData = [
  {
    path: 'index',
    name: 'index',
    component: resolve => require(['../pages/Home/Index'], resolve),
    icon: 'el-icon-document',
    group: Group.HOME,
    weight: 0,
    permissionChecked: ({ permission }) => permission.includes('index'),
  },
  {
    path: '/daily_data',
    name: 'daily_data',
    component: resolve => require(['../pages/Data/DailyData'], resolve),
    icon: 'el-icon-document',
    group: Group.DATA,
    weight: 10,
    routeName: '日常数据',
    redirect: {
      name: 'daily_data_view',
    },
    permissionChecked: ({ permission }) => permission.includes('daily_data'),
    // 这些都不是展示在侧边栏的
    children: [
      {
        path: 'daily_data_view',
        name: 'daily_data_view',
        routeName: '日常数据展示',
        component: resolve => require(['../pages/Data/DailyDataView'], resolve),
      },
    ],
  },
  {
    path: 'user_data',
    name: 'user_data',
    component: resolve => require(['../pages/Data/UserData'], resolve),
    icon: 'el-icon-document',
    group: Group.DATA,
    weight: 20,
    routeName: '用户数据',
    permissionChecked: ({ permission }) => permission.includes('user_data'),
  },
  {
    path: 'account_settings',
    name: 'account_settings',
    component: resolve => require(['../pages/Settings/AccountSettingsPage'], resolve),
    icon: 'el-icon-document',
    group: Group.SETTINGS,
    weight: 10,
    routeName: '账号设置',
    permissionChecked: ({ permission }) => permission.includes('account_settings'),
  },
  {
    path: 'employee_settings',
    name: 'employee_settings',
    component: resolve => require(['../pages/Settings/EmployeeSettingsPage'], resolve),
    icon: 'el-icon-document',
    group: Group.SETTINGS,
    weight: 20,
    routeName: '员工设置',
    permissionChecked: ({ permission }) => permission.includes('employee_settings'),
  },
]

export default routerData

export function getMenu(profile) {
  const obj = _.groupBy(
    routerData.filter(r => {
      return r.permissionChecked ? r.permissionChecked(profile) : true
    }),
    'group',
  )
  // 排序
  Object.keys(obj).forEach(group => {
    obj[group] = obj[group].sort((a, b) => a.weight - b.weight)
  })
  return obj
}

// export const menus = getMenu()
