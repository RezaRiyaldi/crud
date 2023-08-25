import dayjs from "dayjs";
import Link from "next/link";

const getPosts = async () => {
  const res = await fetch(process.env.BASE_URL + '/api/posts', { next: { revalidate: 0 } });
  return await res.json();
}

function formatDateTime(timestamp:string) {
  return dayjs(timestamp).format('HH:mm - D MMMM YYYY');
}


export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container w-[80%] mt-10 mx-auto">
      <Link href={'create'} className="btn btn-neutral">Create</Link>

      {posts.posts?.map((post: any, i: number) => (

        <div className="card bg-base-100 border mt-3" key={i}>
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-sm text-zinc-400">{formatDateTime(post.createdAt)}</p>
            <div className="card-actions mt-3">
              <button className="btn btn-primary btn-sm ">Update</button>
              <button className="btn btn-ghost btn-sm text-red-600">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
