import React from "react";
import { BrowserRouter as Router , Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductListScreen from "./screens/ProductListScreen"
import CreateProductScreen from "./screens/CreateProductScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import {Container} from "react-bootstrap";
import {Provider} from 'react-redux'
import store from './redux/store'
import { CreateSpecs } from "./screens/CreateSpecScreen";
import SpecListScreen from "./screens/SpecListScreen";
import SpecEditScreen from "./screens/SpecEditScreen";


function App() {
  return (
  <Provider store={store}>
    <Router>
    
        <Header />
        <main className="py-3">
          <Container>
            <Route exact path="/" component={HomeScreen}/>
            <Route exact  path='/search/:keyword' component={HomeScreen} />
            <Route  path="/product/:id" component={ProductScreen}/>
            <Route path='/admin/products' component={ProductListScreen} exact/>
            <Route path='/admin/product/newproduct' component={CreateProductScreen}/>
            <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
            <Route path='/admin/api/post' component={CreateSpecs}/>
            <Route path='/admin/api/get' component={SpecListScreen}/>
            <Route exact path='/admin/api/update/sizes/:id' component={SpecEditScreen}/>
            <Route exact  path='/admin/api/update/colors/:id' component={SpecEditScreen}/>
            <Route exact  path='/admin/api/update/brands/:id' component={SpecEditScreen}/>
            <Route exact  path='/admin/api/update/categories/:id' component={SpecEditScreen}/>
     
  
         </Container>
        </main>
        <Footer />
      
    </Router>
  </Provider>
  );
}

export default App;
