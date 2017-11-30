<style lang="scss" rel="stylesheet/scss" scoped>
  .tags-outer-scroll-con{
    height: 35px;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    .tags-inner-scroll-body{
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left .3s ease;
      margin-top: 3px;
      padding: 0 4px;
      .open-tags-list{
        float: left;
        height: 100%;
        li{
          display: inline-block;
          position: relative;
          height: 30px;
          line-height: 28px;
          border-radius: 4px;
          box-sizing: border-box;
          border:1px solid #DDDEE2;
          padding: 0 8px;
          cursor: pointer;
          margin-right: 8px;
          .dot{
            width: 10px;
            height: 10px;
            margin-right: 2px;
            border-radius: 5px;
            background: #409EFF;
            display: inline-block;
          }
          .el-icon-close:hover{
            background-color: #878D99;
            color: white;
            border-radius: 7px;
            border: none;
          }
        }
        .primary{
          color: #409eff;
          border-color: #CAE4FF;
          background: #ECF5FF;
          .el-icon-close:hover{
            background-color: #409EFF;
            color: white;
            border-radius: 7px;
            border: none;
          }
        }
      }
    }
    .close-all-tag-con{
      position: absolute;
      right: 0;
      top: 0;
      text-align: center;
      height: 100%;
      z-index: 10;
      padding-top: 1px;
    }
  }
</style>

<template>
    <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con clearfix">
        <div class="close-all-tag-con">
          <el-dropdown @command="handleCloseTag">
            <el-button type="primary" size="small">
              更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
              <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
              <ul class="open-tags-list">
                <li :class="item.children?(item.children[0].name===currentPageName?'primary':''):(item.name===currentPageName?'primary':'')" v-for="(item, index) in pageTagsList">
                  <span class="dot" v-if="item.children?(item.children[0].name===currentPageName):(item.name===currentPageName)">

                  </span>
                  <span class="open-tags-item-content">
                    {{ item.title }}
                  </span>
                  <i class="el-tag__close el-icon-close" v-if="item.name === defaultPage ? false:true">

                  </i>
                </li>
              </ul>

        </div>
    </div>
</template>

<script>
export default {
    name: 'tagsPageOpened',
    data () {
        return {
            currentPageName: this.$route.name,
            tagBodyLeft: 0,
            refsTag: [],
            tagsCount: 1
        };
    },
    props: {
        pageTagsList: Array,
        defaultPage: String,
        closePage: {
          type: Function,
          required: true
        },
        closeAllPage: {
          type: Function,
          required: true
        },
        closeOtherPage: {
          type: Function,
          required: true
        },
        beforePush: {
            type: Function,
            default: (item) => {
                return true;
            }
        }
    },
    computed: {
        tagsList () {
            return this.pageTagsList;
        }
    },
    methods: {
      handleCloseTag (command) {
        if (command === 'closeOther') {
          this.closeOtherPage();
        } else if (command === 'closeAll') {
          this.closeAllPage();
        }
      },
      linkTo (item) {
          let routerObj = {};
          routerObj.name = item.name;
          if (item.argu) {
              routerObj.params = item.argu;
          }
          if (item.query) {
              routerObj.query = item.query;
          }
          if (this.beforePush(item)) {
              this.$router.push(routerObj);
          }
      },
      handlescroll (e) {
          var type = e.type;
          let delta = 0;
          if (type === 'DOMMouseScroll' || type === 'mousewheel') {
              delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
          }
          let left = 0;
          if (delta > 0) {
              left = Math.min(0, this.tagBodyLeft + delta);
          } else {
              if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
                  if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
                      left = this.tagBodyLeft;
                  } else {
                      left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
                  }
              } else {
                  this.tagBodyLeft = 0;
              }
          }
          this.tagBodyLeft = left;
      },
      handleTagsOption (type) {
          if (type === 'clearAll') {
              this.$store.commit('clearAllTags');
              this.$router.push({
                  name: 'home_index'
              });
          } else {
              this.$store.commit('clearOtherTags', this);
          }
          this.tagBodyLeft = 0;
      },
      moveToView (tag) {
          if (tag.offsetLeft < -this.tagBodyLeft) {
              // 标签在可视区域左侧
              this.tagBodyLeft = -tag.offsetLeft + 10;
          } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
              // 标签在可视区域
          } else {
              // 标签在可视区域右侧
              this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
          }
      }
    }
};
</script>
