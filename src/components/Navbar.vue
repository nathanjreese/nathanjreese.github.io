<template>
    <nav id="vue" class="nav">
        <div class="menu-item"><router-link class ="routlink" to="/wordle">Wordle</router-link></div>
        <div class="menu-item"><router-link to="/silly">Silly Season</router-link></div>
        <!-- <div class="menu-item"><router-link to="/silly">Daytona Tracker</router-link></div> -->
        <!-- <div class="menu-item"><router-link to="/selector">Driver Selector</router-link></div> -->
        <div class="menu-item"><router-link to="/leaders">Leader's Circle</router-link></div>
    </nav>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    showPage() {
      this.$emit('close')
    }
  }

}
</script>
<style>
div{
  font-size: 20px !important;
}
div .menu-item{
  font-size: 35px !important;
}
nav {
width: 100vw;
background-color: #323232;
display: flex;
align-items: center;
justify-content: center;
font-size: 30px !important;
}
nav .menu-item {
color: rgb(194, 194, 194);
padding: 25px 30px;
position: relative;
height: 100%;
text-align: center;
border-bottom: 5px solid transparent;
display: flex;
transition: 0.4s;
font-size: 30px !important;
}
nav .menu-item a {
  font-size: 30px !important;
}
nav .menu-item .router-link-active {
 cursor: pointer;
 border-bottom-color: #cd7904;
 font-weight: bold;
 color: white;
 background-color: #313132;
 height: 100%;
 font-size: 24px;
}

nav .menu-item:hover {
border-bottom-color: #cd7904;
font-size: 30px !important;
}
nav .menu-item a {
color: inherit;
text-decoration: none;
}
</style>