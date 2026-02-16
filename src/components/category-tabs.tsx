"use client";

import { memo } from "react";
import FilterButton from "./filter-button";
import type { Category } from "~/constants/categories";

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (topic: string | null) => void;
}

const CategoryTabs = memo(function CategoryTabs({
  categories,
  selectedCategory,
  onSelect,
}: CategoryTabsProps) {
  return (
    <div className="w-full">
      <span
        className="mb-2 block text-xs font-semibold tracking-wider uppercase sm:mb-3 md:mr-3 md:mb-0 md:inline"
        style={{ color: "rgb(var(--color-text-muted))" }}
      >
        Category
      </span>
      <div className="flex max-w-full flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0">
        <FilterButton
          active={selectedCategory === null}
          onClick={() => onSelect(null)}
        >
          All
        </FilterButton>
        {categories.map((category) => (
          <FilterButton
            key={category.topic}
            active={selectedCategory === category.topic}
            onClick={() => onSelect(category.topic)}
          >
            {category.label}
          </FilterButton>
        ))}
      </div>
    </div>
  );
});

export default CategoryTabs;
