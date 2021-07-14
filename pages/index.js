
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export default function Home(props) {

  const { users, posts,tags } = props;
  console.log(users,posts,tags);
  return (
    <div>
      <h2>Users</h2>
      {
        users.map(user =>{
          return(
            <div>
              <h1>Name: {user.firstName} {user.lastName}</h1>
              <p>Email: {user.email}</p>
            </div>
          )
        })
      }
      <h2>Posts</h2>
      {
        posts.map(post =>{
          return(
            <div>
              <h5>Title: {post.title}</h5>
              <p>Content: {post.content}</p>
            </div>
          )
        })
      }
      <h2>Tags</h2>
      {
        tags.map(tag =>{
          return(
            <div>
              <h6>Name: {tag.name}</h6>
              <p>description: {tag.description}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql`
      query{
        allUsers{
          id,
          firstName,
          lastName,
          email
        }
        allTags{
          id,
          name,
          description
        }
        allPosts{
          id,
          title,
          content
        }
      }
    `
  })
  console.log(data);
  return {
    props: {
      users: data.allUsers,
      posts: data.allPosts,
      tags: data.allTags,
    }
  }
}