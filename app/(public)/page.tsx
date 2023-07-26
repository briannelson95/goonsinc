import Featured from '@/components/Featured'
import { client } from '@/lib/sanity.client';
import { supabase } from '@/lib/supabase.client';
import { groq } from 'next-sanity';
import Image from 'next/image'

async function getRestaurant() {
  const { data, error }: any = await supabase
    .from('restaurants')
    .select(`
      title,
      id,
      ratings (
          filling,
          wrap,
          ratio,
          accoutrement,
          crisp
      )
    `)
    .order('id', { foreignTable: 'ratings', ascending: false })

  const calculateAverageScores = (restaurant: any) => {
    const ratingsCount = restaurant.ratings.length;
    const scoresSum = restaurant.ratings.reduce((acc: any, rating: any) => {
      const totalScore = Object.values(rating).reduce((sum: any, score: any) => sum + score, 0);
      return acc + totalScore;
    }, 0);
    return scoresSum / (Object.keys(restaurant.ratings[0]).length * ratingsCount);
  };

  const findHighestRatedRestaurant = (data: any) => {
    if (!data || data.length === 0) return null;
  
    let highestRatedRestaurant: any;
    let highestAverageScore = -Infinity;
  
    data.forEach((restaurant: any) => {
        const averageScore = calculateAverageScores(restaurant);
        if (averageScore > highestAverageScore) {
            highestAverageScore = averageScore;
            highestRatedRestaurant = restaurant;
        }
    });
  
    return highestRatedRestaurant;
  };
    
  const highestRatedRestaurant = findHighestRatedRestaurant(data);
    
  // console.log("Highest Rated Restaurant:", highestRatedRestaurant.title);
  return highestRatedRestaurant
};

export default async function Home() {
  const restaurant = await getRestaurant()
  const title = restaurant.title
  const restaurantQuery = groq`*[_type == 'restaurants' && title == '${title}'][0]{
    title,
    slug,
    _id,
    body,
    featuredImage,
  }`
  const sanityData = await client.fetch(restaurantQuery)

  return (
    <main>
      <div className="w-full">
        <Featured restaurant={sanityData}/>
      </div>
    </main>
  )
}
