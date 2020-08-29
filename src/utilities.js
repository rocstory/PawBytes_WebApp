/**
 * This file contains functions that are used across multiple components.
 */

import {get_products_from_db} from './pawbytesDB';

export async function fetchProductsFromDB()
{
    // fetch array of products from database
    const products = await get_products_from_db();

    const categories = createCategoriesMap(products);

    return categories;
};



export function formatToCurrency(value)
{
    const formatter = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    let currency = formatter.format(value); 
    return currency;
};

function createCategoriesMap(products)
{
    let categories = new Map();
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

    return categories;
}
