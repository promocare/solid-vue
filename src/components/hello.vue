<template lang="html">
<div class="hello">
  <h1>Solid Login Test</h1>
  <h2>{{loggedIn}}</h2>{{webId}}
  <button type="button" v-if="!loggedIn" @click="popupLogin">Login</button>

</div>
</template>

<script>

import axios from 'axios';
const auth = require('solid-auth-client');
window.solid = { auth }

  var CHAT  = $rdf.Namespace("https://ns.rww.io/chat#");
  var CURR  = $rdf.Namespace("https://w3id.org/cc#");
  var DCT   = $rdf.Namespace("http://purl.org/dc/terms/");
  var FACE  = $rdf.Namespace("https://graph.facebook.com/schema/~/");
  var FOAF  = $rdf.Namespace("http://xmlns.com/foaf/0.1/");
  var LIKE  = $rdf.Namespace("http://ontologi.es/like#");
  var LDP   = $rdf.Namespace("http://www.w3.org/ns/ldp#");
  var MBLOG = $rdf.Namespace("http://www.w3.org/ns/mblog#");
  var OWL   = $rdf.Namespace("http://www.w3.org/2002/07/owl#");
  var PIM   = $rdf.Namespace("http://www.w3.org/ns/pim/space#");
  var RDF   = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  var RDFS  = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
  var SIOC  = $rdf.Namespace("http://rdfs.org/sioc/ns#");
  var SOLID = $rdf.Namespace("http://www.w3.org/ns/solid/app#");
  var TMP   = $rdf.Namespace("urn:tmp:");

export default {
  data:()=>{
    return {
      loggedIn: false,
      webId:"",

      g:$rdf.graph(),
      f:$rdf.fetcher(),

      storageURI: "https://giulio.solid.community/inbox/test/",
    }
  },
  methods:{

    async popupLogin(){
      let vm = this;
      let session = await solid.auth.currentSession();
      let popupUri = 'https://solid.community/common/popup.html';
      if (!session){
        session = await solid.auth.popupLogin({ popupUri });
      }
      vm.webId = session.webId
      console.log(`Logged in as ${session.webId}`);
    }, 

    storeFile(){
      axios({
        method:"put",
        usr:
      })
    }

  },
  created(){
    let vm = this;
    auth.trackSession(session => {
      if (!session){
        vm.loggedIn = false;
        vm.webId = "";
      }else{
        vm.loggedIn = true;
        vm.webId = session.webId;
        console.log(session);
      }
    });

  }
}
</script>

<style lang="css">
</style>
