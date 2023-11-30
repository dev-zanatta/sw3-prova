<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="column no-wrap"
    >

      <q-card-section class="row no-padding scroll full-height">
        <!-----inf------>
        <div class="col-xs-12 col-sm col-md q-px-md q-pt-md">
          <q-form
            ref="addGrupoProdutoForm_ref"
            class="row q-col-gutter-md"
            autocomplete="off"
            @submit.prevent
          >
            <!-- Descrição -->
            <q-input
              v-model="grupoProduto.descricao"
              outlined
              class="col-12"
              dense
              label="Descrição"
              hint="Campo obrigatório"
              lazy-rules
              color="secondary-3"
              :rules="[(val) => !!val || 'Campo obrigatório']"
              autofocus
            />
          </q-form>
        </div>
      </q-card-section>
      <div class="row q-pa-md self-end justify-end">
        <q-btn
          flat
          color="primary-5 button"
          padding="12px 16px"
          label="Cancelar"
          class="q-mr-md"
          @click="onDialogCancel"
        />
        <q-btn
          color="primary-3 text-black button-primary"
          padding="12px 16px"
          label="Salvar"
          @click="adicionar"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
s

<script setup>
import { onMounted, ref, computed } from "vue";
import { useDialogPluginComponent } from "quasar";
import { api } from "src/boot/axios.js";

defineEmits([...useDialogPluginComponent.emits]);

const addGrupoProdutoForm_ref = ref(null);
const grupoProduto = ref({
  descricao: null,
});

const props = defineProps({
  grupoProdutoId: {
    type: [String, Number],
    required: false,
    default: null,
  },
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const adicionar = async () => {
  let response = null;

  if (props.grupoProdutoId) {
    response = await api.put(`grupos-produtos/${props.grupoProdutoId}`, grupoProduto.value);
  } else {
    response = await api.post("grupos-produtos", grupoProduto.value);
  }

  if (response.data.success) {
    onDialogOK();
  }
};

onMounted(async () => {
  if (props.grupoProdutoId) {
    const response = await api.get(`/grupos-produtos/${props.grupoProdutoId}`);
    grupoProduto.value = response.data.result;
  }
});
</script>

<style>
</style>
