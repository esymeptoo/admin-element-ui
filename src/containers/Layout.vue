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
      <div class="content-layout">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import SiderBar from '@/containers/SiderBar'
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
  },
  data() {
    return {
      groups: [],
    }
  },
  async mounted() {
    const userProfile = await Promise.resolve(profile)
    const menus = getMenu(userProfile)
    this.groups = menuGroupCompositor(GroupName, menus)
    console.log(this.groups)
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
