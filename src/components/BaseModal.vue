<template>
    <!-- Show this in inspector tools -->
    <Teleport to="body">
        <Transition name="modal-outer">
            <div
                v-show="modalActive"
                class="absolute w-full bg-black bg-opacity-30 h-screen
                top-0 left-0 flex justify-center px-8"
            >
                    <Transition name="modal-inner">
                        <!-- v-if is taking props! -->
                        <div
                            v-if="modalActive"
                            class="p-4 bg-white self-start mt-32 max-w-screen-md">
                            <slot />
                            <!-- Slot is where HTML props we pass in from the parent (Navbar) get rendered -->
                            <button class="text-white mt-8 bg-primary py-2 px-6"
                            @click="$emit('close-modal')">
                                Close
                            </button>
                        </div>
                    </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
    // 'emits' is like a component-return value (since we aren't returning the JSX)
    defineEmits(['close-modal']);
    // Here's where we take props so we can use them in the code
    defineProps({
        modalActive: {
            type: Boolean,
            default: false,
        },
    })
</script>

<!-- Using SCSS to style how the modal opens and closes as well as button fade stuff -->
<style lang="scss" scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>