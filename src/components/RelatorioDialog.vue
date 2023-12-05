<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" style="width: 80vw">
    <q-card
      class="column no-wrap"
      style="min-width: 900px"
    >
      <q-card-section class="row no-padding scroll">
        <div class="col-xs-12 col-sm col-md q-px-md q-pt-md">
          <q-table
            :rows="dados"
            :columns="colunas"
            :rows-per-page-options="[20,40,50,100]"
            >
          >
          </q-table>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
s

<script setup>
import { onMounted, ref, computed } from "vue";
import { useDialogPluginComponent } from "quasar";

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide} =
  useDialogPluginComponent();

const dados = ref(null);
const props = defineProps({
  dadosRelatorio: {
    type: Object,
    required: true,
  },
  colunas: {
    type: Array,
    required: true,
  },
  resumo: {
    type: Object,
    required: false,
  },
});


onMounted(async () => {
  dados.value = props.dadosRelatorio;
});
</script>

<style>
</style>
