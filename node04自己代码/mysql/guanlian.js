//!一对多
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
//!一对一
User.hasOne(Cart)
Cart.belongsTo(User)
//!多对多
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
//!一对多
Order.belongsTo(User)
User.hasMany(Order)
//!多对多
Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Order, { through: OrderItem })
//表连接的查询 获取用户购物车商品 user->cart->cartitem
//!先获取购物车
const cart = await ctx.user.getCart()
//!在获取购物车商品
const products = await cart.getProducts()
