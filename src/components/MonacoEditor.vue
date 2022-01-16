<template>
  <div ref="container" style="height: calc(100vh - 3.5em)"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'
import { useDarkGlobal } from '../utils'

// Import monaco
// https://github.com/vitejs/vite/discussions/1791
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  },
}

const container = ref<HTMLDivElement | null>(null)

let editor: monaco.editor.IStandaloneCodeEditor

const isDark = useDarkGlobal()

// const language = "javascript";
// const editorState = useStorage<Record<string, any>>(
//   StorageName.EDITOR_STATE,
//   {}
// );

const editorValue = { value: { typescript: 'hello luL' } }

const emit =
  defineEmits<(e: 'change', payload: typeof editorValue.value) => void>()

onMounted(() => {
  editor = monaco.editor.create(container.value!, {
    language: 'typescript',
    theme: isDark.value ? 'vs-dark' : 'vs',
  })

  emit('change', editorValue.value)

  editor.onDidChangeModelContent(
    useDebounceFn(() => {
      if (editorValue.value['typescript'] !== editor.getValue()!) {
        editorValue.value['typescript'] = editor.getValue()!
        emit('change', editorValue.value)
      }
    }, 500)
  )

  // Set values from storage on load
  if (editorValue.value['typescript']) {
    editor.setValue(editorValue.value['typescript'])
    // editor.restoreViewState(editorState.value["typescript"]);
  }
})

watch(isDark, (value) => {
  editor.updateOptions({
    theme: value ? 'vs-dark' : 'vs',
  })
})

const editorObserver = useResizeObserver(container, () => {
  editor.layout()
})

onUnmounted(() => {
  editor?.dispose()
  editorObserver.stop()
})
</script>
