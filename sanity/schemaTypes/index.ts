import { type SchemaTypeDefinition } from 'sanity'
import {author}  from './author'
import { Blog } from './blog'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, Blog,playlist],
}
