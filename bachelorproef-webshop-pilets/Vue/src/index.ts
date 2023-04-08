import { PiletApi } from 'bachelorproef-app-shell';
import AddButton from './AddButton.vue';
import RemoveButton from './RemoveButton.vue';
import Cart from './Cart.vue';


interface ButtonExtension {
  item: Object
}



export function setup(app: PiletApi) {

  // app.setData('cart', [{product_id: 1,
  //   name: 'HP Pavilion - 15.6 inch',
  //   category: "Laptops",
  //   price: 999,
  //   description: 'Deze HP Pavilion 15-eg2025nb laptop is geschikt voor het typen van verslagen en het maken van presentaties.',
  //   image: 'https://media.s-bol.com/YXGXnLvwXyDn/W8P2lJ/1200x914.jpg'},
  //   {product_id: 2,
  //     name: 'HP Pavilion - 15.6 inch',
  //     category: "Laptops",
  //     price: 999,
  //     description: 'Deze HP Pavilion 15-eg2025nb laptop is geschikt voor het typen van verslagen en het maken van presentaties.',
  //     image: 'https://media.s-bol.com/YXGXnLvwXyDn/W8P2lJ/1200x914.jpg'}]);

  app.setData('cart', []);

  const addToCart = (item) => {
    var cart = app.getData('cart');
    

    // Check if item is already in cart
    var itemInCart = cart.find((cartItem) => {
      return cartItem.name === item.name;
    });
    // If item is already in cart, increase quantity
    if (itemInCart) {
      itemInCart.quantity++;
      return;
    } else {
      item.quantity = 1;
      cart.push(item);

    }
    app.setData('cart', cart);
  }

  addToCart({product_id: 1,
    name: 'HP Pavilion - 15.6 inch',
    category: "Laptops",
    price: 999,
    description: 'Deze HP Pavilion 15-eg2025nb laptop is geschikt voor het typen van verslagen en het maken van presentaties.',
    image: 'https://media.s-bol.com/YXGXnLvwXyDn/W8P2lJ/1200x914.jpg'});
    addToCart({product_id: 2,
      name: 'HP Pavilion - 15.6 inch',
      category: "Laptops",
      price: 999,
      description: 'Deze HP Pavilion 15-eg2025nb laptop is geschikt voor het typen van verslagen en het maken van presentaties.',
      image: 'https://media.s-bol.com/YXGXnLvwXyDn/W8P2lJ/1200x914.jpg'});
      addToCart({product_id: 2,
        name: 'HP Pavilion3 - 15.6 inch',
        category: "Laptops",
        price: 999.23,
        description: 'Deze HP Pavilion 15-eg2025nb laptop is geschikt voor het typen van verslagen en het maken van presentaties.',
        image: 'https://media.s-bol.com/YXGXnLvwXyDn/W8P2lJ/1200x914.jpg'});

    
    
  

    const removeFromCart = (item) => {
      const cart = app.getData("cart");
    
      // find the item in the cart
      const index = cart.findIndex((cartItem) => cartItem.product_id === item.product_id);
    
      if (index !== -1) {
        // decrease the amount or remove the item from the cart
        if (cart[index].amount > 1) {
          cart[index].amount--;
        } else {
          cart.splice(index, 1);
        }
        app.setData("cart", cart);
      }
    };

  app.registerExtension<ButtonExtension>(
    'add-button', 
    app.fromVue(AddButton, { addToCart: addToCart})
  )

  app.registerExtension<ButtonExtension>(
    "remove-button",
    app.fromVue(RemoveButton, { removeFromCart })
  );

  app.registerPage("/cart", app.fromVue(Cart, { cart: app.getData('cart') }) );


}