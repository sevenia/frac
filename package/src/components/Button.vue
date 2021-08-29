<template>
    <button
        class="f_inline-flex f_justify-center f_items-center f_px-4 f_py-2 f_border f_border-gray-300 f_leading-5 f_font-medium f_text-gray-700 f_bg-gray-50 f_rounded hover:f_bg-gray-100 focus:f_bg-gray-100 focus:f_outline-none active:f_bg-gray-200 active:f_outline-none"
    >
        <span class="f_w-5">
            <slot name="icon"></slot>
        </span>
        <span class="f_inline-block f_ml-2">
            <slot name="text"></slot>
        </span>
    </button>
</template>
