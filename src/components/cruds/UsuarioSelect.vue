<template>
  <q-select
    outlined
    fill-input
    clearable
    dense
    :options="usuarios"
    option-value="id"
    option-label="name"
    :label="props.label"
    :model-value="usuario"
    :loading="loading"
    v-bind="$attrs"
    @filter="filterFn"
    @update:model-value="(value) => emit('update:usuario', value)"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey"> Nenhum resultado </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { api } from "src/boot/axios.js";
import { ref } from "vue";

const emit = defineEmits(["update:usuario"]);

const loading = ref(false);
const usuarios = ref([]);

const props = defineProps({
  usuario: {
    type: Object,
    required: false,
    default: null,
  },
  label: {
    type: String,
    required: false,
    default: "Usuário",
  },
  clientes: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const filterFn = async (val, update) => {
  await getUsuarios();

  update(usuarios.value);
};

const getUsuarios = async () => {
  loading.value = true;

  const response = await api.get(`/usuarios${props.clientes ? '?tipo=cliente' : ''}`);
  usuarios.value = response.data.result;

  loading.value = false;
};

</script>
