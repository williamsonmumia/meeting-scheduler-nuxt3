<script setup lang="ts">
// Define the types more explicitly
type SizeType = "md" | "lg";
type StyleType = "outline" | "primary" | "inverted" | "muted";

// Define props with defineProps
const props = defineProps({
    href: { type: String, required: true },
    size: { type: String as () => SizeType, default: "lg" },
    block: { type: Boolean, default: false },
    styleName: { type: String as () => StyleType, default: "primary" },
    className: { type: String },
});

const sizes: Record<SizeType, string> = {
    lg: "px-5 py-2.5",
    md: "px-4 py-2",
};

const styles: Record<StyleType, string> = {
    outline: "bg-white border-2 border-green-600 hover:bg-gray-100 text-slate-500",
    primary: "bg-green-600 text-white hover:bg-green-700 border-2 border-transparent",
    inverted: "bg-white text-green-600 border-2 border-transparent",
    muted: "bg-green-50 hover:bg-green-100 border-2 border-transparent",
};
</script>

<template>
  <button
    :class="[
      'rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200',
      block && 'w-full',
      sizes[size],
      styles[styleName],
      className,
    ]"
  >
    <slot />
  </button>
</template>