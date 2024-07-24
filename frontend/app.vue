<template>
  <div class="layout-container">
    <Header /> <!-- Este componente renderiza el encabezado de la página -->
    <NuxtPage /> <!-- Este componente renderiza la página basada en la ruta actual -->
	<Toast />
    <footer /> <!-- Y aquí el pie de página -->
  </div>
</template>


<script>
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default {
	name: "default",
}
</script>

<style scoped>

</style>
