const { json } = require("express");

// pagination and searchfilters
// feature Class
class Features {
//  costtructor("keyword","laptop")
    constructor(query, querystr) {
        this.query = query; 
        this.querystr = querystr;
    }
    // function for Search
    search() {
        const keyword = this.querystr.keyword ?
            {// This logic will execute when you get kwyword
                // we are finding by name
                name: {
                    $regex: this.querystr.keyword,
                    $options: "i" // ignore lowercase and upper case
                }
            } : {};
        this.query = this.query.find({ ...keyword }) // update the query
        return this //Method Chaining: return this ki madad se aapko Features class ke objects ko method chaining ki tarah istemal karne ka mauka milta hai. Yani aap ek hi line mein multiple methods ko call karke chaining kar sakte hain.
    }
    // Function for filter
    filter() {
        // first creating a fuctionality that filters category
        const queryCopy = { ...this.querystr }; // creating copy of this.query
        // console.log(queryCopy) // console.log before change 
        const removefields = ["keyword", "page", "limit",] // Here we are modifying query by saying that in this particular filter function i dont need these three things mention in emove filter array
        removefields.forEach((key) => delete queryCopy[key])
        // Filter for Price and rating 
        // console.log(queryCopy); // console.log after change 
        let querystr = JSON.stringify(queryCopy) // again setting querystr 
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
        // console.log(querystr) // we will get query object
        this.query = this.query.find(JSON.parse(querystr)) // update the query // converting again to object
        // jab bi hum yahan par this.query likein tu samj jana hum ny Product.find() likha ha  // This is case sensitive laptop and Laptop considers differently
        return this
    }
    // Function for handling Pagination

    Pagination(resultperpage) {
const curentpage=this.querystr.page || 1   // taking the page form query and if page not available take the 1 as default
const skipProductsAlreadyrendered=resultperpage*(curentpage-1);
this.query=this.query.limit(resultperpage).skip(skipProductsAlreadyrendered)  // Here limit and skip are the built methods of mongodb 
return this
    }
}
module.exports = Features;