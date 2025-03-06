<template>
    <div class="m-button-s m-button" style="position: relative;">
        <div class="btn-bg w-full h-full" style="position: absolute; z-index: -10;"></div>
        <div class="btn-fg w-full h-full">
            <div class="m-button-s-inner">
                <slot>

                </slot>
            </div>

        </div>

    </div>

</template>

<style scoped>
.m-button-s {
    width: 150px;
    height: 60px;
    border-radius: 10px;
}

.m-button-s-inner{
    padding-left: 50px;
    font-size: 20px;
    padding-top: 20px;
}
</style>