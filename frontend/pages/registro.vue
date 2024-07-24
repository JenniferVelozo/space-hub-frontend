<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEyeOutline, mdiAccountPlus } from '@mdi/js';

definePageMeta({
  auth: false,
});

export default {
  components: {
    SvgIcon
  },
  data() {
    return {
      mes: '',
      path: mdiEyeOutline,
      path2: mdiAccountPlus,
      form: {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      passwordVisible: false,
      errorForm: {
        errorName: false,
        errorEmail: false,
        errorPassword: false,
      },
      showError: false,
      errorMessage: '',
      errorTimeout: null,
    }
  },
  methods: {
    agregarUsuario() {
      this.checkForm();
    },
    async checkForm() {
      this.restartCheck(); // Reinicia los errores antes de verificar
      let errorFound = false;

      if (this.form.name === '' || this.form.email === '' || this.form.password === '' || this.form.confirm_password === '') {
        this.errorMessage = 'Error de formulario, revise los datos ingresados.';
        this.showError = true;
        this.hideErrorAfterDelay();
        errorFound = true;
      }
      if (this.form.password !== this.form.confirm_password) {
        this.errorForm.errorPassword = true;
        this.errorMessage = 'Las contraseñas no coinciden.';
        this.showError = true;
        this.hideErrorAfterDelay();
        errorFound = true;
      }
      try {
        if (this.errorForm.errorEmail === false) {
          if (await this.checkEmailRepeated() === true) {
            this.errorMessage = 'El correo ya está registrado.';
            this.showError = true;
            this.hideErrorAfterDelay();
            errorFound = true;
          }
        }
      } catch {
        console.error("Error al verificar email repetido:", error);
      }
      if (!errorFound) {
        // Si no hay errores, entonces se crea el usuario
        try {
          const { $userService } = useNuxtApp()
          const response = await $userService.createUser(this.form.name, this.form.email, this.form.password, "Usuario");
          this.$toast.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Usuario '+this.form.email+' agregado correctamente.',
            life: 5000,
          })
          useAdminStore().setCreateSuccessFlag(true);
          this.$router.push('/login');
        } catch (error) {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al agregar usuario '+this.form.email+'. Intente nuevamente.',
            life: 5000,
          })

        } 
      } else {
        console.error("Faltan datos")
      }
    },
    restartCheck() {
      this.showError = false;
      this.errorForm.errorName = false;
      this.errorForm.errorPassword = false;
      clearTimeout(this.errorTimeout); // Limpia el timeout si está activo
    },
    async checkEmailRepeated() {
      const { $userService } = useNuxtApp()
      const response = await $userService.checkEmailRepeated(this.form.email);
      console.log("La respuesta es: ", response)
      return response;
    },
    hideErrorAfterDelay() {
      this.errorTimeout = setTimeout(() => {
        this.showError = false;
      }, 3000);
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
  async created() {
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
    <h2 class="h2 titulo">REGISTRO DE USUARIO</h2>
    <svg-icon type="mdi" :path="path2" width="100" height="100"></svg-icon>
    <div class="container-input-login">
      <span class="accent-text-login">Ingrese su nombre</span>
      <input id="username" v-model="form.name" aria-describedby="username-help" class="input-login" @keyup.enter="login" />

      <span class="accent-text-login">Ingrese su correo electrónico</span>
      <input id="username" v-model="form.email" aria-describedby="username-help" class="input-login" @keyup.enter="login" />

      <span class="accent-text-login">Ingrese una contraseña</span>
      <div class="password-wrapper">
        <input id="password" v-model="form.password" :type="passwordVisible ? 'text' : 'password'" class="input-login password-input" @keyup.enter="login" />
        <svg-icon class="toggle-password" style="width:26px;height:26px;color:#394049; cursor: pointer;" type="mdi" :path="path" @click="togglePasswordVisibility">{{ passwordVisible ? 'Ocultar' : 'Mostrar' }}</svg-icon>
      </div>

      <span class="accent-text-login">Repita su contraseña</span>
      <div class="password-wrapper">
        <input id="password" v-model="form.confirm_password" :type="passwordVisible ? 'text' : 'password'" class="input-login password-input" @keyup.enter="login" />
        <svg-icon class="toggle-password" style="width:26px;height:26px;color:#394049; cursor: pointer;" type="mdi" :path="path" @click="togglePasswordVisibility">{{ passwordVisible ? 'Ocultar' : 'Mostrar' }}</svg-icon>
      </div>

      <div v-if="showError" class="warning-block">
        {{ errorMessage }}
      </div>

      <button label="Iniciar sesión" class="text-white boton-xlarge pt-0 pb-0 align-center justify-center" style="width: 100%;  border-radius: 15px" @click="agregarUsuario">
        Registrarse
      </button>

      <div style="margin-top: 5%; text-align: center; width: 100%;"> 
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a> 
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

.warning-block {
  color: red;
  margin-top: 10px;
}

</style>
