import { unrefElement, type MaybeElementRef } from "@vueuse/core";
import { computed, ref, watchEffect } from "vue";

export const useSize = (element: MaybeElementRef) => {
  const size = ref<{ width: number; height: number }>();
  const width = computed(() => size.value?.width ?? 0);
  const height = computed(() => size.value?.height ?? 0);

  watchEffect(() => {
    const el = unrefElement(element) as HTMLElement;
    if (el) {
      // provide size as early as possible
      size.value = { width: el.offsetWidth, height: el.offsetHeight };

      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }

        // Since we only observe the one element, we don't need to loop over the
        // array
        if (!entries.length) {
          return;
        }

        const entry = entries[0];
        let width: number;
        let height: number;

        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          // iron out differences between browsers
          const borderSize = Array.isArray(borderSizeEntry)
            ? borderSizeEntry[0]
            : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          // for browsers that don't support `borderBoxSize`
          // we calculate it ourselves to get the correct border box.
          width = el.offsetWidth;
          height = el.offsetHeight;
        }

        size.value = { width, height };
      });

      resizeObserver.observe(el, { box: "border-box" });

      return () => resizeObserver.unobserve(el);
    } else {
      // We only want to reset to `undefined` when the element becomes `null`,
      // not if it changes to another element.
      size.value = undefined;
    }
  });

  return {
    width,
    height,
  };
};