<template>
    <div>
      <!-- <h2>{{ this.selectedRace }}</h2> -->
      <div class="image-list" v-if="!isMobile">
        <img class="image-desk" v-for="(imageName, index) in getImages" :key="index" :src="imageName" alt="Image" @click="showImage(index)">
      </div>
      <div class="image-list-mobile" v-if="isMobile">
        <img class="image-mobile" v-for="(imageName, index) in getImages" :key="index" :src="imageName" alt="Image" @click="showImage(index)">
      </div>
      <ImageViewer 
        v-if="selectedImage !== null" 
        :photo-index="this.index" 
        :images="this.getImages"
        @close="closeImageViewer"
        @changePhoto="changePhoto" />
    </div>
  </template>
  
  <script>
  import ImageViewer from './ImageViewer'


  export default {
    props: {
      selectedRace: String,
    },
    components: {
    ImageViewer
    },
    data() {
      return {
        selectedImage: null,
        selectedPhotos: this.selectedRace,
        index: null,
        imageNames: images[this.selectedRace]
      }
    },
    methods: {
      showImage(index) {
        const raceImages = images[this.selectedRace]
        this.index=index
        this.selectedImage = raceImages[index];
        },
        closeImageViewer() {
            this.selectedImage = null;
        },
        changePhoto(updateNumber){
            console.log("UPDATE NUMBER: ", updateNumber)
        const totalPhotos = this.imageNames.length - 1
        if(totalPhotos === this.index && updateNumber > 0){
          this.index = 0
        }
        else if(this.driverIndex === 0 && updateNumber < 0){
          this.index = totalPhotos
        }
        else{
          this.index += updateNumber
        }
        this.selectedImage = this.imageNames[this.index]
      },
  },
  computed: {
        isMobile() {
          if( screen.width <= 1000 ) {
              return true;
          }
          else {
              return false;
          }
        },
        getImages(){
            console.log("jjjjj")
            return images[this.selectedRace]
        }
      },
}
</script>

<style>
.image-list {
    cursor: pointer;
  display: flex;
  flex-wrap: wrap;

  .image-desk {
    max-width: 200px;
    margin: 10px;
}
}
.image-list-mobile {
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
  .image-mobile {
    max-width: 29%;
    margin: auto;
    margin-bottom: 20px;
    border: 1px solid black;
}
}
</style>