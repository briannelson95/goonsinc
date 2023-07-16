import { groq } from "next-sanity";

export const siteSettings = groq`*[_type == "siteSettings"][0]{
    ...,
    navigation[]->{
        title,
        slug
    }
}`

export const allRestaurants =  groq`*[_type == "restaurants" && slug.current == $slug][0]{
    _id,
    body,
    title,
    featuredImage,
    slug
}`

export const listRestaurants = groq`
    *[_type == "restaurants"] | order(title asc){
        _id,
        title,
        featuredImage,
        slug
    }
`