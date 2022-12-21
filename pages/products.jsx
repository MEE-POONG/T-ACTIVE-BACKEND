import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'

export default function ProdutsPage() {

    const [{data: productsData, loading, error}, getProducts] = useAxios({url: '/api/products'})
    const [{ data: productsById , loading: productsByIdLoading , error: productsByIdError}, getProductsById] = useAxios({},{ manual: true } )
    
    
    const [{ data: postData, error: errorMessage, loading: productsLoading }, executeProducts] = useAxios({ url: '/api/products', method: 'POST' }, { manual: true });
    const [{ loading: updateProductsLoading, error: updateProductsError }, executeProductsPut] = useAxios({},{manual: true})
    const [{ loading: deleteProductsLoading, error: deleteProductsError }, executeProductsDelete] = useAxios({}, { manual: true })


    const [imagep1, setImagep1] = useState([])
    const [imagep2, setImagep2] = useState([])
    const [imagep3, setImagep3] = useState([])
    const [imageURL, setImageURL] = useState([])

    const [title1, setTitle1] = useState('');
    const [subtitle1, setSubtitle1] = useState('');
    const [detail1, setDetail1] = useState('');
    
    const [title2, setTitle2] = useState('');
    const [subtitle2, setSubtitle2] = useState('');
    const [detail2, setDetail2] = useState('');
    
    const [title3, setTitle3] = useState('');
    const [subtitle3, setSubtitle3] = useState('');
    const [detail3, setDetail3] = useState('');

   

   useEffect(() =>{
    setTitle1(productsById?.title1)
    setSubtitle1(productsById?.subtitle1)
    setDetail1(productsById?.detail1)
    setImagep1(productsById?.imagep1)
    
    setTitle2(productsById?.title2)
    setSubtitle2(productsById?.subtitle2)
    setDetail2(productsById?.detail2)
    setImagep2(productsById?.imagep2)

    setTitle3(productsById?.title3)
    setSubtitle3(productsById?.subtitle3)
    setDetail3(productsById?.detail3)
    setImagep3(productsById?.imagep3)
   },[productsById])

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

   const ShowModalCreate = () => setShowModalCreate(true);
   const ShowModalEdit = async (id) => { 
    await getProductsById({url: '/api/products/'+id,method:'GET'});
     setShowModalEdit(true);
    }
   const CloseModal = () => {setShowModalCreate(false) ,setShowModalEdit(false)};


    if (loading || productsByIdLoading || updateProductsLoading || deleteProductsLoading) return <p>Loading...</p>
    if (error || productsByIdError || updateProductsError || deleteProductsError) return <p>Error!</p>
    return (
        < >
        <Head>
            <title>T-ACTIVE BACKEND</title>
            <meta name="description" content="I2AROBOT 2" />
            <link rel="icon" href="/images/logo.png" />
       </Head>
               
            
            <Container fluid className=" pt-4 px-4">
                    <div className="bg-secondary rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าสินค้า</h5>
                    <Button variant="dark" onClick={ShowModalCreate}>
                            <FaPlus />
                        </Button>
                </div>

    
                <div className=" w- d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">

                        <thead>
                        <tr className="text-center">
                            <th >รูปภาพสินค้า</th>
                            <th >ชื่อสินค้า</th>
                            <th >รายละเอียดสินค้า</th>
                            <th >ประเภทสินค้า</th>
                            <th >จัดการ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productsData?.map((products,index) => (
                            <tr key={index}>
                            <td className="text-center"> <Image className="logo" style={{ width: "50px" }}src={products.imagep1} /></td>
                            <td className="text-center">{products.title1}</td>
                            <td className="text-center">{products.subtitle1}</td>
                            <td className="text-center">{products.detail1}</td>
                            <td className="text-center">
                            <r/>  <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(products.id)}><FaEdit /></a> <t/>     
                                  <a className="btn btn-outline-danger sm-2" onClick={() => executeProductsDelete({ url: '/api/products/' + products.id, method: 'DELETE'})} ><FaTrash /></a>
                       </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </Container>

            <Container fluid className=" pt-4 px-4">
                    <div className="bg-secondary rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลสินค้า2</h5>
                </div>

    
                <div className=" w- d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">

                        <tbody>
                        {productsData?.map((products,index) => (
                            <tr key={index}>
                            <td className="text-center"> <Image className="logo" style={{ width: "50px" }}src={products.imagep2} /></td>
                            <td className="text-center">{products.title2}</td>
                            <td className="text-center">{products.subtitle2}</td>
                            <td className="text-center">{products.detail2}</td>
                            <td className="text-center">
                            <r/>  <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(products.id)}><FaEdit /></a> <t/>     
                                  <a className="btn btn-outline-danger sm-2" onClick={() => executeProductsDelete({ url: '/api/products/' + products.id, method: 'DELETE'})} ><FaTrash /></a>
                       </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </Container>

            <Container fluid className=" pt-4 px-4">
                    <div className="bg-secondary rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลสินค้า3</h5>
                </div>

    
                <div className=" w- d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">

                        <thead>
                        <tr className="text-center">
                            <th >รูปภาพสินค้า</th>
                            <th >ชื่อสินค้า</th>
                            <th >รายละเอียดสินค้า</th>
                            <th >ประเภทสินค้า</th>
                            <th >จัดการ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productsData?.map((products,index) => (
                            <tr key={index}>
                            <td className="text-center"> <Image className="logo" style={{ width: "50px" }}src={products.imagep3} /></td>
                            <td className="text-center">{products.title3}</td>
                            <td className="text-center">{products.subtitle3}</td>
                            <td className="text-center">{products.detail3}</td>
                            <td className="text-center">
                            <r/>  <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(products.id)}><FaEdit /></a> <t/>     
                                  <a className="btn btn-outline-danger sm-2" onClick={() => executeProductsDelete({ url: '/api/products/' + products.id, method: 'DELETE'})} ><FaTrash /></a>
                       </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </Container>
      
  
          {/* Create */}
          <Modal show={showModalCreate} onHide={CloseModal}  centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มข้อมูลสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพสินค้า</Form.Label>
                       
                        <Form.Control type="file" />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า1</Form.Label>
                        <Form.Control type="text" value={title1} onChange={event => setTitle1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle1} onChange={event => setSubtitle1(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail1} onChange={event => setDetail1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า2</Form.Label>
                        <Form.Control type="text" value={title2} onChange={event => setTitle2(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle2} onChange={event => setSubtitl2(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail2} onChange={event => setDetail2(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า3</Form.Label>
                        <Form.Control type="text" value={title3} onChange={event => setTitle3(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle3} onChange={event => setSubtitle3(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail3} onChange={event => setDetail3(event.target.value)} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                       
                       await executeProducts({
                            data: {
                                title1: title1,
                                subtitle1: subtitle1,
                                detail1: detail1,
                                imagep1:``,  

                                title2: title2,
                                subtitle2: subtitle2,
                                detail2: detail2,
                                imagep2:``,

                                title3: title3,
                                subtitle3: subtitle3,
                                detail3: detail3,
                                imagep3:``

                            } 
                        }).then(() => {
                            Promise.all([
                                setTitle1(''),
                                setSubtitle1(''),          
                                setDetail1(''),
                                setImagep1(''),

                                setTitle2(''),
                                setSubtitle2(''),          
                                setDetail2(''),
                                setImagep2(''),

                                setTitle3(''),
                                setSubtitle3(''),          
                                setDetail3(''),
                                setImagep3(''),
                                getProducts()
                            ]).then(() => {
                                CloseModal()
                            })
                        })
                    }}>
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>

          {/* Edit */}
            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>รายละเอียดสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพสินค้า</Form.Label>
                       
                        <Form.Control type="file" />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า1</Form.Label>
                        <Form.Control type="text" value={title1} onChange={event => setTitle1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle1} onChange={event => setSubtitle1(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail1} onChange={event => setDetail1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า2</Form.Label>
                        <Form.Control type="text" value={title2} onChange={event => setTitle2(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle2} onChange={event => setSubtitl2(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail2} onChange={event => setDetail2(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า3</Form.Label>
                        <Form.Control type="text" value={title3} onChange={event => setTitle3(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle3} onChange={event => setSubtitle3(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail3} onChange={event => setDetail3(event.target.value)} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {

                        executeProductsPut({
                            url: '/api/products/' + productsById?.id,
                            method: 'PUT',
                            data: {
                                title1: title1,
                                subtitle1: subtitle1,
                                detail1: detail1,
                                imagep1:``,  

                                title2: title2,
                                subtitle2: subtitle2,
                                detail2: detail2,
                                imagep2:``,
                                 
                                title3: title3,
                                subtitle3: subtitle3,
                                detail3: detail3,
                                imagep3:``
                            }
                        }).then(() => {
                            Promise.all([
                                setTitle1(''),
                                setSubtitle1(''),          
                                setDetail1(''),
                                setImagep1(''),

                                setTitle2(''),
                                setSubtitle2(''),          
                                setDetail2(''),
                                setImagep2(''),

                                setTitle3(''),
                                setSubtitle3(''),          
                                setDetail3(''),
                                setImagep3(''),
                                getProducts()
                              
                            ]).then(() => {
                                CloseModal()
                            })
                        })

                    }}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>
        </ >
    );

}        
ProdutsPage.layout = IndexPage;