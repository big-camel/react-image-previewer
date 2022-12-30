import { defineConfig } from 'tsup'
//@ts-ignore
import defaultConfig from 'tsup-config'

export default defineConfig(options => ({
  ...(defaultConfig(options) as any),
  entry: ['src/index.ts', 'src/ui/index.ts'],
  inject: ['react-shim.ts'],
}))
