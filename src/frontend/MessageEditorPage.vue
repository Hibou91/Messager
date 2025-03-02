<template>


  <div class="w-full h-full flex-row justify-center">
    <div class="flex-col">
      <div class="">
        <mButton @click="saveFile">Save</mButton>

        <p>Sort List</p>
        <input class="input " type="checkbox" v-model="state.sortList">

        <p>Search Keys</p>
        <input class="input" type="text" v-model="state.keyQuery">

        <p>Search Tokens</p>

        <div class="input-group ">
          <input class="input " type="text" v-model="state.langQuery">
          <select class="input" name="" id="" v-model="state.langQueryLang">
            <option v-for="lang in state.languages" value="en">{{ lang }}</option>
          </select>
        </div>

        <p>Add new </p>
        <div class="input-group ">
          <input class="input" type="text" v-model="state.newMessage.key" placeholder="key">
          <input v-for="lang in state.languages" class="input " type="text" v-model="state.newMessage[lang]"
            :placeholder="lang">
          
        </div>
        <mButton class="btn btn-secondary" @click="addNewMessage"><span class="base-text">Add that</span></mButton>
      </div>

      

      <div class="">
        <table class="table ">
          <thead>
            <tr>
              <th class="text-base">Key</th>
              <th class="text-base">Delete</th>
              <!--<th class="text-white text-base">Módosítás</th> -->
              <th v-for="lang in state.languages" class="text-base">{{ lang.toUpperCase() }}</th>
            </tr>

          </thead>

          <tr v-for="item in state.options" v-bind:key="item.key">
            <td class="token-text">{{ item.key }}</td>
            <td><input class="input table-input" type="checkbox" v-model="item.delete"></td>
            <td v-for="lang in state.languages"><input class="input table-input" type="text" v-model="item[lang]"></td>

          </tr>

        </table>
      </div>

    </div>
  </div>


</template>

<script setup>

import toast from "./toast.js";
import mButton from "./components/mButton.vue";

import { watch, onMounted, reactive } from 'vue';

const state = reactive({
  keyQuery: "",
  langQuery: "",
  langQueryLang: "hu",
  options: [],
  optionsRepo: [],
  sortList: false,
  languages: [],
  newMessage: {
    key: '',
  }
});

const messages = defineModel('messages')

//const language = computed(() => store.getters.getLanguage);

onMounted(() => {

  setMeUp()
})

const setMeUp = async () => {


  for (const [lkey] of Object.entries(messages.value)) {
    state.languages.push(lkey)
  }

  if (state.languages.length < 1) {
    return
  }

  for (const [key, value] of Object.entries(messages.value[state.languages[0]].message)) {

    const obj = {
      key: key,
    }


    for (const language of state.languages) {

      obj[language] = messages.value[language].message[key]
    }



    state.optionsRepo.push(obj)

    if (state.sortList == true) {
      state.optionsRepo.sort((a, b) => {
        if (a.key < b.key) {
          return -1;
        }
        if (a.key > b.key) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    }

    state.options = state.optionsRepo
  }

  state.newMessage = {
    key: '',
  }

  for (const language of state.languages) {
    state.newMessage[language] = ''
  }

}

watch(() => state.keyQuery, (newValue, oldValue) => {
  if (newValue == "") {
    state.options = state.optionsRepo;
  } else if (newValue != oldValue) {
    state.options = state.optionsRepo.filter(elem => (elem.key.toLowerCase()).includes(newValue.toLowerCase()));

  }
}
);

watch(() => state.langQuery, (newValue, oldValue) => {
  if (newValue == "") {
    state.options = state.optionsRepo;
  } else if (newValue != oldValue) {
    state.options = state.optionsRepo.filter((elem) => {
      if (elem[state.langQueryLang]) {
        return (elem[state.langQueryLang].toLowerCase()).includes(newValue.toLowerCase());
      }
      return false
    })
  }
});


const addNewMessage = () => {

  let check = state.optionsRepo.find((element) => element.key == state.newMessage.key);

  if (check) {
    toast.error("Duplicate key");
  } else {
    state.optionsRepo.push(state.newMessage);
    state.newMessage = {
      key: '',
    }

    for (const language of state.languages) {
      state.newMessage[language] = ''
    }

    if (state.sortList == true) {
      state.optionsRepo.sort((a, b) => {
        if (a.key < b.key) {
          return -1;
        }
        if (a.key > b.key) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    }
    state.options = state.optionsRepo
    toast.success(t("message.successfulSave"));
  }

}


const saveFile = async () => {

  let objectBuffer = {};


  if (state.optionsRepo.length > 0) {


    for (const lkey of state.languages) {
      objectBuffer[lkey] = { message: {} }
    }


    for (const item of state.optionsRepo) {
      if (!item.delete) {
        for (const lkey of state.languages) {
          objectBuffer[lkey].message[item.key] = item[lkey];
        }
      }

    }
  }
  console.log(objectBuffer);

  const response = await window.generic.saveFile(objectBuffer)
  if (response != false) {
    //state.value.data = response
  }

}



</script>

<style scoped>

p{
  margin-bottom: 5px;
}
</style>