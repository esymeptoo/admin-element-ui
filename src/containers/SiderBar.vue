<template>
  <div :class="['sider-bar-container', { expanded: expanded }]">
    <div class="logo-bar">
      <i class="logo" />
    </div>
    <div class="menu-bar">
      <el-menu
        router
        :default-active="currentActive"
        class="el-menu-vertical"
        :collapse="expanded"
      >
        <template v-for="group in groups">
          <el-submenu
            v-if="group.children"
            :key="group.group"
            :index="group.group"
          >
            <template slot="title">
              <i
                v-if="group.icon"
                :class="group.icon"
              />
              <span>{{ group.groupName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="item in group.children"
                :key="item.path"
                :route="{ name: item.name }"
                :index="item.name"
              >
                <template>
                  <i
                    v-if="item.icon"
                    :class="item.icon"
                  />
                  <span>{{ item.routeName }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            :index="group.name"
            :route="{ name: group.name }"
            v-else-if="group.single"
          >
            <i
              v-if="group.icon"
              :class="group.icon"
            />
            <span>{{ group.groupName }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import bus from '@/Bus'
import { BusEvent, GroupName } from '@/constants'

export default {
  props: {
    groups: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      expanded: false,
      currentActive: '',
    }
  },
  watch: {
    '$route'(n) {
      this.currentActive = n.path.split('/')[1]
    },
  },
  mounted() {
    bus.$on(BusEvent.TOGGLE_MENU, this.handleExpand.bind(this))
    this.currentActive = this.$route.path.split('/')[1]
  },
  methods: {
    handleExpand() {
      this.expanded = !this.expanded
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.sider-bar-container {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;

  &.expanded {

    .logo {
      transform: scale(.7);
    }
  }

  .logo-bar {
    width: 100%;
    flex: 0 0 $header-height;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      width: 50px;
      height: 50px;
      background: url('../assets/logo.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      transition: transform .4s ease-in-out;
    }
  }

  .menu-bar {
    width: 100%;
    flex: 1 0 0;

    /deep/ .el-menu {
      height: 100%;

      &.el-menu-vertical:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }
    }
  }
}
</style>
