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
            style="width: 100%">
            <el-table-column
              type="selection"
              width="38">
            </el-table-column>

            <el-table-column
              prop="date"
              label="日期"
              sortable
              width="180">
            </el-table-column>

            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>

            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>

            <el-table-column
              prop="tag"
              label="标签"
              width="100"
              :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag === '家' ? 'primary' : 'success'"
                  close-transition>{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>


        <el-pagination
          class="text-center margin-top-10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 15, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="50">
        </el-pagination>
      </div></div>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import mainHeader from '@/components/workbench/mainHeader';

  export default {
    created () {
      document.title = title;
    },
    data () {
      return {
        breadcrumbList: [
          {'name': '系统设置', 'linkObject': {name: 'wb_system'}, 'icon': 'fa fa-cogs'},
          {'name': '账户管理', 'icon': 'fa fa-users'},
          {'name': '用户管理', 'linkObject': {name: 'wb_userAdmin'}, 'icon': 'fa fa-user'}
        ],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      };
    },
    methods: {
      filterTag(value, row) {
        return row.tag === value;
      }
    },
    components: {
      mainHeader
  }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
