
import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'
import PromoBanner from './components/Promobanner'
import CategoryCarousel from './components/CategoryCarousel';
import ProductGrid from './components/ProductGrid';

function App() {
  

  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div>
      <Header/>
    </div>
    <div>
      <PromoBanner/>
    </div>
    <div>
        <CategoryCarousel/>
    </div>
    <ProductGrid/>
    </>
  )
}

export default App
