<template>
  <q-page class="">
    <div class="row">
      Produtos

    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { onMounted } from 'vue'

onMounted( async () => {
  const response = await api.get('/usuarios');

})
</script>
