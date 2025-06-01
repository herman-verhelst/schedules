import { ref, onUnmounted } from 'vue';

export function useDebounce(delay = 500) {
    let timeout = null;

    function debounce(fn) {
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    }

    onUnmounted(() => {
        if (timeout) clearTimeout(timeout);
    });

    return { debounce };
}