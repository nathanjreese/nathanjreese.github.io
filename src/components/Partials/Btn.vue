<template>
    <button :class="{ button: buttonType === 'primary', secondary: buttonType === 'secondary'}">
      <slot/>
    </button>
  </template>

<script>
export default {
  props: {
    buttonType: {
      default: 'primary',
      type: String
    }
  },
}
</script>

<style scoped>
  .button {
    display: inline-block;
    margin: 0.5em 0;
    padding: calc(11px + .5vw) calc(0px + .5vw);
    background: #288eec;
    border: 2px solid rgb(119, 119, 119);
    border-radius: 3px;
    color: whitesmoke;
    font-family: "Quicksand", sans-serif;
    font-size: calc(9px + .3vw);
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s;
    min-width: calc(80px + 2.9vw);
    margin: calc(.1em + 1.3vw);
  }

  .button:hover {
    background: #175186;
    color: #fff;
  }
  .secondary {
    display: inline-block;
    margin: 0.5em 0;
    padding: calc(11px + .5vw) calc(0px + .5vw);
    background: #535353;
    border: 2px solid rgb(119, 119, 119);
    border-radius: 3px;
    color: whitesmoke;
    font-family: "Quicksand", sans-serif;
    font-size: calc(10px + .3vw);
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s;
    min-width: calc(90px + 2.9vw);
    margin: calc(.1em + 1.3vw);
  }
  .secondary:hover {
    background: #0e0e0e;
    color: #fff;
  }
</style>