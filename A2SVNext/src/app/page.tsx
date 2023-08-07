import Image from 'next/image'
import Layout from '@/components/layout'
import PostList from '@/components/postList';
function Home() {
  return (
    <Layout>
      <main className="">
        <div className="relative">
          <PostList />
        </div>
      </main>
    </Layout>
  )
}



export default Home
