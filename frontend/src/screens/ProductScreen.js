import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Rating from '../components/Rating'
import Button from 'react-bootstrap/esm/Button'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'
import { store } from '../store'

const initState = {
  loading : true,
  product : [],
  error : ''
}

const reducer = (state = initState, action) => {
    switch(action.type){
      case 'FETCH_REQUEST':
        return {...state, loading: true}

      case 'FETCH_SUCCESS' :
        return {...state, loading: false, product: action.payload}

      case 'FETCH_FAILED' :
        return {...state, loading:false, error: action.payload}

      default:
        return state
    }
}

const ProductScreen = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {slug} = params

    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
      const fetchProduct = async () => {
        dispatch({type:'FETCH_REQUEST'});
        try {
          const result = await axios.get(`/api/products/slug/${slug}`)
          dispatch({type:'FETCH_SUCCESS', payload: result.data})
        } catch (error) {
          dispatch({type:'FETCH_FAILED', payload: getError(error)})
        }
      }

      fetchProduct()
    }, [slug])


    const { state:  xState, dispatch: ctxDispatch } = useContext(store);
    const {cart} = xState ;
    const addToCartHandler = async () => {
      const existItem = cart.cartItems.find(x => x._id === state.product._id)
      const quantity = existItem ? existItem.quantity + 1 : 1;

      const {data} = await axios.get(`/api/products/${state.product._id}`)
      if (data.countInStock < quantity){
        window.alert('Sorry, product is out of stock')
        return;
      }
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload : {...state.product, quantity }
      })
      navigate('/cart')
    }

  return (
    state.loading ? (<LoadingBox />)
    : state.error? (<MessageBox variant="danger">{state.error}</MessageBox>)
    :(
    <div>
      <Row>
        <Col md={6}>
          <img 
          src={state.product.image} 
          alt={state.product.name} 
          className="img-large"
          />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Helmet>
                <title>{state.product.name}</title>
              </Helmet>
              <h1>{state.product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={state.product.rating}
                numReviews={state.product.numReviews}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              Price : ${state.product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description : <p>{state.product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${state.product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {
                        state.product.countInStock > 0 ?
                        (<Badge bg="success">In stock</Badge>)
                        :
                        (<Badge bg="danger">Unavailable</Badge>)
                      }
                    </Col>
                  </Row>
                </ListGroup.Item>
                {
                  state.product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className='d-grid'>
                        <Button onClick={addToCartHandler} variant='primary'>Add to Cart</Button>
                      </div>
                    </ListGroup.Item>
                  )
                }
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    )
    )
}

export default ProductScreen
