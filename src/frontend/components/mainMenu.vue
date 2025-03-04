<template>
    <div>
        
        <div class="main-menu-button" @click="state.menuOpen = true">Main Menu</div>
        



        <Transition name="menu-main">
            <div v-if="state.menuOpen == true" class="menu-main" @click="state.menuOpen = false">
                <slot>

                </slot>
                <mButton @click="state.menuOpen = false">Close</mButton>
            </div>
        </Transition>



    </div>
</template>

<script setup>
import mButton from './mButton.vue';

import { ref } from 'vue'

const state = ref({
    menuOpen: false,
    fading: false
})



defineProps(['menuName'])


</script>

<style scoped>
.menu-main {
    background-color: rgb(214, 187, 134);
    width: 150px;
    height: calc(100vh - 40px);
    max-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    z-index: 100;
}

.main-menu-button{
    cursor: pointer;
    padding: 20px 0 0 20px;
    font-size: 20px;
}

.main-menu-button:hover{
    color:rgb(128, 103, 84);
}

.menu-title{
    padding: 20px 0 20px 20px;
}

.menu-main-enter-active,
.menu-main-leave-active {
    transition: left 0.5s ease;
}

.menu-main-enter-from,
.menu-main-leave-to {
    left: -200px;
}
</style>