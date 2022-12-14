<template>
  <div class="login-container">
    <el-form
      ref="loginFromRef"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          :type="passwordType"
        />
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        size="large"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
      >
        {{ $t('msg.login.loginBtn') }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { validatePassword } from './rules';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import LangSelect from '@/components/LangSelect/index.vue';

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456',
});
// 验证规则
const i18n = useI18n();
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule'),
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword(),
    },
  ],
});

// 处理密码框文本显示状态
const passwordType = ref('password');
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text';
  } else {
    passwordType.value = 'password';
  }
};

// 登录动作处理
const loading = ref(false);
const loginFromRef = ref(null);
const store = useStore();
const router = useRouter();
const handleLogin = () => {
  loginFromRef.value.validate((valid, message) => {
    if (!valid) {
      ElMessage.error(Object.values(message)[0][0].message);
      return;
    }

    loading.value = true;
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false;
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        loading.value = false;
      });
  });
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      .el-input__wrapper {
        width: 100%;
        padding: 0;
        box-shadow: 0 0 0;
        background-color: transparent;
      }

      .el-input__wrapper.is-focus {
        box-shadow: 0 0;
      }

      .el-input__wrapper:hover {
        border: 0;
        box-shadow: 0 0;
      }

      input:hover {
        border: 0;
        box-shadow: 0 0;
      }

      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    :deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
