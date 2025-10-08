import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  productCounts: Record<string, number>;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
  productCounts,
}: CategoryFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Категории</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'Все' ? 'default' : 'outline'}
          className={
            selectedCategory === 'Все'
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-primary/10'
          }
          onClick={() => onSelectCategory('Все')}
        >
          Все товары
          <Badge variant="secondary" className="ml-2">
            {Object.values(productCounts).reduce((a, b) => a + b, 0)}
          </Badge>
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className={
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-primary/10'
            }
            onClick={() => onSelectCategory(category)}
          >
            {category}
            <Badge variant="secondary" className="ml-2">
              {productCounts[category] || 0}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};
