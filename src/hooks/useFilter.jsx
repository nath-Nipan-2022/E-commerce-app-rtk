import { useSearchParams } from "react-router-dom";

const useFilter = (products) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const subCats = searchParams.get("sub-cats")?.split(",") ?? [];
  const priceOrder = searchParams.get("price-order");
  const ratingsAbove = searchParams.get("ratings-above");
  const priceRange = Number(searchParams.get("price-range"));
  const color = searchParams.get("color");

  const handleFiltersChange = (key, value) => {
    if (!value || color === value) {
      searchParams.delete(key);
    } else if (key === "sub-cats") {
      subCats.includes(value)
        ? subCats.splice(subCats.indexOf(value), 1)
        : subCats.push(value);

      subCats.length === 0
        ? searchParams.delete(key)
        : searchParams.set(key, subCats.join(","));
    } else {
      searchParams.set(key, value);
    }

    setSearchParams(searchParams, { replace: true });
  };

  //Filter the products acc. to the filtered sub-categories 🔥👌
  let filteredProducts = products?.data.filter((product) => {
    if (subCats.length === 0) {
      return true; // No sub-category filter, so all products match
    }

    const subCatNames = new Set(
      product.attributes.sub_categories.data.map((item) => item.attributes.name)
    );

    for (const subCatName of subCats) {
      if (subCatNames.has(subCatName)) {
        return true; // At least one matching sub-category found
      }
    }

    return false; // No matching sub-category found
  });

  // filter by price range
  if (priceRange) {
    filteredProducts = filteredProducts?.filter((product) => {
      return product.attributes.price <= priceRange;
    });
  }

  // filter by price order
  if (priceOrder) {
    let order = priceOrder === "asc" ? 1 : -1;

    filteredProducts = filteredProducts?.sort((a, b) => {
      const priceA = a.attributes.price;
      const priceB = b.attributes.price;
      return (priceA - priceB) * order;
    });
  }

  // filer by ratings
  if (ratingsAbove) {
    filteredProducts = filteredProducts?.filter((product) => {
      return product.attributes.ratings >= ratingsAbove;
    });
  }

  // filter by color
  if (color) {
    filteredProducts = filteredProducts?.filter((product) => {
      return product.attributes.colors.data.some((clr) => {
        return clr.attributes.name === color;
      });
    });
  }

  return {
    filteredProducts,
    handleFiltersChange,
    filterValues: {
      subCats,
      priceOrder,
      ratingsAbove,
      priceRange,
      color,
    },
  };
};

export default useFilter;
