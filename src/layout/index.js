import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

function Layout(props) {
    const { children } = props;

    return (<>
        <Header />
        <Content>
            { children }
        </Content>
        <Footer />
    </>)
}
  
export default withRouter(Layout);