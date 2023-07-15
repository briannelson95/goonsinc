import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'contact',
            title: 'Contact',
            type: 'object',
            fields: [
                defineField({
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    validation: (Rule: any) =>
                        Rule.regex(
                            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                            {
                                name: 'Email',
                                invert: false
                            }
                        )
                }),
                defineField({
                    name: 'phone',
                    title: 'Phone Number',
                    type: 'string',
                    validation: (Rule: any) =>
                        Rule.regex(
                            /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                            {
                                name: 'Phone',
                                invert: false
                            }
                        )
                })
            ]
        }),
        defineField({
            name: 'navigation',
            title: 'Navigation',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'pages' }]
                },
            ]
        }),

    ],
})