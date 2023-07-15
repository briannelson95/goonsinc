type Question = {
    question: string;
    category: string;
    scores?: number[];
}

type PageProps = {
    params: {
        slug: string
    }
}

type FeaturedImage = {
    image: any;
    _type: 'mainImage';
    alt: string
}

interface Restaurant {
    _id: string;
    body: any[];
    title: string;
    featuredImage: FeaturedImage;
    slug: {
        current: string;
        _type: 'slug';
    };
}