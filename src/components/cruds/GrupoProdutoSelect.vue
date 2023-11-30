<template>
  <q-select
    outlined
    fill-input
    clearable
    dense
    multiple
    hide-selected
    :options="gruposProdutos"
    option-value="id"
    option-label="descricao"
    label="Grupos de Produtos"
    :model-value="grupoProduto"
    :loading="loading"
    v-bind="$attrs"
    @filter="filterFn"
    @update:model-value="(value) => emit('update:grupoProduto', value)"
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

const emit = defineEmits(["update:grupoProduto"]);

const loading = ref(false);
const gruposProdutos = ref([]);

const props = defineProps({
  grupoProduto: {
    type: Object,
    required: false,
    default: null,
  },
});

const filterFn = async (val, update) => {
  await getGruposProdutos();

  update(gruposProdutos.value);
};

const getGruposProdutos = async () => {
  loading.value = true;

  const response = await api.get(`/grupos-produtos`);
  gruposProdutos.value = response.data.result;

  loading.value = false;
};

</script>
