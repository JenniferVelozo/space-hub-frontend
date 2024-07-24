<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEyeOutline } from '@mdi/js';

definePageMeta({
  auth: false,
});

export default {
  components: {
		SvgIcon
	},
  data(){
    return{
      path: mdiEyeOutline,
      userData: {
        name: '',
        role: '',
        email: '',
      },
    }
  },
  created() {
    if (useAuthStore().isAuth) {
      console.log("Valor de auth: ", useAuthStore().isAuth)
      this.userData.name = useAuthStore().getUser.user.name
      this.userData.email = useAuthStore().getUser.user.email
      this.userData.role = useAuthStore().getUser.user.role
    }
  },
  async mounted(){
    useHeaderStore().setTitle('PERFIL');
  },
  methods: {
    
  },
}

</script>

<template>
	<div class="container-login" style="margin-top: 0px;">
    <h1 class="h1 header">DATOS DE USUARIO</h1>
		<h2  class="h2 titulo">{{ userData.name }}</h2>
    <div v-if="useAuthStore().isAuth" class="card-perfil">
      <div class="card-perfil-item">
        <span class="card-perfil-item-title">Nombre de usuario:</span>
        <span class="card-perfil-item-value">{{ userData.name }}</span>
      </div>

      <div class="card-perfil-item">
        <span class="card-perfil-item-title">Email:</span>
        <span class="card-perfil-item-value">{{ userData.email }}</span>
      </div>
      <div class="card-perfil-item">
        <span class="card-perfil-item-title">Rol:</span>
        <span class="card-perfil-item-value">{{ userData.role }}</span>
      </div>

     
    </div>
    
    <div v-else class="card-perfil">
      No hay datos ingresados. No debería estar viendo esto -> logout
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

.boton {
  margin-top: 2%; /* Ajusta el margen superior según necesites */
}

</style>