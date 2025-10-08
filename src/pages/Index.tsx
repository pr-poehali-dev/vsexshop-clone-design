import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ProductCard, Product } from '@/components/ProductCard';
import { Cart } from '@/components/Cart';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { products as allProducts, categories } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Все') {
      return allProducts;
    }
    return allProducts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat] = allProducts.filter((p) => p.category === cat).length;
    });
    return counts;
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary/5 to-primary/5">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setCartOpen(true)} />

      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(199,21,133,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 py-28 md:py-36 relative">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary/15 to-secondary/15 backdrop-blur-sm rounded-full text-primary font-semibold mb-4 border border-primary/20 shadow-lg">
              ✨ Интимный магазин №1 в России
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground animate-fade-in leading-tight">
              Мир чувственных
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"> удовольствий</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in leading-relaxed">
              Премиальные товары для вашей интимной жизни. Деликатная упаковка, быстрая доставка и абсолютная конфиденциальность.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-2xl hover:shadow-3xl transition-all px-10 py-7 text-xl font-semibold rounded-2xl group"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="ShoppingBag" size={24} className="mr-3 group-hover:scale-110 transition-transform" />
                Смотреть каталог
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 hover:border-primary px-10 py-7 text-xl hover:bg-primary/5 rounded-2xl font-semibold"
                onClick={() => document.getElementById('advantages')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Наши преимущества
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-16">
              <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">96+</div>
                <div className="text-sm md:text-base text-muted-foreground mt-2 font-medium">товаров</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">24/7</div>
                <div className="text-sm md:text-base text-muted-foreground mt-2 font-medium">поддержка</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">100%</div>
                <div className="text-sm md:text-base text-muted-foreground mt-2 font-medium">анонимность</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Каталог товаров
            </h2>
            <p className="text-muted-foreground text-lg">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : filteredProducts.length < 5 ? 'товара' : 'товаров'} в каталоге
            </p>
          </div>

          <div className="mb-8">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              productCounts={productCounts}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Package" size={64} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">
                Товары не найдены
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="advantages" className="py-24 bg-gradient-to-br from-secondary/8 to-primary/8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_70%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Почему выбирают нас?
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Мы создали идеальные условия для комфортных покупок
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="text-center space-y-5 p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-primary/10">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-6 transition-transform">
                <Icon name="Truck" size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Быстрая доставка</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                По Москве за 1-2 дня. По России — 3-7 дней. Доставка до двери.
              </p>
            </div>

            <div className="text-center space-y-5 p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-secondary/10">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-secondary via-secondary/80 to-primary rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-6 transition-transform">
                <Icon name="Lock" size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">100% анонимность</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Нейтральная упаковка без надписей и знаков магазина.
              </p>
            </div>

            <div className="text-center space-y-5 p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-primary/10">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-6 transition-transform">
                <Icon name="CreditCard" size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Любой способ оплаты</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Картой онлайн, наличными или при получении.
              </p>
            </div>

            <div className="text-center space-y-5 p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-secondary/10">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-secondary via-secondary/80 to-primary rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-6 transition-transform">
                <Icon name="ShieldCheck" size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Гарантия качества</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Сертифицированные товары. Возврат в течение 14 дней.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Контакты
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-lg transition-all">
                <Icon name="Phone" size={32} className="text-primary mx-auto mb-4" />
                <a href="tel:+74951234567" className="text-lg font-semibold hover:text-primary transition-colors block">
                  +7 (495) 123-45-67
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/5 to-primary/5 hover:shadow-lg transition-all">
                <Icon name="Mail" size={32} className="text-secondary mx-auto mb-4" />
                <a href="mailto:info@vsexshop.ru" className="text-lg font-semibold hover:text-secondary transition-colors block">
                  info@vsexshop.ru
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-lg transition-all">
                <Icon name="Clock" size={32} className="text-primary mx-auto mb-4" />
                <span className="text-lg font-semibold block">Ежедневно 9:00 - 21:00</span>
              </div>
            </div>

            <Separator className="my-8" />

            <p className="text-muted-foreground text-lg">
              Мы всегда рады ответить на ваши вопросы и помочь с выбором товара
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-foreground/5 via-primary/5 to-secondary/5 py-16 mt-24 border-t border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-primary to-secondary p-2.5 rounded-xl">
                  <Icon name="Heart" className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Vsexshop</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Крупнейший интим-магазин в России с широким ассортиментом премиальных товаров для взрослых.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-5 text-foreground">Категории</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Вибраторы</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Эротическое белье</li>
                <li className="hover:text-primary transition-colors cursor-pointer">БДСМ аксессуары</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Подарочные наборы</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-5 text-foreground">Информация</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-secondary transition-colors cursor-pointer">Доставка и оплата</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Гарантии и возврат</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Конфиденциальность</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Контакты</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-5 text-foreground">Контакты</h3>
              <ul className="space-y-3 text-sm">
                <li className="text-muted-foreground hover:text-primary transition-colors">
                  <a href="tel:+74951234567">+7 (495) 123-45-67</a>
                </li>
                <li className="text-muted-foreground hover:text-primary transition-colors">
                  <a href="mailto:info@vsexshop.ru">info@vsexshop.ru</a>
                </li>
                <li className="text-muted-foreground">Ежедневно 9:00 - 21:00</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="text-center text-muted-foreground space-y-3">
            <p className="text-sm">&copy; 2024 Vsexshop.ru. Все права защищены.</p>
            <p className="text-sm font-semibold text-destructive bg-destructive/5 inline-block px-6 py-2 rounded-full">
              ⚠️ Сайт предназначен только для лиц старше 18 лет
            </p>
          </div>
        </div>
      </footer>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Index;