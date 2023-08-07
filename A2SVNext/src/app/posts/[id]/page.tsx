import Layout from '@/components/layout'
import React from 'react'
import IndividualPost from '@/components/individualPost'

type Props = {
  params: {
    id: string;
  };
};

function Posts({ params }: Props) {
  return (
    <Layout>
      <IndividualPost params={params}/>
    </Layout>
  )
}

export default Posts