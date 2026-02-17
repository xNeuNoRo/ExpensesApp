"use client";

import { formatCurrency } from "@/helpers/formatters";
import { useCategories } from "@/hooks/categories/useQueries";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import Link from "next/link";
import { IoCreate, IoShapes, IoTrash } from "react-icons/io5";

export default function CategoryList() {
  const { data: categories, isLoading } = useCategories();

  const getIcon = (iconKey?: string | null) => {
    if (!iconKey || !CATEGORY_ICONS[iconKey]) return IoShapes; // Default
    return CATEGORY_ICONS[iconKey];
  };

  if (isLoading)
    return <div className="h-64 animate-pulse rounded-xl bg-surface" />;

  return (
    <div className="rounded-xl border border-border bg-background shadow-sm">
      <div className="relative rounded-xl overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase text-muted">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Presupuesto</th>
              <th className="px-6 py-3 text-center">Color</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories?.length ? (
              categories.map((cat) => {
                const IconComponent = getIcon(cat.iconKey) || IoShapes;

                return (
                  <tr
                    key={cat.id}
                    className="hover:bg-surface/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-main">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span>{cat.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {formatCurrency(cat.monthlyBudget)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {cat.color && (
                        <div
                          className="mx-auto h-6 w-6 rounded-full border border-border"
                          style={{ backgroundColor: cat.color }}
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/categories?action=edit-category&categoryId=${cat.id}`}
                          scroll={false}
                          className="rounded-lg p-2 text-muted hover:bg-surface hover:text-primary transition-colors"
                          title="Editar categoría"
                        >
                          <IoCreate className="h-5 w-5" />
                        </Link>
                        <Link
                          href={`/categories?action=delete-category&categoryId=${cat.id}`}
                          scroll={false}
                          className="rounded-lg p-2 text-muted hover:bg-surface hover:text-danger transition-colors"
                          title="Eliminar categoría"
                        >
                          <IoTrash className="h-5 w-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted">
                  No hay categorías registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
