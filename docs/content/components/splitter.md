---
title: Splitter
description: A component that divides your layout into resizable sections.
name: splitter
aria: https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
---


# Splitter

<Badge>Alpha</Badge>

<Description>
A component that divides your layout into resizable sections.
</Description>

<ComponentPreview name="Splitter" />

## Features

<Highlights
  :features="[
    'Supports keyboard interaction.',
    'Supports horizontal/vertical layout.',
    'Supports nested layout.',
    'Supports Right to Left direction.',
    'Can resize across another panel.',
    'Can be mounted conditionally.'
  ]"
/>

## Installation

Install the component from your command line.

```bash
npm install radix-vue
```

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'radix-vue'
</script>

<template>
  <SplitterGroup>
    <SplitterPanel />
    <SplitterResizeHandle />
  </SplitterGroup>
</template>
```

## API Reference

### Group

Contains all the parts of a Splitter.


<!-- @include: @/meta/SplitterGroup.md -->


<DataAttributesTable
  :data="[
    {
      attribute: '[data-orientation]',
      values: ['vertical', 'horizontal'],
    }
  ]"
/>

### Panel

A collapsible section.

<!-- @include: @/meta/SplitterPanel.md -->

 
### Resize Handle

Handle that use for resizing.

<!-- @include: @/meta/SplitterResizeHandle.md -->

<DataAttributesTable 
  :data="[
    {
      attribute: '[data-state]',
      values: ['drag', 'hover', 'inactive'],
    },
    {
      attribute: '[data-disabled]',
      values: 'Present when disabled',
    },
    {
      attribute: '[data-orientation]',
      values: ['vertical', 'horizontal'],
    }
  ]" 
/>


## Examples

### Collapsible

Use the `collapsible` prop to allow the panel to collapse into `collapsedSize` when `minSize` is reached.

(`collapsedSize` and `minSize` props are required.)

```vue line=2
<template>
  <SplitterGroup collapsible :collapsed-size="10" :min-size="35">
    <SplitterPanel>
      Panel A
    </SplitterPanel>
    <SplitterResizeHandle />
    <SplitterPanel>
      Panel B
    </SplitterPanel>
  </SplitterGroup>
</template>
```

### Persist in localStorage

Use the `autoSaveId` prop to save the layout data into `localStorage`.

```vue line=2
<template>
  <SplitterGroup auto-save-id="any-id">
    …
  </SplitterGroup>
</template>
```
 

### Custom handle

Customize the handle by passing any element as the slot.

 ```vue line=6-8
<template>
   <SplitterGroup>
     <SplitterPanel>
       …
     </SplitterPanel>
     <SplitterResizeHandle>
       <Icon icon="radix-icons-drag-handle-dots-2" />
     </SplitterResizeHandle>
     <SplitterPanel>
       …
     </SplitterPanel>
   </SplitterGroup>
</template>
```
 

## Accessibility

Adheres to the [Window Splitter WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/).

### Keyboard Interactions

<KeyboardTable :data="[
    {
      keys: ['Enter'],
      description: 'If the primary pane is not collapsed, collapses the pane. If the pane is collapsed, restores the splitter to its previous position.',
    }, 
    {
      keys: ['ArrowDown'],
      description: 'Moves a horizontal splitter down.',
    },
    {
      keys: ['ArrowUp'],
      description: 'Moves a horizontal splitter up.',
    },
    {
      keys: ['ArrowRight'],
      description: 'Moves a vertical splitter to the right.',
    },
    {
      keys: ['ArrowLeft'],
      description: 'Moves a vertical splitter to the left.',
    },
    {
      keys: ['Home'],
      description: 'Moves splitter to the position that gives the primary pane its smallest allowed size. ',
    },
    {
      keys: ['End'],
      description: 'Moves splitter to the position that gives the primary pane its largest allowed size.',
    }]" />