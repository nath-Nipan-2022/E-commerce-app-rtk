import { useState } from "react";

const useFilter = (products) => {
  // use a state to store the filtered sub categories
  const [filterSubCats, setFilterSubCats] = useState([]);
  // state to know whether priceRange is selected / not
  const [priceRange, setPriceRange] = useState(null);
  // state to store the price order
  const [priceOrder, setPriceOrder] = useState(null);
  // state to store the ratings
  const [ratings, setRatings] = useState(null);

  // change the sub-categories state 🔥
  const handleSubCatsChange = (value) => {
    if (filterSubCats.includes(value)) {
      setFilterSubCats(filterSubCats.filter((item) => item !== value));
    } else {
      setFilterSubCats([...filterSubCats, value]);
    }
  };

  //Filter the products acc. to the filtered sub-categories 🔥👌
  let filteredProducts = products?.data.filter((product) => {
    if (filterSubCats.length === 0) {
      return true; // No sub-category filter, so all products match
    }

    const subCatNames = new Set(
      product.attributes.sub_categories.data.map((item) => item.attributes.name)
    );

    for (const subCatName of filterSubCats) {
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

    filteredProducts = filteredProducts.sort((a, b) => {
      const priceA = a.attributes.price;
      const priceB = b.attributes.price;
      return (priceA - priceB) * order;
    });
  }

  // filer by ratings
  if (ratings) {
    filteredProducts = filteredProducts?.filter((product) => {
      return product.attributes.ratings >= ratings;
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
