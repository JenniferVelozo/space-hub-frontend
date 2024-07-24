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
      selectedAreaType: 'Todos los tipos de área',
      selectedUseType: 'Todos los tipos de uso',
      data: [
        {
          idSpace: "11111111",
          name: "Sala de reuniones 1",
          description: "Espacio para llevar a cabo reuniones",
          areaType: "Área de trabajo",
          state: "Disponible",
          useType: "Grupal"
        },
        {
          idSpace: "11111111",
          name: "Sala de reuniones 2",
          description: "Espacio para llevar a cabo reuniones",
          areaType: "Área de trabajo",
          state: "En uso",
          useType: "Grupal"
        },
        {
          idSpace: "11111111",
          name: "Sala de reuniones 3",
          description: "Espacio para llevar a cabo reuniones",
          areaType: "Área de trabajo",
          state: "En uso",
          useType: "Grupal"
        },
        {
          idSpace: "11111111",
          name: "Sala de reuniones 4",
          description: "Espacio para llevar a cabo reuniones",
          areaType: "Área de trabajo",
          state: "En uso",
          useType: "Grupal"
        },
      ],
    };
  },
  computed: {
    filteredData() {
      return this.data.filter(item => {
        return (this.selectedAreaType === 'Todos los tipos de área' || item.areaType === this.selectedAreaType) &&
               (this.selectedUseType === 'Todos los tipos de uso' || item.useType === this.selectedUseType);
      });
    }
  },
  async mounted() {
    await this.getSpaces();
  },
  methods: {
    async getSpaces() {
      const { $spaceService } = useNuxtApp();
      let response;
      response = await $spaceService.getSpaces("Disponible")
      console.log("Los disponibles son: ", response)
      this.data = response;
      console.log("Espacios desde el back: ", this.data)
    }
  },
}
</script>

<template>
  <div class="container-login" style="margin-top: 0px;">
    <h1 class="h1 header">ESPACIOS DISPONIBLES</h1>
    <div class="filters">
      <select v-model="selectedAreaType">
        <option value="Todos los tipos de área">Todos los tipos de área</option>
        <option value="Área de trabajo">Área de trabajo</option>
        <option value="Área de primera necesidad">Área de primera necesidad</option>
        <option value="Área de recreación">Área de recreación</option>
      </select>
      <select v-model="selectedUseType">
        <option value="Todos los tipos de uso">Todos los tipos de uso</option>
        <option value="Grupal">Grupal</option>
        <option value="Individual">Individual</option>
      </select>
    </div>

    <div class="card-container">
      <CardSpace
        v-for="(item, index) in filteredData"
        :key="index"
        :idSpace="item.idSpace"
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

.filters {
  margin: 10px 0;
  display: flex;
  gap: 10px;
}

select {
  padding: 5px;
}

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
