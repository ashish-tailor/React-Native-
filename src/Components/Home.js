import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DropDown from "./DropDown";
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";
import {
  fetchCategories,
  fetchAllProducts,
  fetchProductsByCategory,
  fetchProductsBySearchQuery,
} from "../utils/Api";

const Home = () => {
  const [categoriesDatas, setCategoriesDatas] = useState([]);
  const [filteredProductsData, setFilteredProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const CategoriesData = async () => {
    setLoading(true);
    const categories = await fetchCategories();
    setCategoriesDatas(categories);
    setLoading(false);
  };

  const AllProductsData = async (page = 0) => {
    setLoading(true);
    const skip = page * 20;
    const productsData = await fetchAllProducts(20, skip);
    setFilteredProductsData(productsData.products);
    setTotalProducts(productsData.total);
    setLoading(false);
  };

  const handleSelectCategory = async (category, page = 0) => {
    setLoading(true);
    setSelectedCategory(category);
    setCurrentPage(page); 
    const skip = page * 20;
    const productsData = await fetchProductsByCategory(category, 20, skip);
    setFilteredProductsData(productsData.products);
    setTotalProducts(productsData.total);
    setLoading(false);
  };

  const handlePageChange = async (pageNumber) => {
    if (pageNumber >= 0 && pageNumber * 20 < totalProducts) {
      setCurrentPage(pageNumber);
      if (selectedCategory === "Select Category") {
        if (searchQuery) {
          await handleSearch(searchQuery, pageNumber);
        } else {
          await AllProductsData(pageNumber);
        }
      } else {
        await handleSelectCategory(selectedCategory, pageNumber);
      }
    }
  };

  const handleSearch = async (query, page = 0) => {
    setLoading(true);
    setSelectedCategory("Select Category"); 
    setCurrentPage(page); 
    const skip = page * 20;
    const productsData = await fetchProductsBySearchQuery(query, 20, skip);
    setFilteredProductsData(productsData.products);
    setTotalProducts(productsData.total);
    setLoading(false);
  };

  useEffect(() => {
    CategoriesData();
    AllProductsData();
    setLoading(true);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        AllProductsData();
      }
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const numberOfPages = Math.ceil(totalProducts / 20);
  const pageNumnber = Array.from(
    { length: numberOfPages },
    (_, idx) => idx + 1
  );

  return (
    <View style={styles.mainContainer}>
      {/* header */}
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Product</Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            AllProductsData();
            setSelectedCategory("Select Category");
          }}
        >
          <Text>All</Text>
        </TouchableOpacity>
      </View>

      {/* search bar */}
      <View>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {/* dropdown */}
      <View>
        <DropDown
          items={categoriesDatas}
          onSelectItem={(category) => handleSelectCategory(category)}
          defaultItem={selectedCategory}
        />
      </View>

      {/* list */}
      {loading ? (
        <View style={styles.loadingMainView}>
          <ActivityIndicator size="large" color="#545454" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={styles.listView}>
          <ProductList data={filteredProductsData} />
        </View>
      )}

      {/* footer */}
      <View style={styles.footerView}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <Text>Previous</Text>
        </TouchableOpacity>
        <View style={styles.pageNumberStyle}>
          {pageNumnber
            .slice(
              Math.max(0, currentPage - 1),
              Math.min(numberOfPages, currentPage + 2)
            )
            .map((page) => (
              <TouchableOpacity
                key={page}
                style={{
                  borderWidth: 1,
                  padding: 5,
                  borderRadius:10,
                  backgroundColor: page === currentPage + 1 ? "black" : "lightgray",
                }}
                onPress={() => handlePageChange(page - 1)}
              >
                <Text
                  style={{
                    color: page === currentPage + 1 ? "white" : "black",
                  }}
                >
                  {page}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={(currentPage + 1) * 20 >= totalProducts}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 30,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: { fontSize: 20, fontWeight: "700" },
  headerButton: { borderWidth: 1, paddingHorizontal: 20, paddingVertical: 5 },
  listView: {
    height: 450,
  },
  loadingMainView: { flex: 1, justifyContent: "center", alignItems: "center" },
  footerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  pageNumberStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  paginationButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius:15
  },
});
