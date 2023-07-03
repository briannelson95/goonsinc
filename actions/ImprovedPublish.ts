export function ImprovedPublish(originalPublishAction: any) {
    const BetterAction = (props: any) => {
        const originalResult = originalPublishAction(props);

        if (props.type == "restaurants") {
            return {
                ...originalResult,
                onHandle: () => {
                    // custom function for supabase will go here
                    console.log('Supabase Insert');
                    console.log(props)
    
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