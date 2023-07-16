import Form from '@/components/Form'
import RestauranInfo from '@/components/RestauranInfo'
import React from 'react'
import { groq } from 'next-sanity'
import { client } from '@/lib/sanity.client'
import { allRestaurants } from '@/lib/queries'
import { notFound } from 'next/navigation'
import { headers } from "next/headers";

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

    const ip = headers().get("x-forwarded-for");
    console.log(`USER IP: ${ip}`)

    if (!page) {
        notFound()
    }

    return (
        <main className='w-full'>
            <RestauranInfo 
                ip={ip} 
                restaurantData={page}
            />
            <p>
                IP Address: {`IP: ${ip != null && ip != undefined ? ip : 'null'}`}
            </p>
        </main>
    )
}
