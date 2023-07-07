import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@/lib/supabaseClient";

export function ImprovedPublish(originalPublishAction: any) {
    const supabase = useSupabaseClient();
    const newSupabase = supabaseClient;
    const BetterAction = (props: any) => {
        const originalResult = originalPublishAction(props);

        if (props.type == "restaurants") {
            return {
                ...originalResult,
                onHandle: () => {
                    // custom function for supabase will go here
                    supabase.from('restaurants')
                        .insert({
                            sanity_id: props.id,
                            title: props.draft.title
                        })
                        .then(response =>  {
                            console.log(response)

                            if (!response.error) {
                                return
                            }
                        })
    
                    originalResult.onHandle();
                }
            }
        } else if (props.type == "categories") { 

            return {
                ...originalResult,
                onHandle: () => {
                    supabase.from('categories')
                        .insert({
                            title: props.draft.title,
                        })
                        .then(result => {
                            console.log(result)
                            if(!result.error) return
                        })

                    originalResult.onHandle();
                }

            }
        } else {
            // returns original function if type != restaurants
            return {
                ...originalResult,
                onHandle: () => {
                    originalResult.onHandle()
                }
            }
        }
    }

    return BetterAction;
}