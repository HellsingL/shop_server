<template>
  <div class="login-container">
    <!-- 登录框 -->
    <div class="login-box">
      <!-- 头部区域 -->
      <div class="avatar-box">
        <img src="../../assets/images/logo.png" alt="">
      </div>

      <!-- 验证表单 -->
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :offset="15">
              <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="resetForm">重置</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        userName: 'admin',
        password: '123456'
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        // 如果验证失败，直接return
        if (!valid) return
        // 验证通过
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) {
          // 如果登录失败，则移除 之前的 Token，并提示
          window.sessionStorage.removeItem('token')
          return this.$message.error('登录失败！')
        }
        this.$message.success('登录成功！')
        // 把登录成功的Token，记录到 sessionStorage 中
        // 跳转到后台主页
        window.sessionStorage.setItem('token', res.data.token)
        // 使用编程式导航，跳转到后台主页
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  overflow: hidden;
}
.login-box {
  width: 450px;
  height: 304px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar-box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  background-color: #fff;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.el-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
