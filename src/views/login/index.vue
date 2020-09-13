<template>
  <div class="login-container">
    <van-nav-bar class="nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field v-model="user.mobile" :rules="userFormRules.mobile" maxlength="11" name="mobile" placeholder="请输入手机号">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code" :rules="userFormRules.code" maxlength="6" type="password" name="code" placeholder="请输入验证码">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false" />
          <van-button v-else native-type="button" class="send-btn" size="mini" round type="default" @click="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button class="login-btn" block type="info" native-type="submit"> 登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndexs',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号码不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号码格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // console.log('submit', value)
      // const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('手机号或者验证码错误 ！', err)
          this.$toast.fail('手机号码或者验证码错误')
        } else {
          this.$toast.fail('登录失败, 请稍后重试')
        }
      }
    },

    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isCountDownShow = true

      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了， 请稍后再重试')
        } else {
          this.$toast('发送失败， 请稍后再重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size:37px;
  }
}
.send-btn {
  background-color: #ededed;
  width: 152px;
  height: 46px;
  line-height: 46px;
  font-size: 22px;
  color: #666;
}
.login-btn-warp {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}

</style>
