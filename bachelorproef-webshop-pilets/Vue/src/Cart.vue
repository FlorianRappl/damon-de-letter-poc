<template>
  <div class="container">
    <div v-if="cart.length == 0">
      <h3>I'm empty.. Maybe you can add some products?</h3>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md">
          <h3>My shopping cart</h3>
        </div>
        <div class="col-md">
          <h3>{{cart.length}} product<span v-if="cart.length > 1">s</span> </h3>
        </div>
      </div>
      <hr />
    </div>
    <div v-if="cart.length > 0">
      <div class="rowgap" v-for="item in cart" :key="item.name" v-if="item.quantity === 1">
        <div class="row">
          <div class="col-md-4">
            <img :src="item.image" alt="image" width="300px" />
          </div>
          <div class="col-md-3">
            <b>Name:</b> {{item.name}}
          </div>
          <div class="col-md-3">
            <b>€{{item.price}}</b>
          </div>
          <div>
            <b>Quantity:</b> {{item.quantity}}
          </div>
          <div>
            <remove-button :item="item" @removeFromCart="removeFromCart"></remove-button>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in cart" :key="item.product_id" v-if="item.quantity > 1 && index === cart.findIndex(i => i.product_id === item.product_id)">
        <div class="rowgap">
          <div class="row">
            <div class="col-md-4">
              <img :src="item.image" alt="image" width="300px" />
            </div>
            <div class="col-md-3">
              <b>Name:</b> {{item.name}}
            </div>
            <div class="col-md-3">
              <b>€{{item.price}}</b>
            </div>
            <div>
              <b>Amount:</b> {{item.quantity}}
            </div>
            <div>
              <remove-button :item="item" @removeFromCart="removeFromCart"></remove-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="subtotal">
       <div> <span><b>Subtotal:</b> €{{subtotal.toFixed(2)}}</span></div>
       <div class="korting" v-if="kortingsCodeGebruikt"><b>Discount (25%):</b> {{ kortingsBedrag.toFixed(2) }}</div>
        <div class="totaal"><b>Total:</b> €{{totaal.toFixed(2)}}</div>
        <div><button @click="order">CHECKOUT NOW</button></div>
      </div>
      <hr/>
      <div>USE A DISCOUNT CODE:
        <input
        :value="kortingscode"
        @input="event => kortingscode = event.target.value">
        <button @click="valideerCode">use code</button>
      </div>
      <div v-if="error" class="errorCode">This discount code is not valid!</div>
      <hr />
      <div>
        <h4>Items that you might like...</h4>
      </div>
      
    </div>
  </div>
</template>

<script>
import RemoveButton from './RemoveButton.vue'

export default {
  name: 'Cart',
  props: ['cart'],
  components: {
    RemoveButton
  },
  data: function() {
    return {
      cartMock: this.cart,
      korting: 0.25,
      totaal: 0,
      subtotal: 0,
      kortingscode:"",
      kortingsCodeGebruikt: false,
      error: false,
      kortingsBedrag: 0,
    }
  },
  methods: {
    removeFromCart(item) {
      this.$emit("removeFromCart", item);
    },
    applyDiscount: function() {
      if (this.kortingsCodeGebruikt) {
        this.totaal = this.subtotal - (this.subtotal * this.korting)
      } else {
        this.totaal = this.subtotal
      }
    },
    valideerCode: function() {
      if (this.kortingscode === "DAMON25") {
        this.kortingsCodeGebruikt = true
        this.error = false
        this.cartKorting()
        this.applyDiscount()
      } else {
        this.kortingsCodeGebruikt = false
        this.error = true
        this.cartSubtotal();
      }
    },
    cartKorting: function() {
      this.kortingsBedrag = this.cart.reduce((accumulator, item) => accumulator + (item.price * item.quantity * this.korting), 0)
    },
    cartSubtotal: function() {
      console.log(this.cart)
      console.log("subtotal", this.cart.map(item => item.price * item.quantity))
      this.subtotal = this.cart.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0)
      this.totaal = this.subtotal
    },
    order: function() {
      this.$emit("order", this.cart)
    }
  },
  mounted () {
    this.cartSubtotal()
  }
}
</script>

<style>
.container {
  align-items: center;
  text-align: center;
}

.row {
  margin: 10px;
  align-items: center;
  margin: 0 auto;
}

.rowgap {
  margin: 10px;
}

.subtotal {
  text-align: right;
  margin-right: 20px;
  
}

.errorCode {
  color: red;
}

.korting {
  color: rgb(96, 154, 10);
}

</style>