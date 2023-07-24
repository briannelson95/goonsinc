import { supabase } from "@/lib/supabase.client";

export function ImprovedPublish(originalPublishAction: any) {
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