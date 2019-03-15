export const Group = {
  HOME: 'home',
  DATA: 'data',
  SETTINGS: 'settings',
}

export const GroupName = {
  [Group.DATA]: {
    groupName: '数据',
    icon: 'el-icon-document',
    weight: 10,
  },
  [Group.SETTINGS]: {
    groupName: '设置',
    icon: 'el-icon-document',
    weight: 20,
  },
  [Group.HOME]: {
    groupName: '首页',
    icon: 'el-icon-document',
    weight: 0,
    single: true,
  },
}

export const BusEvent = {
  TOGGLE_MENU: 'toggle_menu',
}
