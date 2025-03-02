<template>
    <div class="frame">
        <div v-if="modalOpen == true" class="modal">
            <div>
                <button name="closeModal" color="RED" @click="modalOpen = false" class="close-button"></button>

            </div>
            <div class="modal-slot">
                <slot>

                </slot>
            </div>

        </div>

    </div>






</template>

<script setup>





const modalOpen = defineModel('modalOpen')

</script>

<style scoped>
.frame {

    position: absolute;
    display: flex;
   width: calc(100% - 40px);
   max-height: calc(100% - 40px - 250px);
   height: calc(100% - 40px - 250px);
   padding: 20px;
}

.modal{
    width: fit-content;
    
    margin: auto;
    flex-grow: 1;
    min-height: 0;
    max-height: 100%;

}

.close-button {
    float: right;
}

.modal-slot {
    margin-top: 100px;
}
</style>