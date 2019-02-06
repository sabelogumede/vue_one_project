Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">

        <div class="product-image">
            <img v-bind:src="image">
        </div>

        <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>User is shipping: {{ shipping }}</p>

        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
        
        <div v-for="(variant, index) in variants"
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>

        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
                >
                Add to Cart
                </button>
        </div>
    
        <product-review @review-submitted="addReview"></product-review>

    </div>`,
    data(){
            return { 
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
    
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            review: []
            
            }
    },
    methods: {
            addToCart: function() {
                this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId )
            },
            updateProduct: function(index) {
                this.selectedVariant = index
                console.log(index)
            },
            addReview(productReview) {
                this.review.push(productReview)
            }
    },
    computed: {
            title() {
                return this.brand + ' ' + this.product;
            },
            image() {
                return this.variants[this.selectedVariant].variantImage
            },
            inStock() {
                return this.variants[this.selectedVariant].variantQuantity
            },
            shipping() {
                if (this.premium) {
                    return "Free"
                }
                    return 2.99
            }
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>
        
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        
        <p>
            <input type="button" value="Submit">
        </p>

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null
        }
    },
    methods: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
        
    }
})

var app = new Vue({
        el: '#app',
        data: {
            premium: false,
            cart: []
        },
        methods: {
            updateCart(id) {
                this.cart.push(id)
            }
        }
})