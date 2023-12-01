<template>
  <q-select
    outlined
    fill-input
    clearable
    dense
    multiple
    :options="produtos"
    option-value="id"
    option-label="descricao"
    label="Produtos"
    :model-value="produto"
    :loading="loading"
    v-bind="$attrs"
    @filter="filterFn"
    @update:model-value="(value) => emit('update:produto', value)"
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

const emit = defineEmits(["update:produto"]);

const loading = ref(false);
const produtos = ref([]);

const props = defineProps({
  produto: {
    type: Object,
    required: false,
    default: null,
  },
});

const filterFn = async (val, update) => {
  await getProdutos();

  update(produtos.value);
};

const getProdutos = async () => {
  loading.value = true;

  const response = await api.get(`/produtos`);
  produtos.value = response.data.result;

  loading.value = false;
};

</script>
