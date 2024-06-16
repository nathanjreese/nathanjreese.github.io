<template>
    <div>
      <!-- <h2>{{ this.race }}</h2> -->
      <div class="image-list" v-if="!isMobile">
        <img class="image-desk" v-for="(imageName, index) in getImages" :key="index" :src="imageName" alt="Image" @click="showImage(index)">
      </div>
      <div class="image-list-mobile" v-if="isMobile">
        <img class="image-mobile" v-for="(imageName, index) in getImages" :key="index" :src="imageName" alt="Image" @click="showImage(index)">
      </div>
      <ImageViewer 
        v-if="selectedImage !== null" 
        :photo-index="this.index" 
        :images="this.imageNames"
        @close="closeImageViewer"
        @changePhoto="changePhoto" />
    </div>
  </template>
  
  <script>
  import images from './images'
  import ImageViewer from './ImageViewer'


  export default {
    props: {
      race: String,
      default: 'stpete'
    },
    components: {
    ImageViewer
    },
    data() {
      return {
        selectedImage: null,
        selectedPhotos: 'roadamerica',
        index: null,
        imageNames: images[this.race]
        // imageNames: [
        // new URL('@/assets/RacePhotos/IMG_7800.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7800.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7800.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7801.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7802.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7803.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7804.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7805.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7806.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7810.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7812.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7814.JPG', import.meta.url),
        // new URL('@/assets/RacePhotos/IMG_7815.JPG', import.meta.url)
        // ]
      }
    },
    methods: {
      showImage(index) {
        console.log("INDEX: ", index)
        this.index=index
        this.selectedImage = this.imageNames[index];
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
            return images[this.race]
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