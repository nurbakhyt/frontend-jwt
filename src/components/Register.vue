<template>
  <md-layout md-align="center">
    <md-layout md-flex-small="100" md-flex="50">
      <form @submit.stop.prevent="submit" md-align="center">
        <md-input-container>
          <label>Имя</label>
          <md-input v-model="profile.name" type="string" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Email</label>
          <md-input v-model="profile.email" type="string" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Тел. номер</label>
          <md-input v-model="profile.phone" type="string"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <label>Пароль</label>
          <md-input v-model="profile.password" type="password" required></md-input>
        </md-input-container>
        <p v-if="message">{{ message }}</p>
        <p class="error-message" v-if="error">{{ error }}</p>
        <md-layout>
          <md-button type="submit" class="md-raised md-primary login-btn">Регистрация</md-button>
        </md-layout>
      </form>
    </md-layout>
  </md-layout>
  
</template>

<script>
export default {
  name: 'Register',

  data () {
    return {
      profile: {
        name: '',
        email: '',
        phone: '',
        password: ''
      },
      isLoading: false,
      message: '',
      error: ''
    }
  },

  methods: {
    submit () {
      if (this.profile.name && this.profile.email && this.profile.password) {
        this.isLoading = true
        this.error = ''
        this.message = ''
        const { name, email, phone, password } = this.profile
        this.$http.post('api/profile', {
          name,
          email,
          phone,
          password
        })
          .then(response => {
            console.log('registered', response.body)
            this.isLoading = false
            this.message = 'Вы успешно зарегистрированы! Теперь можете войти'
          })
          .catch(error => {
            this.isLoading = false
            this.error = error.body
          })
      } else {
        console.log('Введите логин и пароль')
      }

    }
  }
}
</script>