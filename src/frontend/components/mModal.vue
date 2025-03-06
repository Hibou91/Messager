<template>
    <div class="frame">
        <div style="width: 100%;">
            <mButtonExit name="closeModal" color="RED" @click="modalOpen = false" class="close-button" />

        </div>
        <div class="modal-slot">
            <textarea name="" id="" v-model="textValue" style="width: 350px; height: 300px;"
                class="input"></textarea>
            <mButton @click="() => { saveMethod()}">Save</mButton>
        </div>

    </div>

</template>

<script setup>


import mButtonExit from './mButtonExit.vue';
import mButton from './mButton.vue';

const modalOpen = defineModel('openModal')
const textValue = defineModel('textValue')

const props = defineProps(['saveMethod'])

</script>

<style scoped>
.frame {

    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: fit-content;

    height: fit-content;
    padding: 20px;
    background-color: rgb(214, 187, 134);
    border-radius: 10px;
    border: 1px solid rgb(36, 27, 20);
    box-shadow: inset;
}


.close-button {
    float: right;
}

.modal-slot {
    margin-top: 20px;
    align-self: center;
}
</style>