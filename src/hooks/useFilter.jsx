import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useFilter = (products) => {
  const [priceRange, setPriceRange] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const subCats = searchParams.get("sub-cats")?.split(",") ?? [];
  const priceOrder = searchParams.get("price-order");
  const ratingsAbove = searchParams.get("ratings-above");

  // change the sub-categories state 🔥
  const handleSubCatsChange = (subCat) => {
    if (subCats.includes(subCat)) {
      subCats.splice(subCats.indexOf(subCat), 1);
    } else {
      subCats.push(subCat);
    }
    if (!subCats.length) {
      searchParams.delete("sub-cats");
      setSearchParams(searchParams, { replace: true });
      return;
    }
    searchParams.set("sub-cats", subCats.join(","));
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
  const setPriceOrder = (order) => {
    searchParams.set("price-order", order);
    setSearchParams(searchParams, { replace: true });
  };

  if (priceOrder) {
    let order = priceOrder === "asc" ? 1 : -1;

    filteredProducts = filteredProducts?.sort((a, b) => {
      const priceA = a.attributes.price;
      const priceB = b.attributes.price;
      return (priceA - priceB) * order;
    });
  }

  const setRatings = (ratings) => {
    if (!ratings) {
      searchParams.delete("ratings-above");
      setSearchParams(searchParams, { replace: true });
      return;
    }
    searchParams.set("ratings-above", ratings);
    setSearchParams(searchParams, { replace: true });
  };

  // filer by ratings
  if (ratingsAbove) {
    filteredProducts = filteredProducts?.filter((product) => {
      return product.attributes.ratings >= ratingsAbove;
    });
  }

  return {
    handleSubCatsChange,
    filteredProducts,
    setPriceOrder,
    setPriceRange,
    setRatings,
  };
};

export default useFilter;
