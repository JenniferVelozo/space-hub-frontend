<template>
    <div class="action-modal" v-if="showModal" @click="closeModal">
        <div class="action-modal-content" @click.stop>
            <div class="div-content">
                <span class="close-icon" @click="closeModal">x</span>
                <div class="contenedor-modal"> 
                  <span class="modal-text" style="display: block; text-align: center;"> Seleccione fecha y horario de reserva </span>

                  <div class="action-modal-buttons">
                    <button @click="reservarEspacio"> Reservar espacio </button>

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
        }
    },
    methods: {
        closeModal() {
            this.$emit("closeReservationModal");
        },
        async reservarEspacio() {
            this.envio = false
            try {
                const formData = new FormData();
                formData.append('file', this.selectedFile);
                const { $requestService } = useNuxtApp()
                const response = await $requestService.updatePDFRequest(this.idFactura, formData, 'recepcion', this.cc, useAuthStore().getUser.user.username)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Se ha hecho la reserva correctamente',
                    life: 5000,
                })
                this.closeModal();
            } catch(error) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al hacer la reserva. Intente nuevamente.',
                    life: 5000,
                })
            }
            
        },
    }

}
 
</script>