import { defineField, defineType } from 'sanity';

export const restaurants = defineType({
    name: 'restaurants',
    title: 'Restaurants',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required().max(96)
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'mainImage',
        })
    ],
})