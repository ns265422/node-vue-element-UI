<template>
  <div class="fillcontain">

      <el-card class="box-card" shadow="always">
        <i class="el-icon-search"></i>
        <span style="margin-left: 10px">查詢條件</span>
        <el-form :inline="true" class='form'>
          <el-form-item label="日期">
            <el-date-picker
              v-model="sedate"
              type="daterange"
              start-placeholder="選擇開始時間"
              end-placeholder="選擇結束時間"
              :clearable="false">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-search"
              @click="onScreenOutMoney()">查 詢
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="info"
              size="medium"
              icon="el-icon-plus"
              @click="onAddMoney()">新增紀錄
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="box-card" shadow="always">
        <el-table
          v-if="tableData.length > 0"
          :data="tableData"
          border
          stripe
          :default-sort="{ prop: 'date', order: 'descending' }">
          <el-table-column type="index" label="序號" align="center" width="70px"></el-table-column>
          <el-table-column prop="date" label="創建時間" align="center"  width="250px"  sortable>
            <template slot-scope="scope">
              <el-icon name="time"></el-icon>
              <span style="margin-left: 10px">{{scope.row.date | transformDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="收支類型" align="center" width="150px">
          </el-table-column>
          <el-table-column prop="describe" label="收支描述" align="center" width="180px">
          </el-table-column>
          <el-table-column prop="income" label="收入" align="center" width="100px">
            <template slot-scope="scope">
              <span style="color:#00d053">+ {{ scope.row.income }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="expend" label="支出" align="center" width="100px">
            <template slot-scope="scope">
              <span style="color:#f56767">- {{ scope.row.expend }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cash" label="帳戶現金" align="center" width="135px">
            <template slot-scope="scope">
              <span style="color:#4db3ff">{{ scope.row.cash }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="備註" align="center" width="300px">
          </el-table-column>
          <el-table-column prop="operation" align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-edit" size="medium" @click="onEditMoney(scope.row)">編輯</el-button>
              <el-button type="danger" icon="el-icon-delete" size="medium" @click="onDeleteMoney(scope.row, scope.$index)">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 分頁 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange">
            </el-pagination>
          </div>
        </el-col>
      </el-row>

    <!-- 彈框頁面 -->
    <DialogFound :dialog="dialog" :form="form" @update="getProfile"></DialogFound>
  </div>
</template>

<script>
import DialogFound from '../components/DialogFound'

export default {
  name: 'fundlist',
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData: [],
      sedate: [],
      dialog: {
        show: false,
        option: 'edit'
      },
      form: {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      },
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  components: {
    DialogFound
  },
  created() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      this.$axios('/api/profile').then(res => {
        this.tableData = res.data;
        this.allTableData = res.data
        this.filterTableData = res.data
        // 設置分頁數據
        this.setPaginations()
      })
    },
    onEditMoney(row) {
      this.dialog = {
        show: true,
        option: 'edit'
      }
      this.form = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      }
    },
    onDeleteMoney(row, index) {
      this.$axios.delete(`/api/profile/delete/${row._id}`).then(res => {
        this.$message('删除成功')
        this.getProfile()
      })
    },
    onAddMoney() {
      this.dialog = {
        show: true,
        option: 'add'
      }
      this.form = {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      }
    },
    handleCurrentChange(page) {
      // 當前頁
      let sortnum = this.paginations.page_size * (page - 1)
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum
      })
      // 設置默認分頁數據
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換 size
      this.paginations.page_index = 1
      this.paginations.page_size = page_size
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size
      })
    },
    setPaginations() {
      // 總頁數
      this.paginations.total = this.allTableData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 5
      // 設置默認分頁數據
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
    onScreenOutMoney() {
      if (!this.sedate[0] || !this.sedate[0]) {
        this.$message({
          type: 'warning',
          message: '請選擇時間區間'
        })
        this.getProfile()
        return
      }
      const stime = this.sedate[0].getTime()
      const etime = this.sedate[1].getTime()
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date)
        let time = date.getTime()
        return time >= stime && time <= etime
      })
      // 分頁數據
      this.setPaginations()
    }
  }
}
</script>
<style scoped>
.fillcontain {
  width: 95%;
  height: 100%;
  padding: 20px;
  margin: 20px;
  box-sizing: border-box;
}
.box-card {
  margin-top: 10px;
}
.pagination {
  text-align: right;
  margin: 20px;
}
.form{
  margin-top: 20px;
}
</style>
