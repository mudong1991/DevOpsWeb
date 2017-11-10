<template>
  <el-container >
    <el-header class="main-content-header">
      <main-header :breadcrumbList="breadcrumbList"></main-header>
    </el-header>
    <el-main class="main-content-container">
      <div v-bar class="vuebar-element"><div>
        <div class="margin-bottom-10">
          <el-button type="primary" size="small" @click="operateUser()"><i class="fa fa-plus"></i>添加用户</el-button>
          <el-button type="danger" size="small" :disabled="multipleSelection.length === 0"><i class="fa fa-trash-o"></i>批量删除</el-button>
        </div>

        <el-table
            :data="tableData"
            border
            v-loading="userListLoading"
            @selection-change="handleSelectionChange"
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
              label="最近登录"
              width="162">
            </el-table-column>

            <el-table-column
              prop="login_times"
              label="登录次数"
              sortable>
            </el-table-column>

            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="operateUser(scope.row.id)"
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

        <!--添加用户-->
        <el-dialog :title="operateUserDialogInfo.title" :visible.sync="operateUserDialogVisible" custom-class="col-xs-10 col-sm-8 col-md-5 col-lg-4 no-float">
          <el-form :model="userForm" :rules="userRules" class="demo-ruleForm" ref="ruleForm" :label-width="formLabelWidth" status-icon>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPassword">
              <el-input type="password" v-model="userForm.checkPassword" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="true"
                list-type="picture-card"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="operateUserDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="operateUserDialogVisible = false" v-text="operateUserDialogInfo.label"></el-button>
          </div>
        </el-dialog>
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
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userForm.checkPassword !== '') {
            this.$refs.ruleForm.validateField('checkPassword');
          }
          callback();
        }
      };
      let validatePassword2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        pageSizeList: defaultPageSizeList,
        imageUrl: '',
        breadcrumbList: [
          {'name': '系统设置', 'linkObject': {name: 'wb_system'}, 'icon': 'fa fa-cogs'},
          {'name': '账户管理', 'icon': 'fa fa-users'},
          {'name': '用户管理', 'linkObject': {name: 'wb_userAdmin'}, 'icon': 'fa fa-user'}
        ],
        userListLoading: false,  // 显示加载动画
        searchInfo: {page: 1, username: '', pageSize: 10},  // 搜索信息
        pageModel: defaultPageModel,  // 分页数据
        tableData: [],
        multipleSelection: [],  // 列表选择列表
        operateUserDialogVisible: false, // 操作用户模态框
        operateUserDialogInfo: {title: '添加用户', label: '添加'},
        userForm: {
          username: '',
          password: '',
          checkpassword: '',
          avatar: '',
          is_active: '',
          is_superuser: ''
        },
        userRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { max: 50, message: '用户名最长为 50 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, required: true, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatePassword2, required: true, trigger: 'blur' }
          ]
        },
        formLabelWidth: '100px'
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
      },
      // 选择改变
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 用户操作（添加和编辑）
      operateUser (userId) {
        if (userId) {
          this.operateUserDialogInfo = {title: '编辑用户', label: '确定'};
          this.operateUserDialogVisible = true;
        } else {
          this.operateUserDialogInfo = {title: '添加用户', label: '添加'};
          this.operateUserDialogVisible = true;
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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

<style lang="scss" rel="stylesheet/scss">
  .no-float{
    float: none !important;
  }
  input[type="file"] {
    display: none !important;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
