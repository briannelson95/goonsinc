"use client"

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react'

export default function Featured() {
    const [featured, setFeatured] = useState();
    let data: any;
    const supabase = useSupabaseClient();

    useEffect(() => {
        supabase.from('restaurants')
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
            .then(result => {
                data = result.data
                console.log(data)

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
                  
                    let highestRatedRestaurant = null;
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
                  
                  console.log("Highest Rated Restaurant:", highestRatedRestaurant);
                  
            });

    }, [supabase])

    return (
        <div>Featured</div>
    )
}
