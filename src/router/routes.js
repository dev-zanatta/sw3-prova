
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), name: "IndexPage"},
      { path: 'vendas', component: () => import('pages/VendasPage.vue'), name: "VendasPage"},
      { path: 'relatorios', component: () => import('pages/RelatoriosPage.vue'), name: "RelatoriosPage"},
      { path: 'tipos-produtos', component: () => import('pages/TiposProdutosPage.vue'), name: "TiposProdutosPage"},
      { path: 'tipos-usuarios', component: () => import('pages/TiposUsuariosPage.vue'), name: "TiposUsuariosPage"},
      { path: 'usuarios', component: () => import('pages/UsuariosPage.vue'), name: "UsuariosPage"},
      { path: 'produtos', component: () => import('pages/ProdutosPage.vue'), name: "ProdutosPage"},
      { path: 'grupos-produtos', component: () => import('pages/GruposProdutosPage.vue'), name: "GruposProdutosPage"},
    ],
  },

  {

  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
