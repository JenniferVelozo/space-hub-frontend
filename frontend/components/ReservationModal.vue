<template>
    <div class="action-modal" v-if="showModal" @click="closeModal">
      <div class="action-modal-content" @click.stop>
        <div class="div-content">
          <span class="close-icon" @click="closeModal">x</span>
          <div class="contenedor-modal">
            <span class="modal-text" style="display: block; text-align: center;">Hacer una reserva</span>
            <span>Seleccione día y fecha de inicio</span>
            <div class="input-container" style="display: flex; justify-content: center; margin: 20px 0;">
              <input type="datetime-local" v-model="startDateTime" @change="updateEndDateTime" />
            </div>
  
            <span>Seleccione día y fecha de salida</span>
            <div class="input-container" style="display: flex; justify-content: center; margin: 20px 0;">
              <input type="datetime-local" v-model="endDateTime" />
            </div>
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            <div class="action-modal-buttons">
              <button @click="reservarEspacio">Reservar espacio</button>
              <button @click="closeModal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ReservationModal",
    props: {
      showModal: {
        type: Boolean,
        default: false
      },
      idSpace: String,
    },
    data() {
      return {
        startDateTime: null,
        endDateTime: null,
        errorMessage: '',
      };
    },
    methods: {
      closeModal() {
        this.$emit("closeReservationModal");
      },
      updateEndDateTime() {
        if (this.startDateTime) {
          const startDate = new Date(this.startDateTime);
          if (this.isValidTime(startDate)) {
            console.log("La fecha de entrada es: ", startDate.getTime());
            const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 horas después
            this.endDateTime = this.formatDateTimeLocal(endDate);
          } else {
            this.errorMessage = 'La hora de inicio debe estar entre las 8 am y las 8 pm.';
            this.startDateTime = null;
            this.endDateTime = null;
          }
        }
      },
      isValidTime(date) {
        const hours = date.getHours();
        return hours >= 8 && hours < 20; // Entre 8 am y 8 pm
      },
      formatDateTimeLocal(date) {
        const pad = (num) => num.toString().padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      },
      reservarEspacio() {
        if (!this.startDateTime || !this.endDateTime) {
          this.errorMessage = 'Por favor seleccione las fechas y horas de entrada y salida.';
          return;
        }
  
        const start = new Date(this.startDateTime);
        const end = new Date(this.endDateTime);
  
        if (!this.isValidTime(start) || !this.isValidTime(end)) {
          this.errorMessage = 'Las horas de reserva deben estar entre las 8 am y las 8 pm.';
          return;
        }
  
        const diffHours = (end - start) / (1000 * 60 * 60);
        console.log("La diferencia de horas es: ", diffHours);
        if (diffHours > 4) {
          this.errorMessage = 'No puede reservar un espacio por más de 4 horas.';
          return;
        }
  
        this.errorMessage = '';
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Se ha hecho la reserva correctamente',
          life: 5000,
        });
        this.closeModal();
      },
    }
  };
  </script>
  
  <style scoped>
  .input-container {
    margin-bottom: 20px;
  }
  
  .error-message {
    color: red;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .action-modal-buttons button {
    margin: 5px;
  }
  </style>
  