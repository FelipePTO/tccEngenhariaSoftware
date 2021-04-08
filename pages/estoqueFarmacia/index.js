import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Button, Col, Form, Nav, Row, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const index = () => {
    const router = useRouter();
    const [Saldo, setSaldo] = useState(0)
    const [Remedio, setRemedio] = useState("")
    const [Estoque, setEstoque] = useState([])

    const adicionarEstoque = () =>{
        let lastId = Estoque.length+1;

        let novoEstoque = {
            lastId,
            Remedio,
            Saldo
        }
        if(Remedio!="" && Saldo>0){
            setEstoque([...Estoque, novoEstoque])
            setRemedio("")
            setSaldo(0)
        }
            
        
    }

    return (
        <>
        <Row>
            <Col xs={2}>
                <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/home"
                onSelect={selectedKey => router.push(selectedKey)}
                >
                    <div className="sidebar-sticky"></div>
                    <Nav.Item>
                        <Nav.Link href="/">Inicio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/estoqueFarmacia">Estoque Farmacia</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/internarPaciente">Internar Paciente</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/agendamentoConsulta">Agendamento Consulta</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Col>
            <Col xs={10}>

            <Form>
                <Row className="align-items-center">
                    <Col xs={6}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Remedio</Form.Label>
                            <Form.Control onChange={(e)=>setRemedio(e.target.value)} as="select">
                                <option value=""></option>
                                <option value="Dipirona">Dipirona</option> 
                                <option value="Paracetamol">Paracetamol</option> 
                                <option value="Omeprazol">Omeprazol</option> 
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={2}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Saldo</Form.Label>
                        <Form.Control onChange={(e)=>setSaldo(e.target.value)} value={Saldo} type="text" />
                    </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Button onClick={()=>adicionarEstoque()}>Incluir</Button>
                    </Col>
                </Row>

                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Produto</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {Estoque.map(d=>{
                        return <tr>
                            <td>{d.lastId}</td>
                            <td>
                                {d.Remedio}
                            </td>
                            <td>
                                {d.Saldo}
                            </td>

                        </tr>
                    })}
                </tbody>
                </Table>
            </Form>

            </Col>
        </Row>
        </>
    )
}

export default index
