<template>
  <div class="card card-accent">
    <div class="card-header">
      <span>{{ name }}</span>
    </div>
    <div class="card-body">
      <span>Tipo de área: {{ areaType }}</span>
      <br>
      <span>Descripción: {{ description }}</span>
      <br>
      <span>Tipo de uso: {{ useType }}</span>
      <br>
    </div>

    <div class="action-modal-buttons">
      <button v-if="flag === false" class="button" @click="openReservationModal"> Reservar</button>
      <button v-if="flag === true"> Anular </button>
    </div>    
      
    
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
  <ReservationModal :showModal="showReservationModal" :idSpace="idSpace" @closeReservationModal="closeReservationModal"> </ReservationModal>
</template>

<script>
export default {
  props: {
    idSpace: String,
    name: String,
    description: String,
    areaType: String,
    state: String,
    useType: String,
    flag: Boolean,
  },
  data() {
    return {
      showReservationModal: false,
    }
  },
  methods:{
    openReservationModal() {
      this.showReservationModal = true;
    },
    closeReservationModal() {
      this.showReservationModal = false;
    },
  }
}
</script>

<style scoped>
/* Aquí puedes agregar estilos para tu tarjeta */
</style>
