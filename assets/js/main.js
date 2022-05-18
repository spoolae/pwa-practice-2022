new Vue ({
    el:"#app",
    data:{
        products: [
            {id:1, title:"Bordeaux 237", short_text:"The maturation of this variety occurs in 99-120 days. The fruits are medium in size, round in shape.", image:"1.jpg"},
            {id:2, title:"Modana", short_text:"Red beet Modana has neat and beautiful round-shaped fruits. Variety without light rings", image:"2.jpg"},
            {id:3, title:"Pablo F1", short_text:"Refers to dark varieties of beets. The shape is rounded. The color is even", image:"3.jpg"},
            {id:4, title:"Bohemia", short_text:"Varieties and hybrids of beets, in all their diversity, allow you to get vegetables of different shapes and sizes", image:"4.jpg"},
            {id:5, title:"Detroit", short_text:"Cold hardy, early maturing variety. It does not freeze during spring frosts.", image:"5.jpg"},
          ],
          product: {},
          cart1: [],
          btnVisible: false,
          contactFields: [],
          fieldsVisible: true,
    },
    methods: {
        addToCart: function(id){
            var cart = [];
            if(window.localStorage.getItem('cart')){
                cart = window.localStorage.getItem('cart').split(',');
            }
            if(cart.indexOf(String(id))==-1){
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible=true;
            }
        },
        removeFromCart: function(id){
            var cart = [];
            if(window.localStorage.getItem('cart')){
                cart = window.localStorage.getItem('cart').split(',');
            }
            if(cart.indexOf(String(id))!=-1){
                cart.pop(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible=false;
            }
        },
         removeAllFromCart: function(){
            var cart = [];
            if(window.localStorage.getItem('cart')){
                cart = window.localStorage.getItem('cart').split(',');
            }
                cart.pop(0);
                cart.pop(1);
                cart.pop(2);
                cart.pop(3);
                cart.pop(4);
                window.localStorage.setItem('cart', cart.join());
     
        },
        getProduct: function() {
            if(window.location.hash) {
                var id = window.location.hash.replace("#", " ");
                this.product = this.products[id-1];
            }
            else
            this.product = this.products[0];
        },
        checkInCart: function(){
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id))!=-1) {
            this.btnVisible=true;    
        }
        },
        getCart: function(){
            for(var i in this.products){
                if(window.localStorage.getItem('cart').split(',').indexOf(String(this.products[i].id))!=-1)
                    this.cart1.push(this.products[i]);
            }
        },
        makeOrder: function(){
            for(var i in this.products){
                this.removeAllFromCart();
            }
            this.fieldsVisible=false;
        }
      },
      mounted: function() {
        this.getProduct();
        this.checkInCart();
        this.getCart();
      }
});