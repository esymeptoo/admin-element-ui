<template>
  <div class="layout-container">
    <div class="left-layout">
      <sider-bar
        v-if="groups.length"
        :groups="groups"
      />
    </div>
    <div class="right-layout">
      <div class="header-layout">
        <div class="expand-icon">
          <i class="el-icon-menu" @click="toggleSiderBar" />
        </div>
        <div class="header-content"></div>
      </div>
      <div
        v-if="profile"
        class="content-layout"
      >
        <not-permission v-if="!isPermissionPass" />
        <router-view v-else />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import SiderBar from '@/containers/SiderBar'
import NotPermission from '@/pages/403Permission/403'
import bus from '@/Bus'
import { BusEvent, GroupName } from '@/constants'
import { getMenu } from '@/router/routerData'
import profile from '@/mock/profile'

function menuGroupCompositor(groups, menus) {
  return Object
    .keys(groups)
    .map(g => {
      // 没有二级导航
      if (groups[g].single) {
        return {
          group: g,
          ...groups[g],
          ...menus[g][0],
          weight: groups[g].weight,
        }
      }
      return {
        group: g,
        ...groups[g],
        children: menus[g],
      }
    })
    .sort((a, b) => a.weight - b.weight)
}

export default {
  components: {
    SiderBar,
    NotPermission,
  },
  data() {
    return {
      groups: [],
      profile: null,
      menus: [],
    }
  },
  computed: {
    isPermissionPass() {
      const { permission } = this.profile
      return permission.includes(this.$route.name) || this.menus.find(m => m.name === this.$route.name)
    },
  },
  async mounted() {
    const userProfile = await Promise.resolve(profile)
    const { finalMenus, permissionMenus } = getMenu(userProfile)
    this.profile = userProfile
    this.menus = permissionMenus
    this.groups = menuGroupCompositor(GroupName, finalMenus)
  },
  methods: {
    toggleSiderBar: _.debounce(function () {
      bus.$emit(BusEvent.TOGGLE_MENU)
    }, 100),
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.layout-container {
  height: 100%;
  display: flex;

  .left-layout {
    flex: 0 0 auto;
    overflow-y: auto;
  }

  .right-layout {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;

    .header-layout {
      flex: 0 0 $header-height;
      background: rgba(1, 1, 1, .4);
      display: flex;
      align-items: center;

      .expand-icon {
        flex: 0 0 60px;
        padding-left: 20px;
        cursor: pointer;
      }

      .header-content {
        flex: 1 0 0;
      }
    }

    .content-layout {
      flex: 1 0 0;
      overflow-y: auto;
      padding: 20px;
    }
  }
}
</style>
