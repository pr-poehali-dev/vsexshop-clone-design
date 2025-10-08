import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProductCard, Product } from '@/components/ProductCard';
import { Cart } from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Массажное масло с ароматом ванили',
      price: 1290,
      originalPrice: 1590,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop',
      category: 'Массажные средства',
      isNew: true,
    },
    {
      id: 2,
      name: 'Шелковая маска для сна',
      price: 890,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&h=500&fit=crop',
      category: 'Аксессуары',
    },
    {
      id: 3,
      name: 'Ароматические свечи набор 3 шт',
      price: 2190,
      originalPrice: 2690,
      image: 'https://images.unsplash.com/photo-1602874801006-94c3a1dfd18f?w=500&h=500&fit=crop',
      category: 'Атмосфера',
    },
    {
      id: 4,
      name: 'Премиум подарочный набор',
      price: 4990,
      image: 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=500&h=500&fit=crop',
      category: 'Подарочные наборы',
      isNew: true,
    },
    {
      id: 5,
      name: 'Гель для душа с феромонами',
      price: 1490,
      image: 'https://images.unsplash.com/photo-1556229010-aa3e6e30f380?w=500&h=500&fit=crop',
      category: 'Уход за телом',
    },
    {
      id: 6,
      name: 'Атласные наручники',
      price: 790,
      originalPrice: 990,
      image: 'https://images.unsplash.com/photo-1583500557349-fb5238f8d946?w=500&h=500&fit=crop',
      category: 'Аксессуары',
    },
  ];

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

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground animate-fade-in">
              Откройте мир удовольствия
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in">
              Премиальные товары для вашего удовольствия и комфорта.
              Деликатная доставка и полная конфиденциальность.
            </p>
            <div className="flex gap-4 justify-center animate-fade-in">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Перейти в каталог
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('delivery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Популярные товары
            </h2>
            <p className="text-muted-foreground">
              Тщательно отобранная коллекция для вашего удовольствия
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Доставка и оплата
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4 p-6 rounded-2xl bg-white/50 backdrop-blur">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Truck" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Быстрая доставка</h3>
              <p className="text-muted-foreground">
                Доставка по Москве в течение 1-2 дней. По России — 3-7 дней.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-white/50 backdrop-blur">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Lock" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Конфиденциальность</h3>
              <p className="text-muted-foreground">
                Нейтральная упаковка без опознавательных знаков.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-white/50 backdrop-blur">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="CreditCard" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Удобная оплата</h3>
              <p className="text-muted-foreground">
                Оплата картой онлайн или наличными при получении.
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

      <footer className="bg-foreground/5 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Intimate Shop. Все права защищены.</p>
            <p className="text-sm mt-2">18+</p>
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
