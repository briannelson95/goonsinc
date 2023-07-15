import Form from '@/components/Form'
import RestauranInfo from '@/components/RestauranInfo'
import React from 'react'
import { cookies } from 'next/headers'
import { groq } from 'next-sanity'
import { client } from '@/lib/sanity.client'
import { allRestaurants } from '@/lib/queries'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const query = groq`*[_type == "restaurants"]{slug}`

    const slugs: any[] = await client.fetch(query)
    const slugRoutes = slugs.map((slug) => slug.slug.current)

    return slugRoutes.map((slug) => ({
        slug
    }))
}

export default async function SingleRestaurantPage({params: {slug}}: PageProps) {
    const page: any = await client.fetch(allRestaurants, { slug });

    if (!page) {
        notFound()
    }

    const cookieStore = cookies();
    const cookie = cookieStore.getAll()[1].value;

    // console.log(page)
    // need to pass restaurant page info to restaurantInfo component
    // need to get id of restaurant from supabase using sanity_id

    return (
        <main className='w-full'>
            <RestauranInfo 
                cookie={cookie} 
                restaurantData={page}    
            />
        </main>
    )
}
