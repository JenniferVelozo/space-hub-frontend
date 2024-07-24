<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEyeOutline, mdiAccountCircle } from '@mdi/js';

definePageMeta({
  auth: false,
});

export default {
  components: {
		SvgIcon
	},
  data(){
    return{
      mes: '',
      path: mdiEyeOutline,
      path2: mdiAccountCircle,
      
      form: {
        email: '',
        password: '',
      },
      passwordVisible: false,
    }
  },
  methods: {
    async login() {
      try {
        await useAuthStore().logIn({
          email: this.form.email,
          password: this.form.password,
        })
        this.$toast.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Inicio de sesión exitoso',
          life: 5000,
        })
        if (useAuthStore().getUser.user) {
          if (useAuthStore().getUser.user.role === 'Usuario') {
            this.$router.push({
              name: 'principal',
            })
          } else if (useAuthStore().getUser.user.role === 'Administrador') {
            this.$router.push({
              name: 'administracion',
            })
          } else {
            this.$router.push({
              name: 'perfil',
            })
          }
        } 
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Credenciales inválidas. Intente nuevamente.',
          life: 5000,
        })
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
  async created()  {
    if (useAuthFlagStore().getFlag == false) {
      setTimeout(async () => {
        await this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No autorizado, por favor inicie sesión.',
          life: 5000,
        })
        useAuthFlagStore().setFlag(true)
      }, 100); // 1000 milisegundos = 1 segundo
      
    }
    if (useAuthFlagStore().getFlagRole == false) {
      setTimeout(async () => {
        await this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No autorizado, sesión finalizada.',
          life: 5000,
        })
        useAuthFlagStore().setFlag(true)
      }, 100); // 1000 milisegundos = 1 segundo
      
    }
  },
}

</script>

<template>
	<div class="container-login">
    <h1 class="h1 header">SISTEMA DE RESERVAS</h1>
		<h2 class="h2 titulo">INICIO DE SESIÓN</h2>
    <svg-icon type="mdi" :path="path2" width="100" height="100"></svg-icon>
    <div class="container-input-login">
      <span class="accent-text-login">Correo electrónico</span>
      <input id="username" v-model="form.email" aria-describedby="username-help" class="input-login" @keyup.enter="login" />
      <span class="accent-text-login">Contraseña</span>
      <div class="password-wrapper">
        <input id="password" v-model="form.password" :type="passwordVisible ? 'text' : 'password'" class="input-login password-input" @keyup.enter="login" />
        <svg-icon class="toggle-password" style="width:26px;height:26px;color:#394049; cursor: pointer;" type="mdi" :path="path" @click="togglePasswordVisibility">{{ passwordVisible ? 'Ocultar' : 'Mostrar' }}</svg-icon>
      </div>
      
      <button label="Iniciar sesión" class="text-white boton-xlarge pt-0 pb-0 align-center justify-center" style="width: 100%; border-radius: 15px;" @click="login">
        Iniciar sesión
      </button>
      <div style="margin-top: 5%; text-align: center; width: 100%;"> 
        ¿No tienes una cuenta? <a href="/registro">Regístrate</a> 
      </div>
    </div>
	</div>
</template>

<style scoped lang="scss">
@import '../assets/style.scss';

.h1 {
  font-size: 3rem;
  margin: 10px;
}

.h2 {
  font-size: 2.25rem;
  color: $color-accento;
  margin: 10px;
}

</style>
