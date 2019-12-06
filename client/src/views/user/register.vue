<template>
    <div class="register-container">
        <el-form
            ref="registerForm"
            label-width="150px"
            class="register-form"
            :model="registerForm"
            :rules="registerRules"
        >
            <div class="register-error">{{this.error}}</div>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码" type="password">
                <el-input v-model="registerForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="comparePassword" label="确认密码">
                <el-input v-model="registerForm.comparePassword"></el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%" native-type="submit" @click="register" :loading="loading">注册</el-button>
            <div class="register-info">如果已经注册请<router-link :to="{name:'login'}">点击登录</router-link></div>
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
      registerForm: {
        email: '',
        password: '',
        comparePassword: ''
      },
      registerRules: {
        email: { type: 'email', required: true, message: '请输入有效邮箱', trigger: 'blur' },
        password: { type: 'string', required: true, message: '密码不能为空', trigger: 'blur' },
        comparePassword: {
          type: 'string',
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.registerForm.password) {
              callback(new Error('两次输入的密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    register () {
      this.$refs['registerForm'].validate(async (valid) => {
        // console.log(valid)
        this.loading = true
        this.error = ''
        if (valid) {
          try {
            const response = await UserService.register(
              {
                email: this.registerForm.email,
                password: this.registerForm.password
              }
            )
            if (response.data.code !== 200) {
              this.error = response.data.error
            } else {
              // console.log(response.data)
              this.$store.dispatch('setToken', response.data.token)
              this.$store.dispatch('setUser', response.data.user)
              this.$router.push('/')
            }
            this.loading = false
          } catch (error) {
            if (error.response.data.error) {
              this.error = error.response.data.error
            } else {
              this.error = '注册失败,请稍后重试'
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
  .register-container{
    position: absolute;
    top:0;
    bottom: 0;
    width: 100%;
    background-color: #2d3a4b;
    .register-form{
      position: relative;
      margin: 120px auto 0 ;
      width: 400px;
      background-color: #fff;
      padding: 30px;
      .register-info{
        text-align:right;
        font-size:.9rem;
        margin-top: 20px;
      }
      .register-error{
        color: #F56C6C;
        height: 20px;
        margin-bottom: 10px;
      }
    }
  }
</style>
