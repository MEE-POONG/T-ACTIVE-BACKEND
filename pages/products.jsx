import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function ProdutsPage() {

    const [{data: productsData, loading, error}, getProducts] = useAxios({url: '/api/products'})
    const [{ data: productsById , loading: productsByIdLoading , error: productsByIdError}, getProductsById] = useAxios({},{ manual: true } )
    const [{ loading: updateProductsLoading, error: updateProductsError }, executeProductsPut] = useAxios({},{manual: true})


    // ----ing-----
    const [imge, setImge] = useState([])
    const [imageURL, setImageURL] = useState([])

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [detail, setDetail] = useState('');
    const [imagep, setImagep] = useState('');

   useEffect(() =>{
    setTitle(productsById?.title)
    setSubtitle(productsById?.subtitle)
    setDetail(productsById?.detail)
    setImagep(productsById?.imagep)
   },[productsById])

    useEffect(() => {

        if (imge.length < 1) return
        const newImageUrl = []
        imge.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
        setImageURL(newImageUrl)
    }, [imge])

    const onImageProductsChange = (e) => {
        setImagep([...e.target.files])
    }

   
    const [showModalEdit, setShowModalEdit] = useState(false);

    const ShowModalEdit = async (id) => { 
     await getProductsById({url: '/api/products/'+id,method:'GET'});
      setShowModalEdit(true);
     }
    const CloseModal = () => {setShowModalEdit(false) };
  

    if (loading || productsByIdLoading || updateProductsLoading) return <p>Loading...</p>
    if (error || productsByIdError || updateProductsError) return <p>Error!</p>
    return (
        < >
            <Head>
                <title> T-Active Stevia Syrup </title>
                <meta
                    name="description"
                    content="I2AROBOT 2"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Container fluid className=" pt-4 px-4">
                    <div className="bg-secondary rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าสินค้า</h5>
                </div>

                <div className="d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">

                        <thead>
                        <tr className="text-center">
                            <th >รูปภาพสินค้า</th>
                            <th >ชื่อสินค้า</th>
                            <th >รายละเอียดสินค้า</th>
                            <th >อธิบายเพิ่มเติม</th>
                            <th >จัดการ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productsData?.map((products,index) => (
                            <tr key={index}>
                            <td className="text-center"> <Image className="logo" style={{ width: "150px" }}src={products.image} /></td>
                            <td className="text-center">{products.title}</td>
                            <td className="text-center">{products.subtitle}</td>
                            <td className="text-center">{products.detail}</td>
                            <td>
                            <a className="btn btn-outline-dark sm-2" onClick={() =>ShowModalEdit(products.id)}><FaEdit /></a>
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </Container>
      

          {/* Edit */}
            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>รายละเอียดสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพสินค้า</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imagep} alt="products_img" fluid rounded />}
                        {imageURL?.map((imageSrcProducts, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProducts} alt="products_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageProductsChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle} onChange={event => setSubtitle(event.target.value)} />
                    </Form.Group>

                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail} onChange={event => setDetail(event.target.value)} />
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
                                title: title,
                                subtitle: subtitle,
                                detail: detail,
                            }
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setSubtitle(''),          
                                setDetail(''),
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