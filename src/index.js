import Vue from 'vue';
import axios from 'axios';

Vue.component("hello",require("./components/hello.vue").default);

var app = new Vue({
  el:"#app",
  data:()=>{
    return{
    }
  },
  methods:{

  },
  created(){

  }
});
