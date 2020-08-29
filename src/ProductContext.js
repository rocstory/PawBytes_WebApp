import React from 'react';
import products from "./fixtures/product_data.json";

export const ProductContext = React.createContext();

class ProductProvider extends React.Component
{
    state = {
        categories: new Map()
    }

    fetchProductsFromDatabase = async () =>
    {
        return products;
    }

    initializeCategories(products)
    {
        let categories = this.state.categories;
        let category_name = null;
        let category_arr = [];

        products.forEach(product =>
        {
            category_name = product.category.toLowerCase();
            if (!categories.has(category_name))
            {
                category_arr = [product];
            }
            
            else
            {
                category_arr = categories.get(category_name);
                category_arr.push(product);
            }

            categories.set(category_name, category_arr);
        });

        this.setState( prevState => { return {categories: categories}});
    }

    async fetchData ()
    {
        if (this.state.categories.isEmpty())
        {
            let products =  await this.fetchProductsFromDatabase();
            this.initializeCategories(products);
        }
    }

    render() {
        return (
            <ProductContext.Provider value={{
                categories: this.state.categories,
                fetchProducts: () => {this.fetchData()},
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
} // Product Provider

export default ProductProvider; 