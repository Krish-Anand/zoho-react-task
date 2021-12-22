import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ParentDelta from '../component/Home/DeltaList/parentDelta';
import Home from '../component/Home/HomePage';
  
 class GroupRouter extends React.Component {
     render() {
        return (
            <Routes>
             <Route exact path="/home" element={<Home/>} />
             <Route path="/delta"  element={<ParentDelta/>} />
            </Routes>
      );
     }
  }

  export default GroupRouter;