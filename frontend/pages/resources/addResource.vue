<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEyeOutline, mdiPlusBox } from '@mdi/js';

definePageMeta({
  auth: true,
});

export default {
  components: {
    SvgIcon
  },
  data() {
    return {
      mes: '',
      path: mdiEyeOutline,
      path2: mdiPlusBox,
      form: {
        name: '',
        description: '',
        precio: '',
        state:'Disponible'
      },
      passwordVisible: false,
      errorForm: {
        errorName: false,
        errorDescription: false,
        errorPrecio: false,
      },
      showError: false,
      errorMessage: '',
      errorTimeout: null,
    }
  },
  methods: {
    agregarRecurso() {
      this.checkForm();
    },
    async checkForm() {
      this.restartCheck(); // Reinicia los errores antes de verificar
      let errorFound = false;

      if (this.form.name === '' || this.form.description === '' || this.form.precio === '') {
        this.errorMessage = 'Error de formulario, revise los datos ingresados.';
        this.showError = true;
        this.hideErrorAfterDelay();
        errorFound = true;
      }
      if (!errorFound) {
        // Si no hay errores, entonces se crea el recurso
        try {
          const { $resourceService } = useNuxtApp()
          console.log("alooo")
          const response = await $resourceService.createResource(this.form.name, this.form.description, this.form.precio);
          console.log("Valor de respon:", response)
          this.$toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Recurso publicado',
            life: 5000,
          })
          useAdminStore().setCreateSuccessFlag(true);
          //this.$router.push('/login');
        } catch (error) {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al publicar recurso. Intente nuevamente.',
            life: 5000,
          })

        } 
      } else {
        console.error("Faltan datos")
      }
    },
    restartCheck() {
      this.showError = false;
      this.errorForm.errorName= false;
      this.errorForm.errorDescription = false;
      this.errorForm.errorPrecio = false;
      clearTimeout(this.errorTimeout); // Limpia el timeout si está activo
    },

    hideErrorAfterDelay() {
      this.errorTimeout = setTimeout(() => {
        this.showError = false;
      }, 3000);
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
    <h1 class="h1 header">PUBLICAR RECURSO</h1>
    <svg-icon type="mdi" :path="path2" width="100" height="100"></svg-icon>
    <div class="container-input-login">
      <span class="accent-text-login">Ingrese nombre</span>
      <input id="username" v-model="form.name" aria-describedby="username-help" class="input-login" @keyup.enter="agregarRecurso" />

      <span class="accent-text-login">Ingrese descripción</span>
      <input id="username" v-model="form.description" aria-describedby="username-help" class="input-login" @keyup.enter="agregarRecurso" />

      <span class="accent-text-login">Ingrese precio</span>
      <input type="number" id="username" v-model="form.precio" aria-describedby="username-help" class="input-login" @keyup.enter="agregarRecurso" />

      <div v-if="showError" class="warning-block">
        {{ errorMessage }}
      </div>

      <button label="Iniciar sesión" class="text-white boton-xlarge pt-0 pb-0 align-center justify-center" style="width: 100%;  border-radius: 15px" @click="agregarRecurso">
        Publicar
      </button>

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
