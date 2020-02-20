<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">EASON 簡易記帳系统</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        class="loginForm"
        label-width="60px">
        <el-form-item label="郵箱" prop="email">
          <el-input  v-model="loginUser.email" placeholder="請輸入郵箱"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input v-model="loginUser.password" placeholder="請輸入密碼" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn" >登 入</el-button>
          <el-button type="primary" @click="register" class="submit_btn" >註 冊</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
  name: 'login',
  data() {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            type: 'email',
            required: true,
            message: '郵箱格式不正確',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '密碼不能為空', trigger: 'blur' },
          { min: 6, max: 30, message: '長度在 6 到 30 個字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/api/users/login', this.loginUser).then(res => {
            const { token } = res.data
            localStorage.setItem('eleToken', token)
            const decode = jwt_decode(token)
            this.$store.dispatch('setIsAutnenticated', !this.isEmpty(decode))
            this.$store.dispatch('setUser', decode)
            this.$router.push('/index')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    register() {
      this.$router.push('/register')
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 40%;
}
</style>
