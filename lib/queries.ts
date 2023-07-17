import { groq } from "next-sanity";

export const siteSettings = groq`*[_type == "siteSettings"][0]{
    ...,
    navigation[]->{
        title,
        slug
    }
}`

export const allRestaurants =  groq`{
    "restaurant": *[_type == "restaurants" && slug.current == $slug][0]{
        _id,
        body,
        title,
        featuredImage,
        slug
    },
    "questions": *[_type == "categories"] | order(_createdAt asc){
        title,
        question,
        description
    }
}
    
`

export const listRestaurants = groq`
    *[_type == "restaurants"] | order(title asc){
        _id,
        title,
        featuredImage,
        slug
    }
`