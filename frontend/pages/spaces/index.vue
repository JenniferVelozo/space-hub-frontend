<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEyeOutline } from '@mdi/js';
import CardReservation from '../../components/CardReservation.vue';

definePageMeta({
  auth: true,
});

export default {
  components: {
    SvgIcon,
    CardReservation,
  },
  data() {
    return {
      path: mdiEyeOutline,
      data: [
        {
          name: "Sala de reuniones 1",
          description: "Espacio para llevar a cabo reuniones",
          areaType: "Área de trabajo",
          state: "Disponible",
          useType: "Grupal"
        },
        {
          name: "Sala de reuniones 2",
          description: "Espacio para llevar a cabo reuniones",
          areaType: "Área de trabajo",
          state: "En uso",
          useType: "Grupal"
        },
        {
          name: "Sala de reuniones 3",
          description: "Espacio para llevar a cabo reuniones",
          areaType: "Área de trabajo",
          state: "En uso",
          useType: "Grupal"
        },
        {
          name: "Sala de reuniones 4",
          description: "Espacio para llevar a cabo reuniones",
          areaType: "Área de trabajo",
          state: "En uso",
          useType: "Grupal"
        },
      ],
    };
  },

  async mounted() {
    await this.getResources();
  },
  methods: {
    async getResources() {
      const { $resourceService } = useNuxtApp();
      let response;
      // Aquí iría la lógica para obtener los recursos desde el servicio
    }
  },
}
</script>

<template>
  <div class="container-login" style="margin-top: 0px;">
    <h1 class="h1 header">ESPACIOS DISPONIBLES</h1>
    <div class="card-container">
      <CardSpace
        v-for="(item, index) in data"
        :key="index"
        :name="item.name"
        :description="item.description"
        :areaType="item.areaType"
        :state="item.state"
        :useType="item.useType"
      />
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

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
