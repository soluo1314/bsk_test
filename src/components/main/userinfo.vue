<template>
  <div id="Form">
     <mt-navbar v-model="selected">
      <mt-tab-item id="1">登录</mt-tab-item>
      <mt-tab-item id="2">注册</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div v-if="loginNum==0">
          <mt-field label="用户名:" placeholder="请输入账号" v-model="username"></mt-field>
          <mt-field label="密码:" placeholder="请输入密码" type="password" v-model="password"></mt-field>
          <mt-button type="primary"  size="large" @click.native.prevent='btn_login' :loading="logining">登陆</mt-button>
        </div>
        <!-- <div v-if="loginNum==1">
            <span>{{userInfo.name}}</span>
            <mt-button type="primary" @click.native.prevent='login_tc()' >退出登陆</mt-button>
        </div> -->
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-field :state="userState" label="用户名:" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field :state="pwdState" label="密码:" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field :state="emailState" label="邮箱:" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
        <mt-button type="primary"  size="normal" v-fileUpload="setInputFile" v-model="img">点击上传头像:</mt-button>
        <img id="touxiang" :src="url" alt="">
        <mt-field :state="relState" label="真实姓名:" placeholder="请填写真实姓名" type="txt" v-model="relName"></mt-field>
        <mt-button type="primary"  size="large" @click.native.prevent='btn_reg'>注册</mt-button>
        <mt-button type="primary" class="resetBtn"  size="large" @click.native.prevent='reset'>重置</mt-button>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Store from 'storejs'
import { Indicator, MessageBox } from 'mint-ui'
export default {
  name: 'HelloWorld',
  data () {
    return {
      userState: '',
      pwdState: '',
      emailState: '',
      relState: '',
      setInputFile: {
        'fn': 'fileUpload',
        'multiple': false // 设置是否多张上传
      },
      selected: '1',
      loginNum: 0,
      username: '',
      url: '',
      password: '',
      email: '',
      relName: '',
      img: '',
      userInfo: {},
      // checked: true,
      logining: false
    }
  },
  watch: {
    username (newVal, oldVa) {
      var reUser = /^[a-zA-z]\w{6,15}$/
      // console.log(newVal, oldVa)
      if (reUser.test(newVal)) {
        this.userState = 'success'
      } else {
        this.userState = 'error'
      }
      if (newVal == '') {
        this.userState = ''
      }
    },
    password (newVal, oldVa) {
      var rePwd = /\w{5,17}$/
      if (rePwd.test(newVal)) {
        this.pwdState = 'success'
      } else {
        this.pwdState = 'error'
      }
      if (newVal == '') {
        this.pwdState = ''
      }
    },
    email (newVal, oldVa) {
      var reEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (reEmail.test(newVal)) {
        this.emailState = 'success'
      } else {
        this.emailState = 'error'
      }
      if (newVal == '') {
        this.emailState = ''
      }
    },
    relName (newVal, oldVa) {
      var reRN = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      if (reRN.test(newVal)) {
        this.relState = 'success'
      } else {
        this.relState = 'error'
      }
      if (newVal == '') {
        this.relState = ''
      }
    }
  },
  mounted () {
    this.pageInit()
  },
  methods: {
    pageInit () {
      if (!Store.get('userInfo')) {
        this.loginNum = 0
      } else {
        this.$router.push({
          path: '/user_info'
        })
      }
    },
    fileUpload (url) {
      this.img = this.url = url
    },
    // 登录
    btn_login () {
      var data = {
        username: this.username,
        password: this.password
      }
      this.$apis.mokeLogin(data).then(res => {
        // console.log(res.data);
        if (res.data.code == 1) {
          //  MessageBox.alert('提示','res.data.msg','info').then(action => {
          this.loginNum = 1
          this.userInfo = res.data.data
          this.$store.state.userinfo = this.userInfo
          Store.set('userInfo', this.userInfo)
          // Store.push('userInfo',this.userInfo);
          this.$router.push({
            path: '/user_info'
          })
          // });
        } else if (res.data.code == -1) {
          // MessageBox.alert('res.data.msg').then(action => {
          alert(res.data.msg)
          // })
        } else {
          this.selected = '2'
          alert(res.data.msg + ',请先注册!')
        }
      })
    },
    // 注册按钮
    btn_reg () {
      if (this.userState === '' || this.pwdState === '' || this.emailState === '' || this.relState === '') {
        alert('请输入完整的信息')
        return
      }
      var data = {
        id: 1,
        username: this.username,
        password: this.password,
        avatar: this.img,
        name: this.relName
      }
      this.$apis.mokeRes(data).then(res => {
        // console.log(res)
        if (res.data.code == 1) {
          // alert(res.data.msg + '即将跳转至登陆页面')
           MessageBox({
          message: '即将跳转至登陆页面',
          showCancelButton: true
        })
          .then(action => {
            if (action === 'confirm') {
              this.downadopt = !this.downadopt
              this.selected = '1'
              this.loginNum = 0
            }
          })
          // Store.set('userInfo',this.userInfo);
        } else if (res.data.code == 2) {
          alert(res.data.msg)
        } else {
          alert(res.data.msg)
        }
      })
    },
    // 注册页面输入框清除按钮
    reset () {
      this.relName = ''
      this.img = ''
      this.username = ''
      this.email = ''
      this.password = ''
    }

  }
}
</script>

<style lang="scss" scoped>
#Form /deep/ .mint-tab-container{
  margin-top:r(50);
}
.mint-tab-item /deep/ div {
  font-size: r(14*2);
}
.mint-tab-container-item /deep/ .mint-button--large {
  width: 70%;
  margin: r(5*2) auto;
}
.mint-navbar /deep/ .is-selected {
  font-weight: 600!important;
}
.mint-tab-container-item /deep/ div {
  width: 100%;
}
.mint-tab-container-item /deep/ .mint-button--normal{
  margin-left: r(40*2);
  margin-right: r(80*2);
  margin-top: r(10*2);
  background: #fff;
  color:#333;
  font-size: r(16*2);
}
.mint-tab-container /deep/ .mint-cell-wrapper{
  background:none;
}
.mint-tab-container-item /deep/ .mint-cell {
  width: 100%;
}
.mint-field /deep/ .mint-cell-title{
  text-align: center;
  width: 50%;
}
.mint-field /deep/ .mint-cell-value {
  text-align: center;
  input {
  text-align: center;
  flex:none;
    width: 70%;
  }
}
.resetBtn {
  margin-top:r(50);
}
  #touxiang {
    width:r(60*2);
    height:r(60*2);
    display:block;
    border-radius: 50%;
  }
</style>
