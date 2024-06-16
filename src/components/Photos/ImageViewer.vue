<template>
    <div class="image-viewer">
      <div v-if="!isMobile" class="image-viewer-modal">
        <span class="close-button-x" @click="close">
            <font-awesome-icon icon="fa-solid fa-xmark " />
        </span>
        <font-awesome-icon icon="fa-free fa-circle-chevron-left"
            @click="changePhoto(-1)" />
        <font-awesome-icon icon="fa-free fa-circle-chevron-right"
            @click="changePhoto(1)" />
        <div class="image-holder">
            <img class="full-image-view" :src="images[index]" alt="Full Size Image">
            Image {{ index + 1 }} of {{ images.length }}
        </div>
      </div>
      <div v-if="isMobile" class="image-viewer-modal-mobile">
        <span class="close-button-x" @click="close">
            <font-awesome-icon icon="fa-solid fa-xmark " />
        </span>
        <font-awesome-icon icon="fa-free fa-circle-chevron-left"
            @click="changePhoto(-1)" />
        <font-awesome-icon icon="fa-free fa-circle-chevron-right"
            @click="changePhoto(1)"/>
        <div class="image-holder">
            <img class="full-image-view" :src="images[index]" alt="Full Size Image">
            Image {{ index + 1 }} of {{ images.length + 1 }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    props: {
      images: Object,
      photoIndex: Number
    },
    data() {
      return {
        selectedImage: null,
        index: this.photoIndex
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      changePhoto(updateNumber){
            console.log("UPDATE NUMBER: ", updateNumber)
        const totalPhotos = this.images.length - 1
        if(totalPhotos === this.index && updateNumber > 0){
          this.index = 0
        }
        else if(this.index === 0 && updateNumber < 0){
          this.index = totalPhotos
        }
        else{
          this.index += updateNumber
        }
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
      },
  }
  </script>
  
  <style scoped>
  .image-viewer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-viewer-modal {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    max-width: 70%;
    max-height: 90%;
    padding: 25px 0px;
    text-align: center;
    position: relative;

    .image-holder{
        display: flex;
        margin: auto;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .fa-circle-chevron-left {
    color: silver;
    margin-top: 20%;
    height: calc(10px + 5vw);
    margin-right: calc(190px + 2vw);
    position: fixed;
    top: 20;
    left: 0;
  }
  .fa-circle-chevron-right {
    margin-top: 20%;
    color: silver;
    height: calc(10px + 5vw);
    margin-left: calc(190px + 2vw);
    position: fixed;
    top: 100;
    right: 0;
  }
  .fa-circle-chevron-left:hover {
    cursor: pointer;
    color: gray;
  }
  .fa-circle-chevron-right:hover {
    cursor: pointer;
    color: gray;
  }
  }
  .image-viewer-modal-mobile {
    background-color: white;
    padding: 5px;
    border-radius: 5px;
    max-width: 90%;
    max-height: 90%;
    padding: 10px 0px;
    text-align: center;
    position: relative;

    .image-holder{
        display: flex;
        margin: auto;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .fa-circle-chevron-left {
    color: silver;
    margin-top: 20%;
    height: calc(10px + 5vw);
    margin-right: calc(190px + 2vw);
    position: fixed;
    top: 20;
    left: 0;
  }
  .fa-circle-chevron-right {
    margin-top: 20%;
    color: silver;
    height: calc(10px + 5vw);
    margin-left: calc(190px + 2vw);
    position: fixed;
    top: 100;
    right: 0;
  }
  .fa-circle-chevron-left:hover {
    cursor: pointer;
    color: gray;
  }
  .fa-circle-chevron-right:hover {
    cursor: pointer;
    color: gray;
  }
  }
  .full-image-view{
    max-width: 80%;
  }
  
  .close-button-x {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  </style>