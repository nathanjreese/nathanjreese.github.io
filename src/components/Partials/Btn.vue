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
  computed:{
    isMobile() {
          if( screen.width <= 1000 ) {
              return true;
          }
          else {
              return false;
          }
        },
  }
}
</script>

<style scoped>
  .button {
    display: inline-block;
    margin: 0.5em 0;
    padding: calc(11px + .5vw) calc(0px + .5vw);
    background: var(--color-accent);
    border: 2px solid var(--color-border-hover);
    border-radius: 3px;
    color: #f5f9ff;
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
  @media (hover: hover) {
    .button:hover {
    background: var(--color-accent-strong);
    color: #fff;
  }
  }
  .secondary {
    display: inline-block;
    margin: 0.5em 0;
    padding: calc(11px + .5vw) calc(0px + .5vw);
    background: var(--color-nav);
    border: 2px solid rgba(214, 228, 251, 0.25);
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
  @media (hover: hover) {
    .secondary:hover {
      background: #0f1d35;
      color: #fff;
    }
}
</style>