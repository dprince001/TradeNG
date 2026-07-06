"use client";

import { useRouter } from "next/navigation";
import Container from "@/app/components/layout/Container";
import { CategorySkeleton } from "@/app/components/Loader";
import useGet from "@/app/hooks/useGet";
import { useGetCategoriesQuery } from "@/app/redux/api/categoriesApiSlice";

const mockCategoryEmojis = [
  { label: "Phones", emoji: "📱" },
  { label: "Gadgets", emoji: "📱" },
  { label: "Fashion", emoji: "👕" },
  { label: "Home", emoji: "🏠" },
  { label: "Electronics", emoji: "💻" },
  { label: "Furniture", emoji: "🛋️" },
  { label: "Others", emoji: "🗂️" },
];

const CategoryRail = () => {
  const router = useRouter();
  const { data: categoriesData, isFetching: categoriesLoading } = useGet(useGetCategoriesQuery, "");

  const categories = categoriesData?.categories?.map((cat: any) => ({
    id: cat.id,
    label: cat.name,
    emoji: mockCategoryEmojis.find((c) => c.label === cat.name)?.emoji || "🛍️",
  }));

  return (
    <section id="categories" className="py-8 md:py-12 scroll-mt-20">
      <Container>
        <h2 className="text-text-primary text-lg md:text-2xl font-semibold mb-5">
          Browse by Category
        </h2>

        {categoriesLoading ? (
          <CategorySkeleton />
        ) : (
          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-7 gap-3 overflow-x-auto no-scrollbar pb-1">
            {categories?.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => router.push(`/listings?category_id=${cat.id}`)}
                className="flex flex-col flex-shrink-0 w-[74px] h-[78px] md:w-full md:h-24 rounded-[12px] border border-gray-200 items-center justify-center text-[30px] gap-1 bg-white hover:border-primary hover:shadow-sm transition-all cursor-pointer"
              >
                {cat.emoji}
                <span className="text-[#374151] text-[10px] md:text-xs font-medium">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default CategoryRail;
