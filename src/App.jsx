import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  User, 
  Heart, 
  ChevronRight, 
  Star, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  LogOut,
  ShieldCheck,
  Truck,
  RefreshCw,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* GLOBAL STYLES & ANIMATIONS                                                 */
/* -------------------------------------------------------------------------- */

const GlobalStyles = () => (
  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Premium Easing Curves */
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    .animate-fade-in-up {
      opacity: 0; /* Start hidden */
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .animate-scale-in {
      opacity: 0;
      animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-slide-in-right {
      opacity: 0;
      animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .animate-slide-down {
      animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* Stagger Delays */
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-500 { animation-delay: 0.5s; }

    /* Utilities */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    html { scroll-behavior: smooth; }
  `}</style>
);

/* -------------------------------------------------------------------------- */
/* MOCK DATA                                  */
/* -------------------------------------------------------------------------- */

const PRODUCTS = [
  {
    id: 1,
    name: "Obsidian Chronograph",
    category: "Watches",
    price: 595,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1000",
    description: "A masterclass in precision engineering. The Obsidian Chronograph features a sapphire crystal face, Swiss movement, and a hand-stitched Italian leather strap. Designed for those who command time."
  },
  {
    id: 2,
    name: "Aurum Minimalist",
    category: "Jewelry",
    price: 340,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=1000",
    description: "Elegant 18k gold plated necklace with a single suspended pearl. The Aurum Minimalist speaks volumes through its understated design."
  },
  {
    id: 3,
    name: "Noir Leather Tote",
    category: "Bags",
    price: 850,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000",
    description: "Crafted from full-grain calfskin, the Noir Tote is the ultimate companion for the urban professional. Spacious, durable, and effortlessly chic."
  },
  {
    id: 4,
    name: "Velvet Midnight Blazer",
    category: "Apparel",
    price: 420,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000",
    description: "Deep midnight blue velvet tailored to perfection. This blazer features satin lapels and a slim fit cut that defines modern luxury."
  },
  {
    id: 5,
    name: "Studio Pro Anc",
    category: "Electronics",
    price: 299,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
    description: "Immerse yourself in pure sound. Industry-leading noise cancellation meets premium aluminum construction."
  },
  {
    id: 6,
    name: "Ceramic Vase Set",
    category: "Home",
    price: 180,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1581783342308-f792ca11df53?auto=format&fit=crop&q=80&w=1000",
    description: "Hand-thrown ceramic vases with a matte charcoal finish. A striking addition to any contemporary living space."
  },
  {
    id: 7,
    name: "Oxford Wingtips",
    category: "Footwear",
    price: 320,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=1000",
    description: "Classic British design meets modern comfort. Goodyear welted construction ensures these shoes will last a lifetime."
  },
  {
    id: 8,
    name: "Cashmere Scarf",
    category: "Apparel",
    price: 150,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=1000",
    description: "100% Mongolian cashmere. Soft, warm, and incredibly light. The perfect accessory for transitional weather."
  }
];

/* -------------------------------------------------------------------------- */
/* HELPER COMPONENTS                             */
/* -------------------------------------------------------------------------- */

const Button = ({ children, variant = 'primary', className = '', onClick, type = "button", disabled = false }) => {
  const baseStyles = "px-6 py-3 transition-all duration-300 font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5",
    secondary: "bg-white text-gray-900 border border-gray-200 hover:border-gray-900 hover:shadow-md",
    outline: "bg-transparent border border-white text-white hover:bg-white hover:text-gray-900",
    accent: "bg-amber-700 text-white hover:bg-amber-800 hover:shadow-lg",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", placeholder, value, onChange, required = false, name }) => (
  <div className="mb-4 group">
    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold transition-colors group-focus-within:text-amber-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all duration-300"
    />
  </div>
);

const Badge = ({ count }) => {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-scale-in">
      {count}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN APPLICATION                             */
/* -------------------------------------------------------------------------- */

export default function App() {
  // State
  const [view, setView] = useState('home'); // home, shop, product, cart, checkout, login, profile
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // { name, email }
  const [activeProduct, setActiveProduct] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Actions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({ name: "Alex Morgan", email: "alex@example.com" });
      setView('home');
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  /* ------------------------------- COMPONENTS ------------------------------- */

  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 transition-transform active:scale-90">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => setView('home')}>
            <span className="font-serif text-2xl font-bold tracking-tighter text-gray-900 group-hover:text-gray-700 transition-colors">LUXURIA</span>
            <span className="h-1.5 w-1.5 bg-amber-600 rounded-full ml-1 mt-2 group-hover:bg-amber-500 transition-colors"></span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {['home', 'shop'].map((navItem) => (
               <button 
                key={navItem}
                onClick={() => setView(navItem)} 
                className={`text-sm uppercase tracking-widest hover:text-amber-700 transition-all duration-300 relative group ${view === navItem ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}
              >
                {navItem}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full ${view === navItem ? 'w-full' : ''}`}></span>
              </button>
            ))}
            <button className="text-sm uppercase tracking-widest text-gray-500 hover:text-amber-700 transition-colors relative group">
              Stories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button className="text-sm uppercase tracking-widest text-gray-500 hover:text-amber-700 transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 transition-transform hover:scale-110 hidden sm:block ${isSearchOpen ? 'text-amber-600' : 'text-gray-400 hover:text-gray-900'}`}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            
            <button 
              onClick={() => user ? setView('profile') : setView('login')} 
              className="p-2 text-gray-400 hover:text-gray-900 transition-transform hover:scale-110"
            >
              <User size={20} />
            </button>

            <button 
              onClick={() => setView('cart')} 
              className="p-2 text-gray-400 hover:text-gray-900 transition-transform hover:scale-110 relative"
            >
              <ShoppingBag size={20} />
              <Badge count={cartCount} />
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 animate-slide-down shadow-lg z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="relative">
              <Search className="absolute left-0 top-3 text-gray-400" size={24} />
              <input 
                type="text" 
                placeholder="Search products, categories..." 
                className="w-full pl-10 pr-4 py-2 text-2xl font-serif text-gray-900 placeholder-gray-300 border-none outline-none focus:ring-0"
                value={searchQuery}
                autoFocus
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (view !== 'shop') setView('shop');
                }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-0 top-4 text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 animate-fade-in-up origin-top shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <div className="p-3">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-amber-600"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (view !== 'shop') setView('shop');
                }}
              />
            </div>
            <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50">Home</button>
            <button onClick={() => { setView('shop'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-600 hover:bg-gray-50">Shop</button>
            <button onClick={() => { setView('cart'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-600 hover:bg-gray-50">Cart ({cartCount})</button>
            {user ? (
               <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-gray-50">Sign Out</button>
            ) : (
              <button onClick={() => { setView('login'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-600 hover:bg-gray-50">Sign In</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <div className="relative bg-gray-900 h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero" 
          className="w-full h-full object-cover scale-105 animate-[scaleIn_10s_ease-out_forwards]"
        />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-amber-400 tracking-[0.3em] uppercase text-sm mb-4 font-medium animate-fade-in-up">New Collection 2024</p>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight animate-fade-in-up delay-100">
          Refined aesthetics for <br/> <span className="italic font-light">modern living.</span>
        </h1>
        <div className="flex justify-center gap-4 animate-fade-in-up delay-200">
          <Button variant="outline" onClick={() => setView('shop')}>Explore Collection</Button>
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product, index }) => (
    <div 
      className="group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => { setActiveProduct(product); setView('product'); }}
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-4 rounded-sm">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-gray-900 hover:text-white"
        >
          <ShoppingBag size={18} />
        </button>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1 font-serif group-hover:text-amber-700 transition-colors">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-semibold">${product.price}</span>
          <div className="flex items-center text-amber-500 text-xs">
            <Star size={12} fill="currentColor" />
            <span className="ml-1 text-gray-400">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ShopView = () => {
    const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
    
    // Optimized Search & Filter
    const filteredProducts = useMemo(() => {
      return PRODUCTS.filter(p => {
        const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
        
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = !query || 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query);
            
        return matchesCategory && matchesSearch;
      });
    }, [categoryFilter, searchQuery]);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Header */}
        {searchQuery && (
          <div className="mb-8 animate-fade-in border-b border-gray-100 pb-4">
            <h2 className="text-xl font-serif text-gray-900">
              Search Results for <span className="italic text-amber-700">"{searchQuery}"</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Found {filteredProducts.length} items</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-serif text-gray-900 mb-6 md:mb-0">The Collection</h2>
          
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-8 no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`whitespace-nowrap text-sm uppercase tracking-widest pb-1 border-b-2 transition-all duration-300 ${
                  categoryFilter === cat 
                    ? 'border-gray-900 text-gray-900' 
                    : 'border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center animate-fade-in">
             <div className="inline-block p-6 rounded-full bg-gray-50 mb-6">
                <Search className="text-gray-300" size={48} />
             </div>
             <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
             <p className="text-gray-500 mb-8">We couldn't find any items matching your search criteria.</p>
             <Button onClick={() => { setSearchQuery(''); setCategoryFilter('All'); }}>Clear All Filters</Button>
          </div>
        )}
      </div>
    );
  };

  const ProductDetailView = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => setView('shop')} 
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 group animate-fade-in"
      >
        <ArrowRight className="rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" size={16} /> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image */}
        <div className="bg-gray-100 aspect-[4/5] overflow-hidden rounded-sm animate-fade-in-up">
          <img 
            src={activeProduct.image} 
            alt={activeProduct.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-2 text-amber-600 text-sm font-medium mb-4 animate-fade-in-up delay-100">
            <Star size={16} fill="currentColor" />
            <span>{activeProduct.rating} Rating</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 animate-fade-in-up delay-100">{activeProduct.name}</h1>
          <p className="text-2xl text-gray-900 mb-8 animate-fade-in-up delay-200">${activeProduct.price}</p>
          
          <p className="text-gray-600 leading-relaxed mb-10 text-lg animate-fade-in-up delay-200">
            {activeProduct.description}
          </p>

          <div className="flex gap-4 mb-12 animate-fade-in-up delay-300">
            <Button 
              onClick={() => { addToCart(activeProduct); }} 
              className="flex-1 shadow-xl shadow-gray-200/50"
            >
              Add to Cart
            </Button>
            <button className="p-3 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors rounded-sm">
              <Heart size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-8 animate-fade-in-up delay-500">
            <div className="flex flex-col items-center text-center group">
              <Truck className="mb-2 text-gray-400 group-hover:text-amber-600 transition-colors" size={24} />
              <span className="text-xs uppercase tracking-wide text-gray-900">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center group">
              <ShieldCheck className="mb-2 text-gray-400 group-hover:text-amber-600 transition-colors" size={24} />
              <span className="text-xs uppercase tracking-wide text-gray-900">2 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center group">
              <RefreshCw className="mb-2 text-gray-400 group-hover:text-amber-600 transition-colors" size={24} />
              <span className="text-xs uppercase tracking-wide text-gray-900">30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CartView = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
      <h2 className="text-3xl font-serif text-gray-900 mb-12 text-center animate-fade-in-up">Your Shopping Bag</h2>

      {cart.length === 0 ? (
        <div className="text-center py-12 animate-fade-in-up delay-100">
          <p className="text-gray-500 mb-8">Your bag is currently empty.</p>
          <Button onClick={() => setView('shop')}>Start Shopping</Button>
        </div>
      ) : (
        <>
          <div className="space-y-8 mb-12 animate-fade-in-up delay-100">
            {cart.map((item, idx) => (
              <div key={item.id} className="flex gap-6 py-6 border-b border-gray-100 animate-slide-in-right" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-24 h-32 bg-gray-100 flex-shrink-0 overflow-hidden rounded-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 font-serif">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                    </div>
                    <p className="text-gray-900 font-medium">${item.price * item.quantity}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-gray-50 text-gray-500 transition-colors"
                      >-</button>
                      <span className="px-4 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-gray-50 text-gray-500 transition-colors"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 underline transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-8 rounded-sm animate-fade-in-up delay-200">
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between mb-8 text-xl font-medium text-gray-900 pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>${cartTotal}</span>
            </div>
            <Button onClick={() => setView(user ? 'checkout' : 'login')} className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );

  const CheckoutView = () => {
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = (e) => {
      e.preventDefault();
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
        setCart([]); // Clear cart
      }, 2000);
    };

    if (step === 3) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-3xl font-serif text-gray-900 mb-4">Order Confirmed</h2>
          <p className="text-gray-500 mb-8">
            Thank you for your purchase, {user?.name.split(' ')[0]}. <br/>
            We have sent a confirmation email to {user?.email}.
          </p>
          <Button onClick={() => setView('shop')}>Continue Shopping</Button>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Side */}
          <div className="animate-fade-in-up">
            <div className="flex items-center mb-8 space-x-4">
              <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${step === 1 ? 'bg-gray-900 text-white' : 'bg-green-100 text-green-700'}`}>1</span>
              <span className={`text-sm uppercase tracking-widest ${step === 1 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Shipping</span>
              <div className="w-8 h-[1px] bg-gray-200"></div>
              <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${step === 2 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>2</span>
              <span className={`text-sm uppercase tracking-widest ${step === 2 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Payment</span>
            </div>

            {step === 1 ? (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6 animate-fade-in-up delay-100">
                <h3 className="text-xl font-serif text-gray-900 mb-6">Shipping Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="John" required />
                  <Input label="Last Name" placeholder="Doe" required />
                </div>
                <Input label="Address" placeholder="123 Luxury Lane" required />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" placeholder="New York" required />
                  <Input label="Zip Code" placeholder="10001" required />
                </div>
                <Input label="Country" placeholder="United States" required />
                <Button type="submit" className="w-full mt-6">Continue to Payment</Button>
              </form>
            ) : (
              <form onSubmit={handlePayment} className="space-y-6 animate-fade-in-up">
                <h3 className="text-xl font-serif text-gray-900 mb-6">Payment Method</h3>
                
                {/* Simulated Credit Card Input */}
                <div className="bg-gray-50 p-6 border border-gray-200 rounded-sm mb-6 shadow-inner">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-medium text-gray-900">Credit Card</span>
                    <div className="flex space-x-2">
                       <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
                       <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Input label="Card Number" placeholder="0000 0000 0000 0000" required />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Expiry Date" placeholder="MM/YY" required />
                      <Input label="CVC" placeholder="123" required />
                    </div>
                    <Input label="Cardholder Name" placeholder="John Doe" required />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button type="submit" className="flex-1" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : `Pay $${cartTotal}`}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Summary Side */}
          <div className="bg-gray-50 p-8 h-fit lg:sticky lg:top-24 rounded-sm animate-fade-in-up delay-200">
            <h3 className="text-lg font-serif text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-white overflow-hidden rounded-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-gray-900 pt-4 border-t border-gray-200 mt-4">
                <span>Total</span>
                <span>${cartTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoginView = () => (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white p-8 md:p-12 w-full max-w-md shadow-2xl animate-fade-in-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Please sign in to access your account.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <Input label="Email Address" type="email" placeholder="you@example.com" required />
          <Input label="Password" type="password" placeholder="••••••••" required />
          
          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2 accent-gray-900" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button type="button" className="text-gray-900 hover:underline">Forgot password?</button>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          Don't have an account? <button className="text-gray-900 font-bold hover:underline">Create Account</button>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <span className="font-serif text-2xl font-bold tracking-tighter text-white">LUXURIA</span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Curating the finest in fashion, lifestyle, and design. We believe in quality over quantity and timeless elegance.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-300">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">New Arrivals</button></li>
              <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">Best Sellers</button></li>
              <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">Accessories</button></li>
              <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">Gift Cards</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-300">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors">Contact Us</button></li>
              <li><button className="hover:text-white transition-colors">Shipping & Returns</button></li>
              <li><button className="hover:text-white transition-colors">FAQ</button></li>
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-300">Stay Connected</h4>
            <div className="flex space-x-4 mb-6">
              <button className="p-2 bg-gray-800 hover:bg-white hover:text-gray-900 transition-all rounded-full hover:scale-110"><Instagram size={18} /></button>
              <button className="p-2 bg-gray-800 hover:bg-white hover:text-gray-900 transition-all rounded-full hover:scale-110"><Facebook size={18} /></button>
              <button className="p-2 bg-gray-800 hover:bg-white hover:text-gray-900 transition-all rounded-full hover:scale-110"><Twitter size={18} /></button>
            </div>
            <p className="text-xs text-gray-500">Subscribe to our newsletter for exclusive offers.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 Aman E-Commerce. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );

  /* ------------------------------- MAIN RENDER ------------------------------ */

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      <GlobalStyles />
      <Navbar />
      
      <main className="min-h-screen">
        <div key={view} className="animate-fade-in-up">
          {view === 'home' && (
            <>
              <Hero />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16 animate-fade-in-up delay-300">
                  <h2 className="text-3xl font-serif mb-4">Curated Essentials</h2>
                  <div className="w-20 h-1 bg-amber-600 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {PRODUCTS.slice(0, 4).map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} />
                  ))}
                </div>
                <div className="text-center mt-12 animate-fade-in-up delay-500">
                  <Button onClick={() => setView('shop')} variant="secondary">View All Products</Button>
                </div>
              </div>
            </>
          )}
          
          {view === 'shop' && <ShopView />}
          {view === 'product' && activeProduct && <ProductDetailView />}
          {view === 'cart' && <CartView />}
          {view === 'checkout' && <CheckoutView />}
          {view === 'login' && <LoginView />}
          {view === 'profile' && (
              <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in-up">
                  <h2 className="text-3xl font-serif mb-6">Hello, {user?.name}</h2>
                  <p className="text-gray-500 mb-8">You are logged in as {user?.email}</p>
                  <Button onClick={handleLogout} variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">Sign Out</Button>
              </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}