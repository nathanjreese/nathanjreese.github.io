<template>
    <div class="silly-instructions-modal-backdrop">
      <div class="silly-instructions-modal">
        <header class="silly-instructions-modal-header">
           Silly Season Instructions
          <div>
            <button
              type="button"
              class="btn-close"
              @click="close"
            >
            <font-awesome-icon icon="fa-solid fa-xmark"/>
            </button>
          </div>
        </header>
        <div class="clue-list-header">
            Predict the 2025 IndyCar Grid
        </div>
        <div class="clue-list">
            Fill in all of the empty drivers to make your prediction 
            <br><br>
            <li>Click a team opening to add a driver</li>
            <li>Click a driver on an existing team to remove</li>
            <li>Drag and Drop on desktop</li>
            <li>Add free agents to a team</li>
            <li>Remove drivers from a team</li>
            <li>Create one new team</li>
            <li>Create a free agent that's not listed</li>
            <br>
            <p class="note-class">*Most IndyCar contracts are not public, so the starting point is a best guess based on different articles and press releases.</p>
            <br>
        </div>
      </div>
      </div>
  </template>
  
  <script>
    export default {
      name: 'instructions',
      data: () => ({
        questionNumber: 0,
      }),
      computed: {
      // a computed getter
      },
      methods: {
        close() {
          this.$emit('close')
          
        }
      }
    }
  </script>
  
  <style>
    .silly-instructions-modal-backdrop {
      padding-top:20px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 6, 15, 0.694) !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .silly-instructions-modal {
      color: rgba(24, 24, 24, 0.68) !important;
      background-color: whitesmoke;
      box-shadow: 6px 2px 4px 4px !important;
      display: inline-flex;
      flex-direction: column;
      min-height: 50% !important;
      width: calc(400px + 20.3vw) !important;
      margin: 20px;
      justify-content: left;
      align-items: left;
    }
    .fa-xmark {
      color: #333333 !important;
      font-size: calc(15px + .8vw) !important;
      padding-right:5px;
      padding-top: 5px;
    }
    .fa-xmark:hover {
      color: rgb(146, 146, 146) !important;
      font-size: calc(15px + .8vw) !important;
      padding-right:5px;
      padding-top: 5px;
    }
    .silly-instructions-modal-header {
      padding-left: 13px;
      padding-top: calc(5px + .5vw);
      padding-bottom: calc(1px + .5vw);
      min-height: 45px;
      display: flex;
      position: relative;
      border-bottom: 1px solid #000000;
      background-color: #1867c0;
      color: whitesmoke;
      justify-content: space-between;
      font-size: calc(16px + .5vw);
      font-weight: bold;
      max-width: 100%;
    }
  
    .silly-instructions-modal-body {
      position: relative;
      padding: 10px 10px;
      color: rgb(233, 233, 233) !important;
      min-width: calc(200px + 25vw);
      overflow-y:auto;
    }
  
  
    .btn-close {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      font-size: calc(13px + 1vw);
      padding: 5px 10px;
      cursor: pointer;
      font-weight: bold;
      color: whitesmoke;
      background: transparent;
      
    }
    .btn-close:hover {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      font-size: 20px;
      padding: 5px 10px;
      cursor: pointer;
      font-weight: bold;
      color: rgb(192, 192, 192);
      background: transparent;
      
    }
    .clue-list-header {
      padding: 10px 30px;
      font-weight: bold;
      font-size: calc(15px + .8vw);
  }
  .clue-list {
      text-align: left;
      padding: 10px 40px;
      font-size: calc(11px + .5vw);
      margin: auto;
  }
  .note-class {
    font-style: italic;
    font-size: 14px;
  }
  </style>