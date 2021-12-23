import React from "react";
import EditSize from "../components/EditSize";
import EditBrand from "../components/EditBrand";
import EditColor from "../components/EditColor";
import EditCategory from "../components/EditCategory";

const SpecEditScreen = ({ match, history, location}) => {

  const {pathname} = location
  const specID = match.params.id;
  
  return (
    <>
    {pathname.includes('sizes') &&  <EditSize id={specID} history={history} /> }
    {pathname.includes('brands') && <EditBrand id={specID} history={history} />}
    {pathname.includes('colors') && <EditColor id={specID} history={history} />}
    {pathname.includes('categories') && <EditCategory id={specID} history={history} />}
    </>
  );
};

export default SpecEditScreen;
