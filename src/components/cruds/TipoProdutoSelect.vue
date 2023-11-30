<template>
  <q-select
    outlined
    fill-input
    clearable
    dense
    :options="tiposProdutos"
    option-value="id"
    option-label="descricao"
    label="Tipos de Produtos"
    :model-value="tipoProduto"
    :loading="loading"
    v-bind="$attrs"
    @filter="filterFn"
    @update:model-value="(value) => emit('update:tipoProduto', value)"
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

const emit = defineEmits(["update:tipoProduto"]);

const loading = ref(false);
const tiposProdutos = ref([]);

const props = defineProps({
  tipoProduto: {
    type: Object,
    required: false,
    default: null,
  },
});

const filterFn = async (val, update) => {
  await getTiposProdutos();

  update(tiposProdutos.value);
};

const getTiposProdutos = async () => {
  loading.value = true;

  const response = await api.get(`/tipos-produtos`);
  tiposProdutos.value = response.data.result;

  loading.value = false;
};

</script>
