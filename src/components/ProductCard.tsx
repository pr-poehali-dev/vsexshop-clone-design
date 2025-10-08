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
    <Card className="group overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-secondary/20">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.isNew && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Новинка
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.category}
            </p>
            <h3 className="font-medium text-foreground line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
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
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
