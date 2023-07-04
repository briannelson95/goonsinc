import { defineField, defineType } from 'sanity';

export const mainImage = defineType({
    name: 'mainImage',
    title: 'Main Image',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Alternative text for SEO and accessibility',
            validation: Rule => Rule.required().warning('Alternative text is required').max(96)
        })
    ],
})