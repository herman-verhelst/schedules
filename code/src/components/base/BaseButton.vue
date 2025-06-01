<script setup lang="ts">

defineProps(
    {
      text: {
        type: String,
      },
      variant: {
        type: String,
        default: 'default',
        validator: (value: string, props) => ['primary', 'default', 'subtle'].includes(value)
      },
      type: {
        type: String,
        default: 'default',
        validator: (value: string, props) => ['default', 'destructive'].includes(value)
      },
      size: {
        type: String,
        default: 'm',
        validator: (value: string, props) => ['m', 's', 'xs'].includes(value)
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      icon: {
        type: Boolean,
        default: false,
      },
    }
)
</script>

<template>
  <button :disabled="disabled"
          :class="`button--size-${size} button--variant-${variant} ${icon ? 'button--icon' : ''}`"
          class="button text-nowrap">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 160%;
  transition: 200ms all, 0s margin-top;
  width: fit-content;
  cursor: pointer;
  border-radius: .25rem;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
  }

  &--variant {
    &-primary {
      background: linear-gradient(103deg, var(--color-electric-indigo-100) 0%, var(--color-electric-indigo-120) 100%), var(--color-grayscale-100);
      border: 1px solid var(--color-electric-indigo-120);
      box-shadow: 0 0 2px 1px var(--color-electric-indigo-opacity-24),
      0px -2px 3px 0px var(--color-electric-indigo-120) inset,
      0px 0px 0px 2px var(--color-electric-indigo-80) inset;
      color: var(--color-grayscale-0);

      &:hover:not(:disabled) {
        border: 1px solid var(--color-electric-indigo-140);
        background: linear-gradient(103deg, var(--color-electric-indigo-120) 0%, var(--color-electric-indigo-140) 100%);
        box-shadow: 0px 2px 3px 0px var(--color-electric-indigo-140) inset,
        0px 0px 0px 2px var(--color-electric-indigo-100, #652DD8) inset;
      }

      &:disabled {
        border: 1px solid var(--color-grayscale-20);
        background: linear-gradient(0deg, var(--color-electric-indigo-opacity-40) 0%, var(--color-electric-indigo-opacity-40) 100%), var(--color-grayscale-10);
        box-shadow: none;
      }
    }

    &-default {
      color: var(--color-grayscale-100);
      border: 1px solid var(--color-grayscale-20);
      background: var(--color-grayscale-10);
      box-shadow: 0px -2px 3px 0px var(--color-grayscale-20) inset, 0px 0px 0px 2px var(--color-grayscale-0) inset, 0px 0px 2px 1px var(--color-grayscale-opacity-8);

      &:hover:not(:disabled) {
        border: 1px solid var(--color-grayscale-20);
        background: var(--color-grayscale-15);
        box-shadow: 0px 2px 3px 0px var(--color-grayscale-20) inset, 0px 0px 0px 2px var(--color-grayscale-10) inset, 0px 0px 2px 1px var(--color-grayscale-opacity-8);
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px theme('colors.red.100');
      }

      &:disabled {
        background-color: theme('colors.red.700');
      }
    }

    &-subtle {
      color: var(--color-grayscale-100);

      &:hover:not(:disabled) {
        background: var(--color-grayscale-20);
      }

      &:focus-visible {
        background-color: theme('colors.neutral.200');
        box-shadow: 0 0 0 2px theme('colors.neutral.100');
      }

      &:disabled {
        background-color: theme('colors.neutral.50');
        color: theme('colors.neutral.500');
      }
    }
  }

  &--size {
    &-m {
      height: 2rem;
      padding: 0 .75rem;
      gap: .5rem;
      font-size: 14px;

      &.button--icon {
        width: 2rem;
        padding: 0;
      }
    }

    &-s {
      height: 1.75rem;
      padding: 0 .5rem;
      gap: .375rem;
      font-size: 12px;

      &.button--icon {
        width: 1.75rem;
        padding: 0;
      }
    }

    &-xs {
      height: 1.5rem;
      padding: 0 .375rem;
      gap: .25rem;
      font-size: 12px;

      &.button--icon {
        width: 1.5rem;
        padding: 0;
      }
    }
  }

  &--icon {
    &-only {
      padding: 0;

      &.button--size {
        &-xl {
          width: 3rem;
          min-width: 3rem;
          font-size: theme('fontSize.lg');
        }

        &-l {
          width: 2.5rem;
          min-width: 2.5rem;

          .material-symbols-outlined {
            font-size: theme('fontSize.lg');
          }
        }

        &-m {
          width: 2rem;
          min-width: 2rem;
        }

        &-s {
          width: 1.75rem;
          min-width: 1.75rem;
        }

        &-xs {
          width: 1.5rem;
          min-width: 1.5rem;
        }
      }
    }

    &-trailing {
      &.button--size {
        &-xl {
          padding-right: 1rem;
        }

        &-l {
          padding-right: .75rem;
        }

        &-m {
          padding-right: .625rem;

        }

        &-s {
          padding-right: .5rem;
        }

        &-xs {
          padding-right: .25rem;
        }
      }
    }

    &-leading {
      &.button--size {
        &-xl {
          padding-left: 1rem;
        }

        &-l {
          padding-left: .75rem;
        }

        &-m {
          padding-left: .625rem;

        }

        &-s {
          padding-left: .5rem;
        }

        &-xs {
          padding-left: .25rem;
        }
      }
    }
  }
}
</style>