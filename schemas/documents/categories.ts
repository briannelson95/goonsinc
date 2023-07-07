import { defineField, defineType } from 'sanity';

export const categories = defineType({
    name: 'categories',
    title: 'Categories',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
    ],
})