<template>
<div id="page">
  <br>
  <div class="wrapper">
    <div class="allProjects" v-for="p in allProjects" :key="p.id" @click="selectProject(p)">
      <button class="barItem">{{p.title}}</button>
    </div>
  </div>
  <h2>{{viewProject.title}}</h2>
  <div v-if="viewPath">
    <button @click="closeImage">X</button>
    <img class="largeImage" :src="viewPath">
  </div>
  <div v-else>
    <div class="row images">
          <div v-for="path in viewProject.paths" :key="path">
            <div class="col">
              <img class="image" :src="path" v-on:click="viewImage($event)" :id="path">
            </div>
          </div>
    </div>
    <div class="row">
        <div class="col">
          <h4>OBJECTIVE</h4>
          <p>{{viewProject.objective}}</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
          <h4>TECHNICAL DETAILS</h4>
          <p>{{viewProject.technicals}}</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
          <h4>RESULTS/OUTCOME</h4>
          <p>{{viewProject.results}}</p>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Projects',
  data() {
    return{
      projectList: [],
      currProject: null,
      path: "",
    }
  },
  computed: {
    allProjects() {
      return this.projectList;
    },
    viewProject() {
      return this.currProject;
    },
    viewPath() {
      return this.path;
    }
  },
  created() {
    this.getProjects();
  },
  methods: {
    async getProjects() {
      try {
        let response = await axios.get("/api/projects");
        this.projectList = response.data;
        this.currProject = this.projectList[0];
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectProject(project){
      this.currProject = project;
      this.path = "";
    },
    viewImage:function(e){
      this.path = e.target.id;
    },
    closeImage(){
      this.path="";
    }
  }
}
</script>

<style>
  #page{
    min-height: 100vh;
    padding: 0 30px;
  }
  .wrapper{
    width: 100%;
    background-color: #010426;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .barItem{
    color: white;
    background: #010426;
    border: 2px white solid;
    border-radius: 10px;
  }

  .barItem:hover{
    color: #03989e;
    background: #010426;
    border: 2px #03989e solid;
    border-radius: 10px;
  }
  .images{
    justify-content: space-around;
  }
  .image{
    height: 300px;
    width: 300px;
    object-fit: cover;
    padding: 2px;
    border: 2px solid grey;
  }

  .image:hover{
    height: 320px;
    width: 320px;
    object-fit: cover;
    padding: 2px;
    border: 2px solid grey;
  }
  .largeImage{
    min-width: 50%;
    max-width: 80%;
    height: auto;
    margin: 0 0 1em 0;
    padding: 1em;
    background-color: rgba(255,255,255,0.6);
    border: 3px solid grey;
  }
  p {
    font-family: Helvetica;
    text-align: left;
  }
  ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li{
    padding: 0;
    margin: 0;
  }
  .list{
    justify-items: start;
  }
  #hobbyInfo {
    margin: 20px 0;
  }
  #policy{
    text-align: justify;
    text-justify: none;
    padding: 0 15px;
  }
</style>
