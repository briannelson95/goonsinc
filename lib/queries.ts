import { groq } from "next-sanity";

export const siteSettings = groq`*[_type == "siteSettings"][0]`

export const allRestaurants =  groq`*[_type == "restaurants" && slug.current == $slug][0]{
    _id,
    body,
    title,
    featuredImage,
    slug
}`