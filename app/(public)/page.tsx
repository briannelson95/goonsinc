import Featured from '@/components/Featured'
import { supabase } from '@/lib/supabase.client';
import Image from 'next/image'

export default async function Home() {
  const { data, error }: any = await supabase
    .from('restaurants')
    .select()

  console.log(data)

  return (
    <main>
      Homepage
      {/* <Featured /> */}
    </main>
  )
}
