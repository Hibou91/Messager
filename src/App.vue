<template>
    <mainMenu>
        <mButton @click="importJsFile">Import .js</mButton>
        <mButton @click="importJsonFile">Import .json</mButton>
        <mButton @click="exitProgram">Exit</mButton>
    </mainMenu>
    <MessageEditorPage v-model:messages="state.data" v-model:config="state.config" v-if="state.openEditor == true" :key="state.editorUpdateKey">
    </MessageEditorPage>
    <div v-else class="w-full h-full flex-row justify-center">
        <div class="flex-col">

            <mButton>Messager</mButton>
            <p>The purpose of this program is to edit Vue I18n string tokens for localization <span class="d-block">
                while thinking about coffee.
            </span> </p>

            <p>Please note thet js import will only work with the following format: </p>
            <p class="">
                <span class="code d-block">
                const messages = {
                <span class="code d-block">lanuage1: {
                    <span class="code d-block">message: {
                        <span class="code d-block">key: "token"</span>
                    </span>
                    <span class="code d-block">}</span>
                </span>
                <span class="code d-block">}</span>
                <span class="code d-block">lanuage2: {
                    <span class="code d-block">message: {
                        <span class="code d-block">key: "token"</span>
                    </span>
                    <span class="code d-block">}</span>
                </span>
                <span class="code d-block">}</span>
            </span>
                <span class="code d-block">}</span>
                <span class="code d-block">export default messages;</span>
            </p>

        </div>
    </div>

</template>

<script setup>
import mainMenu from './frontend/components/mainMenu.vue';
import mButton from './frontend/components/mButton.vue';
import MessageEditorPage from './frontend/MessageEditorPage.vue';

import { ref } from 'vue'

const state = ref({
    data: {},
    openEditor: false,
    config: {
        sorted: false
    },
    editorUpdateKey: 0
})

const importJsFile = async () => {
    const response = await window.generic.importJsFile()
    if (response != false) {
        state.value.data = response
        state.value.openEditor = true
        state.value.editorUpdateKey = state.value.editorUpdateKey +1
    }

}

const importJsonFile = async () => {
    const response = await window.generic.importJsonFile()
    if (response != false) {
        state.value.data = response
        state.value.openEditor = true
    }
    state.value.editorUpdateKey = state.value.editorUpdateKey +1

}

const exitProgram = () => {
    window.generic.quitApp()
}

</script>

<style scoped>
.code {
    padding: 0;
    padding-left: 20px;
    margin: 0;

}

.d-block {
    display: block;
}
</style>