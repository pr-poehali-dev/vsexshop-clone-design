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

      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_50%)]" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
              ✨ Интимный магазин №1 в России
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground animate-fade-in">
              Мир чувственных
              <span className="text-primary"> удовольствий</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Премиальные товары для вашей интимной жизни. Деликатная упаковка, быстрая доставка и абсолютная конфиденциальность.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="ShoppingBag" size={22} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 px-8 py-6 text-lg hover:bg-secondary/10"
                onClick={() => document.getElementById('advantages')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Наши преимущества
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">96+</div>
                <div className="text-sm text-muted-foreground mt-1">товаров</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">поддержка</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground mt-1">анонимность</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Каталог товаров
            </h2>
            <p className="text-muted-foreground">
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

      <section id="advantages" className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Почему выбирают нас?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Мы создали идеальные условия для комфортных покупок
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center space-y-4 p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Truck" size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">Быстрая доставка</h3>
              <p className="text-muted-foreground">
                По Москве за 1-2 дня. По России — 3-7 дней. Доставка до двери.
              </p>
            </div>

            <div className="text-center space-y-4 p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Lock" size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">100% анонимность</h3>
              <p className="text-muted-foreground">
                Нейтральная упаковка без надписей и знаков магазина.
              </p>
            </div>

            <div className="text-center space-y-4 p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="CreditCard" size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">Любой способ оплаты</h3>
              <p className="text-muted-foreground">
                Картой онлайн, наличными или при получении.
              </p>
            </div>

            <div className="text-center space-y-4 p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="ShieldCheck" size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">Гарантия качества</h3>
              <p className="text-muted-foreground">
                Сертифицированные товары. Возврат в течение 14 дней.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Контакты
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-lg">
                <Icon name="Phone" size={24} className="text-primary" />
                <a href="tel:+74951234567" className="hover:text-primary transition-colors">
                  +7 (495) 123-45-67
                </a>
              </div>

              <div className="flex items-center justify-center gap-3 text-lg">
                <Icon name="Mail" size={24} className="text-primary" />
                <a href="mailto:info@intimateshop.ru" className="hover:text-primary transition-colors">
                  info@intimateshop.ru
                </a>
              </div>

              <div className="flex items-center justify-center gap-3 text-lg">
                <Icon name="Clock" size={24} className="text-primary" />
                <span>Ежедневно с 9:00 до 21:00</span>
              </div>
            </div>

            <Separator />

            <p className="text-muted-foreground">
              Мы всегда рады ответить на ваши вопросы и помочь с выбором товара
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-foreground/5 to-foreground/10 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">О магазине</h3>
              <p className="text-muted-foreground text-sm">
                Vsexshop.ru — крупнейший интим-магазин в России с широким ассортиментом товаров для взрослых.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Категории</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Вибраторы</li>
                <li>Эротическое белье</li>
                <li>БДСМ аксессуары</li>
                <li>Подарочные наборы</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Информация</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Доставка и оплата</li>
                <li>Гарантии и возврат</li>
                <li>Конфиденциальность</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@vsexshop.ru</li>
                <li>Ежедневно 9:00 - 21:00</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-muted-foreground">
            <p className="text-sm">&copy; 2024 Vsexshop.ru. Все права защищены.</p>
            <p className="text-xs mt-2 text-destructive font-semibold">⚠️ Сайт предназначен только для лиц старше 18 лет</p>
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