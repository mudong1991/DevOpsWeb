<template>
  <el-container >
    <el-header class="main-content-header">
      <main-header :breadcrumbList="breadcrumbList"></main-header>
    </el-header>
    <el-main class="main-content-container">
      <div v-bar class="vuebar-element"><div>
        <el-table
            :data="tableData"
            border
            v-loading="userListLoading"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="38">
            </el-table-column>

            <el-table-column
              prop="username"
              label="用户名"
              sortable>
            </el-table-column>

            <el-table-column
              label="头像">
              <template slot-scope="scope">
                <img class="img-responsive img-circle" :src="scope.row.avatar" width="32" height="32" />
              </template>
            </el-table-column>

            <el-table-column
              prop="role_name"
              label="菜单角色">
            </el-table-column>

            <el-table-column
              prop="groups_name"
              label="功能组">
            </el-table-column>

            <el-table-column
              prop="is_active"
              label="登录授权"
              :filters="[{ text: '允许', value: true }, { text: '拒绝', value: false }]"
              :filter-method="filterIsActive"
              filter-placement="bottom-end"
              width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.is_active ? 'success' : 'danger'" close-transition>
                  <span v-if="scope.row.is_active">允许</span>
                  <span v-else>拒绝</span>
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column
              prop="is_superuser"
              label="超级用户">
              <template slot-scope="scope">
                  <span v-if="scope.row.is_superuser">是</span>
                  <span v-else>否</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="isonline"
              label="在线状态">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isonline ? 'success' : 'danger'" close-transition>
                  <span v-if="scope.row.isonline">在线</span>
                  <span v-else>离线</span>
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column
              prop="last_login"
              label="最近登录">
            </el-table-column>

            <el-table-column
              prop="login_times"
              label="登录次数">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  >删除</el-button>
              </template>
            </el-table-column>
          </el-table>


        <el-pagination
          class="text-center margin-top-10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageModel.pageNo"
          :page-sizes="pageSizeList"
          :page-size="pageModel.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageModel.totalCount">
        </el-pagination>
      </div></div>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import mainHeader from '@/components/workbench/mainHeader';
  import systemSettingsService from 'services/systemSettingsService';
  import {defaultPageSizeList, defaultPageModel} from 'config/config';

  export default {
    data () {
      return {
        pageSizeList: defaultPageSizeList,
        breadcrumbList: [
          {'name': '系统设置', 'linkObject': {name: 'wb_system'}, 'icon': 'fa fa-cogs'},
          {'name': '账户管理', 'icon': 'fa fa-users'},
          {'name': '用户管理', 'linkObject': {name: 'wb_userAdmin'}, 'icon': 'fa fa-user'}
        ],
        userListLoading: false,  // 显示加载动画
        searchInfo: {page: 1, username: '', pageSize: 10},  // 搜索信息
        pageModel: defaultPageModel,  // 分页数据
        tableData: []
      };
    },
    methods: {
      filterIsActive(value, row) {
        return row.is_active === value;
      },
      // 绑定用户数据列表
      bindUserList () {
        this.userListLoading = true;
        systemSettingsService.getUserList(this.searchInfo, false, true).then(({data}) => {
          this.userListLoading = false;

          this.tableData = data.tableData;
          this.pageModel = data.pageInfo;
        }, ({data}) => {
          this.userListLoading = false;
        });
      },
      // 翻页
      handleCurrentChange(val) {
        this.searchInfo.page = val;
        this.bindUserList();
      },
      // 每页条数改变
      handleSizeChange(val) {
        this.searchInfo.pageSize = val;
        this.bindUserList();
      }
    },
    created () {
      // 获取用户数据
      this.bindUserList();
    },
    components: {
      mainHeader
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
