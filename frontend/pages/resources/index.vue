<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEyeOutline } from '@mdi/js';
import CardSolicitud from '../../components/CardReservation.vue'

definePageMeta({
  auth: true,
});

export default {
  components: {
		SvgIcon
	},
  data(){
    return{
      path: mdiEyeOutline,
    }
  },

  async mounted(){
   await this.getResources();
  },
  methods: {
    async getResources(){
        const { $resourceService } = useNuxtApp()
        let response;

    }
  },
}

</script>

<template>
	<div class="container-login" style="margin-top: 0px;">
    <h1 class="h1 header">RECURSOS DISPONIBLES</h1>
		<CardReservation
        :nroSolicitud="'1234'"
        :idOrdenCompra="'78723'"
        :idFolio="'2389823'"
        :diasRestantes="'5'"
        :estado="'Pendiente de recepción conforme'"
      >
      </CardReservation>
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