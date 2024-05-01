import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Albums from "./components/albums";
import Posts from "./components/posts";
import CreatePost from "./components/createPost";

export default async function Detail({
  params,
}: {
  params: { userId: number };
}) {
  const userId = params.userId;

  return (
    <Tabs defaultValue="post">
      <TabsList className="max-w-xl mx-auto grid w-full grid-cols-2">
        <TabsTrigger value="post">Posts</TabsTrigger>
        <TabsTrigger value="album">Album</TabsTrigger>
      </TabsList>
      <div className="max-w-xl mx-auto my-2">
        <CreatePost userId={userId} />
      </div>
      <TabsContent value="post" className="max-w-xl mx-auto">
        <Posts userId={userId} />
      </TabsContent>
      <TabsContent value="album">
        <Albums userId={userId} />
      </TabsContent>
    </Tabs>
  );
}
