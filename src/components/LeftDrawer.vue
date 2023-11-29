<template>
  <q-drawer
    v-model="leftDrawerOpen"
    :mini="miniState"
    :width="250"
    class="bg-secondary-1"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
  >
   <q-scroll-area class="fit">
      <q-list class="column" padding>
        <template v-for="menu in menus" :key="menu.name">
          <q-item
            v-if="menu.type == 'single'"
            v-ripple
            clickable
            :to="{ name: menu.name }"
            :disable="menu.disable"
            class="text-font"
            exact
          >
            <q-item-section avatar>
              <q-icon :name="menu.icon" />
            </q-item-section>

            <q-item-section> {{ menu.title }} </q-item-section>
          </q-item>
          <q-expansion-item
            v-if="menu.type == 'expansive'"
            expand-separator
            header-class="text-font"
            :icon="menu.icon"
            :label="menu.title"
            :content-inset-level="0.4"
          >
            <template v-for="children in menu.childrens" :key="children.name">
              <q-item
                v-ripple
                clickable
                :to="{ name: children.name }"
                class="text-font bg-secondary-2"
              >
                <q-item-section avatar>
                  <q-icon :name="children.icon" />
                </q-item-section>

                <q-item-section> {{ children.title }} </q-item-section>
              </q-item>
            </template>
          </q-expansion-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(true);
const miniState = ref(true);

const menus = ref([
  {
    type: "single",
    title: "Início",
    name: "IndexPage",
    icon: "home",
  },
  {
    type: "single",
    title: "Vendas",
    name: "VendasPage",
    icon: "sell",
  },
  {
    type: "single",
    title: "Relatórios",
    name: "RelatoriosPage",
    icon: "list",
  },
  {
    type: "expansive",
    title: "Cadastros",
    icon: "edit",
    childrens: [
      {
        title: "Produtos",
        name: "ProdutosPage",
        icon: "edit",
      },
      {
        title: "Tipos de Produtos",
        name: "TiposProdutosPage",
        icon: "edit",
      },
      {
        title: "Grupos de Produtos",
        name: "GruposProdutosPage",
        icon: "edit",
      },
      {
        title: "Usuários",
        name: "UsuariosPage",
        icon: "groups",
      },
      {
        title: "Tipos de Usuários",
        name: "TiposUsuariosPage",
        icon: "groups",
      },
    ],
  },
]);


</script>
