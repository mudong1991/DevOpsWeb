<template>
  <el-container >
    <el-header class="main-content-header">
      <main-header :breadcrumbList="breadcrumbList"></main-header>
    </el-header>
    <el-main class="main-content-container">
      <div v-bar class="vuebar-element"><div>
        <div class="margin-bottom-10 clearfix">
          <div class="col-xs-12 col-sm-12 col-md-6 padding-0 margin-bottom-10">
            <el-button type="primary" size="small" @click="operateUserModel()"><i class="fa fa-plus"></i>添加用户</el-button>
            <el-button type="danger" size="small" :disabled="multipleSelection.length === 0" @click="deleteUserAction()"><i class="fa fa-trash-o"></i>批量删除</el-button>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 padding-0 text-right ">
            <el-input
              placeholder="搜索用户名"
              v-model="searchInfo.search"
              size="small"
              style="width: 200px;display: inline-block; height: 30px">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button type="primary" size="small" @click="bindUserList()" ><i class="fa fa-search"></i>搜索</el-button>
          </div>
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
                <img class="img-responsive img-circle" @click="viewAvatar(scope.row.avatar)" :src="scope.row.avatar" width="32" height="32" style="width: 32px; height: 32px; cursor: pointer" />
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
                  @click="operateUserModel(scope.row)"
                  >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteUserAction(scope.row)"
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

        <!--头像查看模态框-->
        <el-dialog :visible.sync="avatarDialogVisible" size="tiny" class="text-center" >
          <img width="100%" :src="avatarDialogImageUrl" alt="" style="height: 400px;">
        </el-dialog>

        <!--添加用户（模态框）-->
        <el-dialog :title="operateUserDialogInfo.title" :visible.sync="operateUserDialogVisible" :before-close="handleUserDialogClose" custom-class="col-xs-10 col-sm-8 col-md-5 col-lg-4 no-float">
          <el-form :model="userForm" :rules="userRules" class="demo-ruleForm"  ref="userForm" :label-width="formLabelWidth" status-icon>
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
                action="/api/users"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleChange"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>


            <el-form-item label="登录授权">
              <el-switch v-model="userForm.is_active"></el-switch>
            </el-form-item>

            <el-form-item label="超级管理员">
              <el-switch v-model="userForm.is_superuser"></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeUserDialog()">取 消</el-button>
            <el-button type="primary" @click="operateUserAction('userForm')"  v-show="!loginBtnLoading" v-text="operateUserDialogInfo.label"></el-button>
            <el-button type="primary" :loading="true" v-show="loginBtnLoading" size="large" class="login-form-content-submit">执    行   中...</el-button>
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
  import {MessageBox} from '@/utils/util';

  export default {
    data () {
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userForm.checkPassword !== '') {
            this.$refs.userForm.validateField('checkPassword');
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
        breadcrumbList: [
          {'name': '系统设置', 'linkObject': {name: 'wb_system'}, 'icon': 'fa fa-cogs'},
          {'name': '账户管理', 'icon': 'fa fa-users'},
          {'name': '用户管理', 'linkObject': {name: 'wb_userAdmin'}, 'icon': 'fa fa-user'}
        ],
        userListLoading: false,  // 显示加载动画
        searchInfo: {page: 1, search: '', pageSize: 10},  // 搜索信息
        pageModel: defaultPageModel,  // 分页数据
        tableData: [],
        multipleSelection: [],  // 列表选择列表
        operateUserDialogVisible: false, // 操作用户模态框
        avatarDialogVisible: false,
        avatarDialogImageUrl: '',
        operateUserDialogInfo: {title: '添加用户', label: '添加', type: 'add'},
        userForm: {
          username: '',
          password: '',
          checkPassword: '',
          avatar: '',
          is_active: true,
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
        formLabelWidth: '100px',
        imageUrl: '',
        loginBtnLoading: false
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
      // 查看用户头像
      viewAvatar (imgUrl) {
        this.avatarDialogVisible = true;
        this.avatarDialogImageUrl = imgUrl;
      },
      // 模态框关闭
      handleUserDialogClose (done) {
        this.$refs['userForm'].resetFields();
        done();
      },
      closeUserDialog () {
        this.$refs['userForm'].resetFields();
        this.operateUserDialogVisible = false;
      },
      // 用户操作（添加和编辑）
      operateUserModel (rowData) {
        if (rowData) {
          this.operateUserDialogInfo = {title: '编辑用户', label: '确定', type: 'edit'};
          this.userForm = Object.assign({}, rowData);
          this.userForm.checkPassword = this.userForm.password;
          this.imageUrl = this.userForm.avatar;
          this.operateUserDialogVisible = true;
        } else {
          this.userForm = {
            username: '',
            password: '',
            checkPassword: '',
            avatar: '',
            is_active: true,
            is_superuser: ''
          };
          this.imageUrl = '';
          this.operateUserDialogInfo = {title: '添加用户', label: '添加', type: 'add'};
          this.operateUserDialogVisible = true;
        }
      },
      handleChange(file, fileList) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.userForm.avatar = file.raw;  // file.raw 是文件对象
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }

        return isJPG && isLt2M;
      },

      // 添加、编辑用户
      operateUserAction (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let userFormData = new FormData();  // 有文件，必须传入表单对象

            userFormData.append('username', this.userForm.username);
            userFormData.append('password', this.userForm.checkPassword);
            userFormData.append('is_active', this.userForm.is_active);
            userFormData.append('is_superuser', this.userForm.is_superuser);
            if (this.userForm.avatar instanceof Object) {
              userFormData.append('avatar', this.userForm.avatar);
            }

            this.loginBtnLoading = true;

            if (this.operateUserDialogInfo.type === 'add') {
              systemSettingsService.addUser(userFormData, {headers: {'Content-Type': 'multipart/form-data', 'X-CSRFToken': this.$cookie.get('csrftoken')}}, false, true).then(({data}) => {
                this.loginBtnLoading = false;
                this.operateUserDialogVisible = false;
                this.bindUserList();
                this.$message({
                  message: `成功创建用户：${data.username}`,
                  showClose: true,
                  type: 'success'
                });
              }, ({data}) => {
                this.loginBtnLoading = false;
              });
            } else if (this.operateUserDialogInfo.type === 'edit') {
              systemSettingsService.editUser(this.userForm.id, userFormData, {headers: {'Content-Type': 'multipart/form-data', 'X-CSRFToken': this.$cookie.get('csrftoken')}}, false, true).then(({data}) => {
                this.loginBtnLoading = false;
                this.operateUserDialogVisible = false;
                this.bindUserList();
                this.$message({
                  message: `成功修改用户：${data.username}`,
                  showClose: true,
                  type: 'success'
                });
              }, ({data}) => {
                this.loginBtnLoading = false;
              });
            }
          }
        });
      },

      // 删除用户
      deleteUserAction (rowData) {
        if (rowData) {
          MessageBox.confirm(`确认要删除用户: ${rowData.username}`, () => {
            systemSettingsService.deleteUser([rowData.id], false, false).then(({data}) => {
              this.$message({
                message: `成功删除用户：${rowData.username}`,
                showClose: true,
                type: 'success'
              });
              this.bindUserList();
              MessageBox.closeAll();
            });
          });
        } else {
          let deleteUserList = Array.map(this.multipleSelection, (item) => {
            return item.id;
          });
          MessageBox.confirm(`确认要删除这些用户`, () => {
            systemSettingsService.deleteUser(deleteUserList, false, false).then(({data}) => {
              this.$message({
                message: `删除成功`,
                showClose: true,
                type: 'success'
              });
              this.bindUserList();
              MessageBox.closeAll();
            });
          });
        }
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
    margin: 0;
    padding: 0;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
