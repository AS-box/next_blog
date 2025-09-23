import { create } from "zustand";

/* Category 型(最小想定)。実際のAPIレスポンス構造に合わせて随時拡張 */
export interface CategoryItem {
  id?: number | string;
  category_id?: number | string;
  topics_category_id?: number | string;
  name?: string;
  category_nm?: string;
  [k: string]: unknown;
}

interface PostFilterState {
  /* 既存: 単一タグ選択 */
  selectedTag: string | null;
  setSelectedTag: (tag: string) => void;
  toggleTag: (tag: string) => void;
  clearTag: () => void;

  /* contents_type_list による複数選択フィルタ */
  selectedContentTypes: string[];
  setSelectedContentTypes: (list: string[]) => void;
  toggleContentType: (v: string) => void;
  clearContentTypes: () => void;

  /* カテゴリー管理 (クライアント初回取得保持) */
  categories: CategoryItem[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  categoriesFetchedAt: number | null;
  fetchCategories: (force?: boolean) => Promise<void>;
  setCategories: (list: CategoryItem[]) => void;
  clearCategories: () => void;
}

const CATEGORY_TTL_MS = 1000 * 60 * 10; // 10分

export const usePostFilterStore = create<PostFilterState>((set, get) => ({
  /* 既存タグ系 */
  selectedTag: null,
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  toggleTag: (tag) =>
    set((s) => ({
      selectedTag: s.selectedTag === tag ? null : tag,
    })),
  clearTag: () => set({ selectedTag: null }),

  /* contents_type_list フィルタ系 */
  selectedContentTypes: [],
  setSelectedContentTypes: (list) => set({ selectedContentTypes: list }),
  toggleContentType: (v) =>
    set((s) => {
      const exists = s.selectedContentTypes.includes(v);
      return {
        selectedContentTypes: exists
          ? s.selectedContentTypes.filter((x) => x !== v)
          : [...s.selectedContentTypes, v],
      };
    }),
  clearContentTypes: () => set({ selectedContentTypes: [] }),

  /* カテゴリー */
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
  categoriesFetchedAt: null,

  setCategories: (list) =>
    set({
      categories: list,
      categoriesFetchedAt: Date.now(),
    }),
  clearCategories: () =>
    set({
      categories: [],
      categoriesFetchedAt: null,
    }),

  fetchCategories: async (force = false) => {
    const {
      categories,
      categoriesFetchedAt,
      categoriesLoading,
    } = get();

    if (
      !force &&
      !categoriesLoading &&
      categories.length > 0 &&
      categoriesFetchedAt &&
      Date.now() - categoriesFetchedAt < CATEGORY_TTL_MS
    ) {
      // TTL 内なので再取得しない
      return;
    }

    set({ categoriesLoading: true, categoriesError: null });
    try {
      const res = await fetch("/api/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`);
      }
      const data = await res.json();

      // list / items / 直接配列 など柔軟に対応
      const list: CategoryItem[] = Array.isArray(data?.list)
        ? data.list
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data)
            ? data
            : [];

      set({
        categories: list,
        categoriesLoading: false,
        categoriesFetchedAt: Date.now(),
      });
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "カテゴリー取得に失敗しました";
      set({
        categoriesLoading: false,
        categoriesError: message,
      });
    }
  },
}));
