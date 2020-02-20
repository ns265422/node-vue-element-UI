<template>
  <div class="dialogfound">
    <el-dialog
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false">
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;">
          <el-form-item prop='type' label="收支類型:">
            <el-select v-model="form.type" placeholder="收支類型">
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop='describe' label="收支描述:">
            <el-input type="describe" v-model="form.describe"></el-input>
          </el-form-item>

          <el-form-item prop='income' label="收入:">
            <el-input type="income" v-model="form.income"></el-input>
          </el-form-item>

          <el-form-item prop='expend' label="支出:">
            <el-input type="expend" v-model="form.expend"></el-input>
          </el-form-item>

          <el-form-item prop='cash' label="帳戶現金:">
            <el-input type="cash" v-model="form.cash"></el-input>
          </el-form-item>

          <el-form-item prop='textarea' label="備註:">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">送 出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogfound",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      format_type_list: [
        "生活用品",
        "食物",
        "飲料",
        "娛樂費",
        "交通費",
        "薪資"
      ],
      form_rules: {
        describe: [{ required: true, message: "該欄不能為空！", trigger: "blur" }],
        income: [{ required: true, message: "該欄不能為空！", trigger: "blur" }],
        expend: [{ required: true, message: "該欄不能為空！", trigger: "blur" }],
        cash: [{ required: true, message: "該欄不能為空！", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表單數據驗證完成之後，傳送API
          const url = this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$axios.post(`/api/profile/${url}`, this.form)
          .then(res => {
            this.$message({ message: "保存成功！", type: "success" });
            this.dialog.show = false;
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.dialogfound {
  width: 50%;
  height: 100%;
}
</style>


