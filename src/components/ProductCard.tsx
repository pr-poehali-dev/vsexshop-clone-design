import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border-border/40 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {product.isNew && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg">
              ✨ Новинка
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-destructive to-destructive/80 text-white shadow-lg font-bold">
              -{discount}%
            </Badge>
          )}
        </div>

        <div className="p-5 space-y-3">
          <div className="space-y-2">
            <p className="text-xs text-primary font-semibold uppercase tracking-wider">
              {product.category}
            </p>
            <h3 className="font-semibold text-foreground line-clamp-2 min-h-[2.8rem] text-base">
              {product.name}
            </h3>
          </div>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-2xl font-bold text-primary">
              {product.price.toLocaleString('ru-RU')} ₽
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>

          <Button
            onClick={() => onAddToCart(product)}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-md hover:shadow-lg transition-all"
            size="lg"
          >
            <Icon name="ShoppingCart" size={18} className="mr-2" />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};