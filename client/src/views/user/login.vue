<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            label-width="150px"
            class="login-form"
            :model="loginForm"
            :rules="loginRules"
        >
            <div class="login-error">{{this.error}}</div>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="loginForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码" type="password">
                <el-input v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%" native-type="submit" @click="login" :loading="loading">登录</el-button>
            <div class="login-info">如果没有注册请<router-link :to="{name:'register'}">点击注册</router-link></div>
        </el-form>
    </div>
</template>

<script>
import UserService from '../../services/UserService'
export default {
  data () {
    return {
      loading: false,
      error: '',
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: { type: 'email', required: true, message: '请输入有效邮箱', trigger: 'blur' },
        password: { type: 'string', required: true, message: '密码不能为空', trigger: 'blur' }
      }
    }
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate(async (valid) => {
        // console.log(valid)
        this.loading = true
        this.error = ''
        if (valid) {
          try {
            const response = await UserService.login(
              {
                email: this.loginForm.email,
                password: this.loginForm.password
              }
            )
            if (response.data.code !== 200) {
              this.error = response.data.error
            } else {
              this.$store.dispatch('setToken', response.data.token)
              this.$store.dispatch('setUser', response.data.user)
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push('/')
              }
            }
            this.loading = false
          } catch (error) {
            if (error.response.data.error) {
              this.error = error.response.data.error
            } else {
              this.error = '登录失败,请稍后重试'
            }
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container{
    position: absolute;
    top:0;
    bottom: 0;
    width: 100%;
    background-color: #2d3a4b;
    .login-form{
      position: relative;
      margin: 120px auto 0 ;
      width: 400px;
      background-color: #fff;
      padding: 30px;
      .login-info{
        text-align:right;
        font-size:.9rem;
        margin-top: 20px;
      }
      .login-error{
        color: #F56C6C;
        height: 20px;
        margin-bottom: 10px;
      }
    }
  }
</style>
