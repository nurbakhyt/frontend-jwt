<template>
  <md-toolbar class="navbar">
    <md-layout md-flex-small="90" md-flex="80" md-flex-xlarge="60">
      <router-link to="/" class="navbar__item">
        <h3 class="md-title">Главная</h3>
      </router-link>
      <router-link to="/login" class="navbar__item" v-if="!isAuth">
        <h2 class="md-title">Логин</h2>
      </router-link>
      <router-link to="/register" class="navbar__item" v-if="!isAuth">
        <h2 class="md-title">Регистрация</h2>
      </router-link>
      <router-link to="/profile" class="navbar__item" v-if="isAuth">
        <h2 class="md-title">Профиль</h2>
      </router-link>
      <a @click.prevent="logout" href="/logout" class="navbar__item" v-if="isAuth">
        <h2 class="md-title">Выход</h2>
      </a>
    </md-layout>
  </md-toolbar>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        isAuth: false
      }
    },
    mounted () {
      this.isAuth = this.$auth.isAuthenticated()
    },
    watch: {
      '$route': function () {
        this.isAuth = this.$auth.isAuthenticated()
      }
    },
    methods: {
      logout () {
        this.$auth.destroyToken()
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss">
.navbar {
  margin-bottom: 32px;
}
.navbar__item {
  color: #def !important;
  padding-right: 24px;
  padding-left: 24px;
}
.navbar__item:hover {
  color: white !important;
  text-decoration: none !important;
}

</style>