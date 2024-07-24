<template>
    <div class="action-modal" v-if="showModal" @click="closeModal">
      <div class="action-modal-content" @click.stop>
        <div class="div-content">
          <span class="close-icon" @click="closeModal">x</span>
          <div class="contenedor-modal">
            <h3 style="display: block; text-align: center;">HACER UNA RESERVA</h3>
            <span>Seleccione día y fecha de inicio</span>
            <div class="input-container" style="display: flex; justify-content: center; margin: 20px 0;">
              <input type="datetime-local" v-model="startDateTime" @change="updateEndDateTime" />
            </div>
  
            <span>Seleccione día y fecha de salida</span>
            <div class="input-container" style="display: flex; justify-content: center; margin: 20px 0;">
              <input type="datetime-local" v-model="endDateTime" />
            </div>
  
            <span v-if="useType === 'Grupal'">Ingreso de participantes</span>
            <p v-if="useType === 'Grupal'"> Puede agregar participantes a la reserva si así lo desea</p>
  
            <div v-if="useType === 'Grupal'">
              <input type="text" v-model="searchQuery" placeholder="Buscar por correo" />
              <div class="user-list-container">
                <ul>
                  <li v-for="user in filteredUsers" :key="user.idUSer">
                    {{ user.email }} - {{ user.name }}
                    <button @click="addParticipant(user)">Agregar</button>
                  </li>
                </ul>
              </div>
              <br>
              <p>Participantes seleccionados:</p>
              <ul>
                <li v-for="user in selectedParticipants" :key="user.idUSer">
                  {{ user.email }} - {{ user.name }}
                  <button @click="removeParticipant(user)">Quitar</button>
                </li>
              </ul>
            </div>
  
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            <div class="action-modal-buttons">
              <button @click="reservarEspacio">Reservar espacio</button>
              <button @click="closeModal">Cancelar</button>
              <a href="/spaces/myreservations">
                <button>Ver mis reservas</button>
              </a>
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
      useType: String
    },
    data() {
      return {

        /*
        Datos de prueba
        users: [
          { idUSer: "1", name: "Jennifer", email: "jennifer@test.cl" },
          { idUSer: "2", name: "Alexis", email: "alexis@test.cl" },
          { idUSer: "3", name: "Juan", email: "juan@test.cl" },
          { idUSer: "4", name: "María", email: "maria@test.cl" },
          { idUSer: "5", name: "Carlos", email: "carlos@test.cl" },
          { idUSer: "6", name: "Laura", email: "laura@test.cl" }
        ],*/
        startDateTime: null,
        endDateTime: null,
        errorMessage: '',
        searchQuery: '',
        selectedParticipants: []
      };
    },
    computed: {
      filteredUsers() {
        return this.users.filter(user =>
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
        async getUsers() {
            try{
                const { $userService } = useNuxtApp()
                let response;
                response = await $userService.getUsers();
                console.log("La response es: ", response)
                this.users = response
            }catch (error){
                this.$toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los usuarios. Intente nuevamente.',
                life: 5000,
                })
                console.error('Error al cargar los usuarios:', error);
            }
        },
        closeModal() {
        this.$emit("closeReservationModal");
        },
        updateEndDateTime() {
        if (this.startDateTime) {
            console.log("la fecha de inicio: ",this.startDateTime)
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
        console.log("la fecha de inicio: ",this.startDateTime)
        console.log("la fecha de fin: ",this.endDateTime)
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
  
        // Acá va el POST al backend
        this.errorMessage = '';
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Se ha hecho la reserva correctamente',
          life: 5000,
        });
        this.closeModal();
      },
      addParticipant(user) {
        if (!this.selectedParticipants.includes(user)) {
          this.selectedParticipants.push(user);
        }
      },
      removeParticipant(user) {
        this.selectedParticipants = this.selectedParticipants.filter(
          participant => participant.idUSer !== user.idUSer
        );
      }
    },
    async mounted() {
       await this.getUsers();
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
  
  /* Estilos para la lista de usuarios con scroll */
  .user-list-container {
    max-height: 150px; /* Ajusta la altura según tu necesidad */
    overflow-y: auto;
  }
  
  .user-list-container ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .user-list-container li {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid #ddd;
  }
  </style>
  