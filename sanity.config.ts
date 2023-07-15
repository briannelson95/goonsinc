import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '@/schemas'
import { ImprovedPublish } from './actions/ImprovedPublish'
import { deskStructure } from './deskStructure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'default',
  title: 'Goons Inc',
  basePath: '/admin',

  projectId,
  dataset,

  plugins: [
    deskTool({
      structure: deskStructure,
    }), 
    visionTool(),
    unsplashImageAsset(),
  ],

  document: {
    actions: (prev) =>
      prev.map((originalAction) => (originalAction.action === "publish" ? ImprovedPublish(originalAction) : originalAction))
  },

  schema: {
    types: schemaTypes,
  },
})
