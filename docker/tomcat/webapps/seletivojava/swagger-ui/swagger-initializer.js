window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    urls: [
      {url: "../api.autenticar.yaml", name: "Autenticar obter o Token"},
      {url: "../api.cidade.yaml", name: "CRUD Cidade"},
      {url: "../api.lotacao.yaml", name: "CRUD Lotação"},
      {url: "../api.pessoa.yaml", name: "CRUD Pessoa"},
      {url: "../api.servefetivo.yaml", name: "CRUD Servidor Efetivo"},
      {url: "../api.servidortemporario.yaml", name: "CRUD Servidor Temporario"},
      {url: "../api.unidade.yaml", name: "CRUD Unidade"},
      {url: "../api.efetivoslotados.yaml", name: "Consulta Efetivos Lotados"},
      {url: "../api.enderecofuncional.yaml", name: "Consulta de Endereço Funcional"},
      {url: "../api.fotopessoa.yaml", name: "Foto da Pessoa"}
    ],    
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });

  //</editor-fold>
};
