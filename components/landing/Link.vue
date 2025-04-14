<script setup lang="ts">
type SizeType = "md" | "lg";
type StyleType = "outline" | "primary" | "inverted" | "muted";

const props = defineProps({
    href: { type: String, required: true },
    size: { type: String as () => SizeType, default: "lg" },
    block: { type: Boolean, default: false },
    styleName: { type: String as () => StyleType, default: "primary" },
    className: { type: String },
    image: { type: String }, 
    alt: { type: String },    
    width: { type: Number },  
    height: { type: Number }, 
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
    <NuxtLink 
        :href="href" 
        :class="[
            'rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 flex items-center justify-center gap-2',
            block && 'w-full',
            size === 'lg' ? sizes.lg : sizes.md,
            styleName === 'outline' ? styles.outline :
                styleName === 'primary' ? styles.primary :
                    styleName === 'inverted' ? styles.inverted : styles.muted
        ]"
    >
        <!-- Render image if provided -->
        <img 
            v-if="image" 
            :src="image" 
            :alt="alt" 
            :width="width" 
            :height="height" 
            class="inline-block"
        />
        <slot />
    </NuxtLink>
</template>