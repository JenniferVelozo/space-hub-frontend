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
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
    areaType: String,
    state: String,
    useType: String,
  },
}
</script>

<style scoped>
/* Aquí puedes agregar estilos para tu tarjeta */
</style>
