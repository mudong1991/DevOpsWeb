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
    }
    .ivu-tag{
      margin: 3px 8px 2px 0;
    }
    .ivu-tag-dot{
      height: 30px;
      line-height: 30px;
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
          <Dropdown>
            <Button type="primary">
              标签选项
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem >关闭其他</DropdownItem>
              <DropdownItem >关闭所有</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
            <transition-group name="taglist-moving-animation">
                <Tag
                    type="dot"
                    v-for="(item, index) in pageTagsList"
                    ref="tagsPageOpened"
                    :key="item.name"
                    :name="item.name"
                    @on-close="closePage(item.name)"
                    @click.native="linkTo(item)"
                    :closable="item.name === defaultPage ? false:true"
                    :color="item.children?(item.children[0].name===currentPageName?'blue':'default'):(item.name===currentPageName?'blue':'default')"
                >{{ item.title }}</Tag>
            </transition-group>
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
          type: Function
        },
        closeOtherPage: {
          type: Function
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
    },
    mounted () {
        this.refsTag = this.$refs.tagsPageOpened;
        setTimeout(() => {
            this.refsTag.forEach((item, index) => {
                if (this.$route.name === item.name) {
                    let tag = this.refsTag[index].$el;
                    this.moveToView(tag);
                }
            });
        }, 1);  // 这里不设定时器就会有偏移bug
        this.tagsCount = this.tagsList.length;
    },
    watch: {
        '$route' (to) {
            this.currentPageName = to.name;
            this.$nextTick(() => {
                this.refsTag.forEach((item, index) => {
                    if (to.name === item.name) {
                        let tag = this.refsTag[index].$el;
                        this.moveToView(tag);
                    }
                });
            });
            this.tagsCount = this.tagsList.length;
        }
    }
};
</script>
