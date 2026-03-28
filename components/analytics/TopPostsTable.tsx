"use client";

import { TrendingUp, Minus } from "lucide-react";
import Link from "next/link";

export interface PostData {
  id: number;
  title: string;
  date: string;
  views: string;
  likes: string;
  comments: string;
  engRate: string;
  reach: string;
}

interface TopPostsTableProps {
  posts: PostData[];
}

export default function TopPostsTable({ posts }: TopPostsTableProps) {
  // Sorting logic could handle numeric conversion for "k" etc., but keeping it simple for mock strings.
  const sortedPosts = [...posts];

  // Dummy image mapped by ID for variation
  const getMockImg = (id: number) => {
    const imgs = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYVIqvhX1yurnJ0fh3KMBhAGykko8mH38NyFN8B5rtFWhepqHJXSA-k_VzZUTMcS-IMFnJZMkJhe6bPD-au3Tv3fEfF733Y9qUnsouZs_V1z1lvIcJvlSaJr2LJD3maceF8qNZX6HOUaGj-bJ_FIIqIer0x1U9hr64p79OOrGaSsSN6svI9F3wn19Hk1PUU8e_MepipVV9G-mUi0zjaaS805gHrflOPbtH--kG5inNWVKYzh6mlZdiiF37T5RcJwxW33SGTKTGEPzs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDA5BTKI1Os6l9Y50ZEYLuvZe5IH8nFOvAhzGi-qVKeGo-9ECFrbLQJHOvechYWJcWPXQWteP4bvfGtyBSXUZb5EGa2CjN_-9XCUbYHh2_BI6QZoD-68_oLbVwmp8RdewhFw1nDxV9xLBIGiTsQqAtuPgifHzAmJ7R1yWr6a7R1IvIu9_3soMtZs-imOzFuPxvQo-7WsGeUh3ikPl9Zbld_1sKRqHeKUNnk6UsRHCVw0OiOv4KnDVtpmnYxPjIXguORWSyqqs1vdtu3",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ3Q93pI1703Ly1XlW20Lo_ME2WC2yhep2AR9trKw7FkU1HEmYdvN-fb8sCBUqWusRybBbCrYg4SDMH0RMZamya_GcaA8PSVzc-atyqD_L22CT-UdddK7d1Z8SZMD1trCekGSupXcG5wYQnTdo85Vwn4SDeHncpHaEawzfzy7AsM5ToNJ4TLlib7BbrQExU6D_fEFZf8uy0KjzXgz-RTpM1h2MuXO3WTXx2DEofZetogtn3YCYa7ritTLLA37QxwCUg-_EPOKnmHC4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwZ-mzxeqe15HpO1gqwKni76kEOw56LWeA2UcxpPn2058D9Ihow6x_R0lkoj6IbgY-XoXGa-hRFBrvDk-GY8X6TdjaihCDa05aUSwwMjNTUwR3FkAS3cUNGEw1Y6Q2-Zqn-WYrQEdhfTNglieHyCU89M7hrNTtOEDd9Vc3WkKM4z0Z0XJy_qgnW795cECXFa1gsAYaHVscdoPc-PRInExeCO9GvQEk3myseWN8n8A52xSw9KoLjp8UwYFI3gP9a4DKRkyMMs-4LyoE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBz00Xymc-xCTAwqaa8VxcgscdDt-nz-l8DKRC7LD8ts60T5QK7aEb6hFvoSjLG3ZEIQfxupqJU5PLI0TT4PSkOggiQYbcQPZiM6TKBgEkSfFAAz3sWNSxlXkwxybj6tknF2ZIGBWZPvjpB8nlyOL86TVxFrAgl9NpHLTGxItVgNp2zROxx9N6zBemMrhqEY5a_JuXt5u28G5dXxXdE5DWuC6rZa-vTaDglCcnk9o7Dy9DuLMsClRt2FcztHnFvpMe4jKOhOl8YtJaE"
    ];
    return imgs[(id - 1) % imgs.length];
  };

  const getType = (id: number) => {
    const types = ["Reel", "Carousel", "Static", "Reel", "Static"];
    return types[(id - 1) % types.length];
  };

  return (
    <div className="bg-[#1d1f2b] rounded-2xl overflow-hidden border border-[#484554]/5">
      <div className="p-6 border-b border-[#484554]/10 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#e1e1f2]">Top performing posts</h3>
        <button className="text-sm font-bold text-[#c9bfff] hover:text-[#baaeff] transition-colors">View all content</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-[#191b26]">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-[#c9c4d7] uppercase tracking-widest cursor-pointer hover:text-[#e1e1f2] transition-colors">Content</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#c9c4d7] uppercase tracking-widest cursor-pointer hover:text-[#e1e1f2] transition-colors">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#c9c4d7] uppercase tracking-widest cursor-pointer hover:text-[#e1e1f2] transition-colors">Views</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#c9c4d7] uppercase tracking-widest cursor-pointer hover:text-[#e1e1f2] transition-colors">Engagement</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#c9c4d7] uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#484554]/5">
            {sortedPosts.map((post, i) => (
              <tr key={post.id} className="hover:bg-[#272935]/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 rounded-lg bg-[#323440] overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-full h-full object-cover" alt="Content thumbnail" src={getMockImg(post.id)} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#e1e1f2] line-clamp-1">{post.title}</p>
                      <span className="text-[10px] font-medium text-[#c9c4d7] px-1.5 py-0.5 bg-[#272935] rounded mt-1 inline-block">
                        {getType(post.id)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm text-[#c9c4d7]">{post.date}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-bold text-[#e1e1f2]">{post.views}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#e1e1f2]">{post.engRate}</span>
                    {i % 3 !== 2 ? (
                      <TrendingUp className="text-[#4caf50]" size={16} />
                    ) : (
                      <Minus className="text-[#c9c4d7]" size={16} />
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <Link href={`/analytics/post/${post.id}`} className="text-xs font-bold text-[#c9bfff] hover:underline">
                    View post
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
