import { h } from 'hyperapp'
import { BackLink, LinkWithBlock } from '../views'
import { Link } from 'hyperapp-hoa-router'
import Page from './Page'

const HomePage = () => {
  return (
    <Page key="home-page">
      <h1>Hi .</h1>
      <Link to="/list.html">list</Link>
    </Page>
  )
}

const ListPage = () => (
  <Page key='list-page'>
    <h1>List .</h1>
    <BackLink />
    <br />
    <Link to="/item?id=123">item</Link>
    <br />
    <Link to="/item?id=124">item</Link>
    <br />
    <Link to="/item?id=125">item</Link>
    <br />
    <Link to="/item?id=126">item</Link>
    <br />
    <Link to='/'>home</Link>
  </Page>
)

const ItemPage = () => (
  <div class="page-container item-page" key='item-page'>
    <h1>Item .</h1>
    <BackLink />
    <br />
    <LinkWithBlock />
    <br />
    <Link to="/operation">operation</Link>
    <br />
    <Link to='/'>home</Link>
  </div>
)

const OperationPage = () => (
  <div class="page-container operation-page" key='operation-page'>
    <h1>Operation .</h1>
    <BackLink />
    <br />
    <Link to="/result">result</Link>
    <br />
    <Link to='/'>home</Link>
  </div>
)

const ResultPage = () => (
  <div class="page-container result-page" key='result-page'>
    <h1>Result .</h1>
    <BackLink />
    <br />
    <Link to="/">Home</Link>
    <br />
    <Link to='/'>home</Link>
  </div>
)

export {
  HomePage,
  ListPage,
  ItemPage,
  OperationPage,
  ResultPage
}
