import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface Product {
    id: number;
    nome: string;
    descricao: string;
    precoUnitario: number;
    estoque: number;
    categoria_id: number;
}

interface SelectedProduct extends Product {
    quantidade: number;
}

interface SelectedProductsContextType {
    selectedProducts: SelectedProduct[];
    addProduct: (product: Product) => void;
    removeProduct: (product: Product) => void;
    produts: Product[];
    setProduts: React.Dispatch<React.SetStateAction<Product[]>>;
    clearProducts: () => void;
    FormatarNumero :(numero:number)=>string;
}

interface SelectedProductsProviderProps {
    children: ReactNode;
}

const SelectedProductsContext = createContext<SelectedProductsContextType | undefined>(undefined);

export const SelectedProductsProvider: FC<SelectedProductsProviderProps> = ({ children }) => {
    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
    const [produts, setProduts] = useState<Product[]>([]);
    

    const addProduct = (product: Product) => {
        setSelectedProducts(prevProducts => {
            const existingProduct = prevProducts.find(p => p.id === product.id);
            
            if (existingProduct) {
                // Check if stock is available before adding
                if (existingProduct.quantidade < existingProduct.estoque) {
                    const updatedProducts = prevProducts.map(p =>
                        p.id === product.id ? { ...p, quantidade: p.quantidade + 1 } : p
                    );
                    setProduts(prevProducts =>
                        prevProducts.map(p =>
                            p.id === product.id ? { ...product, estoque: product.estoque - 1 } : p
                        )
                    );
                    return updatedProducts;
                } else {
                    return prevProducts; // Do not change state if stock is not available
                }
            } else {
                // Add new product with initial quantity 1
                const newProduct = { ...product, quantidade: 1 };
                setProduts(prevProducts =>
                    prevProducts.map(p =>
                        p.id === product.id ? { ...product, estoque: product.estoque - 1 } : p
                    )
                );
                return [...prevProducts, newProduct];
            }
        });
    };
    
    
    const removeProduct = (product: Product) => {
        setSelectedProducts((prevProducts) => {
          const existingProduct = prevProducts.find((p) => p.id === product.id);
      
          if (existingProduct) {
            if (existingProduct.quantidade > 1) {
              // Decrement quantity
              return prevProducts.map((p) =>
                p.id === product.id? {...p, quantidade: p.quantidade - 1 } : p
              );
            } else {
              // Remove product completely and update stock
              setProduts((prevProducts) =>
                prevProducts.map((p) =>
                  p.id === product.id? {...product, estoque: product.estoque+1} : p
                )
              );
              return prevProducts.filter((p) => p.id!== product.id);
            }
          }
      
          return prevProducts;
        });
      };
      
      const clearProducts = () => {
        setSelectedProducts([]);
    };

    const FormatarNumero = (Numeros: number): string => {
        const formattedPayment = new Intl.NumberFormat("pt-PT", {
          style: "decimal",
          minimumFractionDigits: 2,
        }).format(Numeros);
        return formattedPayment;
      };

    return (
        <SelectedProductsContext.Provider value={{ selectedProducts, addProduct, removeProduct, produts, setProduts, clearProducts,FormatarNumero  }}>
            {children}
        </SelectedProductsContext.Provider>
    );
};

export const useSelectedProducts = () => {
    const context = useContext(SelectedProductsContext);
    if (!context) {
        throw new Error('useSelectedProducts must be used within a SelectedProductsProvider');
    }
    return context;
};
