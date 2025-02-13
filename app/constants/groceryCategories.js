export const GROCERY_CATEGORIES = {
  PRODUCE: {
    name: 'Produce',
    items: ['apple', 'banana', 'lettuce', 'tomato', 'onion', 'potato']
  },
  DAIRY: {
    name: 'Dairy & Eggs',
    items: ['milk', 'cheese', 'yogurt', 'eggs', 'butter']
  },
  MEAT: {
    name: 'Meat & Seafood',
    items: ['chicken', 'beef', 'fish', 'pork']
  },
  PANTRY: {
    name: 'Pantry',
    items: ['rice', 'pasta', 'bread', 'cereal', 'flour', 'sugar']
  },
  OTHER: {
    name: 'Other',
    items: []
  }
};

export const categorizeItem = (item) => {
  const lowercaseItem = item.toLowerCase();
  for (const [category, data] of Object.entries(GROCERY_CATEGORIES)) {
    if (data.items.includes(lowercaseItem)) {
      return category;
    }
  }
  return 'OTHER';
}; 