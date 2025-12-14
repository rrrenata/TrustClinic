import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'util'

declare global {

  var TextEncoder: typeof TextEncoder

  var TextDecoder: typeof TextDecoder
}

if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = TextEncoder
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = TextDecoder
}
