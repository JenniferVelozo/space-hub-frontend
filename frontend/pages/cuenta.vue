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
        //rut: '',
        email: '',
        //iDCC: 0,
      },
    }
  },

  async mounted(){
   
  },
  methods: {
    
  },
}

</script>

<template>
	<div class="container-login" style="margin-top: 0px;">
    <h1 class="h1 header">DATOS DE USUARIO</h1>
		
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